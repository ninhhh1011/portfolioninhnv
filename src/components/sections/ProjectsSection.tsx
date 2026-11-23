"use client";

import React from "react";
import { portfolioData } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ParabolicCarousel3D } from "@/components/ui/carousels/ParabolicCarousel3D";

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;

  return (
    <section
      id="projects"
      style={{ scrollMarginTop: "140px" }}
      className="pt-28 sm:pt-32 md:pt-36 pb-20 md:pb-28 px-4 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <SectionReveal direction="up" delayMs={50}>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#176B87] bg-[#D7EAF0]/60 px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.15)] shadow-xs">
            Sản phẩm tiêu biểu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B4E] mt-4 mb-3 tracking-tight">
            Dự án tiêu biểu
          </h2>
          <p className="text-sm md:text-base text-[#526779] leading-relaxed">
            Khám phá những sản phẩm mình xây dựng, từ trợ lý học vụ và công cụ trực quan hóa đến trải nghiệm web tương tác.
          </p>
        </div>
      </SectionReveal>

      {/* 3D Parabolic Arch Carousel */}
      <div className="relative min-h-[580px]">
        <ParabolicCarousel3D projects={projects} />
      </div>
    </section>
  );
};
