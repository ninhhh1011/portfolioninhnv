"use client";

import React, { useState, useEffect } from "react";
import { Bot, Sparkles, Activity } from "lucide-react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";

export const ChessIllustration: React.FC = () => {
  const prefersReduced = useReducedMotionSafe();
  const isDocVisible = useDocumentVisibility();

  // Chess loop steps:
  // 0: Initial state (Nf3 piece on f3)
  // 1: Highlight source square (f3) and target square (d4)
  // 2: Move piece to d4, evaluation bar shifts (+1.4 -> +1.8), RAG highlights
  // 3: Settle & pause before reset
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReduced || !isDocVisible) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2400);

    return () => clearInterval(interval);
  }, [prefersReduced, isDocVisible]);

  return (
    <div className="w-full bg-[#FCF9F7] rounded-2xl border border-[rgba(66,126,138,0.18)] p-5 md:p-6 select-none overflow-hidden transition-all duration-300 group-hover:border-[rgba(66,126,138,0.32)]">
      {/* Mock browser chrome */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[rgba(66,126,138,0.14)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]" />
          </div>
          <span className="text-[11px] font-mono text-[#526779] ml-2 bg-white px-2.5 py-0.5 rounded-full border border-[rgba(66,126,138,0.15)] shadow-2xs">
            chess-brown-two.vercel.app
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#553C9A] font-medium bg-[#EEE7FA] px-2.5 py-0.5 rounded-full border border-[#D6BCFA]/50">
            Minh họa luồng
          </span>
          <span className="text-[11px] text-[#553C9A] font-medium bg-[#EEE7FA] px-2.5 py-0.5 rounded-full hidden sm:inline-block">
            Stockfish WASM
          </span>
        </div>
      </div>

      {/* Main layout: Chessboard + RAG Assistant */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        {/* Chessboard 8x8 representation */}
        <div className="sm:col-span-6 flex justify-center">
          <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-xl overflow-hidden border-2 border-[#D6BCFA]/60 shadow-xs grid grid-cols-8 grid-rows-8 bg-white relative">
            {Array.from({ length: 64 }).map((_, i) => {
              const row = Math.floor(i / 8);
              const col = i % 8;
              const isDark = (row + col) % 2 === 1;

              // Source square: row 5, col 5 (f3, index 45)
              // Target square: row 4, col 3 (d4, index 35)
              const isSource = i === 45 && step === 1;
              const isTarget = i === 35 && (step === 1 || step === 2);

              // Pieces layout
              let piece = "";
              if (row === 0) {
                const backRank = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
                piece = backRank[col];
              } else if (row === 1) {
                piece = "♟";
              } else if (row === 6) {
                if (i === 51) piece = ""; // pawn on d2 moved
                else piece = "♙";
              } else if (row === 7) {
                const whiteRank = ["♖", "♘", "♗", "♕", "♔", "♗", "", "♖"];
                piece = whiteRank[col];
              } else if (i === 45) {
                // Knight at f3 before move
                piece = step < 2 ? "♘" : "";
              } else if (i === 35) {
                // Knight at d4 after move
                piece = step >= 2 ? "♘" : "";
              }

              return (
                <div
                  key={i}
                  className={`flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-300 ${
                    isSource
                      ? "bg-[#FBD38D] text-[#744210] ring-1 ring-[#D69E2E] animate-pulse"
                      : isTarget
                      ? "bg-[#C6F6D5] text-[#22543D] ring-1 ring-[#38A169]"
                      : isDark
                      ? "bg-[#EEE7FA] text-[#44337A]"
                      : "bg-[#FFFFFF] text-[#183B4E]"
                  }`}
                >
                  {piece}
                </div>
              );
            })}
          </div>
        </div>

        {/* Engine status & RAG coach panel */}
        <div className="sm:col-span-6 space-y-3">
          {/* Evaluation bar (Explicitly Engine Evaluation, NOT ELO) */}
          <div className="bg-white p-3 rounded-xl border border-[rgba(66,126,138,0.12)] shadow-2xs">
            <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
              <span className="text-[#183B4E] flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-[#553C9A]" />
                Đánh giá Engine (Stockfish)
              </span>
              <span className="font-mono text-[#553C9A] font-bold transition-all duration-500">
                {step >= 2 ? "+1.8 (Trắng chiếm ưu thế)" : "+1.4 (Trắng cân bằng tốt)"}
              </span>
            </div>
            <div className="w-full h-2 bg-[#EEE7FA] rounded-full overflow-hidden flex">
              <div
                className="bg-[#553C9A] h-full transition-all duration-700 ease-out"
                style={{ width: step >= 2 ? "68%" : "60%" }}
              />
              <div
                className="bg-[#183B4E]/30 h-full transition-all duration-700 ease-out"
                style={{ width: step >= 2 ? "32%" : "40%" }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-[#526779] mt-1 font-mono">
              <span>Độ sâu: 18 ply</span>
              <span>Chỉ số Engine Eval (không phải Elo)</span>
            </div>
          </div>

          {/* RAG Assistant bubble */}
          <div
            className={`p-3 rounded-xl border transition-all duration-500 text-xs ${
              step >= 2
                ? "bg-[#EEE7FA]/90 border-[#D6BCFA] shadow-xs"
                : "bg-[#EEE7FA]/50 border-[#D6BCFA]/40"
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-[#553C9A] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trợ lý RAG phân tích:</span>
            </div>
            <p className="text-[#183B4E] text-[11px] leading-relaxed">
              {step >= 2 ? (
                <>
                  &quot;Nước cờ <strong>Nf3 → d4</strong> đã chiếm giữ ô trung tâm trọng yếu,
                  tạo áp lực trực tiếp lên cấu trúc tốt cánh vua đối thủ.&quot;
                </>
              ) : (
                <>
                  &quot;Nước cờ đề xuất: <strong>14. Nf3 → d4</strong> nhằm mở rộng không gian,
                  chuẩn bị phối hợp với quân tượng c4.&quot;
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#526779]">
            <span className="flex items-center gap-1">
              <Bot className="w-3 h-3 text-[#553C9A]" />
              Stockfish WASM
            </span>
            <span>·</span>
            <span>Vector RAG Coach</span>
            <span>·</span>
            <span>Supabase History</span>
          </div>
        </div>
      </div>
    </div>
  );
};
