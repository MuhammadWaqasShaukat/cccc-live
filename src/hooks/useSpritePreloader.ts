import { useEffect, useState, useCallback, useContext } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import { SPRITES_SOURCES } from "../constants/preloadingAssestList";

export function useSpritePreloader() {
  const { setSprites } = useContext(CottonCandyContext);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const preload = useCallback(async () => {
    setLoading(true);
    setProgress(0);

    const total = Object.values(SPRITES_SOURCES).flat().length;
    let loadedCount = 0;

    const loadImage = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / total) * 100));
          resolve(img);
        };
        img.onerror = reject;
      });

    const loadAll = async () => {
      const entries = await Promise.all(
        Object.entries(SPRITES_SOURCES).map(async ([key, urls]) => {
          const imgs = await Promise.all(urls.map(loadImage));
          return [key, imgs] as const;
        })
      );

      const map: any = {};
      for (const [k, v] of entries) map[k] = v;
      setSprites(map);
      setLoading(false);
    };

    await loadAll();
  }, [SPRITES_SOURCES]);

  useEffect(() => {
    preload();
  }, [preload]);

  return { loading, progress, preload };
}
