import React, { useState, useEffect } from 'react';

const mockCommissions = [
  { client: 'Studio Chipperfield', location: 'Milan, Italy', piece: '2x Monolith Travertine Tables', status: 'Reserved for Palazzina Residence', time: '4 min ago' },
  { client: 'Private Collector', location: 'Tribeca, NYC', piece: 'Custom Smoked Oak Dining Table', status: 'Wood Kiln Curation Confirmed', time: '9 min ago' },
  { client: 'Kengo Kuma Associates', location: 'Kyoto, Japan', piece: '4x Kanso Lounge Chairs (Bouclé)', status: 'Shipment Scheduled via Sea Freight', time: '14 min ago' },
  { client: 'Lakeside Residence', location: 'Zurich, Switzerland', piece: '1x Minimalist Raw Linen Daybed', status: 'Hand-Finished in Tuscany', time: '19 min ago' },
  { client: 'Architectural Atelier', location: 'Copenhagen, Denmark', piece: 'Cast Bronze & Walnut Console', status: 'Numbered Edition 03/10', time: '27 min ago' },
];

export default function AtelierLiveToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockCommissions.length);
        setIsVisible(true);
      }, 700);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const current = mockCommissions[currentIndex];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm w-full transition-all duration-700 transform translate-y-0 opacity-100 font-sans pointer-events-none">
      <div className="bg-[#1c1917]/95 backdrop-blur-md text-[#f5f5f4] border border-amber-600/30 p-3.5 rounded-xl shadow-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-600/10 border border-amber-600/30 flex items-center justify-center flex-shrink-0 text-amber-500 font-serif font-bold text-base">
          AF
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-bold">
              Private Commission • Dispatch
            </span>
            <span className="text-[10px] font-mono text-stone-400">{current.time}</span>
          </div>
          <p className="text-xs font-serif font-medium text-white truncate mt-0.5">
            {current.client} <span className="text-stone-400 font-sans text-[11px]">({current.location})</span>
          </p>
          <p className="text-[11px] text-stone-300 truncate font-sans">
            Acquired: <span className="text-amber-400 font-medium">{current.piece}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
