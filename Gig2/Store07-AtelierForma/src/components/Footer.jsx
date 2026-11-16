import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#24211d] text-[#e8e4dc] border-t border-[#3e3933] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold font-arch uppercase tracking-[0.2em] mb-4 text-[#f4f1ea]">
              ATELIER FORMA
            </h3>
            <p className="text-xs text-[#a8a196] font-light leading-relaxed mb-4">
              Architectural furniture rooted in the principles of modernist balance, natural raw minerals, and enduring craftsmanship.
            </p>
            <div className="text-[11px] text-[#857d72] space-y-1">
              <p>Studio Milano: Via Tortona 31, 20144 Milano</p>
              <p>Studio Stockholm: Skeppsbron 14, 111 30</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#f4f1ea] mb-4">
              Collections
            </h4>
            <ul className="text-xs space-y-2 text-[#a8a196] font-light">
              <li><a href="#collection" className="hover:text-white transition-colors">Cantilever Seating</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Roman Travertine Tables</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Fluted Credenzas</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Architectural OLED Pendants</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#f4f1ea] mb-4">
              For Architects & Trade
            </h4>
            <ul className="text-xs space-y-2 text-[#a8a196] font-light">
              <li><a href="#materials" className="hover:text-white transition-colors">Order Swatch Folio</a></li>
              <li><a href="#trade" className="hover:text-white transition-colors">3D BIM & Revit Models</a></li>
              <li><a href="#trade" className="hover:text-white transition-colors">Contract Hospitality Specs</a></li>
              <li><a href="#trade" className="hover:text-white transition-colors">Custom Millwork Commission</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#f4f1ea] mb-4">
              Atelier Gazette
            </h4>
            <p className="text-xs text-[#a8a196] font-light leading-relaxed mb-4">
              Receive limited release previews and monographs on Scandinavian & Italian modernist design.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed to Atelier Gazette."); }} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="architect@studio.com"
                required
                className="bg-[#2f2b26] border border-[#4a443c] px-3.5 py-2.5 text-xs text-[#f4f1ea] placeholder-[#857d72] focus:outline-none focus:border-[#d4af37]"
              />
              <button
                type="submit"
                className="bg-[#f4f1ea] text-[#24211d] py-2.5 text-xs uppercase tracking-widest font-medium hover:bg-[#ded8cb] transition-colors"
              >
                Join Private Registry
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#3e3933] pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#7a7266] uppercase tracking-widest gap-4">
          <div>
            &copy; {new Date().getFullYear()} ATELIER FORMA ARCHITECTURAL OBJECTS SRL. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#f4f1ea]">Terms of Commission</a>
            <a href="#" className="hover:text-[#f4f1ea]">White Glove Logistics</a>
            <a href="#" className="hover:text-[#f4f1ea]">Provenance Verification</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
