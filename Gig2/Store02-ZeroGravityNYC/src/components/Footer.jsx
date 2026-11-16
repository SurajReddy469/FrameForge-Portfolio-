import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-[#222] py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#ccff00]"></span>
            <span className="font-display font-black text-xl text-white">ZERO//GRAVITY</span>
          </div>
          <p className="text-neutral-500 text-[11px] leading-relaxed">
            Brooklyn, New York. Underground utilitarian technical apparel designed for extreme urban environments.
          </p>
        </div>

        <div>
          <h4 className="text-[#ccff00] font-bold uppercase mb-3">Drop Policy</h4>
          <ul className="space-y-1.5 text-[11px] text-neutral-400">
            <li>All Sales Final • No Returns</li>
            <li>Zero Restocks Once Sold Out</li>
            <li>Limited 150 Pieces Per Silhouette</li>
            <li>Strict Limit: 2 Units Per Customer</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#ccff00] font-bold uppercase mb-3">Logistics</h4>
          <ul className="space-y-1.5 text-[11px] text-neutral-400">
            <li>Worldwide DHL Express 48h</li>
            <li>Carbon Neutral Dispatch Hub</li>
            <li>Fidlock Hardware Authenticity</li>
            <li>Tracking Sent via Encrypted SMS</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#ccff00] font-bold uppercase mb-3">Atelier</h4>
          <p className="text-[11px] text-neutral-500 mb-2">
            Studio 4B, 184 Morgan Ave, East Williamsburg, Brooklyn, NY 11237
          </p>
          <span className="text-[#ccff00]">NYC_METRO_DISPATCH: ACTIVE</span>
        </div>
      </div>

      <div className="pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-600 gap-2">
        <span>© 2026 ZERO//GRAVITY NYC CORP. All rights reserved.</span>
        <span>BRUTALIST E-COMMERCE PORTFOLIO DEMO</span>
      </div>
    </footer>
  );
}
