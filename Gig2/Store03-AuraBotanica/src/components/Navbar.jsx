import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenQuiz }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#fbf8f5]/90 border-b border-[#ede8e1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-[#2c322b]">
              Aura Botanica
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#788574]">
              Kyoto • Copenhagen
            </span>
          </a>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide text-[#596455] uppercase">
          <a href="#routines" className="hover:text-[#2c322b] transition">Clinical Routines</a>
          <a href="#actives" className="hover:text-[#2c322b] transition">Ferments & Ceramides</a>
          <a href="#botanicals" className="hover:text-[#2c322b] transition">Our Sourcing</a>
          <button onClick={onOpenQuiz} className="text-[#3e473d] font-bold hover:underline cursor-pointer">
            Skin Diagnostic
          </button>
        </nav>

        {/* Cart & Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuiz}
            className="hidden sm:inline-flex px-4 py-2 rounded-full border border-[#3e473d] text-[#3e473d] hover:bg-[#3e473d] hover:text-[#fbf8f5] text-xs transition cursor-pointer"
          >
            Routine Finder
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-[#f0eae1] text-[#2c322b] hover:bg-[#e6ddcf] transition cursor-pointer"
            title="Your Basket"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3e473d] text-[#fbf8f5] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#596455] hover:text-[#2c322b] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#3e473d]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#f7f2eb] border-b border-[#ede8e1] px-6 py-4 space-y-3 font-serif text-sm">
          <a
            href="#routines"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#2c322b] border-b border-[#ede8e1]"
          >
            Clinical Routines
          </a>
          <a
            href="#actives"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#2c322b] border-b border-[#ede8e1]"
          >
            Ferments & Ceramides
          </a>
          <a
            href="#botanicals"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#2c322b] border-b border-[#ede8e1]"
          >
            Organic Botanical Sourcing
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full py-3 rounded-full bg-[#3e473d] text-[#fbf8f5] text-xs font-sans uppercase tracking-wider font-medium"
            >
              Start Skin Diagnostic
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
