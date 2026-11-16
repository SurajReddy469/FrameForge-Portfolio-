import React, { useState } from 'react';
import { Eye, ShoppingBag, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { WATCHES } from '../data/watchesData';
import { formatPrice } from '../utils/currency';

export default function CollectionGrid({ onAddToCart, onInspectWatch, currency = 'CHF' }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const categories = ['ALL', 'Grandes Complications', 'Astronomical Heritage', 'Motorsport Heritage', 'Atelier Avant-Garde'];

  const filteredWatches = selectedFilter === 'ALL'
    ? WATCHES
    : WATCHES.filter(w => w.collection === selectedFilter);

  return (
    <section id="collection" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#22242a] bg-[#0c0d10]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[#d4af37] font-mono text-xs uppercase tracking-[0.25em] mb-2">
              MANUFACTURE COLLECTION
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif font-light text-white">
              Grandes Complications
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedFilter === cat
                    ? 'bg-[#d4af37] text-black border-[#d4af37] font-semibold'
                    : 'bg-[#12141a] text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Masterpiece Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredWatches.map((watch) => (
            <div
              key={watch.id}
              className="bg-[#12141a] border border-[#22242a] hover:border-[#d4af37]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Watch Photography */}
                <div className="relative aspect-square overflow-hidden bg-[#090a0c] p-6 flex items-center justify-center">
                  <img decoding="async" loading="lazy"
                    src={watch.image}
                    alt={watch.name}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 border border-[#d4af37]/30 text-[10px] font-mono text-[#d4af37] tracking-wider uppercase">
                      {watch.collection}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-normal text-white group-hover:text-[#d4af37] transition-colors mb-2">
                    {watch.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4 min-h-[36px]">
                    {watch.description}
                  </p>

                  <div className="space-y-1.5 pb-4 border-b border-[#22242a] text-[11px] font-mono text-neutral-400">
                    <div className="flex justify-between">
                      <span>Calibre:</span>
                      <span className="text-neutral-200">{watch.calibre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chassis:</span>
                      <span className="text-neutral-200">{watch.caseMaterial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reserve:</span>
                      <span className="text-neutral-200">{watch.powerReserve}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 block uppercase">ACQUISITION PRICE</span>
                      <span className="font-serif text-2xl font-bold text-white tracking-tight">
                        {formatPrice(watch.price, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => onAddToCart(watch)}
                  className="flex-1 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c14d] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#d4af37]/10 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Acquire</span>
                </button>
                <button
                  onClick={() => onInspectWatch(watch)}
                  className="p-3 rounded-xl bg-[#181a22] hover:bg-[#222530] text-neutral-300 border border-neutral-800 transition"
                  title="Inspect Movement Calibre"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
