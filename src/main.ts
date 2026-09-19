import './styles.css';
import { Application, BaseTexture, SCALE_MODES } from 'pixi.js';
import { loadGameTextures } from './assets/textures';
import { Player } from './entities/Player';
import { KeyboardInput } from './input/KeyboardInput';
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
  const textures = await loadGameTextures();
  document.body.appendChild(app.view as HTMLCanvasElement);
  loadingScreen.remove();

  const world = new World();
  app.stage.addChild(world.container);
  world.fitToScreen(app.screen);
  app.renderer.on('resize', () => world.fitToScreen(app.screen));

  const keyboard = new KeyboardInput();
  const player = new Player(textures.character, world);
  world.container.addChild(player.sprite);

  app.ticker.add(() => player.update(keyboard.direction, app.ticker.deltaMS / 1000));
}

bootstrap().catch((error: unknown) => {
  loadingScreen.showError(error instanceof Error ? error.message : String(error));
});
