"use client";

import React from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface CloudVeilTransitionProps {
  variant?: "sky-to-cream" | "cream-to-lavender" | "lavender-to-sky" | "open-sky";
  className?: string;
}

export const CloudVeilTransition: React.FC<CloudVeilTransitionProps> = ({
  variant = "sky-to-cream",
  className = "",
}) => {
  const prefersReduced = useReducedMotionSafe();

  const getGradient = () => {
    switch (variant) {
      case "cream-to-lavender":
        return "from-[#FCF9F7] via-[#EEE7FA]/20 to-[#FCF9F7]";
      case "lavender-to-sky":
        return "from-[#EEE7FA]/25 via-[#D7EAF0]/30 to-[#FCF9F7]";
      case "open-sky":
        return "from-[#FCF9F7] via-[#D7EAF0]/40 to-[#A9D8F2]/30";
      case "sky-to-cream":
      default:
        return "from-[#D7EAF0]/35 via-[#FCF9F7]/60 to-[#FCF9F7]";
    }
  };

  return (
    <div
      className={`relative w-full h-16 md:h-24 pointer-events-none select-none overflow-hidden my-4 ${className}`}
      aria-hidden="true"
    >
      {/* Soft gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getGradient()}`} />

      {/* Floating subtle cloud wisps */}
      {!prefersReduced && (
        <>
          <div className="absolute top-1/2 -left-20 w-80 h-16 rounded-full bg-white/50 blur-xl anim-drift-slow" />
          <div className="absolute top-1/2 -right-20 w-96 h-20 rounded-full bg-white/60 blur-xl anim-drift-reverse" />
        </>
      )}

      {/* Ultra-soft hairline divider */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[rgba(66,126,138,0.12)] to-transparent" />
    </div>
  );
};
