import { useEffect, useRef, useState } from "react";

const NftReveal = () => {
  const spriteRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const lastFrameTime = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const currentFrame = useRef(0);

  const [frameValue, setFrameValue] = useState(0); // display + manual control
  const [isPlaying, setIsPlaying] = useState(true); // toggle animation

  const config = {
    frameWidth: 682,
    frameHeight: 682,
    columns: 10,
    rows: 10,
    spriteAnimationSpeed: 80, // ms per frame
    totalFrames: 100,
    scannerDownFrames: 14,
    scannerUpFrames: 12,
  };

  const updateVisualsForFrame = (frame: number) => {
    // Sprite sheet positioning
    if (spriteRef.current) {
      const col = frame % config.columns;
      const row = Math.floor(frame / config.columns);
      spriteRef.current.style.backgroundPosition = `-${
        col * config.frameWidth
      }px -${row * config.frameHeight}px`;
    }

    // Reveal/hide image based on scanner frames
    if (imageRef.current) {
      if (frame < config.scannerDownFrames) {
        const percent = (frame / (config.scannerDownFrames - 1)) * 100;
        imageRef.current.style.clipPath = `polygon(0 0, 100% 0, 100% ${percent}%, 0 ${percent}%)`;
        imageRef.current.style.opacity = "1";
        imageRef.current.style.visibility = "visible";
      } else if (frame < config.scannerDownFrames + config.scannerUpFrames) {
        const step = frame - config.scannerDownFrames;
        const percent = (1 - step / (config.scannerUpFrames - 1)) * 100;
        imageRef.current.style.clipPath = `polygon(0 0, 100% 0, 100% ${percent}%, 0 ${percent}%)`;
        imageRef.current.style.opacity = "1";
        imageRef.current.style.visibility = "visible";
      } else {
        imageRef.current.style.opacity = "0";
        imageRef.current.style.visibility = "hidden";
      }
    }
  };

  const animate = (currentTime: number) => {
    if (!isPlaying) return;

    const elapsed = currentTime - lastFrameTime.current;

    if (elapsed > config.spriteAnimationSpeed) {
      updateVisualsForFrame(currentFrame.current);
      setFrameValue(currentFrame.current);
      currentFrame.current = (currentFrame.current + 1) % config.totalFrames;
      lastFrameTime.current = currentTime;
    }

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying]);

  // Handle manual frame change
  const handleFrameInputChange = (val: number) => {
    const clamped = Math.max(0, Math.min(config.totalFrames - 1, val));
    setFrameValue(clamped);
    currentFrame.current = clamped;
    updateVisualsForFrame(clamped);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <div className="fixed top-3 right-3 text-white flex flex-col gap-2">
        <label htmlFor="frame-input">Frame: {frameValue}</label>
        <input
          id="frame-input"
          type="number"
          min={0}
          max={config.totalFrames - 1}
          value={frameValue}
          onChange={(e) => handleFrameInputChange(Number(e.target.value))}
          className="w-20 border rounded px-2 py-1 text-black"
        />
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="px-2 py-1 bg-gray-700 rounded"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      <div
        ref={spriteRef}
        style={{
          width: `${config.frameWidth}px`,
          height: `${config.frameHeight}px`,
          backgroundImage: "url(/images/eggs-animation.png)",
          backgroundSize: `${config.columns * config.frameWidth}px ${
            config.rows * config.frameHeight
          }px`,
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute w-[396px] aspect-square -mt-[20px]">
        <img
          ref={imageRef}
          src="./images/revealing-nfts.png"
          alt=""
          className="w-full h-full absolute top-0 overflow-clip"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            opacity: 0,
            visibility: "hidden",
            transition: "opacity 0.2s linear",
          }}
        />
      </div>
    </div>
  );
};

// const NftReveal = () => {
//   const spriteRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);

//   const lastFrameTime = useRef(0);
//   const animationFrameId = useRef<number | null>(null);
//   const currentFrame = useRef(0);

//   const config = {
//     frameWidth: 682,
//     frameHeight: 682,
//     columns: 10,
//     rows: 10,
//     spriteAnimationSpeed: 80, // ms per frame
//     totalFrames: 100,
//     scannerDownFrames: 14,
//     scannerUpFrames: 13,
//   };

//   const animate = (currentTime: number) => {
//     const elapsed = currentTime - lastFrameTime.current;

//     if (elapsed > config.spriteAnimationSpeed) {
//       // --- Update sprite sheet ---
//       if (spriteRef.current) {
//         const col = currentFrame.current % config.columns;
//         const row = Math.floor(currentFrame.current / config.columns);
//         spriteRef.current.style.backgroundPosition = `-${
//           col * config.frameWidth
//         }px -${row * config.frameHeight}px`;
//       }

//       // --- Control image reveal only for first 26 frames ---
//       if (imageRef.current) {
//         if (currentFrame.current < config.scannerDownFrames) {
//           // scanner moving down → reveal progressively
//           const percent =
//             (currentFrame.current / (config.scannerDownFrames - 1)) * 100;
//           imageRef.current.style.clipPath = `polygon(0 0, 100% 0, 100% ${percent}%, 0 ${percent}%)`;
//           imageRef.current.style.opacity = "1";
//           imageRef.current.style.visibility = "visible";
//         } else if (
//           currentFrame.current <
//           config.scannerDownFrames + config.scannerUpFrames
//         ) {
//           // scanner moving up → hide progressively
//           const step = currentFrame.current - config.scannerDownFrames; // 0..11
//           const percent = (1 - step / (config.scannerUpFrames - 1)) * 100;
//           imageRef.current.style.clipPath = `polygon(0 0, 100% 0, 100% ${percent}%, 0 ${percent}%)`;
//           imageRef.current.style.opacity = "1";
//           imageRef.current.style.visibility = "visible";
//         } else {
//           // after frame 26 → hide image
//           imageRef.current.style.opacity = "0";
//           imageRef.current.style.visibility = "hidden";
//         }
//       }

//       // --- Advance frame ---
//       currentFrame.current = (currentFrame.current + 1) % config.totalFrames;
//       lastFrameTime.current = currentTime;
//     }

//     animationFrameId.current = requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     animationFrameId.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationFrameId.current) {
//         cancelAnimationFrame(animationFrameId.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="h-screen w-screen flex justify-center items-center bg-black">
//       <div className=" fixed top-3 right-3">
//         <label htmlFor="frame-slide">Frame</label>
//         <input type="range" />
//       </div>
//       <div
//         ref={spriteRef}
//         style={{
//           width: `${config.frameWidth}px`,
//           height: `${config.frameHeight}px`,
//           backgroundImage: "url(/images/eggs-animation.png)",
//           backgroundSize: `${config.columns * config.frameWidth}px ${
//             config.rows * config.frameHeight
//           }px`,
//           backgroundRepeat: "no-repeat",
//         }}
//       />
//       <div className="absolute  w-[396px] aspect-square -mt-[20px]">
//         <img
//           ref={imageRef}
//           src="./images/revealing-nfts.png"
//           alt=""
//           className="w-full h-full absolute top-0 overflow-clip"
//           style={{
//             clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
//             opacity: 0,
//             visibility: "hidden",
//             transition: "opacity 0.2s linear",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// const NftReveal = () => {
//   const spriteRef = useRef<HTMLDivElement>(null);
//   const lastFrameTime = useRef(0);
//   const animationFrameId = useRef<number | null>(null);
//   const currentFrame = useRef(0);

//   const imageRef = useRef<HTMLImageElement>(null);

//   const config = {
//     frameWidth: 682,
//     frameHeight: 682,
//     columns: 10,
//     rows: 10,
//     spriteAnimationSpeed: 80, // ms per frame
//   };

//   const numFrames = config.rows * config.columns;

//   const animateSprite = (currentTime: number) => {
//     const elapsed = currentTime - lastFrameTime.current;

//     if (elapsed > config.spriteAnimationSpeed) {
//       if (spriteRef.current) {
//         const col = currentFrame.current % config.columns;
//         const row = Math.floor(currentFrame.current / config.columns);

//         spriteRef.current.style.backgroundPosition = `-${
//           col * config.frameWidth
//         }px -${row * config.frameHeight}px`;
//       }

//       currentFrame.current = (currentFrame.current + 1) % numFrames;
//       lastFrameTime.current = currentTime;
//     }

//     animationFrameId.current = requestAnimationFrame(animateSprite);
//   };

//   useEffect(() => {
//     animationFrameId.current = requestAnimationFrame(animateSprite);

//     if (!imageRef.current) return;
//     imageRef.current.addEventListener("animationend", () => {
//       if (!imageRef.current) return;
//       imageRef.current.style.opacity = "0";
//       imageRef.current.style.visibility = "hidden";
//     });

//     return () => {
//       if (animationFrameId.current) {
//         cancelAnimationFrame(animationFrameId.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="h-screen w-screen flex justify-center items-center bg-black">
//       <div
//         className=" guide"
//         ref={spriteRef}
//         style={{
//           width: `${config.frameWidth}px`,
//           height: `${config.frameHeight}px`,
//           backgroundImage: "url(/images/eggs-animation.png)",
//           backgroundSize: `${config.columns * config.frameWidth}px ${
//             config.rows * config.frameHeight
//           }px`,
//           backgroundRepeat: "no-repeat",
//         }}
//       />
//       <div className=" h-[65vh] absolute w-[22%] -mt-[40px]">
//         <img
//           ref={imageRef}
//           src="./images/section-mint/minting-image.png"
//           alt=""
//           className="myImgFast w-full h-full absolute top-0  overflow-clip"
//         />
//       </div>
//     </div>
//   );
// };

// export default NftReveal;

// const NftReveal = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [, setRevealProgress] = useState(0); // 0 to 1

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handleTimeUpdate = () => {
//       const duration = 4;
//       const progress = Math.min(video.currentTime / duration, 1);
//       setRevealProgress(progress);
//     };

//     video.addEventListener("timeupdate", handleTimeUpdate);
//     return () => video.removeEventListener("timeupdate", handleTimeUpdate);
//   }, []);

//   return (
//     <div className="bg-black h-screen w-screen relative flex flex-row justify-center items-center ">
//       <div className=" h-[65vh] absolute w-[22%] -mt-[40px] ">
//         <img
//           src="./images/section-mint/minting-image.png"
//           alt=""
//           className="myImgFast w-full h-full absolute top-0  overflow-clip"
//         />
//       </div>
//       <video
//         className=" w-screen h-screen"
//         ref={videoRef}
//         autoPlay
//         muted
//         playsInline
//       >
//         <source src="./images/eggs-cracking-win.webm" type="video/webm" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

export default NftReveal;
