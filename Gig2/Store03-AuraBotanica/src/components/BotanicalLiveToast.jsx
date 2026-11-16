import React, { useState, useEffect } from 'react';
import { X, Sparkles, Droplets, Leaf } from 'lucide-react';

const ORDERS = [
  { location: 'Kyoto, Japan', item: 'Fermented Camellia Night Barrier Oil', time: '2m ago' },
  { location: 'Copenhagen, Denmark', item: 'Kyoto Rice & Bakuchiol Dew Elixir', time: '6m ago' },
  { location: 'Stockholm, Sweden', item: 'Centella Asiatica Soothing Emulsion', time: '11m ago' },
  { location: 'Paris, France', item: 'Customized 3-Step Botanical Ritual', time: 'Just now' }
];

export default function BotanicalLiveToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % ORDERS.length);
        setVisible(true);
      }, 500);
    }, 9000);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = ORDERS[index];

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 max-w-sm bg-[#fbf8f5]/95 backdrop-blur-md border border-[#3e473d]/30 rounded-2xl p-3.5 shadow-xl text-xs font-sans transition-all duration-500 flex items-start gap-3 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-[#ece8e1] border border-[#3e473d]/40 text-[#3e473d] flex items-center justify-center shrink-0 mt-0.5">
        <Leaf className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 text-[10px] text-[#3e473d] font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>APOTHECARY DISPATCH</span>
        </div>
        <p className="text-[#2c322b] font-serif text-sm font-bold truncate mt-0.5">
          {current.item}
        </p>
        <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
          <span>{current.location}</span>
          <span className="text-[#3e473d] font-bold">{current.time}</span>
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
