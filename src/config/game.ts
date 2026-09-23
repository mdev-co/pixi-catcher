export type PlayerConfig = {
  readonly scale: number;
  readonly animationSpeed: number;
  readonly groundMargin: number;
  readonly frameInset: number;
};

export type ItemConfig = {
  readonly scale: number;
  readonly spawnMarginTop: number;
};

export type Level = {
  readonly fromScore: number;
  readonly fallSpeed: number;
  readonly spawnIntervalSeconds: number;
  readonly playerSpeed: number;
};

export const LEVELS: readonly Level[] = [
  { fromScore: 0, fallSpeed: 180, spawnIntervalSeconds: 1.2, playerSpeed: 320 },
  { fromScore: 5, fallSpeed: 240, spawnIntervalSeconds: 1, playerSpeed: 350 },
  { fromScore: 12, fallSpeed: 300, spawnIntervalSeconds: 0.8, playerSpeed: 380 },
  { fromScore: 20, fallSpeed: 380, spawnIntervalSeconds: 0.65, playerSpeed: 410 },
];

export const WORLD_HEIGHT = 720;
export const WORLD_MIN_WIDTH = 480;
export const WORLD_BACKGROUND = 0x1a1a2e;

export const PLAYER: PlayerConfig = {
  scale: 2,
  animationSpeed: 0.1,
  groundMargin: 0,
  frameInset: 16,
};

export const ITEM: ItemConfig = {
  scale: 3,
  spawnMarginTop: 48,
};

export type RulesConfig = {
  readonly startingLives: number;
  readonly pointsPerCatch: number;
};

export const RULES: RulesConfig = {
  startingLives: 10,
  pointsPerCatch: 1,
};

export type HudConfig = {
  readonly barHeight: number;
  readonly barColor: number;
  readonly barAlpha: number;
  readonly margin: number;
  readonly style: {
    readonly fontFamily: string;
    readonly fontSize: number;
    readonly fill: string;
    readonly stroke: string;
    readonly strokeThickness: number;
  };
};

export const HUD: HudConfig = {
  barHeight: 48,
  barColor: 0x000000,
  barAlpha: 0.5,
  margin: 24,
  style: {
    fontFamily: 'Press Start 2P',
    fontSize: 16,
    fill: '#ffffff',
    stroke: '#000000',
    strokeThickness: 4,
  },
};
