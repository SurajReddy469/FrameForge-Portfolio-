import React, { useState, useEffect } from 'react';
import { X, Coffee, Award, Sparkles, Sliders, CheckCircle2, Flame, Droplets, Radar, Image as ImageIcon } from 'lucide-react';
import FlavorRadarChart from './FlavorRadarChart';

export default function ProductDetailModal({ isOpen, onClose, coffee, onAddToCart, onOpenBrewTimer }) {
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [selectedSize, setSelectedSize] = useState('250g');
  const [isSub, setIsSub] = useState(false);
  const [addSpoon, setAddSpoon] = useState(false);
  const [visualMode, setVisualMode] = useState('photo'); // 'photo' | 'radar'

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
    if (coffee) {
      setSelectedGrind('Whole Bean');
      setSelectedSize('250g');
      setIsSub(false);
      setAddSpoon(false);
      setVisualMode('photo');
    }
  }, [coffee]);

  if (!isOpen || !coffee) return null;

  const spoonPrice = 18;
  const baseWeightPrice = selectedSize === '1kg' ? Math.round(coffee.price * 3.4) : coffee.price;
  const basePrice = isSub ? Math.round(baseWeightPrice * 0.9) : baseWeightPrice;
  const currentTotal = basePrice + (addSpoon ? spoonPrice : 0);

  const handleAdd = () => {
    onAddToCart({
      ...coffee,
      price: basePrice,
      selectedGrind,
      selectedSize,
      hasSub: isSub,
      cartLineId: `${coffee.id}-${selectedSize}-${selectedGrind}-${isSub ? 'sub' : 'single'}`
    });

    if (addSpoon) {
      onAddToCart({
        id: `cupping-spoon-${coffee.id}`,
        name: "Barista Titanium Cupping Spoon",
        origin: "Kyoto Steelwork",
        price: spoonPrice,
        priceFormatted: "$18 USD",
        selectedGrind: 'Accessory',
        selectedSize: 'One Size',
        hasSub: false,
        cartLineId: `cupping-spoon-${coffee.id}-acc`,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
        description: "Official SCA competition cupping depth bowl."
      });
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="coffee-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans"
    >
      <div className="fixed inset-0 bg-[#1c120c]/75 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#f7f2ea] border-2 border-[#3d271d] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-[#2b1d14]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 shadow-sm transition"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Showcase with Photo / Radar Toggle */}
          <div className="relative bg-[#efe7da] p-6 sm:p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#ebdcc7]">
            {/* Top Bar with SCA Badge and View Mode Switcher */}
            <div className="w-full flex items-center justify-between mb-4">
              <span className="bg-[#2b1d14] text-[#ebdcc7] px-3 py-1 rounded text-xs font-mono font-bold">
                {coffee.scaScore} SCA SPECIALTY
              </span>
              <div className="flex bg-[#ebdcc7] p-1 rounded-lg gap-1 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setVisualMode('photo')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 transition ${
                    visualMode === 'photo'
                      ? 'bg-[#2b1d14] text-white font-bold shadow-sm'
                      : 'text-[#594637] hover:text-[#2b1d14]'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVisualMode('radar')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 transition ${
                    visualMode === 'radar'
                      ? 'bg-[#2b1d14] text-white font-bold shadow-sm'
                      : 'text-[#594637] hover:text-[#2b1d14]'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>SCA Radar</span>
                </button>
              </div>
            </div>

            {/* Display Body: Photo vs Radar */}
            <div className="w-full flex-1 flex items-center justify-center min-h-[300px]">
              {visualMode === 'photo' ? (
                <img
                  src={coffee.image}
                  alt={coffee.name}
                  className="max-h-[340px] w-full object-cover rounded-xl shadow-md transition-all duration-300"
                />
              ) : (
                <div className="p-4 bg-white/60 rounded-2xl border border-[#ebdcc7] w-full flex flex-col items-center justify-center animate-fadeIn">
                  <FlavorRadarChart metrics={coffee.flavorMetrics} size={210} />
                  <div className="mt-4 grid grid-cols-2 gap-2 w-full text-[10px] font-mono text-[#594637]">
                    <div className="bg-white p-2 rounded border border-[#ebdcc7] flex justify-between">
                      <span>Acidity:</span>
                      <strong className="text-[#2b1d14]">{coffee.flavorMetrics?.acidity}%</strong>
                    </div>
                    <div className="bg-white p-2 rounded border border-[#ebdcc7] flex justify-between">
                      <span>Sweetness:</span>
                      <strong className="text-[#2b1d14]">{coffee.flavorMetrics?.sweetness}%</strong>
                    </div>
                    <div className="bg-white p-2 rounded border border-[#ebdcc7] flex justify-between">
                      <span>Body:</span>
                      <strong className="text-[#2b1d14]">{coffee.flavorMetrics?.body}%</strong>
                    </div>
                    <div className="bg-white p-2 rounded border border-[#ebdcc7] flex justify-between">
                      <span>Clarity:</span>
                      <strong className="text-[#2b1d14]">{coffee.flavorMetrics?.clarity}%</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Producer Footer */}
            <div className="mt-4 text-center font-mono text-[11px] text-[#8c7462]">
              Single-Estate Lot &bull; Direct Trade Certified
            </div>
          </div>

          {/* Details & Selection */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono text-[#8c7462] uppercase tracking-wider block mb-1">
                {coffee.origin} • Altitude {coffee.altitude || '1,850 MASL'}
              </span>

              <h2 id="coffee-detail-title" className="font-serif text-3xl font-bold text-[#2b1d14] mb-2">
                {coffee.name}
              </h2>

              <p className="text-xs text-[#594637] font-sans leading-relaxed mb-4">
                {coffee.description}
              </p>

              {/* Tasting Notes */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {coffee.notes?.map((n, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-[#ebdcc7] text-[#2b1d14] text-xs font-mono font-medium rounded">
                    {n}
                  </span>
                ))}
              </div>

              {/* Roast Date Freshness */}
              <div className="p-3 bg-white rounded-xl border border-[#ebdcc7] mb-4 flex items-center gap-2 text-xs font-mono text-[#594637]">
                <Flame className="w-4 h-4 text-[#2b1d14] shrink-0" />
                <span>Small-batch roasted within <strong>48 hours</strong> of fulfillment in Oslo.</span>
              </div>

              {/* Bag Size Selector */}
              <div className="mb-4">
                <span className="text-xs font-mono text-[#8c7462] uppercase block mb-1.5">1. Bag Weight:</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {[
                    { id: '250g', label: '250g Standard Pouch' },
                    { id: '1kg', label: '1kg Barista Reserve' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSize(s.id)}
                      className={`py-2 px-2 border rounded-lg transition ${
                        selectedSize === s.id
                          ? 'bg-[#2b1d14] text-white border-[#2b1d14] font-bold'
                          : 'bg-white text-[#594637] border-[#ebdcc7] hover:border-[#2b1d14]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind Selector */}
              <div className="mb-4">
                <span className="text-xs font-mono text-[#8c7462] uppercase block mb-1.5">2. Precision Grind Profile:</span>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {['Whole Bean', 'Filter V60', 'Espresso'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSelectedGrind(g)}
                      className={`py-2 border rounded-lg transition ${
                        selectedGrind === g
                          ? 'bg-[#2b1d14] text-white border-[#2b1d14] font-bold'
                          : 'bg-white text-[#594637] border-[#ebdcc7] hover:border-[#2b1d14]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub vs One-Time Toggle */}
              <div className="space-y-2 mb-4 font-mono">
                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  !isSub ? 'bg-white border-[#2b1d14]' : 'bg-[#fbf7f2] border-[#ebdcc7]'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="roast_purchase_type"
                      checked={!isSub}
                      onChange={() => setIsSub(false)}
                      className="accent-[#2b1d14]"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-[#2b1d14]">Single Harvest Delivery</div>
                      <div className="text-[10px] text-neutral-500">One-time roasted package</div>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-base text-[#2b1d14]">${baseWeightPrice} USD</span>
                </label>

                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  isSub ? 'bg-[#f0e6d6] border-[#2b1d14]' : 'bg-[#fbf7f2] border-[#ebdcc7]'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="roast_purchase_type"
                      checked={isSub}
                      onChange={() => setIsSub(true)}
                      className="accent-[#2b1d14]"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-[#2b1d14]">Fortnightly Roaster's Club</div>
                      <div className="text-[10px] text-emerald-800">Fresh dispatch every 14 days (Save 10%)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] line-through text-neutral-400 block">${baseWeightPrice}</span>
                    <span className="font-serif font-bold text-base text-[#2b1d14]">${Math.round(baseWeightPrice * 0.9)} USD</span>
                  </div>
                </label>
              </div>

              {/* Optional Cupping Spoon */}
              <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#ebdcc7] cursor-pointer hover:border-[#2b1d14] transition select-none font-mono">
                <input
                  type="checkbox"
                  checked={addSpoon}
                  onChange={(e) => setAddSpoon(e.target.checked)}
                  className="mt-0.5 accent-[#2b1d14]"
                />
                <div className="text-xs">
                  <div className="font-bold text-[#2b1d14] flex items-center justify-between">
                    <span>Bundle Barista Titanium Cupping Spoon</span>
                    <span className="text-[#2b1d14]">+$18</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">
                    Official SCA competition depth bowl for precision cupping evaluations.
                  </div>
                </div>
              </label>
            </div>

            {/* Total Valuation & Add to Cart */}
            <div className="pt-4 border-t border-[#ebdcc7] flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-[#8c7462] uppercase block">Total Lot Valuation:</span>
                <span className="font-serif text-2xl font-bold text-[#2b1d14]">${currentTotal} USD</span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="px-8 py-3.5 rounded-xl bg-[#2b1d14] hover:bg-[#3d2a1d] text-[#fcfaf7] font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                <span>Add {selectedSize} Lot to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
