import { describe, expect, it } from 'vitest';
import type { Rect } from './collision';
import { intersects } from './collision';

function rect(x: number, y: number, width: number, height: number): Rect {
  return { x, y, width, height };
}

describe('intersects', () => {
  it('returns true when one rectangle overlaps the other', () => {
    const player = rect(0, 0, 100, 100);
    const item = rect(50, 50, 100, 100);

    expect(intersects(player, item)).toBe(true);
  });

  it('returns false when the rectangles only touch at an edge', () => {
    const player = rect(0, 0, 100, 100);
    const item = rect(100, 0, 100, 100);

    expect(intersects(player, item)).toBe(false);
  });

  it('returns false when one rectangle is beside the other', () => {
    const player = rect(0, 0, 100, 100);
    const item = rect(200, 0, 100, 100);

    expect(intersects(player, item)).toBe(false);
  });

  it('returns false when one rectangle is above the other', () => {
    const player = rect(0, 0, 100, 100);
    const item = rect(0, 200, 100, 100);

    expect(intersects(player, item)).toBe(false);
  });

  it('returns false when the rectangles only touch at a corner', () => {
    const player = rect(0, 0, 100, 100);
    const item = rect(100, 100, 100, 100);

    expect(intersects(player, item)).toBe(false);
  });

  it('works above the top edge, where falling items start', () => {
    const player = rect(0, 0, 100, 100);
    const item = rect(-50, -50, 100, 100);

    expect(intersects(player, item)).toBe(true);
  });

  it('returns true when one rectangle is inside the other', () => {
    const player = rect(0, 0, 100, 100);
    const item = rect(40, 40, 20, 20);

    expect(intersects(player, item)).toBe(true);
  });

  it('gives the same answer when the arguments are swapped', () => {
    const player = rect(0, 0, 100, 100);
    const item = rect(50, 50, 100, 100);

    expect(intersects(player, item)).toBe(true);
    expect(intersects(item, player)).toBe(true);
  });
});
