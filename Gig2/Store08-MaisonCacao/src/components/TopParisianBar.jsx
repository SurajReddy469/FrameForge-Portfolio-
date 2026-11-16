import React from 'react';

export default function TopParisianBar() {
  return (
    <div className="bg-[#120a07] text-[#c5a059] py-2 px-4 text-xs tracking-wider border-b border-[#352115]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
          <span className="font-light text-[#ded4ca]">
            Expedited Climate-Controlled Cold-Pouch Shipping across North America & Europe
          </span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-[#aa9585]">
          <span className="hidden md:inline">Atelier Saint-Germain-des-Prés, Paris</span>
          <span>•</span>
          <a href="#custom-box" className="hover:text-[#c5a059] transition-colors underline decoration-[#5e4736]">
            Custom 16-Piece Box
          </a>
          <span>•</span>
          <span className="font-medium text-[#c5a059]">Concierge: +33 1 42 68 55 00</span>
        </div>
      </div>
    </div>
  );
}
