import React from 'react';

export default function TopPetBar() {
  return (
    <div className="bg-[#445341] text-[#fcfaf4] py-2 px-4 text-xs tracking-wider border-b border-[#364334]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d5e0d3]"></span>
          <span className="font-light">
            Free Carbon-Neutral Express Shipping & 100-Day Canine Adventure Trial
          </span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-[#cfd9ce]">
          <span className="hidden md:inline">100% Recycled & Ocean Plastics</span>
          <span>•</span>
          <a href="#sizing-guide" className="hover:text-white underline decoration-[#8ea28a]">
            Breed Sizing Calculator
          </a>
          <span>•</span>
          <span className="font-semibold text-white">Lifetime Hardware Warranty</span>
        </div>
      </div>
    </div>
  );
}
