import './styles.css';
import { AnimatedSprite, Application, BaseTexture, SCALE_MODES, Sprite } from 'pixi.js';
import { loadGameTextures } from './assets/textures';
import type { GameTextures } from './assets/textures';
import { LoadingScreen } from './ui/LoadingScreen';

// Pixel art must be scaled without smoothing. Set before any texture is created.
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

const app = new Application({
  resizeTo: window,
  background: '#1a1a2e',
});

const loadingScreen = new LoadingScreen('loading');

async function bootstrap(): Promise<void> {
  const textures = await loadGameTextures();
  document.body.appendChild(app.view as HTMLCanvasElement);
  loadingScreen.remove();
  showAssetPreview(textures);
}

function showAssetPreview(textures: GameTextures): void {
  const player = new AnimatedSprite(textures.character.idle);
  player.animationSpeed = 0.1;
  player.anchor.set(0.5, 1);
  player.scale.set(2);
  player.position.set(app.screen.width / 2, app.screen.height - 40);
  player.play();
  app.stage.addChild(player);

  textures.food.forEach((texture, index) => {
    const food = new Sprite(texture);
    food.scale.set(3);
    food.position.set(40 + (index % 16) * 56, 40 + Math.floor(index / 16) * 56);
    app.stage.addChild(food);
  });
}

bootstrap().catch((error: unknown) => {
  loadingScreen.showError(error instanceof Error ? error.message : String(error));
});
