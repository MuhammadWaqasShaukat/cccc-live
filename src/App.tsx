import { Route, Switch } from "wouter";
import "./App.css";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import SnakeLoader from "./components/UI/SnakeLoader";

function App() {
  const [loading, setLoading] = useState(true);

  const imageAssets = [
    "/images/section-hero/chillguy.png",
    "/images/section-hero/castle-red-1.png",
    "/images/section-hero/frog.png",
    "/images/section-hero/castle-red-top.png",
    "/images/section-hero/memcoin1.png",
    "/images/cursor.png",
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
    "/images/section-about/castle.about.png",
    "/images/section-about/memnft-about.png",
    "/images/section-mint/mint-book.png",
  ];

  const preloadVideosAndAudio = () => {
    const videoSources = [
      "/images/animations/fire.webm",
      "/images/animations/Magic.webm",
      "/images/animations/particles.webm",
    ];

    const audioSources = ["/sound/pop-cat.mp3"];

    const videoPromises = videoSources.map((src) => {
      return new Promise<void>((resolve) => {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.muted = true;
        video.oncanplaythrough = () => resolve();
        video.onerror = () => resolve();
      });
    });

    const audioPromises = audioSources.map((src) => {
      return new Promise<void>((resolve) => {
        const audio = new Audio();
        audio.src = src;
        audio.preload = "auto";
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => resolve();
      });
    });

    return Promise.all([...videoPromises, ...audioPromises]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 10000); // fallback in case loading hangs

    const preloadAssets = async () => {
      const imagePromises = imageAssets.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        });
      });

      const videoAndAudioPromises = await preloadVideosAndAudio();

      await Promise.all([...imagePromises, ...videoAndAudioPromises]);

      clearTimeout(timeout);
      setLoading(false);
    };

    preloadAssets();
  }, []);

  if (loading) return <SnakeLoader />;

  return (
    <div className="overflow-x-hidden">
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
