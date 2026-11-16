import React, { useState } from 'react';
import { CHOCOLATE_COLLECTIONS } from '../data/chocolateData';

export default function TruffleCatalog({ onAddToCart, onInspectItem }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'Signature Coffrets', 'Champagne Truffles', 'Estate Dark Bars', 'Artisanal Caramels'];

  const filteredItems = activeCategory === 'ALL'
    ? CHOCOLATE_COLLECTIONS
    : CHOCOLATE_COLLECTIONS.filter(item => item.category === activeCategory);

  return (
    <section id="coffrets" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#352115]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] block mb-2 font-light">
            Les Grands Classiques
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#fbf7f2] font-paris tracking-wide">
            Haute Chocolaterie Coffrets
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 transition-all border ${
                activeCategory === cat
                  ? 'bg-[#c5a059] text-[#1c100c] border-[#c5a059] font-medium'
                  : 'bg-transparent text-[#b8a798] border-[#352115] hover:border-[#c5a059]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="group flex flex-col bg-[#241712] border border-[#352115] p-6 sm:p-8 hover:border-[#c5a059]/60 transition-all duration-300 rounded-sm"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#160c09] mb-6 rounded-sm">
              <img decoding="async"
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-[#1c100c]/90 border border-[#c5a059]/40 px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#c5a059] font-light">
                {item.category}
              </div>
              <div className="absolute top-3 right-3 bg-[#c5a059] text-[#1c100c] px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold">
                {item.cacaoPercentage}
              </div>
            </div>

            {/* Title & Price */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-xl sm:text-2xl font-normal font-paris text-[#fbf7f2]">
                {item.name}
              </h3>
              <span className="text-lg font-light text-[#c5a059] whitespace-nowrap">
                {item.priceFormatted}
              </span>
            </div>

            <p className="text-xs text-[#ded4ca] font-light leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Terroir specs */}
            <div className="mt-auto border-t border-[#352115] pt-4 mb-6 flex justify-between items-center text-xs">
              <span className="text-[#9c8474] uppercase tracking-wider text-[10px]">Cacao Terroir</span>
              <span className="text-[#e2d6cc] font-light">{item.origin}</span>
            </div>

            {/* Add to Cart */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onInspectItem && onInspectItem(item)}
                className="py-3 border border-[#c5a059] text-[#c5a059] text-xs uppercase tracking-widest font-medium hover:bg-[#c5a059] hover:text-[#1c100c] transition-all cursor-pointer rounded-sm"
              >
                Dégustation
              </button>
              <button
                onClick={() => onAddToCart(item)}
                className="py-3 bg-[#c5a059] text-[#1c100c] text-xs uppercase tracking-widest font-bold hover:bg-[#d8b775] transition-colors cursor-pointer rounded-sm"
              >
                Commander
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
