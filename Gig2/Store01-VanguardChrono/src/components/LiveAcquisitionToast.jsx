import React, { useState, useEffect } from 'react';
import { X, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

const NOTIFICATIONS = [
  { location: 'Geneva, Switzerland', item: 'Aethelgard Flying Tourbillon (CHF 34,500)', time: '3 min ago' },
  { location: 'Tokyo, Japan', item: 'Nouveau Chronographe Flyback (¥5,200,000)', time: '7 min ago' },
  { location: 'Mayfair, London', item: 'Astralis Perpetual Calendar (£26,900)', time: '14 min ago' },
  { location: 'Zurich, Switzerland', item: 'Bespoke Caliber 701 Commissioned', time: 'Just now' }
];

export default function LiveAcquisitionToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % NOTIFICATIONS.length);
        setIsVisible(true);
      }, 500);
    }, 9000);
    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = NOTIFICATIONS[currentIndex];

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 max-w-sm bg-[#12141a]/95 backdrop-blur-md border border-[#d4af37]/40 rounded-xl p-3.5 shadow-2xl text-xs font-mono transition-all duration-500 flex items-start gap-3 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37] text-[#d4af37] flex items-center justify-center shrink-0 mt-0.5">
        <Award className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 text-[10px] text-[#d4af37] uppercase font-bold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>VERIFIED COLLECTOR ACQUISITION</span>
        </div>
        <p className="text-white font-serif text-sm font-bold truncate mt-0.5">
          {current.item}
        </p>
        <div className="flex justify-between items-center text-[10px] text-neutral-400 mt-1">
          <span>{current.location}</span>
          <span>{current.time}</span>
        </div>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="text-neutral-500 hover:text-white p-1"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
