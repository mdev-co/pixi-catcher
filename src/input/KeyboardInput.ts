export type Direction = -1 | 0 | 1;

const LEFT_CODES = ['ArrowLeft', 'KeyA'];
const RIGHT_CODES = ['ArrowRight', 'KeyD'];

export class KeyboardInput {
  private readonly pressed = new Set<string>();

  constructor(private readonly target: Window = window) {
    target.addEventListener('keydown', this.onKeyDown);
    target.addEventListener('keyup', this.onKeyUp);
    target.addEventListener('blur', this.onBlur);
  }

  get direction(): Direction {
    const left = LEFT_CODES.some((code) => this.pressed.has(code));
    const right = RIGHT_CODES.some((code) => this.pressed.has(code));
    if (left === right) {
      return 0;
    }
    return left ? -1 : 1;
  }

  dispose(): void {
    this.target.removeEventListener('keydown', this.onKeyDown);
    this.target.removeEventListener('keyup', this.onKeyUp);
    this.target.removeEventListener('blur', this.onBlur);
    this.pressed.clear();
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (LEFT_CODES.includes(event.code) || RIGHT_CODES.includes(event.code)) {
      event.preventDefault();
      this.pressed.add(event.code);
    }
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    this.pressed.delete(event.code);
  };

  private readonly onBlur = (): void => {
    this.pressed.clear();
  };
}
