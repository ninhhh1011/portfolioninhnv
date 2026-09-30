"use client";

import React, { useRef } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { usePortfolioInteraction } from "@/context/PortfolioInteractionContext";

export const TerminalCodeBackdrop: React.FC<{
  className?: string;
  enableLens?: boolean;
}> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const { focusMode } = usePortfolioInteraction();

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. CINEMATIC AMBIENT VIDEO BACKDROP (Soft & editorial) */}
      {!prefersReduced && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/visuals/hero-ambient-poster.jpg"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
            focusMode ? "opacity-60" : "opacity-45"
          }`}
        >
          <source src="/visuals/hero-ambient-video.webm" type="video/webm" />
          <source src="/visuals/hero-ambient-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* 2. Soft atmospheric ambient sky gradients to preserve contrast and airy feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCF9F7]/80 via-transparent to-[#FCF9F7] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#FCF9F7] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#FCF9F7] to-transparent pointer-events-none" />
    </div>
  );
};
