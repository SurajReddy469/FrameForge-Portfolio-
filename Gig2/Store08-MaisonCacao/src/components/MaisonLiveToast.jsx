import React, { useState, useEffect } from 'react';

const mockDispatches = [
  { guest: 'Boutique Saint-Germain', location: 'Paris 6e, France', item: '24-Piece Grand Cru Coffret', detail: 'Gold Wax Monogrammed', time: '3 min ago' },
  { guest: 'Hotel Ritz Concierge', location: 'Place Vendôme, Paris', item: '6x Haute Praliné Ballotins', detail: 'Silk Ribbons Sealed', time: '8 min ago' },
  { guest: 'Private Connoisseur', location: 'Mayfair, London, UK', item: 'Monogrammed Wooden Chest (48 Truffles)', detail: 'Temperature-Controlled Freight', time: '14 min ago' },
  { guest: 'Patisserie Sommelier', location: 'Ginza, Tokyo, Japan', item: '3x Piura Blanco Single-Estate Bars', detail: 'Express Air Dispatched', time: '19 min ago' },
  { guest: 'Haute Horlogerie VIP', location: 'Geneva, Switzerland', item: '1x Artisanal Dark Ganache Flight', detail: 'Gold Leaf Hand-Finished', time: '26 min ago' },
];

export default function MaisonLiveToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockDispatches.length);
        setIsVisible(true);
      }, 700);
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  const current = mockDispatches[currentIndex];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm w-full transition-all duration-700 transform translate-y-0 opacity-100 font-serif pointer-events-none">
      <div className="bg-[#21120e]/95 backdrop-blur-md text-[#fbf7f2] border border-[#d4af37]/40 p-3.5 rounded-xl shadow-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center flex-shrink-0 text-[#d4af37] font-serif font-bold text-base">
          MC
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between font-sans">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] font-bold">
              Boutique Saint-Germain • Dispatch
            </span>
            <span className="text-[10px] font-mono text-[#c7b9a5]">{current.time}</span>
          </div>
          <p className="text-xs font-serif font-semibold text-white truncate mt-0.5">
            {current.guest} <span className="text-[#c7b9a5] font-sans text-[11px]">({current.location})</span>
          </p>
          <p className="text-[11px] text-[#e6ded5] truncate font-sans">
            Prepared: <span className="text-[#d4af37] font-medium">{current.item}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
