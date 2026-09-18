export class LoadingScreen {
  private readonly element: HTMLElement;

  constructor(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`LoadingScreen: element #${elementId} not found`);
    }
    this.element = element;
  }

  showError(message: string): void {
    this.element.textContent = `Could not load the game: ${message}`;
    this.element.classList.add('overlay--error');
  }

  remove(): void {
    this.element.remove();
  }
}
