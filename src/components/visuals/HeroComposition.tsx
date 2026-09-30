"use client";

import React, { useState, useEffect } from "react";
import { Car, Navigation, Bot, CheckCircle2, Zap, Sparkles, MapPin, BatteryCharging } from "lucide-react";
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
  // 4.5s cycle: 0 = Normal, 1 = A-02 Entering (Blinking), 2 = A-02 Parked, 3 = B-03 Reserved
  const [parkingSimStep, setParkingSimStep] = useState(0);

  useEffect(() => {
    if (prefersReduced || !isDocVisible) return;

    const interval = setInterval(() => {
      setParkingSimStep((prev) => (prev + 1) % 4);
    }, 4500);

    return () => clearInterval(interval);
  }, [prefersReduced, isDocVisible]);

  // 2. CHESS SIMULATION STATE (5s cycle)
  // 0: Initial position (Knight on f3, Eval +1.4)
  // 1: Move suggested (f3 source glow + d4 target glow)
  // 2: Knight moves to d4, Eval shifts to +1.8
  // 3: Settle before loop reset
  const [chessStep, setChessStep] = useState(0);

  useEffect(() => {
    if (prefersReduced || !isDocVisible) return;

    const interval = setInterval(() => {
      setChessStep((prev) => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(interval);
  }, [prefersReduced, isDocVisible]);

  // 3. GREEN SM ROUTING SIMULATION
  // Cycle:
  // 0: GPS ping at Driver
  // 1: Signal traveling towards Charging Station
  // 2: Signal arrives at Charging Station (Map Matching & ETA check)
  // 3: Signal traveling towards Destination
  // 4: Destination reached & complete
  const [routeStep, setRouteStep] = useState(0);

  useEffect(() => {
    if (prefersReduced || !isDocVisible) return;

    const interval = setInterval(() => {
      setRouteStep((prev) => (prev + 1) % 5);
    }, 2000);

    return () => clearInterval(interval);
  }, [prefersReduced, isDocVisible]);

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8 md:mt-12 select-none">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-80 bg-gradient-to-r from-[#D7EAF0]/60 via-[#A9D8F2]/30 to-[#EEE7FA]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero visual grid: Desk Scene (Left/Center) + 3 Live Simulations (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left/Center: Ninh's Desk Living Motion Scene (6 cols on lg) */}
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
                  <p className="text-[11px] text-[#526779]">VinUni · Luồng đồng bộ trạng thái ô đỗ</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#176B87] font-medium bg-[#D7EAF0]/70 px-2 py-0.5 rounded-full border border-[rgba(23,107,135,0.15)]">
                  Mô phỏng 4.5s
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#22543D] bg-[#DDF3E8] px-2.5 py-0.5 rounded-full transition-colors duration-500">
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-[#38A169] ${
                      parkingSimStep === 1 ? "animate-ping" : "animate-pulse"
                    }`}
                  />
                  {parkingSimStep === 0
                    ? "8 ô trống"
                    : parkingSimStep === 1
                    ? "7 ô trống"
                    : parkingSimStep === 2
                    ? "7 ô trống"
                    : "6 ô trống"}
                </span>
              </div>
            </div>

            {/* Parking slots diagram with gentle color and status transitions */}
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
                      : "Đã đỗ",
                },
                { id: "A-03", status: "free", label: "Trống" },
                { id: "A-04", status: "reserved", label: "Đã giữ" },
                { id: "B-01", status: "free", label: "Trống" },
                { id: "B-02", status: "occupied", label: "Đã đỗ" },
                {
                  id: "B-03",
                  status: parkingSimStep >= 3 ? "reserved" : "free",
                  label: parkingSimStep >= 3 ? "Đã giữ" : "Trống",
                },
                { id: "B-04", status: "free", label: "Trống" },
              ].map((slot) => {
                const isTransition = slot.status === "transition";
                const isFree = slot.status === "free";
                const isReserved = slot.status === "reserved";

                return (
                  <div
                    key={slot.id}
                    className={`p-2 rounded-xl text-center border text-[11px] transition-all duration-700 ease-in-out relative ${
                      isTransition
                        ? "bg-[#FEF08A]/60 border-[#F59E0B] text-[#B45309] font-bold shadow-xs scale-105"
                        : isFree
                        ? "bg-[#D7EAF0]/40 border-[#A9D8F2] text-[#176B87] font-semibold hover:bg-[#D7EAF0]"
                        : isReserved
                        ? "bg-[#FFE6D6] border-[#FBD38D] text-[#9C4221]"
                        : "bg-[#F3F1EE] border-gray-200 text-[#526779] opacity-70"
                    }`}
                  >
                    <span className="block font-mono text-[10px]">{slot.id}</span>
                    <span className="text-[9px] transition-opacity duration-300">{slot.label}</span>
                    {isTransition && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom active status bar with Live Radar Ping */}
            <div className="mt-3 pt-2.5 border-t border-[rgba(66,126,138,0.08)] flex items-center justify-between text-[11px] text-[#526779]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#176B87]" />
                Đồng bộ ô đỗ tự động (REST + Polling)
              </span>
              <span className="font-mono text-[10px] text-[#176B87] bg-[#D7EAF0]/60 px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-[rgba(23,107,135,0.18)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                <span>Slot Sync: Active</span>
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
                  <p className="text-[10px] text-[#526779]">Stockfish Engine + Gợi ý nước đi tự động</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-[#553C9A] bg-[#EEE7FA] px-2.5 py-0.5 rounded-full transition-all duration-500 border border-[#D6BCFA]/40">
                  {chessStep >= 2 ? "Engine Eval: +1.8" : "Engine Eval: +1.4"}
                </span>
              </div>
            </div>

            {/* Mini chessboard preview with deterministic piece movement & light streak */}
            <div className="mt-3 flex items-center gap-3">
              <div className="grid grid-cols-4 grid-rows-4 w-24 h-24 rounded-lg overflow-hidden border border-[#D6BCFA]/60 shrink-0 relative bg-white shadow-2xs">
                {[
                  "♜", "♞", "♝", "♛",
                  "♟", "♟", "♟", "♟",
                  "", "", chessStep < 2 ? "♘" : "", "",
                  "♙", chessStep >= 2 ? "♘" : "♙", "♙", "♔",
                ].map((piece, i) => {
                  const isDark = (Math.floor(i / 4) + (i % 4)) % 2 === 1;
                  const isSourceSquare = i === 10;
                  const isTargetSquare = i === 13;

                  let squareBg = isDark ? "bg-[#D6BCFA]/30 text-[#44337A]" : "bg-[#FCF9F7] text-[#183B4E]";

                  if (chessStep === 1) {
                    if (isSourceSquare) squareBg = "bg-[#FEF08A] text-[#B45309] ring-2 ring-[#F59E0B] z-10 animate-pulse";
                    if (isTargetSquare) squareBg = "bg-[#BBF7D0] text-[#15803D] ring-2 ring-[#22C55E] z-10 animate-pulse";
                  } else if (chessStep >= 2) {
                    if (isTargetSquare) squareBg = "bg-[#DDF3E8] text-[#15803D] font-bold ring-1 ring-[#38A169]";
                  }

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-center text-xs font-semibold transition-all duration-500 relative ${squareBg}`}
                    >
                      <span className="transition-transform duration-500 ease-out">{piece}</span>
                    </div>
                  );
                })}

                {/* Light Streak / Motion Path from f3 to d4 */}
                {chessStep === 1 && (
                  <div
                    className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B] animate-ping" />
                  </div>
                )}
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
                    <span>Nước cờ tự động:</span>
                  </div>
                  <span className="text-[#526779] text-[10px] block mt-0.5">
                    {chessStep >= 2
                      ? "14. Nf3 → d4 (Đã thực hiện — chiếm trung tâm, Eval +1.8)"
                      : "14. Nf3 → d4 (Đang phân tích — gợi ý nước đi tối ưu)"}
                  </span>
                </div>
                <div className="flex gap-1.5 text-[10px] text-[#526779]">
                  <span className="bg-[#EEE7FA] text-[#553C9A] px-2 py-0.5 rounded-full font-medium">
                    Stockfish WASM
                  </span>
                  <span className="bg-[#DDF3E8] text-[#22543D] px-2 py-0.5 rounded-full font-medium">
                    Depth: 18 ply
                  </span>
                </div>
              </div>
            </div>
          </SpotlightSurface>

          {/* Card 3: Green SM Routing Schematic Simulation (3-Node Signal Pulse) */}
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
                  <p className="text-[10px] text-[#526779]">Luồng phát xung điện OSRM & Map Matching</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-medium text-[#22543D] bg-[#DDF3E8] px-2 py-0.5 rounded-full border border-[rgba(34,84,61,0.15)]">
                OSRM + PostGIS
              </span>
            </div>

            {/* Traveling Route Schematic: 3 Connected Nodes */}
            <div className="mt-3 p-2.5 rounded-xl bg-[#FCF9F7] border border-[rgba(66,126,138,0.1)] text-[11px]">
              <div className="flex items-center justify-between relative">
                {/* Node 1: Tài xế (Driver GPS) */}
                <div className="flex flex-col items-center gap-1 z-10">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 relative ${
                      routeStep === 0
                        ? "bg-[#176B87] text-white shadow-[0_0_12px_rgba(23,107,135,0.4)] scale-110"
                        : "bg-[#D7EAF0] text-[#176B87]"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {routeStep === 0 && (
                      <span className="absolute inset-0 rounded-full bg-[#176B87] animate-ping opacity-60" />
                    )}
                  </div>
                  <span className="text-[10px] font-semibold text-[#183B4E]">Tài xế</span>
                </div>

                {/* Connecting Track 1: Driver -> Station */}
                <div className="flex-1 mx-2 relative h-1.5 bg-[#D7EAF0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#176B87] to-[#10B981] transition-all duration-700 ease-out"
                    style={{
                      width: routeStep === 0 ? "20%" : routeStep >= 1 ? "100%" : "0%",
                    }}
                  />
                  {/* Glowing Signal Pulse Dot */}
                  {(routeStep === 1 || routeStep === 0) && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] transition-all duration-700"
                      style={{
                        left: routeStep === 0 ? "20%" : "95%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )}
                </div>

                {/* Node 2: Trạm sạc (Charging Station Hub) */}
                <div className="flex flex-col items-center gap-1 z-10">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 relative ${
                      routeStep === 2
                        ? "bg-[#F59E0B] text-white shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-110"
                        : routeStep > 2
                        ? "bg-[#DDF3E8] text-[#22543D]"
                        : "bg-[#F3F1EE] text-[#526779]"
                    }`}
                  >
                    <BatteryCharging className="w-3.5 h-3.5" />
                    {routeStep === 2 && (
                      <span className="absolute inset-0 rounded-full bg-[#F59E0B] animate-ping opacity-60" />
                    )}
                  </div>
                  <span className="text-[10px] font-semibold text-[#183B4E]">Trạm sạc</span>
                </div>

                {/* Connecting Track 2: Station -> Destination */}
                <div className="flex-1 mx-2 relative h-1.5 bg-[#D7EAF0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F59E0B] to-[#38A169] transition-all duration-700 ease-out"
                    style={{
                      width: routeStep <= 2 ? "0%" : routeStep === 3 ? "60%" : "100%",
                    }}
                  />
                  {/* Glowing Signal Pulse Dot */}
                  {(routeStep === 3 || routeStep === 4) && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#38A169] shadow-[0_0_8px_#38A169] transition-all duration-700"
                      style={{
                        left: routeStep === 3 ? "60%" : "95%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )}
                </div>

                {/* Node 3: Điểm đến (Destination) */}
                <div className="flex flex-col items-center gap-1 z-10">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 relative ${
                      routeStep === 4
                        ? "bg-[#38A169] text-white shadow-[0_0_12px_rgba(56,161,105,0.5)] scale-110"
                        : "bg-[#F3F1EE] text-[#526779]"
                    }`}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    {routeStep === 4 && (
                      <span className="absolute inset-0 rounded-full bg-[#38A169] animate-ping opacity-60" />
                    )}
                  </div>
                  <span className="text-[10px] font-semibold text-[#183B4E]">Điểm đến</span>
                </div>
              </div>

              {/* Status info bar */}
              <div className="mt-2.5 pt-2 border-t border-[rgba(66,126,138,0.08)] flex items-center justify-between text-[10px] text-[#526779]">
                <span className="flex items-center gap-1 text-[#176B87] font-medium">
                  <Zap className="w-3 h-3 text-[#F59E0B]" />
                  {routeStep === 2
                    ? "Đang khớp trạm: Station #062 (+2.4km detour)"
                    : routeStep === 4
                    ? "Đã hoàn tất hành trình tối ưu"
                    : "OSRM map matching: Đang tính ETA & Pin"}
                </span>
                <span className="font-mono text-[#183B4E] bg-[#D7EAF0]/50 px-2 py-0.5 rounded">
                  {routeStep === 2 ? "Dừng sạc 3p" : routeStep === 4 ? "Hoàn tất" : "ETA: 6 phút"}
                </span>
              </div>
            </div>
          </SpotlightSurface>
        </div>
      </div>
    </div>
  );
};
