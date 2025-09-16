import { useEffect, useRef, RefObject, useState } from "react";

export type NFTRevealConfig = {
  sheets: {
    url: string;
    columns: number;
    rows: number;
    frameCount?: number;
  }[];
  spriteAnimationSpeed: number;
  startFrameIndex?: number;
  repeatFrameIndex?: number;
  endRepeatFrameIndex?: number;
  loop?: boolean;
};

export const useNFTRevealAnimator = ({
  spriteRef,
  config,
  speed = 1,
  setIsLooping,
}: {
  spriteRef: RefObject<HTMLDivElement>;
  config: NFTRevealConfig;
  speed?: number;
  setIsLooping?: (looping: boolean) => void;
}) => {
  const lastFrameTime = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const currentFrame = useRef<number>(0);

  const [currentFrameNo, setCurrentFrameNo] = useState<number>(0);
  const [looping, setLooping] = useState<boolean>(false);

  const {
    sheets,
    spriteAnimationSpeed,
    startFrameIndex = 0,
    repeatFrameIndex,
    endRepeatFrameIndex,
    loop = false,
  } = config;

  // 🔹 Flatten sheets into a global frame index list
  const frameMap: { sheetIndex: number; frameInSheet: number }[] = [];
  sheets.forEach((sheet, sheetIndex) => {
    const totalFrames = sheet.frameCount ?? sheet.columns * sheet.rows;
    for (let f = 0; f < totalFrames; f++) {
      frameMap.push({ sheetIndex, frameInSheet: f });
    }
  });

  const totalFrames = frameMap.length;

  const animateSprite = (currentTime: number): void => {
    if (currentTime - lastFrameTime.current > spriteAnimationSpeed / speed) {
      if (spriteRef.current) {
        const { sheetIndex, frameInSheet } = frameMap[currentFrame.current];
        const sheet = sheets[sheetIndex];

        const col = frameInSheet % sheet.columns;
        const row = Math.floor(frameInSheet / sheet.columns);

        spriteRef.current.style.backgroundImage = `url(${sheet.url})`;
        const backgroundX = (col * 100) / (sheet.columns - 1 || 1);
        const backgroundY = (row * 100) / (sheet.rows - 1 || 1);
        spriteRef.current.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
      }

      setCurrentFrameNo(currentFrame.current);
      currentFrame.current += 1;
      lastFrameTime.current = currentTime;
    }

    // 🔁 Looping / Repeat logic
    const isLooping =
      typeof repeatFrameIndex === "number" &&
      typeof endRepeatFrameIndex === "number" &&
      endRepeatFrameIndex > repeatFrameIndex;

    if (
      currentFrame.current >= totalFrames ||
      (isLooping && currentFrame.current > endRepeatFrameIndex)
    ) {
      if (isLooping || loop) {
        setLooping(true);
        setIsLooping?.(true);
        currentFrame.current = repeatFrameIndex ?? startFrameIndex;
      } else {
        setLooping(false);
        setIsLooping?.(false);
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        animationFrameId.current = null;
        return;
      }
    }

    animationFrameId.current = requestAnimationFrame(animateSprite);
  };

  const startAnimation = (): void => {
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

  return { startAnimation, stopAnimation, currentFrameNo, looping };
};
