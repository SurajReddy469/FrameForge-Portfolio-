import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenCalligraphyStudio }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#1c100c]/90 backdrop-blur-md border-b border-[#352115]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Navigation Links Left */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] text-[#ded4ca] font-light">
          <a href="#collections" className="hover:text-[#c5a059] transition-colors">Truffles</a>
          <a href="#custom-box" className="hover:text-[#c5a059] transition-colors">Sur-Mesure Ballotin</a>
          <a href="#terroirs" className="hover:text-[#c5a059] transition-colors">Grand Cru Terroirs</a>
          <a href="#maison" className="hover:text-[#c5a059] transition-colors">Héritage Paris</a>
        </nav>

        {/* Brand Center */}
        <div className="text-center">
          <a href="#" className="inline-block">
            <h1 className="text-xl sm:text-2xl font-normal tracking-[0.25em] text-[#fbf7f2] font-paris uppercase">
              MAISON CACAO
            </h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#c5a059] mt-0.5">
              PARIS &bull; DEPUIS 1894
            </p>
          </a>
        </div>

        {/* Right Action / Cart */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={onOpenCalligraphyStudio}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#c5a059] hover:text-[#fbf7f2] border-b border-[#c5a059] pb-0.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Calligraphy Studio</span>
          </button>
          
          <button
            onClick={onOpenCart}
            className="relative flex items-center space-x-2.5 px-4 py-2 border border-[#c5a059]/40 bg-[#251711] text-[#fbf7f2] hover:border-[#c5a059] transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer rounded-sm"
            aria-label="View Shopping Panier"
          >
            <span>Panier</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#c5a059] text-[#1c100c] text-[10px] font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#c5a059] hover:text-[#fbf7f2] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#c5a059]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#160d09] border-b border-[#352115] px-6 py-4 space-y-3 font-paris text-sm text-[#ded4ca]">
          <a
            href="#collections"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#fbf7f2] border-b border-[#352115]"
          >
            Grand Cru Truffles
          </a>
          <a
            href="#custom-box"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#fbf7f2] border-b border-[#352115]"
          >
            Sur-Mesure 16-Piece Ballotin
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCalligraphyStudio();
              }}
              className="w-full py-2.5 bg-[#c5a059] text-[#1c100c] font-bold text-xs uppercase tracking-widest rounded"
            >
              Gold Calligraphy Gift Card Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
