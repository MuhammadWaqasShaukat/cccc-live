import { useEffect, useRef, RefObject } from "react";

// --- Define the types for the configuration and return values ---
export interface SpriteAnimationConfig {
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  spriteAnimationSpeed: number;
  projectileImageUrl: string;
  bowReleasedFrame: number;
}

interface Position {
  x: number;
  y: number;
}

// --- Custom Hook for Dynamic Sprite Animation ---
// This hook encapsulates all animation and path-drawing logic.
// It accepts refs for the DOM elements and a config object.
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
  // --- Internal Hook Refs for Animation State ---
  const lastFrameTime = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const currentFrame = useRef<number>(0);

  // --- Destructure configuration for clarity ---
  const { columns, rows, spriteAnimationSpeed, bowReleasedFrame } = config;
  const numFrames = rows * columns;

  // --- Path Generation and Update Functions ---
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
    // Ensure all refs exist before proceeding
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

  // --- Arrow Animation Logic ---
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

  // --- Main Animation Loop using requestAnimationFrame ---
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
        debugger;
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
    // Reset to first frame
    currentFrame.current = 0;
    if (spriteRef.current) {
      spriteRef.current.style.backgroundPosition = "0% 0%";
    }
  };

  // --- UseEffect for component lifecycle and setup ---
  useEffect(() => {
    updatePath();

    // Clean up on unmount
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return { playAnimation, stopAnimation };
};

// import React, { useEffect, useRef, RefObject } from 'react';

// // --- Define the types for the configuration and return values ---
// interface SpriteAnimationConfig {
//     frameWidth: number;
//     frameHeight: number;
//     columns: number;
//     rows: number;
//     spriteAnimationSpeed: number;
//     projectileImageUrl: string;
//     bowRelasedFrame: number
// }

// interface Position {
//     x: number;
//     y: number;
// }

// // --- Custom Hook for Dynamic Sprite Animation ---
// // This hook encapsulates all animation and path-drawing logic.
// // It accepts refs for the DOM elements and a config object.
// export const useSpriteAnimation = ({
//     spriteRef,
//     pathRef,
//     rangeRef,
//     svgRef,
//     startPathRef,
//     endPathRef,
//     projectileRef,
//     config,
// }: {
//     spriteRef: RefObject<HTMLDivElement>;
//     pathRef: RefObject<SVGPathElement>;
//     rangeRef: RefObject<HTMLDivElement>;
//     svgRef: RefObject<SVGSVGElement>;
//     startPathRef: RefObject<HTMLDivElement>;
//     endPathRef: RefObject<HTMLDivElement>;
//     projectileRef: RefObject<HTMLDivElement>;
//     config: SpriteAnimationConfig;

// }) => {

//     // --- Internal Hook Refs for Animation State ---
//     const lastFrameTime = useRef<number>(0);
//     const animationFrameId = useRef<number | null>(null);
//     const currentFrame = useRef<number>(0);

//     // --- Destructure configuration for clarity ---
//     const {
//         frameWidth,
//         frameHeight,
//         columns,
//         rows,
//         spriteAnimationSpeed,
//         projectileImageUrl,
//     } = config;
//     const numFrames = rows * columns;

//     // --- Path Generation and Update Functions ---
//     const getCenterPosition = (el: HTMLElement): Position => {
//         const rect = el.getBoundingClientRect();
//         return {
//             x: rect.left + rect.width / 2,
//             y: rect.top + rect.height / 2,
//         };
//     };

//     const generateProjectilePath = (start: Position, end: Position): string => {
//         const midX = (start.x + end.x) / 2;
//         const midY = Math.min(start.y, end.y) - 150;
//         return `M ${start.x} ${start.y} Q ${midX} ${midY}, ${end.x} ${end.y}`;
//     };

//     const updatePath = (): void => {
//         // Ensure all refs exist before proceeding
//         if (!startPathRef.current || !endPathRef.current || !svgRef.current || !rangeRef.current || !pathRef.current) return;

//         const rangeRect = rangeRef.current.getBoundingClientRect();
//         const startPos = getCenterPosition(startPathRef.current);
//         const endPos = getCenterPosition(endPathRef.current);

//         const offsetX = rangeRect.left;
//         const offsetY = rangeRect.top;
//         const start: Position = {
//             x: startPos.x - offsetX,
//             y: startPos.y - offsetY,
//         };
//         const end: Position = {
//             x: endPos.x - offsetX,
//             y: endPos.y - offsetY,
//         };

//         svgRef.current.setAttribute("viewBox", `0 0 ${rangeRect.width} ${rangeRect.height}`);
//         const newPath = generateProjectilePath(start, end);
//         pathRef.current.setAttribute("d", newPath);
//     };

//     // --- Arrow Animation Logic ---
//     const launchArrow = (): void => {
//         if (!pathRef.current || !projectileImageUrl) return;
//         // const arrowEl = document.createElement('img');
//         // arrowEl.src = projectileImageUrl;
//         // arrowEl.alt = "Projectile";
//         // arrowEl.classList.add('arrow');
//         // arrowEl.style.display = 'block';
//         // document.body.appendChild(arrowEl);

//         let pathPosition: number = 0;
//         const arrowSpeed: number = 0.01;
//         let arrowAnimationFrameId: number;
//         const pathLength: number = pathRef.current.getTotalLength();

//         const animateArrow = () => {
//             if (!pathRef.current || !projectileRef.current) return;

//             const point = pathRef.current.getPointAtLength(pathPosition * pathLength);
//             const nextPoint = pathRef.current.getPointAtLength((pathPosition + arrowSpeed) * pathLength);

//             const dx = nextPoint.x - point.x;
//             const dy = nextPoint.y - point.y;
//             const rotation = Math.atan2(dy, dx) * 180 / Math.PI;

//             projectileRef.current.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${rotation}deg)`;
//             pathPosition += arrowSpeed;

//             console.log(projectileRef.current)
//             if (pathPosition > 1) {
//                 cancelAnimationFrame(arrowAnimationFrameId);
//                 // arrowEl.remove();
//             } else {
//                 arrowAnimationFrameId = requestAnimationFrame(animateArrow);
//             }
//         };
//         arrowAnimationFrameId = requestAnimationFrame(animateArrow);
//     };

//     // --- Main Animation Loop using requestAnimationFrame ---
//     // const animateSprite = (currentTime: number): void => {
//     //     if (currentTime - lastFrameTime.current > spriteAnimationSpeed) {
//     //         if (spriteRef.current) {
//     //             const row = Math.floor(currentFrame.current / columns);
//     //             const col = currentFrame.current % columns;
//     //             const backgroundX = -col * frameWidth;
//     //             const backgroundY = -row * frameHeight;
//     //             spriteRef.current.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
//     //         }

//     //         if (currentFrame.current === config.bowRelasedFrame) {
//     //             launchArrow();
//     //         }

//     //         currentFrame.current = (currentFrame.current + 1) % numFrames;
//     //         lastFrameTime.current = currentTime;
//     //     }
//     //     animationFrameId.current = requestAnimationFrame(animateSprite);
//     // };

//     const animateSprite = (currentTime: number): void => {
//         if (currentTime - lastFrameTime.current > spriteAnimationSpeed) {
//             if (spriteRef.current) {
//                 // New: Calculate background position using percentages.
//                 const col = currentFrame.current % columns;
//                 const row = Math.floor(currentFrame.current / columns);
//                 // We use (columns - 1) and (rows - 1) to get to the last frame position.
//                 const backgroundX = (col * 100 / (columns - 1));
//                 const backgroundY = (row * 100 / (rows - 1));
//                 spriteRef.current.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
//             }

//             if (currentFrame.current === config.bowRelasedFrame) {
//                 launchArrow();
//             }
//             currentFrame.current = (currentFrame.current + 1) % numFrames;
//             lastFrameTime.current = currentTime;
//         }
//         animationFrameId.current = requestAnimationFrame(animateSprite);
//     };

//     // --- UseEffect for component lifecycle and setup ---
//     useEffect(() => {

//         updatePath();
//         animationFrameId.current = requestAnimationFrame(animateSprite);

//         // Clean up on unmount
//         return () => {
//             if (animationFrameId.current) {
//                 cancelAnimationFrame(animationFrameId.current);
//             }
//         };
//     }, [spriteRef,
//         pathRef,
//         rangeRef,
//         svgRef,
//         startPathRef,
//         endPathRef,
//         config]); // Empty dependency array means this runs only on mount/unmount
// };
