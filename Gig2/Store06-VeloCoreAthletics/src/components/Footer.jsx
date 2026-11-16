import React from 'react';
import { Zap, Gauge, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050811] border-t border-[#1a233a] py-16 px-4 sm:px-6 lg:px-8 text-xs font-mono text-neutral-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-base mb-2 font-sport italic">
            <span className="w-2.5 h-2.5 bg-[#00f0ff]"></span>
            <span>VELOCORE ATHLETICS</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
            Aerodynamic research lab located at 1240 Canyon Blvd, Boulder, Colorado 80302.
          </p>
        </div>

        <div>
          <h4 className="text-[#00f0ff] font-bold uppercase mb-3">Athletic Standards</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>Swiss Schoeller Aerodynamic Fabrics</li>
            <li>Elastic Interface Multi-Density Chamois</li>
            <li>Sub-48g Packable Running Wind-Veil</li>
            <li>Zero Friction Bonded Ultrasonic Seams</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#00f0ff] font-bold uppercase mb-3">Guarantees</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>30-Day Free Crash Replacement</li>
            <li>Worldwide Express 48h Courier</li>
            <li>Carbon Neutral Dispatch Hub</li>
            <li>UCI Pro-Peloton Legal Spec</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#00f0ff] font-bold uppercase mb-3">Wind Tunnel Testing</h4>
          <p className="text-[11px] text-neutral-500 mb-2 font-sans">
            Tested at Silverstone & San Diego Wind Tunnel facilities.
          </p>
          <span className="text-white bg-black px-2 py-0.5 border border-[#1e2a4a]">
            AERO VELOCITY TEST: 45 KM/H PASSED
          </span>
        </div>
      </div>

      <div className="pt-6 border-t border-[#1a233a] flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-600 gap-2">
        <span>© 2026 VeloCore Athletics Inc. Boulder, CO.</span>
        <span>AERODYNAMIC SPORT E-COMMERCE PORTFOLIO DEMO</span>
      </div>
    </footer>
  );
}
