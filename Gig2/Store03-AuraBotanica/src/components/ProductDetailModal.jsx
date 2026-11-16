import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Heart, Droplets } from 'lucide-react';

export default function ProductDetailModal({ isOpen, onClose, product, onAddToCart, onOpenIngredientLab }) {
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [addRefillPouch, setAddRefillPouch] = useState(false);

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
    if (product) {
      setIsSubscribe(Boolean(product.isSubscribed));
      setAddRefillPouch(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const refillPrice = 38;
  const basePrice = isSubscribe ? Math.round(product.price * 0.85) : product.price;
  const currentTotal = basePrice + (addRefillPouch ? refillPrice : 0);

  const handleAdd = () => {
    onAddToCart({
      ...product,
      price: basePrice,
      isSubscribed: isSubscribe,
      cartLineId: `${product.id}-${isSubscribe ? 'sub' : 'onetime'}`
    });

    if (addRefillPouch) {
      onAddToCart({
        id: `refill-${product.id}`,
        name: `${product.name} (100ml Eco-Pouch Refill)`,
        price: refillPrice,
        priceFormatted: "$38 USD",
        image: product.image,
        volume: "100 ml Eco-Pouch",
        routineStep: "Refill Reserve",
        isSubscribed: false,
        cartLineId: `refill-${product.id}-onetime`
      });
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-[#2c322b]/65 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#fbf8f5] border border-[#ede8e1] rounded-3xl shadow-2xl overflow-hidden my-8 z-10 text-[#2c322b] font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-[#788574] hover:text-[#2c322b] shadow-sm transition"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Photo Showcase */}
          <div className="relative bg-[#f7f3ed] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#ede8e1]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[360px] w-full object-cover rounded-2xl shadow-md"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-[#596455] font-medium border border-[#ede8e1]">
              {product.routineStep}
            </div>
          </div>

          {/* Details & Configuration */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#788574] mb-1 font-mono">
                <span>{product.volume}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-sans">
                  Organic Bio-Ferment
                </span>
              </div>

              <h2 id="product-detail-title" className="font-serif text-3xl font-light text-[#2c322b] mb-2">
                {product.name}
              </h2>

              <p className="text-xs text-[#6e7a6a] font-light leading-relaxed mb-4">
                {product.benefits}
              </p>

              {/* Clinical Metrics */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#ede8e1] mb-5 space-y-2 text-xs">
                <div className="font-medium text-[#2c322b] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3e473d]" />
                  <span>Clinical Efficacy Trial Results (n=32):</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#596455]">
                  <div className="bg-[#fbf8f5] p-2 rounded-lg">
                    <strong>+42.4%</strong> Stratum Hydration
                  </div>
                  <div className="bg-[#fbf8f5] p-2 rounded-lg">
                    <strong>-38.1%</strong> Transepidermal Water Loss
                  </div>
                </div>
              </div>

              {/* Auto-Ship Selection */}
              <div className="space-y-2 mb-4">
                <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  !isSubscribe ? 'bg-white border-[#3e473d]' : 'bg-[#fbf8f5] border-[#ede8e1]'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="purchase_type"
                      checked={!isSubscribe}
                      onChange={() => setIsSubscribe(false)}
                      className="accent-[#3e473d]"
                    />
                    <div className="text-xs">
                      <div className="font-medium text-[#2c322b]">One-Time Pure Delivery</div>
                      <div className="text-[10px] text-[#788574]">Single standard shipment</div>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-base text-[#2c322b]">${product.price} USD</span>
                </label>

                <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  isSubscribe ? 'bg-[#e8f0e6] border-[#3e473d]' : 'bg-[#fbf8f5] border-[#ede8e1]'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="purchase_type"
                      checked={isSubscribe}
                      onChange={() => setIsSubscribe(true)}
                      className="accent-[#3e473d]"
                    />
                    <div className="text-xs">
                      <div className="font-medium text-[#2c322b]">Auto-Replenish Every 60 Days</div>
                      <div className="text-[10px] text-emerald-800">Includes 15% Sustained Savings & Free Shipping</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] line-through text-[#788574] block">${product.price}</span>
                    <span className="font-serif font-bold text-base text-[#3e473d]">${Math.round(product.price * 0.85)} USD</span>
                  </div>
                </label>
              </div>

              {/* Optional Refill Pouch Bundle */}
              <label className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-[#ede8e1] cursor-pointer hover:border-[#c5d8c3] transition select-none">
                <input
                  type="checkbox"
                  checked={addRefillPouch}
                  onChange={(e) => setAddRefillPouch(e.target.checked)}
                  className="mt-0.5 accent-[#3e473d]"
                />
                <div className="text-xs">
                  <div className="font-medium text-[#2c322b] flex items-center justify-between">
                    <span>Bundle Eco-Pouch Refill Reserve (100ml)</span>
                    <span className="text-[#3e473d] font-bold">+$38</span>
                  </div>
                  <div className="text-[10px] text-[#788574] mt-0.5">
                    Reduced carbon footprint packaging. Keeps your violet glass apothecary jar replenished for another 90 days.
                  </div>
                </div>
              </label>
            </div>

            {/* Total Valuation & Add to Basket */}
            <div className="pt-4 border-t border-[#ede8e1] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#788574] uppercase block">Total Selection:</span>
                <span className="font-serif text-2xl font-bold text-[#2c322b]">${currentTotal} USD</span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="px-8 py-3.5 rounded-2xl bg-[#3e473d] hover:bg-[#2c322b] text-[#fbf8f5] font-medium text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                <span>Add Formulation to Basket</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
