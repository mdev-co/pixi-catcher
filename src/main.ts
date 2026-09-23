import './styles.css';
import { Application, BaseTexture, SCALE_MODES } from 'pixi.js';
import { loadHudFont } from './assets/fonts';
import { loadGameTextures } from './assets/textures';
import { Player } from './entities/Player';
import { Game, GameState } from './game/Game';
import { KeyboardInput } from './input/KeyboardInput';
import { ItemSpawner } from './spawner/ItemSpawner';
import { GameOverScreen } from './ui/GameOverScreen';
import { Hud } from './ui/Hud';
import { LoadingScreen } from './ui/LoadingScreen';
import { World } from './world/World';

// Pixel art must be scaled without smoothing. Set before any texture is created.
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

type ElementId = 'loading' | 'game-over' | 'final-score';

const app = new Application({
  resizeTo: window,
  // A 3x display would cost nine times the pixels of a 1x one; two is the usual cap for games.
  resolution: Math.min(window.devicePixelRatio, 2),
  autoDensity: true,
  background: '#000000',
});

function requireElement(id: ElementId): HTMLElement {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element #${id} is missing in index.html`);
  }
  return element;
}

const loadingScreen = new LoadingScreen(requireElement('loading'));
const gameOverScreen = new GameOverScreen(
  requireElement('game-over'),
  requireElement('final-score'),
);

async function bootstrap(): Promise<void> {
  const [textures] = await Promise.all([loadGameTextures(), loadHudFont()]);
  document.body.appendChild(app.view as HTMLCanvasElement);
  loadingScreen.remove();

  const world = new World();
  app.stage.addChild(world.container);
  world.fitToScreen(app.screen);

  const hud = new Hud(world);
  app.stage.addChild(hud.container);
  app.renderer.on('resize', () => {
    world.fitToScreen(app.screen);
    hud.layout();
  });

  const keyboard = new KeyboardInput();
  const player = new Player(textures.character, world);
  const spawner = new ItemSpawner(textures.food, world);
  const game = new Game(player, spawner, world, keyboard);

  app.ticker.add(() => {
    game.update(app.ticker.deltaMS / 1000);
    hud.update(game.score, game.lives, game.level);
    if (game.state === GameState.GameOver) {
      gameOverScreen.show(game.score);
    } else {
      gameOverScreen.hide();
    }
  });
}

bootstrap().catch((error: unknown) => {
  loadingScreen.showError(error instanceof Error ? error.message : String(error));
});
