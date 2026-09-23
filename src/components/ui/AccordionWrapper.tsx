"use client";

import React from "react";
import { Accordion } from "@heroui/react";
import { ChevronDown, Sparkles } from "lucide-react";
import { AIPracticeItem } from "@/content/portfolio";
import { Chip } from "./Chip";

export interface AccordionWrapperProps {
  items: AIPracticeItem[];
}

export const AccordionWrapper: React.FC<AccordionWrapperProps> = ({ items }) => {
  return (
    <Accordion.Root
      defaultExpandedKeys={["agents"]}
      className="w-full divide-y divide-[rgba(66,126,138,0.14)] bg-white rounded-3xl border border-[rgba(66,126,138,0.16)] shadow-[0_12px_36px_rgba(66,126,138,0.06)] overflow-hidden"
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          id={item.id}
          className="group transition-all duration-300 data-[expanded=true]:bg-gradient-to-r data-[expanded=true]:from-[#FCF9F7] data-[expanded=true]:to-[#EEE7FA]/20 relative"
        >
          {/* Active side glow indicator */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#176B87] to-[#553C9A] opacity-0 group-data-[expanded=true]:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />

          <Accordion.Heading className="m-0">
            <Accordion.Trigger className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer hover:bg-[#D7EAF0]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B87] focus-visible:ring-inset">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-serif text-lg md:text-xl text-[#183B4E] group-hover:text-[#176B87] transition-colors">
                    {item.title}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#553C9A] opacity-0 group-data-[expanded=true]:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs md:text-sm text-[#526779] block">
                  {item.summary}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#D7EAF0]/50 flex items-center justify-center text-[#176B87] shrink-0 transition-transform duration-300 group-data-[expanded=true]:rotate-180 group-data-[expanded=true]:bg-[#EEE7FA] group-data-[expanded=true]:text-[#553C9A]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </Accordion.Trigger>
          </Accordion.Heading>

          <Accordion.Panel className="px-5 pb-6 md:px-6 md:pb-6 text-sm text-[#183B4E]">
            <Accordion.Body className="pt-2 border-t border-[rgba(66,126,138,0.1)] transition-all">
              <p className="leading-relaxed text-[#526779] mb-4 text-xs md:text-sm">{item.details}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Chip
                    key={tag}
                    variant="neutral"
                    size="sm"
                    className="hover:-translate-y-0.5 transition-transform"
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};
