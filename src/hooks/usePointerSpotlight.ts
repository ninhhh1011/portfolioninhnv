"use client";

import { useRef, useCallback, useEffect } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export function usePointerSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotionSafe();

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    // Check if pointer is fine (mouse, trackpad) vs coarse (touchscreen)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const onPointerMove = (e: PointerEvent) => handlePointerMove(e);
    el.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
    };
  }, [handlePointerMove, prefersReduced]);

  return ref;
}
