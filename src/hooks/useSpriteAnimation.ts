import { useEffect, useRef, RefObject } from "react";

export interface SpriteAnimationConfig {
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  spriteAnimationSpeed: number;
  bowReleasedFrame: number;
}

interface Position {
  x: number;
  y: number;
}

export const useSpriteAnimation = ({
  spriteRef,
  pathRef,
  rangeRef,
  svgRef,
  startPathRef,
  endPathRef,
  projectileRef,
  config,
}: {
  spriteRef: RefObject<HTMLDivElement>;
  pathRef: RefObject<SVGPathElement>;
  rangeRef: RefObject<HTMLDivElement>;
  svgRef: RefObject<SVGSVGElement>;
  startPathRef: RefObject<HTMLDivElement>;
  endPathRef: RefObject<HTMLDivElement>;
  projectileRef: RefObject<HTMLDivElement>;
  config: SpriteAnimationConfig;
}) => {
  const lastFrameTime = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const currentFrame = useRef<number>(0);

  const { columns, rows, spriteAnimationSpeed, bowReleasedFrame } = config;
  const numFrames = rows * columns;

  const getCenterPosition = (el: HTMLElement): Position => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const generateProjectilePath = (start: Position, end: Position): string => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 150;
    return `M ${start.x} ${start.y} Q ${midX} ${midY}, ${end.x} ${end.y}`;
  };

  const updatePath = (): void => {
    if (
      !startPathRef.current ||
      !endPathRef.current ||
      !svgRef.current ||
      !rangeRef.current ||
      !pathRef.current
    )
      return;

    const rangeRect = rangeRef.current.getBoundingClientRect();
    const startPos = getCenterPosition(startPathRef.current);
    const endPos = getCenterPosition(endPathRef.current);

    const offsetX = rangeRect.left;
    const offsetY = rangeRect.top;
    const start: Position = {
      x: startPos.x - offsetX,
      y: startPos.y - offsetY,
    };
    const end: Position = {
      x: endPos.x - offsetX,
      y: endPos.y - offsetY,
    };

    svgRef.current.setAttribute(
      "viewBox",
      `0 0 ${rangeRect.width} ${rangeRect.height}`
    );
    const newPath = generateProjectilePath(start, end);
    pathRef.current.setAttribute("d", newPath);
  };

  const launchArrow = (): void => {
    if (!pathRef.current || !projectileRef.current) return;

    let pathPosition: number = 0;
    const arrowSpeed: number = 0.01;
    let arrowAnimationFrameId: number;
    const pathLength: number = pathRef.current.getTotalLength();

    const animateArrow = () => {
      if (!pathRef.current || !projectileRef.current) return;
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
  };

  const animateSprite = (currentTime: number): void => {
    if (currentTime - lastFrameTime.current > spriteAnimationSpeed) {
      if (spriteRef.current) {
        const col = currentFrame.current % columns;
        const row = Math.floor(currentFrame.current / columns);
        const backgroundX = (col * 100) / (columns - 1);
        const backgroundY = (row * 100) / (rows - 1);
        spriteRef.current.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
      }

      if (currentFrame.current === bowReleasedFrame) {
        launchArrow();
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
    updatePath();
    window.addEventListener("resize", updatePath);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", updatePath);
    };
  }, []);

  return { playAnimation, stopAnimation };
};
