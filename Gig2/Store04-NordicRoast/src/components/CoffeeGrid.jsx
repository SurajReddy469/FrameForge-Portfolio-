import React, { useState } from 'react';
import { ShoppingBag, Coffee, Sparkles, Check, Flame, Sliders } from 'lucide-react';
import { COFFEES } from '../data/coffeeData';

export default function CoffeeGrid({ onAddToCart, onInspectCoffee }) {
  const [selectedGrinds, setSelectedGrinds] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [isSubscription, setIsSubscription] = useState({});

  const handleSelectGrind = (coffeeId, grind) => {
    setSelectedGrinds(prev => ({ ...prev, [coffeeId]: grind }));
  };

  const handleSelectSize = (coffeeId, size) => {
    setSelectedSizes(prev => ({ ...prev, [coffeeId]: size }));
  };

  const toggleSub = (coffeeId) => {
    setIsSubscription(prev => ({ ...prev, [coffeeId]: !prev[coffeeId] }));
  };

  return (
    <section id="micro-lots" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc7] bg-[#fcfaf7]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#8c7462] font-mono text-xs uppercase tracking-widest block mb-1">
              CURRENT HARVEST OFFERINGS • COPENHAGEN ATELIER
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#2b1d14]">
              Single-Origin Micro-Lots
            </h2>
          </div>
          <div className="font-mono text-xs text-[#594637] bg-[#f2e9dc] px-4 py-2 rounded-xl border border-[#ebdcc7]">
            ROAST PROMISE: <strong className="text-[#2b1d14]">SMALL-BATCH ROASTED ON DEMAND (48H FRESHNESS)</strong>
          </div>
        </div>

        {/* 4 Single Origins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COFFEES.map((coffee) => {
            const currentGrind = selectedGrinds[coffee.id] || 'Whole Bean';
            const currentSize = selectedSizes[coffee.id] || '250g';
            const hasSub = isSubscription[coffee.id];
            
            // Base price calculation for size
            const basePrice = currentSize === '1kg' ? Math.round(coffee.price * 3.4) : coffee.price;
            const finalPrice = hasSub ? Math.round(basePrice * 0.9) : basePrice;

            return (
              <div
                key={coffee.id}
                className="bg-white border-2 border-[#ebdcc7] hover:border-[#2b1d14] rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-sm hover:shadow-lg"
              >
                <div>
                  {/* Photo */}
                  <div
                    onClick={() => onInspectCoffee && onInspectCoffee(coffee)}
                    className="aspect-square bg-[#fbf7f2] rounded-xl overflow-hidden mb-4 relative cursor-pointer"
                  >
                    <img decoding="async" loading="lazy"
                      src={coffee.image}
                      alt={coffee.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#2b1d14] text-[#ebdcc7] px-2 py-0.5 text-[10px] font-mono font-bold">
                      {coffee.scaScore}
                    </div>
                  </div>

                  {/* Coffee Info */}
                  <span className="text-[10px] font-mono text-[#8c7462] block mb-1 uppercase tracking-wider">{coffee.origin}</span>
                  <h3
                    onClick={() => onInspectCoffee && onInspectCoffee(coffee)}
                    className="font-serif text-xl font-bold text-[#2b1d14] mb-2 group-hover:text-[#694e39] transition-colors cursor-pointer"
                  >
                    {coffee.name}
                  </h3>

                  {/* Tasting Notes */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {coffee.notes.map((note, nIdx) => (
                      <span key={nIdx} className="px-2 py-0.5 bg-[#ebdcc7] text-[#2b1d14] text-[10px] font-mono rounded">
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-[#7a6453] space-y-1 pb-3 border-b border-[#ebdcc7]">
                    <div>Process: <span className="text-[#2b1d14] font-medium">{coffee.process}</span></div>
                    <div>Roast: <span className="text-[#2b1d14] font-medium">{coffee.roastProfile}</span></div>
                  </div>

                  {/* Bag Size Selector (Right before purchase) */}
                  <div className="mt-3">
                    <span className="text-[10px] font-mono text-[#8c7462] uppercase block mb-1">BAG WEIGHT:</span>
                    <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                      {[
                        { id: '250g', label: '250g Pouch' },
                        { id: '1kg', label: '1kg Barista' }
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => handleSelectSize(coffee.id, s.id)}
                          className={`py-1.5 border rounded text-center transition cursor-pointer ${
                            currentSize === s.id
                              ? 'bg-[#2b1d14] text-white border-[#2b1d14] font-bold'
                              : 'bg-white text-[#594637] border-[#ebdcc7] hover:border-[#2b1d14]'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grind Selector (Right before purchase) */}
                  <div className="my-3">
                    <span className="text-[10px] font-mono text-[#8c7462] uppercase block mb-1">PRECISION GRIND:</span>
                    <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
                      {['Whole Bean', 'Filter V60', 'Espresso'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => handleSelectGrind(coffee.id, g)}
                          className={`py-1.5 border rounded text-center transition cursor-pointer ${
                            currentGrind === g
                              ? 'bg-[#2b1d14] text-white border-[#2b1d14] font-bold'
                              : 'bg-white text-[#594637] border-[#ebdcc7] hover:border-[#2b1d14]'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subscription Toggle */}
                  <div className="p-2.5 rounded-lg bg-[#fbf7f2] border border-[#ebdcc7] flex items-center justify-between text-xs font-mono mb-3">
                    <div>
                      <div className="font-bold text-[#2b1d14] text-[11px]">Roaster's Club Sub</div>
                      <div className="text-[10px] text-[#8c7462]">Fortnightly (Save 10%)</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSub(coffee.id)}
                      className={`w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer ${
                        hasSub ? 'bg-[#2b1d14]' : 'bg-[#ebdcc7]'
                      }`}
                      aria-label="Toggle Fortnightly Subscription"
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${hasSub ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                {/* Fresh Roast Date & Purchase Button */}
                <div className="pt-2 border-t border-[#ebdcc7]">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#7a6453] mb-2">
                    <Flame className="w-3 h-3 text-[#2b1d14]" />
                    <span>Roast Date: <strong>Within 48h of dispatch</strong></span>
                  </div>

                  <div className="flex items-baseline justify-between mb-3 font-mono">
                    <span className="text-xs text-[#8c7462] uppercase">{currentSize}:</span>
                    <span className="text-2xl font-serif font-bold text-[#2b1d14]">${finalPrice} USD</span>
                  </div>

                  <button
                    onClick={() => onAddToCart({ ...coffee, price: finalPrice, selectedGrind: currentGrind, selectedSize: currentSize, hasSub })}
                    className="w-full py-3 rounded-lg bg-[#2b1d14] hover:bg-[#3d2a1d] text-[#fcfaf7] font-mono font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{hasSub ? "Subscribe (Every 2w)" : `Add ${currentSize} to Bag`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
