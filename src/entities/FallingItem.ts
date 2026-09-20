import { Sprite, Texture } from 'pixi.js';
import { ITEM } from '../config/game';

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

  update(dt: number): void {
    this.sprite.y += ITEM.fallSpeed * dt;
  }

  isBelow(worldHeight: number): boolean {
    return this.sprite.y - this.sprite.height / 2 > worldHeight;
  }
}
