import React, { useState, useEffect } from 'react';
import { X, Sliders, CheckCircle2, Award, Sparkles, Download, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function WatchConfiguratorModal({ isOpen, onClose, baseWatch, onAddConfiguredWatch, currency = 'CHF' }) {
  const [dial, setDial] = useState('obsidian');
  const [caseMetal, setCaseMetal] = useState('titanium');
  const [strap, setStrap] = useState('alligator');
  const [customEngraving, setCustomEngraving] = useState('H. de S. • MMXXVI');
  const [dossierDownloaded, setDossierDownloaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !baseWatch) return null;

  const DIAL_OPTIONS = [
    { id: 'obsidian', name: 'Obsidian Sunburst Noir', price: 0, hex: '#0a0b0e' },
    { id: 'guilloche', name: 'Anthracite Clous de Paris Guilloché', price: 1500, hex: '#26282e' },
    { id: 'lapis', name: 'Natural Royal Lapis Lazuli Stone', price: 3800, hex: '#162b4d' },
    { id: 'skeleton', name: 'Openworked Calibre Bridges', price: 4500, hex: '#403b35' }
  ];

  const CASE_OPTIONS = [
    { id: 'titanium', name: 'Grade 5 Brushed Titanium', price: 0, borderHex: '#888d96' },
    { id: 'rosegold', name: '18k 5N Rose Gold', price: 6500, borderHex: '#e5a583' },
    { id: 'platinum', name: '950 Solid Platinum', price: 12000, borderHex: '#e1e5eb' }
  ];

  const STRAP_OPTIONS = [
    { id: 'alligator', name: 'Mississippi Alligator (Matte Black)', price: 0 },
    { id: 'cognac', name: 'Tuscan Saddle Leather (Cognac)', price: 450 },
    { id: 'mesh', name: 'Hand-Articulated Titanium Mesh', price: 2000 }
  ];

  const selectedDial = DIAL_OPTIONS.find(d => d.id === dial) || DIAL_OPTIONS[0];
  const selectedCase = CASE_OPTIONS.find(c => c.id === caseMetal) || CASE_OPTIONS[0];
  const selectedStrap = STRAP_OPTIONS.find(s => s.id === strap) || STRAP_OPTIONS[0];

  const totalPriceInChf = baseWatch.price + selectedDial.price + selectedCase.price + selectedStrap.price;

  const handleCommissionCustom = () => {
    const customLineId = `custom-${baseWatch.id}-${dial}-${caseMetal}-${strap}-${Date.now()}`;
    const customItem = {
      id: baseWatch.id,
      cartLineId: customLineId,
      name: `${baseWatch.name} (Bespoke Atelier)`,
      collection: "Pièce Unique Atelier",
      price: totalPriceInChf,
      priceFormatted: formatPrice(totalPriceInChf, currency),
      image: baseWatch.image,
      selectedDial: selectedDial.name,
      selectedCase: selectedCase.name,
      selectedStrap: selectedStrap.name,
      customEngraving: customEngraving,
      description: `Bespoke configuration: ${selectedDial.name}, ${selectedCase.name}, ${selectedStrap.name}. Custom caseback engraving: "${customEngraving}".`
    };
    onAddConfiguredWatch(customItem);
    onClose();
  };

  const handleDownloadDossier = () => {
    setDossierDownloaded(true);
    setTimeout(() => setDossierDownloaded(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="configurator-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#0e1015] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-white font-sans">
        
        {/* Header */}
        <div className="bg-[#141720] px-6 py-4 border-b border-[#222530] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 id="configurator-modal-title" className="font-serif font-semibold text-lg text-white">
                Vallée de Joux 360° Horology Configurator
              </h3>
              <p className="text-[10px] font-mono text-[#d4af37] tracking-wider uppercase">
                Bespoke Atelier Commissioning Studio &bull; {baseWatch.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            aria-label="Close watch configurator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Canvas Preview (5 cols) */}
          <div className="md:col-span-5 bg-[#08090c] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#222530]">
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#12141a] to-[#07080a] border-2 border-[#222530] p-6 flex flex-col items-center justify-center shadow-2xl">
                {/* Visual Representation of Dial / Case */}
                <div
                  className="w-44 h-44 rounded-full border-4 flex items-center justify-center relative shadow-2xl transition-all duration-500"
                  style={{
                    borderColor: selectedCase.borderHex,
                    backgroundColor: selectedDial.hex
                  }}
                >
                  {/* Concentric bezel markings */}
                  <div className="absolute inset-2 rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]"></div>
                  </div>
                  {/* Hands */}
                  <div className="absolute w-0.5 h-14 bg-white -top-1 origin-bottom rotate-45 rounded"></div>
                  <div className="absolute w-1 h-10 bg-[#d4af37] origin-bottom -rotate-45 rounded"></div>
                  <div className="absolute text-[8px] font-mono text-[#d4af37] top-6 tracking-widest">
                    VANGUARD
                  </div>
                  <div className="absolute text-[7px] font-mono text-neutral-400 bottom-6">
                    GENÈVE
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-xs font-serif text-white block">Caseback Monogram:</span>
                  <span className="text-xs font-mono text-[#d4af37] tracking-widest font-bold">"{customEngraving}"</span>
                </div>
              </div>
            </div>

            {/* COSC Certificate generation pill */}
            <div className="mt-4 pt-4 border-t border-[#222530] flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#d4af37]" /> COSC Certified
              </span>
              <button
                type="button"
                onClick={handleDownloadDossier}
                className="text-[10px] text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>{dossierDownloaded ? '✓ PDF Downloaded' : 'Export Specs PDF'}</span>
              </button>
            </div>
          </div>

          {/* Right Customization Controls (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* 1. Dial Selection */}
            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="uppercase text-neutral-400 font-bold">1. Grand Feu & Stone Dial:</span>
                <span className="text-[#d4af37] font-medium">{selectedDial.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {DIAL_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDial(d.id)}
                    className={`p-3 rounded-xl border text-left transition-all font-mono text-xs cursor-pointer ${
                      dial === d.id
                        ? 'border-[#d4af37] bg-[#1a1c24] text-white shadow'
                        : 'border-[#222530] bg-[#101218] text-neutral-400 hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: d.hex }} />
                      <span className="truncate font-sans font-medium text-white">{d.name.split(' ')[0]}</span>
                    </div>
                    <span className="text-[10px] text-[#d4af37]">
                      {d.price > 0 ? `+${formatPrice(d.price, currency)}` : 'Standard'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Chassis Metallurgy */}
            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="uppercase text-neutral-400 font-bold">2. Case Metallurgy Alloy:</span>
                <span className="text-[#d4af37] font-medium">{selectedCase.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {CASE_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCaseMetal(c.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all font-mono text-xs cursor-pointer ${
                      caseMetal === c.id
                        ? 'border-[#d4af37] bg-[#1a1c24] text-white shadow'
                        : 'border-[#222530] bg-[#101218] text-neutral-400 hover:border-neutral-600'
                    }`}
                  >
                    <div className="truncate font-sans font-medium text-white text-[11px]">{c.name.split(' ')[0]}</div>
                    <span className="text-[10px] text-[#d4af37] block mt-0.5">
                      {c.price > 0 ? `+${formatPrice(c.price, currency)}` : 'Base Alloy'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Strap Selection */}
            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="uppercase text-neutral-400 font-bold">3. Bespoke Bracelet / Strap:</span>
                <span className="text-[#d4af37] font-medium">{selectedStrap.name.split('(')[0]}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {STRAP_OPTIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStrap(s.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all font-mono text-xs cursor-pointer ${
                      strap === s.id
                        ? 'border-[#d4af37] bg-[#1a1c24] text-white shadow'
                        : 'border-[#222530] bg-[#101218] text-neutral-400 hover:border-neutral-600'
                    }`}
                  >
                    <div className="truncate font-sans font-medium text-white text-[11px]">{s.name.split(' ')[0]}</div>
                    <span className="text-[10px] text-[#d4af37] block mt-0.5">
                      {s.price > 0 ? `+${formatPrice(s.price, currency)}` : 'Included'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Custom Engraving Input */}
            <div>
              <label htmlFor="custom-engrave" className="block text-xs font-mono uppercase text-neutral-400 font-bold mb-1.5">
                4. Sapphire Caseback Personal Engraving (Max 24 chars):
              </label>
              <input
                id="custom-engrave"
                type="text"
                maxLength={24}
                value={customEngraving}
                onChange={(e) => setCustomEngraving(e.target.value)}
                className="w-full bg-[#141720] border border-[#222530] rounded-lg px-3 py-2 text-xs font-mono text-[#d4af37] focus:outline-none focus:border-[#d4af37]"
                placeholder="INITIALS • MMXXVI"
              />
            </div>

            {/* Commission Total & Actions */}
            <div className="pt-4 border-t border-[#222530] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Total Bespoke Valuation:</span>
                <span className="text-2xl font-serif font-bold text-[#d4af37]">
                  {formatPrice(totalPriceInChf, currency)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCommissionCustom}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#d4af37] hover:bg-[#e5c14d] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add Bespoke Commission to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
