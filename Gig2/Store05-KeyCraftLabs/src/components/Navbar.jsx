import React, { useState } from 'react';
import { ShoppingBag, Sliders, Cpu, Terminal, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenSynthesizer }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#101216]/90 border-b border-[#20242c] transition-all font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#ff5722] flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#ff5722]/30">
            KC
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-2xl tracking-tight text-white uppercase">
              KEYCRAFT<span className="text-[#ff5722]">LABS</span>
            </span>
            <span className="text-[10px] tracking-widest text-neutral-400">
              Munich • Industrial Schematics
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider text-neutral-400">
          <a href="#chassis-catalog" className="hover:text-[#ff5722] transition">Chassis Catalog</a>
          <a href="#sound-tester" className="hover:text-[#ff5722] transition">Switch Acoustics</a>
          <a href="#schematics" className="hover:text-[#ff5722] transition">Gasket Mounts</a>
          <button onClick={onOpenSynthesizer} className="text-[#ff5722] font-bold hover:underline cursor-pointer">
            Keystroke Synth
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSynthesizer}
            className="hidden sm:inline-flex px-4 py-2 rounded border border-[#ff5722] text-[#ff5722] hover:bg-[#ff5722] hover:text-white text-xs transition cursor-pointer"
          >
            Acoustic Studio
          </button>

          <button
            onClick={onOpenCart}
            className="relative px-4 py-2.5 rounded bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs uppercase font-bold tracking-wider transition flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            <span className="px-1.5 py-0.5 bg-black text-[#ff5722] font-bold text-[10px] rounded">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#ff5722]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d0f13] border-b border-[#20242c] px-6 py-4 space-y-3 text-xs uppercase text-neutral-300">
          <a
            href="#chassis-catalog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-white border-b border-white/5"
          >
            Chassis Catalog (75%, 65%, Alice, Macro)
          </a>
          <a
            href="#sound-tester"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-white border-b border-white/5"
          >
            Switch Acoustic Frequency Studio
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSynthesizer();
              }}
              className="w-full py-3 rounded bg-[#ff5722] text-white font-bold"
            >
              Open Keystroke Acoustic Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
