import React from 'react';

export default function Hero({ onOpenCalligraphyStudio }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center border-b border-[#352115] overflow-hidden bg-[#160c09]">
      {/* Background Chocolaterie Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=2000&q=85"
          alt="French Artisanal Chocolate Confection"
          className="w-full h-full object-cover object-center filter brightness-40 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c100c] via-black/40 to-[#1c100c]/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
        <div className="inline-flex items-center gap-2 border border-[#5a3e2b] px-4 py-1.5 rounded-full bg-[#1c100c]/80 backdrop-blur-sm mb-6 text-xs uppercase tracking-[0.25em] text-[#c5a059]">
          <span>Maison Fondée 1924</span>
          <span className="w-1 h-1 rounded-full bg-[#c5a059]"></span>
          <span>Saint-Germain-des-Prés</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-wide text-[#fbf7f2] font-paris leading-tight mb-8">
          The Poetry of <br className="hidden sm:inline" />
          <span className="text-[#c5a059] italic">Grand Cru Cacao.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#ded4ca] font-light leading-relaxed mb-10">
          Hand-dipped single-origin ganaches, Piedmont hazelnut pralinés, and champagne-infused truffles dusted with 24-karat gold leaf. Confectioned fresh each morning in our Paris laboratory.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#coffrets"
            className="w-full sm:w-auto px-8 py-4 bg-[#c5a059] text-[#1c100c] uppercase text-xs tracking-[0.2em] font-semibold hover:bg-[#d9b674] transition-colors shadow-xl"
          >
            Explore Gift Coffrets
          </a>
          <button
            type="button"
            onClick={onOpenCalligraphyStudio}
            className="w-full sm:w-auto px-8 py-4 border border-[#c5a059]/60 text-[#fbf7f2] uppercase text-xs tracking-[0.2em] font-light hover:bg-[#c5a059]/15 transition-all cursor-pointer"
          >
            Studio Calligraphie
          </button>
        </div>

        {/* Cacao heritage notes */}
        <div className="mt-16 pt-8 border-t border-[#352115] grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto text-[#c5a059]">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9c8474]">Terroir Origin</div>
            <div className="text-sm font-light text-[#fbf7f2]">100% Single-Estate Criollo</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9c8474]">Preservation</div>
            <div className="text-sm font-light text-[#fbf7f2]">Zero Palm Oil & Artificial Sugars</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9c8474]">Artisanal Hand</div>
            <div className="text-sm font-light text-[#fbf7f2]">Hand-Decorated Gold Leaf</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#9c8474]">Logistics</div>
            <div className="text-sm font-light text-[#fbf7f2]">Thermic Insulated Courier</div>
          </div>
        </div>
      </div>
    </section>
  );
}
