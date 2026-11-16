import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight, Zap, Check, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onRemoveFromCart,
  onUpdateQuantity,
  onProceedToCheckout
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeThreshold = 150;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end font-mono"
    >
      <div className="fixed inset-0 bg-transparent" onClick={onClose} aria-hidden="true" />
      <div className="w-full max-w-md bg-[#0a0f1d] border-l border-[#1a233a] h-full flex flex-col justify-between p-6 sm:p-8 relative z-10 text-white">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#1a233a]">
            <div>
              <span className="text-[#00f0ff] text-[10px] uppercase tracking-wider block font-bold">COMPETITION BAG</span>
              <h3 id="cart-drawer-title" className="font-sport font-black text-2xl uppercase text-white italic">YOUR GEAR</h3>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-2 hover:bg-[#11192e] rounded-lg transition"
              aria-label="Close competition bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Flask Progress */}
          <div className="my-6 p-4 rounded-xl bg-[#11192e] border border-[#1e2a4a]">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-neutral-400">FREE HYDRATION SOFT FLASK (500ML):</span>
              <span className={subtotal >= freeThreshold ? "text-[#00f0ff] font-bold" : "text-white"}>
                {subtotal >= freeThreshold ? "UNLOCKED ⚡" : `$${freeThreshold - subtotal} away`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00f0ff] transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (subtotal / freeThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-neutral-500 text-xs px-4 leading-relaxed">
                <ShoppingBag className="w-8 h-8 text-neutral-700 mx-auto mb-3" />
                Your competition race bag is empty. Select aerodynamic pieces from our collection to begin your allocation.
              </div>
            ) : (
              cartItems.map((item) => {
                const lineKey = item.cartLineId || `${item.id}-${item.selectedSize || 'M'}-${item.includeAeroSocks ? 'socks' : 'nosocks'}`;
                return (
                  <div key={lineKey} className="p-3 bg-[#11192e] rounded-xl border border-[#1e2a4a] flex flex-col gap-2.5 text-xs">
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg shrink-0 border border-[#1e2a4a]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-sport font-bold text-base text-white italic uppercase truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[#00f0ff] font-bold text-xs">${item.price} USD</span>
                          <span className="bg-[#0a0f1d] text-[#00f0ff] px-1.5 py-0.5 rounded text-[10px] font-bold border border-[#1e2a4a]">
                            SIZE {item.selectedSize || 'M'}
                          </span>
                        </div>
                        {item.includeAeroSocks && (
                          <span className="text-emerald-400 text-[10px] block mt-1 font-bold">
                            + Sonic-Weave Aero Calves
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(lineKey)}
                        className="text-neutral-400 hover:text-rose-500 p-1.5 transition"
                        title="Remove piece"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#0a0f1d] text-xs">
                      <span className="text-neutral-400 text-[11px]">Units:</span>
                      <div className="flex items-center gap-2 bg-[#060a14] border border-[#1e2a4a] px-2 py-0.5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(lineKey, -1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-white text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(lineKey, 1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-[#1a233a] space-y-4">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-neutral-400">TOTAL:</span>
            <span className="font-sport font-black text-2xl text-white italic">${subtotal} USD</span>
          </div>

          <button
            type="button"
            onClick={() => onProceedToCheckout && onProceedToCheckout(subtotal)}
            disabled={cartItems.length === 0}
            className={`w-full py-4 rounded font-sport font-black text-xs uppercase tracking-wider italic transition flex items-center justify-center gap-2 ${
              cartItems.length === 0
                ? 'bg-[#1e2a4a] text-neutral-500 cursor-not-allowed'
                : 'bg-[#00f0ff] hover:bg-[#33f3ff] text-black shadow-lg shadow-[#00f0ff]/20 cursor-pointer'
            }`}
          >
            <span>Express Race Day Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
