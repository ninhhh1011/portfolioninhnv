"use client";

import React from "react";
import { usePointerSpotlight } from "@/hooks/usePointerSpotlight";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface SpotlightSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "sky" | "teal" | "lavender" | "subtle";
  spotlightSize?: number;
  enableBorderShine?: boolean;
}

export const SpotlightSurface: React.FC<SpotlightSurfaceProps> = ({
  children,
  className = "",
  variant = "sky",
  spotlightSize = 380,
  enableBorderShine = true,
  ...props
}) => {
  const containerRef = usePointerSpotlight<HTMLDivElement>();
  const prefersReduced = useReducedMotionSafe();

  const getSpotlightGradient = () => {
    switch (variant) {
      case "teal":
        return `radial-gradient(${spotlightSize}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(66, 126, 138, 0.14), transparent 80%)`;
      case "lavender":
        return `radial-gradient(${spotlightSize}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(238, 231, 250, 0.4), transparent 80%)`;
      case "subtle":
        return `radial-gradient(${spotlightSize}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(215, 234, 240, 0.2), transparent 80%)`;
      case "sky":
      default:
        return `radial-gradient(${spotlightSize}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(169, 216, 242, 0.25), transparent 80%)`;
    }
  };

  const getBorderShineGradient = () => {
    switch (variant) {
      case "teal":
        return `radial-gradient(${spotlightSize * 0.8}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(34, 84, 61, 0.45), rgba(167, 243, 208, 0.25) 40%, transparent 75%)`;
      case "lavender":
        return `radial-gradient(${spotlightSize * 0.8}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(85, 60, 154, 0.45), rgba(214, 188, 250, 0.25) 40%, transparent 75%)`;
      case "subtle":
        return `radial-gradient(${spotlightSize * 0.8}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(23, 107, 135, 0.35), rgba(215, 234, 240, 0.2) 40%, transparent 75%)`;
      case "sky":
      default:
        return `radial-gradient(${spotlightSize * 0.8}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(23, 107, 135, 0.5), rgba(169, 216, 242, 0.3) 40%, transparent 75%)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* 1. Ambient Surface Spotlight layer */}
      {!prefersReduced && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: getSpotlightGradient(),
          }}
          aria-hidden="true"
        />
      )}

      {/* 2. Glass Border Spotlight Shine (Following cursor coordinates along edges) */}
      {!prefersReduced && enableBorderShine && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{
            background: getBorderShineGradient(),
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1.5px",
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
