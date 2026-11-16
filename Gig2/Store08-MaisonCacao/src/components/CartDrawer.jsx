import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Check, Plus, Minus, ShoppingBag, Snowflake } from 'lucide-react';

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
  const eligibleForFreeColdShip = subtotal >= 95;
  const remainingForFreeColdShip = Math.max(0, 95 - subtotal);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden font-paris"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1c100c] border-l border-[#352115] p-6 sm:p-8 flex flex-col justify-between shadow-2xl text-[#fbf7f2] relative z-10">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-[#352115] pb-4 mb-6">
              <div>
                <h3 id="cart-drawer-title" className="text-xl font-paris text-[#fbf7f2] uppercase tracking-wider">
                  Votre Panier Gourmand
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-sans">
                  {cart.length} Confection(s) Selected
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-[#9c8474] hover:text-[#fbf7f2] p-2 hover:bg-[#241712] rounded transition"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cold chain shipping notice */}
            <div className="bg-[#241712] p-3 text-xs mb-6 border border-[#352115] rounded font-sans">
              {eligibleForFreeColdShip ? (
                <div className="text-[#c5a059] font-medium flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Emballage Isotherme & Froid Cryogénique Offert ($18 Valeur)</span>
                </div>
              ) : (
                <div className="text-[#ded4ca]">
                  Ajoutez <strong className="text-[#c5a059]">${remainingForFreeColdShip.toLocaleString()} USD</strong> de plus pour l'emballage isotherme offert.
                </div>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#9c8474] uppercase tracking-widest font-sans">
                <ShoppingBag className="w-8 h-8 text-[#5a3e2b] mx-auto mb-3" />
                Votre panier est vide. Découvrez notre collection de grands crus.
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1 font-sans">
                {cart.map((item) => {
                  const lineKey = item.cartLineId || `${item.id}-${item.boxStyle || 'Standard'}-${item.includeChampagneTruffles ? 'champ' : 'nochamp'}`;
                  return (
                    <div
                      key={lineKey}
                      className="flex flex-col gap-2 p-3 bg-[#241712] border border-[#352115] rounded"
                    >
                      <div className="flex gap-4 items-start">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover border border-[#352115] rounded shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-paris text-sm text-[#fbf7f2] truncate">
                            {item.name}
                          </h4>
                          <div className="text-[11px] text-[#aa9585] mt-0.5 space-y-0.5">
                            {item.boxStyle && <div>Écrin: <span className="text-[#fbf7f2]">{item.boxStyle}</span></div>}
                            {item.includeChampagneTruffles && (
                              <div className="text-[#c5a059] font-medium">+ 4 Truffes Champagne</div>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-[#c5a059] mt-1 font-sans">
                            ${(item.price * item.quantity).toLocaleString()} USD
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(lineKey)}
                          className="text-[#9c8474] hover:text-rose-400 p-1 transition"
                          title="Supprimer la confiserie"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#352115] text-xs">
                        <span className="text-[#9c8474] text-[10px] uppercase">Quantité:</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(lineKey, -1)}
                            className="w-6 h-6 border border-[#352115] text-[#fbf7f2] hover:bg-[#352115] flex items-center justify-center text-xs rounded"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono w-4 text-center font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(lineKey, 1)}
                            className="w-6 h-6 border border-[#352115] text-[#fbf7f2] hover:bg-[#352115] flex items-center justify-center text-xs rounded"
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
          <div className="border-t border-[#352115] pt-6 mt-6 font-sans">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-xs uppercase tracking-widest text-[#9c8474]">Sous-Total</span>
              <span className="text-xl font-paris font-bold text-[#c5a059]">
                ${subtotal.toLocaleString()} USD
              </span>
            </div>
            <p className="text-[10px] text-[#9c8474] mb-4 leading-relaxed">
              Expédition fraîcheur 24/48h. Température garantie sous 20°C pour protéger les précieux beurres de cacao.
            </p>
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() => onProceedToCheckout && onProceedToCheckout(subtotal)}
              className="w-full py-4 bg-[#c5a059] text-[#1c100c] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#b08c46] transition-colors disabled:bg-[#352115] disabled:text-[#7a6453] disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[#c5a059]/20 rounded"
            >
              Commander les Créations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
