"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Link } from "@/i18n/navigation";
import {
  FRAME_COUNT,
  POSTER_SRC,
  drawCover,
  useFrameLoader,
} from "./FrameSequence";
import { getTextClearance } from "@/lib/textClearance";

const BEATS = ["window", "care", "play", "rest"] as const;

/**
 * The home-page centerpiece: a tall scroll section whose sticky viewport
 * scrubs through the cat footage frame by frame while the story beats
 * fade in and out on the free left side of the frame.
 */
export default function ScrollStory() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beatsRef = useRef<(HTMLDivElement | null)[]>([]);
  const clearanceRef = useRef<(HTMLDivElement | null)[]>([]);
  const frameIndexRef = useRef(0);
  const { ready, progress, getFrame } = useFrameLoader();
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion !== false) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Each beat drifts slowly toward the cat (subtle Ken Burns), scroll-synced
    // rather than time-based so it stays perfectly in step with the scrub.
    const zoomForProgress = (p: number) => {
      const local = (p * BEATS.length) % 1;
      return 1 + local * 0.05;
    };

    const draw = (index: number, scrollProgress: number) => {
      frameIndexRef.current = index;
      const frame = getFrame(index);
      if (frame) drawCover(ctx, frame, undefined, zoomForProgress(scrollProgress));
    };

    // Applied on top of the beat fade so the text visibly steps back
    // whenever the cat or caretaker actually crosses close to it, driven
    // by the real per-frame clearance survey rather than a fixed side.
    const applyClearance = (clearance: number) => {
      const dim = 1 - clearance;
      clearanceRef.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = String(clearance);
        el.style.transform = `translateY(${dim * 10}px)`;
        el.style.filter = dim > 0.05 ? `blur(${dim * 3}px)` : "";
      });
    };

    const progressRef = { current: 0 };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.round(clientWidth * dpr);
      canvas.height = Math.round(clientHeight * dpr);
      draw(frameIndexRef.current, progressRef.current);
      applyClearance(getTextClearance(progressRef.current));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const scrubTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        draw(Math.round(self.progress * (FRAME_COUNT - 1)), self.progress);
        applyClearance(getTextClearance(self.progress));
      },
    });

    // Story beats: each fades in, holds, and fades out over its slice of
    // the scroll. Beat 1 starts visible and only fades out.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
    const slice = 1 / BEATS.length;
    beatsRef.current.forEach((el, i) => {
      if (!el) return;
      const start = i * slice;
      gsap.set(el, { transformOrigin: "left center" });
      if (i > 0) {
        gsap.set(el, { autoAlpha: 0 });
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 40, x: -28, scale: 0.96 },
          { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: slice * 0.28 },
          start + slice * 0.08
        );
      }
      if (i < BEATS.length - 1) {
        tl.to(
          el,
          { autoAlpha: 0, y: -32, x: 20, scale: 0.98, duration: slice * 0.22 },
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
  }, [ready, reducedMotion, getFrame]);

  // Static fallback for reduced motion (and while we don't know yet,
  // to avoid layout jumps for those users).
  if (reducedMotion !== false) {
    return (
      <section className="relative min-h-screen">
        <HeroPoster />
        <HeroCopy t={t} />
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[450vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <noscript>
          <HeroPoster />
        </noscript>

        {/* Legibility scrim over the text side */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-cream/95 via-cream/45 to-transparent sm:w-3/4" />

        {/* Story beats */}
        {BEATS.map((beat, i) => (
          <div
            key={beat}
            ref={(el) => {
              beatsRef.current[i] = el;
            }}
            className="absolute top-1/2 left-6 w-[calc(100%-3rem)] -translate-y-1/2 sm:left-[8%] sm:w-auto sm:max-w-xl"
          >
            {/* Dims and steps back in real time whenever the footage shows
                the cat or caretaker close to this zone; see textClearance.ts */}
            <div
              ref={(el) => {
                clearanceRef.current[i] = el;
              }}
              className="transition-[filter] duration-150 ease-out"
            >
            {i === 0 ? (
              <>
                <span className="inline-block rounded-full border border-clay/30 bg-card/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-clay">
                  {t("badge")}
                </span>
                <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-6xl">
                  {t("title")}
                </h1>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                  {t("subtitle")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-cream shadow-lift transition-colors hover:bg-clay-deep"
                  >
                    {t("cta")}
                  </Link>
                  <Link
                    href="/services"
                    className="rounded-full border border-ink/15 bg-card/80 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-colors hover:border-ink/30"
                  >
                    {t("ctaSecondary")}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <span className="text-xs font-semibold uppercase tracking-widest text-clay">
                  {t(`beats.${beat}.kicker`)}
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
                  {t(`beats.${beat}.title`)}
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
                  {t(`beats.${beat}.text`)}
                </p>
              </>
            )}
            </div>
          </div>
        ))}

        {/* Loading + scroll hint */}
        {!ready && (
          <div className="absolute inset-x-0 bottom-0">
            <div
              className="h-0.5 bg-clay transition-[width] duration-300"
              style={{ width: `${Math.round(progress * 100)}%` }}
              aria-hidden="true"
            />
          </div>
        )}
        <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-soft">
          <span className="text-[11px] font-medium uppercase tracking-widest">
            {t("scrollHint")}
          </span>
          <span className="block h-8 w-px animate-pulse bg-ink/30" />
        </div>
      </div>
    </section>
  );
}

function HeroPoster() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={POSTER_SRC}
      alt=""
      className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
    />
  );
}

function HeroCopy({ t }: { t: ReturnType<typeof useTranslations<"hero">> }) {
  return (
    <div className="relative flex min-h-screen items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/45 to-transparent" />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="inline-block rounded-full border border-clay/30 bg-card/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-clay">
            {t("badge")}
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-cream shadow-lift transition-colors hover:bg-clay-deep"
            >
              {t("cta")}
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-ink/15 bg-card/80 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-colors hover:border-ink/30"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
