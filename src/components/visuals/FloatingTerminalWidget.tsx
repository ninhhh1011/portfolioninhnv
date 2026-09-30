"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Circle, Play, Pause } from "lucide-react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";

const LOG_ENTRIES = [
  { prefix: "$", text: "uvicorn main:app --host 0.0.0.0 --port 8000 --reload", type: "cmd" },
  { prefix: "INFO", text: "Uvicorn running on http://127.0.0.1:8000 (PID: 1042)", type: "info" },
  { prefix: "GET", text: "/api/v1/stations/recommend?lat=21.0285&lon=105.8542 200 OK", type: "req" },
  { prefix: "OSRM", text: "calculate_route(driver, station_062, dest) -> +2.4km detour", type: "sys" },
  { prefix: "POSTGIS", text: "ST_DWithin(stations.geom, driver.geom, 3500) -> 14 matches", type: "sys" },
  { prefix: "TEST", text: "pytest tests/test_spatial_routing.py::test_osrm PASSED [100%]", type: "ok" },
  { prefix: "CHESS", text: "Stockfish.eval(14.Nf3->d4) -> depth: 18 | eval: +1.40", type: "ai" },
  { prefix: "CIRCUIT", text: "CircuitBreaker(state=CLOSED, error_rate=0.00%)", type: "ok" },
  { prefix: "SYNC", text: "Redis.setex('driver:gps:live', 60, ok) -> latency: 1.2ms", type: "sys" },
  { prefix: "READY", text: "system healthy · all background microservices operational", type: "ok" },
];

export const FloatingTerminalWidget: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const prefersReduced = useReducedMotionSafe();
  const isDocVisible = useDocumentVisibility();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (prefersReduced || !isDocVisible || isPaused) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= LOG_ENTRIES.length) {
          // Restart loop after short pause
          return 3;
        }
        return prev + 1;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [prefersReduced, isDocVisible, isPaused]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    }
  }, [visibleCount, prefersReduced]);

  const displayedLogs = LOG_ENTRIES.slice(0, visibleCount);

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto rounded-2xl bg-white/85 backdrop-blur-md border border-[rgba(66,126,138,0.22)] shadow-[0_12px_36px_rgba(24,59,78,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_16px_44px_rgba(24,59,78,0.12)] hover:border-[rgba(66,126,138,0.35)] ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Cửa sổ dòng lệnh Terminal giám sát Backend & AI"
    >
      {/* macOS / Linux Window Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-[#F3F1EE]/90 via-[#FCF9F7]/90 to-[#F3F1EE]/90 border-b border-[rgba(66,126,138,0.14)] select-none">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/85 border border-[#DC2626]/40 hover:opacity-100 transition-opacity" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/85 border border-[#D97706]/40 hover:opacity-100 transition-opacity" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/85 border border-[#059669]/40 hover:opacity-100 transition-opacity" />
        </div>

        {/* Terminal Title */}
        <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-[#183B4E]">
          <Terminal className="w-3.5 h-3.5 text-[#176B87]" />
          <span>ninh@backend-engine: ~/stream.log</span>
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#176B87] bg-[#D7EAF0]/70 px-2 py-0.5 rounded-full border border-[rgba(23,107,135,0.18)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>200 OK</span>
          </span>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? "Tiếp tục chạy log" : "Tạm dừng log"}
            className="text-[#526779] hover:text-[#183B4E] transition-colors p-0.5"
            title={isPaused ? "Bấm để tiếp tục cuộn" : "Bấm để tạm dừng"}
          >
            {isPaused ? <Play className="w-3 h-3 text-[#176B87]" /> : <Pause className="w-3 h-3 opacity-60" />}
          </button>
        </div>
      </div>

      {/* Terminal Code Scroll View */}
      <div
        ref={scrollRef}
        className="p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs leading-relaxed max-h-40 sm:max-h-44 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-[rgba(23,107,135,0.2)]"
      >
        {displayedLogs.map((log, index) => {
          let badgeStyle = "text-[#526779] bg-gray-100";
          if (log.type === "cmd") badgeStyle = "text-[#176B87] font-bold";
          if (log.type === "info") badgeStyle = "text-sky-600 font-semibold";
          if (log.type === "req") badgeStyle = "text-emerald-700 bg-emerald-50 px-1 rounded";
          if (log.type === "ok") badgeStyle = "text-green-700 bg-green-50 px-1 rounded font-semibold";
          if (log.type === "ai") badgeStyle = "text-purple-700 bg-purple-50 px-1 rounded";
          if (log.type === "sys") badgeStyle = "text-cyan-700";

          return (
            <div
              key={index}
              className="flex items-start gap-2 animate-[heroFadeUp_0.3s_ease-out] text-[#183B4E]"
            >
              <span className="text-[#526779]/50 select-none text-[10px] w-6 shrink-0 text-right">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={`shrink-0 text-[10px] font-semibold ${badgeStyle}`}>
                [{log.prefix}]
              </span>
              <span className="font-mono break-all text-[#183B4E]">
                {log.text}
              </span>
            </div>
          );
        })}

        {/* Active blinking prompt line */}
        <div className="flex items-center gap-2 pt-1 text-[#176B87]">
          <span className="text-[#526779]/50 select-none text-[10px] w-6 shrink-0 text-right">
            {String(displayedLogs.length + 1).padStart(2, "0")}
          </span>
          <span className="text-xs font-bold">$</span>
          <span className="w-2 h-4 bg-[#176B87] inline-block animate-[cursorBlink_1s_step-start_infinite]" />
        </div>
      </div>
    </div>
  );
};
