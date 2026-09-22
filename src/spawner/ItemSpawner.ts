import type { Texture } from 'pixi.js';
import { type Level } from '../config/game';
import { FallingItem } from '../entities/FallingItem';
import type { World } from '../world/World';
import { Pool } from './Pool';
import { levelFor } from '../game/levels';

export class ItemSpawner {
  readonly activeItems: FallingItem[] = [];
  private readonly pool = new Pool(() => new FallingItem());
  private secondsUntilSpawn = levelFor(0).spawnIntervalSeconds;

  constructor(
    private readonly textures: Texture[],
    private readonly world: World,
  ) {}

  clear(): void {
    while (this.activeItems.length > 0) {
      this.despawn(this.activeItems.length - 1);
    }
    this.secondsUntilSpawn = levelFor(0).spawnIntervalSeconds;
  }

  update(dt: number, level: Level): void {
    this.secondsUntilSpawn -= dt;
    if (this.secondsUntilSpawn <= 0) {
      this.spawn();
      this.secondsUntilSpawn += level.spawnIntervalSeconds;
    }

    for (let index = this.activeItems.length - 1; index >= 0; index--) {
      const item = this.activeItems[index];
      if (!item) {
        continue;
      }
      item.update(dt, level.fallSpeed);
    }
  }

  private spawn(): void {
    const texture = this.textures[Math.floor(Math.random() * this.textures.length)];
    if (!texture) {
      throw new Error('ItemSpawner: no food textures');
    }

    const item = this.pool.acquire();
    item.reset(texture);

    const minX = item.sprite.width / 2;
    const maxX = this.world.width - item.sprite.width / 2;
    item.sprite.x = minX + Math.random() * (maxX - minX);

    this.world.container.addChild(item.sprite);
    this.activeItems.push(item);
  }

  despawn(index: number): void {
    const item = this.activeItems[index];
    const last = this.activeItems.pop();
    if (!item || !last) {
      return;
    }
    if (item !== last) {
      this.activeItems[index] = last;
    }
    this.world.container.removeChild(item.sprite);
    this.pool.release(item);
  }
}
