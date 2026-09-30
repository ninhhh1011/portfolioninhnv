"use client";

import React from "react";
import { usePointerSpotlight } from "@/hooks/usePointerSpotlight";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface SpotlightSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "sky" | "teal" | "lavender" | "subtle";
  spotlightSize?: number;
}

export const SpotlightSurface: React.FC<SpotlightSurfaceProps> = ({
  children,
  className = "",
  variant = "sky",
  spotlightSize = 360,
  ...props
}) => {
  const containerRef = usePointerSpotlight<HTMLDivElement>();
  const prefersReduced = useReducedMotionSafe();

  const getSpotlightGradient = () => {
    switch (variant) {
      case "teal":
        return `radial-gradient(${spotlightSize}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(66, 126, 138, 0.12), transparent 80%)`;
      case "lavender":
        return `radial-gradient(${spotlightSize}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(238, 231, 250, 0.35), transparent 80%)`;
      case "subtle":
        return `radial-gradient(${spotlightSize}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(215, 234, 240, 0.18), transparent 80%)`;
      case "sky":
      default:
        return `radial-gradient(${spotlightSize}px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(169, 216, 242, 0.22), transparent 80%)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Spotlight layer */}
      {!prefersReduced && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"
          style={{
            background: getSpotlightGradient(),
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
