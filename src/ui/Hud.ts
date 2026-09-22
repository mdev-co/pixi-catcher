import { Container, Graphics, Text } from 'pixi.js';
import { HUD } from '../config/game';
import type { World } from '../world/World';

export class Hud {
  readonly container = new Container();
  private readonly bar = new Graphics();
  private readonly scoreText = new Text('', HUD.style);
  private readonly livesText = new Text('', HUD.style);
  private score = -1;
  private lives = -1;

  constructor(private readonly world: World) {
    this.scoreText.anchor.set(1, 0.5);
    this.livesText.anchor.set(0, 0.5);
    this.container.addChild(this.bar, this.scoreText, this.livesText);
    this.layout();
  }

  layout(): void {
    const { width, scale } = this.world;
    this.container.scale.set(scale);
    this.container.y = this.world.offsetY;
    this.bar.clear().beginFill(HUD.barColor, HUD.barAlpha).drawRect(0, 0, width, HUD.barHeight);
    this.scoreText.position.set(width / 2 - HUD.gap / 2, HUD.barHeight / 2);
    this.livesText.position.set(width / 2 + HUD.gap / 2, HUD.barHeight / 2);
  }

  update(score: number, lives: number): void {
    if (score !== this.score) {
      this.score = score;
      this.scoreText.text = `SCORE ${score}`;
    }
    if (lives !== this.lives) {
      this.lives = lives;
      this.livesText.text = `LIVES ${lives}`;
    }
  }
}
