import React, { useState } from 'react';
import { ShoppingBag, Coffee, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenBrewTimer }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#fcfaf7]/90 border-b border-[#ebdcc7] transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#2b1d14]">
              NORDIC ROAST CO.
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8c7462] uppercase">
              COPENHAGEN • SPECIALTY ROASTERS
            </span>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-[#594637] uppercase">
          <a href="#micro-lots" className="hover:text-[#2b1d14] transition">Current Harvest</a>
          <a href="#roastery" className="hover:text-[#2b1d14] transition">Loring S35 Kestrel</a>
          <a href="#subscriptions" className="hover:text-[#2b1d14] transition">Roaster's Club</a>
          <button onClick={onOpenBrewTimer} className="text-[#2b1d14] font-bold hover:underline cursor-pointer">
            Brew Ratio Tool
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBrewTimer}
            className="hidden sm:inline-flex px-4 py-2 rounded-full border border-[#2b1d14] text-[#2b1d14] hover:bg-[#2b1d14] hover:text-[#fcfaf7] font-mono text-xs transition cursor-pointer"
          >
            Timer Tool
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-[#ebdcc7] text-[#2b1d14] hover:bg-[#dfcdb5] transition cursor-pointer"
            title="Coffee Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2b1d14] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#594637] hover:text-[#2b1d14] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#2b1d14]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#f5ede2] border-b border-[#ebdcc7] px-6 py-4 space-y-3 font-mono text-xs uppercase">
          <a
            href="#micro-lots"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#2b1d14] border-b border-[#ebdcc7]"
          >
            Current Harvest Offerings
          </a>
          <a
            href="#roastery"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#2b1d14] border-b border-[#ebdcc7]"
          >
            Loring S35 Roasting
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBrewTimer();
              }}
              className="w-full py-3 rounded-xl bg-[#2b1d14] text-[#fcfaf7] text-xs font-bold"
            >
              Open Brew Ratio Calculator
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
