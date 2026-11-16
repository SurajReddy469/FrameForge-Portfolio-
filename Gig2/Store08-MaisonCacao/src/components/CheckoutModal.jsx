import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Heart, Sparkles, Lock, CreditCard, Snowflake, Award, Info, AlertCircle } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart = [],
  totalAmount = 0,
  attachedCard = null,
  onOrderSuccess
}) {
  const [step, setStep] = useState('checkout'); // 'checkout' | 'success'
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Clean empty initial form state (no prefilled fake PII/credit card data)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    giftMessage: '',
    cardNumber: '',
    cardExp: '',
    cardCvc: ''
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setStep('checkout');
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFillDemoData = () => {
    setFormData({
      email: 'gourmet@parisian.fr',
      firstName: 'Amélie',
      lastName: 'Poulain',
      address: '18 Rue des Martyrs, Montmartre',
      city: 'Paris',
      postalCode: '75009',
      country: 'France',
      giftMessage: 'Pour les moments les plus doux de la vie.',
      cardNumber: '4242 •••• •••• 4242',
      cardExp: '04/28',
      cardCvc: '319'
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === 'CACAO20' || normalized === 'VIP20') {
      setDiscountPercent(20);
      setCouponError('');
    } else {
      setCouponError('Code privilège invalide. Essayez "CACAO20" pour -20%.');
    }
  };

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);
  const finalTotal = Math.max(0, totalAmount - discountAmount);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const id = `MC-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(id);
      setIsProcessing(false);
      setStep('success');
      if (onOrderSuccess) onOrderSuccess(id);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-paris"
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#1c100c] border border-[#c5a059]/40 rounded-xl shadow-2xl overflow-hidden my-8 z-10 text-[#fbf7f2]">
        {/* Transparent Demo Notice */}
        <div className="bg-[#c5a059]/15 border-b border-[#c5a059]/30 px-6 py-2.5 flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2 text-[#c5a059]">
            <Info className="w-4 h-4 shrink-0" />
            <span className="font-bold">PORTFOLIO DEMO CHECKOUT // NO REAL CHARGES</span>
          </div>
          {step === 'checkout' && (
            <button
              type="button"
              onClick={handleFillDemoData}
              className="text-[11px] underline text-neutral-300 hover:text-white cursor-pointer font-bold"
            >
              Fill Demo Data
            </button>
          )}
        </div>

        {/* Header */}
        <div className="p-6 border-b border-[#352115] flex items-center justify-between bg-[#241712]">
          <div>
            <span className="text-[10px] text-[#c5a059] tracking-widest uppercase block font-sans">MAISON DU CACAO &bull; PARIS 1854</span>
            <h2 id="checkout-modal-title" className="text-xl font-bold uppercase text-[#fbf7f2]">
              {step === 'checkout' ? 'Expédition Haute Confiserie' : 'Commande Confirmée'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#9c8474] hover:text-[#fbf7f2] transition"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handlePay} className="p-6 space-y-6 font-sans">
            {/* Basket Items Summary */}
            <div className="p-4 bg-[#140b08] rounded border border-[#352115] space-y-2 text-xs">
              <div className="font-bold text-[#c5a059] uppercase tracking-wider mb-2 font-paris">Sélection en Panier ({cart.length}):</div>
              <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                {cart.map((item, idx) => (
                  <div key={item.cartLineId || idx} className="flex justify-between items-center text-xs">
                    <div className="truncate max-w-[280px]">
                      <span className="font-bold text-white">{item.name}</span>
                      <span className="text-neutral-500 text-[10px] ml-2">×{item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#c5a059]">${item.price * item.quantity} USD</span>
                  </div>
                ))}
              </div>

              {/* Calligraphy card attached notice */}
              {attachedCard && (
                <div className="p-2.5 bg-[#21140e] border border-[#c5a059]/40 rounded mt-2 text-[11px] text-[#fbf7ee] font-serif">
                  <div className="text-[#c5a059] font-sans font-bold text-[10px] uppercase">
                    ✓ Carte Calligraphiée Attachée:
                  </div>
                  <div>Pour: <em>{attachedCard.recipient}</em> &bull; Sceau: <em>{attachedCard.waxColor}</em></div>
                  <div className="text-[10px] text-[#ded4ca] truncate italic mt-0.5">"{attachedCard.message}"</div>
                </div>
              )}
            </div>

            {/* Recipient Coordinates */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#ded4ca] uppercase tracking-wider">1. Adresse de Livraison</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Prénom (First Name)"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-[#140b08] border border-[#352115] rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
                />
                <input
                  type="text"
                  required
                  placeholder="Nom (Last Name)"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-[#140b08] border border-[#352115] rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
              <input
                type="email"
                required
                placeholder="Email de confirmation"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#140b08] border border-[#352115] rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
              />
              <input
                type="text"
                required
                placeholder="Adresse postale complète"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#140b08] border border-[#352115] rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Ville"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-[#140b08] border border-[#352115] rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
                />
                <input
                  type="text"
                  required
                  placeholder="Code Postal"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="bg-[#140b08] border border-[#352115] rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            {/* Privilege Code */}
            <div className="pt-2 border-t border-[#352115]">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="CODE PRIVILÈGE (e.g. CACAO20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#140b08] border border-[#352115] rounded px-3 py-2 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 bg-[#241712] hover:bg-[#352115] text-[#c5a059] text-xs font-bold uppercase rounded border border-[#352115] transition"
                >
                  Appliquer
                </button>
              </div>
              {couponError && <p className="text-rose-400 text-[10px] mt-1 font-bold">{couponError}</p>}
              {discountPercent > 0 && (
                <p className="text-[#c5a059] text-[10px] mt-1 font-bold">
                  ✓ {discountPercent}% APPLIQUÉ (-${discountAmount} USD)
                </p>
              )}
            </div>

            {/* Allergens, Storage & Cold Shipping Transparency Banner */}
            <div className="p-3.5 bg-[#21140e] border border-[#352115] rounded text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-[#c5a059] font-bold text-[11px] uppercase">
                <Snowflake className="w-4 h-4 shrink-0" />
                <span>Chaîne du Froid & Sécurité Alimentaire (Cold-Chain Guarantee)</span>
              </div>
              <div className="text-[11px] text-[#ded4ca] space-y-1 leading-relaxed">
                <div>
                  <strong>Allergènes présents:</strong> Lait (crème fraîche d'Isigny), fruits à coque (noisettes du Piémont, amandes de Valence), lécithine de soja. Traces possibles d'arachides et de sésame.
                </div>
                <div>
                  <strong>Conservation:</strong> Conserver entre 16°C et 18°C à l'abri de l'humidité. Ne pas réfrigérer pour préserver le brillant cristallin du beurre de cacao.
                </div>
                <div>
                  <strong>Garantie Température:</strong> Expédition sous pochette isotherme avec gel cryogénique alimentaire garantissant une température sous 20°C pendant 48 heures.
                </div>
              </div>
            </div>

            {/* Mock Payment Details */}
            <div className="space-y-3 pt-2 border-t border-[#352115]">
              <div className="flex items-center justify-between text-xs font-bold text-[#ded4ca] uppercase tracking-wider">
                <span>2. Règlement Sécurisé Simulé</span>
                <span className="text-[10px] text-neutral-400 font-normal">Cartes de test acceptées</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Numéro de Carte (4242...)"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-[#140b08] border border-[#352115] rounded pl-10 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
                />
                <CreditCard className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="MM/AA"
                  value={formData.cardExp}
                  onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                  className="bg-[#140b08] border border-[#352115] rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
                />
                <input
                  type="text"
                  required
                  placeholder="CVC"
                  value={formData.cardCvc}
                  onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                  className="bg-[#140b08] border border-[#352115] rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            {/* Total Valuation & Submit */}
            <div className="pt-4 border-t border-[#352115] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase block font-sans">Total de la Commande</span>
                <span className="font-paris text-2xl font-bold text-[#c5a059]">${finalTotal} USD</span>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3.5 rounded bg-[#c5a059] hover:bg-[#b08c46] text-[#1c100c] font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-[#c5a059]/20"
              >
                {isProcessing ? (
                  <span>AUTHENTIFICATION DE LA COMMANDE...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>CONFIRMER LA COMMANDE</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Demo Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#c5a059]/20 border border-[#c5a059] text-[#c5a059] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] text-[#c5a059] uppercase tracking-wider font-sans font-bold">DEMO SIMULATION COMPLETED</span>
              <h3 className="font-paris text-3xl font-bold uppercase text-white mt-1">Chocolats Réservés</h3>
              <p className="text-xs text-[#ded4ca] mt-2 max-w-md mx-auto leading-relaxed">
                Ceci est une boutique de démonstration portfolio. Aucun débit réel n'a été effectué sur votre carte, et votre panier a été réinitialisé.
              </p>
            </div>

            <div className="p-4 bg-[#140b08] rounded border border-[#352115] max-w-sm mx-auto text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-500">COMMANDE_ID:</span>
                <span className="font-bold text-[#c5a059]">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">CLIENT:</span>
                <span className="text-white">{formData.firstName} {formData.lastName || 'Gourmet'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">TOTAL:</span>
                <span className="text-white">${finalTotal} USD</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 rounded bg-[#c5a059] hover:bg-[#b08c46] text-[#1c100c] font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              RETOURNER À LA BOUTIQUE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
