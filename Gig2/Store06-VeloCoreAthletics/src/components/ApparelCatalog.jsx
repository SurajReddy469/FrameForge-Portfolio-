import React, { useState } from 'react';
import { ShoppingBag, Zap, Check } from 'lucide-react';
import { APPAREL } from '../data/sportData';

export default function ApparelCatalog({ onAddToCart, onInspectItem }) {
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSelectSize = (id, size) => {
    setSelectedSizes(prev => ({ ...prev, [id]: size }));
  };

  return (
    <section id="apparel" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1a233a] bg-[#0c1222]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest block mb-1">
              PRO COMPETITION CAPSULE
            </span>
            <h2 className="text-4xl sm:text-5xl font-sport font-black uppercase text-white tracking-tight italic">
              Aerodynamic Technical Catalog
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-400">
            CERTIFIED: <strong className="text-white">UCI ROAD & WORLD ATHLETICS LEGAL</strong>
          </div>
        </div>

        {/* 4 Sport Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {APPAREL.map((item) => {
            const currentSize = selectedSizes[item.id] || 'M';

            return (
              <div
                key={item.id}
                className="bg-[#11192e] border border-[#1e2a4a] hover:border-[#00f0ff] rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-xl"
              >
                <div>
                  {/* Photo */}
                  <div className="aspect-[4/5] bg-black rounded-xl overflow-hidden mb-4 relative">
                    <img decoding="async" loading="lazy"
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 border border-[#00f0ff]/40 text-[#00f0ff] px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded">
                      {item.category}
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-sport font-bold text-xl text-white mb-1 group-hover:text-[#00f0ff] transition-colors italic uppercase">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-normal mb-4 leading-relaxed min-h-[36px]">
                    {item.details}
                  </p>

                  <div className="space-y-1.5 text-[11px] font-mono text-neutral-400 pb-3 border-b border-[#1e2a4a]">
                    <div>Fabric: <span className="text-white">{item.fabric}</span></div>
                    <div>Drag Savings: <span className="text-[#00f0ff]">{item.dragReduction}</span></div>
                    <div>Weight: <span className="text-neutral-300">{item.weight}</span></div>
                  </div>

                  {/* Size Matrix */}
                  <div className="my-4">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">SELECT SIZE:</span>
                    <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSelectSize(item.id, size)}
                          className={`py-1.5 rounded border text-center transition ${
                            currentSize === size
                              ? 'bg-[#00f0ff] text-black border-[#00f0ff] font-bold'
                              : 'bg-[#0a0f1d] text-white border-[#1e2a4a] hover:border-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price and Add */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-xs text-neutral-500">PRICE:</span>
                    <span className="text-2xl font-sport italic font-bold text-white">{item.priceFormatted}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onInspectItem && onInspectItem(item)}
                      className="py-2.5 px-2 rounded-lg bg-[#0a0f1d] border border-[#1e2a4a] hover:border-[#00f0ff] text-neutral-300 hover:text-white font-mono text-[11px] font-bold uppercase transition"
                    >
                      Aero Specs
                    </button>
                    <button
                      onClick={() => onAddToCart({ ...item, selectedSize: currentSize })}
                      className="py-2.5 px-2 rounded-lg bg-[#00f0ff] hover:bg-[#33f3ff] text-black font-sport font-black text-[11px] uppercase italic transition flex items-center justify-center gap-1.5 shadow-md shadow-[#00f0ff]/20"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add {currentSize}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
