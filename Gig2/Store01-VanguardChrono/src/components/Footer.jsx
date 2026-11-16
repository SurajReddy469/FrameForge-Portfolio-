import React from 'react';
import { Award, ShieldCheck, MapPin } from 'lucide-react';
import { SALONS } from '../data/watchesData';

export default function Footer({ onOpenSalonModal }) {
  return (
    <footer id="salons" className="bg-[#050607] border-t border-[#22242a] text-neutral-400 text-xs">
      {/* Salons Banner */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 border-b border-[#22242a] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SALONS.map((salon) => (
          <div key={salon.city} className="space-y-1 font-mono">
            <span className="text-[#d4af37] text-[10px] uppercase tracking-widest block">MANUFACTURE SALON</span>
            <h4 className="font-serif text-2xl text-white font-normal">{salon.city}</h4>
            <p className="text-xs text-neutral-400 font-light">{salon.address}</p>
            <p className="text-[11px] text-neutral-500">{salon.country}</p>
          </div>
        ))}
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span className="font-serif text-2xl font-light text-white tracking-widest block mb-1">VANGUARD</span>
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#d4af37] block mb-4">GENÈVE • CHRONO</span>
          <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
            Independent Swiss Manufacture dedicated to the preservation of Grand Complication mechanical horology since 1892.
          </p>
        </div>

        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-[#d4af37] mb-4">Complications</h5>
          <ul className="space-y-2 text-xs font-mono text-neutral-400">
            <li><a href="#collection" className="hover:text-white transition">Flying Tourbillons</a></li>
            <li><a href="#collection" className="hover:text-white transition">Perpetual Calendars</a></li>
            <li><a href="#collection" className="hover:text-white transition">Split-Seconds Chronographs</a></li>
            <li><a href="#collection" className="hover:text-white transition">Openwork Skeletons</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-[#d4af37] mb-4">Heritage & Craft</h5>
          <ul className="space-y-2 text-xs font-mono text-neutral-400">
            <li><a href="#provenance" className="hover:text-white transition">Provenance Archives</a></li>
            <li><a href="#provenance" className="hover:text-white transition">Poinçon de Genève Seal</a></li>
            <li><a href="#provenance" className="hover:text-white transition">COSC Chronometer Testing</a></li>
            <li><a href="#heritage" className="hover:text-white transition">Vallée de Joux Atelier</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-[#d4af37] mb-4">Concierge</h5>
          <p className="text-xs font-light text-neutral-400 mb-4 leading-relaxed">
            For bespoke commissions and confidential acquisition inquiries, our Geneva horological desk is at your service.
          </p>
          <button
            onClick={onOpenSalonModal}
            className="text-[#d4af37] hover:underline font-mono text-xs uppercase tracking-wider"
          >
            Schedule VIP Appointment →
          </button>
        </div>
      </div>

      <div className="border-t border-[#181a22] py-6 px-4 text-center font-mono text-[11px] text-neutral-600">
        © 2026 Vanguard Chrono SA. Geneva, Switzerland. Designed for high-ticket portfolio demonstration.
      </div>
    </footer>
  );
}
