import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Check, Sparkles, Leaf, Plus, Minus, ShoppingBag } from 'lucide-react';

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
  const freeGiftThreshold = 85;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end"
    >
      <div className="fixed inset-0 bg-transparent" onClick={onClose} aria-hidden="true" />
      <div className="w-full max-w-md bg-[#fbf8f5] border-l border-[#ede8e1] h-full flex flex-col justify-between p-6 sm:p-8 relative z-10 font-sans">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#ede8e1]">
            <div>
              <span className="text-[#788574] text-[10px] uppercase tracking-wider block font-medium">YOUR REGIMEN</span>
              <h3 id="cart-drawer-title" className="font-serif text-2xl font-normal text-[#2c322b]">Botanical Basket</h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#788574] hover:text-[#2c322b] p-2 hover:bg-neutral-100 rounded-lg transition"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Gift Progress Bar */}
          <div className="my-6 p-4 rounded-2xl bg-white border border-[#ede8e1]">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-[#596455]">FREE RICE HYDROSOL GIFT:</span>
              <span className={subtotal >= freeGiftThreshold ? "text-[#3e473d] font-bold" : "text-[#788574]"}>
                {subtotal >= freeGiftThreshold ? "UNLOCKED 🌿" : `$${freeGiftThreshold - subtotal} away`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#ede8e1] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3e473d] transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (subtotal / freeGiftThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-[#788574] text-xs px-4 leading-relaxed">
                <ShoppingBag className="w-8 h-8 text-[#9ca899] mx-auto mb-3" />
                Your basket is empty. Formulations selected from the routine will appear here.
              </div>
            ) : (
              cartItems.map((item) => {
                const lineKey = item.cartLineId || `${item.id}-${item.isSubscribed ? 'sub' : 'onetime'}`;
                return (
                  <div key={lineKey} className="p-3 bg-white rounded-2xl border border-[#ede8e1] flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-xl shrink-0 border border-[#ede8e1]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base text-[#2c322b] truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[#3e473d] font-bold text-xs">${item.price} USD</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            item.isSubscribed
                              ? 'bg-[#e8f0e6] text-[#334231] border border-[#c5d8c3]'
                              : 'bg-[#f5f0e8] text-[#788574]'
                          }`}>
                            {item.isSubscribed ? 'Auto-Ship 60d (-15%)' : 'One-Time Delivery'}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(lineKey)}
                        className="text-[#788574] hover:text-rose-600 p-1.5 transition"
                        title="Remove formulation"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#f7f3ed] text-xs">
                      <span className="text-[#788574] text-[11px]">Quantity:</span>
                      <div className="flex items-center gap-2 bg-[#fbf8f5] border border-[#ede8e1] px-2 py-0.5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(lineKey, -1)}
                          className="text-[#788574] hover:text-[#2c322b] p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-[#2c322b] text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(lineKey, 1)}
                          className="text-[#788574] hover:text-[#2c322b] p-0.5"
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

        {/* Bottom Total */}
        <div className="pt-6 border-t border-[#ede8e1] space-y-4">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-[#596455]">ESTIMATED TOTAL:</span>
            <span className="font-serif text-2xl font-bold text-[#2c322b]">${subtotal} USD</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#788574] bg-[#f0eae1] p-3 rounded-xl">
            <Leaf className="w-4 h-4 text-[#3e473d] shrink-0" />
            <span>Shipped in 100% recyclable mycelium foam and violet UV glass.</span>
          </div>

          <button
            type="button"
            onClick={() => onProceedToCheckout && onProceedToCheckout(subtotal)}
            disabled={cartItems.length === 0}
            className={`w-full py-4 rounded-2xl font-medium text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              cartItems.length === 0
                ? 'bg-[#ede8e1] text-[#9ca899] cursor-not-allowed'
                : 'bg-[#3e473d] hover:bg-[#2c322b] text-[#fbf8f5] shadow-sm cursor-pointer'
            }`}
          >
            <span>Proceed to Pure Delivery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
