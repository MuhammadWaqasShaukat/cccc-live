import { useContext, useEffect, useRef, useState } from "react";
import { IParticle } from "../Eggs/EggRevealAnimation";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { nftRevealAnimation } from "../../constants/animationsConfig";
import { useNFTRevealAnimator } from "../../hooks/useNFTRevealAnimator";

const NftReveal = () => {
  const ctx = useContext(CottonCandyContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  const [startSpinning, setStartSpinning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showScanLine, setShowScanLine] = useState(true);

  const { startAnimation, currentFrameNo, stopAnimation } =
    useNFTRevealAnimator({
      spriteRef: spriteRef,
      config: nftRevealAnimation,
      setIsLooping: () => {},
      speed: 0.3,
    });

  useEffect(() => {
    if (startSpinning) startAnimation();
  }, [startSpinning]);

  useEffect(() => {
    if (currentFrameNo >= nftRevealAnimation.endRepeatFrameIndex!) {
      stopAnimation();
      setStartSpinning(false);
      ctx.setRevealNFT(false);
      ctx.setCurrentModal("nfts");
    }
  }, [currentFrameNo]);

  // scanning + painting
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const SIZE = 500;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const imgReveal = new Image();
    imgReveal.crossOrigin = "anonymous";
    imgReveal.src = "/images/revealing-nfts.png";

    let lineY = 0;
    const speed = 6;
    const particles: IParticle[] = [];
    let animationId: number;

    class Particle implements IParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      lifetime: number;
      age: number;
      constructor(x: number, y: number) {
        this.x = x + Math.random() * SIZE;
        this.y = y + 0.5;
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
      const glowHeight = 30;
      const gradient = ctx2d.createLinearGradient(
        0,
        lineY - glowHeight,
        0,
        lineY + glowHeight
      );
      gradient.addColorStop(0, "rgba(0,255,255,0)");
      gradient.addColorStop(0.45, "rgba(0,255,255,0.25)");
      gradient.addColorStop(0.5, "rgba(255,255,255,0.9)");
      gradient.addColorStop(0.55, "rgba(0,255,255,0.25)");
      gradient.addColorStop(1, "rgba(0,255,255,0)");
      ctx2d.save();
      ctx2d.fillStyle = gradient;
      ctx2d.fillRect(0, lineY - glowHeight, SIZE, glowHeight * 2);
      ctx2d.restore();
    };

    const drawMaskedImage = (visibleHeight: number) => {
      ctx2d.save();
      ctx2d.beginPath();
      ctx2d.rect(0, 0, SIZE, visibleHeight);
      ctx2d.clip();
      ctx2d.drawImage(imgReveal, 0, 0, SIZE, SIZE);
      ctx2d.restore();
    };

    const animate = () => {
      ctx2d.clearRect(0, 0, SIZE, SIZE);

      const visibleHeight = scanComplete ? SIZE : Math.min(lineY, SIZE);
      drawMaskedImage(visibleHeight);

      // optional: add particles while scanning
      if (!scanComplete) {
        for (let i = 0; i < 4; i++) particles.push(new Particle(0, lineY));
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx2d);
        if (p.opacity <= 0) particles.splice(i, 1);
      }

      if (showScanLine && !scanComplete) drawScanLine();

      // advance the line until we fill the canvas
      if (!scanComplete) {
        lineY += speed;
        const percent = (lineY / SIZE) * 100;
        if (!startSpinning && percent >= 85) setStartSpinning(true);
        if (lineY >= SIZE) {
          setScanComplete(true);
          setShowScanLine(false); // hide beam but NFT stays
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    imgReveal.onload = () => animate();
    return () => cancelAnimationFrame(animationId);
  }, [scanComplete]);

  return (
    <div className="absolute top-0 left-0">
      <div className="relative h-screen w-screen flex justify-center items-center bg-black z-100">
        {/* sprite stays behind */}
        {startSpinning && (
          <div
            ref={spriteRef}
            className="absolute z-0 pointer-events-none max-h-[682px] max-w-[682px] aspect-square"
            style={{
              width: "682px",
              height: "682px",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}
        {/* canvas stays in front */}
        <canvas ref={canvasRef} className="z-10 w-[20%] aspect-square" />
      </div>
    </div>
  );
};

export default NftReveal;
