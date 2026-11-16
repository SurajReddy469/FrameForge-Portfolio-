import React from 'react';

export default function Hero({ onOpenLightingSimulator }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center border-b border-[#e5e5e5] overflow-hidden bg-[#fafafa]">
      {/* Background Museum Wall Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=2000&q=85"
          alt="Fine Art Museum Exhibition"
          className="w-full h-full object-cover object-center filter opacity-20 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
        <div className="inline-flex items-center gap-2 border border-[#d5d5d5] px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm mb-6 text-xs uppercase tracking-[0.25em] text-[#555555]">
          <span>Spring Salon MMXXVI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#111111]"></span>
          <span>Archival Giclée & Originals</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#111111] font-gallery leading-tight mb-8">
          Art That Reshapes <br className="hidden sm:inline" />
          <span className="italic font-light">The Architecture of Home.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#555555] font-light leading-relaxed mb-10">
          Strictly limited edition giclées and rare originals from rising European and Scandinavian contemporary artists. Numbered by hand, stamped with gallery provenance, and mounted in solid timber float frames.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#editions"
            className="w-full sm:w-auto px-8 py-4 bg-[#111111] text-[#ffffff] uppercase text-xs tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors shadow-lg"
          >
            Explore The Editions
          </a>
          <button
            type="button"
            onClick={onOpenLightingSimulator}
            className="w-full sm:w-auto px-8 py-4 border border-[#111111] text-[#111111] uppercase text-xs tracking-[0.2em] font-medium hover:bg-[#111111] hover:text-[#ffffff] transition-all cursor-pointer"
          >
            Museum Optics Simulator
          </button>
        </div>

        {/* Curation specs */}
        <div className="mt-16 pt-8 border-t border-[#e5e5e5] grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto text-[#111111]">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#888888]">Substrate</div>
            <div className="text-sm font-light text-[#111111]">Hahnemühle 308gsm Rag</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#888888]">Glass Standard</div>
            <div className="text-sm font-light text-[#111111]">99% Anti-Reflective UV</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#888888]">Limitation</div>
            <div className="text-sm font-light text-[#111111]">Strict 30–75 Cap Prints</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#888888]">Courier</div>
            <div className="text-sm font-light text-[#111111]">Insured Wooden Art Crate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
