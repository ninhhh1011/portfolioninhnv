"use client";

import React, { useEffect, useCallback } from "react";
import { X, Download, FileText, ExternalLink, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { Button } from "./Button";
import { portfolioData } from "@/content/portfolio";

export interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { profile, education, experience, projects, skillCategories } = portfolioData;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#183B4E]/60 backdrop-blur-sm animate-[heroFadeUp_0.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-[rgba(66,126,138,0.25)] flex flex-col overflow-hidden text-[#183B4E]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#D7EAF0]/40 via-white to-[#D7EAF0]/30 border-b border-[rgba(66,126,138,0.15)] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D7EAF0] flex items-center justify-center text-[#176B87]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 id="cv-modal-title" className="font-serif text-base font-bold text-[#183B4E]">
                Bản tóm tắt CV (1 Trang chuẩn Harvard)
              </h2>
              <p className="text-[11px] text-[#526779]">
                Xem nhanh trước khi tải tệp PDF chính thức
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              href={profile.cvPath}
              download="Nguyen_Van_Ninh_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-1.5 text-xs py-1.5 px-3.5 h-8 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải bản PDF</span>
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-[#526779] hover:text-[#183B4E] transition-colors focus-visible:ring-2 focus-visible:ring-[#176B87]"
              aria-label="Đóng cửa sổ xem CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Resume Content (Single-page paper aesthetic) */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm leading-relaxed font-sans">
          {/* Header */}
          <div className="text-center pb-4 border-b border-gray-200">
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#183B4E]">
              {profile.name}
            </h1>
            <p className="text-xs md:text-sm text-[#176B87] font-semibold mt-1">
              Backend · AI Applications · Frontend Developer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#526779] mt-2.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#176B87]" /> Hà Nội, Việt Nam
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#176B87]" /> {profile.email}
              </span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#176B87] hover:underline"
              >
                <GithubIcon className="w-3.5 h-3.5" /> github.com/ninhhh1011
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#176B87] hover:underline"
              >
                <LinkedInIcon className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>
          </div>

          {/* 1. Học vấn (Education) */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#176B87] border-b border-[#176B87]/30 pb-1 mb-3">
              HỌC VẤN & ĐÀO TẠO
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-baseline">
                <div>
                  <strong className="font-semibold text-[#183B4E]">
                    Đại học Công nghiệp Hà Nội (HaUI)
                  </strong>{" "}
                  — <em>Kỹ thuật Phần mềm</em>
                </div>
                <span className="text-[#526779] font-mono">2024 – Hiện tại</span>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <strong className="font-semibold text-[#183B4E]">
                    AIC-Innovation Lab, HaUI
                  </strong>{" "}
                  — <em>Thành viên Lab Nghiên cứu & Sáng tạo</em>
                </div>
                <span className="text-[#526779] font-mono">2026 – Hiện tại</span>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <strong className="font-semibold text-[#183B4E]">VinUni</strong> —{" "}
                  <em>Chương trình AI thực chiến Khóa 3 (6 tuần Build Phase + 6 tuần thực tập)</em>
                </div>
                <span className="text-[#526779] font-mono">2026</span>
              </div>
              <div className="flex justify-between items-baseline text-[#526779]">
                <div>Chứng chỉ Ngoại ngữ: TOEIC Listening & Reading — <strong>700 điểm</strong></div>
                <span className="font-mono">2026</span>
              </div>
            </div>
          </section>

          {/* 2. Kinh nghiệm thực tập (Experience) */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#176B87] border-b border-[#176B87]/30 pb-1 mb-3">
              KINH NGHIỆM CHUYÊN MÔN
            </h3>
            <div className="space-y-4 text-xs">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <strong className="font-semibold text-[#183B4E] text-sm">
                      {exp.company}
                    </strong>
                    <span className="text-[#526779] font-mono">{exp.period}</span>
                  </div>
                  <div className="text-[#176B87] font-medium mb-1.5">{exp.role}</div>
                  <ul className="list-disc list-inside space-y-1 text-[#526779] leading-relaxed">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Dự án tiêu biểu (Projects) */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#176B87] border-b border-[#176B87]/30 pb-1 mb-3">
              DỰ ÁN NỔI BẬT
            </h3>
            <div className="space-y-4 text-xs">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-2">
                      <strong className="font-semibold text-[#183B4E] text-sm">
                        {proj.title}
                      </strong>
                      <span className="text-[10px] text-[#176B87] bg-[#D7EAF0]/60 px-1.5 py-0.5 rounded">
                        {proj.subtitle}
                      </span>
                    </div>
                    <span className="text-[#526779] font-mono">{proj.year}</span>
                  </div>
                  <p className="text-[#526779] my-1">{proj.description}</p>
                  <ul className="list-disc list-inside space-y-0.5 text-[#526779]">
                    {proj.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="mt-1 text-[11px] text-[#176B87]">
                    <strong>Công nghệ:</strong> {proj.technologies.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Kỹ năng kỹ thuật (Skills) */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#176B87] border-b border-[#176B87]/30 pb-1 mb-3">
              KỸ NĂNG KỸ THUẬT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#526779]">
              <div>
                <strong className="text-[#183B4E]">Backend & Databases:</strong> Python, FastAPI,
                PostgreSQL, PostGIS, Redis, OSRM, REST API.
              </div>
              <div>
                <strong className="text-[#183B4E]">Frontend & UI:</strong> Next.js (App Router),
                React, TypeScript, Tailwind CSS, HeroUI.
              </div>
              <div>
                <strong className="text-[#183B4E]">AI & Tooling:</strong> LLM Integration, RAG
                Pipelines, Stockfish WASM, Git, Docker, Pytest.
              </div>
              <div>
                <strong className="text-[#183B4E]">Quy chuẩn chất lượng:</strong> End-to-End
                Testing, Code Review, Responsive, Đa ngôn ngữ (i18n).
              </div>
            </div>
          </section>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3 bg-[#FCF9F7] border-t border-[rgba(66,126,138,0.15)] flex items-center justify-between">
          <span className="text-xs text-[#526779]">
            Tệp PDF tương thích mọi hệ thống ATS tuyển dụng.
          </span>
          <div className="flex gap-2.5">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Đóng
            </Button>
            <Button
              variant="primary"
              size="sm"
              href={profile.cvPath}
              download="Nguyen_Van_Ninh_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file PDF chính thức</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
