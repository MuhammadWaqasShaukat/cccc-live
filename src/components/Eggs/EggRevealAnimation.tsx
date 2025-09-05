import React, { useRef, useEffect, useState, useContext } from "react";
import { useEggBreakAnimation } from "../../hooks/useEggBreakAnimation";
import { motion } from "framer-motion";
import { CottonCandyContext } from "../../providers/ContextProvider";
import {
  badEggRevealAnimationConfig,
  goodEggRevealAnimationConfig,
} from "../../constants/animationsConfig";

export type EggAnimationConfig = {
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  spriteAnimationSpeed: number;
  startFrameIndex: number;
  repeatFrameIndex: number;
  endRepeatFrameIndex: number;
};

export interface IParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  lifetime: number;
  age: number;
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

const eggShakeConfig = {
  frameWidth: 500,
  frameHeight: 500,
};

const GoodReveal: React.FC<{
  setShakingEgg: (param: boolean) => void;
}> = ({ setShakingEgg }) => {
  const ctx = useContext(CottonCandyContext);
  const shakerRef = useRef<HTMLDivElement>(null);
  const [isLooping, setIsLooping] = useState(false);



  const { startAnimation, currentFrameNo } = useEggBreakAnimation({
    spriteRef: shakerRef,
    config: goodEggRevealAnimationConfig, //eggShakeConfig,
    setIsLooping,
    speed: 1,
  });

  useEffect(() => {
    startAnimation();
  }, []);

  const handleClose = () => {
    if (ctx.revealReward) {
      ctx.setRevealReward(null);
      ctx.setIsEggCracked(false);
    }
  };

  useEffect(() => {
    if (currentFrameNo > 41) setShakingEgg(true);
  }, [currentFrameNo]);
  return (
    <div className="relative  flex flex-col justify-center items-center">
      <div
        ref={shakerRef}
        className="sprite-container max-w-[500px] max-h-[500px] z-0 pointer-events-none"
        style={{
          width: `${eggShakeConfig.frameWidth}px`,
          height: `${eggShakeConfig.frameHeight}px`,
          // backgroundImage: "url(images/animations/sprites/win.png)",
          // backgroundSize: `${eggShakeConfig.columns * 100}% ${
          //   eggShakeConfig.rows * 100
          // }%`,
        }}
      ></div>

      <motion.button
        onClick={handleClose}
        className="absolute bottom-0 bg-close-btn bg-contain bg-no-repeat bg-center w-56 h-16 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLooping ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
        <span className="absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-[22px] md:text-3xl leading-none uppercase text-white z-60">
          Close
        </span>
      </motion.button>
    </div>
  );
};

const BadReveal: React.FC<{
  setShakingEgg: (param: boolean) => void;
}> = ({ setShakingEgg }) => {
  const ctx = useContext(CottonCandyContext);
  const shakerRef = useRef<HTMLDivElement>(null);
  const [isLooping, setIsLooping] = useState(false);

  // const eggShakeConfig: EggAnimationConfig = {
  //   frameWidth: 500,
  //   frameHeight: 500,
  //   columns: 8,
  //   rows: 32,
  //   spriteAnimationSpeed: 50,
  //   startFrameIndex: 41,
  //   repeatFrameIndex: 172,
  //   endRepeatFrameIndex: 191,
  // };

  const { startAnimation, currentFrameNo } = useEggBreakAnimation({
    spriteRef: shakerRef,
    config: badEggRevealAnimationConfig, //eggShakeConfig,
    setIsLooping,
    speed: 1,
  });

  const handleClose = () => {
    if (ctx.revealReward) {
      ctx.setRevealReward(null);
      ctx.setIsEggCracked(false);
    }
  };

  useEffect(() => {
    startAnimation();
  }, []);

  useEffect(() => {
    if (currentFrameNo > 41) setShakingEgg(true);
  }, [currentFrameNo]);
  return (
    <div className="relative  flex flex-col justify-center items-center">
      <div
        ref={shakerRef}
        className="sprite-container max-w-[500px] max-h-[500px] z-0 pointer-events-none"
        style={{
          width: `${eggShakeConfig.frameWidth}px`,
          height: `${eggShakeConfig.frameHeight}px`,
          // backgroundImage: "url(images/animations/sprites/lost.png",
          // backgroundSize: `${eggShakeConfig.columns * 100}% ${
          //   eggShakeConfig.rows * 100
          // }%`,
        }}
      ></div>

      <motion.button
        onClick={handleClose}
        className="absolute bottom-0 bg-close-btn bg-contain bg-no-repeat bg-center w-56 h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLooping ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
        <span className="absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-[22px] md:text-3xl leading-none uppercase text-white z-60">
          Close
        </span>
      </motion.button>
    </div>
  );
};

const EggRevealAnimation: React.FC<{ reveal: "good" | "bad" }> = ({
  reveal,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isGoodReveal, setIsGoodReveal] = useState<boolean>(false);
  const [shakingEgg, setShakingEgg] = useState<boolean>(false);

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
    bgDown.src = "public/images/animations/sprites/dir-down.png";
    bgUp.src = "public/images/animations/sprites/dir-up.png";

    let lineY = 0;
    let direction = 1;
    const speedDown = 6;
    const speedUp = 4.5;
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
        if (lineY >= CANVAS_SIZE) {
          direction = -1;
        }
      } else {
        lineY = Math.max(0, lineY - speedUp);
        if (lineY <= 0) {
          setIsDone(true);
          setIsGoodReveal(() => (reveal === "good" ? true : false));
          return;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const imagesLoaded = Promise.all([
      new Promise<void>((res) => {
        imgReveal.onload = () => res();
      }),
      new Promise<void>((res) => {
        bgDown.onload = () => res();
      }),
      new Promise<void>((res) => {
        bgUp.onload = () => res();
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
    <div className={`absolute top-0 w-screen h-screen z-[999] bg-black/60`}>
      <div
        className={`${isGoodReveal ? "bg-[#C9840F26]" : "bg-[#0F18C926]"}`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {isDone ? (
          isGoodReveal ? (
            <GoodReveal setShakingEgg={setShakingEgg} />
          ) : (
            <BadReveal setShakingEgg={setShakingEgg} />
          )
        ) : (
          <canvas ref={canvasRef} />
        )}
        {isDone && !shakingEgg && (
          <div className=" absolute grid place-content-center">
            <img src="public/images/animations/sprites/dir-up.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EggRevealAnimation;
