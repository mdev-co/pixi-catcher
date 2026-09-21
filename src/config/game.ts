export type PlayerConfig = {
  readonly speed: number;
  readonly scale: number;
  readonly animationSpeed: number;
  readonly groundMargin: number;
  readonly frameInset: number;
};

export type ItemConfig = {
  readonly scale: number;
  readonly fallSpeed: number;
  readonly spawnIntervalSeconds: number;
  readonly spawnMarginTop: number;
};

export const WORLD_HEIGHT = 720;
export const WORLD_MIN_WIDTH = 480;
export const WORLD_BACKGROUND = 0x1a1a2e;

export const PLAYER: PlayerConfig = {
  speed: 320,
  scale: 2,
  animationSpeed: 0.1,
  groundMargin: 24,
  frameInset: 16,
};

export const ITEM: ItemConfig = {
  scale: 3,
  fallSpeed: 180,
  spawnIntervalSeconds: 1.2,
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
  readonly gap: number;
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
  gap: 64,
  style: {
    fontFamily: 'Press Start 2P',
    fontSize: 16,
    fill: '#ffffff',
    stroke: '#000000',
    strokeThickness: 4,
  },
};
