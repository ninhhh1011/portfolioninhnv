"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export interface ProximityValues {
  distance: number; // in pixels
  intensity: number; // 0 to 1
  isNearby: boolean;
}

export function useProximityEffect<T extends HTMLElement = HTMLDivElement>(
  thresholdDistance: number = 320
): { ref: React.RefObject<T | null>; proximity: ProximityValues } {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotionSafe();
  const [proximity, setProximity] = useState<ProximityValues>({
    distance: Infinity,
    intensity: 0,
    isNearby: false,
  });

  useEffect(() => {
    if (prefersReduced || typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    let rafId: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;

      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = Math.max(Math.abs(e.clientX - centerX) - rect.width / 2, 0);
        const deltaY = Math.max(Math.abs(e.clientY - centerY) - rect.height / 2, 0);
        const dist = Math.hypot(deltaX, deltaY);

        if (dist <= thresholdDistance) {
          const intensity = Math.max(0, 1 - dist / thresholdDistance);
          setProximity({
            distance: dist,
            intensity,
            isNearby: true,
          });
        } else {
          setProximity((prev) =>
            prev.isNearby ? { distance: Infinity, intensity: 0, isNearby: false } : prev
          );
        }

        rafId = null;
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [thresholdDistance, prefersReduced]);

  return { ref, proximity };
}
