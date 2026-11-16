import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

export default function TopAthleticTape() {
  return (
    <div className="bg-[#050811] text-[#00f0ff] py-2 px-4 text-xs font-mono border-b border-[#1a233a]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#00f0ff] fill-[#00f0ff]" />
          <span className="font-bold">PRO-TOUR WIND-TUNNEL VALIDATED (45 KM/H) • SAVES UP TO 14 WATTS PER CADENCE CYCLE</span>
        </div>
        <div className="text-white text-[11px] hidden sm:block">
          Includes 30-Day Free Crash Replacement Guarantee
        </div>
      </div>
    </div>
  );
}
