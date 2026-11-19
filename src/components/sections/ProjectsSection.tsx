"use client";

import React, { useState } from "react";
import { Sparkles, Layers, RotateCw, Orbit } from "lucide-react";
import { portfolioData } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ArcCarousel3D } from "@/components/ui/carousels/ArcCarousel3D";
import { CylinderCarousel3D } from "@/components/ui/carousels/CylinderCarousel3D";
import { CoverflowCarousel3D } from "@/components/ui/carousels/CoverflowCarousel3D";

type CarouselMode = "arc" | "cylinder" | "coverflow";

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const [mode, setMode] = useState<CarouselMode>("arc");

  return (
    <section id="projects" className="pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-28 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <SectionReveal direction="up" delayMs={50}>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#176B87] bg-[#D7EAF0]/60 px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.15)] shadow-xs">
            Sản phẩm tiêu biểu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B4E] mt-4 mb-3 tracking-tight">
            Vòng quay ngựa gỗ 3D
          </h2>
          <p className="text-sm md:text-base text-[#526779] leading-relaxed">
            Trải nghiệm 3 hướng hiển thị không gian 3D cong tương tác trực quan. Bấm chọn chế độ bên dưới để thử nghiệm và so sánh.
          </p>

          {/* Interactive Mode Switcher */}
          <div className="relative z-30 mt-8 inline-flex items-center p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[rgba(23,107,135,0.25)] shadow-[0_8px_30px_rgba(24,59,78,0.12)] flex-wrap justify-center gap-1.5">
            <button
              type="button"
              onClick={() => setMode("arc")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                mode === "arc"
                  ? "bg-[#176B87] text-white shadow-md font-semibold scale-[1.02]"
                  : "text-[#526779] hover:text-[#183B4E] hover:bg-[#D7EAF0]/50"
              }`}
            >
              <Orbit className="w-4 h-4" />
              <span>1. Vòng cung điện ảnh (Arc)</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("cylinder")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                mode === "cylinder"
                  ? "bg-[#176B87] text-white shadow-md font-semibold scale-[1.02]"
                  : "text-[#526779] hover:text-[#183B4E] hover:bg-[#D7EAF0]/50"
              }`}
            >
              <RotateCw className="w-4 h-4" />
              <span>2. Đu quay 360° (Cylinder)</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("coverflow")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                mode === "coverflow"
                  ? "bg-[#176B87] text-white shadow-md font-semibold scale-[1.02]"
                  : "text-[#526779] hover:text-[#183B4E] hover:bg-[#D7EAF0]/50"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3. Coverflow 3D</span>
            </button>
          </div>

          {/* Mode Subtitle / Explainer */}
          <div className="mt-3.5 text-xs text-[#526779] font-mono">
            {mode === "arc" && "✦ Hướng 1: Vòng cung cong hướng về người xem · Thẻ trung tâm nổi bật · Tự động đổi vị trí"}
            {mode === "cylinder" && "✦ Hướng 2: Đu quay ngựa gỗ hình trụ 360° · Kéo xoay vòng tròn không gian 3D"}
            {mode === "coverflow" && "✦ Hướng 3: Coverflow đa tầng sân khấu · Nghiêng góc 50° · Đổ bóng gương phản chiếu"}
          </div>
        </div>
      </SectionReveal>

      {/* Render the Active 3D Carousel Mode */}
      <div className="relative min-h-[620px] sm:min-h-[580px]">
        {mode === "arc" && <ArcCarousel3D projects={projects} />}
        {mode === "cylinder" && <CylinderCarousel3D projects={projects} />}
        {mode === "coverflow" && <CoverflowCarousel3D projects={projects} />}
      </div>
    </section>
  );
};
