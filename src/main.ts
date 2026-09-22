import './styles.css';
import { Application, BaseTexture, SCALE_MODES } from 'pixi.js';
import { loadHudFont } from './assets/fonts';
import { loadGameTextures } from './assets/textures';
import { Game, GameState } from './game/Game';
import { KeyboardInput } from './input/KeyboardInput';
import { Hud } from './ui/Hud';
import { LoadingScreen } from './ui/LoadingScreen';
import { World } from './world/World';
import { GameOverScreen } from './ui/GameOverScreen';

// Pixel art must be scaled without smoothing. Set before any texture is created.
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

type ElementId = 'loading' | 'game-over' | 'final-score';

const app = new Application({
  resizeTo: window,
  resolution: window.devicePixelRatio,
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
  const game = new Game(textures, world, keyboard);

  app.ticker.add(() => {
    game.update(app.ticker.deltaMS / 1000);
    hud.update(game.score, game.lives);
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
