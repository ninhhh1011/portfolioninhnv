"use client";

import React from "react";
import { Card as HeroUICard } from "@heroui/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  ...props
}) => {
  return (
    <HeroUICard
      className={twMerge(
        clsx(
          "bg-white rounded-3xl border border-[rgba(66,126,138,0.14)] shadow-[0_10px_30px_rgba(66,126,138,0.06)] p-6 md:p-8 transition-all duration-300",
          hoverable &&
            "hover:shadow-[0_20px_40px_rgba(66,126,138,0.12)] hover:-translate-y-1 hover:border-[rgba(66,126,138,0.28)]",
          className
        )
      )}
      {...(props as any)}
    >
      {children}
    </HeroUICard>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={twMerge(clsx("flex flex-col gap-1.5 mb-4", className))}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <h3
    className={twMerge(
      clsx("font-serif text-2xl md:text-3xl text-[#183B4E] tracking-tight", className)
    )}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <p className={twMerge(clsx("text-sm md:text-base text-[#526779]", className))}>
    {children}
  </p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={twMerge(clsx("space-y-4", className))}>{children}</div>;

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={twMerge(clsx("mt-6 pt-4 border-t border-[rgba(66,126,138,0.1)] flex items-center justify-between", className))}>
    {children}
  </div>
);
