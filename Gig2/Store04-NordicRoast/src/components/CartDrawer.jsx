import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight, Coffee, ShieldCheck, Check, Plus, Minus, ShoppingBag } from 'lucide-react';

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
  const freeThreshold = 50;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end font-mono"
    >
      <div className="fixed inset-0 bg-transparent" onClick={onClose} aria-hidden="true" />
      <div className="w-full max-w-md bg-[#fcfaf7] border-l border-[#ebdcc7] h-full flex flex-col justify-between p-6 sm:p-8 relative z-10">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#ebdcc7]">
            <div>
              <span className="text-[#8c7462] text-[10px] uppercase tracking-wider block font-bold">FRESH SELECTION</span>
              <h3 id="cart-drawer-title" className="font-serif text-2xl font-bold text-[#2b1d14]">Your Coffee Bag</h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#7a6453] hover:text-[#2b1d14] p-2 hover:bg-[#f2e9dc] rounded-lg transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping / Spoon Bar */}
          <div className="my-6 p-4 rounded-xl bg-white border border-[#ebdcc7]">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-[#594637]">FREE ROASTER'S CUPPING SPOON:</span>
              <span className={subtotal >= freeThreshold ? "text-[#2b1d14] font-bold" : "text-[#8c7462]"}>
                {subtotal >= freeThreshold ? "UNLOCKED ☕" : `$${freeThreshold - subtotal} away`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#ebdcc7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2b1d14] transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (subtotal / freeThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-[#8c7462] text-xs px-4 leading-relaxed">
                <Coffee className="w-8 h-8 text-[#d8c5ab] mx-auto mb-3" />
                Your coffee bag is empty. Explore our seasonal single-origin harvest micro-lots.
              </div>
            ) : (
              cartItems.map((item) => {
                const lineKey = item.cartLineId || `${item.id}-${item.selectedSize || '250g'}-${item.selectedGrind || 'Whole Bean'}-${item.hasSub ? 'sub' : 'single'}`;
                return (
                  <div key={lineKey} className="p-3 bg-white rounded-xl border border-[#ebdcc7] flex flex-col gap-2.5 text-xs">
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg shrink-0 border border-[#ebdcc7]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base font-bold text-[#2b1d14] truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[#2b1d14] font-bold text-xs">${item.price} USD</span>
                          <span className="bg-[#f2e9dc] text-[#594637] px-1.5 py-0.5 rounded text-[10px] font-bold">
                            {item.selectedSize || '250g'} • {item.selectedGrind || 'Whole Bean'}
                          </span>
                        </div>
                        {item.hasSub && (
                          <span className="text-[10px] text-emerald-800 font-bold block mt-1">
                            ✓ Fortnightly Club Sub (-10%)
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(lineKey)}
                        className="text-[#8c7462] hover:text-rose-600 p-1.5 transition"
                        title="Remove lot"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#f9f6f0] text-xs">
                      <span className="text-[#8c7462] text-[11px]">Quantity:</span>
                      <div className="flex items-center gap-2 bg-[#fcfaf7] border border-[#ebdcc7] px-2 py-0.5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(lineKey, -1)}
                          className="text-[#8c7462] hover:text-[#2b1d14] p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-[#2b1d14] text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(lineKey, 1)}
                          className="text-[#8c7462] hover:text-[#2b1d14] p-0.5"
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
        <div className="pt-6 border-t border-[#ebdcc7] space-y-4">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-[#8c7462]">TOTAL:</span>
            <span className="font-serif text-2xl font-bold text-[#2b1d14]">${subtotal} USD</span>
          </div>

          <button
            type="button"
            onClick={() => onProceedToCheckout && onProceedToCheckout(subtotal)}
            disabled={cartItems.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              cartItems.length === 0
                ? 'bg-[#ebdcc7] text-[#8c7462] cursor-not-allowed'
                : 'bg-[#2b1d14] hover:bg-[#3d2a1d] text-[#fcfaf7] cursor-pointer shadow-md'
            }`}
          >
            <span>Proceed to Roaster Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
