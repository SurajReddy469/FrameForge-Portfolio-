import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Cpu, Zap, Layers, Plus, ZoomIn, PackageCheck, Box } from 'lucide-react';

export default function ProductDetailModal({ keyboard, isOpen, onClose, onAddToCart }) {
  const [selectedSwitch, setSelectedSwitch] = useState('Linear (55g)');
  const [selectedPlate, setSelectedPlate] = useState('Polycarbonate (Deep Thock)');
  const [includeLubeKit, setIncludeLubeKit] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (keyboard) {
      setSelectedSwitch('Linear (55g)');
      setSelectedPlate('Polycarbonate (Deep Thock)');
      setIncludeLubeKit(false);
      setAdded(false);
    }
  }, [keyboard]);

  if (!isOpen || !keyboard) return null;

  const basePrice = keyboard.price || 349;
  const totalPrice = basePrice + (includeLubeKit ? 28 : 0);

  const handleAdd = () => {
    onAddToCart({
      ...keyboard,
      price: totalPrice,
      selectedSwitch,
      selectedPlate,
      includeLubeKit,
      cartLineId: `${keyboard.id}-${selectedSwitch}-${selectedPlate}-${includeLubeKit ? 'lube' : 'nolube'}`
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-mono"
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#0f1217] border-2 border-[#ff5722] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-white">
        {/* Header */}
        <div className="bg-[#181d24] px-6 py-4 border-b border-[#262b34] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#ff5722]" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              SPECIFICATION DOSSIER // {keyboard.formFactor || '75% GASKET'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#20252e] text-neutral-400 hover:text-white transition"
            aria-label="Close dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Showcase */}
          <div className="relative bg-[#07090b] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#262b34]">
            <img
              src={keyboard.image}
              alt={keyboard.name}
              className={`max-h-[360px] w-full object-cover rounded-xl transition-all duration-300 ${
                isZoomed ? 'scale-125' : 'scale-100'
              }`}
            />
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 bg-black/80 border border-[#333] hover:border-[#ff5722] px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 text-neutral-300 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>{isZoomed ? 'Reset View' : 'Inspect Chamfer'}</span>
            </button>
          </div>

          {/* Details & Inclusions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-[#ff5722] uppercase tracking-wider block mb-1">
                CNC 6063 ANODIZED CHASSIS
              </span>
              <h2 id="product-detail-title" className="font-heading text-3xl font-bold uppercase text-white mb-2">
                {keyboard.name}
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {keyboard.description}
              </p>

              {/* What's In The Kit Callout (Highlighted before technical specs) */}
              <div className="p-4 bg-[#141820] border border-[#ff5722]/40 rounded-xl mb-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ff5722] uppercase">
                  <Box className="w-4 h-4" />
                  <span>Standard Kit Inclusions (All Inside Box):</span>
                </div>
                <ul className="text-[11px] text-neutral-300 space-y-1 list-disc list-inside">
                  <li>Full CNC 6063 Aluminum Top & Bottom Housing (Sandblasted)</li>
                  <li>1.2mm Flex-Cut Hot-Swap PCB (QMK / VIA / VIAL compatible)</li>
                  <li>Poron Gasket Matrix Strips + IXPE Switch Foam Sheet</li>
                  <li>Durock V2 Factory-Lubed Screw-in Stabilizers (4x 2u, 1x 6.25u)</li>
                  <li>Braided 1.8m Aviator Coiled USB-C Cable</li>
                </ul>
              </div>

              {/* Switch Selection */}
              <div className="mb-4">
                <span className="text-xs font-bold text-neutral-400 uppercase block mb-1.5">
                  1. Pre-Installed Switch Selection:
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Linear (55g)', 'Tactile (62g)', 'Clicky (67g)'].map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => setSelectedSwitch(sw)}
                      className={`py-2 px-1 rounded-lg border text-center transition ${
                        selectedSwitch === sw
                          ? 'bg-[#ff5722] text-white border-[#ff5722] font-bold'
                          : 'bg-[#141820] text-neutral-300 border-[#262b34] hover:border-neutral-500'
                      }`}
                    >
                      {sw.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plate Selection */}
              <div className="mb-4">
                <span className="text-xs font-bold text-neutral-400 uppercase block mb-1.5">
                  2. Acoustic Switch Plate Material:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'Polycarbonate (Deep Thock)', label: 'Polycarbonate (Deep Thock)' },
                    { id: 'Solid Brass (Crisp Clack)', label: 'Solid Brass (Crisp Clack)' }
                  ].map((pl) => (
                    <button
                      key={pl.id}
                      type="button"
                      onClick={() => setSelectedPlate(pl.id)}
                      className={`py-2 px-2 rounded-lg border text-center transition ${
                        selectedPlate === pl.id
                          ? 'bg-[#ff5722] text-white border-[#ff5722] font-bold'
                          : 'bg-[#141820] text-neutral-300 border-[#262b34] hover:border-neutral-500'
                      }`}
                    >
                      {pl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-on Lube Kit */}
              <label className="flex items-start gap-3 p-3 bg-[#141820] rounded-xl border border-[#262b34] hover:border-[#ff5722] cursor-pointer transition select-none">
                <input
                  type="checkbox"
                  checked={includeLubeKit}
                  onChange={(e) => setIncludeLubeKit(e.target.checked)}
                  className="mt-0.5 accent-[#ff5722]"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Bundle Krytox 205g0 Switch Tuning Kit</span>
                    <span className="text-[#ff5722]">+$28</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">
                    Includes 5g authentic Krytox 205g0, switch opener, precision brush, and GPL 105 spring oil.
                  </div>
                </div>
              </label>
            </div>

            {/* Total Valuation & Add to Cart */}
            <div className="pt-4 border-t border-[#262b34] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Total Build Valuation:</span>
                <span className="font-heading text-2xl font-bold text-[#ff5722]">${totalPrice} USD</span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="px-8 py-3.5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-[#ff5722]/20"
              >
                {added ? "Build Queued!" : "Add Build to Trunk"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
