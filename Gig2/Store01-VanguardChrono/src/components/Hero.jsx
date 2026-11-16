import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Award, Sliders } from 'lucide-react';
import InteractiveTourbillonCaliber from './InteractiveTourbillonCaliber';

export default function Hero({ onOpenSalonModal, onOpenConfigurator }) {
  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center border-b border-[#22242a] overflow-hidden">
      {/* Background Subtle Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(212,175,55,0.08)_0%,rgba(9,10,12,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18191f] border border-[#d4af37]/30 text-xs font-mono text-[#d4af37] tracking-widest uppercase">
            <Award className="w-3.5 h-3.5" /> Poinçon de Genève Certified
          </div>

          <h1 className="text-5xl sm:text-7xl font-serif font-light text-white leading-tight">
            The Mastery of <br />
            <span className="italic font-normal gold-gradient-text">Mechanical Time.</span>
          </h1>

          <p className="text-neutral-400 font-light text-base sm:text-lg max-w-lg leading-relaxed">
            Hand-assembled in our Vallée de Joux atelier. Single-minute flying tourbillons, perpetual calendars, and high-beat chronographs forged for the connoisseur.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToCollection}
              className="px-7 py-3.5 rounded-full bg-[#d4af37] hover:bg-[#e5c14d] text-black font-mono font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#d4af37]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Masterpieces</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenConfigurator}
              className="px-6 py-3.5 rounded-full bg-[#16171d] border border-[#d4af37]/50 hover:border-[#d4af37] text-white font-mono text-xs tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>360° Configurator</span>
            </button>

            <button
              type="button"
              onClick={onOpenSalonModal}
              className="px-6 py-3.5 rounded-full border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white font-mono text-xs tracking-widest uppercase transition-all cursor-pointer"
            >
              Request Private Salon
            </button>
          </div>

          {/* Horological Micro-Metrics */}
          <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#22242a] text-xs font-mono">
            <div>
              <span className="text-neutral-500 block uppercase">OSCILLATION</span>
              <span className="text-white text-base font-serif">28,800 vph</span>
              <span className="text-neutral-500 text-[10px]">4 Hz Chronometer</span>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase">RESERVE</span>
              <span className="text-white text-base font-serif">72 Hours</span>
              <span className="text-neutral-500 text-[10px]">Twin Spring Barrels</span>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase">FINISHING</span>
              <span className="text-white text-base font-serif">Côtes de Genève</span>
              <span className="text-neutral-500 text-[10px]">Hand-Chamfered</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Caliber Showcase */}
        <div className="lg:col-span-6 relative flex justify-center">
          <InteractiveTourbillonCaliber />
        </div>
      </div>
    </section>
  );
}
