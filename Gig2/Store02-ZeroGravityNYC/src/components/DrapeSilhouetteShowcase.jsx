import React, { useState } from 'react';
import { Sliders, ShieldCheck, Zap, Layers, ChevronRight } from 'lucide-react';
import { playCyberGlitchSound } from './CyberSoundEffects';

export default function DrapeSilhouetteShowcase({ onSelectFit }) {
  const [activeSilhouette, setActiveSilhouette] = useState('oversized');

  const fits = {
    oversized: {
      title: 'OVERSIZED DROP-SHOULDER',
      gsm: '550 GSM High-Density',
      cut: 'Dropped 8cm shoulder seams with extended cuff stack',
      hardware: 'Dual YKK Matte Zips',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      badge: 'STREET MATRIX STANDARD'
    },
    boxy: {
      title: 'BOXY CROPPED TECH-CUT',
      gsm: '480 GSM Compact French Terry',
      cut: 'Boxy waist cut with articulated elbow articulation',
      hardware: 'Fidlock V-Buckle Waist Tabs',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
      badge: 'ARCHITECTURAL PROFILE'
    },
    tactical: {
      title: 'EXPEDITION TACTICAL SHELL',
      gsm: '3-Layer eVent® 20,000mm',
      cut: 'Waterproof storm taped seams with modular sling',
      hardware: 'Magnetic Fidlock V-Buckles',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      badge: 'SUB-ZERO WEATHERPROOF'
    }
  };

  const current = fits[activeSilhouette];

  const handleSelect = (key) => {
    setActiveSilhouette(key);
    playCyberGlitchSound();
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#222222] bg-[#080808] font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-[#ccff00] text-[#ccff00] text-xs font-bold uppercase mb-2">
              <Sliders className="w-3.5 h-3.5" /> IN-PAGE DRAPE CALIBRATION
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              Tactical Silhouette Architecture
            </h2>
          </div>
          <div className="text-xs text-neutral-400">
            TESTED FOR: <strong className="text-white">NYC SUBWAY • TOKYO RAIN • BERLIN CLUBBING</strong>
          </div>
        </div>

        {/* 3 Silhouette Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(fits).map(([key, f]) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`p-5 text-left border-2 transition-all brutal-shadow ${
                activeSilhouette === key
                  ? 'border-[#ccff00] bg-[#111111] text-white ring-1 ring-[#ccff00]'
                  : 'border-[#222222] bg-[#0a0a0a] text-neutral-400 hover:border-neutral-500'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-[#ccff00] font-bold">{f.badge}</span>
                {activeSilhouette === key && (
                  <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
                )}
              </div>
              <h3 className="font-display font-black text-xl uppercase text-white mb-1">
                {f.title.split(' ')[0]} {f.title.split(' ')[1]}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {f.gsm}
              </p>
            </button>
          ))}
        </div>

        {/* Active Silhouette Breakdown Display */}
        <div className="bg-[#111111] border-2 border-white p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center brutal-shadow-white">
          <div className="lg:col-span-5 aspect-[4/5] bg-black border border-[#333] overflow-hidden">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 bg-[#ccff00] text-black font-black text-xs uppercase">
              {current.badge}
            </div>

            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white">
              {current.title}
            </h3>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3 bg-black border border-[#222] flex justify-between">
                <span className="text-neutral-500 uppercase">FABRIC DENSITY:</span>
                <span className="font-bold text-[#ccff00]">{current.gsm}</span>
              </div>
              <div className="p-3 bg-black border border-[#222] flex justify-between">
                <span className="text-neutral-500 uppercase">ERGONOMIC CUT:</span>
                <span className="font-bold text-white text-right max-w-xs">{current.cut}</span>
              </div>
              <div className="p-3 bg-black border border-[#222] flex justify-between">
                <span className="text-neutral-500 uppercase">CLOSURE HARDWARE:</span>
                <span className="font-bold text-[#ccff00]">{current.hardware}</span>
              </div>
            </div>

            <button
              onClick={() => {
                playCyberGlitchSound();
                document.getElementById('drop-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs uppercase tracking-widest transition brutal-shadow flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Pieces in this Silhouette</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
