import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Check, Plus, Minus, Home, Truck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart = [],
  onUpdateQuantity,
  onRemove,
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

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const eligibleForFreeWhiteGlove = subtotal >= 2000;
  const remainingForWhiteGlove = Math.max(0, 2000 - subtotal);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden font-arch"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#f4f1ea] border-l border-[#ded8cb] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative z-10 text-[#24211d]">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-[#ded8cb] pb-4 mb-6">
              <div>
                <h3 id="cart-drawer-title" className="text-xl font-arch text-[#24211d] uppercase tracking-wider">
                  Acquisitions Gallery
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#7a7164]">
                  {cart.length} Architectural Piece(s) Selected
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-[#7a7164] hover:text-[#24211d] p-2 hover:bg-[#ebe6dc] rounded transition"
                aria-label="Close acquisitions cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* White glove notice */}
            <div className="bg-[#ebe6dc] p-3 text-xs mb-6 border border-[#ded8cb]">
              {eligibleForFreeWhiteGlove ? (
                <div className="text-[#2b6436] font-medium flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Complimentary White-Glove In-Home Assembly Qualified ($350 Value)</span>
                </div>
              ) : (
                <div className="text-[#5c544a]">
                  Add <strong className="text-[#24211d]">${remainingForWhiteGlove.toLocaleString()} USD</strong> more to unlock complimentary white-glove installation.
                </div>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#7a7164] uppercase tracking-widest">
                <Home className="w-8 h-8 text-[#ded8cb] mx-auto mb-3" />
                Your acquisition gallery is empty. Select sculptural furniture from Series 04.
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
                {cart.map((item) => {
                  const lineKey = item.cartLineId || `${item.id}-${item.selectedFinish || 'Default'}-${item.includeCareKit ? 'care' : 'nocare'}`;
                  return (
                    <div
                      key={lineKey}
                      className="flex flex-col gap-2 p-3 bg-[#ebe6dc]/60 border border-[#ded8cb]"
                    >
                      <div className="flex gap-4 items-start">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover border border-[#ded8cb] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-arch text-sm text-[#24211d] truncate">
                            {item.name}
                          </h4>
                          <div className="text-[11px] text-[#7a7164] mt-0.5 space-y-0.5">
                            <div>Finish: <span className="text-[#24211d]">{item.selectedFinish || 'Raw Honed'}</span></div>
                            {item.includeCareKit && (
                              <div className="text-[#2b6436] font-medium">+ Archival Care Kit</div>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-[#24211d] mt-1 font-serif">
                            ${(item.price * item.quantity).toLocaleString()} USD
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(lineKey)}
                          className="text-[#9e9587] hover:text-[#d32f2f] p-1 transition"
                          title="Remove piece"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#ded8cb]/60 text-xs">
                        <span className="text-[#7a7164] text-[10px] uppercase">Allocation Units:</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(lineKey, -1)}
                            className="w-6 h-6 border border-[#ded8cb] text-[#24211d] hover:bg-[#ded8cb] flex items-center justify-center text-xs"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono w-4 text-center font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(lineKey, 1)}
                            className="w-6 h-6 border border-[#ded8cb] text-[#24211d] hover:bg-[#ded8cb] flex items-center justify-center text-xs"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          <div className="border-t border-[#ded8cb] pt-6 mt-6">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-xs uppercase tracking-widest text-[#7a7164]">Subtotal</span>
              <span className="text-xl font-serif font-bold text-[#24211d]">
                ${subtotal.toLocaleString()} USD
              </span>
            </div>
            <p className="text-[10px] text-[#7a7164] mb-4 leading-relaxed">
              Includes comprehensive transit insurance and certificate of authenticity signed by Atelier director.
            </p>
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() => onProceedToCheckout && onProceedToCheckout(subtotal)}
              className="w-full py-4 bg-[#24211d] text-[#f4f1ea] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#3d3832] transition-colors disabled:bg-[#ded8cb] disabled:cursor-not-allowed cursor-pointer shadow-md"
            >
              Proceed to Commission Piece
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
