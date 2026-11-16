import React, { useState } from 'react';
import { FURNITURE } from '../data/furnitureData';

export default function FurnitureCatalog({ onAddToCart, onInspectItem }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeItemDetails, setActiveItemDetails] = useState(null);

  const categories = ['ALL', 'Sculptural Seating', 'Living Room Tables', 'Architectural Storage', 'Bauhaus Lighting'];

  const filteredItems = selectedCategory === 'ALL'
    ? FURNITURE
    : FURNITURE.filter(item => item.category === selectedCategory);

  return (
    <section id="collection" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#ded8cb]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#7a7164] block mb-2 font-medium">
            Permanent Catalogue &bull; Series 04
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-[#24211d] font-arch uppercase tracking-wide">
            Architectural Objects
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#24211d] text-[#f4f1ea] border-[#24211d]'
                  : 'bg-transparent text-[#5c544a] border-[#ded8cb] hover:border-[#24211d]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="group flex flex-col bg-[#ebe6dc]/50 border border-[#ded8cb] p-6 sm:p-8 hover:border-[#24211d] transition-all duration-300"
          >
            {/* Image Container with aspect ratio */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#ded8cb]/40 mb-6">
              <img decoding="async"
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-[#f4f1ea]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#24211d] font-medium border border-[#ded8cb]">
                {item.category}
              </div>
              <div className="absolute top-3 right-3 bg-[#24211d] text-[#f4f1ea] px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono">
                {item.leadTime}
              </div>
            </div>

            {/* Content Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-xl sm:text-2xl font-normal font-arch text-[#24211d] tracking-wide">
                {item.name}
              </h3>
              <span className="text-lg font-serif font-bold text-[#24211d] whitespace-nowrap">
                {item.priceFormatted}
              </span>
            </div>

            <p className="text-xs text-[#5c544a] font-light leading-relaxed mb-6">
              {item.details}
            </p>

            {/* Architectural Specifications Table */}
            <div className="mt-auto border-t border-[#ded8cb] pt-4 mb-6 space-y-2 text-xs">
              <div className="flex justify-between text-[#7a7164]">
                <span className="uppercase tracking-wider text-[10px]">Material</span>
                <span className="font-medium text-[#24211d] text-right">{item.material}</span>
              </div>
              <div className="flex justify-between text-[#7a7164]">
                <span className="uppercase tracking-wider text-[10px]">Dimensions</span>
                <span className="font-mono text-[#24211d]">{item.dimensions}</span>
              </div>
              <div className="flex justify-between text-[#7a7164]">
                <span className="uppercase tracking-wider text-[10px]">Weight</span>
                <span className="font-mono text-[#24211d]">{item.weight}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => onInspectItem && onInspectItem(item)}
                className="w-full py-3 border border-[#24211d] text-[#24211d] text-xs uppercase tracking-widest font-medium hover:bg-[#24211d] hover:text-[#f4f1ea] transition-all cursor-pointer"
              >
                Monograph
              </button>
              <button
                onClick={() => onAddToCart(item)}
                className="w-full py-3 bg-[#24211d] text-[#f4f1ea] text-xs uppercase tracking-widest font-medium hover:bg-[#3d3832] transition-colors cursor-pointer"
              >
                Acquire Piece
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
