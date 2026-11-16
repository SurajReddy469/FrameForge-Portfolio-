import React from 'react';

export default function TopArchitecturalBar() {
  return (
    <div className="bg-[#24211d] text-[#e8e4dc] py-2 px-4 text-xs tracking-wider border-b border-[#3e3933]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
          <span className="font-light">White-Glove In-Home Assembly Included on Orders Over $2,000 USD</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-[#b3ada4]">
          <span className="hidden md:inline">FSC® Certified Solid Hardwoods</span>
          <span>•</span>
          <a href="#materials" className="hover:text-white transition-colors underline decoration-[#6e685f]">
            Material Provenance
          </a>
          <span>•</span>
          <span className="font-medium text-[#e8e4dc]">Milan Studio: +39 02 8940 331</span>
        </div>
      </div>
    </div>
  );
}
