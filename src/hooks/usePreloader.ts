import { useEffect, useState } from "react";

type PreloadType = "image" | "video" | "audio";

interface PreloadState {
  progress: number;
  loaded: number;
  total: number;
  done: boolean;
}

export function usePreloader(
  sources: string[],
  type: PreloadType,
  defer: boolean = false // if true → preload during idle
): PreloadState {
  const [state, setState] = useState<PreloadState>({
    progress: 0,
    loaded: 0,
    total: sources.length,
    done: false,
  });

  useEffect(() => {
    if (sources.length === 0) return;

    let cancelled = false;

    // Create hidden container
    const container = document.createElement("div");
    container.style.display = "none";
    document.body.appendChild(container);

    const preload = () => {
      let loaded = 0;
      sources.forEach((src) => {
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
            return;
        }

        el.src = src;
        container.appendChild(el); // 👈 append to hidden div

        el.onloadeddata = el.onload = () => {
          if (cancelled) return;
          loaded++;
          setState((prev) => ({
            ...prev,
            loaded,
            progress: loaded / sources.length,
            done: loaded === sources.length,
          }));
        };

        el.onerror = () => {
          if (cancelled) return;
          loaded++;
          setState((prev) => ({
            ...prev,
            loaded,
            progress: loaded / sources.length,
            done: loaded === sources.length,
          }));
        };
      });
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

  return state;
}
