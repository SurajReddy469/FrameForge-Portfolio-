import React from 'react';
import { Cpu, Terminal, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b0d10] border-t border-[#20242c] py-16 px-4 sm:px-6 lg:px-8 text-xs font-mono text-neutral-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-base mb-2 font-heading">
            <span className="w-2.5 h-2.5 bg-[#ff5722]"></span>
            <span>KEYCRAFT LABS</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Precision keyboard engineering atelier based at Leopoldstraße 48, Munich, Germany.
          </p>
        </div>

        <div>
          <h4 className="text-[#ff5722] font-bold uppercase mb-3">Mechanical Standard</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>Anodized 6063 Aluminum</li>
            <li>Poron Acoustic Gaskets</li>
            <li>Kailh Hot-Swap Sockets (10k cycles)</li>
            <li>Brass & Polycarbonate Plates</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#ff5722] font-bold uppercase mb-3">Firmware & Software</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>Open-Source QMK Core</li>
            <li>VIA Web GUI Remapping</li>
            <li>8,000Hz Polling Micro-Controller</li>
            <li>On-Board ARM Cortex-M4</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#ff5722] font-bold uppercase mb-3">Munich Lab Status</h4>
          <p className="text-[11px] text-neutral-500 mb-2">
            CNC Milling Run: Batch 09 In Production.
          </p>
          <span className="text-white bg-black px-2 py-0.5 border border-[#333]">
            ISO 9001 MANUFACTURING CERTIFIED
          </span>
        </div>
      </div>

      <div className="pt-6 border-t border-[#1a1e24] flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-600 gap-2">
        <span>© 2026 KeyCraft Labs GmbH. Munich, Germany.</span>
        <span>GERMAN INDUSTRIAL E-COMMERCE PORTFOLIO DEMO</span>
      </div>
    </footer>
  );
}
