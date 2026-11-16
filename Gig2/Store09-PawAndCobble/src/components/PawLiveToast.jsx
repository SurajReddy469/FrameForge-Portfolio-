import React, { useState, useEffect } from 'react';

const mockDispatches = [
  { breed: 'Working Labrador', location: 'Cotswolds, UK', item: 'Waterproof Field Leash & Brass Clip', detail: 'Weatherproofed with Beeswax', time: '4 min ago' },
  { breed: 'Golden Retriever', location: 'Aspen, Colorado', item: 'Highland Bridle Harness (English Tan)', detail: 'Monogrammed "Barnaby"', time: '9 min ago' },
  { breed: 'Border Collie', location: 'Highlands, Scotland', item: 'Solid Brass Engraved Collar', detail: 'Etched "Rowan" (Size L)', time: '16 min ago' },
  { breed: 'Bernese Mountain Dog', location: 'Lake Tahoe, CA', item: 'Waxed Canvas Expedition Bed', detail: 'Water-Repellent Wool Liner', time: '22 min ago' },
  { breed: 'German Shorthair', location: 'Munich, Bavaria', item: 'Heavy Saddle Leather Lead', detail: 'Dispatched via DHL Courier', time: '29 min ago' },
];

export default function PawLiveToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockDispatches.length);
        setIsVisible(true);
      }, 700);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const current = mockDispatches[currentIndex];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm w-full transition-all duration-700 transform translate-y-0 opacity-100 font-sans pointer-events-none">
      <div className="bg-[#1b2419]/95 backdrop-blur-md text-[#f4f2ea] border border-[#d4af37]/40 p-3.5 rounded-xl shadow-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center flex-shrink-0 text-lg">
          🐾
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] font-bold">
              Canine Field Dispatch
            </span>
            <span className="text-[10px] font-mono text-[#a3b09f]">{current.time}</span>
          </div>
          <p className="text-xs font-serif font-bold text-white truncate mt-0.5">
            {current.breed} <span className="text-[#a3b09f] font-sans text-[11px] font-normal">({current.location})</span>
          </p>
          <p className="text-[11px] text-[#d6ded3] truncate font-sans">
            Prepared: <span className="text-[#d4af37] font-medium">{current.item}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
