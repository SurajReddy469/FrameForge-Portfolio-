import React, { useState, useEffect } from 'react';
import { X, Award, Shield, CheckCircle2, Sparkles, Layers, Sliders, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function ProductDetailModal({ isOpen, onClose, watch, onAddToCart, onOpenConfigurator, currency = 'CHF' }) {
  const [addTravelRoll, setAddTravelRoll] = useState(false);
  const [selectedAngle, setSelectedAngle] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !watch) return null;

  const travelRollPriceInChf = 1200;
  const currentTotalInChf = watch.price + (addTravelRoll ? travelRollPriceInChf : 0);

  const handleCommission = () => {
    onAddToCart(watch);
    if (addTravelRoll) {
      onAddToCart({
        id: `travel-roll-${watch.id}`,
        cartLineId: `travel-roll-${watch.id}`,
        name: "Hand-Stitched Florence Alligator 3-Watch Roll",
        collection: "Horological Leather Goods",
        price: travelRollPriceInChf,
        priceFormatted: formatPrice(travelRollPriceInChf, currency),
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
        description: "Lined with anti-magnetic microfiber velvet."
      });
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="watch-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#0d0f14] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-black flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          aria-label="Close watch dossier"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Gallery & Zoom Preview */}
          <div className="bg-[#090a0d] p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#22242a]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181a22] border border-[#d4af37]/30 text-[10px] font-mono text-[#d4af37] mb-4">
                <Award className="w-3 h-3" /> {watch.collection}
              </div>

              <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-[#22242a] p-4 flex items-center justify-center shadow-inner">
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-700 hover:scale-110 cursor-zoom-in"
                />
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/75 rounded text-[10px] font-mono text-neutral-400">
                  Click to Zoom &bull; 8K Horology Lens
                </div>
              </div>
            </div>

            {/* Micro Provenance Stamps */}
            <div className="pt-6 grid grid-cols-2 gap-3 text-[11px] font-mono text-neutral-400">
              <div className="p-2.5 bg-[#12141c] rounded-lg border border-[#22242a]">
                <span className="text-neutral-500 block text-[9px]">CERTIFICATION</span>
                <span className="text-[#d4af37] font-semibold">Poinçon de Genève</span>
              </div>
              <div className="p-2.5 bg-[#12141c] rounded-lg border border-[#22242a]">
                <span className="text-neutral-500 block text-[9px]">WARRANTY</span>
                <span className="text-white font-semibold">5-Yr Manufacture</span>
              </div>
            </div>
          </div>

          {/* Right: Technical Spec Dossier */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase block mb-1">
                VALLÉE DE JOUX &bull; PIÈCE NO. {watch.id.toUpperCase()}
              </span>
              <h2 id="watch-detail-title" className="text-3xl font-serif text-white mb-2">
                {watch.name}
              </h2>
              <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                {watch.description}
              </p>

              {/* Technical Specifications */}
              <div className="space-y-2 border-t border-b border-[#22242a] py-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Calibre Architecture:</span>
                  <span className="text-neutral-200 font-medium">{watch.calibre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Chassis Metallurgy:</span>
                  <span className="text-neutral-200 font-medium">{watch.caseMaterial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Power Autonomy:</span>
                  <span className="text-neutral-200 font-medium">{watch.powerReserve}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Escapement Frequency:</span>
                  <span className="text-[#d4af37] font-medium">4 Hz (28,800 vph)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Water Tightness:</span>
                  <span className="text-neutral-200 font-medium">10 ATM / 100 Metres</span>
                </div>
              </div>

              {/* Bespoke Configurator CTA */}
              <div className="my-5 p-3.5 bg-[#141722] border border-[#d4af37]/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#d4af37] block font-bold">
                    Want a Bespoke One-of-One Build?
                  </span>
                  <span className="text-xs text-neutral-300">
                    Customize dial, case metal, and engraved caseback.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConfigurator(watch);
                  }}
                  className="px-3.5 py-1.5 bg-[#d4af37] hover:bg-[#e5c14d] text-black text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Sliders className="w-3 h-3" />
                  <span>Configure</span>
                </button>
              </div>

              {/* Horological Leather Add-on Upsell */}
              <label className="p-3 bg-[#111319] border border-[#22242a] hover:border-[#d4af37]/50 rounded-xl flex items-center justify-between cursor-pointer transition-colors block">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={addTravelRoll}
                    onChange={(e) => setAddTravelRoll(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#d4af37] bg-black border-[#d4af37]"
                  />
                  <div>
                    <span className="text-xs font-serif text-white block">Add Hand-Stitched Alligator Travel Roll</span>
                    <span className="text-[10px] font-mono text-neutral-400">Anti-magnetic velvet lining</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#d4af37] font-bold">
                  +{formatPrice(travelRollPriceInChf, currency)}
                </span>
              </label>
            </div>

            {/* Total & Action */}
            <div className="pt-4 border-t border-[#22242a]">
              <div className="flex items-baseline justify-between mb-4 font-mono">
                <span className="text-xs text-neutral-500 uppercase">Acquisition Valuation:</span>
                <span className="text-2xl font-serif font-bold text-[#d4af37]">
                  {formatPrice(currentTotalInChf, currency)}
                </span>
              </div>

              <button
                onClick={handleCommission}
                className="w-full py-4 bg-[#d4af37] hover:bg-[#e5c14d] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add Timepiece to Vault Trunk</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
