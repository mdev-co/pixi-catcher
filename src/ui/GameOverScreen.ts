export class GameOverScreen {
  private visible = false;

  constructor(
    private readonly element: HTMLElement,
    private readonly scoreElement: HTMLElement,
  ) {}

  show(score: number): void {
    if (this.visible) {
      return;
    }

    this.visible = true;
    this.scoreElement.textContent = String(score);
    this.element.classList.remove('overlay--hidden');
  }

  hide(): void {
    if (!this.visible) {
      return;
    }

    this.visible = false;
    this.element.classList.add('overlay--hidden');
  }
}
