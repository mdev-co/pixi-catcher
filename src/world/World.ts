import { Container } from 'pixi.js';
import type { Rectangle } from 'pixi.js';
import { WORLD_HEIGHT } from '../config/game';

export class World {
  readonly container = new Container();
  readonly height = WORLD_HEIGHT;
  width = 0;

  fitToScreen(screen: Rectangle): void {
    const scale = screen.height / this.height;
    this.width = screen.width / scale;
    this.container.scale.set(scale);
  }
}
