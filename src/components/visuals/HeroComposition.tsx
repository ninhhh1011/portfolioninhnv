"use client";

import React from "react";
import { BookOpen, Boxes, Code2, Gamepad2, Car } from "lucide-react";
import { portfolioData } from "@/content/portfolio";
import { NinhDeskScene } from "./NinhDeskScene";

export interface HeroCompositionProps {
  isExploreHovered?: boolean;
  isContactHovered?: boolean;
}

const projectLooks = [
  { icon: BookOpen, label: "AI · Học vụ", color: "#176B87" },
  { icon: Boxes, label: "Trực quan hóa", color: "#7758A3" },
  { icon: Gamepad2, label: "Cờ vua · AI", color: "#6A56A5" },
  { icon: Code2, label: "Frontend · UI/UX", color: "#397C86" },
  { icon: Car, label: "Đỗ xe thông minh", color: "#A86F44" },
];

export const HeroComposition: React.FC<HeroCompositionProps> = (props) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12 md:mt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-[#D7EAF0]/40 via-[#A9D8F2]/20 to-[#EEE7FA]/40 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="orbit-scene relative flex items-center justify-center">
        <div className="w-full max-w-[550px] relative z-10">
          <NinhDeskScene {...props} />
        </div>
        <div aria-hidden="true" className="project-orbit">
          {portfolioData.projects.map((project, index) => {
            const { icon: Icon, label, color } = projectLooks[index];
            return (
              <div
                key={project.id}
                className={`orbit-card orbit-card-${index + 1}`}
              >
                <span className="orbit-card-icon" style={{ color }}><Icon size={21} aria-hidden="true" /></span>
                <span className="min-w-0 text-left"><span className="block text-[10px] font-semibold uppercase tracking-wider text-[#526779]">{label}</span><span className="block font-serif text-sm font-bold text-[#183B4E]">{project.title}</span></span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
