"use client";

import React from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export const AmbientAtmosphere: React.FC = () => {
  const prefersReduced = useReducedMotionSafe();

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      aria-hidden="true"
    >
      {/* Top subtle sky glow */}
      <div
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-gradient-to-b from-[#D7EAF0]/40 via-[#A9D8F2]/15 to-transparent blur-3xl ${
          prefersReduced ? "" : "anim-drift-slow"
        }`}
      />

      {/* Mid-page soft lavender glow (near Experience / Skills) */}
      <div
        className={`absolute top-[35%] -left-48 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#EEE7FA]/30 via-[#D7EAF0]/20 to-transparent blur-3xl ${
          prefersReduced ? "" : "anim-drift-reverse"
        }`}
      />

      {/* Mid-page subtle mint accent */}
      <div
        className={`absolute top-[55%] -right-48 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#DDF3E8]/30 via-[#D7EAF0]/15 to-transparent blur-3xl ${
          prefersReduced ? "" : "anim-drift-slow"
        }`}
      />

      {/* Bottom open-sky atmosphere (Contact finale) */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] rounded-full bg-gradient-to-t from-[#D7EAF0]/50 via-[#A9D8F2]/20 to-transparent blur-3xl" />
    </div>
  );
};
