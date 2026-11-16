import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenLightingSimulator }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Navigation Links Left */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-normal uppercase tracking-[0.2em] text-[#555555]">
          <a href="#editions" className="hover:text-[#111111] transition-colors">Editions & Originals</a>
          <a href="#wall-preview" className="hover:text-[#111111] transition-colors">Room Visualizer</a>
          <a href="#framing" className="hover:text-[#111111] transition-colors">Bespoke Framing</a>
          <a href="#artists" className="hover:text-[#111111] transition-colors">Curated Artists</a>
        </nav>

        {/* Brand Center */}
        <div className="text-center">
          <a href="#" className="inline-block">
            <h1 className="text-2xl sm:text-3xl font-normal tracking-[0.12em] text-[#111111] font-gallery">
              CANVAS & CURATOR
            </h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#777777] mt-0.5 font-sans">
              CONTEMPORARY EDITIONS &bull; LONDON
            </p>
          </a>
        </div>

        {/* Right Action / Cart */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={onOpenLightingSimulator}
            className="hidden sm:inline-block text-xs uppercase tracking-wider text-[#555555] hover:text-[#111111] border-b border-[#111111] pb-0.5 cursor-pointer"
          >
            Museum Lighting Optics
          </button>
          
          <button
            onClick={onOpenCart}
            className="relative flex items-center space-x-2.5 px-4 py-2 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#ffffff] transition-all duration-300 text-xs uppercase tracking-widest font-normal cursor-pointer rounded-sm"
            aria-label="View Art Acquisitions"
          >
            <span>Acquisitions</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#111111] text-[#ffffff] text-[10px] font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#111111] hover:text-[#555] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#111]" /> : <Menu className="w-6 h-6 text-[#111]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#fafafa] border-b border-[#e5e5e5] px-6 py-4 space-y-3 text-xs uppercase tracking-wider text-[#555555]">
          <a
            href="#editions"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#111] border-b border-[#e5e5e5]"
          >
            Limited Editions & Originals
          </a>
          <a
            href="#wall-preview"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#111] border-b border-[#e5e5e5]"
          >
            Scale Wall Stager
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLightingSimulator();
              }}
              className="w-full py-2.5 border border-[#111] text-[#111] font-bold text-xs uppercase tracking-widest rounded"
            >
              Open Museum Optics Simulator
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
