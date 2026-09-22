import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { KeyboardInput } from './KeyboardInput';

type Handler = (event: unknown) => void;

function fakeWindow() {
  const handlers = new Map<string, Handler[]>();

  return {
    addEventListener(type: string, handler: Handler): void {
      handlers.set(type, [...(handlers.get(type) ?? []), handler]);
    },
    removeEventListener(type: string, handler: Handler): void {
      handlers.set(
        type,
        (handlers.get(type) ?? []).filter((one) => one !== handler),
      );
    },
    dispatch(type: string, event: unknown = { preventDefault: () => undefined }): void {
      for (const handler of handlers.get(type) ?? []) {
        handler(event);
      }
    },
  };
}

function keyEvent(code: string) {
  return { code, preventDefault: vi.fn() };
}

describe('KeyboardInput', () => {
  let target: ReturnType<typeof fakeWindow>;
  let input: KeyboardInput;

  beforeEach(() => {
    target = fakeWindow();
    input = new KeyboardInput(target as unknown as Window);
  });

  afterEach(() => {
    input.dispose();
  });

  it('stands still when nothing is pressed', () => {
    expect(input.direction).toBe(0);
  });

  it('moves left while the left key is down', () => {
    target.dispatch('keydown', keyEvent('ArrowLeft'));

    expect(input.direction).toBe(-1);
  });

  it('moves right while the right key is down', () => {
    target.dispatch('keydown', keyEvent('KeyD'));

    expect(input.direction).toBe(1);
  });

  it('stands still while both directions are down', () => {
    target.dispatch('keydown', keyEvent('ArrowLeft'));
    target.dispatch('keydown', keyEvent('ArrowRight'));

    expect(input.direction).toBe(0);
  });

  it('stops when the key is released', () => {
    target.dispatch('keydown', keyEvent('ArrowLeft'));
    target.dispatch('keyup', keyEvent('ArrowLeft'));

    expect(input.direction).toBe(0);
  });

  it('keeps moving left while the second left key is still down', () => {
    target.dispatch('keydown', keyEvent('ArrowLeft'));
    target.dispatch('keydown', keyEvent('KeyA'));
    target.dispatch('keyup', keyEvent('ArrowLeft'));

    expect(input.direction).toBe(-1);
  });

  it('asks for a restart while space is down', () => {
    expect(input.restartPressed).toBe(false);

    target.dispatch('keydown', keyEvent('Space'));

    expect(input.restartPressed).toBe(true);
  });

  it('asks for a restart while enter is down', () => {
    target.dispatch('keydown', keyEvent('Enter'));

    expect(input.restartPressed).toBe(true);
  });

  it('ignores keys the game does not use', () => {
    target.dispatch('keydown', keyEvent('KeyZ'));

    expect(input.direction).toBe(0);
    expect(input.restartPressed).toBe(false);
  });

  it('forgets every key when the window loses focus', () => {
    target.dispatch('keydown', keyEvent('ArrowLeft'));
    target.dispatch('keydown', keyEvent('Space'));
    target.dispatch('blur', {});

    expect(input.direction).toBe(0);
    expect(input.restartPressed).toBe(false);
  });

  it('blocks the browser default for keys the game uses', () => {
    const event = keyEvent('Space');

    target.dispatch('keydown', event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('leaves the browser default alone for other keys', () => {
    const event = keyEvent('KeyZ');

    target.dispatch('keydown', event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('ignores events after it is disposed', () => {
    input.dispose();

    target.dispatch('keydown', keyEvent('ArrowLeft'));

    expect(input.direction).toBe(0);
  });
});
