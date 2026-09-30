"use client";

import React from "react";
import { GraduationCap, Award, Compass, Sparkles, MapPin } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { portfolioData, EducationItem } from "@/content/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";

export const AboutSection: React.FC = () => {
  const { education } = portfolioData;

  const getEducationIcon = (index: number) => {
    switch (index) {
      case 0:
        return <GraduationCap className="w-5 h-5 text-[#176B87]" />;
      case 1:
        return <Compass className="w-5 h-5 text-[#176B87]" />;
      case 2:
        return <Sparkles className="w-5 h-5 text-[#176B87]" />;
      default:
        return <Award className="w-5 h-5 text-[#176B87]" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 px-4 max-w-5xl mx-auto">
      {/* Editorial layout: 2 columns with generous whitespace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Narrative voice (5 cols) */}
        <SectionReveal direction="right" delayMs={60} className="lg:col-span-5 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#176B87] bg-[#D7EAF0]/60 px-3.5 py-1 rounded-full border border-[rgba(23,107,135,0.15)] shadow-xs">
            Giới thiệu & Định hướng
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B4E] tracking-tight leading-[1.15]">
            Học hỏi qua sản phẩm thực chiến.
          </h2>

          <div className="space-y-4 text-[#526779] text-base leading-relaxed">
            <p>
              Tôi tiếp cận việc lập trình không chỉ từ cú pháp hay công nghệ mới, mà bắt đầu từ trải nghiệm người dùng cuối và độ vững chắc của hệ thống bên dưới.
            </p>
            <p>
              Trong quá trình học tại HaUI và tham gia chương trình AI thực chiến tại VinUni, tôi rèn luyện tư duy kiểm thử tự động, tích hợp dịch vụ thực tế và tối ưu hóa luồng tương tác mượt mà.
            </p>
          </div>

          {/* Signature Identity Element with Soft Halo and Delicate Animation */}
          <div className="pt-4 border-t border-[rgba(66,126,138,0.14)] relative">
            <div className="flex items-center gap-3.5 group">
              <div className="relative">
                {/* Soft ambient halo */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#D7EAF0] to-[#EEE7FA] blur-xs group-hover:scale-110 transition-transform duration-300" />
                <div className="relative w-11 h-11 rounded-full bg-white border border-[rgba(66,126,138,0.2)] flex items-center justify-center font-serif text-[#176B87] font-bold text-lg shadow-xs group-hover:bg-[#176B87] group-hover:text-white transition-all duration-300">
                  N
                </div>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-[#183B4E] group-hover:text-[#176B87] transition-colors">
                  Nguyễn Văn Ninh
                </h4>
                <p className="text-xs text-[#526779] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#176B87]" />
                  <span>Hà Nội, Việt Nam</span>
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Right Column: Education & Training milestones (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <SectionReveal direction="left" delayMs={60}>
            <h3 className="font-serif text-2xl text-[#183B4E] mb-6 flex items-center gap-2.5">
              <span>Học vấn & Đào tạo</span>
              <span className="text-xs font-sans text-[#176B87] bg-[#D7EAF0]/60 px-2.5 py-0.5 rounded-full font-medium border border-[rgba(23,107,135,0.14)]">
                Chính thức
              </span>
            </h3>
          </SectionReveal>

          <div className="space-y-4">
            {education.map((item: EducationItem, idx: number) => (
              <SectionReveal key={item.institution} direction="left" delayMs={100 + idx * 100}>
                <SpotlightSurface variant="subtle" className="rounded-2xl">
                  <div className="bg-white rounded-2xl p-5 md:p-6 border border-[rgba(66,126,138,0.14)] shadow-xs hover:border-[rgba(66,126,138,0.3)] hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D7EAF0]/60 flex items-center justify-center shrink-0 mt-0.5 text-[#176B87] shadow-2xs">
                      {getEducationIcon(idx)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h4 className="font-serif text-base md:text-lg font-bold text-[#183B4E]">
                          {item.institution}
                        </h4>
                        <span className="text-xs text-[#526779] font-medium bg-[#FCF9F7] px-2.5 py-0.5 rounded-full border border-[rgba(66,126,138,0.12)]">
                          {item.period}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-[#176B87] mb-1">
                        {item.roleOrDegree}
                      </p>

                      {item.description && (
                        <p className="text-xs md:text-sm text-[#526779] leading-relaxed mt-1">
                          {item.description}
                        </p>
                      )}

                      {item.badge && (
                        <div className="mt-2.5">
                          <Chip variant="neutral" size="sm">
                            {item.badge}
                          </Chip>
                        </div>
                      )}
                    </div>
                  </div>
                </SpotlightSurface>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
