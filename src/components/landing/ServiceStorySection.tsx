"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { drawCover, useFrameSequence } from "./frameStory";

const FRAME_COUNT = 201;
const frameSrc = (i: number) => `/ezgif-587232ffed87d54a-jpg/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
const POSTER_SRC = frameSrc(0);

export type StoryBeat = {
  kicker?: string;
  title: string;
  text?: string;
  price?: string;
  /** Bigger, title-card styling — for a brand moment with no kicker/body copy. */
  emphasis?: boolean;
  /** Which side of the frame is open at this point in the footage. */
  side: "left" | "right";
  /** [start, end] frame indices (0-based) this beat scrubs through — chosen so the cat stays on the opposite side from `side` throughout. */
  frameRange: [number, number];
};

type Props = {
  beats: StoryBeat[];
  vhPerBeat?: number;
};

/**
 * A single pinned scroll section whose background scrubs continuously
 * through a cat-care photo sequence while a list of services fades in
 * and out one at a time. Each beat owns a slice of the footage where
 * the cat consistently sits on one side, so the copy always lands on
 * the open side instead of overlapping it.
 */
export default function ServiceStorySection({ beats, vhPerBeat = 130 }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beatsRef = useRef<(HTMLDivElement | null)[]>([]);
  const frameIndexRef = useRef(0);
  const { ready, progress, getFrame } = useFrameSequence(FRAME_COUNT, frameSrc);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion !== false) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (index: number) => {
      frameIndexRef.current = index;
      const frame = getFrame(index);
      if (frame) drawCover(ctx, frame);
    };

    const slice = 1 / beats.length;
    const frameForProgress = (p: number) => {
      const beatIndex = Math.min(beats.length - 1, Math.floor(p / slice));
      const local = Math.min(1, Math.max(0, (p - beatIndex * slice) / slice));
      const [from, to] = beats[beatIndex].frameRange;
      return Math.round(from + local * (to - from));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.round(clientWidth * dpr);
      canvas.height = Math.round(clientHeight * dpr);
      draw(frameIndexRef.current);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const scrubTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => draw(frameForProgress(self.progress)),
    });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
    beatsRef.current.forEach((el, i) => {
      if (!el) return;
      const start = i * slice;
      const side = beats[i].side;
      gsap.set(el, { transformOrigin: side === "left" ? "left center" : "right center" });
      if (i > 0) {
        gsap.set(el, { autoAlpha: 0 });
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 40, x: side === "left" ? -28 : 28, scale: 0.96 },
          { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: slice * 0.28 },
          start + slice * 0.08
        );
      }
      if (i < beats.length - 1) {
        tl.to(
          el,
          { autoAlpha: 0, y: -32, x: side === "left" ? 20 : -20, scale: 0.98, duration: slice * 0.22 },
          start + slice * 0.74
        );
      }
    });

    return () => {
      ro.disconnect();
      scrubTrigger.kill();
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [ready, reducedMotion, getFrame, beats]);

  if (reducedMotion !== false) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#060b14]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={POSTER_SRC} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative flex min-h-screen items-center">
          <BeatCopy beat={beats[0]} />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${vhPerBeat * beats.length}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#060b14]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {beats.map((beat, i) => (
          <div
            key={beat.title}
            ref={(el) => {
              beatsRef.current[i] = el;
            }}
            className="absolute inset-0 flex items-center"
          >
            <BeatCopy beat={beat} />
          </div>
        ))}

        {!ready && (
          <div className="absolute inset-x-0 bottom-0">
            <div
              className="h-0.5 bg-sky-400 transition-[width] duration-300"
              style={{ width: `${Math.round(progress * 100)}%` }}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function BeatCopy({ beat }: { beat: StoryBeat }) {
  return (
    <div
      className={`mx-auto flex w-full max-w-6xl px-6 sm:px-10 lg:px-16 xl:px-24 ${
        beat.side === "right" ? "justify-end text-right" : "justify-start text-left"
      }`}
    >
      <div className="max-w-xl">
        {beat.kicker && (
          <span className="inline-flex w-fit items-center rounded-full border border-slate-900/15 bg-white/40 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-sky-700 backdrop-blur-sm">
            {beat.kicker}
          </span>
        )}

        <h3
          className={`font-banger uppercase text-[#0b1220] ${beat.kicker ? "mt-6" : ""} ${
            beat.emphasis
              ? "text-7xl leading-none tracking-wide sm:text-8xl lg:text-9xl"
              : "text-5xl leading-[1.05] tracking-wide sm:text-6xl lg:text-7xl"
          }`}
          style={{ textShadow: "0 2px 24px rgba(255,255,255,0.9)" }}
        >
          {beat.title}
        </h3>

        {beat.price && (
          <p className="mt-3 text-lg font-semibold text-sky-700" style={{ textShadow: "0 2px 16px rgba(255,255,255,0.9)" }}>
            {beat.price}
          </p>
        )}

        {beat.text && (
          <p
            className={`mt-5 max-w-md text-lg leading-relaxed text-slate-800 ${beat.side === "right" ? "ml-auto" : ""}`}
            style={{ textShadow: "0 2px 16px rgba(255,255,255,0.9)" }}
          >
            {beat.text}
          </p>
        )}
      </div>
    </div>
  );
}
