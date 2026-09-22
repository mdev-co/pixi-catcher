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
  private readonly activeActions = new Set<InputAction>();

  constructor(private readonly target: Window = window) {
    target.addEventListener('keydown', this.onKeyDown);
    target.addEventListener('keyup', this.onKeyUp);
    target.addEventListener('blur', this.onBlur);
  }

  get restartPressed(): boolean {
    return this.activeActions.has('RESTART');
  }

  get direction(): Direction {
    const left = this.activeActions.has('LEFT');
    const right = this.activeActions.has('RIGHT');

    if (left === right) {
      return 0;
    }
    return left ? -1 : 1;
  }

  dispose(): void {
    this.target.removeEventListener('keydown', this.onKeyDown);
    this.target.removeEventListener('keyup', this.onKeyUp);
    this.target.removeEventListener('blur', this.onBlur);
    this.activeActions.clear();
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    const action = KEY_TO_ACTION[event.code];
    if (action) {
      event.preventDefault();
      this.activeActions.add(action);
    }
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    const action = KEY_TO_ACTION[event.code];
    if (action) {
      this.activeActions.delete(action);
    }
  };

  private readonly onBlur = (): void => {
    this.activeActions.clear();
  };
}
