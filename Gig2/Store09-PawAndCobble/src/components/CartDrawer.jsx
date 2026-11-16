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
  const eligibleForFreeTreats = subtotal >= 75;
  const remainingForFreeTreats = Math.max(0, 75 - subtotal);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paw-cart-title"
      className="fixed inset-0 z-50 overflow-hidden font-brand"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcfaf4] border-l border-[#e5ded0] p-6 sm:p-8 flex flex-col justify-between shadow-2xl text-[#2c332b]">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-[#e5ded0] pb-4 mb-6">
              <div>
                <h3 id="paw-cart-title" className="text-xl font-bold font-brand text-[#2c332b] uppercase tracking-wider">
                  Adventure Pack
                </h3>
                <span className="text-[11px] font-bold text-[#445341]">
                  {cart.reduce((a, b) => a + b.quantity, 0)} Dog Item(s) In Cart
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-[#798875] hover:text-[#2c332b] text-xl font-bold p-2 cursor-pointer"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Free organic treat threshold */}
            <div className="bg-[#f7f2e7] p-3 text-xs mb-6 border border-[#e5ded0] rounded-xl">
              {eligibleForFreeTreats ? (
                <div className="text-[#327a3c] font-bold flex items-center gap-1.5">
                  <span>🐾</span>
                  <span>Unlocked: Free Bag of Organic Freeze-Dried Wild Duck Treats ($14 Value)!</span>
                </div>
              ) : (
                <div className="text-[#556352]">
                  Add <strong className="text-[#445341]">${remainingForFreeTreats.toLocaleString()} USD</strong> more to unlock a complimentary pouch of training treats!
                </div>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#798875] uppercase tracking-wider font-bold">
                Your dog's adventure cart is empty.
              </div>
            ) : (
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {cart.map((item) => {
                  const lineKey = item.cartLineId || item.id;
                  return (
                    <div
                      key={lineKey}
                      className="flex gap-4 p-3 bg-[#f7f2e7] border border-[#e5ded0] items-center rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover border border-[#e5ded0] rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-brand font-bold text-sm text-[#2c332b] truncate">
                          {item.name}
                        </h4>
                        <div className="text-[10px] text-[#798875] space-y-0.5">
                          {item.selectedSize && (
                            <div>Size: <span className="font-semibold text-[#2c332b]">{item.selectedSize}</span></div>
                          )}
                          {item.includeTreats && (
                            <div className="text-[#445341] font-medium">+ Duck Jerky Pouch</div>
                          )}
                          {item.tagDetails && (
                            <div className="text-[#445341] font-mono">
                              "{item.tagDetails.dogName}" • {item.tagDetails.phoneLine1}
                            </div>
                          )}
                        </div>
                        <p className="text-xs font-extrabold text-[#445341] mt-1">
                          ${(item.price * item.quantity).toLocaleString()} USD
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(lineKey, item.quantity - 1)}
                          className="w-6 h-6 border border-[#cfc5b4] text-[#2c332b] hover:bg-[#e5ded0] rounded flex items-center justify-center text-xs font-bold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(lineKey, item.quantity + 1)}
                          className="w-6 h-6 border border-[#cfc5b4] text-[#2c332b] hover:bg-[#e5ded0] rounded flex items-center justify-center text-xs font-bold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemove(lineKey)}
                          className="text-[#798875] hover:text-[#d32f2f] text-xs font-bold ml-1 cursor-pointer"
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
          <div className="border-t border-[#e5ded0] pt-6 mt-6">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-xs uppercase tracking-wider font-bold text-[#798875]">Subtotal</span>
              <span className="text-2xl font-extrabold text-[#445341]">
                ${subtotal.toLocaleString()} USD
              </span>
            </div>
            <p className="text-[10px] text-[#798875] mb-4 leading-relaxed">
              Backed by our 100-Day No-Questions-Asked Canine Adventure Trial & Chew-Through Replacement Guarantee.
            </p>
            <button
              disabled={cart.length === 0}
              onClick={() => {
                if (onProceedToCheckout) {
                  onProceedToCheckout();
                }
              }}
              className="w-full py-4 bg-[#445341] text-[#fcfaf4] text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-[#323d30] transition-colors disabled:bg-[#cfc5b4] disabled:cursor-not-allowed shadow-md cursor-pointer"
            >
              Checkout Pack &bull; ${subtotal.toLocaleString()} USD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}