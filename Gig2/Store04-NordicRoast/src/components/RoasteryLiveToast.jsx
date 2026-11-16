import React, { useState, useEffect } from 'react';
import { X, Flame, Coffee, Award } from 'lucide-react';

const ROASTS = [
  { roaster: 'Oslo Roastery', item: 'Yirgacheffe Ethiopian Geisha (250g)', dest: 'Stockholm, SE', time: '2m ago' },
  { roaster: 'Bergen Lab', item: 'Finca La Palma Sidra Natural (500g)', dest: 'Copenhagen, DK', time: '5m ago' },
  { roaster: 'Stavanger Atelier', item: 'Kenya Nyeri Peaberry Light Roast', dest: 'Helsinki, FI', time: '8m ago' },
  { roaster: 'Oslo Roastery', item: 'Direct Trade Geisha Village Batch #4', dest: 'London, UK', time: 'Just now' }
];

export default function RoasteryLiveToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % ROASTS.length);
        setVisible(true);
      }, 500);
    }, 9000);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = ROASTS[index];

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 max-w-sm bg-[#fcfaf7]/95 backdrop-blur-md border border-[#ebdcc7] rounded-2xl p-3.5 shadow-xl text-xs font-mono transition-all duration-500 flex items-start gap-3 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-[#ebdcc7]/60 border border-[#2b1d14]/30 text-[#2b1d14] flex items-center justify-center shrink-0 mt-0.5">
        <Flame className="w-4 h-4 text-[#2b1d14]" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 text-[10px] text-[#2b1d14] font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          <span>MICRO-LOT ROAST DISPATCH</span>
        </div>
        <p className="text-[#2b1d14] font-serif text-sm font-bold truncate mt-0.5">
          {current.item}
        </p>
        <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
          <span>{current.dest}</span>
          <span className="text-[#2b1d14] font-bold">{current.time}</span>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="text-neutral-400 hover:text-black p-1"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
