import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight, Cpu, ShieldCheck, Check, Plus, Minus, ShoppingBag } from 'lucide-react';

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end font-mono"
    >
      <div className="fixed inset-0 bg-transparent" onClick={onClose} aria-hidden="true" />
      <div className="w-full max-w-md bg-[#101216] border-l border-[#20242c] h-full flex flex-col justify-between p-6 sm:p-8 relative z-10 text-white">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#20242c]">
            <div>
              <span className="text-[#ff5722] text-[10px] uppercase tracking-wider block font-bold">CUSTOM KEYBOARD TRUNK</span>
              <h3 id="cart-drawer-title" className="font-heading font-black text-2xl uppercase text-white">YOUR BUILD QUEUE</h3>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-2 hover:bg-[#181c22] rounded-lg transition"
              aria-label="Close build queue"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="py-6 space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-neutral-500 text-xs px-4 leading-relaxed">
                <Cpu className="w-8 h-8 text-neutral-700 mx-auto mb-3" />
                Your build queue is empty. Choose a custom CNC chassis and switch combination from the engineering catalog.
              </div>
            ) : (
              cartItems.map((item) => {
                const lineKey = item.cartLineId || `${item.id}-${item.selectedSwitch || 'Linear'}-${item.selectedPlate || 'PC'}-${item.includeLubeKit ? 'lube' : 'nolube'}`;
                return (
                  <div key={lineKey} className="p-3 bg-[#181c22] rounded-xl border border-[#262b34] flex flex-col gap-2.5 text-xs">
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg shrink-0 border border-[#262b34]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-white truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[#ff5722] font-bold text-xs">${item.price} USD</span>
                        </div>
                        <div className="mt-1 space-y-0.5 text-[10px] text-neutral-400">
                          <div>Switch: <span className="text-neutral-200">{item.selectedSwitch || 'Linear (55g)'}</span></div>
                          <div>Plate: <span className="text-neutral-200">{item.selectedPlate || 'Polycarbonate'}</span></div>
                          {item.includeLubeKit && (
                            <span className="text-emerald-400 font-bold block">+ Krytox 205g0 Tuning Kit</span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(lineKey)}
                        className="text-neutral-500 hover:text-rose-400 p-1.5 transition"
                        title="Remove build"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#12151a] text-xs">
                      <span className="text-neutral-500 text-[11px]">Units:</span>
                      <div className="flex items-center gap-2 bg-[#12151a] border border-[#262b34] px-2 py-0.5 rounded-lg">
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
        <div className="pt-6 border-t border-[#20242c] space-y-4">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-neutral-400">TOTAL COMMISSION:</span>
            <span className="font-heading text-2xl font-bold text-[#ff5722]">${subtotal} USD</span>
          </div>

          <button
            type="button"
            onClick={() => onProceedToCheckout && onProceedToCheckout(subtotal)}
            disabled={cartItems.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              cartItems.length === 0
                ? 'bg-[#181c22] text-neutral-600 cursor-not-allowed'
                : 'bg-[#ff5722] hover:bg-[#f4511e] text-white cursor-pointer shadow-lg shadow-[#ff5722]/20'
            }`}
          >
            <span>Proceed to Cleanroom Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
