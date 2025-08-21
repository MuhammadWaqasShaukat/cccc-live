import React, { RefObject, useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}
import { motion } from "framer-motion";
const ArrowRange: React.FC<{
  archerLightening: RefObject<HTMLDivElement>;
  archerCandle: RefObject<HTMLDivElement>;
  lighteningArrowPathRef: RefObject<SVGPathElement>;
  candleArrowPathRef: RefObject<SVGPathElement>;
  arrowLighteningRef: RefObject<HTMLDivElement>;
  arrowCandleRef: RefObject<HTMLDivElement>;
}> = ({
  archerLightening,
  archerCandle,
  lighteningArrowPathRef,
  candleArrowPathRef,
  arrowLighteningRef,
  arrowCandleRef,
}) => {
  const arrowRangeRef = useRef<SVGSVGElement>(null);
  const lighteningArrowOriginRef = useRef<HTMLDivElement>(null);
  const candleArrowOriginRef = useRef<HTMLDivElement>(null);
  const arrowLandingPadRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState<number>(0);

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

  const getRightCenterPosition = (el: HTMLElement): Position => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.right,
      y: rect.top,
    };
  };

  const getLeftCenterPosition = (el: HTMLElement): Position => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
    };
  };

  const updateRange = () => {
    if (
      !archerLightening.current ||
      !archerCandle.current ||
      !lighteningArrowPathRef.current ||
      !candleArrowPathRef.current ||
      !arrowRangeRef.current ||
      !arrowLandingPadRef.current ||
      !lighteningArrowOriginRef.current ||
      !candleArrowOriginRef.current
    )
      return;

    // Get all relevant points (in viewport space)
    const lighteningPos = getRightCenterPosition(archerLightening.current);
    const candlePos = getLeftCenterPosition(archerCandle.current);
    const landingPos = getCenterPosition(arrowLandingPadRef.current);

    const _distance = Math.sqrt(
      Math.pow(lighteningPos.x - candlePos.x, 2) +
        Math.pow(lighteningPos.y - candlePos.y, 2)
    );
    setDistance(_distance);

    // Bounding box for all points
    const minX = Math.min(lighteningPos.x, candlePos.x, landingPos.x);
    const maxX = Math.max(lighteningPos.x, candlePos.x, landingPos.x);
    const minY = Math.min(lighteningPos.y, candlePos.y, landingPos.y);
    const maxY = Math.max(lighteningPos.y, candlePos.y, landingPos.y);

    // Position SVG at the bounding box
    const svg = arrowRangeRef.current;
    svg.style.width = `${maxX - minX}px`;
    svg.style.height = `${maxY - minY}px`;

    // Now convert all points to *local coords* relative to bounding box
    const lighteningLocal = {
      x: lighteningPos.x - minX,
      y: lighteningPos.y - minY,
    };
    const candleLocal = {
      x: candlePos.x - minX,
      y: candlePos.y - minY,
    };
    const landingLocal = {
      x: landingPos.x - minX,
      y: landingPos.y - minY,
    };

    // Generate paths with LOCAL coords
    const lighteningPath = generateProjectilePath(
      lighteningLocal,
      landingLocal
    );
    const candlePath = generateProjectilePath(candleLocal, landingLocal);

    svg.setAttribute("viewBox", `0 0 ${maxX - minX} ${maxY - minY}`);
    lighteningArrowPathRef.current.setAttribute("d", lighteningPath);
    candleArrowPathRef.current.setAttribute("d", candlePath);

    svg.style.position = "absolute";
    svg.style.left = `${minX}px`;
    svg.style.top = `${minY}px`;
  };

  useEffect(() => {
    updateRange();
    window.addEventListener("resize", updateRange);
  }, []);

  return (
    <div className="fixed h-screen w-screen pointer-events-none top-0 left-0  z-[9999]">
      <div className="relative  h-2/3 guide">
        <svg
          ref={arrowRangeRef}
          id="range"
          className=" h-full  w-full"
          style={{ width: distance }}
        >
          <path
            ref={lighteningArrowPathRef}
            stroke="red"
            strokeWidth="2"
            fill="none"
          />
          <path
            ref={candleArrowPathRef}
            stroke="blue"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <div
          ref={lighteningArrowOriginRef}
          className="absolute top-[28%] w-1 h-4 bg-white"
        ></div>

        <div
          ref={candleArrowOriginRef}
          className="absolute top-[28%] w-1 h-4 bg-white"
        ></div>

        <div
          ref={arrowLandingPadRef}
          className="absolute bottom-0 h-1 w-[300px] bg-white left-1/2 -translate-x-1/2"
        ></div>

        <motion.div
          ref={arrowLighteningRef}
          style={{
            opacity: "0",
            position: "absolute",
            width: "80px",
            height: "20px",
            transformOrigin: "center center",
            pointerEvents: "none",
          }}
        >
          <img
            src="/images/arrow-lightning.png"
            alt="arrow"
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

        <motion.div
          ref={arrowCandleRef}
          style={{
            opacity: "0",
            position: "absolute",
            width: "80px",
            height: "20px",
            transformOrigin: "center center",
            pointerEvents: "none",
          }}
        >
          <img
            src="/images/arrow-candle.png"
            alt="arrow"
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ArrowRange;
