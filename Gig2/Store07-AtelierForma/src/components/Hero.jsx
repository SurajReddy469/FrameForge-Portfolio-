import React from 'react';

export default function Hero({ onOpenSpatialStager }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center border-b border-[#ded8cb] overflow-hidden bg-[#ebe6dc]">
      {/* Background Architectural Image with subtle tint */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
          alt="Architectural Bauhaus Interior"
          className="w-full h-full object-cover object-center filter saturate-75 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f1ea] via-transparent to-[#f4f1ea]/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
        <div className="inline-flex items-center gap-2 border border-[#9b9183] px-4 py-1.5 rounded-full bg-[#f4f1ea]/80 backdrop-blur-sm mb-6 text-xs uppercase tracking-[0.25em] text-[#5c544a]">
          <span>Edition MMXXVI</span>
          <span className="w-1 h-1 rounded-full bg-[#34251f]"></span>
          <span>Architectural Living</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.08em] text-[#24211d] font-arch uppercase leading-tight mb-8">
          Form Follows <br className="hidden sm:inline" />
          <span className="italic font-normal">Silence.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#5c544a] font-light leading-relaxed mb-10">
          Handcrafted sculptural furniture sculpted from solid Roman travertine, American black walnut, and vegetable-tanned saddle leather. Built in small artisanal batches for contemporary spaces that value longevity over trend.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#collection"
            className="w-full sm:w-auto px-8 py-4 bg-[#24211d] text-[#f4f1ea] uppercase text-xs tracking-[0.2em] font-medium hover:bg-[#3d3832] transition-colors shadow-lg"
          >
            Explore The Collection
          </a>
          <button
            type="button"
            onClick={onOpenSpatialStager}
            className="w-full sm:w-auto px-8 py-4 border border-[#24211d] text-[#24211d] uppercase text-xs tracking-[0.2em] font-medium hover:bg-[#24211d] hover:text-[#f4f1ea] transition-all cursor-pointer"
          >
            Spatial Stager 2D
          </button>
        </div>

        {/* Architectural specs bar */}
        <div className="mt-16 pt-8 border-t border-[#ded8cb]/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#7a7164]">Origin</div>
            <div className="text-sm font-semibold tracking-wide text-[#24211d]">Milan & Stockholm</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#7a7164]">Substance</div>
            <div className="text-sm font-semibold tracking-wide text-[#24211d]">Roman Travertine & Walnut</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#7a7164]">Assurance</div>
            <div className="text-sm font-semibold tracking-wide text-[#24211d]">25-Year Structural Warranty</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#7a7164]">Delivery</div>
            <div className="text-sm font-semibold tracking-wide text-[#24211d]">White Glove In-Room Setup</div>
          </div>
        </div>
      </div>
    </section>
  );
}
