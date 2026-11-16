import React, { useState, useEffect } from 'react';
import { X, Flame, ShieldAlert, Zap, Layers, Sparkles } from 'lucide-react';

export default function ProductDetailModal({ isOpen, onClose, product, onAddToCart, onOpenDropPass }) {
  const [selectedSize, setSelectedSize] = useState('L');
  const [addBalaclava, setAddBalaclava] = useState(false);

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
      setSelectedSize(product.selectedSize || 'L');
      setAddBalaclava(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const balaclavaPrice = 45;
  const currentTotal = product.price + (addBalaclava ? balaclavaPrice : 0);

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedSize,
      cartLineId: `${product.id}-${selectedSize}`
    });

    if (addBalaclava) {
      onAddToCart({
        id: `balaclava-${product.id}`,
        name: "Particulate Filter Tactical Balaclava",
        sku: "ZG-BLC-09",
        price: balaclavaPrice,
        priceFormatted: "$45 USD",
        selectedSize: 'ONE SIZE',
        cartLineId: `balaclava-${product.id}-ONE_SIZE`,
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
        details: "Laser-cut breath vents with carbon filtration."
      });
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#090909] border-2 border-[#ccff00] brutal-shadow overflow-hidden my-8 z-10 text-white font-mono">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-black border border-white hover:border-[#ccff00] text-white hover:text-[#ccff00] flex items-center justify-center font-bold"
          aria-label="Close details"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Display */}
          <div className="relative bg-black flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-[#222]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[380px] w-full object-cover filter contrast-125"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="bg-[#ccff00] text-black text-[10px] font-black px-2 py-0.5 tracking-wider uppercase">
                {product.batch}
              </span>
              <span className="bg-black/90 border border-neutral-700 text-neutral-300 text-[10px] px-2 py-0.5">
                GSM: {product.gsm || '500 GSM'}
              </span>
            </div>
          </div>

          {/* Configuration & Order Panel */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span>SKU: {product.sku}</span>
                <span className="text-[#ccff00]">{product.stockRemaining} LEFT IN BATCH</span>
              </div>

              <h2 id="product-modal-title" className="text-2xl font-black uppercase text-white mb-2 leading-tight">
                {product.name}
              </h2>

              <div className="text-2xl font-black text-[#ccff00] mb-4">
                ${currentTotal} USD
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                {product.description || product.details}
              </p>

              {/* Size Selectors */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400 uppercase">Select Silhouette Size:</span>
                  <span className="text-[#ccff00] font-bold">Selected: {selectedSize}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-bold border transition ${
                        selectedSize === size
                          ? 'bg-[#ccff00] text-black border-[#ccff00]'
                          : 'bg-black text-neutral-300 border-[#333] hover:border-neutral-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-on Accessory */}
              <label className="flex items-start gap-3 p-3 bg-black border border-[#222] hover:border-[#444] cursor-pointer transition select-none">
                <input
                  type="checkbox"
                  checked={addBalaclava}
                  onChange={(e) => setAddBalaclava(e.target.checked)}
                  className="mt-0.5 accent-[#ccff00]"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Bundle Particulate Balaclava</span>
                    <span className="text-[#ccff00]">+$45</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">
                    Laser-cut neoprene particulate cover compatible with this silhouette.
                  </div>
                </div>
              </label>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-[#222]">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs uppercase tracking-widest brutal-shadow transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>ALLOCATE PIECE (${currentTotal} USD)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
