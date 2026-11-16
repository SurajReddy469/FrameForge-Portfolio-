import React from 'react';
import { ArrowRight, Coffee, Award, Compass } from 'lucide-react';

export default function Hero() {
  const scrollToCoffees = () => {
    document.getElementById('micro-lots')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc7] bg-[#fbf7f2]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ebdcc7] border border-[#d8c5ab] text-xs font-mono text-[#2b1d14]">
            <Award className="w-3.5 h-3.5" /> 88.5+ SCA SPECIALTY GRADE CUPPING STANDARD
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#2b1d14] leading-tight">
            Roasted for Clarity. <br />
            <span className="italic font-normal text-[#694e39]">Cupped with Reverence.</span>
          </h1>

          <p className="text-[#594637] font-mono text-xs sm:text-sm max-w-lg leading-relaxed">
            Light Scandinavian roasting profile that preserves the terroir, floral aromatics, and crisp fruit acidity of micro-lot coffees harvested above 1,800 MASL.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
            <button
              onClick={scrollToCoffees}
              className="px-8 py-4 bg-[#2b1d14] hover:bg-[#3d2a1d] text-[#fcfaf7] font-bold uppercase tracking-wider transition rounded-lg flex items-center gap-2"
            >
              <span>Explore Fresh Roasts</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#flavor-wheel"
              className="px-8 py-4 border border-[#2b1d14] text-[#2b1d14] hover:bg-[#ebdcc7] uppercase tracking-wider transition rounded-lg"
            >
              Interactive Flavor Wheel
            </a>
          </div>

          <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#ebdcc7] text-xs font-mono">
            <div>
              <span className="text-[#8c7462] block text-[10px]">ROAST PROFILE</span>
              <span className="font-bold text-[#2b1d14] text-sm">Nordic Light</span>
              <span className="text-[#8c7462] text-[10px] block">No Char or Bitterness</span>
            </div>
            <div>
              <span className="text-[#8c7462] block text-[10px]">DIRECT TRADING</span>
              <span className="font-bold text-[#2b1d14] text-sm">3.4x Fair Trade</span>
              <span className="text-[#8c7462] text-[10px] block">Direct to Farmer</span>
            </div>
            <div>
              <span className="text-[#8c7462] block text-[10px]">WATER DEGASSING</span>
              <span className="font-bold text-[#2b1d14] text-sm">Air-Cooled</span>
              <span className="text-[#8c7462] text-[10px] block">Loring Smart Roaster</span>
            </div>
          </div>
        </div>

        {/* Right Coffee Visual Box */}
        <div className="lg:col-span-5 relative">
          <div className="p-4 bg-[#ebdcc7] rounded-2xl border-2 border-[#d8c5ab] shadow-xl">
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#2b1d14] relative">
              <img
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80"
                alt="Colombia Pink Bourbon Micro-Lot"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#2b1d14] text-[#ebdcc7] px-3 py-1 font-mono text-xs font-bold">
                90.50 SCA • PINK BOURBON
              </div>
            </div>
            <div className="mt-3 p-3 bg-white rounded-lg flex items-center justify-between font-mono text-xs">
              <div>
                <span className="font-bold text-[#2b1d14]">Colombia Huila Pink Bourbon</span>
                <span className="text-[10px] text-[#7a6453] block">White Peach • Red Currant • Honey</span>
              </div>
              <span className="text-[#2b1d14] font-bold text-base">$28 USD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
