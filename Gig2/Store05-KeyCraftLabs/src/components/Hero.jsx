import React from 'react';
import { ArrowRight, Cpu, Layers, Terminal, Volume2 } from 'lucide-react';

export default function Hero({ onOpenSynthesizer }) {
  const scrollToCatalog = () => {
    document.getElementById('chassis-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#20242c] industrial-grid bg-[#101216]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1e24] border border-[#ff5722]/50 text-xs font-mono text-[#ff5722]">
            <Cpu className="w-3.5 h-3.5" /> GERMAN INDUSTRIAL CNC 6063 ENGINEERING
          </div>

          <h1 className="text-5xl sm:text-7xl font-heading font-black text-white uppercase tracking-tight leading-none">
            PHYSICS OF <br />
            <span className="text-[#ff5722]">KEYSTROKES.</span>
          </h1>

          <p className="text-neutral-400 font-mono text-xs sm:text-sm max-w-lg leading-relaxed">
            Milled from solid aerospace 6063 aluminum ingots at 0.01mm tolerances. Equipped with custom Poron gasket sandwiches that decouple switch resonance for pure acoustic keystroke feedback.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
            <button
              onClick={scrollToCatalog}
              className="px-8 py-4 bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold uppercase tracking-wider transition rounded shadow-lg shadow-[#ff5722]/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Custom Kits</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenSynthesizer}
              className="px-8 py-4 bg-[#1a1e24] border border-neutral-700 hover:border-[#ff5722] text-neutral-200 uppercase tracking-wider transition rounded flex items-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-[#ff5722]" />
              <span>Acoustic Synthesizer</span>
            </button>
          </div>

          {/* Technical Specs Pill Bar */}
          <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#20242c] text-xs font-mono">
            <div>
              <span className="text-neutral-500 block text-[10px]">CHASSIS MASS</span>
              <span className="text-white font-bold text-sm">2.1 kg (4.6 lbs)</span>
              <span className="text-neutral-500 text-[10px] block">Solid Brass Weight</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">MOUNTING</span>
              <span className="text-[#ff5722] font-bold text-sm">Poron Gaskets</span>
              <span className="text-neutral-500 text-[10px] block">Zero Metal Contact</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">POLLING SPEED</span>
              <span className="text-white font-bold text-sm">8,000 Hz USB</span>
              <span className="text-neutral-500 text-[10px] block">0.125ms Input Lag</span>
            </div>
          </div>
        </div>

        {/* Right Keyboard Hero Box */}
        <div className="lg:col-span-5 relative">
          <div className="p-4 bg-[#181c22] border-2 border-neutral-700 rounded-2xl relative shadow-2xl">
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-black relative">
              <img
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
                alt="KeyCraft Apex 75 Pro"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#ff5722] text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                APEX 75 PRO • CNC ALUMINUM
              </div>
            </div>

            <div className="mt-3 p-3 bg-[#101216] border border-[#262b34] rounded flex items-center justify-between font-mono text-xs">
              <div>
                <span className="font-bold text-white">75% Exploded Layout</span>
                <span className="text-[10px] text-neutral-500 block">Custom Brass Rotary Knob</span>
              </div>
              <span className="text-[#ff5722] font-bold text-base">$340 USD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
