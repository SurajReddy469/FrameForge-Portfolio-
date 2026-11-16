import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white text-[#111111] border-t border-[#e5e5e5] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-xl font-normal font-gallery uppercase tracking-[0.12em] mb-4 text-[#111111]">
              CANVAS & CURATOR
            </h3>
            <p className="text-xs text-[#666666] font-light leading-relaxed mb-4">
              Curating limited edition museum-grade fine art editions and rare original works. Operating between Mayfair, London and SoHo, New York.
            </p>
            <div className="text-[11px] text-[#888888] space-y-1">
              <p>Mayfair: 14 Cork Street, London W1S 3NS</p>
              <p>SoHo: 420 West Broadway, New York, NY 10012</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111] mb-4">
              Curated Collections
            </h4>
            <ul className="text-xs space-y-2 text-[#666666] font-light">
              <li><a href="#editions" className="hover:text-black transition-colors">Archival Giclée Prints</a></li>
              <li><a href="#editions" className="hover:text-black transition-colors">Contemporary Originals</a></li>
              <li><a href="#wall-preview" className="hover:text-black transition-colors">Living Room Visualizer</a></li>
              <li><a href="#framing" className="hover:text-black transition-colors">Handmade Timber Float Frames</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111] mb-4">
              Advisory & Curators
            </h4>
            <ul className="text-xs space-y-2 text-[#666666] font-light">
              <li><a href="#advisory" className="hover:text-black transition-colors">Private Art Advisory</a></li>
              <li><a href="#architects" className="hover:text-black transition-colors">Interior Designer Trade Discount</a></li>
              <li><a href="#framing" className="hover:text-black transition-colors">Custom Framing Consultation</a></li>
              <li><a href="#shipping" className="hover:text-black transition-colors">Art Transport & White-Glove Hanging</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111] mb-4">
              Curator's Dispatch
            </h4>
            <p className="text-xs text-[#666666] font-light leading-relaxed mb-4">
              Receive private invitations to collector preview salons 48 hours before public edition launches.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Enrolled in Curator's Dispatch."); }} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="collector@residence.com"
                required
                className="bg-[#fafafa] border border-[#e5e5e5] px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#111111]"
              />
              <button
                type="submit"
                className="bg-[#111111] text-white py-2.5 text-xs uppercase tracking-widest font-medium hover:bg-[#333333] transition-colors"
              >
                Join Private Roster
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#e5e5e5] pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#888888] uppercase tracking-widest gap-4">
          <div>
            &copy; {new Date().getFullYear()} CANVAS & CURATOR FINE ART LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#111111]">Provenance Policy</a>
            <a href="#" className="hover:text-[#111111]">Certificate Registry</a>
            <a href="#" className="hover:text-[#111111]">Museum Glass Spec</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
