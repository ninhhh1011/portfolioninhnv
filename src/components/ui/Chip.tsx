"use client";

import React from "react";
import { Chip as HeroUIChip } from "@heroui/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "sky" | "lavender" | "mint" | "peach" | "neutral" | "teal";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  variant = "sky",
  size = "md",
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full select-none transition-colors border";

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 tracking-wide",
    md: "text-xs px-3.5 py-1 tracking-wide",
  };

  const variantStyles = {
    sky: "bg-[#D7EAF0]/80 text-[#176B87] border-[rgba(23,107,135,0.18)]",
    teal: "bg-[#176B87]/10 text-[#176B87] border-[#176B87]/30",
    lavender: "bg-[#EEE7FA] text-[#553C9A] border-[#D6BCFA]/60",
    mint: "bg-[#DDF3E8] text-[#22543D] border-[#9AE6B4]/60",
    peach: "bg-[#FFE6D6] text-[#9C4221] border-[#FBD38D]/60",
    neutral: "bg-[#F3F1EE] text-[#183B4E] border-[rgba(66,126,138,0.14)]",
  };

  const combined = twMerge(
    clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)
  );

  return (
    <HeroUIChip className={combined} {...(props as any)}>
      {children}
    </HeroUIChip>
  );
};
