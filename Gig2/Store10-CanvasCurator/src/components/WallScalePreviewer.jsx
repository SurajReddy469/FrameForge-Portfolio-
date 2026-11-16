import React, { useState } from 'react';
import { ART_EDITIONS, WALL_COLOR_OPTIONS, FRAME_OPTIONS } from '../data/artData';
import { ShieldCheck, Award, Ruler, Layers } from 'lucide-react';

export default function WallScalePreviewer({ selectedArtwork, onAddToCartWithFrame }) {
  const [activeArt, setActiveArt] = useState(selectedArtwork || ART_EDITIONS[0]);
  const [activeWallColor, setActiveWallColor] = useState(WALL_COLOR_OPTIONS[0]);
  const [activeFrame, setActiveFrame] = useState(FRAME_OPTIONS[0]);
  const [framedAdded, setFramedAdded] = useState(false);

  // If prop changes, sync
  React.useEffect(() => {
    if (selectedArtwork) {
      setActiveArt(selectedArtwork);
    }
  }, [selectedArtwork]);

  const totalFramedPrice = activeArt.price + activeFrame.addCost;
  const cartLineId = `${activeArt.id}-framed-${activeFrame.id}`;

  const handleAcquireFramed = () => {
    const item = {
      ...activeArt,
      id: activeArt.id,
      cartLineId,
      name: `${activeArt.name} (${activeFrame.name} Framing)`,
      price: totalFramedPrice,
      priceFormatted: `$${totalFramedPrice.toLocaleString()} USD`,
      category: "Bespoke Framed Edition",
      frameChoice: activeFrame.name,
      image: activeArt.image,
      description: `${activeArt.medium}. Hand-framed in ${activeFrame.name} with 99% UV Tru Vue Museum Glass.`
    };
    if (onAddToCartWithFrame) {
      onAddToCartWithFrame(item);
    }
    setFramedAdded(true);
    setTimeout(() => setFramedAdded(false), 3000);
  };

  return (
    <section id="wall-preview" className="py-24 bg-[#fafafa] border-b border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#888888] block mb-2 font-medium">
            Virtual Gallery Wall Simulation
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#111111] font-gallery tracking-tight mb-4">
            Living Room Scale Visualizer
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
            Test how artwork proportions, custom timber frames, and different ambient wall pigments interact with your interior space before acquiring.
          </p>
        </div>

        {/* Visualizer Canvas Area with Side Curatorial Dossier Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visualizer Stage (8 cols) */}
          <div
            className="lg:col-span-8 relative rounded-sm overflow-hidden p-8 sm:p-12 flex flex-col items-center justify-between min-h-[460px] border border-[#e5e5e5] shadow-inner transition-colors duration-500"
            style={{ backgroundColor: activeWallColor.hex }}
          >
            {/* Wall light spot */}
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />

            {/* Artwork on Wall */}
            <div className="relative z-10 my-auto flex flex-col items-center">
              {/* Museum framed container */}
              <div
                className="p-3 shadow-2xl transition-all duration-300 relative group"
                style={{
                  backgroundColor: activeFrame.borderHex,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)"
                }}
              >
                {/* White museum mat border */}
                <div className="bg-white p-4 sm:p-6 shadow-inner">
                  <img
                    src={activeArt.image}
                    alt={activeArt.name}
                    className="w-48 sm:w-64 md:w-72 aspect-[4/3] object-cover filter contrast-105"
                  />
                </div>
              </div>

              {/* Brass gallery plaque */}
              <div className="mt-4 bg-[#e8e4dc] border border-[#b8b09d] px-3 py-1 shadow-sm text-center">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#3a352a]">
                  {activeArt.name} &bull; {activeArt.artist.split('(')[0]}
                </span>
              </div>
            </div>

            {/* Modern Minimalist Credenza at Base */}
            <div className="w-3/4 max-w-md h-5 bg-[#3a2e26] shadow-lg rounded-t-sm border-t border-black/20 mt-8 relative z-10 flex justify-center">
              <span className="text-[8px] uppercase tracking-widest text-[#9e8f81] -top-4 absolute select-none">
                Standard 72" Floating Credenza Reference
              </span>
            </div>
          </div>

          {/* Curatorial Dossier & Scale Specs (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#e5e5e5] p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="border-b border-[#e5e5e5] pb-3">
                <span className="text-[10px] uppercase tracking-widest text-[#888888] block">
                  PHYSICAL SCALE & EDITION SPECS
                </span>
                <h3 className="text-xl font-normal font-gallery text-[#111111] mt-1">
                  {activeArt.name}
                </h3>
                <p className="text-xs text-[#777777] font-medium mt-0.5">
                  {activeArt.artist}
                </p>
              </div>

              {/* Dimensions callout */}
              <div className="p-3 bg-[#fafafa] border border-[#e5e5e5] space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-[#111111]">
                  <Ruler className="w-3.5 h-3.5 text-[#777777]" />
                  <span>Unframed Dimensions:</span>
                </div>
                <div className="text-sm font-mono font-bold text-[#111111]">
                  {activeArt.dimensions || '36 × 48 in (91 × 122 cm)'}
                </div>
                <div className="text-[10px] text-[#777777]">
                  Framed with 2.5" 8-ply cotton mat: +5 in on height and width
                </div>
              </div>

              {/* Edition Availability */}
              <div className="p-3 bg-[#fafafa] border border-[#e5e5e5] space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-[#111111]">
                  <Layers className="w-3.5 h-3.5 text-[#777777]" />
                  <span>Curatorial Edition & Limitation:</span>
                </div>
                <div className="text-xs font-semibold text-[#2b6436]">
                  {activeArt.edition || 'Edition of 50 (Hand-Numbered & Signed)'}
                </div>
                <div className="text-[10px] text-[#777777]">
                  Cataloged in artist raisonné archive with dual tamper-evident hologram
                </div>
              </div>

              {/* Substrate Medium */}
              <div className="text-xs text-[#555555] space-y-1 pt-1">
                <span className="text-[10px] uppercase tracking-wider text-[#888888] block">Substrate & Pigment</span>
                <p className="text-[11px] leading-relaxed">
                  {activeArt.medium}
                </p>
              </div>
            </div>

            {/* Quick Framing Total & Action */}
            <div className="pt-4 border-t border-[#e5e5e5] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest text-[#777777]">Framed Total</span>
                <span className="text-xl font-gallery text-[#111111]">
                  ${totalFramedPrice.toLocaleString()} USD
                </span>
              </div>
              <button
                type="button"
                onClick={handleAcquireFramed}
                className="w-full py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors cursor-pointer shadow-md"
              >
                {framedAdded ? '✓ Added Framed Work!' : `Acquire with ${activeFrame.name}`}
              </button>
            </div>
          </div>
        </div>

        {/* Controls Toolbar Below Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 bg-white p-6 sm:p-8 border border-[#e5e5e5]">
          {/* 1. Select Artwork */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#888888] font-medium mb-3">
              1. Choose Artwork
            </h4>
            <div className="space-y-2">
              {ART_EDITIONS.map((art) => (
                <button
                  key={art.id}
                  onClick={() => setActiveArt(art)}
                  className={`w-full text-left px-3 py-2 text-xs border transition-all truncate cursor-pointer ${
                    activeArt.id === art.id
                      ? 'bg-[#111111] text-white border-[#111111] font-medium'
                      : 'bg-transparent text-[#444444] border-[#e5e5e5] hover:border-[#111111]'
                  }`}
                >
                  {art.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Select Wall Paint Color */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#888888] font-medium mb-3">
              2. Test Wall Paint Color
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {WALL_COLOR_OPTIONS.map((wall) => (
                <button
                  key={wall.id}
                  onClick={() => setActiveWallColor(wall)}
                  className={`flex items-center gap-2.5 p-2 text-xs border transition-all cursor-pointer ${
                    activeWallColor.id === wall.id
                      ? 'border-[#111111] bg-[#fafafa] font-medium'
                      : 'border-[#e5e5e5] hover:border-[#888888]'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 flex-shrink-0"
                    style={{ backgroundColor: wall.hex }}
                  />
                  <span className="truncate">{wall.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Select Frame Finish */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#888888] font-medium mb-3">
              3. Choose Hardwood Float Frame
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {FRAME_OPTIONS.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setActiveFrame(frame)}
                  className={`flex items-center gap-2 p-2 text-xs border transition-all cursor-pointer ${
                    activeFrame.id === frame.id
                      ? 'border-[#111111] bg-[#fafafa] font-medium'
                      : 'border-[#e5e5e5] hover:border-[#888888]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 border border-black/20 flex-shrink-0"
                    style={{ backgroundColor: frame.borderHex }}
                  />
                  <span className="truncate text-[11px]">{frame.name} (+${frame.addCost})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}