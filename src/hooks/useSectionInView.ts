"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export interface UseSectionInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useSectionInView<T extends HTMLElement = HTMLDivElement>(
  options: UseSectionInViewOptions = {}
) {
  const { threshold = 0.01, rootMargin = "250px 0px 250px 0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const prefersReduced = useReducedMotionSafe();

  useEffect(() => {
    // If reduced motion is active, consider immediately in view
    if (prefersReduced) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, prefersReduced]);

  return { ref, isInView };
}
