import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenSpatialStager }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#f4f1ea]/90 backdrop-blur-md border-b border-[#ded8cb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Navigation Links Left */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium uppercase tracking-[0.2em] text-[#5c544a]">
          <a href="#collection" className="hover:text-[#24211d] transition-colors">Furniture</a>
          <a href="#materials" className="hover:text-[#24211d] transition-colors">Materials</a>
          <a href="#provenance" className="hover:text-[#24211d] transition-colors">Philosophy</a>
          <a href="#trade" className="hover:text-[#24211d] transition-colors">Trade & Architects</a>
        </nav>

        {/* Brand Center */}
        <div className="text-center">
          <a href="#" className="inline-block">
            <h1 className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#24211d] font-arch uppercase">
              ATELIER FORMA
            </h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#7a7164] mt-0.5">
              MILANO &bull; STOCKHOLM
            </p>
          </a>
        </div>

        {/* Right Action / Cart */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={onOpenSpatialStager}
            className="hidden sm:inline-block text-xs uppercase tracking-wider text-[#5c544a] hover:text-[#24211d] border-b border-[#5c544a] pb-0.5 cursor-pointer"
          >
            Spatial Stager
          </button>
          
          <button
            onClick={onOpenCart}
            className="relative flex items-center space-x-2.5 px-4 py-2 border border-[#24211d] text-[#24211d] hover:bg-[#24211d] hover:text-[#f4f1ea] transition-all duration-300 text-xs uppercase tracking-widest font-medium cursor-pointer"
            aria-label="View Acquisitions Cart"
          >
            <span>Acquisitions</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#34251f] text-[#f4f1ea] text-[10px] font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#5c544a] hover:text-[#24211d] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#24211d]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#eae6dc] border-b border-[#ded8cb] px-6 py-4 space-y-3 text-xs uppercase tracking-wider text-[#5c544a]">
          <a
            href="#collection"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#24211d] border-b border-[#ded8cb]"
          >
            Furniture Collections
          </a>
          <a
            href="#materials"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#24211d] border-b border-[#ded8cb]"
          >
            Material Provenance
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSpatialStager();
              }}
              className="w-full py-2.5 border border-[#24211d] text-[#24211d] font-bold uppercase tracking-widest"
            >
              Open Spatial Stager
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
