import React from 'react';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function TopHardwareBar() {
  return (
    <div className="bg-[#0b0d10] border-b border-[#20242c] py-2 px-4 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse"></span>
          <span className="text-white font-bold">GERMAN INDUSTRIAL KEYBOARDS • 8,000Hz REFRESH ENGINE</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>VIA / QMK Open-Source Programmable</span>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <span className="text-[#ff5722] hidden sm:inline">Zero Pre-Travel Latency</span>
        </div>
      </div>
    </div>
  );
}
