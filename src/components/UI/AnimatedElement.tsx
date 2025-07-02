import { useRef } from "react";

type AnimatedElementType = {
  className: string;
  source: string;
};

const AnimatedElement: React.FC<AnimatedElementType> = ({
  className,
  source,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    videoRef.current!.currentTime = 0; // Optional: reset to start
  };

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      loop
      preload="auto"
      className={` ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <source src={source} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};

export default AnimatedElement;
