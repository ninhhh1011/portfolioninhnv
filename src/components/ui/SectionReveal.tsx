"use client";

import React from "react";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface SectionRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  threshold?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  delayMs = 0,
  direction = "up",
  className = "",
  threshold = 0.02,
}) => {
  const { ref, isInView } = useSectionInView<HTMLDivElement>({ threshold });
  const prefersReduced = useReducedMotionSafe();

  const getTransform = () => {
    if (prefersReduced || isInView) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return "translate3d(0, 22px, 0)";
      case "down":
        return "translate3d(0, -22px, 0)";
      case "left":
        return "translate3d(24px, 0, 0)";
      case "right":
        return "translate3d(-24px, 0, 0)";
      case "none":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        opacity: prefersReduced || isInView ? 1 : 0,
        transform: getTransform(),
        transitionDelay: prefersReduced ? "0ms" : `${delayMs}ms`,
        willChange: isInView ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};
