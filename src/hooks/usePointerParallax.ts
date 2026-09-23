"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export interface PointerParallaxValues {
  tiltX: number; // rotateX degrees
  tiltY: number; // rotateY degrees
  translateX: number; // px
  translateY: number; // px
}

export function usePointerParallax(options: {
  maxRotateX?: number;
  maxRotateY?: number;
  maxTranslate?: number;
  containerRef?: React.RefObject<HTMLElement | null>;
} = {}): PointerParallaxValues {
  const { maxRotateX = 1.5, maxRotateY = 2.0, maxTranslate = 8, containerRef } = options;
  const prefersReduced = useReducedMotionSafe();
  const [values, setValues] = useState<PointerParallaxValues>({
    tiltX: 0,
    tiltY: 0,
    translateX: 0,
    translateY: 0,
  });

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced || typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const target = containerRef?.current || window;

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        let normalizedX = 0;
        let normalizedY = 0;

        if (containerRef?.current) {
          const rect = containerRef.current.getBoundingClientRect();
          normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        } else {
          normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
          normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
        }

        // Clamp between -1 and 1
        normalizedX = Math.max(-1, Math.min(1, normalizedX));
        normalizedY = Math.max(-1, Math.min(1, normalizedY));

        setValues({
          tiltX: -normalizedY * maxRotateX,
          tiltY: normalizedX * maxRotateY,
          translateX: normalizedX * maxTranslate,
          translateY: normalizedY * maxTranslate,
        });
      });
    };

    const handlePointerLeave = () => {
      setValues({ tiltX: 0, tiltY: 0, translateX: 0, translateY: 0 });
    };

    target.addEventListener("pointermove", handlePointerMove as EventListener, { passive: true });
    target.addEventListener("pointerleave", handlePointerLeave as EventListener, { passive: true });

    return () => {
      target.removeEventListener("pointermove", handlePointerMove as EventListener);
      target.removeEventListener("pointerleave", handlePointerLeave as EventListener);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [maxRotateX, maxRotateY, maxTranslate, containerRef, prefersReduced]);

  return values;
}
