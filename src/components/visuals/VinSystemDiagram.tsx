"use client";

import React, { useEffect, useState } from "react";
import { BatteryCharging, Compass, Gauge, MapPin, Monitor, Zap } from "lucide-react";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const steps = [
  { title: "GPS", icon: MapPin, detail: "Tiếp nhận vị trí và quản lý phiên dữ liệu của tài xế." },
  { title: "Khớp bản đồ", icon: Compass, detail: "Khớp chuỗi GPS lên mạng lưới đường bằng HMM." },
  { title: "Lộ trình & năng lượng", icon: BatteryCharging, detail: "Ước tính năng lượng và tìm lộ trình qua trạm đến điểm đến." },
  { title: "Xếp hạng trạm", icon: Gauge, detail: "So sánh thời gian di chuyển, chờ, sạc và độ quen thuộc tuyến." },
  { title: "Driver HUD", icon: Monitor, detail: "Hiển thị hành trình cho tài xế bằng Leaflet và Canvas." },
];

export function VinSystemDiagram() {
  const [step, setStep] = useState(0);
  const reducedMotion = useReducedMotionSafe();
  const visible = useDocumentVisibility();

  useEffect(() => {
    if (reducedMotion || !visible) return;
    const timer = setInterval(() => setStep((current) => (current + 1) % steps.length), 2000);
    return () => clearInterval(timer);
  }, [reducedMotion, visible]);

  return (
    <div data-vin-pipeline data-step={step} className="relative mb-6 overflow-hidden rounded-2xl border border-[rgba(23,107,135,0.25)] bg-gradient-to-br from-[#F3F8FA] via-white to-[#F0F7F9] p-4 shadow-xs">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#176B87 1px, transparent 1px), linear-gradient(90deg, #176B87 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="relative z-10 mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(23,107,135,0.12)] pb-2">
        <div className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-[#176B87] motion-safe:animate-pulse"/><h4 className="font-serif text-xs font-bold text-[#183B4E] md:text-sm">Kiến trúc Data Pipeline định tuyến trạm sạc</h4></div>
        <span className="flex items-center gap-1.5 rounded-full border border-[rgba(23,107,135,0.2)] bg-white/90 px-2.5 py-0.5 font-mono text-[10px] text-[#176B87]"><span className="h-1.5 w-1.5 rounded-full bg-[#10B981]"/>Minh họa luồng xử lý</span>
      </div>
      <div className="relative z-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map(({ title, icon: Icon, detail }, index) => (
          <div key={title} data-pipeline-stage className={`relative rounded-xl border p-3 transition-all duration-500 motion-reduce:transition-none ${step === index ? "z-10 scale-[1.03] border-[#176B87] bg-white shadow-[0_6px_22px_rgba(23,107,135,0.22)] ring-2 ring-[#176B87]/30" : "border-gray-200/90 bg-white/70"}`}>
            <div className="mb-1.5 flex items-center justify-between"><span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${step === index ? "bg-[#176B87] text-white" : "bg-gray-100 text-[#526779]"}`}>0{index + 1}</span><span className={`relative h-2 w-2 rounded-full ${step === index ? "bg-[#10B981]" : "bg-gray-300"}`}>{step === index && !reducedMotion && <span className="absolute inset-0 animate-ping rounded-full bg-[#10B981] opacity-75"/>}</span></div>
            <div className="mt-1 flex items-center gap-1.5"><Icon className="h-3.5 w-3.5 shrink-0 text-[#176B87]"/><span className="text-xs font-bold text-[#183B4E]">{title}</span></div>
            <p className="mt-1 text-[11px] leading-snug text-[#526779]">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
