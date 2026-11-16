import React, { useState } from 'react';
import { ShoppingBag, Sliders, Menu, X, Sparkles, Terminal } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenFitFinder, onOpenDropPass, activeSize }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505] border-b-2 border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#ccff00] inline-block"></span>
            <span className="font-display font-black text-2xl tracking-tighter text-white">
              ZERO//GRAVITY
            </span>
            <span className="text-[10px] bg-[#1a1a1a] text-[#ccff00] px-2 py-0.5 border border-[#333] font-mono">
              NYC 2026
            </span>
          </a>
        </div>

        {/* Clean Season Badge */}
        <div className="hidden lg:flex items-center gap-2 bg-[#111111] px-3.5 py-1.5 border border-[#262626] font-mono text-xs text-neutral-300">
          <Terminal className="w-3.5 h-3.5 text-[#ccff00]" />
          <span>EDITION 004 // 550 GSM COTTON & FIDLOCK</span>
          {activeSize && (
            <span className="ml-2 px-1.5 py-0.5 bg-[#ccff00] text-black font-bold text-[10px]">
              FIT: {activeSize}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenFitFinder}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] hover:bg-[#1a1a1a] border border-[#333] text-xs font-mono text-neutral-300 hover:text-white transition cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Fit Diagnostic {activeSize ? `(${activeSize})` : ''}</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative px-4 py-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 brutal-shadow cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="px-1.5 py-0.2 bg-black text-[#ccff00] text-[11px] font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#ccff00]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#0c0c0c] border-b-2 border-[#222] p-4 space-y-3 font-mono text-xs">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenFitFinder();
            }}
            className="w-full py-2.5 px-3 bg-[#161616] border border-[#333] text-[#ccff00] font-bold flex items-center justify-between"
          >
            <span>Drape Fit Diagnostic</span>
            <span>{activeSize ? `Active: ${activeSize}` : 'Calibrate'}</span>
          </button>
          <div className="text-[11px] text-neutral-400 pt-1 px-1">
            Brooklyn Dispatch • 550 GSM Heavy Fleece • Cobra Hardware
          </div>
        </div>
      )}
    </header>
  );
}
