import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenTagMonogramStudio }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fcfaf4]/90 backdrop-blur-md border-b border-[#e5ded0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Navigation Links Left */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-[#556352]">
          <a href="#gear" className="hover:text-[#2c332b] transition-colors">Field Gear</a>
          <a href="#sizing-guide" className="hover:text-[#2c332b] transition-colors">Sizing Diagnostic</a>
          <a href="#materials" className="hover:text-[#2c332b] transition-colors">English Bridle Leather</a>
          <a href="#guarantee" className="hover:text-[#2c332b] transition-colors">Chew Guarantee</a>
        </nav>

        {/* Brand Center */}
        <div className="text-center">
          <a href="#" className="inline-block">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2c332b] font-brand uppercase">
              PAW & COBBLE
            </h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#798875] font-bold">
              EST. 2021 &bull; CANINE FIELD GOODS
            </p>
          </a>
        </div>

        {/* Right Action / Cart */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={onOpenTagMonogramStudio}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#445341] hover:text-[#2c322b] border-b-2 border-[#445341] pb-0.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Brass Tag Studio</span>
          </button>
          
          <button
            onClick={onOpenCart}
            className="relative flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#445341] text-[#fcfaf4] hover:bg-[#323d30] transition-all duration-300 text-xs uppercase tracking-wider font-bold cursor-pointer shadow-sm"
            aria-label="View Adventure Pack"
          >
            <span>Pack</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#fcfaf4] text-[#445341] text-[10px] font-extrabold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#445341] hover:text-[#2c322b] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#445341]" /> : <Menu className="w-6 h-6 text-[#445341]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#f4efe4] border-b border-[#e5ded0] px-6 py-4 space-y-3 text-xs uppercase font-bold text-[#556352]">
          <a
            href="#gear"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#2c322b] border-b border-[#e5ded0]"
          >
            Canine Field Gear
          </a>
          <a
            href="#sizing-guide"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#2c322b] border-b border-[#e5ded0]"
          >
            Breed Sizing Diagnostic
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenTagMonogramStudio();
              }}
              className="w-full py-2.5 bg-[#445341] text-[#fcfaf4] font-bold rounded-lg"
            >
              Open Solid Brass Tag Monogram Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
