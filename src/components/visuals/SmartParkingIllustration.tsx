"use client";

import React, { useState, useEffect } from "react";
import { Car, Clock, ShieldCheck, UserCheck, RefreshCw, Building } from "lucide-react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useDocumentVisibility } from "@/hooks/useDocumentVisibility";

export const SmartParkingIllustration: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<"resident" | "guard" | "admin">("resident");
  const [simStep, setSimStep] = useState(0);
  const prefersReduced = useReducedMotionSafe();
  const isDocVisible = useDocumentVisibility();

  // Deterministic simulation loop
  useEffect(() => {
    if (prefersReduced || !isDocVisible) return;

    const interval = setInterval(() => {
      setSimStep((prev) => (prev + 1) % 4);
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
            smart-parking-coral.vercel.app
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#176B87] font-medium bg-[#D7EAF0]/80 px-2 py-0.5 rounded-full border border-[rgba(23,107,135,0.15)]">
            Minh họa luồng
          </span>
          <span className="text-[11px] text-[#176B87] font-medium bg-[#D7EAF0] px-2.5 py-0.5 rounded-full hidden sm:inline-block">
            next-intl (VI/EN)
          </span>
        </div>
      </div>

      {/* Interactive role selector tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedRole("resident")}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
            selectedRole === "resident"
              ? "bg-[#176B87] text-white shadow-xs"
              : "bg-white text-[#526779] border border-[rgba(66,126,138,0.18)] hover:text-[#183B4E]"
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Cư dân</span>
        </button>
        <button
          onClick={() => setSelectedRole("guard")}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${
            selectedRole === "guard"
              ? "bg-[#176B87] text-white shadow-xs"
              : "bg-white text-[#526779] border border-[rgba(66,126,138,0.18)] hover:text-[#183B4E]"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Bảo vệ</span>
        </button>
        <button
          onClick={() => setSelectedRole("admin")}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${
            selectedRole === "admin"
              ? "bg-[#176B87] text-white shadow-xs"
              : "bg-white text-[#526779] border border-[rgba(66,126,138,0.18)] hover:text-[#183B4E]"
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Ban quản lý</span>
        </button>
      </div>

      {/* Main card representation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Slot status panel */}
        <div className="sm:col-span-2 bg-white rounded-xl p-3.5 border border-[rgba(66,126,138,0.12)] shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-1 mb-3 text-xs">
            <span className="font-semibold text-[#183B4E]">
              {selectedRole === "resident"
                ? "Sơ đồ đỗ xe Khu B (Tầng 1)"
                : selectedRole === "guard"
                ? "Cổng kiểm soát quét biển số"
                : "Báo cáo công suất bãi đỗ"}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#176B87] font-medium shrink-0">
              <RefreshCw
                className={`w-3 h-3 ${simStep === 1 ? "animate-spin text-[#176B87]" : ""}`}
              />
              <span>Tự động cập nhật</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { slot: "B-01", status: "Trống", color: "bg-[#D7EAF0] text-[#176B87]" },
              {
                slot: "B-02",
                status: simStep === 1 ? "Đang vào..." : simStep >= 2 ? "Đang đỗ" : "Trống",
                color:
                  simStep === 1
                    ? "bg-[#A9D8F2] text-[#176B87] font-bold ring-2 ring-[#176B87]"
                    : simStep >= 2
                    ? "bg-[#F3F1EE] text-[#526779]"
                    : "bg-[#D7EAF0] text-[#176B87]",
              },
              {
                slot: "B-03",
                status: simStep >= 2 ? "Đã giữ" : "Trống",
                color:
                  simStep >= 2
                    ? "bg-[#FFE6D6] text-[#9C4221] ring-1 ring-[#FBD38D]"
                    : "bg-[#D7EAF0] text-[#176B87]",
              },
              { slot: "B-04", status: "Đã giữ", color: "bg-[#FFE6D6] text-[#9C4221]" },
              { slot: "B-05", status: "Trống", color: "bg-[#D7EAF0] text-[#176B87]" },
              { slot: "B-06", status: "Đang đỗ", color: "bg-[#F3F1EE] text-[#526779]" },
            ].map((item) => (
              <div
                key={item.slot}
                className={`p-2.5 rounded-lg border border-[rgba(66,126,138,0.1)] text-center transition-all duration-300 ${item.color}`}
              >
                <div className="font-mono text-xs font-bold">{item.slot}</div>
                <div className="text-[10px] mt-0.5">{item.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking summary / Role action panel */}
        <div className="bg-[#D7EAF0]/40 rounded-xl p-3.5 border border-[rgba(66,126,138,0.18)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#176B87] mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>
                {selectedRole === "resident"
                  ? "Phiên đặt chỗ cư dân"
                  : selectedRole === "guard"
                  ? "Nhận diện phương tiện"
                  : "Chỉ số khai thác"}
              </span>
            </div>
            <div className="text-xs text-[#183B4E] space-y-1 font-mono">
              <div className="text-[11px] text-[#526779]">
                {selectedRole === "resident"
                  ? "Vị trí: Ô B-03 (Tầng 1)"
                  : selectedRole === "guard"
                  ? "Biển số: 29A-888.88"
                  : "Tỷ lệ lấp đầy: 72%"}
              </div>
              <div className="text-[11px] text-[#526779]">
                {selectedRole === "resident"
                  ? "Thời lượng: 120 phút"
                  : selectedRole === "guard"
                  ? "Trạng thái: Cho phép qua"
                  : "Tổng vị trí: 120 ô"}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[rgba(66,126,138,0.15)] flex items-center justify-between text-[10px] text-[#176B87]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Xác nhận tức thì</span>
            </span>
            <span className="font-mono bg-white/70 px-1.5 py-0.5 rounded text-[9px]">
              Next.js 16
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
