import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldAlert } from 'lucide-react';
import { PRODUCTS } from '../data/streetwearData';

export default function ProductGrid({ onAddToCart, onInspectProduct }) {
  const [selectedSizes, setSelectedSizes] = useState({
    'exo-jacket-04': 'L',
    'kevlar-cargo': 'M',
    'matrix-hoodie': 'L',
    'combat-vest': 'M'
  });

  const handleSelectSize = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  return (
    <section id="drop-products" className="py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-[#222222] bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[#ccff00] font-mono text-xs uppercase tracking-widest mb-1">
              LIMITED QUANTITY RUN
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
              DROP 004 CATALOG
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-400">
            TOTAL UNITS: <strong className="text-white">150 PCS</strong> • STATUS: <strong className="text-[#ccff00]">LIVE ONLINE</strong>
          </div>
        </div>

        {/* 4 Brutalist Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((prod) => {
            const currentSize = selectedSizes[prod.id] || 'M';
            const remainingStock = prod.stock[currentSize];
            const isSoldOut = remainingStock === 0;

            return (
              <div
                key={prod.id}
                className="bg-[#111111] border-2 border-[#262626] hover:border-[#ccff00] transition-all flex flex-col justify-between group p-4"
              >
                <div>
                  {/* Image Box */}
                  <div
                    onClick={() => onInspectProduct && onInspectProduct(prod)}
                    className="aspect-[4/5] bg-black border border-[#222] relative overflow-hidden mb-4 cursor-pointer"
                  >
                    <img decoding="async" loading="lazy"
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-black border border-[#333] px-2 py-0.5 text-[10px] font-mono text-white">
                      {prod.sku}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-[#ccff00] text-black px-2 py-0.5 text-[10px] font-mono font-bold">
                      {prod.badge}
                    </div>
                  </div>

                  {/* Info */}
                  <h3
                    onClick={() => onInspectProduct && onInspectProduct(prod)}
                    className="font-display font-bold text-xl text-white mb-1 group-hover:text-[#ccff00] transition-colors cursor-pointer"
                  >
                    {prod.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mb-4 leading-relaxed min-h-[32px]">
                    {prod.details}
                  </p>

                  <div className="space-y-1 text-[11px] font-mono text-neutral-400 pb-4 border-b border-[#222]">
                    <div className="text-neutral-300">Fabric: {prod.fabric}</div>
                    <div className="text-neutral-400">Fit: {prod.fit}</div>
                  </div>

                  {/* Size Selector */}
                  <div className="my-4">
                    <div className="flex justify-between text-[11px] font-mono mb-1.5">
                      <span className="text-neutral-400">SIZE:</span>
                      <span className={remainingStock <= 2 && remainingStock > 0 ? "text-rose-400 font-bold" : "text-[#ccff00]"}>
                        {isSoldOut ? "SOLD OUT" : `${remainingStock} LEFT`}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
                      {['S', 'M', 'L', 'XL'].map((size) => {
                        const inStock = prod.stock[size] > 0;
                        const isSelected = currentSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            disabled={!inStock}
                            onClick={() => handleSelectSize(prod.id, size)}
                            className={`py-1.5 border transition ${
                              isSelected
                                ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                                : inStock
                                ? 'bg-black text-white border-[#333] hover:border-white'
                                : 'bg-[#1a1a1a] text-neutral-600 border-[#222] cursor-not-allowed line-through'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Price and Add to Bag */}
                <div className="pt-2">
                  <div className="flex items-baseline justify-between mb-3 font-mono">
                    <span className="text-xs text-neutral-500">PRICE:</span>
                    <span className="text-xl font-bold text-white">{prod.priceFormatted}</span>
                  </div>

                  <button
                    onClick={() => onAddToCart({ ...prod, selectedSize: currentSize })}
                    disabled={isSoldOut}
                    className={`w-full py-3 font-mono font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
                      isSoldOut
                        ? 'bg-[#1a1a1a] text-neutral-600 border border-[#222] cursor-not-allowed'
                        : 'bg-white hover:bg-[#ccff00] text-black transition-all brutal-shadow'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isSoldOut ? "OUT OF STOCK" : `ADD ${currentSize} TO BAG`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
