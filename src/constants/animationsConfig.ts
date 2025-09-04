import { EggAnimationSpriteConfig } from "../hooks/useEggBreakAnimation";
import {
  ArchersMultiSpriteAnimationConfig,
  MultiSpriteConfig,
} from "../types/animations";

export const whaleAnimationsConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/monkey/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/monkey/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/monkey/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/monkey/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/monkey/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/monkey/sprite5.png",
      columns: 8,
      rows: 8,
      frameCount: 14,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: true,
};

export const fireAnimationConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/fire-spritesheet.png",
      columns: 5,
      rows: 10,
    },
  ],
  spriteAnimationSpeed: 100,
  startFrameIndex: 1,
  loop: true,
};

export const swordsmenAnimationConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/swordsmen/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/swordsmen/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/swordsmen/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/swordsmen/sprite3.png",
      columns: 8,
      rows: 8,
      frameCount: 22,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: true,
};

export const candleAnimationConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/candle-wizard/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/candle-wizard/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/candle-wizard/sprite2.png",
      columns: 8,
      rows: 8,
      frameCount: 56,
    },
  ],
  spriteAnimationSpeed: 30,
  startFrameIndex: 1,
  loop: true,
};

export const magicAnimationConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/magic-wizard/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/magic-wizard/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/magic-wizard/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/magic-wizard/sprite3.png",
      columns: 5,
      rows: 5,
      frameCount: 17,
    },
  ],
  spriteAnimationSpeed: 60,
  startFrameIndex: 1,
  loop: true,
};

export const lightSabreAnimationConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/light-sabre/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/light-sabre/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/light-sabre/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/light-sabre/sprite3.png",
      columns: 8,
      rows: 8,
      frameCount: 22,
    },
  ],
  spriteAnimationSpeed: 35,
  startFrameIndex: 1,
  loop: true,
};

export const sandwichAnimationConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/sandwich/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/sandwich/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/sandwich/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/sandwich/sprite3.png",
      columns: 8,
      rows: 8,
      frameCount: 22,
    },
  ],
  spriteAnimationSpeed: 20,
  startFrameIndex: 1,
  loop: true,
};

export const kingFrogAnimationConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/frog-king/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/frog-king/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/frog-king/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/frog-king/sprite3.png",
      columns: 8,
      rows: 8,
      frameCount: 22,
    },
  ],
  spriteAnimationSpeed: 25,
  startFrameIndex: 1,
  loop: true,
};

// Archers Config

export const archerBlueAnimationConfig: ArchersMultiSpriteAnimationConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/archer-blue/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/archer-blue/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/archer-blue/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/archer-blue/sprite3.png",
      columns: 8,
      rows: 8,
      frameCount: 22,
    },
  ],
  spriteAnimationSpeed: 10,
  bowReleasedFrame: 82,
};

export const archerRedAnimationConfig: ArchersMultiSpriteAnimationConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/archer-red/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/archer-red/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/archer-red/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/archer-red/sprite3.png",
      columns: 8,
      rows: 8,
      frameCount: 22,
    },
  ],
  spriteAnimationSpeed: 10,
  bowReleasedFrame: 23,
};

export const goodEggRevealAnimationConfig: EggAnimationSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/eggs/good/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/eggs/good/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/eggs/good/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/eggs/good/sprite4.png",
      columns: 8,
      rows: 8,
      frameCount: 44,
    },
  ],
  startFrameIndex: 48,
  repeatFrameIndex: 198,
  endRepeatFrameIndex: 236,
  spriteAnimationSpeed: 10,
};

export const badEggRevealAnimationConfig: EggAnimationSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/eggs/bad/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/eggs/bad/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/eggs/bad/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/eggs/bad/sprite4.png",
      columns: 7,
      rows: 7,
      frameCount: 44,
    },
  ],
  startFrameIndex: 48,
  repeatFrameIndex: 199,
  endRepeatFrameIndex: 236,
  spriteAnimationSpeed: 10,
};

export const nftRevealAnimation: EggAnimationSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/particels-sprite.png",
      columns: 5,
      rows: 13,
    },
  ],
  startFrameIndex: 39,
  endRepeatFrameIndex: 58,
  spriteAnimationSpeed: 10,
};
