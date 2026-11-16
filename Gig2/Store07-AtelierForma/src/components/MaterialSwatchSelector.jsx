import React, { useState } from 'react';
import { MATERIAL_SWATCHES } from '../data/furnitureData';

export default function MaterialSwatchSelector() {
  const [activeSwatch, setActiveSwatch] = useState(MATERIAL_SWATCHES[0]);
  const [orderedSamples, setOrderedSamples] = useState([]);
  const [boxOrdered, setBoxOrdered] = useState(false);

  const toggleSample = (swatch) => {
    if (orderedSamples.find(s => s.id === swatch.id)) {
      setOrderedSamples(orderedSamples.filter(s => s.id !== swatch.id));
    } else {
      setOrderedSamples([...orderedSamples, swatch]);
    }
  };

  const handleOrderBox = () => {
    setBoxOrdered(true);
    setTimeout(() => setBoxOrdered(false), 4000);
  };

  return (
    <section id="materials" className="py-24 bg-[#ebe6dc] border-b border-[#ded8cb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7a7164] block mb-2 font-medium">
            Architectural Material Lab
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-[#24211d] font-arch uppercase tracking-wide mb-4">
            Tactile Material Archive
          </h2>
          <p className="text-xs sm:text-sm text-[#5c544a] font-light leading-relaxed">
            Every material is responsibly sourced, traceable to specific forests and quarries, and chosen for how gracefully it weathers through decades of human touch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Swatch Selector Cards Left */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#7a7164] mb-3">
              Select Material to Inspect
            </h3>
            {MATERIAL_SWATCHES.map((swatch) => {
              const isSelected = activeSwatch.id === swatch.id;
              const isInBox = orderedSamples.some(s => s.id === swatch.id);
              return (
                <div
                  key={swatch.id}
                  className={`cursor-pointer p-4 transition-all duration-200 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#f4f1ea] border-[#24211d] shadow-sm'
                      : 'bg-[#f4f1ea]/50 border-[#ded8cb] hover:border-[#7a7164]'
                  }`}
                >
                  <button type="button" onClick={() => setActiveSwatch(swatch)} aria-pressed={isSelected} className="flex items-center gap-4 text-left">
                    <span
                      className="w-10 h-10 rounded-sm shadow-inner border border-black/10 flex-shrink-0"
                      style={{ backgroundColor: swatch.colorHex }}
                    />
                    <div>
                      <div className="font-arch text-sm font-medium text-[#24211d]">
                        {swatch.name}
                      </div>
                      <div className="text-[11px] text-[#7a7164]">{swatch.origin}</div>
                    </div>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSample(swatch);
                    }}
                    className={`text-[10px] uppercase tracking-wider px-2.5 py-1 font-medium transition-colors border ${
                      isInBox
                        ? 'bg-[#24211d] text-[#f4f1ea] border-[#24211d]'
                        : 'bg-transparent text-[#24211d] border-[#ded8cb] hover:border-[#24211d]'
                    }`}
                  >
                    {isInBox ? '✓ In Box' : '+ Add Sample'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active Swatch Deep Dive Display Right */}
          <div className="lg:col-span-7 bg-[#f4f1ea] border border-[#ded8cb] p-8 sm:p-12 relative">
            <div className="flex items-center justify-between border-b border-[#ded8cb] pb-6 mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#7a7164] block">
                  Material Profile #{activeSwatch.id.toUpperCase()}
                </span>
                <h4 className="text-2xl font-arch text-[#24211d] mt-1">
                  {activeSwatch.name}
                </h4>
              </div>
              <div
                className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: activeSwatch.colorHex }}
              />
            </div>

            <div className="space-y-6 text-sm text-[#474036] font-light leading-relaxed mb-8">
              <p>{activeSwatch.description}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#ded8cb] text-xs">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#7a7164]">Region Of Provenance</span>
                  <span className="font-medium text-[#24211d]">{activeSwatch.origin}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#7a7164]">Tactile Assessment</span>
                  <span className="font-medium text-[#24211d]">Unfinished / Natural Grain</span>
                </div>
              </div>
            </div>

            {/* Sample Box Order Panel */}
            <div className="bg-[#ebe6dc] p-6 border border-[#ded8cb]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-arch text-sm font-medium text-[#24211d]">
                    Custom Architectural Swatch Box
                  </div>
                  <div className="text-xs text-[#5c544a]">
                    {orderedSamples.length === 0
                      ? 'Select swatches above to curate your complimentary physical swatch folio.'
                      : `${orderedSamples.length} swatch(es) selected for complimentary studio dispatch.`}
                  </div>
                </div>

                <button
                  onClick={handleOrderBox}
                  disabled={orderedSamples.length === 0}
                  className={`px-6 py-3 text-xs uppercase tracking-widest font-medium transition-all ${
                    orderedSamples.length > 0
                      ? 'bg-[#24211d] text-[#f4f1ea] hover:bg-[#3d3832] cursor-pointer'
                      : 'bg-[#ded8cb] text-[#7a7164] cursor-not-allowed'
                  }`}
                >
                  {boxOrdered ? '✓ Sample Box Dispatched!' : 'Request Complimentary Folio'}
                </button>
              </div>
              {boxOrdered && (
                <div className="mt-3 text-xs text-[#2b6436] font-medium animate-fade-in p-3 bg-white/80 border border-[#c5d8c3] rounded">
                  ✓ Interactive Portfolio Preview: Sample folio request recorded! In production, physical stone/timber specimens are hand-packaged in linen folios and dispatched to verified trade studios.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
