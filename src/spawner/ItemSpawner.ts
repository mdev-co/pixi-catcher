import type { Texture } from 'pixi.js';
import { ITEM } from '../config/game';
import { FallingItem } from '../entities/FallingItem';
import type { World } from '../world/World';
import { Pool } from './Pool';

export class ItemSpawner {
  readonly active: FallingItem[] = [];
  private readonly pool = new Pool(() => new FallingItem());
  private secondsUntilSpawn = ITEM.spawnIntervalSeconds;

  constructor(
    private readonly textures: Texture[],
    private readonly world: World,
  ) {}

  update(dt: number): void {
    this.secondsUntilSpawn -= dt;
    if (this.secondsUntilSpawn <= 0) {
      this.spawn();
      this.secondsUntilSpawn += ITEM.spawnIntervalSeconds;
    }

    for (let index = this.active.length - 1; index >= 0; index--) {
      const item = this.active[index];
      if (!item) {
        continue;
      }
      item.update(dt);
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
    this.active.push(item);
  }

  despawn(index: number): void {
    const item = this.active[index];
    const last = this.active.pop();
    if (!item || !last) {
      return;
    }
    if (item !== last) {
      this.active[index] = last;
    }
    this.world.container.removeChild(item.sprite);
    this.pool.release(item);
  }
}
