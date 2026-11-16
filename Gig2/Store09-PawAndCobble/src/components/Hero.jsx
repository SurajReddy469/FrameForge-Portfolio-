import React from 'react';

export default function Hero({ onOpenTagMonogramStudio }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center border-b border-[#e5ded0] overflow-hidden bg-[#f7f2e7]">
      {/* Background Dog Adventure Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=85"
          alt="Dogs running outdoors"
          className="w-full h-full object-cover object-center filter opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfaf4] via-transparent to-[#fcfaf4]/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
        <div className="inline-flex items-center gap-2 border border-[#cfc5b4] px-4 py-1.5 rounded-full bg-[#fcfaf4]/90 backdrop-blur-sm mb-6 text-xs uppercase tracking-wider text-[#445341] font-bold">
          <span>Scandinavian Pet Design</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#445341]"></span>
          <span>100% Waterproof & Odor-Free</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#2c332b] font-brand leading-tight mb-8">
          Elevated Essentials <br className="hidden sm:inline" />
          <span className="text-[#445341] underline decoration-[#a5b9a2]">For Modern Hounds.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#556352] font-normal leading-relaxed mb-10">
          Engineered from waterproof wipe-clean BioThane, solid marine brass, and recycled marine memory foam. Gear crafted to withstand muddy forest trails and look effortless in the city.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#shop"
            className="w-full sm:w-auto px-8 py-4 bg-[#445341] text-[#fcfaf4] uppercase text-xs tracking-wider font-bold rounded-full hover:bg-[#323d30] transition-colors shadow-lg"
          >
            Shop All-Weather Walk Sets
          </a>
          <button
            type="button"
            onClick={onOpenTagMonogramStudio}
            className="w-full sm:w-auto px-8 py-4 border-2 border-[#445341] text-[#445341] uppercase text-xs tracking-wider font-bold rounded-full hover:bg-[#445341] hover:text-[#fcfaf4] transition-all cursor-pointer"
          >
            Brass Tag Studio
          </button>
        </div>

        {/* Feature badges */}
        <div className="mt-16 pt-8 border-t border-[#e5ded0] grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#798875] font-bold">Hygiene</div>
            <div className="text-sm font-bold text-[#2c332b]">Zero Mold or Stink</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#798875] font-bold">Hardware</div>
            <div className="text-sm font-bold text-[#2c332b]">Solid Cast Brass Buckles</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#798875] font-bold">Guarantee</div>
            <div className="text-sm font-bold text-[#2c332b]">100-Day Chewing Replacement</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#798875] font-bold">Impact</div>
            <div className="text-sm font-bold text-[#2c332b]">1% Donated to Shelters</div>
          </div>
        </div>
      </div>
    </section>
  );
}
