"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export interface UseMagneticOptions {
  strength?: number; // 0 to 1, default 0.35
  radius?: number; // attraction radius in px, default 80
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  options: UseMagneticOptions = {}
) {
  const { strength = 0.35, radius = 80 } = options;
  const ref = useRef<T | null>(null);
  const prefersReduced = useReducedMotionSafe();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReduced) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number | null = null;
    let isTracking = false;

    const updatePosition = () => {
      // Lerp smoothing towards target
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (element) {
        element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      // Keep animation running until nearly settled
      if (
        isTracking ||
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        animId = requestAnimationFrame(updatePosition);
      } else {
        if (element) {
          element.style.transform = "";
        }
        animId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < radius) {
        isTracking = true;
        // Attractive pull scaled by distance falloff
        const pullFactor = (1 - distance / radius) * strength;
        targetX = distX * pullFactor;
        targetY = distY * pullFactor;

        if (!animId) {
          animId = requestAnimationFrame(updatePosition);
        }
      } else if (isTracking) {
        isTracking = false;
        targetX = 0;
        targetY = 0;
        if (!animId) {
          animId = requestAnimationFrame(updatePosition);
        }
      }
    };

    const handleMouseLeave = () => {
      isTracking = false;
      targetX = 0;
      targetY = 0;
      if (!animId) {
        animId = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
      if (element) element.style.transform = "";
    };
  }, [strength, radius, prefersReduced]);

  return ref;
}
