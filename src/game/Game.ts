import { LEVELS, RULES } from '../config/game';
import type { Player } from '../entities/Player';
import type { GameInput } from '../input/KeyboardInput';
import type { ItemSpawner } from '../spawner/ItemSpawner';
import type { World } from '../world/World';
import { intersects } from './collision';
import { levelFor } from './levels';

export enum GameState {
  Playing,
  GameOver,
}

export class Game {
  private currentState = GameState.Playing;
  private currentScore = 0;
  private currentLives = RULES.startingLives;

  constructor(
    private readonly player: Player,
    private readonly spawner: ItemSpawner,
    private readonly world: World,
    private readonly input: GameInput,
  ) {}

  get state(): GameState {
    return this.currentState;
  }

  get score(): number {
    return this.currentScore;
  }

  get lives(): number {
    return this.currentLives;
  }

  get level(): number {
    return LEVELS.indexOf(levelFor(this.currentScore)) + 1;
  }

  update(dt: number): void {
    switch (this.currentState) {
      case GameState.Playing: {
        const level = levelFor(this.currentScore);

        this.player.update(this.input.direction, dt, level.playerSpeed);
        this.spawner.update(dt, level);
        this.resolveItems();
        break;
      }
      case GameState.GameOver:
        if (this.input.restartPressed) {
          this.restart();
        }

        break;
    }
  }

  restart(): void {
    this.currentScore = 0;
    this.currentLives = RULES.startingLives;
    this.currentState = GameState.Playing;
    this.spawner.clear();
    this.player.placeOnGround();
  }

  private resolveItems(): void {
    const playerHitbox = this.player.hitbox;

    for (let index = this.spawner.activeItems.length - 1; index >= 0; index--) {
      const item = this.spawner.activeItems[index];
      if (!item) continue;

      if (intersects(playerHitbox, item.hitbox)) {
        this.currentScore += RULES.pointsPerCatch;
        this.spawner.despawn(index);
      } else if (item.isBelow(this.world.height)) {
        this.currentLives -= 1;
        this.spawner.despawn(index);
        if (this.currentLives <= 0) this.currentState = GameState.GameOver;
      }
    }
  }
}
