import { useRef } from "react";
import { useHeroAnimator } from "./useHeroAnimator";
import * as config from "../constants/animationsConfig";

export const useAnimationConfigs = () => {
  const refs = {
    logo: useRef<HTMLDivElement>(null),
    fire: useRef<HTMLDivElement>(null),
    magic: useRef<HTMLDivElement>(null),
    candle: useRef<HTMLDivElement>(null),
    whale: useRef<HTMLDivElement>(null),
    swordman: useRef<HTMLDivElement>(null),
    sandwichmen: useRef<HTMLDivElement>(null),
    kingFrog: useRef<HTMLDivElement>(null),
    lightSabre: useRef<HTMLDivElement>(null),
    gold: useRef<HTMLDivElement>(null),
    sheep: useRef<HTMLDivElement>(null),
  };

  // Build a map of animations
  const animations = {
    logo: useHeroAnimator(refs.logo, config.logoAnimationConfig, "logo"),
    fire: useHeroAnimator(refs.fire, config.fireAnimationConfig, "fire"),
    magic: useHeroAnimator(
      refs.magic,
      config.magicAnimationConfig,
      "magic-wizard"
    ),
    candle: useHeroAnimator(
      refs.candle,
      config.candleAnimationConfig,
      "candle-wizard"
    ),
    whale: useHeroAnimator(
      refs.whale,
      config.whaleAnimationsConfig,
      "whale-monkey"
    ),
    swordman: useHeroAnimator(
      refs.swordman,
      config.swordsmenAnimationConfig,
      "swords-warrior"
    ),
    sandwichmen: useHeroAnimator(
      refs.sandwichmen,
      config.sandwichAnimationConfig,
      "king-blue"
    ),
    kingFrog: useHeroAnimator(
      refs.kingFrog,
      config.kingFrogAnimationConfig,
      "archer-red"
    ),
    gold: useHeroAnimator(
      refs.gold,
      config.goldStashAnimationConfig,
      "gold-stash"
    ),

    lightSabre: useHeroAnimator(
      refs.lightSabre,
      config.lightSabreAnimationConfig,
      "light-sabre"
    ),
    sheep: useHeroAnimator(refs.sheep, config.sheepAnimationConfig, "sheep"),
  };

  // Final return: map of { ref, startAnimation, stopAnimation }
  const controls = Object.fromEntries(
    Object.entries(refs).map(([key, ref]) => [
      key,
      {
        ref,
        startAnimation:
          animations[key as keyof typeof animations].startAnimation,
        stopAnimation: animations[key as keyof typeof animations].stopAnimation,
      },
    ])
  );

  return controls;
};
