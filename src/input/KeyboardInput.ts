export type Direction = -1 | 0 | 1;

export type GameInput = {
  readonly direction: Direction;
  readonly restartPressed: boolean;
};

type InputAction = 'LEFT' | 'RIGHT' | 'RESTART';

const KEY_TO_ACTION: Record<string, InputAction> = {
  ArrowLeft: 'LEFT',
  KeyA: 'LEFT',
  ArrowRight: 'RIGHT',
  KeyD: 'RIGHT',
  Space: 'RESTART',
  Enter: 'RESTART',
};

export class KeyboardInput implements GameInput {
  private readonly pressedKeys = new Set<string>();

  constructor(private readonly target: Window = window) {
    target.addEventListener('keydown', this.onKeyDown);
    target.addEventListener('keyup', this.onKeyUp);
    target.addEventListener('blur', this.onBlur);
  }

  get restartPressed(): boolean {
    return this.isActive('RESTART');
  }

  get direction(): Direction {
    const left = this.isActive('LEFT');
    const right = this.isActive('RIGHT');

    if (left === right) {
      return 0;
    }
    return left ? -1 : 1;
  }

  dispose(): void {
    this.target.removeEventListener('keydown', this.onKeyDown);
    this.target.removeEventListener('keyup', this.onKeyUp);
    this.target.removeEventListener('blur', this.onBlur);
    this.pressedKeys.clear();
  }

  private isActive(action: InputAction): boolean {
    for (const code of this.pressedKeys) {
      if (KEY_TO_ACTION[code] === action) {
        return true;
      }
    }
    return false;
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (KEY_TO_ACTION[event.code]) {
      event.preventDefault();
      this.pressedKeys.add(event.code);
    }
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.code);
  };

  private readonly onBlur = (): void => {
    this.pressedKeys.clear();
  };
}
