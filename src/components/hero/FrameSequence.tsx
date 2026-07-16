"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import manifest from "@/lib/frames.json";

export const FRAME_COUNT = manifest.count;

export function frameSrc(index: number, variant: "lg" | "sm") {
  const n = String(index + 1).padStart(manifest.pad, "0");
  return `${manifest.basePath}/${variant}/frame-${n}.webp`;
}

export const POSTER_SRC = frameSrc(0, "lg");

/**
 * Draws a frame onto the canvas with `background-size: cover` semantics.
 * The horizontal focal point is biased slightly right (~58%) so the cat
 * stays in view, while still keeping the open left-hand text zone on
 * screen if narrower viewports force horizontal cropping. `zoom` (>=1)
 * drives a subtle scroll-synced Ken Burns drift.
 */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap | HTMLImageElement,
  focalX = 0.58,
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
    // Fallback for browsers without createImageBitmap
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

/**
 * Progressively preloads the frame set: every 4th frame first (enough to
 * start scrubbing immediately), then fills in the rest in the background.
 */
export function useFrameLoader() {
  const framesRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const variant: "lg" | "sm" = window.innerWidth <= 768 ? "sm" : "lg";
    framesRef.current = Array(FRAME_COUNT).fill(null);

    let loaded = 0;
    const makeTask = (i: number) => async () => {
      if (cancelled || framesRef.current[i]) return;
      const bmp = await loadBitmap(frameSrc(i, variant));
      if (cancelled) return;
      framesRef.current[i] = bmp;
      loaded++;
      setProgress(loaded / FRAME_COUNT);
    };

    const firstPass: number[] = [];
    const secondPass: number[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      (i % 4 === 0 || i === FRAME_COUNT - 1 ? firstPass : secondPass).push(i);
    }

    (async () => {
      await pool(firstPass.map(makeTask), 6);
      if (!cancelled) setReady(true);
      await pool(secondPass.map(makeTask), 6);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /** Returns the requested frame, or the nearest already-loaded neighbour. */
  const getFrame = useCallback((index: number) => {
    const frames = framesRef.current;
    if (frames[index]) return frames[index];
    for (let d = 1; d < FRAME_COUNT; d++) {
      if (frames[index - d]) return frames[index - d];
      if (frames[index + d]) return frames[index + d];
    }
    return null;
  }, []);

  return { ready, progress, getFrame };
}
