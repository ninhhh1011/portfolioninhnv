"use client";

import React from "react";
import { Modal } from "@heroui/react";
import { X, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { ProjectItem } from "@/content/portfolio";
import { Chip } from "./Chip";
import { Button } from "./Button";

export interface ProjectModalProps {
  project: ProjectItem;
  trigger: React.ReactNode;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, trigger }) => {
  return (
    <Modal.Root>
      <Modal.Trigger className="inline-flex cursor-pointer">{trigger}</Modal.Trigger>
      <Modal.Backdrop
        className="fixed inset-0 z-50 bg-[rgba(24,59,78,0.35)] backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
        isDismissable
      >
        <Modal.Container className="w-full max-w-2xl bg-white rounded-3xl border border-[rgba(66,126,138,0.2)] shadow-[0_24px_64px_rgba(24,59,78,0.18)] overflow-hidden focus:outline-none transform transition-all duration-300 animate-[heroFadeUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
          <Modal.Dialog className="p-6 md:p-8 focus:outline-none">
            <Modal.Header className="flex items-start justify-between gap-4 pb-4 border-b border-[rgba(66,126,138,0.12)]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Chip variant="sky" size="sm">
                    {project.type}
                  </Chip>
                  <span className="text-xs text-[#526779] font-medium">{project.year}</span>
                </div>
                <Modal.Heading className="font-serif text-2xl md:text-3xl text-[#183B4E]">
                  {project.title}
                </Modal.Heading>
                <p className="text-xs md:text-sm text-[#526779] mt-0.5">{project.subtitle}</p>
              </div>

              <Modal.CloseTrigger className="p-2 rounded-full text-[#526779] hover:text-[#183B4E] hover:bg-[#D7EAF0]/40 transition-colors cursor-pointer border border-transparent hover:border-[rgba(66,126,138,0.2)]">
                <X className="w-5 h-5" />
                <span className="sr-only">Đóng modal</span>
              </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body className="py-5 space-y-5 text-sm md:text-base text-[#183B4E]">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#176B87] mb-2">
                  Tổng quan dự án
                </h4>
                <p className="text-[#526779] leading-relaxed">{project.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#176B87] mb-2">
                  Đóng góp & Luồng kỹ thuật
                </h4>
                <ul className="space-y-2.5">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[#183B4E]">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#176B87] mt-2 shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#176B87] mb-2.5">
                  Công nghệ sử dụng
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Chip key={tech} variant="neutral" size="sm">
                      {tech}
                    </Chip>
                  ))}
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="pt-4 border-t border-[rgba(66,126,138,0.12)] flex items-center justify-end gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Mở Demo
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  Mã nguồn
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
};
