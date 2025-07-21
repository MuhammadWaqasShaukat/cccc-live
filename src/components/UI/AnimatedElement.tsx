import { RefObject } from "react";

type AnimatedElementType = {
  className: string;
  source: string;
  videoRef: RefObject<HTMLVideoElement>;
};

const AnimatedElement: React.FC<AnimatedElementType> = ({
  className,
  source,
  videoRef,
}) => {
  return (
    <video
      ref={videoRef}
      muted
      playsInline
      loop
      preload="auto"
      className={` ${className}`}
    >
      <source src={source} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};

export default AnimatedElement;
