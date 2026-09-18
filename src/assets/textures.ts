import { Assets } from 'pixi.js';
import type { Spritesheet, Texture } from 'pixi.js';

export type CharacterAnimation = 'idle' | 'runLeft' | 'runRight';

export interface GameTextures {
  character: Record<CharacterAnimation, Texture[]>;
  food: Texture[];
}

const CHARACTER_SHEET_URL = 'assets/character.json';
const FOOD_SHEET_URL = 'assets/food.json';
const FOOD_FRAME_COUNT = 64;

export async function loadGameTextures(): Promise<GameTextures> {
  const [characterSheet, foodSheet] = await Promise.all([
    Assets.load<Spritesheet>(CHARACTER_SHEET_URL),
    Assets.load<Spritesheet>(FOOD_SHEET_URL),
  ]);

  return {
    character: {
      idle: animationFrames(characterSheet, 'idle'),
      runLeft: animationFrames(characterSheet, 'runLeft'),
      runRight: animationFrames(characterSheet, 'runRight'),
    },
    food: Array.from({ length: FOOD_FRAME_COUNT }, (_, index) =>
      frame(foodSheet, `food_${index}`, FOOD_SHEET_URL),
    ),
  };
}

function animationFrames(sheet: Spritesheet, name: CharacterAnimation): Texture[] {
  return required(sheet.animations[name], `animation "${name}"`, CHARACTER_SHEET_URL);
}

function frame(sheet: Spritesheet, name: string, url: string): Texture {
  return required(sheet.textures[name], `frame "${name}"`, url);
}

function required<T>(value: T | undefined, what: string, url: string): T {
  if (value === undefined) {
    throw new Error(`Missing ${what} in ${url}`);
  }
  return value;
}
