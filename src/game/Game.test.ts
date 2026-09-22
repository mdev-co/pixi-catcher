import { BaseTexture, Container, Texture } from 'pixi.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { RULES, WORLD_HEIGHT } from '../config/game';
import { Player } from '../entities/Player';
import type { Direction } from '../input/KeyboardInput';
import { ItemSpawner } from '../spawner/ItemSpawner';
import type { World } from '../world/World';
import { Game, GameState } from './Game';
import { levelFor } from './levels';

// AnimatedSprite drives itself from the shared ticker, which asks the browser for frames.
// These tests never animate, so a frame callback that does nothing is enough.
globalThis.requestAnimationFrame = () => 0;
globalThis.cancelAnimationFrame = () => undefined;

function texture(size: number): Texture {
  return new Texture(new BaseTexture(undefined, { width: size, height: size }));
}

function fakeWorld(width: number): World {
  return { container: new Container(), width, height: WORLD_HEIGHT } as unknown as World;
}

describe('Game', () => {
  let world: World;
  let player: Player;
  let spawner: ItemSpawner;
  let input: { direction: Direction; restartPressed: boolean };
  let game: Game;

  beforeEach(() => {
    world = fakeWorld(1280);

    const frames = [texture(84)];
    player = new Player({ idle: frames, runLeft: frames, runRight: frames }, world);
    spawner = new ItemSpawner([texture(16)], world);
    input = { direction: 0, restartPressed: false };
    game = new Game(player, spawner, world, input);
  });

  function spawnOneItem() {
    game.update(levelFor(0).spawnIntervalSeconds);

    const item = spawner.activeItems[0];
    if (!item) {
      throw new Error('the spawner produced no item');
    }
    return item;
  }

  function loseEveryLife(): void {
    for (let miss = 0; miss < RULES.startingLives; miss++) {
      const item = spawnOneItem();
      item.sprite.y = world.height + item.sprite.height;
      game.update(0.01);
    }
  }

  it('scores a point when the player catches an item', () => {
    const item = spawnOneItem();
    const target = player.hitbox;
    item.sprite.x = target.x + target.width / 2;
    item.sprite.y = target.y + target.height / 2;

    game.update(0.01);

    expect(game.score).toBe(RULES.pointsPerCatch);
    expect(spawner.activeItems).toHaveLength(0);
  });

  it('costs a life when an item falls past the bottom', () => {
    const item = spawnOneItem();
    item.sprite.y = world.height + item.sprite.height;

    game.update(0.01);

    expect(game.lives).toBe(RULES.startingLives - 1);
    expect(game.score).toBe(0);
    expect(spawner.activeItems).toHaveLength(0);
  });

  it('ends the game when the last life is lost', () => {
    loseEveryLife();

    expect(game.lives).toBe(0);
    expect(game.state).toBe(GameState.GameOver);
  });

  it('stops spawning once the game is over', () => {
    loseEveryLife();

    game.update(levelFor(0).spawnIntervalSeconds * 3);

    expect(spawner.activeItems).toHaveLength(0);
  });

  it('starts from the beginning when a restart is requested', () => {
    loseEveryLife();
    input.restartPressed = true;

    game.update(0.01);

    expect(game.state).toBe(GameState.Playing);
    expect(game.score).toBe(0);
    expect(game.lives).toBe(RULES.startingLives);
    expect(spawner.activeItems).toHaveLength(0);
  });
});
