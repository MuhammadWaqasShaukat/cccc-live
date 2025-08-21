import { useEffect, useRef, RefObject } from "react";
import { SpriteAnimationConfig } from "./useSpriteAnimation";

export const useSpriteAnimationSimple = ({
  spriteRef,
  config,
}: {
  spriteRef: RefObject<HTMLDivElement>;
  config: SpriteAnimationConfig;
}) => {
  const lastFrameTime = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const currentFrame = useRef<number>(0);

  const { columns, rows, spriteAnimationSpeed } = config;
  const numFrames = rows * columns;

  const animateSprite = (currentTime: number): void => {
    if (currentTime - lastFrameTime.current > spriteAnimationSpeed) {
      if (spriteRef.current) {
        const col = currentFrame.current % columns;
        const row = Math.floor(currentFrame.current / columns);
        const backgroundX = (col * 100) / (columns - 1);
        const backgroundY = (row * 100) / (rows - 1);
        spriteRef.current.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
      }

      currentFrame.current = (currentFrame.current + 1) % numFrames;
      lastFrameTime.current = currentTime;
    }
    animationFrameId.current = requestAnimationFrame(animateSprite);
  };

  const playAnimation = (): void => {
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(animateSprite);
    }
  };

  const stopAnimation = (): void => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    currentFrame.current = 0;
    if (spriteRef.current) {
      spriteRef.current.style.backgroundPosition = "0% 0%";
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return { playAnimation, stopAnimation };
};
