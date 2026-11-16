import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Dog, ZoomIn, PackageCheck, Sparkles } from 'lucide-react';

export default function ProductDetailModal({ item, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('Medium (14"-18")');
  const [includeTreats, setIncludeTreats] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const basePrice = item.price || 54;
  const totalPrice = basePrice + (includeTreats ? 12 : 0);
  const cartLineId = `${item.id}-${selectedSize}-${includeTreats ? 'treats' : 'standard'}`;

  const handleAdd = () => {
    onAddToCart({
      ...item,
      cartLineId,
      price: totalPrice,
      selectedSize,
      includeTreats
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-brand"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#fcfaf4] border-2 border-[#445341] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-[#2c332b]">
        {/* Header */}
        <div className="bg-[#f0ebe0] px-8 py-5 border-b border-[#e5ded0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span id="product-modal-title" className="text-[10px] uppercase tracking-widest text-[#445341] font-bold">
              CANINE GEAR SPECIFICATIONS // {item.category || 'TRAIL GEAR'}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close product specs"
            className="p-1 rounded text-[#798875] hover:text-[#2c332b] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 p-6 sm:p-8 gap-8">
          {/* Visuals */}
          <div className="space-y-4">
            <div
              className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#e5ded0] cursor-crosshair group ${
                isZoomed ? 'scale-110 transition-transform duration-300' : ''
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#445341] text-white px-2.5 py-1 text-[10px] font-bold uppercase rounded-md">
                100% WATERPROOF BIOTHANE & BRASS
              </div>
              <button
                type="button"
                className="absolute bottom-3 right-3 bg-black/75 hover:bg-black text-[#fcfaf4] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{isZoomed ? 'RESET' : 'ZOOM HARDWARE'}</span>
              </button>
            </div>

            {/* Hardware specs */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase">
              <div className="p-2.5 bg-[#f7f2e7] border border-[#e5ded0] rounded-lg">
                <span className="text-[#798875] block">HARDWARE</span>
                <span className="font-bold text-[#2c332b]">Solid Cast Brass</span>
              </div>
              <div className="p-2.5 bg-[#f7f2e7] border border-[#e5ded0] rounded-lg">
                <span className="text-[#798875] block">LOAD RATING</span>
                <span className="font-bold text-[#445341]">450 Lbs Tensile</span>
              </div>
              <div className="p-2.5 bg-[#f7f2e7] border border-[#e5ded0] rounded-lg">
                <span className="text-[#798875] block">WARRANTY</span>
                <span className="font-bold text-[#327a3c]">Lifetime Chew-Proof</span>
              </div>
            </div>

            <div className="p-3 bg-[#f7f2e7] border border-[#e5ded0] rounded-xl text-xs space-y-1 text-[#556352]">
              <div className="text-[#2c332b] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#445341]" />
                Zero-Stink & Mud Rinsable in 5 Seconds
              </div>
              <p className="text-[11px] leading-relaxed">
                Unlike nylon or untreated leather, our proprietary wax-sealed bridle leather and BioThane coating repels river muck and odor without cracking or harboring bacteria.
              </p>
            </div>
          </div>

          {/* Configuration and Buy */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-[#2c332b]">
                  {item.name}
                </h3>
                <span className="text-2xl font-mono font-bold text-[#445341]">${totalPrice} USD</span>
              </div>
              <p className="text-xs text-[#556352] leading-relaxed mb-6 font-normal">
                {item.details || item.description || 'Hand-riveted in Oregon using solid antique brass D-rings and certified all-weather waterproof webbing. Designed for mountain scrambles, river swims, and muddy trails.'}
              </p>

              {/* Sizing Choice */}
              <div className="space-y-2 mb-4">
                <label className="text-[10px] uppercase tracking-widest text-[#798875] font-bold block">
                  Canine Neck Size Fit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Small (10"-14")', desc: 'Frenchie / Dachshund' },
                    { id: 'Medium (14"-18")', desc: 'Aussie / Border Collie' },
                    { id: 'Large (18"-24")', desc: 'Lab / Golden / German' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSize(s.id)}
                      className={`p-2.5 text-left border rounded-xl text-xs transition cursor-pointer ${
                        selectedSize === s.id
                          ? 'border-[#445341] bg-[#445341] text-white font-bold'
                          : 'border-[#e5ded0] bg-white text-[#556352] hover:border-[#445341]'
                      }`}
                    >
                      <div className="text-xs">{s.id.split(' ')[0]}</div>
                      <div className="text-[9px] opacity-80 font-normal">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upsell Organic Treats */}
              <div
                onClick={() => setIncludeTreats(!includeTreats)}
                className={`p-3.5 border rounded-xl transition cursor-pointer flex items-center justify-between ${
                  includeTreats
                    ? 'border-[#445341] bg-[#f0ebe0]'
                    : 'border-[#e5ded0] bg-white hover:border-[#798875]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    includeTreats ? 'bg-[#445341] border-[#445341] text-white' : 'border-[#e5ded0]'
                  }`}>
                    {includeTreats && <Check className="w-3.5 h-3.5 font-bold" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2c332b] block">
                      Add Freeze-Dried Duck & Sweet Potato Jerky
                    </span>
                    <span className="text-[10px] text-[#798875]">
                      100% human-grade single ingredient trail snacks (4 oz pouch)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#445341]">+$12 USD</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              className="w-full py-4 bg-[#445341] hover:bg-[#344031] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#445341]/20"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Adventure Pack!</span>
                </>
              ) : (
                <>
                  <PackageCheck className="w-4 h-4" />
                  <span>Add to Dog's Gear Pack — ${totalPrice} USD</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}