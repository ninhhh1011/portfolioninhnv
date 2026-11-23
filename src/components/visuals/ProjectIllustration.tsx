"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Bot, Check, Code2, GraduationCap } from "lucide-react";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const sortFrames = [
  { values: [3, 1, 2], active: [3, 1], text: "So sánh 3 và 1" },
  { values: [1, 3, 2], active: [3, 1], text: "Đổi chỗ 3 và 1" },
  { values: [1, 3, 2], active: [3, 2], text: "So sánh 3 và 2" },
  { values: [1, 2, 3], active: [3, 2], text: "Đổi chỗ 3 và 2" },
  { values: [1, 2, 3], active: [1, 2], text: "So sánh 1 và 2" },
  { values: [1, 2, 3], active: [], text: "Mảng đã được sắp xếp" },
];

export function ProjectIllustration({ projectId }: { projectId: string }) {
  const [step, setStep] = useState(0);
  const reducedMotion = useReducedMotionSafe();
  const visible = useDocumentVisibility();

  useEffect(() => {
    if (reducedMotion || !visible) return;
    const timer = setInterval(() => setStep((current) => (current + 1) % 6), 2400);
    return () => clearInterval(timer);
  }, [reducedMotion, visible]);

  const questions = ["Mình cần học gì kỳ tới?", "Làm sao kiểm tra điều kiện tốt nghiệp?", "Gợi ý lộ trình học tập cho mình"];
  const answers = ["Ưu tiên các môn tiên quyết và cân đối số tín chỉ.", "Đối chiếu tín chỉ và các học phần bắt buộc trong chương trình.", "Dựa trên hồ sơ, hãy chia các môn còn lại theo từng học kỳ."];
  const section = Math.floor(step / 2);

  return (
    <div data-preview={projectId} data-step={step} className="relative min-h-[260px] sm:min-h-[300px] overflow-hidden rounded-2xl border border-[#176B87]/15 bg-gradient-to-br from-[#edf7fa] via-[#fbfafb] to-[#eee8fa] p-4 sm:p-5 text-[#183B4E] select-none">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-semibold text-[#526779]"><span>Minh họa · {projectId === "haui-advisor" ? "Trợ lý học vụ" : projectId === "techviz" ? "Thuật toán" : "Portfolio"}</span><span className="flex gap-1"><i className="w-1.5 h-1.5 rounded-full bg-[#78b7be]"/><i className="w-1.5 h-1.5 rounded-full bg-[#c0aad9]"/><i className="w-1.5 h-1.5 rounded-full bg-[#e9cba7]"/></span></div>
      {projectId === "haui-advisor" ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#176B87]/10 bg-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-[#176B87]/10 px-4 py-2.5"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#e4f3f3] text-[#176B87]"><GraduationCap size={17}/></span><div><strong className="block text-xs">HaUI Advisor</strong><span className="text-[10px] text-[#66808b]">Trợ lý học vụ · AI / RAG</span></div><span className="ml-auto h-2 w-2 rounded-full bg-[#7acbb0]"/></div>
          <div className="space-y-3 p-3 text-xs"><div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#176B87] px-3 py-2 text-white transition-all duration-500">{questions[section]}</div><div className="flex gap-2"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#eee8fa] text-[#8768b2]"><Bot size={15}/></span><div className="rounded-2xl rounded-tl-sm bg-[#f2f7f8] px-3 py-2 leading-relaxed"><span>{step % 2 === 0 ? "Đang tìm thông tin phù hợp..." : answers[section]}</span><div className="mt-2 flex items-center gap-1 text-[10px] text-[#397d89]"><BookOpen size={12}/> {step % 2 === 0 ? "Đang tra cứu" : "Quy định học vụ · Hồ sơ sinh viên"}</div></div></div></div>
        </div>
      ) : projectId === "techviz" ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#dce4ee] bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-[#e9edf3] px-4 py-2.5"><div><strong className="block text-xs text-[#263650]">TechViz Sandbox</strong><span className="text-[10px] text-[#78879b]">Phòng lab trực quan hóa</span></div><span className="rounded-full bg-[#edf1ff] px-2 py-1 text-[10px] font-semibold text-[#6557b5]">Minh họa</span></div>
          <div className="px-4 py-3"><div className="flex items-center justify-between"><div><strong className="block text-xs text-[#263650]">Bubble Sort</strong><span className="text-[10px] text-[#78879b]">Sắp xếp nổi bọt</span></div><span className="font-mono text-[10px] text-[#78879b]">{step + 1} / 6</span></div>
            <div data-sort-values={sortFrames[step].values.join(',')} className="relative mx-auto mt-2 h-24 max-w-[220px] border-b border-[#dce4ee]">{[1, 2, 3].map(value => <div key={value} className={`absolute bottom-0 flex w-[22%] items-start justify-center rounded-t-lg pt-1 font-mono text-xs font-bold transition-all duration-700 motion-reduce:transition-none ${sortFrames[step].active.includes(value) ? 'bg-[#8774c9] text-white' : 'bg-[#dce9f4] text-[#526779]'}`} style={{ height: `${28 + value * 20}%`, left: `${7 + sortFrames[step].values.indexOf(value) * 32}%` }}>{value}</div>)}</div>
            <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-[#63748a]"><span>{sortFrames[step].text}</span><span className="font-mono text-[#8b7bbd]">▶　━━●━━</span></div>
          </div>
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#176B87]/10 bg-white shadow-lg">
          <div className="flex items-center gap-1.5 border-b border-[#176B87]/10 px-3 py-2.5"><span className="h-2 w-2 rounded-full bg-[#e6a49b]"/><span className="h-2 w-2 rounded-full bg-[#edce91]"/><span className="h-2 w-2 rounded-full bg-[#a2cfb5]"/><span className="ml-2 rounded-full bg-[#f1f6f7] px-3 py-0.5 text-[10px] text-[#526779]">ninh.dev / {['hero', 'projects', 'experience'][section]}</span></div>
          <div className="relative min-h-36 overflow-hidden bg-gradient-to-br from-[#e8f4f7] to-[#f3ecfa] p-4"><div className="flex items-center justify-between text-[9px] font-bold text-[#176B87]"><span>NINH.</span><span className="font-normal text-[#66808b]">ABOUT　 PROJECTS　 CONTACT</span></div>{section === 0 ? <div className="mt-4 flex items-center justify-between"><div><span className="text-[9px] text-[#66808b]">XIN CHÀO, MÌNH LÀ</span><strong className="block font-serif text-lg">Nguyễn Văn Ninh</strong><span className="text-[10px] text-[#526779]">Frontend · AI Applications</span><div className="mt-2 w-fit rounded-full bg-[#176B87] px-3 py-1 text-[9px] text-white">Khám phá dự án →</div></div><div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/80 text-[#176B87] shadow-sm"><Code2 size={25}/></div></div> : section === 1 ? <div className="mt-4"><strong className="font-serif text-base">Dự án tiêu biểu</strong><div className="mt-2 grid grid-cols-3 gap-2">{['Chess', 'TechViz', 'SmartParking'].map((name, i) => <div key={name} className="rounded-lg bg-white/90 p-2 shadow-sm"><div className={`mb-2 h-7 rounded ${['bg-[#d7c8ea]', 'bg-[#a6dcd6]', 'bg-[#b8d4e4]'][i]}`}/><span className="text-[9px] font-semibold">{name}</span></div>)}</div></div> : <div className="mt-4"><strong className="font-serif text-base">Hành trình chuyên môn</strong><div className="mt-2 space-y-2">{['Xây dựng sản phẩm', 'Học hỏi & phát triển'].map((name) => <div key={name} className="flex items-center gap-2 rounded-lg bg-white/85 p-2 text-[10px]"><span className="grid h-6 w-6 place-items-center rounded-md bg-[#d8edef] text-[#176B87]"><Check size={13}/></span>{name}</div>)}</div></div>}</div>
          <div className="flex justify-center gap-2 p-2">{['Hero', 'Projects', 'Experience'].map((name, i) => <span key={name} className={`rounded-full px-2 py-1 text-[10px] transition-colors duration-500 ${section === i ? 'bg-[#176B87] text-white' : 'bg-[#edf5f7] text-[#526779]'}`}>{name}</span>)}</div>
        </div>
      )}
    </div>
  );
}
