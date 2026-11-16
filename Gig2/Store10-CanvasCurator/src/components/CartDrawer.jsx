import React, { useEffect } from 'react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onProceedToCheckout }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="art-cart-title"
      className="fixed inset-0 z-50 overflow-hidden font-gallery"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#e5e5e5] p-6 sm:p-8 flex flex-col justify-between shadow-2xl text-[#111111]">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4 mb-6">
              <div>
                <h3 id="art-cart-title" className="text-xl font-normal font-gallery text-[#111111] uppercase tracking-wider">
                  Acquisitions
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#777777]">
                  {cart.reduce((a, b) => a + b.quantity, 0)} Curated Work(s)
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-[#777777] hover:text-[#111111] text-lg font-light p-2 cursor-pointer"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Crate protection notice */}
            <div className="bg-[#fafafa] p-3 text-xs mb-6 border border-[#e5e5e5]">
              <div className="text-[#111111] font-medium flex items-center gap-1.5">
                <span>✓</span>
                <span>Custom Wooden Art Crate & Full Value Transit Insurance Included</span>
              </div>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#888888] uppercase tracking-widest">
                Your acquisition portfolio is empty.
              </div>
            ) : (
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {cart.map((item) => {
                  const lineKey = item.cartLineId || item.id;
                  return (
                    <div
                      key={lineKey}
                      className="flex gap-4 p-3 bg-[#fafafa] border border-[#e5e5e5] items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover border border-[#e5e5e5]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-gallery text-sm text-[#111111] truncate">
                          {item.name}
                        </h4>
                        <div className="text-[10px] text-[#777777] space-y-0.5">
                          {item.frameChoice && (
                            <div>Frame: <span className="text-[#111111] font-medium">{item.frameChoice}</span></div>
                          )}
                          {item.includeHangingSystem && (
                            <div className="text-[#2b6436] font-medium">+ French Cleat Mounting Kit</div>
                          )}
                          {item.edition && !item.frameChoice && (
                            <div className="truncate">{item.edition}</div>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[#111111] mt-1 font-mono">
                          ${(item.price * item.quantity).toLocaleString()} USD
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(lineKey, item.quantity - 1)}
                          className="w-6 h-6 border border-[#e5e5e5] text-[#111111] hover:bg-[#e5e5e5] flex items-center justify-center text-xs cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(lineKey, item.quantity + 1)}
                          className="w-6 h-6 border border-[#e5e5e5] text-[#111111] hover:bg-[#e5e5e5] flex items-center justify-center text-xs cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemove(lineKey)}
                          className="text-[#999999] hover:text-[#d32f2f] text-xs ml-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          <div className="border-t border-[#e5e5e5] pt-6 mt-6">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-xs uppercase tracking-widest text-[#777777]">Subtotal</span>
              <span className="text-2xl font-gallery text-[#111111]">
                ${subtotal.toLocaleString()} USD
              </span>
            </div>
            <p className="text-[10px] text-[#777777] mb-4 leading-relaxed font-light">
              Includes signed and stamped gallery certificate of authenticity with artist catalogue raisonné entry.
            </p>
            <button
              disabled={cart.length === 0}
              onClick={() => {
                if (onProceedToCheckout) {
                  onProceedToCheckout();
                }
              }}
              className="w-full py-4 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors disabled:bg-[#e5e5e5] disabled:text-[#999999] disabled:cursor-not-allowed cursor-pointer"
            >
              Commission Acquisition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}