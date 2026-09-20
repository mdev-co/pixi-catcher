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
