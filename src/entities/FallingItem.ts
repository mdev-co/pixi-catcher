import { Sprite, Texture } from 'pixi.js';
import { ITEM } from '../config/game';
import type { Rect } from '../game/collision';

export class FallingItem {
  readonly sprite: Sprite;

  constructor() {
    this.sprite = new Sprite(Texture.EMPTY);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(ITEM.scale);
  }

  reset(texture: Texture): void {
    this.sprite.texture = texture;
    this.sprite.y = -ITEM.spawnMarginTop;
  }

  update(dt: number, fallSpeed: number): void {
    this.sprite.y += fallSpeed * dt;
  }

  get hitbox(): Rect {
    const { width, height } = this.sprite;
    return {
      x: this.sprite.x - width / 2,
      y: this.sprite.y - height / 2,
      width,
      height,
    };
  }

  isBelow(worldHeight: number): boolean {
    return this.sprite.y - this.sprite.height / 2 > worldHeight;
  }
}
