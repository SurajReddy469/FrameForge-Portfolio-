import React, { useState, useEffect } from 'react';
import { X, Cpu, Terminal, ShieldCheck } from 'lucide-react';

const QUEUE_FEEDS = [
  { orderId: 'KC-8921', item: '65% Leaf-Spring Gasket Anodized Black', city: 'Berlin, Germany', time: '3m ago' },
  { orderId: 'KC-4109', item: '75% Solid Brass Internal Weight Kit', city: 'Munich, Germany', time: '7m ago' },
  { orderId: 'KC-9943', item: 'TKL Custom CNC Billets (Polycarbonate)', city: 'Zurich, Switzerland', time: '11m ago' },
  { orderId: 'KC-1204', item: 'Alice Ergonomic Lubed 205g0 Bundle', city: 'Stockholm, Sweden', time: 'Just now' }
];

export default function KeyCraftLiveToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % QUEUE_FEEDS.length);
        setVisible(true);
      }, 500);
    }, 9000);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = QUEUE_FEEDS[index];

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 max-w-sm bg-[#12151b]/95 backdrop-blur-md border border-[#ff5722]/40 rounded-2xl p-3.5 shadow-2xl text-xs font-mono transition-all duration-500 flex items-start gap-3 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-[#181c22] border border-[#ff5722] text-[#ff5722] flex items-center justify-center shrink-0 mt-0.5">
        <Cpu className="w-4 h-4 text-[#ff5722]" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 text-[10px] text-[#ff5722] font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>MUNICH LAB ASSEMBLY QUEUE</span>
        </div>
        <p className="text-white font-bold truncate mt-0.5">
          {current.item}
        </p>
        <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
          <span>{current.city}</span>
          <span className="text-[#ff5722] font-bold">{current.time}</span>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="text-neutral-500 hover:text-white p-1"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
