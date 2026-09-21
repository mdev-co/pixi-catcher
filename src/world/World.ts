import { Container } from 'pixi.js';
import type { Rectangle } from 'pixi.js';
import { WORLD_HEIGHT } from '../config/game';

export class World {
  readonly container = new Container();
  readonly height = WORLD_HEIGHT;
  width = 0;
  scale = 1;

  fitToScreen(screen: Rectangle): void {
    this.scale = screen.height / this.height;
    this.width = screen.width / this.scale;
    this.container.scale.set(this.scale);
  }
}
