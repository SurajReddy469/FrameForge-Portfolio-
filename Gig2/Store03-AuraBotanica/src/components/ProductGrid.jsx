import React, { useState } from 'react';
import { ShoppingBag, Check, Sparkles, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/skincareData';

export default function ProductGrid({ onAddToCart, onInspectProduct }) {
  const [subscriptionMode, setSubscriptionMode] = useState({});

  const toggleSubscription = (productId) => {
    setSubscriptionMode(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <section id="routines" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#ede8e1] bg-[#f7f3ed]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[#788574] text-xs uppercase tracking-[0.2em] mb-2 font-medium">
              CORE PROTOCOL FORMULATIONS
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#2c322b]">
              The Clinical Routine
            </h2>
          </div>
          <div className="text-xs text-[#596455] font-light">
            Each formulation is pH-balanced (5.0 - 5.5) to match the acid mantle.
          </div>
        </div>

        {/* 4 Skincare Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((prod) => {
            const isSubscribed = subscriptionMode[prod.id];
            const finalPrice = isSubscribed ? Math.round(prod.price * 0.85) : prod.price;

            return (
              <div
                key={prod.id}
                className="bg-white border border-[#ede8e1] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo */}
                  <div
                    onClick={() => onInspectProduct && onInspectProduct(prod)}
                    className="aspect-square bg-[#fbf8f5] p-6 relative overflow-hidden flex items-center justify-center cursor-pointer"
                  >
                    <img decoding="async" loading="lazy"
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-[#596455] font-medium border border-[#ede8e1]">
                      {prod.routineStep}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <span className="text-[11px] text-[#788574] block mb-1 font-mono">{prod.volume}</span>
                    <h3
                      onClick={() => onInspectProduct && onInspectProduct(prod)}
                      className="font-serif text-xl font-normal text-[#2c322b] mb-1 cursor-pointer hover:text-[#536151] transition-colors"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#6e7a6a] font-light mb-4 leading-relaxed min-h-[36px]">
                      {prod.benefits}
                    </p>

                    {/* Actives Tags */}
                    <div className="space-y-1 pb-4 border-b border-[#ede8e1] text-[11px]">
                      <span className="text-[#788574] text-[10px] uppercase tracking-wider block">KEY BIO-ACTIVES</span>
                      <div className="flex flex-wrap gap-1">
                        {prod.keyActives.map((active, aIdx) => (
                          <span key={aIdx} className="px-2 py-0.5 rounded-full bg-[#f5f0e8] text-[#3e473d] text-[10px]">
                            {active}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Subscribe & Save Toggle */}
                    <div className="my-4 p-3 rounded-2xl bg-[#fbf8f5] border border-[#ede8e1] flex items-center justify-between text-xs">
                      <div>
                        <div className="font-medium text-[#2c322b]">Auto-Replenish</div>
                        <div className="text-[10px] text-[#788574]">Every 60 Days (Save 15%)</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleSubscription(prod.id)}
                        className={`w-10 h-5 rounded-full transition-colors p-0.5 ${
                          isSubscribed ? 'bg-[#3e473d]' : 'bg-[#d8d0c5]'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            isSubscribed ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price and Add Button */}
                <div className="p-6 pt-0">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#788574] block">PRICE</span>
                      <span className="font-serif text-2xl font-bold text-[#2c322b]">
                        ${finalPrice}
                      </span>
                    </div>
                    {isSubscribed && (
                      <span className="text-xs text-[#3e473d] font-bold bg-[#e8f0e6] px-2.5 py-1 rounded-full">
                        15% Savings Applied
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart({ ...prod, price: finalPrice, isSubscribed })}
                    className="w-full py-3.5 rounded-2xl bg-[#3e473d] hover:bg-[#2c322b] text-[#fbf8f5] font-medium text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isSubscribed ? "Subscribe & Add to Basket" : "Add to Routine"}</span>
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
