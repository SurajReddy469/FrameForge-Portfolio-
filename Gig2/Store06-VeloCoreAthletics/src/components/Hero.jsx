import React from 'react';
import { ArrowRight, Zap, Gauge, Flame, Wind } from 'lucide-react';

export default function Hero({ onOpenWindTunnel }) {
  const scrollToApparel = () => {
    document.getElementById('apparel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1a233a] bg-gradient-to-b from-[#0a0f1d] via-[#0d1428] to-[#0a0f1d]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0f1b36] border border-[#00f0ff]/40 text-xs font-mono text-[#00f0ff]">
            <Gauge className="w-3.5 h-3.5" /> AERODYNAMIC ESTIMATE MODEL (CdA ~0.218 m²)
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-sport font-black uppercase text-white tracking-tight leading-none italic">
            KINETIC <br />
            <span className="sport-gradient-text">CADENCE.</span>
          </h1>

          <p className="text-neutral-300 font-normal text-sm sm:text-base max-w-lg leading-relaxed">
            Engineered in Boulder, Colorado. Swiss dimpled aerodynamic fabrics, bonded seamless friction-free joints, and medical-grade compression profiles for endurance athletes.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 font-sport italic text-sm">
            <button
              onClick={scrollToApparel}
              className="px-8 py-4 bg-[#00f0ff] hover:bg-[#33f3ff] text-black font-black uppercase tracking-wider transition rounded shadow-lg shadow-[#00f0ff]/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Race Day Apparel</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenWindTunnel}
              className="px-8 py-4 bg-[#11192e] border border-neutral-700 hover:border-[#00f0ff] text-white uppercase tracking-wider transition rounded flex items-center gap-2 cursor-pointer"
            >
              <Wind className="w-4 h-4 text-[#00f0ff]" />
              <span>Aero Drag Estimator</span>
            </button>
          </div>

          <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#1a233a] text-xs font-mono">
            <div>
              <span className="text-neutral-500 block text-[10px]">WIND RESISTANCE</span>
              <span className="text-white font-bold text-sm">~14W Saved (Est.)</span>
              <span className="text-neutral-500 text-[10px] block">Model at 45 km/h</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">TOTAL WEIGHT</span>
              <span className="text-[#00f0ff] font-bold text-sm">48g Shell</span>
              <span className="text-neutral-500 text-[10px] block">Ultralight Packable</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">COMPRESSION</span>
              <span className="text-white font-bold text-sm">20-30 mmHg</span>
              <span className="text-neutral-500 text-[10px] block">Zoned Gradient</span>
            </div>
          </div>
        </div>

        {/* Right Activewear Hero Box */}
        <div className="lg:col-span-5 relative">
          <div className="p-4 bg-[#11182c] border-2 border-[#1e2a4a] rounded-3xl relative shadow-2xl hyper-cyan-glow">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-black relative">
              <img
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
                alt="Aero-Stratum Carbon Cycling Bib"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#00f0ff] text-black px-3 py-1 font-sport font-black text-xs uppercase italic">
                AERO-STRATUM // CARBON BIB
              </div>
            </div>

            <div className="mt-3 p-3 bg-[#0a0f1d] border border-[#1e2a4a] rounded-xl flex items-center justify-between font-mono text-xs">
              <div>
                <span className="font-bold text-white">Swiss Schoeller® Carbon Fabric</span>
                <span className="text-[10px] text-neutral-400 block">Elastic Interface® 8h Chamois</span>
              </div>
              <span className="text-[#00f0ff] font-bold text-base font-sport italic">$240 USD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
