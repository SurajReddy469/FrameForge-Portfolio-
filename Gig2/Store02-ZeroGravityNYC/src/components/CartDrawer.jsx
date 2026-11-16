import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Flame, Plus, Minus, ShoppingBag } from 'lucide-react';

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
  const freeThreshold = 250;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-sm flex justify-end"
    >
      <div className="fixed inset-0 bg-transparent" onClick={onClose} aria-hidden="true" />
      <div className="w-full max-w-md bg-[#0d0d0d] border-l-2 border-[#262626] h-full flex flex-col justify-between p-6 sm:p-8 font-mono relative z-10">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#222]">
            <div>
              <span className="text-[#ccff00] text-[10px] tracking-widest uppercase block">DROP 004 CART</span>
              <h3 id="cart-title" className="font-display font-black text-2xl uppercase text-white">YOUR BAG</h3>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-2 hover:bg-neutral-900 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unlockable Free Sticker Pack Progress Bar */}
          <div className="my-6 p-4 bg-black border border-[#222]">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-neutral-400">FREE METALLIC STICKER PACK:</span>
              <span className={subtotal >= freeThreshold ? "text-[#ccff00] font-bold" : "text-white"}>
                {subtotal >= freeThreshold ? "UNLOCKED ⚡" : `$${freeThreshold - subtotal} MORE`}
              </span>
            </div>
            <div className="w-full h-2 bg-[#222] overflow-hidden">
              <div
                className="h-full bg-[#ccff00] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-neutral-500 text-xs px-4 leading-relaxed">
                <ShoppingBag className="w-8 h-8 text-neutral-700 mx-auto mb-3" />
                Your drop bag is empty. Explore Drop 004 tactical garments to begin your allocation.
              </div>
            ) : (
              cartItems.map((item) => {
                const lineKey = item.cartLineId || `${item.id}-${item.selectedSize || 'L'}`;
                return (
                  <div key={lineKey} className="p-3 bg-black border border-[#222] flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover border border-[#333] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-white truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[#ccff00] font-bold text-xs">${item.price} USD</span>
                          <span className="bg-[#222] text-[#ccff00] px-1.5 py-0.5 text-[9px] font-bold">
                            SIZE: {item.selectedSize || 'L'}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(lineKey)}
                        className="text-neutral-500 hover:text-rose-400 p-1.5 transition"
                        title="Remove Item"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a] text-xs">
                      <span className="text-neutral-500 text-[10px]">QUANTITY:</span>
                      <div className="flex items-center gap-2 bg-[#141414] border border-[#262626] px-2 py-0.5">
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

        {/* Footer */}
        <div className="pt-6 border-t border-[#222] space-y-4">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-400">SUBTOTAL:</span>
            <span className="text-xl font-bold text-white">${subtotal} USD</span>
          </div>

          <button
            type="button"
            onClick={() => onProceedToCheckout && onProceedToCheckout(subtotal)}
            disabled={cartItems.length === 0}
            className={`w-full py-4 font-black text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 ${
              cartItems.length === 0
                ? 'bg-[#1a1a1a] text-neutral-600 cursor-not-allowed'
                : 'bg-[#ccff00] hover:bg-[#b8e600] text-black brutal-shadow cursor-pointer'
            }`}
          >
            <span>CHECKOUT DROP PIECES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
