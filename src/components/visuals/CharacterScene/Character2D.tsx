"use client";

import Image from "next/image";

export default function Character2D({ focusMode, greeting }: { focusMode: boolean; greeting: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-label="Minh họa 2D nhân vật tại bàn làm việc">
      <div data-character-glow data-focus={focusMode} aria-hidden="true" className={`absolute left-[25%] top-[14%] h-[58%] w-[60%] rounded-full transition-opacity duration-700 ${focusMode ? "opacity-100" : "opacity-0"}`} style={{ background: "radial-gradient(ellipse, rgba(255,190,102,0.32) 0%, rgba(255,218,161,0.16) 46%, transparent 72%)" }} />
      <Image src="/visuals/character-2d/ninh-shirt-idle.png" alt="" fill sizes="(max-width: 640px) 100vw, 550px" className={`object-contain drop-shadow-[0_10px_18px_rgba(24,59,78,0.10)] transition-opacity duration-500 motion-reduce:duration-0 ${greeting ? "opacity-0" : "opacity-100"}`} />
      <div data-character-greeting data-visible={greeting} className={`absolute inset-0 transition-opacity duration-500 motion-reduce:duration-0 ${greeting ? "opacity-100" : "opacity-0"}`}>
        <Image src="/visuals/character-2d/ninh-shirt-wave-v2.png" alt="" fill sizes="(max-width: 640px) 100vw, 550px" className="object-contain" />
      </div>
    </div>
  );
}
