import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Compass, Layers, ZoomIn, PackageCheck, Download, Truck } from 'lucide-react';

export default function ProductDetailModal({ item, isOpen, onClose, onAddToCart }) {
  const [selectedFinish, setSelectedFinish] = useState('Raw Honed Matte');
  const [includeCareKit, setIncludeCareKit] = useState(false);
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
      setSelectedFinish('Raw Honed Matte');
      setIncludeCareKit(false);
      setAdded(false);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const basePrice = item.price || 1200;
  const totalPrice = basePrice + (includeCareKit ? 45 : 0);

  const handleAdd = () => {
    onAddToCart({
      ...item,
      price: totalPrice,
      selectedFinish,
      includeCareKit,
      cartLineId: `${item.id}-${selectedFinish}-${includeCareKit ? 'care' : 'nocare'}`
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-arch"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#f4f1ea] border border-[#ded8cb] shadow-2xl overflow-hidden my-8 z-10 text-[#24211d]">
        {/* Header */}
        <div className="bg-[#ebe6dc] px-8 py-5 border-b border-[#ded8cb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#7a7164]" />
            <span className="text-[10px] uppercase tracking-widest text-[#7a7164]">
              ARCHITECTURAL MONOGRAPH // {item.category || 'SCULPTURAL FURNITURE'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#7a7164] hover:text-[#24211d] transition"
            aria-label="Close monograph"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-[#ded8cb]/40 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#ded8cb]">
            <img
              src={item.image}
              alt={item.name}
              className={`max-h-[380px] w-full object-cover transition-all duration-300 ${
                isZoomed ? 'scale-125' : 'scale-100'
              }`}
            />
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 bg-white/90 border border-[#ded8cb] hover:border-[#24211d] px-3 py-1.5 text-[10px] uppercase tracking-widest flex items-center gap-1.5 text-[#24211d] cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{isZoomed ? 'Reset' : 'Inspect Grain'}</span>
            </button>
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#7a7164] mb-1">
                <span className="font-mono">SERIES 04</span>
                <span className="text-[#2b6436] font-medium">{item.leadTime || 'In Stock (4-6 Weeks)'}</span>
              </div>

              <h2 id="product-detail-title" className="text-3xl font-light font-arch uppercase text-[#24211d] mb-2">
                {item.name}
              </h2>

              <p className="text-xs text-[#5c544a] font-light leading-relaxed mb-4">
                {item.details}
              </p>

              {/* Specifications Card */}
              <div className="p-4 bg-[#ebe6dc] border border-[#ded8cb] space-y-2 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-[#7a7164]">Primary Material:</span>
                  <span className="font-medium text-[#24211d]">{item.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a7164]">Spatial Dimensions:</span>
                  <span className="font-mono text-[#24211d]">{item.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a7164]">Net Weight:</span>
                  <span className="font-mono text-[#24211d]">{item.weight}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#ded8cb]/80 text-[#2b6436]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3" /> White-Glove Installation:
                  </span>
                  <span className="font-medium">Included with order</span>
                </div>
              </div>

              {/* Finish Selection */}
              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-wider text-[#7a7164] block mb-1.5">
                  1. Architectural Surface Finish:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Raw Honed Matte', 'Organic Beeswax Satin'].map((fin) => (
                    <button
                      key={fin}
                      type="button"
                      onClick={() => setSelectedFinish(fin)}
                      className={`py-2 px-2 border text-center transition ${
                        selectedFinish === fin
                          ? 'bg-[#24211d] text-[#f4f1ea] border-[#24211d] font-medium'
                          : 'bg-white text-[#5c544a] border-[#ded8cb] hover:border-[#24211d]'
                      }`}
                    >
                      {fin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Care Kit Addon */}
              <label className="flex items-start gap-3 p-3 bg-white border border-[#ded8cb] hover:border-[#24211d] cursor-pointer transition select-none">
                <input
                  type="checkbox"
                  checked={includeCareKit}
                  onChange={(e) => setIncludeCareKit(e.target.checked)}
                  className="mt-0.5 accent-[#24211d]"
                />
                <div className="text-xs">
                  <div className="font-medium text-[#24211d] flex items-center justify-between">
                    <span>Archival Mineral Wax & Linen Care Kit</span>
                    <span className="font-bold">+$45</span>
                  </div>
                  <div className="text-[10px] text-[#7a7164] mt-0.5">
                    Specially formulated microcrystalline wax and horsehair buffing block for lifetime patina preservation.
                  </div>
                </div>
              </label>
            </div>

            {/* Total Valuation & Submit */}
            <div className="pt-4 border-t border-[#ded8cb] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#7a7164] block">Valuation:</span>
                <span className="text-2xl font-serif font-bold text-[#24211d]">${totalPrice.toLocaleString()} USD</span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="px-8 py-3.5 bg-[#24211d] hover:bg-black text-[#f4f1ea] text-xs uppercase tracking-widest font-medium transition cursor-pointer"
              >
                {added ? "Piece Allocated!" : "Commission Piece"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
