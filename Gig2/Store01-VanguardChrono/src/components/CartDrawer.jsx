import React, { useEffect } from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, Lock, Plus, Minus, Sliders } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
  onProceedToCheckout,
  currency = 'CHF'
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
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end"
    >
      <div
        className="fixed inset-0 bg-transparent"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="w-full max-w-md bg-[#12141a] border-l border-[#22242a] h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#22242a]">
            <div>
              <span className="text-[#d4af37] font-mono text-[10px] tracking-widest uppercase block">ACQUISITION TRUNK</span>
              <h3 id="cart-drawer-title" className="font-serif text-2xl font-normal text-white">Your Selection</h3>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition"
              aria-label="Close acquisition trunk"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="py-6 space-y-4 max-h-[55vh] overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 px-4 text-neutral-500 font-mono text-xs leading-relaxed">
                <Sliders className="w-8 h-8 text-neutral-700 mx-auto mb-3" />
                Your acquisition trunk is empty. Select or configure a masterpiece from the Grandes Complications gallery.
              </div>
            ) : (
              cartItems.map((item) => {
                const lineKey = item.cartLineId || item.id;
                return (
                  <div
                    key={lineKey}
                    className="p-4 rounded-2xl bg-[#090a0c] border border-neutral-800 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl border border-neutral-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base text-white truncate">{item.name}</h4>
                        <span className="text-[#d4af37] font-mono text-xs font-bold block">
                          {formatPrice(item.price, currency)}
                        </span>
                        
                        {/* Bespoke / Custom Options badge */}
                        {(item.selectedDial || item.selectedCase || item.selectedStrap || item.customEngraving || item.addTravelRoll) && (
                          <div className="mt-1.5 p-2 bg-[#12141c] rounded-lg border border-neutral-800/80 text-[10px] font-mono text-neutral-300 space-y-0.5">
                            {item.selectedDial && <div>Dial: <span className="text-[#d4af37]">{item.selectedDial}</span></div>}
                            {item.selectedCase && <div>Case: <span className="text-[#d4af37]">{item.selectedCase}</span></div>}
                            {item.selectedStrap && <div>Strap: <span className="text-[#d4af37]">{item.selectedStrap}</span></div>}
                            {item.customEngraving && <div>Engraving: <span className="text-[#d4af37]">"{item.customEngraving}"</span></div>}
                            {item.addTravelRoll && <div className="text-emerald-400">+ Handcrafted Leather Watch Roll</div>}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(lineKey)}
                        className="text-neutral-500 hover:text-rose-400 p-1.5 rounded transition"
                        title="Remove Timepiece"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-900 text-xs font-mono">
                      <span className="text-neutral-500">Allocation Qty:</span>
                      <div className="flex items-center gap-2 bg-[#14161f] border border-neutral-800 px-2 py-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(lineKey, -1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-white">{item.quantity}</span>
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

        {/* Bottom Checkout Controls */}
        <div className="pt-6 border-t border-[#22242a] space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-neutral-400">Total Valuation:</span>
            <span className="text-2xl font-serif text-white font-bold">
              {formatPrice(subtotal, currency)}
            </span>
          </div>

          <div className="p-3 bg-[#090a0c] rounded-xl border border-neutral-800 flex items-center gap-2.5 text-[11px] font-mono text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>Includes 100% Insured Courier & 5-Year International Manufacture Warranty.</span>
          </div>

          <button
            onClick={() => onProceedToCheckout && onProceedToCheckout(subtotal)}
            disabled={cartItems.length === 0}
            className={`w-full py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              cartItems.length === 0
                ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                : 'bg-[#d4af37] hover:bg-[#e5c14d] text-black shadow-lg shadow-[#d4af37]/20 cursor-pointer'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Proceed to Secure Acquisition</span>
          </button>
        </div>
      </div>
    </div>
  );
}
