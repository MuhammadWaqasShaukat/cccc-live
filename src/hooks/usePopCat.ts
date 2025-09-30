import { RefObject, useRef } from "react";

const usePopCat = (
  catRef: RefObject<HTMLImageElement>,
  audioRef: RefObject<HTMLAudioElement>
) => {
  const internalAudioRef = useRef<HTMLAudioElement>(audioRef.current);

  const isMouthOpenCheck = () =>
    catRef.current?.src.includes("open") ? true : false;

  const handleMouseDown = () => {
    if (!catRef.current) return;

    const isMouthOpen = isMouthOpenCheck();
    if (!isMouthOpen) {
      catRef.current.src = "/images/section-hero/popcat-open-mouth.webp";
      if (!internalAudioRef.current) {
        //@ts-ignore
        internalAudioRef.current = new Audio("./sound/pop-cat.mp3");
        internalAudioRef.current.volume = 1;
      }
      internalAudioRef.current.currentTime = 0;
      internalAudioRef.current.play();
    }
  };

  const handleMouseUp = () => {
    if (!catRef.current) return;

    const isMouthOpen = isMouthOpenCheck();

    if (isMouthOpen) {
      catRef.current.src = "/images/section-hero/popcat.webp";
    }
  };

  return {
    isMouthOpenCheck,
    handleMouseDown,
    handleMouseUp,
  };
};

export default usePopCat;
