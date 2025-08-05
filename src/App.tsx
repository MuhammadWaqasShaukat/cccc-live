import "./App.css";
import Home from "./pages/Home";
import { useContext, useEffect, useRef } from "react";
import SnakeLoader from "./components/UI/SnakeLoader";
import { motion } from "framer-motion";
import { CottonCandyContext } from "./providers/ContextProvider";

function App() {
  const ctx = useContext(CottonCandyContext);

  const preloadContainer = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const imageAssets = [
    "/images/section-about/grass.png",
    "/images/section-hero/chillguy.png",
    "/images/section-hero/castle-red-1.png",
    "/images/section-hero/frog.png",
    "/images/section-hero/castle-red-top.png",
    "/images/section-hero/memcoin1.png",
    "/images/cursor-glove.png",
    "/images/section-hero/memcoin2.png",
    "/images/section-hero/logo-lg.png",
    "/images/section-hero/field.png",
    "/images/section-hero/distant-bg.png",
    "/images/section-hero/castle-blue.png",
    "/images/section-hero/castle-blue-top.png",
    "/images/section-hero/bg-upper.png",
    "/images/section-hero/memcoin4.png",
    "/images/section-hero/memcoin5.png",
    "/images/section-hero/memcoin6.png",
    "/images/section-hero/memcoin7.png",
    "/images/section-hero/memcoin8.png",
    "/images/section-hero/menu-button.png",
    "/images/section-hero/menu-tombstone.png",
    "/images/section-hero/red1.png",
    "/images/section-hero/red2.png",
    "/images/section-hero/shark1.png",
    "/images/section-hero/shark2.png",
    "/images/cow-face.png",
    "/images/logo-header.png",
    "/images/sheep-face.png",
    "/images/section-about/castMotionConfig.divle.about.png",
    "/images/section-about/memnft-about.png",
    "/images/section-mint/mint-book.png",
    "/images/section-mint/mint-book-sm.png",
    "/images/custom-scrollbar-track.png",
    "/images/custom-scrollbar-thumb.png",
    "/images/tutorial-badge.png",
    "/images/section-hero/menu-button-hovered.png",
    "/images/section-hero/connect.png",
    "/images/ok-btn.png",
    "/images/sm-about-ok-btn.png",
    "/images/sell-nft-btn.png",
    "/images/egg-summon-btn.png",
    "/images/egg-summon-btn-1.png",
    "/images/mint-btn.png",
    "/images/mint-now-sm-btn.png",
    "/images/mint-now-sm-hovered-btn.png",
    "/images/slider-btn.png",
    "/images/egg-summon-btn-1-2.png",
    "/images/banner.png",
    "/images/bookmarks/sm-min-corner.png",
    "/images/bookmarks/bm-sm-mint.png",
    "/images/bookmarks/bm-sm-eggs.png",
    "/images/bookmarks/bm-sm-nfts.png",
    "/images/bookmarks/bm-sm-1.png",
    "/images/bookmarks/help-bg.png",
    "/images/bookmarks/mint-icon.png",
    "/images/bookmarks/nft-icon.png",
    "/images/bookmarks/egg-icon.png",
    "/images/bookmarks/bookmark-mint.png",
    "/images/bookmarks/bookmark-mint-1.png",
    "/images/bookmarks/bookmark-nft.png",
    "/images/bookmarks/bookmark-nft-1.png",
    "/images/bookmarks/bookmark-egg.png",
    "/images/bookmarks/bookmark-egg-1.png",
    "/images/plus.svg",
    "/images/minus.svg",
    "/images/egg.png",
    "/images/egg-1.png",
    "/images/egg-glow.png",
    "/images/egg-glow-1.png",
    "/images/section-about/castle.about.png",
    "/images/section-about/castle.about.sm.png",
  ];

  const preloadVideosAndAudio = () => {
    const videoSources = [
      "/images/animations/fire.webm",
      "/images/animations/Magic.webm",
      "/images/animations/particles.webm",
      "/images/animations/candle.webm",
      "/images/animations/about.webm",
      "/images/animations/archer.webm",
      "/images/animations/hammer.webm",
    ];

    const audioSources = ["/sound/pop-cat.mp3"];

    const container = preloadContainer.current;

    if (!container) return;
    container.style.display = "none";

    const videoPromises = videoSources.map((src) => {
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

    const audioPromises = audioSources.map((src) => {
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

    const imagePromises = imageAssets.map((src) => {
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

      {!ctx.assestsPreloaded && (
        <motion.div
          className="w-screen h-screen bg-black"
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.5 } }}
        >
          <SnakeLoader />
        </motion.div>
      )}
      <div className="overflow-x-hidden">
        <Home />
      </div>
    </>
  );
}

export default App;
