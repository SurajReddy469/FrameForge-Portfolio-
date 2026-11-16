import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Compass, Award } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenSalonModal }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090a0c]/90 border-b border-[#22242a] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.25em] text-white">
              VANGUARD
            </span>
            <span className="text-[9px] font-mono tracking-[0.35em] text-[#d4af37] uppercase">
              GENÈVE • CHRONO
            </span>
          </a>
        </div>

        {/* Navigation Links - Collapse earlier (lg instead of md) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest text-neutral-400 uppercase">
          <a href="#collection" className="hover:text-[#d4af37] transition">Grandes Complications</a>
          <a href="#comparison" className="hover:text-[#d4af37] transition">Calibre Comparison</a>
          <a href="#provenance" className="hover:text-[#d4af37] transition">Provenance Registry</a>
          <a href="#salons" className="hover:text-[#d4af37] transition">Atelier & Salons</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={onOpenSalonModal}
            className="hidden sm:inline-flex px-4 py-2 rounded-full border border-[#d4af37]/60 text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-mono text-[11px] tracking-widest uppercase transition-all cursor-pointer"
          >
            Private Viewing
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2 text-neutral-300 hover:text-[#d4af37] transition cursor-pointer"
            title="Shopping Trunk"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d4af37] text-black font-bold text-[10px] flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0e12] border-b border-[#22242a] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-xs font-mono tracking-widest uppercase text-neutral-300">
            <a
              href="#collection"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 hover:text-[#d4af37] border-b border-white/5"
            >
              Grandes Complications
            </a>
            <a
              href="#comparison"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 hover:text-[#d4af37] border-b border-white/5"
            >
              Calibre Comparison
            </a>
            <a
              href="#provenance"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 hover:text-[#d4af37] border-b border-white/5"
            >
              Provenance Registry
            </a>
            <a
              href="#salons"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 hover:text-[#d4af37] border-b border-white/5"
            >
              Atelier & Salons
            </a>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSalonModal();
              }}
              className="w-full py-3 rounded-xl bg-[#d4af37] text-black font-mono text-xs uppercase tracking-widest font-bold"
            >
              Request Private Salon
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
