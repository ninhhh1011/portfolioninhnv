"use client";

import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { CvModal } from "@/components/ui/CvModal";
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";

const sectionIds = ["#hero", "#projects", "#experience", "#skills", "#about", "#contact"];

function ScrollProgress() {
  const scrollProgress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-[rgba(66,126,138,0.12)] pointer-events-none z-50" aria-hidden="true">
      <div className="h-full bg-gradient-to-r from-[#176B87] via-[#64B5F6] to-[#10B981] shadow-[0_0_8px_rgba(23,107,135,0.7)] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
    </div>
  );
}

export const Navbar: React.FC = () => {
  const activeSection = useActiveSection(sectionIds);

  const [isCvOpen, setIsCvOpen] = useState(false);
  const [manualActive, setManualActive] = useState<number | null>(null);

  // Map active section IDs to navigation item indices:
  // 0: Ninh. (Trang chủ / Hero)
  // 1: Dự án
  // 2: Kinh nghiệm
  // 3: Năng lực
  // 4: Giới thiệu
  // 5: Liên hệ
  // 6: Xem CV (Action Item)
  const sectionIndexMap: Record<string, number> = {
    hero: 0,
    projects: 1,
    experience: 2,
    skills: 3,
    about: 4,
    contact: 5,
  };

  useEffect(() => {
    if (manualActive !== null && manualActive < sectionIds.length && sectionIds[manualActive] === `#${activeSection}`) {
      setManualActive(null);
    }
  }, [activeSection, manualActive]);

  useEffect(() => {
    const cancelNavigation = () => setManualActive((current) => current === 6 ? current : null);
    window.addEventListener("wheel", cancelNavigation, { passive: true });
    window.addEventListener("touchstart", cancelNavigation, { passive: true });
    return () => {
      window.removeEventListener("wheel", cancelNavigation);
      window.removeEventListener("touchstart", cancelNavigation);
    };
  }, []);

  const activeIndex = manualActive ?? (sectionIndexMap[activeSection] ?? 0);

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === "#hero" || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems: LiquidNavItem[] = [
    {
      label: (
        <span className="font-serif font-bold text-[15px] text-[#183B4E] tracking-tight">
          Ninh<span className="text-[#176B87]">.</span>
        </span>
      ),
      textLabel: "Ninh",
      href: "#hero",
      icon: NimbusIcons.home,
      fx: "glow",
      onClick: (e) => handleScrollTo(e, "#hero"),
    },
    {
      label: "Dự án",
      href: "#projects",
      icon: NimbusIcons.globe,
      fx: "spin",
      onClick: (e) => handleScrollTo(e, "#projects"),
    },
    {
      label: "Kinh nghiệm",
      href: "#experience",
      icon: NimbusIcons.plane,
      fx: "plane",
      onClick: (e) => handleScrollTo(e, "#experience"),
    },
    {
      label: "Năng lực",
      href: "#skills",
      icon: NimbusIcons.drop,
      fx: "drop",
      onClick: (e) => handleScrollTo(e, "#skills"),
    },
    {
      label: "Giới thiệu",
      href: "#about",
      icon: NimbusIcons.user,
      fx: "wave",
      onClick: (e) => handleScrollTo(e, "#about"),
    },
    {
      label: "Liên hệ",
      href: "#contact",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      ),
      fx: "pop",
      onClick: (e) => handleScrollTo(e, "#contact"),
    },
    {
      label: (
        <span className="font-semibold text-[#176B87]">Xem CV</span>
      ),
      textLabel: "Xem CV",
      icon: <FileText className="w-4 h-4 text-[#176B87]" />,
      fx: "pop",
      onClick: (e) => {
        e.preventDefault();
        setIsCvOpen(true);
      },
    },
  ];

  return (
    <>
      {/* Ultra-slim Scroll Progress Line at very top of screen */}
      <ScrollProgress />

      {/* Floating Liquid Navbar Container with all items unified */}
      <header className="fixed top-3 sm:top-4 md:top-5 left-0 right-0 z-40 flex items-center justify-center px-2 sm:px-4 pointer-events-none transition-all duration-300">
        <div className="pointer-events-auto flex items-center justify-center">
          <LiquidNavbar
            items={navItems}
            active={activeIndex}
            onChange={(idx) => {
              if (idx === 6) {
                // If Xem CV is clicked, trigger modal and keep visual feedback
                setIsCvOpen(true);
              }
              setManualActive(idx);
            }}
            tone="light"
            sound={true}
            className="shadow-[0_16px_40px_-12px_rgba(24,59,78,0.22)]"
          />
        </div>
      </header>

      {/* CV Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => {
          setIsCvOpen(false);
          // Return droplet to current section if it was on "Xem CV"
          setManualActive(null);
        }}
      />
    </>
  );
};
