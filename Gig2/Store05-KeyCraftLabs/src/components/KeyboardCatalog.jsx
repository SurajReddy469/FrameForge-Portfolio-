import React, { useState } from 'react';
import { ShoppingBag, Check, Cpu, Sliders, Box, Layers, Wifi, Usb } from 'lucide-react';
import { KEYBOARDS } from '../data/keyboardData';

export default function KeyboardCatalog({ onAddToCart, onInspectKeyboard }) {
  const [selectedSwitches, setSelectedSwitches] = useState({});
  const [selectedPlates, setSelectedPlates] = useState({});
  const [layoutFilter, setLayoutFilter] = useState('ALL');
  const [connectionFilter, setConnectionFilter] = useState('ALL');

  const handleSelectSwitch = (id, sw) => {
    setSelectedSwitches(prev => ({ ...prev, [id]: sw }));
  };

  const handleSelectPlate = (id, pl) => {
    setSelectedPlates(prev => ({ ...prev, [id]: pl }));
  };

  const filteredKeyboards = KEYBOARDS.filter((kb) => {
    if (layoutFilter !== 'ALL') {
      if (layoutFilter === '75%' && !kb.formFactor.includes('75%')) return false;
      if (layoutFilter === 'Alice' && !kb.formFactor.includes('Alice')) return false;
      if (layoutFilter === '65%' && !kb.formFactor.includes('65%')) return false;
      if (layoutFilter === 'Macro' && !kb.formFactor.includes('Macro')) return false;
    }
    if (connectionFilter !== 'ALL') {
      if (connectionFilter === 'Wireless' && !kb.pcb.includes('Tri-Mode')) return false;
      if (connectionFilter === 'Wired' && kb.pcb.includes('Tri-Mode')) return false;
    }
    return true;
  });

  return (
    <section id="chassis-catalog" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#20242c] bg-[#12151a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#ff5722] font-mono text-xs uppercase tracking-widest block mb-1">
              CUSTOM MECHANICAL KITS & ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-black text-white uppercase">
              Chassis & Layouts
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-400 bg-[#191d24] px-4 py-2 rounded-lg border border-[#2b313d]">
            COMPATIBILITY: <strong className="text-white">QMK / VIA / 5-PIN MX HOT-SWAP</strong>
          </div>
        </div>

        {/* What's In The Box Master Callout */}
        <div className="mb-10 p-5 rounded-2xl bg-[#171a22] border border-[#2d3340] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs text-neutral-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/30 text-[#ff5722]">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white font-bold block text-sm uppercase">Complete Kit Contents (Zero Extra Purchases Required)</span>
              <span className="text-neutral-400 text-[11px]">
                CNC 6063 Aluminum Chassis &bull; 1.2mm Flex-Cut Hot-Swap PCB &bull; Poron Gasket Matrix &bull; Durock V2 Screw-in Stabs &bull; Choice of Plate &bull; Sound Dampening Dampener Sheet
              </span>
            </div>
          </div>
          <div className="shrink-0 px-3 py-1.5 rounded bg-black/60 border border-white/10 text-[11px] text-[#ff5722]">
            Munich Cleanroom Assembled
          </div>
        </div>

        {/* Compatibility Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#20242c] font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-neutral-500 uppercase text-[11px] mr-1">Layout Filter:</span>
            {['ALL', '75%', 'Alice', '65%', 'Macro'].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLayoutFilter(l)}
                className={`px-3 py-1.5 rounded border transition cursor-pointer ${
                  layoutFilter === l
                    ? 'bg-[#ff5722] text-white border-[#ff5722] font-bold'
                    : 'bg-[#181c22] text-neutral-400 border-[#262b34] hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-500 uppercase text-[11px] mr-1">Interface:</span>
            {['ALL', 'Wireless', 'Wired'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setConnectionFilter(c)}
                className={`px-3 py-1.5 rounded border transition cursor-pointer ${
                  connectionFilter === c
                    ? 'bg-neutral-800 text-white border-[#ff5722] font-bold'
                    : 'bg-[#181c22] text-neutral-400 border-[#262b34] hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Keyboards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredKeyboards.map((kb) => {
            const currentSwitch = selectedSwitches[kb.id] || 'Linear (55g)';
            const currentPlate = selectedPlates[kb.id] || 'Polycarbonate';

            return (
              <div
                key={kb.id}
                className="bg-[#181c22] border border-[#262b34] hover:border-[#ff5722] rounded-xl p-5 flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Photo */}
                  <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden mb-4 relative">
                    <img decoding="async" loading="lazy"
                      src={kb.image}
                      alt={kb.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#ff5722] text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                      {kb.formFactor.split(' ')[0]}
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-heading font-bold text-lg text-white mb-1 group-hover:text-[#ff5722] transition-colors">
                    {kb.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mb-4 leading-relaxed min-h-[32px]">
                    {kb.details}
                  </p>

                  <div className="space-y-1 text-[11px] font-mono text-neutral-400 pb-3 border-b border-[#262b34]">
                    <div>Chassis: <span className="text-white">{kb.chassis}</span></div>
                    <div>Mount: <span className="text-[#ff5722]">{kb.mount}</span></div>
                    <div>Connectivity: <span className="text-neutral-300">{kb.pcb.includes('Tri-Mode') ? 'Tri-Mode (2.4G/BT/USB)' : 'USB-C (8,000Hz)'}</span></div>
                  </div>

                  {/* Switch Choice */}
                  <div className="my-3">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">SWITCH PREFERENCE:</span>
                    <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
                      {['Linear', 'Tactile', 'Clicky'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSelectSwitch(kb.id, `${s} (55g)`)}
                          className={`py-1 rounded border text-center transition cursor-pointer ${
                            currentSwitch.startsWith(s)
                              ? 'bg-[#ff5722] text-white border-[#ff5722] font-bold'
                              : 'bg-black text-neutral-400 border-[#333] hover:border-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Plate Material */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">PLATE MATERIAL:</span>
                    <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                      {['Polycarbonate (Thock)', 'Solid Brass (Crisp)'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handleSelectPlate(kb.id, p)}
                          className={`py-1 px-1 rounded border text-center transition truncate cursor-pointer ${
                            currentPlate === p
                              ? 'bg-neutral-800 text-white border-[#ff5722] font-bold'
                              : 'bg-black text-neutral-400 border-[#333]'
                          }`}
                        >
                          {p.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price and Add */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-xs text-neutral-500">BASE PRICE:</span>
                    <span className="text-xl font-bold text-white">{kb.priceFormatted}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onInspectKeyboard && onInspectKeyboard(kb)}
                      className="py-2.5 px-2 rounded bg-[#101216] border border-[#262b34] hover:border-[#ff5722] text-neutral-300 hover:text-white font-mono text-[11px] font-bold uppercase transition cursor-pointer"
                    >
                      What's Inside
                    </button>
                    <button
                      onClick={() => onAddToCart({ ...kb, selectedSwitch: currentSwitch, selectedPlate: currentPlate })}
                      className="py-2.5 px-2 rounded bg-[#ff5722] hover:bg-[#f4511e] text-white font-mono font-bold text-[11px] uppercase transition flex items-center justify-center gap-1.5 shadow-md shadow-[#ff5722]/20 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add Build</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
