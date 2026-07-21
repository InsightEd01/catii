"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Generic scroll-scrubbed frame sequence loader, independent of the
 * home page's /frames manifest so landing sections can point at any
 * flat folder of numbered frames.
 */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap | HTMLImageElement,
  focalX = 0.62,
  zoom = 1
) {
  const { width: cw, height: ch } = ctx.canvas;
  const iw = img.width;
  const ih = img.height;
  const scale = Math.max(cw / iw, ch / ih) * zoom;
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) * focalX;
  const dy = (ch - dh) * 0.5;
  ctx.drawImage(img, dx, dy, dw, dh);
}

async function loadBitmap(src: string): Promise<ImageBitmap | HTMLImageElement> {
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    return await createImageBitmap(blob);
  } catch {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
}

async function pool(tasks: (() => Promise<void>)[], size: number) {
  const queue = [...tasks];
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (queue.length) {
        const task = queue.shift()!;
        await task();
      }
    })
  );
}

export function useFrameSequence(frameCount: number, frameSrc: (index: number) => string) {
  const framesRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    framesRef.current = Array(frameCount).fill(null);
    let loaded = 0;

    const makeTask = (i: number) => async () => {
      if (cancelled || framesRef.current[i]) return;
      const bmp = await loadBitmap(frameSrc(i));
      if (cancelled) return;
      framesRef.current[i] = bmp;
      loaded++;
      setProgress(loaded / frameCount);
    };

    const firstPass: number[] = [];
    const secondPass: number[] = [];
    for (let i = 0; i < frameCount; i++) {
      (i % 4 === 0 || i === frameCount - 1 ? firstPass : secondPass).push(i);
    }

    (async () => {
      await pool(firstPass.map(makeTask), 6);
      if (!cancelled) setReady(true);
      await pool(secondPass.map(makeTask), 6);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  const getFrame = useCallback((index: number) => {
    const frames = framesRef.current;
    if (frames[index]) return frames[index];
    for (let d = 1; d < frameCount; d++) {
      if (frames[index - d]) return frames[index - d];
      if (frames[index + d]) return frames[index + d];
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  return { ready, progress, getFrame };
}
