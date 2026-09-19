export class LoadingScreen {
  constructor(private readonly element: HTMLElement) {}

  showError(message: string): void {
    this.element.textContent = `Could not load the game: ${message}`;
    this.element.classList.add('overlay--error');
  }

  remove(): void {
    this.element.remove();
  }
}
