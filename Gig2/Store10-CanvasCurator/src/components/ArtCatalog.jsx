import React, { useState } from 'react';
import { ART_EDITIONS } from '../data/artData';

export default function ArtCatalog({ onAddToCart, onPreviewOnWall, onInspectItem }) {
  const [selectedMedium, setSelectedMedium] = useState('ALL');

  const mediums = ['ALL', 'Archival Giclée', 'Originals', 'Woodblock Relief', 'Chromogenic'];

  const filteredItems = selectedMedium === 'ALL'
    ? ART_EDITIONS
    : ART_EDITIONS.filter(item => {
        if (selectedMedium === 'Archival Giclée') return item.medium.includes('Giclée');
        if (selectedMedium === 'Originals') return item.medium.includes('Original');
        if (selectedMedium === 'Woodblock Relief') return item.medium.includes('Woodblock');
        if (selectedMedium === 'Chromogenic') return item.medium.includes('Chromogenic');
        return true;
      });

  return (
    <section id="editions" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#e5e5e5]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#888888] block mb-2 font-medium">
            Gallery Releases &bull; Curated Series 08
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#111111] font-gallery tracking-tight">
            Selected Editions & Originals
          </h2>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider">
          {mediums.map(med => (
            <button
              key={med}
              onClick={() => setSelectedMedium(med)}
              className={`px-3.5 py-1.5 transition-all border ${
                selectedMedium === med
                  ? 'bg-[#111111] text-[#ffffff] border-[#111111]'
                  : 'bg-transparent text-[#666666] border-[#e5e5e5] hover:border-[#111111]'
              }`}
            >
              {med}
            </button>
          ))}
        </div>
      </div>

      {/* Art Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="group flex flex-col bg-[#fafafa] border border-[#e5e5e5] p-6 sm:p-8 hover:border-[#111111] transition-all duration-300"
          >
            {/* Image Container with generous padding representing gallery framing */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f0f0] p-4 flex items-center justify-center mb-6">
              <img decoding="async"
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out shadow-sm"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#111111] font-medium border border-[#e5e5e5]">
                {item.edition}
              </div>
            </div>

            {/* Title & Artist */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-xl sm:text-2xl font-normal font-gallery text-[#111111]">
                  {item.name}
                </h3>
                <p className="text-xs text-[#777777] font-medium mt-0.5">
                  {item.artist}
                </p>
              </div>
              <span className="text-xl font-gallery text-[#111111] whitespace-nowrap">
                {item.priceFormatted}
              </span>
            </div>

            <p className="text-xs text-[#555555] font-light leading-relaxed my-4">
              {item.description}
            </p>

            {/* Specs */}
            <div className="mt-auto border-t border-[#e5e5e5] pt-4 mb-6 space-y-1.5 text-xs text-[#666666]">
              <div className="flex justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#888888]">Medium</span>
                <span className="font-light text-[#111111] text-right">{item.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#888888]">Sheet Dimensions</span>
                <span className="font-mono text-[#111111]">{item.dimensions}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => onInspectItem && onInspectItem(item)}
                className="w-full py-3 border border-[#111111] text-[#111111] text-xs uppercase tracking-widest font-medium hover:bg-[#111111] hover:text-[#ffffff] transition-all cursor-pointer"
              >
                Dossier
              </button>
              <button
                onClick={() => onAddToCart(item)}
                className="w-full py-3 bg-[#111111] text-[#ffffff] text-xs uppercase tracking-widest font-medium hover:bg-[#333333] transition-colors cursor-pointer"
              >
                Acquire
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
