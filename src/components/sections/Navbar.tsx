"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { MobileNavDrawer } from "@/components/ui/MobileNavDrawer";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export const Navbar: React.FC = () => {
  const navLinks = [
    { label: "Dự án", href: "#projects" },
    { label: "Kinh nghiệm", href: "#experience" },
    { label: "Năng lực", href: "#skills" },
    { label: "Giới thiệu", href: "#about" },
  ];

  const scrollProgress = useScrollProgress();
  const activeSection = useActiveSection(["#projects", "#experience", "#skills", "#about"]);
  const prefersReduced = useReducedMotionSafe();

  // Scroll adaptation
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Subtle magnetic CTA for desktop
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0 });

  const handleCtaPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || !ctaRef.current) return;

    const rect = ctaRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;

    // Clamp to max 3px
    setCtaOffset({
      x: Math.max(-3, Math.min(3, deltaX)),
      y: Math.max(-3, Math.min(3, deltaY)),
    });
  };

  const handleCtaPointerLeave = () => {
    setCtaOffset({ x: 0, y: 0 });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 md:top-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto relative flex items-center justify-between gap-4 md:gap-8 px-5 rounded-full border border-[rgba(66,126,138,0.2)] max-w-4xl w-full transition-all duration-300 overflow-hidden ${
          isScrolled
            ? "py-2 bg-white/92 backdrop-blur-md shadow-[0_12px_36px_rgba(24,59,78,0.1)] border-[rgba(66,126,138,0.25)]"
            : "py-2.5 bg-white/85 backdrop-blur-md shadow-[0_8px_30px_rgba(24,59,78,0.06)]"
        }`}
      >
        {/* Brand wordmark */}
        <a
          href="#"
          className="font-serif text-xl md:text-2xl font-normal tracking-tight text-[#183B4E] hover:opacity-90 transition-opacity"
        >
          Ninh<span className="text-[#176B87]">.</span>
        </a>

        {/* Desktop Links with Active State Indicator */}
        <ul className="hidden md:flex items-center gap-1.5 lg:gap-2 text-sm font-medium text-[#183B4E]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#D7EAF0] text-[#176B87] font-semibold shadow-2xs"
                      : "text-[#526779] hover:text-[#183B4E] hover:bg-[#F3F1EE]/80"
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#176B87]" />}
                  <span>{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-2.5">
          <div
            ref={ctaRef}
            onPointerMove={handleCtaPointerMove}
            onPointerLeave={handleCtaPointerLeave}
            style={{
              transform: `translate3d(${ctaOffset.x}px, ${ctaOffset.y}px, 0)`,
              transition: ctaOffset.x === 0 ? "transform 300ms ease-out" : "none",
            }}
          >
            <Button
              variant="primary"
              size="sm"
              href="#contact"
              onClick={(e: any) => handleScrollTo(e, "#contact")}
              className="hidden sm:inline-flex text-xs px-4 py-2"
            >
              Liên hệ
            </Button>
          </div>

          {/* Mobile Drawer */}
          <MobileNavDrawer navLinks={navLinks} contactHref="#contact" />
        </div>

        {/* Integrated Scroll Progress Line at Lower Edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgba(66,126,138,0.12)] pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="h-full bg-gradient-to-r from-[#176B87] via-[#427E8A] to-[#A9D8F2] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>
    </header>
  );
};
