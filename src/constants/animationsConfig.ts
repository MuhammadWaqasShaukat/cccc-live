import { EggAnimationSpriteConfig } from "../hooks/useEggBreakAnimator";
import { NFTRevealConfig } from "../hooks/useNFTRevealAnimator";
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

export const logoAnimationConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/logo/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/logo/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/logo/sprite2.png",
      columns: 6,
      rows: 6,
      frameCount: 26,
    },
  ],
  spriteAnimationSpeed: 25,
  startFrameIndex: 1,
  loop: true,
};

export const goldStashAnimationConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/gold/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/gold/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/gold/sprite3.png",
      columns: 5,
      rows: 5,
      frameCount: 22,
    },
  ],
  spriteAnimationSpeed: 70,
  startFrameIndex: 1,
  loop: true,
};

export const sheepAnimationConfig: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/sheep/thumbnail.png",
      columns: 1,
      rows: 1,
    },
    {
      url: "/images/animations/sprites/sheep/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/sheep/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/sheep/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/sheep/sprite4.png",
      columns: 7,
      rows: 7,
      frameCount: 48,
    },
  ],
  spriteAnimationSpeed: 20,
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
  spriteAnimationSpeed: 30,
  bowReleasedFrame: 81,
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
  spriteAnimationSpeed: 30,
  bowReleasedFrame: 22,
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

export const nftRevealAnimation: NFTRevealConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/particels-sprite.webp",
      columns: 5,
      rows: 13,
    },
  ],
  startFrameIndex: 39,
  endRepeatFrameIndex: 58,
  spriteAnimationSpeed: 10,
};

// Nest Sheet Sprites
export const nestSheet1: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/1/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/1/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/1/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/1/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/1/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/1/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet2: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/2/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/2/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/2/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/2/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/2/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/2/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet3: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/3/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/3/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/3/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/3/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/3/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/3/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet4: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/4/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/4/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/4/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/4/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/4/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/4/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet5: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/5/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/5/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/5/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/5/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/5/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/5/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet6: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/6/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/6/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/6/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/6/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/6/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/6/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet7: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/7/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/7/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/7/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/7/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/7/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/7/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet8: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/8/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/8/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/8/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/8/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/8/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/8/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet9: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/9/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/9/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/9/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/9/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/9/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/9/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet10: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/10/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/10/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/10/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/10/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/10/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/10/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet11: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/11/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/11/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/11/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/11/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/11/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/11/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet12: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/12/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/12/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/12/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/12/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/12/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/12/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet13: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/13/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/13/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/13/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/13/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/13/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/13/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const nestSheet14: MultiSpriteConfig = {
  sheets: [
    {
      url: "/images/animations/sprites/summon-egg/14/sprite1.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/14/sprite2.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/14/sprite3.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/14/sprite4.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/14/sprite5.png",
      columns: 8,
      rows: 8,
    },
    {
      url: "/images/animations/sprites/summon-egg/14/sprite6.png",
      columns: 7,
      rows: 7,
      frameCount: 40,
    },
  ],
  spriteAnimationSpeed: 40,
  startFrameIndex: 1,
  loop: false,
};

export const SummonedEggAnimations: MultiSpriteConfig[] = [
  nestSheet1,
  nestSheet2,
  nestSheet3,
  nestSheet4,
  nestSheet5,
  nestSheet6,
  nestSheet7,
  nestSheet8,
  nestSheet9,
  nestSheet10,
  nestSheet11,
  nestSheet12,
  nestSheet13,
  nestSheet14,
];
