import type { Level } from '../config/game';
import { LEVELS } from '../config/game';

export function levelFor(score: number): Level {
  for (let index = LEVELS.length - 1; index >= 0; index--) {
    const level = LEVELS[index];
    if (level && score >= level.fromScore) {
      return level;
    }
  }
  throw new Error('LEVELS must not be empty');
}
