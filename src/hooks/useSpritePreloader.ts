import { useEffect, useState, useCallback, useContext, useRef } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import { SPRITES_SOURCES } from "../constants/preloadingAssestList";
import { pathToId } from "../utils/pathToId";

export function useSpritePreloader() {
  const { setSprites } = useContext(CottonCandyContext);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const hasLoadedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // --- helper to create hidden container ---
  const getContainer = useCallback(() => {
    if (!containerRef.current) {
      const container = document.createElement("div");
      container.id = "sprite-preload-container";
      container.style.display = "none";
      document.body.appendChild(container);
      containerRef.current = container;
    }
    return containerRef.current;
  }, []);

  // --- main preloader (all SPRITES_SOURCES) ---
  const preload = useCallback(async () => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    setLoading(true);
    setProgress(0);

    const total = Object.values(SPRITES_SOURCES).flat().length;
    let loadedCount = 0;
    const container = getContainer();

    const loadImage = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.id = pathToId(url);
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / total) * 100));
          container?.appendChild(img);
          resolve(img);
        };
        img.onerror = reject;
      });

    const entries = await Promise.all(
      Object.entries(SPRITES_SOURCES).map(async ([key, urls]) => {
        const imgs = await Promise.all(urls.map(loadImage));
        return [key, imgs] as const;
      })
    );

    const map: Record<string, HTMLImageElement[]> = {};
    for (const [k, v] of entries) map[k] = v;

    setSprites(map);
    setLoading(false);
  }, [getContainer, setSprites]);

  // --- new ensureSprites method (for custom urls) ---
  const ensureSprites = useCallback(
    async (key: string, urls: string[]) => {
      const container = getContainer();

      const loadImage = (url: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const id = pathToId(url);
          let existing = document.getElementById(id) as HTMLImageElement | null;

          if (existing) {
            // Already in DOM
            resolve(existing);
            return;
          }

          const img = new Image();
          img.id = id;
          img.src = url;

          // ✅ Append immediately (so it’s always in the DOM)
          container?.appendChild(img);

          img.onload = () => resolve(img);
          img.onerror = reject;
        });

      const imgs = await Promise.all(urls.map(loadImage));

      // ✅ Dedup + update sprites memory
      setSprites((prev: Record<string, HTMLImageElement[]>) => {
        const existing = prev[key] || [];
        const merged = [...existing];

        imgs.forEach((img) => {
          if (!merged.find((i) => i.id === img.id)) {
            merged.push(img);
          }
        });

        return { ...prev, [key]: merged };
      });

      return imgs;
    },
    [getContainer, setSprites]
  );

  useEffect(() => {
    preload();
  }, [preload]);

  return { loading, progress, preload, ensureSprites };
}
