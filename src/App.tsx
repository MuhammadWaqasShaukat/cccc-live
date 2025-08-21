import "./App.css";
import Home from "./pages/Home";
import { useContext, useEffect, useRef } from "react";
import SnakeLoader from "./components/UI/SnakeLoader";
import { CottonCandyContext } from "./providers/ContextProvider";
import {
  AUDIO_SOURCES,
  IMGS_SOURCES,
  VIDEO_SOURCES,
} from "./constants/preloadingAssestList";

function App() {
  const ctx = useContext(CottonCandyContext);

  const preloadContainer = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const preloadVideosAndAudio = () => {
    const container = preloadContainer.current;

    if (!container) return;
    container.style.display = "none";

    const videoPromises = VIDEO_SOURCES.map((src) => {
      return new Promise<void>((resolve) => {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.dataset.key = src;
        video.muted = true;
        video.oncanplaythrough = () => resolve();
        video.onerror = () => resolve();
        container.appendChild(video);
      });
    });

    const audioPromises = AUDIO_SOURCES.map((src) => {
      return new Promise<void>((resolve) => {
        const audio = document.createElement("audio");
        audio.src = src;
        audio.dataset.key = src;
        audio.preload = "auto";
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => resolve();
        container.appendChild(audio);
      });
    });

    return Promise.all([...videoPromises, ...audioPromises]);
  };

  const preloadAssets = async () => {
    const _preloaderContainer = preloadContainer.current;

    const imageElements: HTMLImageElement[] = [];

    const imagePromises = IMGS_SOURCES.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.dataset.key = src;
        img.style.display = "none";
        img.onload = img.onerror = () => resolve();
        _preloaderContainer?.appendChild(img);
        imageElements.push(img);
      });
    });

    const videoAndAudioPromises = await preloadVideosAndAudio();

    if (videoAndAudioPromises) {
      await Promise.all([...imagePromises, ...videoAndAudioPromises]);
    } else {
      await Promise.all([...imagePromises]);
    }
  };

  useEffect(() => {
    preloadAssets();
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const buttonDetector = () => {
      cursor.style.transform = "translate(-25%, -10%) rotate(10deg)";

      setTimeout(() => {
        cursor.style.transform = "translate(-25%, -10%)";
      }, 100);
    };

    document.addEventListener("click", buttonDetector);
    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("click", buttonDetector);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id="custom-cursor"></div>

      <div
        ref={preloadContainer}
        id="preload-container"
        className="absolute "
      ></div>

      {!ctx.assestsPreloaded && <SnakeLoader className="!bg-black" />}
      <div className="overflow-x-hidden">
        <Home />
      </div>
    </>
  );
}

export default App;
