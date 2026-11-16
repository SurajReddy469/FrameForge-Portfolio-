import React from 'react';
import { ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { WATCHES } from '../data/watchesData';
import { formatPrice } from '../utils/currency';

export default function HorologyComparisonTable({ onSelectWatch, currency = 'CHF' }) {
  return (
    <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#22242a] bg-[#090a0c]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[#d4af37] font-mono text-xs uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" /> ATELIER TECHNICAL SPECIFICATION MATRIX
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white">
              Calibre & Metallurgy Comparison
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 max-w-md">
            All Vanguard timepieces carry a 5-Year International Manufacture Warranty, COSC Chronometer Certification, and complimentary 3-year service overhaul in Geneva.
          </p>
        </div>

        {/* Responsive Table Card */}
        <div className="bg-[#101217] border border-[#22242a] rounded-2xl overflow-x-auto shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#22242a] bg-[#14161f] text-[11px] font-mono text-[#d4af37] tracking-wider uppercase">
                <th className="py-4 px-6">Masterpiece</th>
                <th className="py-4 px-4">Calibre & Complication</th>
                <th className="py-4 px-4">Alloy & Finishing</th>
                <th className="py-4 px-4">Frequency / Reserve</th>
                <th className="py-4 px-4">Poinçon de Genève</th>
                <th className="py-4 px-6 text-right">Acquisition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2028] text-xs font-sans">
              {WATCHES.map((w) => (
                <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={w.image}
                        alt={w.name}
                        className="w-12 h-12 object-cover rounded-lg border border-[#22242a]"
                      />
                      <div>
                        <div className="font-serif font-medium text-white text-sm">{w.name}</div>
                        <div className="text-[10px] font-mono text-neutral-400">{w.collection}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-neutral-300">
                    <span className="text-white font-medium">{w.calibre}</span>
                    <span className="block text-[10px] text-neutral-500">Free-sprung balance wheel</span>
                  </td>
                  <td className="py-4 px-4 font-mono text-neutral-300">
                    <span>{w.caseMaterial}</span>
                    <span className="block text-[10px] text-neutral-500">Sapphire box crystal (both faces)</span>
                  </td>
                  <td className="py-4 px-4 font-mono text-neutral-300">
                    <span>4 Hz (28,800 vph)</span>
                    <span className="block text-[10px] text-[#d4af37]">{w.powerReserve}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#d4af37]/10 text-[#d4af37] font-mono text-[10px] border border-[#d4af37]/30">
                      <CheckCircle2 className="w-3 h-3" /> Hallmarked
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="font-serif text-sm font-bold text-white">
                      {formatPrice(w.price, currency)}
                    </div>
                    <span className="text-[9px] font-mono text-neutral-500 block">5-Yr Swiss Guarantee</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
