import { useRef, useState } from "react";

const HammerStrike = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lastPlayTime, setLastPlayTime] = useState<number>(0);
  const minPlayPercent = 0.8; // 80%

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    const now = performance.now();

    const timeSinceLastPlay = now - lastPlayTime;
    const minPlayTime = (video.duration || 1) * 1000 * minPlayPercent;

    if (timeSinceLastPlay < minPlayTime) {
      return;
    }

    video.currentTime = 0;
    video.play();
    setLastPlayTime(now);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-center w-full h-full cursor-pointer aspect-square"
    >
      <video
        ref={videoRef}
        src="/images/animations/hammer.webm"
        preload="auto"
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default HammerStrike;

// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function HammerStrike() {
//   const [isStriking, setIsStriking] = useState(false);

//   const normalSrc = "/images/hammer-1.png";
//   const strikeSrc = "/images/hammer-2.png";

//   const handleClick = () => {
//     if (isStriking) return;
//     setIsStriking(true);

//     setTimeout(() => {
//       setIsStriking(false);
//     }, 200); // match animation duration
//   };

//   return (
//     <motion.img
//       src={isStriking ? strikeSrc : normalSrc}
//       onClick={handleClick}
//       animate={
//         isStriking
//           ? { rotate: -45, opacity: 0.2, scale: 0.72 }
//           : { rotate: 0, opacity: 1, scale: 0.7 }
//       }
//       transition={{
//         duration: 0.2,
//         ease: [0.42, 0, 0.58, 1], // matches cubic-bezier(0.42, 0, 0.58, 1)
//       }}
//       initial={false}
//       style={{
//         transformOrigin: "top center",
//         width: "150px",
//         height: "auto",
//         // cursor: "pointer",
//       }}
//     />
//   );
// }
// <div
//   className="z-10 hidden w-full h-full transition-all duration-300 bg-cover pointer-events-none hammer-bg aspect-square group-hover:block"
//   style={{ width: "inherit" }}
// >
//   <div className="relative pointer-events-none">
//     <motion.img
//       className="absolute m-auto pointer-events-none "
//       src={isStriking ? strikeSrc : normalSrc}
//       animate={
//         isStriking
//           ? { rotate: -45, opacity: 0.2, scale: 0.72 }
//           : { rotate: 0, opacity: 1, scale: 0.6 }
//       }
//       transition={{
//         duration: 0.2,
//         ease: [0.42, 0, 0.58, 1],
//       }}
//       initial={false}
//       style={{
//         transformOrigin: "bottom bottom",
//         width: "-webkit-fill-available",
//       }}
//     />
//   </div>
// </div>
// )}
