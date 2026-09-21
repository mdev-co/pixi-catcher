import type { GameTextures } from '../assets/textures';
import { RULES } from '../config/game';
import { Player } from '../entities/Player';
import type { DirectionSource } from '../input/KeyboardInput';
import { ItemSpawner } from '../spawner/ItemSpawner';
import type { World } from '../world/World';
import { intersects } from './collision';

export enum GameState {
  Playing,
  GameOver,
}

export class Game {
  state = GameState.Playing;
  score = 0;
  lives = RULES.startingLives;

  private readonly player: Player;
  private readonly spawner: ItemSpawner;

  constructor(
    textures: GameTextures,
    private readonly world: World,
    private readonly input: DirectionSource,
  ) {
    this.player = new Player(textures.character, world);
    this.spawner = new ItemSpawner(textures.food, world);
  }

  update(dt: number): void {
    switch (this.state) {
      case GameState.Playing:
        this.player.update(this.input.direction, dt);
        this.spawner.update(dt);
        this.resolveItems();
        break;
      case GameState.GameOver:
        break;
    }
  }

  private resolveItems(): void {
    const playerHitbox = this.player.hitbox;

    for (let index = this.spawner.active.length - 1; index >= 0; index--) {
      const item = this.spawner.active[index];
      if (!item) continue;

      if (intersects(playerHitbox, item.hitbox)) {
        this.score += RULES.pointsPerCatch;
        this.spawner.despawn(index);
      } else if (item.isBelow(this.world.height)) {
        this.lives -= 1;
        this.spawner.despawn(index);
        if (this.lives <= 0) this.state = GameState.GameOver;
      }
    }
  }
}
