import { useRef, useState } from "react";

const HammerStrike = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lastPlayTime, setLastPlayTime] = useState<number>(0);
  const minPlayPercent = 0.8;

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
