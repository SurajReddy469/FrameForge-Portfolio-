import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#2c332b] text-[#fcfaf4] border-t border-[#3c473a] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-xl font-black font-brand uppercase tracking-tight mb-4 text-[#fcfaf4]">
              PAW & COBBLE
            </h3>
            <p className="text-xs text-[#b8c5b6] font-normal leading-relaxed mb-4">
              Modern Scandinavian canine gear engineered from waterproof BioThane, cast brass, and ocean-recycled memory foam. Made for dogs that love mud, rain, and sofa snuggles.
            </p>
            <div className="text-[11px] text-[#8fa18d] space-y-1">
              <p>Studio: Vesterbrogade 44, Copenhagen V</p>
              <p>1% For The Planet &bull; Shelter Rescue Partner</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#d5e0d3] mb-4">
              Gear & Apothecary
            </h4>
            <ul className="text-xs space-y-2 text-[#b8c5b6] font-normal">
              <li><a href="#shop" className="hover:text-white transition-colors">Waterproof Walk Sets</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">CloudWeave Orthopedic Beds</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Organic Calendula Snout Balm</a></li>
              <li><a href="#sizing-guide" className="hover:text-white transition-colors">Breed Fit Calculator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#d5e0d3] mb-4">
              Customer Care
            </h4>
            <ul className="text-xs space-y-2 text-[#b8c5b6] font-normal">
              <li><a href="#care" className="hover:text-white transition-colors">100-Day Adventure Trial</a></li>
              <li><a href="#warranty" className="hover:text-white transition-colors">Chew Replacement Policy</a></li>
              <li><a href="#sizing" className="hover:text-white transition-colors">Cleaning & BioThane Care</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">Carbon-Neutral Shipping</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#d5e0d3] mb-4">
              The Trail Club
            </h4>
            <p className="text-xs text-[#b8c5b6] font-normal leading-relaxed mb-4">
              Subscribe for dog training behavioral guides, outdoor hiking routes, and new drop alerts.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Welcome to The Trail Club! Enjoy 10% off your first dog kit."); }} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="human@goodboy.com"
                required
                className="bg-[#3c473a] border border-[#50604e] px-3.5 py-2.5 text-xs text-[#fcfaf4] placeholder-[#8fa18d] rounded-lg focus:outline-none focus:border-[#d5e0d3]"
              />
              <button
                type="submit"
                className="bg-[#fcfaf4] text-[#2c332b] py-2.5 text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-[#e5ded0] transition-colors"
              >
                Join Trail Club
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#3c473a] pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#8fa18d] uppercase tracking-wider gap-4">
          <div>
            &copy; {new Date().getFullYear()} PAW & COBBLE APPS COPENHAGEN. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#fcfaf4]">Canine Welfare Standard</a>
            <a href="#" className="hover:text-[#fcfaf4]">Chew Warranty</a>
            <a href="#" className="hover:text-[#fcfaf4]">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
