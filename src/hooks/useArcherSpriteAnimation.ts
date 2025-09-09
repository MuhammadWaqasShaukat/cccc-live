import { useEffect, useRef, RefObject, useMemo, useCallback } from "react";
import {
  ArchersMultiSpriteAnimationConfig,
  SpriteKeys,
} from "../types/animations";

export const useArcherSpriteAnimation = ({
  spriteRef,
  pathRef,
  rangeRef,
  svgRef,
  startPathRef,
  projectileRef,
  config,
}: // spritekey,
{
  spriteRef: RefObject<HTMLDivElement>;
  pathRef: RefObject<SVGPathElement>;
  rangeRef: RefObject<HTMLDivElement>;
  svgRef: RefObject<SVGSVGElement>;
  startPathRef: RefObject<HTMLDivElement>;
  projectileRef: RefObject<HTMLDivElement>;
  config: ArchersMultiSpriteAnimationConfig;
  spritekey: SpriteKeys;
}) => {
  const { sheets, spriteAnimationSpeed, bowReleasedFrame } = config;
  // const ctx = useContext(CottonCandyContext);

  const lastFrameTime = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const currentFrame = useRef<number>(0);

  // --- Precompute metadata
  const meta = useMemo(() => {
    const framesPerSheet = sheets.map(
      (s) => s.frameCount ?? s.columns * s.rows
    );
    const totalFrames = framesPerSheet.reduce((a, b) => a + b, 0);
    const starts = framesPerSheet
      .reduce(
        (acc, count) => {
          acc.push((acc.slice(-1)[0] ?? 0) + count);
          return acc;
        },
        [0]
      )
      .slice(0, -1);
    return { framesPerSheet, starts, totalFrames };
  }, [sheets]);

  // --- Helpers
  const mapFrame = useCallback(
    (globalFrame: number) => {
      const { starts } = meta;
      let sheetIndex = 0;
      for (let i = starts.length - 1; i >= 0; i--) {
        if (globalFrame >= starts[i]) {
          sheetIndex = i;
          break;
        }
      }
      const local = globalFrame - starts[sheetIndex];
      const sheet = sheets[sheetIndex];
      const col = local % sheet.columns;
      const row = Math.floor(local / sheet.columns);
      return { col, row, sheet };
    },
    [meta, sheets]
  );

  const setFrame = useCallback(
    (globalFrame: number) => {
      if (!spriteRef.current) return;
      const { col, row, sheet } = mapFrame(globalFrame);

      spriteRef.current.style.backgroundImage = `url("${sheet.url}")`;
      spriteRef.current.style.backgroundRepeat = "no-repeat";
      spriteRef.current.style.backgroundSize = `${sheet.columns * 100}% ${
        sheet.rows * 100
      }%`;

      const bx = sheet.columns > 1 ? (col * 100) / (sheet.columns - 1) : 0;
      const by = sheet.rows > 1 ? (row * 100) / (sheet.rows - 1) : 0;
      spriteRef.current.style.backgroundPosition = `${bx}% ${by}%`;
    },
    [mapFrame, spriteRef]
  );

  const launchArrow = useCallback(() => {
    if (!pathRef.current || !projectileRef.current) return;

    let pathPosition = 0;
    const arrowSpeed = 0.013;
    const pathLength = pathRef.current.getTotalLength();
    let arrowAnimationFrameId: number;

    const animateArrow = () => {
      if (!pathRef.current || !projectileRef.current) {
        cancelAnimationFrame(arrowAnimationFrameId);
        return;
      }

      projectileRef.current.style.opacity = "1";
      const point = pathRef.current.getPointAtLength(pathPosition * pathLength);
      const nextPoint = pathRef.current.getPointAtLength(
        (pathPosition + arrowSpeed) * pathLength
      );
      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;
      const rotation = (Math.atan2(dy, dx) * 180) / Math.PI;

      projectileRef.current.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${rotation}deg)`;
      pathPosition += arrowSpeed;

      if (pathPosition > 1) {
        cancelAnimationFrame(arrowAnimationFrameId);
        projectileRef.current.style.opacity = "0";
      } else {
        arrowAnimationFrameId = requestAnimationFrame(animateArrow);
      }
    };
    arrowAnimationFrameId = requestAnimationFrame(animateArrow);
  }, [pathRef, projectileRef]);

  const animateSprite = useCallback(
    (currentTime: number) => {
      if (!lastFrameTime.current) {
        lastFrameTime.current = currentTime;
      }
      const delta = currentTime - lastFrameTime.current;

      if (delta >= spriteAnimationSpeed) {
        setFrame(currentFrame.current);
        if (bowReleasedFrame && currentFrame.current === bowReleasedFrame) {
          launchArrow();
        }
        currentFrame.current = (currentFrame.current + 1) % meta.totalFrames;

        // allow catch-up in case of frame drops
        lastFrameTime.current = currentTime - (delta % spriteAnimationSpeed);
      }

      animationFrameId.current = requestAnimationFrame(animateSprite);
    },
    [
      bowReleasedFrame,
      launchArrow,
      meta.totalFrames,
      setFrame,
      spriteAnimationSpeed,
    ]
  );

  const playAnimation = useCallback(() => {
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(animateSprite);
    }
  }, [animateSprite]);

  const stopAnimation = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    currentFrame.current = 0;
    setFrame(0);
  }, [setFrame]);

  // --- Effects
  useEffect(() => {
    setFrame(0);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [setFrame, startPathRef, svgRef, rangeRef, pathRef]);

  return { playAnimation, stopAnimation };
};
