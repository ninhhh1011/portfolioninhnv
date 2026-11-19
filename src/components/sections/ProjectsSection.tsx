"use client";

import React, { useState } from "react";
import { Orbit, BookOpen, Sparkles } from "lucide-react";
import { portfolioData } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ParabolicCarousel3D } from "@/components/ui/carousels/ParabolicCarousel3D";
import { PageCurlBook3D } from "@/components/ui/carousels/PageCurlBook3D";

type CompareMode = "parabolic" | "book";

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const [compareMode, setCompareMode] = useState<CompareMode>("parabolic");

  return (
    <section
      id="projects"
      style={{ scrollMarginTop: "140px" }}
      className="pt-32 sm:pt-36 md:pt-40 pb-20 md:pb-28 px-4 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <SectionReveal direction="up" delayMs={50}>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#176B87] bg-[#D7EAF0]/60 px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.15)] shadow-xs">
            Sản phẩm tiêu biểu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B4E] mt-4 mb-3 tracking-tight">
            {compareMode === "parabolic" ? "Vòng quay ngựa gỗ Parabol 3D" : "Sổ tay dự án · Lật sách 3D"}
          </h2>
          <p className="text-sm md:text-base text-[#526779] leading-relaxed">
            So sánh trực tiếp giữa hiệu ứng <strong>Đu quay cong Parabol</strong> và <strong>Lật trang sách 3D (Page Curl)</strong> để bạn chọn phương án tối ưu nhất.
          </p>

          {/* Direct 2-Way Comparison Switcher */}
          <div className="relative z-30 mt-8 inline-flex items-center p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[rgba(23,107,135,0.25)] shadow-[0_8px_30px_rgba(24,59,78,0.12)] flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setCompareMode("parabolic")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                compareMode === "parabolic"
                  ? "bg-[#176B87] text-white shadow-md font-semibold scale-[1.02]"
                  : "text-[#526779] hover:text-[#183B4E] hover:bg-[#D7EAF0]/50"
              }`}
            >
              <Orbit className="w-4 h-4" />
              <span>1. Vòng quay Parabol 3D (Đường cong hướng lên)</span>
            </button>

            <button
              type="button"
              onClick={() => setCompareMode("book")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                compareMode === "book"
                  ? "bg-[#176B87] text-white shadow-md font-semibold scale-[1.02]"
                  : "text-[#526779] hover:text-[#183B4E] hover:bg-[#D7EAF0]/50"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>2. Page Curl (Lật trang sách 3D)</span>
            </button>
          </div>

          {/* Mode Subtitle / Explainer */}
          <div className="mt-3.5 text-xs text-[#526779] font-mono">
            {compareMode === "parabolic" &&
              "✦ Thẻ di chuyển uốn lượn theo vòm cong parabol 3D · Đỉnh cao ở giữa, hai bên chúc xuống · Tự động trượt"}
            {compareMode === "book" &&
              "✦ Sách mở 2 trang chân thực · Gáy sách đổ bóng · Hiệu ứng lật trang 3D kèm âm thanh lật giấy nhẹ nhàng"}
          </div>
        </div>
      </SectionReveal>

      {/* Render Selected Interactive Mode */}
      <div className="relative min-h-[640px] sm:min-h-[600px]">
        {compareMode === "parabolic" ? (
          <ParabolicCarousel3D projects={projects} />
        ) : (
          <PageCurlBook3D projects={projects} />
        )}
      </div>
    </section>
  );
};
