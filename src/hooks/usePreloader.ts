import { useEffect, useState } from "react";
import { pathToId } from "../utils/pathToId";

type PreloadType = "image" | "video" | "audio";

interface PreloadState {
  progress: number;
  loaded: number;
  total: number;
  done: boolean;
  promise: Promise<void> | null;
}

export function usePreloader(
  sources: string[],
  type: PreloadType,
  defer: boolean = false
): PreloadState {
  const [state, setState] = useState<Omit<PreloadState, "promise">>({
    progress: 0,
    loaded: 0,
    total: sources.length,
    done: false,
  });
  const [promise, setPromise] = useState<Promise<void> | null>(null);

  useEffect(() => {
    if (sources.length === 0) return;

    let cancelled = false;

    // Create hidden container
    const container = document.createElement("div");
    container.style.display = "none";
    document.body.appendChild(container);

    const preload = () => {
      let loaded = 0;

      const promises = sources.map(
        (src) =>
          new Promise<void>((resolve) => {
            let el: HTMLImageElement | HTMLVideoElement | HTMLAudioElement;

            switch (type) {
              case "image":
                el = new Image();
                break;
              case "video":
                el = document.createElement("video");
                (el as HTMLVideoElement).preload = "auto";
                break;
              case "audio":
                el = document.createElement("audio");
                (el as HTMLAudioElement).preload = "auto";
                break;
              default:
                resolve();
                return;
            }

            el.id = pathToId(src);

            const done = () => {
              if (cancelled) return;
              loaded++;
              setState((prev) => ({
                ...prev,
                loaded,
                progress: loaded / sources.length,
                done: loaded === sources.length,
              }));
              resolve();
            };

            el.onload = el.onloadeddata = done;
            el.onerror = done;

            // Append to hidden container
            container.appendChild(el);

            // Start loading
            el.src = src;
            if (type === "video" || type === "audio") {
              (el as HTMLMediaElement).load();
            }
          })
      );

      const all = Promise.all(promises).then(() => {
        if (!cancelled) {
          setState((prev) => ({ ...prev, done: true, progress: 1 }));
        }
      });

      setPromise(all);
    };

    if (defer && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(preload);
    } else if (defer) {
      setTimeout(preload, 200);
    } else {
      preload();
    }

    return () => {
      cancelled = true;
      document.body.removeChild(container);
    };
  }, [sources, type, defer]);

  return { ...state, promise };
}
