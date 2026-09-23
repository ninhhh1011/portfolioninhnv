"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -55% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const cleanId = id.replace("#", "");
      const el = document.getElementById(cleanId);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
