import React from 'react';
import { Calendar, ShieldCheck, Flame } from 'lucide-react';

export default function TopHarvestBar() {
  return (
    <div className="bg-[#231812] text-[#ebdcc7] py-2 px-4 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-[#ebdcc7]" />
          <span>ROASTED FRESH EVERY TUESDAY IN OSLO • DIRECT-TRADE EQUITABLE PRODUCER PAYMENTS</span>
        </div>
        <div className="text-[11px] text-[#c9b79f]">
          Free Worldwide Carbon-Neutral Shipping on All Coffee Subscriptions
        </div>
      </div>
    </div>
  );
}
