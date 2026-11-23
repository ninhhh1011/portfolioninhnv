import React from "react";

export interface CloudVeilTransitionProps {
  variant?: "sky-to-cream" | "cream-to-lavender" | "lavender-to-sky" | "open-sky";
  className?: string;
}

export const CloudVeilTransition: React.FC<CloudVeilTransitionProps> = ({
  variant = "sky-to-cream",
  className = "",
}) => {
  const getGradient = () => {
    switch (variant) {
      case "cream-to-lavender":
        return "from-[#FCF9F7] via-[#EEE7FA]/20 to-[#FCF9F7]";
      case "lavender-to-sky":
        return "from-[#EEE7FA]/25 via-[#D7EAF0]/30 to-[#FCF9F7]";
      case "open-sky":
        return "from-[#FCF9F7] via-[#D7EAF0]/40 to-[#A9D8F2]/30";
      case "sky-to-cream":
      default:
        return "from-[#D7EAF0]/35 via-[#FCF9F7]/60 to-[#FCF9F7]";
    }
  };

  return (
    <div
      className={`relative w-full h-20 md:h-28 select-none overflow-hidden my-6 ${className}`}
      aria-hidden="true"
    >
      {/* Soft gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getGradient()} pointer-events-none`} />

      {/* Ultra-soft hairline divider */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[rgba(66,126,138,0.18)] to-transparent pointer-events-none z-10" />
    </div>
  );
};
