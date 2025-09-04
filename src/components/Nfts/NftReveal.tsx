import { useContext, useEffect, useRef, useState } from "react";
import { IParticle } from "../Eggs/EggRevealAnimation";
import { useEggBreakAnimation } from "../../hooks/useEggBreakAnimation";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { nftRevealAnimation } from "../../constants/animationsConfig";

const NftReveal = () => {
  const ctx = useContext(CottonCandyContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [startSpinning, setStartSpinning] = useState<boolean>(false);

  const particlesConfig = {
    frameWidth: 682,
    frameHeight: 682,
    // columns: 5,
    // rows: 13,
    // spriteAnimationSpeed: 50,
    // startFrameIndex: 39,
    // repeatFrameIndex: 39,
    // endRepeatFrameIndex: 61,
  };

  const { startAnimation, currentFrameNo, stopAnimation } =
    useEggBreakAnimation({
      spriteRef: spriteRef,
      config: nftRevealAnimation,
      setIsLooping: () => {},
    });

  useEffect(() => {
    if (startSpinning) {
      startAnimation();
    }
  }, [startSpinning]);

  useEffect(() => {
    if (currentFrameNo >= nftRevealAnimation.endRepeatFrameIndex!) {
      stopAnimation();
      setStartSpinning(false);
      ctx.setRevealNFT(false);
      ctx.setCurrentModal("nfts");
    }
  }, [currentFrameNo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CANVAS_SIZE = 500;
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    const imgReveal = new Image();
    const bgDown = new Image();
    const bgUp = new Image();

    imgReveal.crossOrigin = bgDown.crossOrigin = bgUp.crossOrigin = "anonymous";
    imgReveal.src = "public/images/revealing-nfts.png";

    let lineY = 0;
    let direction = 1;
    const speedDown = 6;
    let animationFrameId: number;

    const particles: IParticle[] = [];

    class Particle implements IParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      lifetime: number;
      age: number;

      constructor(x: number, y: number) {
        this.x = x + Math.random() * CANVAS_SIZE;
        this.y = y + 1 / 2;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 4 + 3;
        this.opacity = 1;
        this.lifetime = 60;
        this.age = 0;
      }

      update() {
        this.y += this.speedY;
        this.age++;
        this.opacity = 1 - this.age / this.lifetime;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "cyan";
        ctx.shadowBlur = 25;
        ctx.shadowColor = "cyan";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const drawScanLine = () => {
      const beamY = lineY;
      const glowHeight = 30;
      const gradient = ctx.createLinearGradient(
        0,
        beamY - glowHeight,
        0,
        beamY + glowHeight
      );

      gradient.addColorStop(0, "rgba(0, 255, 255, 0)");
      gradient.addColorStop(0.45, "rgba(0, 255, 255, 0.25)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
      gradient.addColorStop(0.55, "rgba(0, 255, 255, 0.25)");
      gradient.addColorStop(1, "rgba(0, 255, 255, 0)");

      ctx.save();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, beamY - glowHeight, CANVAS_SIZE, glowHeight * 2);
      ctx.restore();
    };

    const drawImageMaskedByVisibleHeight = (
      img: HTMLImageElement,
      visibleHeight: number
    ) => {
      if (visibleHeight <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, CANVAS_SIZE, Math.min(visibleHeight, CANVAS_SIZE));
      ctx.clip();
      ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.restore();
    };

    const animate = () => {
      if (isDone) return; // Stop animation if the cycle is complete

      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      if (direction === 1) {
        ctx.drawImage(bgDown, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      } else {
        ctx.drawImage(bgUp, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      }

      const visibleHeight = Math.max(0, Math.min(CANVAS_SIZE, lineY));
      drawImageMaskedByVisibleHeight(imgReveal, visibleHeight);

      drawScanLine();

      for (let i = 0; i < 4; i++) {
        particles.push(new Particle(0, lineY));
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.opacity <= 0) particles.splice(i, 1);
      }

      if (direction === 1) {
        lineY = Math.min(CANVAS_SIZE, lineY + speedDown);

        const percentCovered = (lineY / CANVAS_SIZE) * 100;

        if (!startSpinning && percentCovered > 80) {
          setStartSpinning(true);
        }
        if (lineY >= CANVAS_SIZE) {
          setIsDone(true);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const imagesLoaded = Promise.all([
      new Promise<void>((res) => {
        imgReveal.onload = () => res();
      }),
    ]);

    imagesLoaded.then(() => {
      lineY = 0;
      animate();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDone]);

  return (
    <div className=" absolute top-0 left-0">
      <div className="relative h-screen w-screen flex justify-center items-center bg-black z-[99990]">
        {startSpinning && (
          <div
            ref={spriteRef}
            className="absolute max-w-[682px] max-h-[682px] z-0 pointer-events-none"
            style={{
              width: `${particlesConfig.frameWidth}px`,
              height: `${particlesConfig.frameHeight}px`,
              // backgroundImage: "url(images/particels-sprite.png)",
              // backgroundSize: `${particlesConfig.columns * 100}% ${
              //   particlesConfig.rows * 100
              // }%`,
            }}
          ></div>
        )}
        <canvas ref={canvasRef} />
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

//   const [frameValue, setFrameValue] = useState(0); // display + manual control
//   const [isPlaying, setIsPlaying] = useState(true); // toggle animation

//   const config = {
//     frameWidth: 682,
//     frameHeight: 682,
//     columns: 10,
//     rows: 10,
//     spriteAnimationSpeed: 80, // ms per frame
//     totalFrames: 100,
//     scannerDownFrames: 14,
//     scannerUpFrames: 12,
//   };

//   const updateVisualsForFrame = (frame: number) => {
//     // Sprite sheet positioning
//     if (spriteRef.current) {
//       const col = frame % config.columns;
//       const row = Math.floor(frame / config.columns);
//       spriteRef.current.style.backgroundPosition = `-${
//         col * config.frameWidth
//       }px -${row * config.frameHeight}px`;
//     }

//     // Reveal/hide image based on scanner frames
//     if (imageRef.current) {
//       if (frame < config.scannerDownFrames) {
//         const percent = (frame / (config.scannerDownFrames - 1)) * 100;
//         imageRef.current.style.clipPath = `polygon(0 0, 100% 0, 100% ${percent}%, 0 ${percent}%)`;
//         imageRef.current.style.opacity = "1";
//         imageRef.current.style.visibility = "visible";
//       } else if (frame < config.scannerDownFrames + config.scannerUpFrames) {
//         const step = frame - config.scannerDownFrames;
//         const percent = (1 - step / (config.scannerUpFrames - 1)) * 100;
//         imageRef.current.style.clipPath = `polygon(0 0, 100% 0, 100% ${percent}%, 0 ${percent}%)`;
//         imageRef.current.style.opacity = "1";
//         imageRef.current.style.visibility = "visible";
//       } else {
//         imageRef.current.style.opacity = "0";
//         imageRef.current.style.visibility = "hidden";
//       }
//     }
//   };

//   const animate = (currentTime: number) => {
//     if (!isPlaying) return;

//     const elapsed = currentTime - lastFrameTime.current;

//     if (elapsed > config.spriteAnimationSpeed) {
//       updateVisualsForFrame(currentFrame.current);
//       setFrameValue(currentFrame.current);
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
//   }, [isPlaying]);

//   // Handle manual frame change
//   const handleFrameInputChange = (val: number) => {
//     const clamped = Math.max(0, Math.min(config.totalFrames - 1, val));
//     setFrameValue(clamped);
//     currentFrame.current = clamped;
//     updateVisualsForFrame(clamped);
//   };

//   return (
//     <div className="h-screen w-screen flex justify-center items-center bg-black">
//       <div className="fixed top-3 right-3 text-white flex flex-col gap-2">
//         <label htmlFor="frame-input">Frame: {frameValue}</label>
//         <input
//           id="frame-input"
//           type="number"
//           min={0}
//           max={config.totalFrames - 1}
//           value={frameValue}
//           onChange={(e) => handleFrameInputChange(Number(e.target.value))}
//           className="w-20 border rounded px-2 py-1 text-black"
//         />
//         <button
//           onClick={() => setIsPlaying((prev) => !prev)}
//           className="px-2 py-1 bg-gray-700 rounded"
//         >
//           {isPlaying ? "Pause" : "Play"}
//         </button>
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
//       <div className="absolute w-[396px] aspect-square -mt-[20px]">
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
