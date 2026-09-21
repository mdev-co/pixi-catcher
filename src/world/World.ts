import { Container, Graphics } from 'pixi.js';
import type { Rectangle } from 'pixi.js';
import { WORLD_BACKGROUND, WORLD_HEIGHT, WORLD_MIN_WIDTH } from '../config/game';

export class World {
  readonly container = new Container();
  private readonly clip = new Graphics();
  readonly height = WORLD_HEIGHT;
  private readonly background = new Graphics();
  width = 0;
  scale = 1;
  offsetY = 0;

  constructor() {
    this.container.addChild(this.clip);
    this.container.addChild(this.background);
    this.container.mask = this.clip;
  }

  fitToScreen(screen: Rectangle): void {
    this.scale = Math.min(screen.height / this.height, screen.width / WORLD_MIN_WIDTH);
    this.width = screen.width / this.scale;
    this.clip.clear().beginFill(0xffffff).drawRect(0, 0, this.width, this.height);
    this.background.clear().beginFill(WORLD_BACKGROUND).drawRect(0, 0, this.width, this.height);
    this.container.scale.set(this.scale);
    this.offsetY = (screen.height - this.height * this.scale) / 2;
    this.container.y = this.offsetY;
  }
}
