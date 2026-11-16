import React from 'react';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onOpenQuiz }) {
  return (
    <footer className="bg-[#f5f0e8] border-t border-[#ede8e1] py-16 px-4 sm:px-6 lg:px-8 text-xs text-[#596455]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <span className="font-serif text-2xl text-[#2c322b] block mb-1">Aura Botanica</span>
          <span className="text-[10px] uppercase tracking-widest text-[#788574] block mb-3">Kyoto • Copenhagen</span>
          <p className="text-[#6e7a6a] leading-relaxed text-[11px]">
            Harmonizing centuries-old Japanese plant fermentation with Danish minimalist barrier science for resilient, healthy skin.
          </p>
        </div>

        <div>
          <h4 className="font-medium text-[#2c322b] uppercase tracking-wider mb-3">Formulations</h4>
          <ul className="space-y-2 text-[11px]">
            <li><a href="#routines" className="hover:text-[#2c322b]">Centella Barrier Crème</a></li>
            <li><a href="#routines" className="hover:text-[#2c322b]">Fermented Rice Radiance Essence</a></li>
            <li><a href="#routines" className="hover:text-[#2c322b]">Bakuchiol Cellular Oil</a></li>
            <li><a href="#routines" className="hover:text-[#2c322b]">Camellia Melting Cleanser</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-[#2c322b] uppercase tracking-wider mb-3">Clinical Purity</h4>
          <ul className="space-y-2 text-[11px]">
            <li>100% Fragrance & Essential-Oil Free</li>
            <li>EWG Verified & Leaping Bunny Certified</li>
            <li>pH 5.0 - 5.5 Balanced Formulations</li>
            <li>Biophotonic Violet Glass Packaging</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-[#2c322b] uppercase tracking-wider mb-3">Diagnostic</h4>
          <p className="text-[11px] text-[#6e7a6a] mb-3">
            Unsure which bio-actives match your skin barrier? Take our clinical assessment.
          </p>
          <button
            onClick={onOpenQuiz}
            className="text-[#3e473d] font-bold underline hover:text-[#2c322b]"
          >
            Start Skin Diagnostic →
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-[#e2dad0] flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#788574] gap-2">
        <span>© 2026 Aura Botanica ApS. Formulated with care in Kyoto & Copenhagen.</span>
        <span>JAPANDI BOTANICAL E-COMMERCE PORTFOLIO DEMO</span>
      </div>
    </footer>
  );
}
