import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { MultiSpriteConfig, SpriteKeys } from "../types/animations";
import { CottonCandyContext } from "../providers/ContextProvider";

export const useHeroAnimator = (
  ref: React.RefObject<HTMLDivElement>,
  config: MultiSpriteConfig,
  spritekey: SpriteKeys
) => {
  const {
    sheets,
    spriteAnimationSpeed,
    startFrameIndex = 1,
    endFrameIndex,
    loop = true,
  } = config;

  const ctx = useContext(CottonCandyContext);

  const meta = useMemo(() => {
    const framesPerSheet = sheets.map(
      (s) => s.frameCount ?? s.columns * s.rows
    );
    const totalFrames = framesPerSheet.reduce((a, b) => a + b, 0);
    const clampedEnd = Math.min(
      endFrameIndex ?? totalFrames - 1,
      totalFrames - 1
    );

    const starts: number[] = [];
    let acc = 0;
    for (let i = 0; i < framesPerSheet.length; i++) {
      starts.push(acc);
      acc += framesPerSheet[i];
    }

    return { framesPerSheet, starts, totalFrames, clampedEnd };
  }, [sheets, endFrameIndex]);

  // Show thumbnail immediately (sheet 0)
  useEffect(() => {
    if (spritekey === "fire") return;

    if (ref.current && sheets.length > 0) {
      const thumbSheet = sheets[0];
      ref.current.style.backgroundImage = `url("${thumbSheet.url}")`;
      ref.current.style.backgroundRepeat = "no-repeat";
      ref.current.style.backgroundSize = `100% 100%`;
      ref.current.style.backgroundPosition = "0% 0%";
    }
  }, [ref, sheets]);

  // --- Preload images to avoid any jerk when switching sheets
  const imagesRef = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    let cancelled = false;
    // const imgs: HTMLImageElement[] = [];
    if (Object.entries(ctx.sprites).length > 0) {
      imagesRef.current = ctx.sprites[spritekey];
      const rangeStart = Math.max(0, startFrameIndex);
      setFrame(rangeStart);
    } else {
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
      )
        .then((loaded) => {
          if (!cancelled) {
            imagesRef.current = loaded;
            const rangeStart = Math.max(0, startFrameIndex);
            setFrame(rangeStart);
          }
        })
        .catch(() => {
          // swallow errors; animation will just not run if an image fails
        });
    }
    return () => {
      cancelled = true;
    };
  }, [sheets]);

  useEffect(() => {}, []);

  // --- State refs for the rAF loop
  const isRunningRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameRef = useRef<number>(startFrameIndex);

  // Map a global frame number -> { sheetIndex, localFrame, col, row }
  const mapFrame = useCallback(
    (globalFrame: number) => {
      const { starts } = meta;

      // find the sheet containing this global frame
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

      return { sheetIndex, localFrame: local, col, row, cols, rows, sheet };
    },
    [meta, sheets]
  );

  // Update the DOM styles for a given global frame
  const setFrame = useCallback(
    (globalFrame: number) => {
      if (!ref.current) return;
      const { sheetIndex, col, row, cols, rows } = mapFrame(globalFrame);

      // only swap image when the sheet changes
      const img = imagesRef.current[sheetIndex];
      if (img) {
        // Ensure correct image and responsive grid-based scaling
        const el = ref.current;
        // background-image
        const currentBg = el.style.backgroundImage;
        const nextBg = `url("${sheets[sheetIndex].url}")`;
        if (currentBg !== nextBg) {
          el.style.backgroundImage = nextBg;
          el.style.backgroundRepeat = "no-repeat";
          // Scale sprite grid to the element size responsively
          el.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
          // optional: center it
          el.style.backgroundPosition = "0% 0%";
        }

        // percentage positions across the grid
        // guard against division by zero when cols/rows == 1
        const bx = cols > 1 ? (col * 100) / (cols - 1) : 0;
        const by = rows > 1 ? (row * 100) / (rows - 1) : 0;

        el.style.backgroundPosition = `${bx}% ${by}%`;
      }
    },
    [mapFrame, ref, sheets]
  );

  const tick = useCallback(
    (t: number, rangeStart: number, rangeEnd: number) => {
      if (!isRunningRef.current) return;

      if (!lastTimeRef.current) lastTimeRef.current = t;
      const delta = t - lastTimeRef.current;

      // advance frames based on accumulated time
      const steps = Math.floor(delta / spriteAnimationSpeed);
      if (steps > 0) {
        lastTimeRef.current += steps * spriteAnimationSpeed;

        for (let i = 0; i < steps; i++) {
          frameRef.current++;
          if (frameRef.current > rangeEnd) {
            if (loop) {
              frameRef.current = rangeStart;
            } else {
              // stop at end
              isRunningRef.current = false;
              rafRef.current && cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
              return;
            }
          }
        }
        setFrame(frameRef.current);
      }

      rafRef.current = requestAnimationFrame((n) =>
        tick(n, rangeStart, rangeEnd)
      );
    },
    [loop, setFrame, spriteAnimationSpeed]
  );

  const startAnimation = useCallback(() => {
    if (isRunningRef.current) return;
    if (!ref.current) return;
    // ensure images are preloaded
    if (imagesRef.current.length !== sheets.length) return;

    const rangeStart = Math.max(0, startFrameIndex);
    const rangeEnd = Math.min(meta.clampedEnd, meta.totalFrames - 1);

    isRunningRef.current = true;
    frameRef.current = rangeStart;
    lastTimeRef.current = 0;
    setFrame(frameRef.current);

    rafRef.current = requestAnimationFrame((t) =>
      tick(t, rangeStart, rangeEnd)
    );
  }, [
    meta.clampedEnd,
    meta.totalFrames,
    ref,
    setFrame,
    sheets.length,
    startFrameIndex,
    tick,
  ]);

  const stopAnimation = useCallback(() => {
    isRunningRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    frameRef.current = startFrameIndex;
    setFrame(startFrameIndex);
    rafRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, [stopAnimation]);

  useEffect(() => {
    if (!ref.current) return;
    const rangeStart = Math.max(0, startFrameIndex);
    setFrame(rangeStart);
  }, [setFrame, startFrameIndex]);

  return { startAnimation, stopAnimation };
};
