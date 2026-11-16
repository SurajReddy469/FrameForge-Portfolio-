import React from 'react';
import { ShoppingBag, Zap, Flame } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenWindTunnel }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0a0f1d]/90 border-b border-[#1a233a] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#00f0ff] flex items-center justify-center text-black font-black text-sm italic font-sport">
            VC
          </div>
          <div className="flex flex-col">
            <span className="font-sport font-black text-2xl tracking-tighter text-white uppercase italic">
              VELO<span className="text-[#00f0ff]">CORE</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-neutral-400">
              Geneva • Boulder
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sport uppercase tracking-wider text-neutral-400 italic">
          <a href="#apparel" className="hover:text-[#00f0ff] transition">Pro-Tour Cycling</a>
          <a href="#apparel" className="hover:text-[#00f0ff] transition">Marathon & Trail</a>
          <a href="#thermal-map" className="hover:text-[#00f0ff] transition">Thermal Simulation</a>
          <a href="#aerodynamics" className="hover:text-[#00f0ff] transition">Wind Tunnel Lab</a>
        </nav>

        {/* Cart */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenWindTunnel}
            className="hidden sm:inline-flex px-4 py-2 rounded border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black text-xs font-mono transition cursor-pointer"
          >
            Wind Tunnel CdA
          </button>

          <button
            onClick={onOpenCart}
            className="relative px-5 py-2.5 rounded bg-[#00f0ff] hover:bg-[#33f3ff] text-black font-sport font-black text-xs uppercase tracking-wider transition italic flex items-center gap-2 shadow-lg shadow-[#00f0ff]/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="px-1.5 py-0.5 bg-black text-[#00f0ff] font-bold text-[10px] rounded font-mono">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
