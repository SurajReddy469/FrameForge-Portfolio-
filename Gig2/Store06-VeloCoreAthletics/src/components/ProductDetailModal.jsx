import React, { useState, useEffect } from 'react';
import { X, Check, Wind, ShieldCheck, Zap, ZoomIn, PackageCheck, Layers } from 'lucide-react';

export default function ProductDetailModal({ item, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [includeAeroSocks, setIncludeAeroSocks] = useState(false);
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
    if (item) {
      setSelectedSize(item.selectedSize || 'M');
      setIncludeAeroSocks(false);
      setAdded(false);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const basePrice = item.price || 180;
  const totalPrice = basePrice + (includeAeroSocks ? 24 : 0);

  const handleAdd = () => {
    onAddToCart({
      ...item,
      price: totalPrice,
      selectedSize,
      includeAeroSocks,
      cartLineId: `${item.id}-${selectedSize}-${includeAeroSocks ? 'socks' : 'nosocks'}`
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
      aria-labelledby="apparel-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans"
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#0a0f1d] border-2 border-[#00f0ff] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-white">
        {/* Header */}
        <div className="bg-[#11192e] px-6 py-4 border-b border-[#1e2a4a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-[#00f0ff]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f0ff]">
              PRO RACING TELEMETRY // {item.category || 'AERODYNAMIC APPAREL'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            aria-label="Close apparel dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Showcase */}
          <div className="relative bg-[#060a14] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#1e2a4a]">
            <img
              src={item.image}
              alt={item.name}
              className={`max-h-[360px] w-full object-cover rounded-xl transition-all duration-300 ${
                isZoomed ? 'scale-125' : 'scale-100'
              }`}
            />
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 bg-black/80 border border-[#00f0ff]/50 hover:border-[#00f0ff] px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 text-neutral-200 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>{isZoomed ? 'Reset View' : 'Inspect Dimple Weave'}</span>
            </button>
          </div>

          {/* Details & Specifications */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider block mb-1">
                WIND TUNNEL CALIBRATED &bull; {item.weight || '142g'}
              </span>
              <h2 id="apparel-detail-title" className="font-sport font-black uppercase text-3xl text-white italic mb-2">
                {item.name}
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                {item.details || item.description}
              </p>

              {/* Aerodynamic Micro Metrics */}
              <div className="p-4 bg-[#0f172a] rounded-xl border border-[#1e2a4a] mb-4 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Wind Tunnel Drag Reduction:</span>
                  <span className="text-[#00f0ff] font-bold">{item.dragReduction || '-14 Watts at 45 km/h'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Fabric Composition:</span>
                  <span className="text-white">{item.fabric || 'Swiss Dimpled Sonic Fabric'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Chassis Seam Technology:</span>
                  <span className="text-white">Ultrasonic Bonded Heat-Tape</span>
                </div>
              </div>

              {/* Size Matrix */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-neutral-400 uppercase">Select Athlete Size:</span>
                  <span className="text-[#00f0ff] font-bold">Selected: {selectedSize}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded border text-center transition ${
                        selectedSize === size
                          ? 'bg-[#00f0ff] text-black border-[#00f0ff] font-bold'
                          : 'bg-[#060a14] text-white border-[#1e2a4a] hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-on Aero Socks */}
              <label className="flex items-start gap-3 p-3 bg-[#0f172a] rounded-xl border border-[#1e2a4a] hover:border-[#00f0ff] cursor-pointer transition select-none font-mono">
                <input
                  type="checkbox"
                  checked={includeAeroSocks}
                  onChange={(e) => setIncludeAeroSocks(e.target.checked)}
                  className="mt-0.5 accent-[#00f0ff]"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Bundle Sonic-Weave Aero Calves/Socks</span>
                    <span className="text-[#00f0ff]">+$24</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">
                    Dimpled aerodynamic calf sleeves tested to save an additional 3.5 Watts on flat TT courses.
                  </div>
                </div>
              </label>
            </div>

            {/* Total Valuation & Add to Cart */}
            <div className="pt-4 border-t border-[#1e2a4a] flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Total Gear Valuation:</span>
                <span className="font-sport font-black italic text-2xl text-[#00f0ff]">${totalPrice} USD</span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="px-8 py-3.5 rounded bg-[#00f0ff] hover:bg-[#33f3ff] text-black font-sport font-black italic text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-[#00f0ff]/20"
              >
                {added ? "ALLOCATED!" : `ADD SIZE ${selectedSize} TO RACE BAG`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
