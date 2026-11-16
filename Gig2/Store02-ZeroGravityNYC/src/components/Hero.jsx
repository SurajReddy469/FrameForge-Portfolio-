import React from 'react';
import { Flame, ArrowDown, ShieldAlert, Zap } from 'lucide-react';

export default function Hero({ onOpenFitFinder }) {
  const scrollToProducts = () => {
    document.getElementById('drop-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#222222] bg-[#050505]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Brutalist Typography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#ccff00] text-xs font-mono text-[#ccff00]">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
            <span>SYSTEM DROP 004 // ARCHITECTURAL UTILITY</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter uppercase text-white leading-none">
            CYBER<br />
            <span className="text-[#ccff00]">DRAPING.</span>
          </h1>

          <p className="text-neutral-400 font-mono text-sm sm:text-base max-w-lg leading-relaxed">
            Constructed from high-tensile eVent® waterproof membranes, 550 GSM French terry, and aerospace Fidlock magnetic hardware. Engineered in Brooklyn, NY.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={scrollToProducts}
              className="px-8 py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono font-black text-xs uppercase tracking-widest transition brutal-shadow flex items-center gap-2"
            >
              <span>Secure Drop 004 Piece</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenFitFinder}
              className="px-8 py-4 bg-[#111111] hover:bg-[#1a1a1a] border-2 border-white text-white font-mono text-xs uppercase tracking-widest transition brutal-shadow-white"
            >
              Drape Fit Diagnostic
            </button>
          </div>

          {/* Technical Specs Pill Bar */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#222222] text-xs font-mono">
            <div>
              <span className="text-neutral-500 block text-[10px]">EDITION</span>
              <span className="text-white font-bold">150 Units Total</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">WEIGHT</span>
              <span className="text-[#ccff00] font-bold">550 GSM Terry</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">HARDWARE</span>
              <span className="text-white font-bold">Fidlock V-Buckles</span>
            </div>
          </div>
        </div>

        {/* Right Streetwear Image Hero Box */}
        <div className="lg:col-span-5 relative">
          <div className="relative border-2 border-white p-3 bg-[#111111] brutal-shadow">
            <div className="aspect-[4/5] overflow-hidden bg-black relative">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
                alt="ZERO//GRAVITY EXO-V4 Tactical Shell"
                className="w-full h-full object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-4 right-4 bg-black border border-[#ccff00] text-[#ccff00] px-3 py-1 font-mono text-xs font-bold uppercase">
                ONLY 4 PCS IN SIZE L
              </div>
            </div>

            <div className="mt-3 p-3 bg-black border border-[#333] flex items-center justify-between font-mono text-xs">
              <span className="text-white font-bold">EXO-V4 TACTICAL SHELL</span>
              <span className="text-[#ccff00] font-bold">$380 USD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
