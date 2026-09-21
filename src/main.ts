import './styles.css';
import { Application, BaseTexture, SCALE_MODES } from 'pixi.js';
import { loadHudFont } from './assets/fonts';
import { loadGameTextures } from './assets/textures';
import { Game, GameState } from './game/Game';
import { KeyboardInput } from './input/KeyboardInput';
import { Hud } from './ui/Hud';
import { LoadingScreen } from './ui/LoadingScreen';
import { World } from './world/World';

// Pixel art must be scaled without smoothing. Set before any texture is created.
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

const app = new Application({
  resizeTo: window,
  resolution: window.devicePixelRatio,
  autoDensity: true,
  background: '#1a1a2e',
});

const loadingElement = document.getElementById('loading');
if (!loadingElement) {
  throw new Error('Element #loading is missing in index.html');
}
const loadingScreen = new LoadingScreen(loadingElement);

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
    hud.update(game.score, game.lives, game.state === GameState.GameOver);
  });
}

bootstrap().catch((error: unknown) => {
  loadingScreen.showError(error instanceof Error ? error.message : String(error));
});
