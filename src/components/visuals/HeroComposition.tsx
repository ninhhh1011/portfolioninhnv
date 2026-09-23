"use client";

import React, { useState, useEffect } from "react";
import { Car, Navigation, Bot, CheckCircle2, Zap, Sparkles } from "lucide-react";
import { NinhDeskScene } from "./NinhDeskScene";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";
import { usePortfolioInteraction } from "@/context/PortfolioInteractionContext";
import { SpotlightSurface } from "@/components/ui/SpotlightSurface";

export interface HeroCompositionProps {
  isExploreHovered?: boolean;
  isContactHovered?: boolean;
}

export const HeroComposition: React.FC<HeroCompositionProps> = ({
  isExploreHovered = false,
  isContactHovered = false,
}) => {
  const prefersReduced = useReducedMotionSafe();
  const isDocVisible = useDocumentVisibility();
  const { setActiveProject } = usePortfolioInteraction();

  // 1. SMARTPARKING DETERMINISTIC SIMULATION STATE
  // Steps: 0 = Normal, 1 = Highlight A-02, 2 = A-02 Occupied & B-03 Reserved, 3 = Reset
  const [parkingSimStep, setParkingSimStep] = useState(0);

  useEffect(() => {
    if (prefersReduced || !isDocVisible) return;

    const interval = setInterval(() => {
      setParkingSimStep((prev) => (prev + 1) % 4);
    }, 2200);

    return () => clearInterval(interval);
  }, [prefersReduced, isDocVisible]);

  // 2. CHESS SIMULATION STATE
  // Steps:
  // 0: Initial position (Knight on f3)
  // 1: Source square highlight (f3) + Target square highlight (d4)
  // 2: Piece moved to d4, Eval shifts +1.4 -> +1.8, RAG highlights
  // 3: Settle & pause before reset
  const [chessStep, setChessStep] = useState(0);

  useEffect(() => {
    if (prefersReduced || !isDocVisible) return;

    const interval = setInterval(() => {
      setChessStep((prev) => (prev + 1) % 4);
    }, 2400);

    return () => clearInterval(interval);
  }, [prefersReduced, isDocVisible]);

  // 3. GREEN SM ROUTING SIMULATION
  // Steps:
  // 0: Pulse at Driver (GPS)
  // 1: Moving towards Station
  // 2: Arrived at Station (pulse)
  // 3: Moving to Destination
  // 4: Arrived at Destination & reset
  const [routeStep, setRouteStep] = useState(0);

  useEffect(() => {
    if (prefersReduced || !isDocVisible) return;

    const interval = setInterval(() => {
      setRouteStep((prev) => (prev + 1) % 5);
    }, 1500);

    return () => clearInterval(interval);
  }, [prefersReduced, isDocVisible]);

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12 md:mt-16 select-none">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-80 bg-gradient-to-r from-[#D7EAF0]/60 via-[#A9D8F2]/30 to-[#EEE7FA]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero visual grid: Desk Scene (Left/Center) + 3 Live Simulations (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left/Center: Ninh's Desk Living Motion Scene (7 cols on lg) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <NinhDeskScene
            isExploreHovered={isExploreHovered}
            isContactHovered={isContactHovered}
          />
        </div>

        {/* Right: 3 Living Product Simulations (6 cols on lg) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Card 1: SmartParking Live Simulation */}
          <SpotlightSurface
            variant="sky"
            className="float-card-1 bg-white/95 backdrop-blur-md rounded-3xl p-4 md:p-5 border border-[rgba(66,126,138,0.18)] shadow-[0_12px_36px_rgba(24,59,78,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#176B87]"
            tabIndex={0}
            onMouseEnter={() => setActiveProject("smart-parking")}
            onMouseLeave={() => setActiveProject("none")}
            onFocus={() => setActiveProject("smart-parking")}
            onBlur={() => setActiveProject("none")}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(66,126,138,0.1)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#D7EAF0] flex items-center justify-center text-[#176B87]">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm md:text-base font-bold text-[#183B4E]">
                    SmartParking · Sơ đồ bãi đỗ
                  </h4>
                  <p className="text-[11px] text-[#526779]">VinUni · Luồng đặt chỗ cư dân</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#176B87] font-medium bg-[#D7EAF0]/70 px-2 py-0.5 rounded-full border border-[rgba(23,107,135,0.15)]">
                  Minh họa luồng
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#22543D] bg-[#DDF3E8] px-2.5 py-0.5 rounded-full">
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-[#38A169] ${
                      parkingSimStep === 1 || parkingSimStep === 2
                        ? "animate-ping"
                        : "animate-pulse"
                    }`}
                  />
                  {parkingSimStep >= 2 ? "7 ô trống" : "8 ô trống"}
                </span>
              </div>
            </div>

            {/* Parking slots diagram with deterministic state transitions */}
            <div className="mt-3.5 grid grid-cols-4 gap-2">
              {[
                { id: "A-01", status: "occupied", label: "Đã đỗ" },
                {
                  id: "A-02",
                  status:
                    parkingSimStep === 0
                      ? "free"
                      : parkingSimStep === 1
                      ? "transition"
                      : "occupied",
                  label:
                    parkingSimStep === 0
                      ? "Trống"
                      : parkingSimStep === 1
                      ? "Đang vào..."
                      : "Đang đỗ",
                },
                { id: "A-03", status: "free", label: "Trống" },
                { id: "A-04", status: "reserved", label: "Đã giữ" },
                { id: "B-01", status: "free", label: "Trống" },
                { id: "B-02", status: "occupied", label: "Đã đỗ" },
                {
                  id: "B-03",
                  status: parkingSimStep >= 2 ? "reserved" : "free",
                  label: parkingSimStep >= 2 ? "Đã giữ" : "Trống",
                },
                { id: "B-04", status: "free", label: "Trống" },
              ].map((slot) => {
                const isTransition = slot.status === "transition";
                const isFree = slot.status === "free";
                const isReserved = slot.status === "reserved";

                return (
                  <div
                    key={slot.id}
                    className={`p-2 rounded-xl text-center border text-[11px] transition-all duration-500 relative ${
                      isTransition
                        ? "bg-[#A9D8F2]/60 border-[#176B87] text-[#176B87] font-bold shadow-xs scale-105"
                        : isFree
                        ? "bg-[#D7EAF0]/40 border-[#A9D8F2] text-[#176B87] font-semibold hover:bg-[#D7EAF0]"
                        : isReserved
                        ? "bg-[#FFE6D6] border-[#FBD38D] text-[#9C4221]"
                        : "bg-[#F3F1EE] border-gray-200 text-[#526779] opacity-60"
                    }`}
                  >
                    <span className="block font-mono text-[10px]">{slot.id}</span>
                    <span className="text-[9px]">{slot.label}</span>
                    {isTransition && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#176B87] animate-ping" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-2.5 border-t border-[rgba(66,126,138,0.08)] flex items-center justify-between text-[11px] text-[#526779]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#176B87]" />
                Cập nhật trạng thái slot tự động
              </span>
              <span className="font-mono text-[10px] text-[#176B87] bg-[#D7EAF0]/60 px-2 py-0.5 rounded">
                Slot Sync: Active
              </span>
            </div>
          </SpotlightSurface>

          {/* Card 2: Chess Web App (AI Coach & Engine Eval Simulation) */}
          <SpotlightSurface
            variant="lavender"
            className="float-card-2 bg-white/95 backdrop-blur-md rounded-3xl p-4 md:p-5 border border-[rgba(66,126,138,0.18)] shadow-[0_12px_36px_rgba(24,59,78,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#553C9A]"
            tabIndex={0}
            onMouseEnter={() => setActiveProject("chess")}
            onMouseLeave={() => setActiveProject("none")}
            onFocus={() => setActiveProject("chess")}
            onBlur={() => setActiveProject("none")}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(66,126,138,0.1)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#EEE7FA] flex items-center justify-center text-[#553C9A]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#183B4E]">Chess AI Coach</h4>
                  <p className="text-[10px] text-[#526779]">Stockfish Engine + Trợ lý RAG</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-[#553C9A] bg-[#EEE7FA] px-2 py-0.5 rounded-full transition-all duration-500">
                  {chessStep >= 2 ? "Engine Eval: +1.8" : "Engine Eval: +1.4"}
                </span>
              </div>
            </div>

            {/* Mini chessboard preview with deterministic piece movement */}
            <div className="mt-3 flex items-center gap-3">
              <div className="grid grid-cols-4 grid-rows-4 w-24 h-24 rounded-lg overflow-hidden border border-[#D6BCFA]/50 shrink-0 relative bg-white">
                {[
                  "♜", "♞", "♝", "♛",
                  "♟", "♟", "♟", "♟",
                  "", "", chessStep < 2 ? "♘" : "", "",
                  "♙", chessStep >= 2 ? "♘" : "♙", "♙", "♔",
                ].map((piece, i) => {
                  const isDark = (Math.floor(i / 4) + (i % 4)) % 2 === 1;
                  const isSourceSquare = i === 10 && chessStep === 1;
                  const isTargetSquare = i === 13 && (chessStep === 1 || chessStep === 2);

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                        isSourceSquare
                          ? "bg-[#FBD38D] text-[#744210] ring-1 ring-[#D69E2E] animate-pulse"
                          : isTargetSquare
                          ? "bg-[#C6F6D5] text-[#22543D] ring-1 ring-[#38A169]"
                          : isDark
                          ? "bg-[#D6BCFA]/40 text-[#44337A]"
                          : "bg-[#FCF9F7] text-[#183B4E]"
                      }`}
                    >
                      {piece}
                    </div>
                  );
                })}
              </div>

              <div className="flex-1 space-y-1.5 text-[11px]">
                <div
                  className={`p-2 rounded-xl border transition-all duration-500 ${
                    chessStep >= 2
                      ? "bg-[#EEE7FA]/80 border-[#D6BCFA] shadow-xs"
                      : "bg-[#FCF9F7] border-[rgba(66,126,138,0.1)]"
                  }`}
                >
                  <div className="flex items-center gap-1 font-semibold text-[#183B4E]">
                    <Sparkles className="w-3 h-3 text-[#553C9A]" />
                    <span>Nước đi đề xuất:</span>
                  </div>
                  <span className="text-[#526779] text-[10px] block mt-0.5">
                    {chessStep >= 2
                      ? "14. Nf3 → d4 (Đã thực hiện — chiếm trung tâm)"
                      : "14. Nf3 → d4 (Chuẩn bị chiếm trung tâm)"}
                  </span>
                </div>
                <div className="flex gap-1.5 text-[10px] text-[#526779]">
                  <span className="bg-[#EEE7FA] text-[#553C9A] px-2 py-0.5 rounded-full font-medium">
                    Stockfish WASM
                  </span>
                  <span className="bg-[#DDF3E8] text-[#22543D] px-2 py-0.5 rounded-full font-medium">
                    RAG Assistant
                  </span>
                </div>
              </div>
            </div>
          </SpotlightSurface>

          {/* Card 3: Green SM Routing Schematic Simulation */}
          <SpotlightSurface
            variant="teal"
            className="float-card-3 bg-white/95 backdrop-blur-md rounded-3xl p-4 md:p-5 border border-[rgba(66,126,138,0.18)] shadow-[0_12px_36px_rgba(24,59,78,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22543D]"
            tabIndex={0}
            onMouseEnter={() => setActiveProject("green-sm")}
            onMouseLeave={() => setActiveProject("none")}
            onFocus={() => setActiveProject("green-sm")}
            onBlur={() => setActiveProject("none")}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(66,126,138,0.1)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#DDF3E8] flex items-center justify-center text-[#22543D]">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#183B4E]">
                    Green SM · Định tuyến trạm sạc
                  </h4>
                  <p className="text-[10px] text-[#526779]">Minh họa hệ thống thực tập VinSmartFuture</p>
                </div>
              </div>
              <span className="text-[10px] font-medium text-[#22543D] bg-[#DDF3E8] px-2 py-0.5 rounded-full">
                OSRM + PostGIS
              </span>
            </div>

            {/* Traveling Route Schematic */}
            <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-[#FCF9F7] border border-[rgba(66,126,138,0.1)] text-[11px]">
              <div
                className={`flex items-center gap-2 transition-all duration-300 ${
                  routeStep === 0 ? "scale-105" : ""
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    routeStep === 0
                      ? "bg-[#176B87] text-white shadow-xs"
                      : "bg-[#D7EAF0] text-[#176B87]"
                  }`}
                >
                  GPS
                </span>
                <div>
                  <span className="font-semibold block text-[11px]">Tài xế</span>
                  <span className="text-[10px] text-[#526779]">Hà Nội</span>
                </div>
              </div>

              {/* Progress Line with Animated Traveling Dot */}
              <div className="flex-1 mx-3 flex flex-col items-center">
                <span className="text-[9px] font-medium text-[#176B87] flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5" /> +2.4km detour
                </span>
                <div className="w-full h-1 bg-[#D7EAF0] rounded-full relative mt-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#176B87] via-[#48BB78] to-[#176B87] transition-all duration-700 ease-out"
                    style={{
                      width:
                        routeStep === 0
                          ? "15%"
                          : routeStep === 1
                          ? "50%"
                          : routeStep === 2
                          ? "50%"
                          : routeStep === 3
                          ? "90%"
                          : "100%",
                    }}
                  />
                  <div
                    className="absolute top-0 w-2 h-full bg-white rounded-full shadow-xs transition-all duration-700"
                    style={{
                      left:
                        routeStep === 0
                          ? "15%"
                          : routeStep === 1
                          ? "50%"
                          : routeStep === 2
                          ? "50%"
                          : routeStep === 3
                          ? "90%"
                          : "100%",
                      transform: "translateX(-50%)",
                    }}
                  />
                </div>
                <span className="text-[9px] text-[#526779] mt-0.5">
                  {routeStep === 2 ? "Đang dừng sạc: 3 phút" : "ETA: 6 phút"}
                </span>
              </div>

              <div
                className={`flex items-center gap-2 transition-all duration-300 ${
                  routeStep === 4 ? "scale-105" : ""
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    routeStep === 4
                      ? "bg-[#38A169] text-white shadow-xs"
                      : "bg-[#DDF3E8] text-[#22543D]"
                  }`}
                >
                  Trạm
                </span>
                <div>
                  <span className="font-semibold block text-[11px]">Điểm đến</span>
                  <span className="text-[10px] text-[#22543D]">
                    {routeStep >= 3 ? "Hoàn tất" : "Sẵn sàng"}
                  </span>
                </div>
              </div>
            </div>
          </SpotlightSurface>
        </div>
      </div>
    </div>
  );
};
