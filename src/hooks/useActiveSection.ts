"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      let current = "";

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const cleanId = id.replace("#", "");
        const el = document.getElementById(cleanId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            current = cleanId;
            break;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return activeSection;
}
