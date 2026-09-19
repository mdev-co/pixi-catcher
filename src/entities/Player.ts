import { AnimatedSprite } from 'pixi.js';
import type { CharacterAnimation, GameTextures } from '../assets/textures';
import { PLAYER } from '../config/game';
import type { Direction } from '../input/KeyboardInput';
import type { World } from '../world/World';

export class Player {
  readonly sprite: AnimatedSprite;
  private animation: CharacterAnimation = 'idle';

  constructor(
    private readonly frames: GameTextures['character'],
    private readonly world: World,
  ) {
    this.sprite = new AnimatedSprite(frames.idle);
    this.sprite.anchor.set(0.5, 1);
    this.sprite.scale.set(PLAYER.scale);
    this.sprite.animationSpeed = PLAYER.animationSpeed;
    this.sprite.play();
    this.placeOnGround();
  }

  update(direction: Direction, dt: number): void {
    const halfWidth = this.sprite.width / 2 - PLAYER.frameInset * PLAYER.scale;
    const x = this.sprite.x + PLAYER.speed * direction * dt;
    this.sprite.x = Math.min(Math.max(x, halfWidth), this.world.width - halfWidth);
    this.setAnimation(animationFor(direction));
  }

  placeOnGround(): void {
    this.sprite.position.set(this.world.width / 2, this.world.height - PLAYER.groundMargin);
  }

  private setAnimation(next: CharacterAnimation): void {
    if (next === this.animation) {
      return;
    }
    this.animation = next;
    this.sprite.textures = this.frames[next];
    this.sprite.play();
  }
}

function animationFor(direction: Direction): CharacterAnimation {
  if (direction < 0) {
    return 'runLeft';
  }
  return direction > 0 ? 'runRight' : 'idle';
}
