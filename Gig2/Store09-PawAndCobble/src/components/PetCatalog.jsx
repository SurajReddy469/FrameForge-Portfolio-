import React, { useState } from 'react';
import { PET_PRODUCTS } from '../data/petData';
import { ShieldCheck, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function PetCatalog({ onAddToCart, onInspectItem, activeRecommendedSize }) {
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (id, size) => {
    setSelectedSizes(prev => ({ ...prev, [id]: size }));
  };

  return (
    <section id="gear" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#e5ded0]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#445341] block mb-2 font-bold">
            All-Weather Canine Hardware
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#2c332b] font-brand tracking-tight">
            Field Gear & Harnesses
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#445341] bg-[#ece4d4] px-4 py-2 rounded-xl border border-[#ded5c3]">
          <ShieldCheck className="w-4 h-4 text-[#445341]" />
          <span>100-DAY CHEW-PROOF FIELD GUARANTEE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PET_PRODUCTS.map((item) => {
          const currentSize = selectedSizes[item.id] || activeRecommendedSize || 'Medium';

          return (
            <div
              key={item.id}
              className="bg-[#fcfaf4] rounded-2xl border border-[#e5ded0] p-5 flex flex-col justify-between hover:shadow-xl hover:border-[#445341] transition-all group"
            >
              <div>
                {/* Product Image */}
                <div
                  onClick={() => onInspectItem && onInspectItem(item)}
                  className="aspect-square bg-[#ede5d5] rounded-xl overflow-hidden mb-5 relative cursor-pointer"
                >
                  <img decoding="async" loading="lazy"
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#fcfaf4] text-[#2c332b] border border-[#e5ded0] rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#445341] text-[#fcfaf4] rounded-full px-3 py-1 text-[11px] font-bold">
                    {item.rating}
                  </div>
                </div>

                {/* Title & Price */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3
                    onClick={() => onInspectItem && onInspectItem(item)}
                    className="text-xl font-bold font-brand text-[#2c332b] hover:text-[#445341] transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>
                  <span className="text-xl font-extrabold text-[#445341] whitespace-nowrap">
                    {item.priceFormatted}
                  </span>
                </div>

                <div className="text-xs text-[#798875] font-semibold mb-2">
                  Tannage: {item.colorway}
                </div>

                <p className="text-xs text-[#556352] font-normal leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Size Choice */}
                <div className="mb-3">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#798875] mb-1">
                    <span>Fitted Size:</span>
                    {activeRecommendedSize && (
                      <span className="text-[#445341]">Diagnostic: {activeRecommendedSize}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
                    {['Small', 'Medium', 'Large', 'X-Large'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleSizeChange(item.id, sz)}
                        className={`py-1 rounded border text-center transition cursor-pointer ${
                          currentSize.startsWith(sz) || (sz === 'Medium' && currentSize.includes('Medium'))
                            ? 'bg-[#445341] text-white border-[#445341]'
                            : 'bg-white text-[#556352] border-[#e5ded0] hover:border-[#445341]'
                        }`}
                      >
                        {sz.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Materials & Care Details */}
                <div className="border-t border-[#e5ded0] pt-3 mb-4 space-y-1 text-[11px] text-[#556352]">
                  <div className="flex justify-between">
                    <span className="text-[#798875]">Hardware:</span>
                    <span className="font-medium text-[#2c332b]">Solid Sand-Cast Brass</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#798875]">Care:</span>
                    <span className="font-medium text-[#2c332b]">Wipe damp; beeswax treat</span>
                  </div>
                  <div className="flex justify-between text-[#445341] font-semibold pt-1">
                    <span>Warranty:</span>
                    <span>100-Day Chew Replace</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#e5ded0]">
                <button
                  type="button"
                  onClick={() => onInspectItem && onInspectItem(item)}
                  className="py-2.5 border border-[#445341] text-[#445341] text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-[#445341] hover:text-[#fcfaf4] transition-all cursor-pointer"
                >
                  Care & Specs
                </button>
                <button
                  onClick={() => onAddToCart({ ...item, selectedSize: currentSize })}
                  className="py-2.5 bg-[#445341] text-[#fcfaf4] text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-[#323d30] transition-colors shadow-sm cursor-pointer"
                >
                  Add Pack
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
