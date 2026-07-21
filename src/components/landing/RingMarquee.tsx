"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const FRAME_NUMBERS = [1, 20, 60, 100, 125, 145, 170, 201];
const RADIUS = 280;

/**
 * A ring of cat photos on an invisible wheel, continuously auto-rotating in
 * 3D (pure CSS, see .ring-spin in globals.css). On top of that, the whole
 * ring tilts toward the cursor and gently rocks with scroll position, so it
 * keeps reacting even while the auto-spin keeps going.
 */
export default function RingMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const mouseRotRef = useRef({ x: 0, y: 0 });
  const scrollRotRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    if (!wrap || !tilt) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const apply = () => {
      gsap.to(tilt, {
        rotateX: mouseRotRef.current.y + scrollRotRef.current,
        rotateY: mouseRotRef.current.x,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRotRef.current = { x: px * 26, y: -py * 22 };
      apply();
    };
    const onLeave = () => {
      mouseRotRef.current = { x: 0, y: 0 };
      apply();
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollRotRef.current = (self.progress - 0.5) * 24;
        apply();
      },
    });

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-[360px] w-full max-w-md sm:h-[420px]"
      style={{ perspective: "1400px" }}
    >
      <div ref={tiltRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        <div className="ring-spin absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {FRAME_NUMBERS.map((n, i) => {
            const angle = (360 / FRAME_NUMBERS.length) * i;
            return (
              <div
                key={n}
                className="absolute left-1/2 top-1/2 h-48 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 sm:h-56 sm:w-40"
                style={{ transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)` }}
              >
                <Image
                  src={`/ezgif-587232ffed87d54a-jpg/ezgif-frame-${String(n).padStart(3, "0")}.jpg`}
                  alt="Miauu cat"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
