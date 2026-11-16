import React, { useState } from 'react';
import { Sparkles, Droplets, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export default function HydrationBeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#e8e4de] bg-[#f7f4ef]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ece8e1] border border-[#3e473d]/20 text-xs font-sans text-[#3e473d] mb-3">
            <Droplets className="w-3.5 h-3.5 text-[#3e473d]" /> CLINICAL DERMATOLOGY 14-DAY BENCHMARK
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#2c322b] tracking-tight">
            Cellular Moisture Barrier Restoration
          </h2>
          <p className="mt-4 text-neutral-600 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            Drag the interactive slider below to observe clinical trans-epidermal hydration and lipid barrier sealing over 14 days of botanical fermented rice and bakuchiol application.
          </p>
        </div>

        {/* Interactive Comparison Slider Arena */}
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-3xl border border-[#e8e4de] shadow-xl">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize">
            {/* Base Image (After: Dewy / Hydrated Glass Skin) */}
            <img
              src="https://images.unsplash.com/photo-1512290900672-1f55b9a473be?auto=format&fit=crop&w=1200&q=85"
              alt="Day 14 Restored Skin"
              className="absolute inset-0 w-full h-full object-cover filter brightness-105 saturate-110"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-serif text-[#3e473d] shadow-sm">
              Day 14: Restored Lipid Dew (+42% Hydration)
            </div>

            {/* Clipped Overlay Image (Before: Dry / Stressed Skin) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85"
                alt="Day 0 Dehydrated Skin"
                className="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-90 saturate-75"
                style={{ width: '100%', maxWidth: 'none' }}
              />
              <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-serif text-white shadow-sm">
                Day 0: Compromised Moisture Barrier
              </div>
            </div>

            {/* Draggable Vertical Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-white text-[#3e473d] shadow-2xl border-2 border-[#3e473d] flex items-center justify-center font-bold text-xs">
                ⇄
              </div>
            </div>

            {/* Invisible Range Input for accessibility and touch dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
              aria-label="Before and after moisture comparison slider"
            />
          </div>

          {/* Clinical Telemetry Bar */}
          <div className="mt-6 pt-4 border-t border-[#e8e4de] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-[#fbf8f5] rounded-xl border border-[#e8e4de]">
              <span className="text-xs text-neutral-500 uppercase block">EPIDERMAL HYDRATION</span>
              <span className="text-2xl font-serif text-[#3e473d] font-bold">+42.6%</span>
              <span className="text-[11px] text-neutral-400 block">Corneometer Assay</span>
            </div>
            <div className="p-3 bg-[#fbf8f5] rounded-xl border border-[#e8e4de]">
              <span className="text-xs text-neutral-500 uppercase block">TEWL BARRIER LOSS</span>
              <span className="text-2xl font-serif text-[#3e473d] font-bold">-38.2%</span>
              <span className="text-[11px] text-neutral-400 block">Tewameter Clinical Trial</span>
            </div>
            <div className="p-3 bg-[#fbf8f5] rounded-xl border border-[#3e473d]/30 shadow-sm">
              <span className="text-xs text-[#3e473d] font-bold uppercase block">SKIN SENSITIVITY CALMING</span>
              <span className="text-2xl font-serif text-[#3e473d] font-bold">96%</span>
              <span className="text-[11px] text-neutral-500 block">Reported Zero Irritation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
