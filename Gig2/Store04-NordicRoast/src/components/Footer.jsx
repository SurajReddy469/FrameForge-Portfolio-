import React from 'react';
import { Coffee, Compass, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#231812] border-t border-[#3d2a1d] py-16 px-4 sm:px-6 lg:px-8 text-xs font-mono text-[#c9b79f]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-base mb-2">
            <Coffee className="w-5 h-5 text-[#ebdcc7]" />
            <span className="font-serif text-xl">Nordic Roast Co.</span>
          </div>
          <p className="text-[11px] text-[#a8957f] leading-relaxed">
            Independent craft roastery located at Thorvald Meyers gate 18, Grünerløkka, Oslo, Norway.
          </p>
        </div>

        <div>
          <h4 className="text-[#ebdcc7] font-bold uppercase mb-3 text-xs">Roast Schedule</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>Batch Roasting: Every Tuesday 06:00 CET</li>
            <li>Degassing Window: 5–7 Days</li>
            <li>Nitro-Flushed 250g Pouches</li>
            <li>SCA Certified Cupping Lab</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#ebdcc7] font-bold uppercase mb-3 text-xs">Origin Standards</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>100% Direct-Trade Verified</li>
            <li>Minimum 87.5 SCA Quality Score</li>
            <li>Transparent Farm-Gate Pricing</li>
            <li>Water-Efficient Washed Stations</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#ebdcc7] font-bold uppercase mb-3 text-xs">Oslo Espresso Bar</h4>
          <p className="text-[11px] text-[#a8957f] mb-2">
            Open daily for filter tastings and espresso flights.
          </p>
          <span className="text-[#ebdcc7]">CURRENT LOT: Colombia Pink Bourbon</span>
        </div>
      </div>

      <div className="pt-6 border-t border-[#36241a] flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#8c7462] gap-2">
        <span>© 2026 Nordic Roast Co. AS. Oslo, Norway.</span>
        <span>SCANDINAVIAN COFFEE E-COMMERCE PORTFOLIO DEMO</span>
      </div>
    </footer>
  );
}
