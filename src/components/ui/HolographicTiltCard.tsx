"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface HolographicTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees, default 14
  perspective?: number; // px, default 1200
  glareIntensity?: number; // 0 to 1, default 0.35
  dataMagnetic?: boolean;
}

export const HolographicTiltCard: React.FC<HolographicTiltCardProps> = ({
  children,
  className = "",
  maxTilt = 12,
  perspective = 1100,
  glareIntensity = 0.32,
  dataMagnetic = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReduced) return;

    let targetTiltX = 0;
    let targetTiltY = 0;
    let targetGlareX = 50;
    let targetGlareY = 50;
    let targetGlareOpacity = 0;

    let currentTiltX = 0;
    let currentTiltY = 0;
    let currentGlareX = 50;
    let currentGlareY = 50;
    let currentGlareOpacity = 0;

    let animId: number | null = null;
    let active = false;

    const renderLoop = () => {
      // Lerp tilt
      currentTiltX += (targetTiltX - currentTiltX) * 0.16;
      currentTiltY += (targetTiltY - currentTiltY) * 0.16;
      currentGlareX += (targetGlareX - currentGlareX) * 0.18;
      currentGlareY += (targetGlareY - currentGlareY) * 0.18;
      currentGlareOpacity += (targetGlareOpacity - currentGlareOpacity) * 0.15;

      setTilt({ x: currentTiltX, y: currentTiltY });
      setGlare({
        x: currentGlareX,
        y: currentGlareY,
        opacity: currentGlareOpacity,
      });

      if (
        active ||
        Math.abs(targetTiltX - currentTiltX) > 0.05 ||
        Math.abs(targetTiltY - currentTiltY) > 0.05 ||
        Math.abs(targetGlareOpacity - currentGlareOpacity) > 0.02
      ) {
        animId = requestAnimationFrame(renderLoop);
      } else {
        animId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = clientX / rect.width; // 0 to 1
      const normY = clientY / rect.height; // 0 to 1

      // Tilt angle: mouse at top tilts up (positive rotateX), mouse at bottom tilts down (negative rotateX)
      targetTiltX = (0.5 - normY) * maxTilt * 2;
      targetTiltY = (normX - 0.5) * maxTilt * 2;

      // Glare coordinates match cursor position
      targetGlareX = normX * 100;
      targetGlareY = normY * 100;
      targetGlareOpacity = glareIntensity;

      active = true;
      if (!animId) animId = requestAnimationFrame(renderLoop);
    };

    const handlePointerEnter = () => {
      setIsHovered(true);
      active = true;
    };

    const handlePointerLeave = () => {
      setIsHovered(false);
      active = false;
      targetTiltX = 0;
      targetTiltY = 0;
      targetGlareOpacity = 0;
      if (!animId) animId = requestAnimationFrame(renderLoop);
    };

    card.addEventListener("pointermove", handlePointerMove, { passive: true });
    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointerleave", handlePointerLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [maxTilt, glareIntensity, prefersReduced]);

  const transformStyle = prefersReduced
    ? undefined
    : {
        transform: `perspective(${perspective}px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
        transformStyle: "preserve-3d" as const,
      };

  return (
    <div
      ref={cardRef}
      className={`relative select-none transition-shadow duration-300 will-change-transform ${
        isHovered ? "shadow-[0_24px_60px_rgba(24,59,78,0.18)]" : ""
      } ${className}`}
      style={transformStyle}
      data-magnetic={dataMagnetic ? "true" : undefined}
    >
      {/* Content wrapper with 3D preservation */}
      <div className="relative z-10 w-full h-full">{children}</div>

      {/* Holographic Specular Glare Overlay */}
      {!prefersReduced && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 overflow-hidden mix-blend-overlay"
          aria-hidden="true"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.75), rgba(215, 234, 240, 0.25) 40%, transparent 75%)`,
            transition: "opacity 0.2s ease",
          }}
        />
      )}

      {/* Holographic Rainbow/Prismatic subtle border sheen */}
      {!prefersReduced && isHovered && (
        <div
          className="absolute -inset-[1px] rounded-[inherit] pointer-events-none z-10 opacity-40 blur-[1px]"
          aria-hidden="true"
          style={{
            background: `linear-gradient(${tilt.y * 8 + 120}deg, #A9D8F2, #EEE7FA, #D7EAF0, #176B87)`,
          }}
        />
      )}
    </div>
  );
};
