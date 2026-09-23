"use client";

import React from "react";
import { Button as HeroUIButton } from "@heroui/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B87] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none rounded-full";

  const sizeStyles = {
    sm: "h-9 px-4 text-xs tracking-wide",
    md: "h-12 px-6 text-sm tracking-normal",
    lg: "h-14 px-8 text-base tracking-normal",
  };

  const variantStyles = {
    primary:
      "bg-[#176B87] text-white hover:bg-[#13556c] active:bg-[#0f4356] shadow-[0_4px_16px_rgba(23,107,135,0.2)] hover:shadow-[0_6px_20px_rgba(23,107,135,0.3)] hover:-translate-y-0.5",
    secondary:
      "bg-white text-[#183B4E] border border-[rgba(66,126,138,0.22)] hover:bg-[#F3F1EE] hover:border-[rgba(66,126,138,0.35)] shadow-sm hover:-translate-y-0.5",
    outline:
      "bg-transparent text-[#183B4E] border border-[rgba(66,126,138,0.3)] hover:bg-[#D7EAF0]/40 hover:text-[#176B87]",
    ghost:
      "bg-transparent text-[#183B4E] hover:bg-[rgba(66,126,138,0.08)] hover:text-[#176B87]",
  };

  const combinedClass = twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className));

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClass}>
        {children}
      </a>
    );
  }

  return (
    <HeroUIButton className={combinedClass} {...(props as any)}>
      {children}
    </HeroUIButton>
  );
};
