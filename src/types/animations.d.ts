export type SpriteKeys =
  | "archer-blue"
  | "archer-red"
  | "king-frog"
  | "light-sabre"
  | "whale-monkey"
  | "swords-warrior"
  | "king-blue"
  | "candle-wizard"
  | "fire"
  | "magic-wizard"
  | "good-egg"
  | "bad-egg"
  | "logo"
  | "gold-stash"
  | "sheep"
  | "summoned-egg";

export type SpriteSheet = {
  url: string;
  columns: number;
  rows: number;
  frameCount?: number;
};

export type MultiSpriteConfig = {
  sheets: SpriteSheet[];
  spriteAnimationSpeed: number;
  startFrameIndex?: number;
  endFrameIndex?: number;
  loop?: boolean;
};

export type ArchersMultiSpriteAnimationConfig = {
  sheets: SpriteSheet[];
  spriteAnimationSpeed: number;
  bowReleasedFrame?: number;
};

export type Position = {
  x: number;
  y: number;
};

export type SpriteAnimationConfig = {
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  spriteAnimationSpeed: number;
  bowReleasedFrame?: number;
  callback?: () => void;
  startFrameIndex?: number;
  repeatFrameIndex?: number;
  endRepeatFrameIndex?: number;
};
