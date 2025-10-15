import "./App.css";
import Home from "./pages/Home";
import { useContext, useEffect, useRef, useState } from "react";
import SnakeLoader from "./components/UI/SnakeLoader";
import { CottonCandyContext } from "./providers/ContextProvider";
import {
  AUDIO_SOURCES,
  CRITICAL_ASSETS,
  IMGS_SOURCES,
  VIDEO_SOURCES,
} from "./constants/preloadingAssestList";
import { usePreloader } from "./hooks/usePreloader";
import Collection from "./pages/Collection";

function App() {
  const ctx = useContext(CottonCandyContext);
  const [loading, setLoading] = useState(true);
  const { promise } = usePreloader(CRITICAL_ASSETS, "image");

  useEffect(() => {
    if (promise) {
      promise.then(() => {
        setLoading(false);
      });
    }
  }, [promise]);

  usePreloader(VIDEO_SOURCES, "video", true);
  usePreloader(AUDIO_SOURCES, "audio", true);
  usePreloader(IMGS_SOURCES, "image", true);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const pressCursor = () => {
      cursor.style.transition = "transform 0.3s ease"; // smooth
      cursor.style.transform = "translate(-25%, -10%) rotate(-25deg)";
    };

    const releaseCursor = () => {
      cursor.style.transition = "transform 0.3s ease"; // smooth
      cursor.style.transform = "translate(-25%, -10%) rotate(0deg)";
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mousedown", pressCursor);
    document.addEventListener("mouseup", releaseCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousedown", pressCursor);
      document.removeEventListener("mouseup", releaseCursor);
    };
  }, [ctx.assestsPreloaded]);

  return (
    <>
      <div ref={cursorRef} className="sm:block hidden" id="custom-cursor"></div>

      {loading && <SnakeLoader className="!bg-[#848484]" />}

      <div className="overflow-x-hidden">
        {ctx.activeMenu === "collection" ? <Collection /> : <Home />}
      </div>
    </>
  );
}

export default App;
