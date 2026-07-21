"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface PricingCard3DProps {
  title: string;
  price: string;
  description: string;
  imageSrc: string;
  onBook: () => void;
}

export default function PricingCard3D({ title, price, description, imageSrc, onBook }: PricingCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex h-[350px] w-full flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-[#080f1c] shadow-2xl transition-all duration-300 hover:border-sky-400/50 hover:shadow-sky-400/20"
    >
      {/* Background Image with 3D Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          transform: "translateZ(-30px) scale(1.15)",
        }}
      >
        <Image src={imageSrc} alt={title} fill className="object-cover opacity-50 mix-blend-screen transition-opacity duration-500 group-hover:opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080f1c] via-[#080f1c]/80 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col p-6"
        style={{
          transform: "translateZ(40px)",
        }}
      >
        <h3 className="font-display text-2xl font-bold text-white drop-shadow-md">{title}</h3>
        <p className="mt-1 text-3xl font-extrabold text-sky-400 drop-shadow-sm">{price}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 drop-shadow-sm">{description}</p>

        <button
          onClick={onBook}
          className="pointer-events-auto relative z-50 mt-6 inline-flex w-full items-center justify-center rounded-full bg-sky-400 py-3 text-sm font-semibold text-[#060b14] shadow-lg shadow-sky-400/20 transition-all hover:scale-105 hover:bg-sky-300"
        >
          Book Now
        </button>
      </motion.div>
    </motion.div>
  );
}
