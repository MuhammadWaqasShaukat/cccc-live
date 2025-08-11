import { useEffect, useRef, useState } from "react";

const NftReveal = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setRevealProgress] = useState(0); // 0 to 1

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const duration = 4;
      const progress = Math.min(video.currentTime / duration, 1);
      setRevealProgress(progress);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <div className="bg-black relative flex flex-row justify-center items-center ">
      <div className=" h-[65vh] absolute w-[22%] -mt-[40px] ">
        <img
          src="./images/section-mint/minting-image.png"
          alt=""
          className="myImg w-full h-full absolute top-0  overflow-clip"
        />
      </div>
      <video
        className=" w-screen h-screen"
        ref={videoRef}
        autoPlay
        muted
        playsInline
      >
        <source src="./images/animations/particles.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default NftReveal;
