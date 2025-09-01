import { useEffect, useRef, RefObject, useState } from "react";
import { SpriteAnimationConfig } from "../types/animations";

export const useEggBreakAnimation = ({
  spriteRef,
  config,
  setIsLooping,
  speed = 0.5,
}: {
  spriteRef: RefObject<HTMLDivElement>;
  setIsLooping: (params: boolean) => void;
  config: SpriteAnimationConfig;
  speed?: number; // 🔹 optional external speed multiplier
}) => {
  const lastFrameTime = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const currentFrame = useRef<number>(0);

  const [currentFrameNo, setCurrentFrameNo] = useState<number>(0);
  const [looping, setLooping] = useState<boolean>(false);

  const {
    columns,
    rows,
    spriteAnimationSpeed,
    startFrameIndex = 0,
    repeatFrameIndex,
    endRepeatFrameIndex,
  } = config;
  const numFrames = rows * columns;

  const animateSprite = (currentTime: number): void => {
    // 🔹 Apply speed multiplier (higher speed = faster animation)
    if (currentTime - lastFrameTime.current > spriteAnimationSpeed / speed) {
      if (spriteRef.current) {
        const col = currentFrame.current % columns;
        const row = Math.floor(currentFrame.current / columns);
        const backgroundX = (col * 100) / (columns - 1);
        const backgroundY = (row * 100) / (rows - 1);
        spriteRef.current.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
      }

      setCurrentFrameNo(currentFrame.current);
      currentFrame.current += 1;
      lastFrameTime.current = currentTime;
    }

    const isLooping =
      typeof repeatFrameIndex === "number" &&
      typeof endRepeatFrameIndex === "number" &&
      endRepeatFrameIndex > repeatFrameIndex;

    if (
      currentFrame.current >= numFrames ||
      (isLooping && currentFrame.current > endRepeatFrameIndex)
    ) {
      if (isLooping) {
        setLooping(true);
        setIsLooping(true);
        currentFrame.current = repeatFrameIndex;
      } else {
        setLooping(false);
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        animationFrameId.current = null;
        return;
      }
    }

    animationFrameId.current = requestAnimationFrame(animateSprite);
  };

  const playAnimation = (): void => {
    currentFrame.current = startFrameIndex;
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(animateSprite);
    }
  };

  const stopAnimation = (): void => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return { playAnimation, currentFrameNo, looping, stopAnimation };
};
