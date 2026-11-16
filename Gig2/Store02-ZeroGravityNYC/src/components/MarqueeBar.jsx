import React from 'react';

export default function MarqueeBar() {
  return (
    <div className="bg-[#ccff00] text-black py-1.5 overflow-hidden font-mono font-bold text-xs uppercase tracking-widest border-b-2 border-black select-none">
      <div className="animate-marquee whitespace-nowrap flex gap-8">
        <span>ZERO//GRAVITY NYC</span>
        <span>•</span>
        <span>SEASON 04 TACTICAL DROP</span>
        <span>•</span>
        <span>HEAVYWEIGHT 550 GSM CUSTOM FLEECE</span>
        <span>•</span>
        <span>AUSTRIALPIN COBRA & FIDLOCK HARDWARE</span>
        <span>•</span>
        <span>DISPATCHING FROM BROOKLYN, NYC</span>
        <span>•</span>
        <span>ZERO//GRAVITY NYC</span>
        <span>•</span>
        <span>SEASON 04 TACTICAL DROP</span>
      </div>
    </div>
  );
}
