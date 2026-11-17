"use client";

import React, { useRef, useState } from "react";
import { Chip } from "./Chip";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface InteractiveSkillPillProps {
  skill: string;
  variant?: "neutral" | "sky" | "lavender" | "mint" | "peach";
  index?: number;
  className?: string;
}

export const InteractiveSkillPill: React.FC<InteractiveSkillPillProps> = ({
  skill,
  variant = "neutral",
  index = 0,
  className = "",
}) => {
  const pillRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const [offset, setOffset] = useState({ x: 0, y: 0, scale: 1 });
  const [isHovered, setIsHovered] = useState(false);

  // Pseudo-random float duration and delay based on index
  const floatDuration = 3.5 + (index % 4) * 0.8;
  const floatDelay = (index * 0.25) % 2.5;

  const handlePointerEnter = () => {
    if (prefersReduced) return;
    setIsHovered(true);
    // Subtle upward spring bounce
    setOffset({ x: (Math.random() - 0.5) * 4, y: -5, scale: 1.08 });
  };

  const handlePointerLeave = () => {
    if (prefersReduced) return;
    setIsHovered(false);
    setOffset({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div
      ref={pillRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      data-magnetic="true"
      className={`inline-block transition-transform duration-300 ease-out will-change-transform cursor-pointer select-none ${className}`}
      style={{
        transform: prefersReduced
          ? undefined
          : `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${offset.scale})`,
        animation: prefersReduced
          ? undefined
          : `softFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
      }}
    >
      <div className="relative group">
        <Chip
          variant={variant}
          size="md"
          className={`transition-all duration-300 ${
            isHovered
              ? "border-[#176B87] shadow-[0_4px_16px_rgba(23,107,135,0.25)] ring-2 ring-[#176B87]/20"
              : ""
          }`}
        >
          {skill}
        </Chip>

        {/* Laser glow edge pulse on hover */}
        {isHovered && !prefersReduced && (
          <span
            className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-[#176B87] via-[#A9D8F2] to-[#EEE7FA] opacity-50 blur-[2px] pointer-events-none -z-10"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
};
