import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  RefObject,
} from "react";
import { CottonCandyContext } from "../providers/ContextProvider";

export type EggAnimationSpriteConfig = {
  sheets: {
    url: string;
    columns: number;
    rows: number;
    frameCount?: number;
  }[];
  spriteAnimationSpeed: number;
  startFrameIndex?: number;
  repeatFrameIndex?: number;
  endRepeatFrameIndex?: number;
  loop?: boolean;
};

export const useEggAnimator = (
  spriteRef: RefObject<HTMLDivElement>,
  config: EggAnimationSpriteConfig,
  spriteKey: string,
  speed = 1
) => {
  const ctx = useContext(CottonCandyContext);

  const {
    sheets,
    spriteAnimationSpeed,
    startFrameIndex = 0,
    repeatFrameIndex,
    endRepeatFrameIndex,
    loop = false,
  } = config;

  // --- frame meta
  const meta = useMemo(() => {
    const framesPerSheet = sheets.map(
      (s) => s.frameCount ?? s.columns * s.rows
    );
    const totalFrames = framesPerSheet.reduce((a, b) => a + b, 0);
    const clampedEnd = Math.min(
      endRepeatFrameIndex ?? totalFrames - 1,
      totalFrames - 1
    );

    const starts: number[] = [];
    let acc = 0;
    for (let i = 0; i < framesPerSheet.length; i++) {
      starts.push(acc);
      acc += framesPerSheet[i];
    }

    return { framesPerSheet, starts, totalFrames, clampedEnd };
  }, [sheets, endRepeatFrameIndex]);

  // --- refs
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameRef = useRef<number>(startFrameIndex);

  // --- state to expose
  const [currentFrameNo, setCurrentFrameNo] = useState<number>(startFrameIndex);
  const [looping, setLooping] = useState<boolean>(false);

  // --- preloaded images
  const imagesRef = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    let cancelled = false;
    if (ctx.sprites[spriteKey]) {
      imagesRef.current = ctx.sprites[spriteKey];
    } else {
      // fallback: load on demand
      Promise.all(
        sheets.map(
          (s) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image();
              img.src = s.url;
              img.onload = () => resolve(img);
              img.onerror = reject;
            })
        )
      ).then((loaded) => {
        if (!cancelled) {
          imagesRef.current = loaded;
        }
      });
    }
    return () => {
      cancelled = true;
    };
  }, [ctx.sprites, spriteKey, sheets]);

  // --- map global frame → sheet + coords
  const mapFrame = useCallback(
    (globalFrame: number) => {
      const { starts } = meta;
      let sheetIndex = 0;
      for (let i = starts.length - 1; i >= 0; i--) {
        if (globalFrame >= starts[i]) {
          sheetIndex = i;
          break;
        }
      }
      const local = globalFrame - starts[sheetIndex];
      const sheet = sheets[sheetIndex];
      const cols = sheet.columns;
      const rows = sheet.rows;

      const col = local % cols;
      const row = Math.floor(local / cols);

      return { sheetIndex, col, row, cols, rows, sheet };
    },
    [meta, sheets]
  );

  // --- apply frame to element
  const setFrame = useCallback(
    (globalFrame: number) => {
      if (!spriteRef.current) return;
      const { sheetIndex, col, row, cols, rows, sheet } = mapFrame(globalFrame);
      const el = spriteRef.current;

      // ✅ use preloaded image if available
      const img = imagesRef.current[sheetIndex];
      if (img) {
        el.style.backgroundImage = `url("${img.src}")`;
      } else {
        el.style.backgroundImage = `url("${sheet.url}")`;
      }

      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;

      const bx = cols > 1 ? (col * 100) / (cols - 1) : 0;
      const by = rows > 1 ? (row * 100) / (rows - 1) : 0;
      el.style.backgroundPosition = `${bx}% ${by}%`;
    },
    [mapFrame, spriteRef]
  );

  // --- tick
  const tick = useCallback(
    (t: number, rangeStart: number, rangeEnd: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = t;
      const delta = t - lastTimeRef.current;

      const frameDuration = spriteAnimationSpeed / speed;
      if (delta > frameDuration) {
        lastTimeRef.current = t;
        frameRef.current++;

        const isLooping =
          typeof repeatFrameIndex === "number" &&
          typeof endRepeatFrameIndex === "number" &&
          endRepeatFrameIndex > repeatFrameIndex;

        if (
          frameRef.current > rangeEnd ||
          (isLooping && frameRef.current > endRepeatFrameIndex)
        ) {
          if (isLooping || loop) {
            setLooping(true);
            frameRef.current = repeatFrameIndex ?? startFrameIndex;
          } else {
            setLooping(false);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            return;
          }
        }

        setFrame(frameRef.current);
        setCurrentFrameNo(frameRef.current);
      }

      rafRef.current = requestAnimationFrame((n) =>
        tick(n, rangeStart, rangeEnd)
      );
    },
    [
      spriteAnimationSpeed,
      speed,
      repeatFrameIndex,
      endRepeatFrameIndex,
      loop,
      setFrame,
      startFrameIndex,
    ]
  );

  // --- control functions
  const startAnimation = useCallback(() => {
    frameRef.current = startFrameIndex;
    lastTimeRef.current = 0;
    setFrame(frameRef.current);
    setCurrentFrameNo(frameRef.current);
    if (!rafRef.current) {
      const rangeEnd = Math.min(meta.clampedEnd, meta.totalFrames - 1);
      rafRef.current = requestAnimationFrame((t) =>
        tick(t, startFrameIndex, rangeEnd)
      );
    }
  }, [meta, setFrame, startFrameIndex, tick]);

  const stopAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopAnimation();
  }, [stopAnimation]);

  return { startAnimation, stopAnimation, currentFrameNo, looping };
};
