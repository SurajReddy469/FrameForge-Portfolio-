import React, { useEffect, useState } from 'react';
import { X, Check, ShieldCheck, Home, Truck, CreditCard, Lock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, cart, totalAmount, onOrderSuccess }) {
  const [step, setStep] = useState('checkout'); // 'checkout' | 'success'
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    cardNumber: '',
    cardExp: '',
    cardCvc: ''
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) onClose();
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
      email: 'studio.client@example.com',
      firstName: 'Elena',
      lastName: 'Rostova',
      address: '840 Fifth Avenue',
      city: 'New York',
      postalCode: '10065',
      country: 'United States',
      cardNumber: '4242 4242 4242 4242',
      cardExp: '08/29',
      cardCvc: '123'
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'ATELIER20' || couponCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
      setCouponError('');
    } else {
      setCouponError('Invalid architectural trade code. Try "ATELIER20"');
    }
  };

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);
  const finalTotal = totalAmount - discountAmount;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const id = `AF-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(id);
      setIsProcessing(false);
      setStep('success');
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (onOrderSuccess) onOrderSuccess(id);
    }, 1400);
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="atelier-checkout-title" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-arch">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#f4f1ea] border border-[#ded8cb] rounded-none shadow-2xl overflow-hidden my-8 z-10 text-[#24211d]">
        {/* Header */}
        <div className="bg-[#ebe6dc] px-8 py-5 border-b border-[#ded8cb] flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-widest text-[#7a7164] uppercase block mb-0.5">
              ATELIER FORMA // ARCHITECTURAL PROCUREMENT
            </span>
            <h2 id="atelier-checkout-title" className="text-xl font-arch tracking-wider uppercase text-[#24211d]">
              Private Acquisition Settlement
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#7a7164] hover:text-[#24211d] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#ded8cb] bg-[#f8f6f1] px-6 py-3 text-[10px] uppercase tracking-wider text-[#5c544a]">
          <span>Portfolio preview · no real payment or order is created</span>
          <button type="button" onClick={handleFillDemoData} className="font-semibold text-[#24211d] underline underline-offset-4 hover:text-[#6b5f50]">Fill sample details</button>
        </div>

        {step === 'checkout' ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Express Apple Pay */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#7a7164] block">
                INSTANT ARCHITECTURAL EXPEDITION
              </span>
              <button
                type="button"
                onClick={handlePay}
                className="w-full py-3.5 bg-[#24211d] hover:bg-black text-white font-medium text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Pay with Pay Concierge</span>
              </button>
            </div>

            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-[#ded8cb]" />
              <span className="text-[10px] uppercase tracking-widest text-[#7a7164]">OR TRADE INVOICE / WIRE</span>
              <div className="flex-1 h-px bg-[#ded8cb]" />
            </div>

            {/* Selected Pieces Preview */}
            <div className="bg-[#ebe6dc] p-4 border border-[#ded8cb] space-y-2 max-h-36 overflow-y-auto">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-[#3c362d]">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-mono font-medium text-[#24211d]">${(item.price * item.quantity).toLocaleString()} USD</span>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="TRADE CODE (TRY 'ATELIER20')"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-white border border-[#ded8cb] focus:border-[#24211d] px-4 py-2.5 text-xs uppercase text-[#24211d] outline-none tracking-wider"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#24211d] text-white text-xs uppercase tracking-widest hover:bg-black transition"
              >
                Apply
              </button>
            </form>
            {discountPercent > 0 && (
              <div className="text-xs text-[#2b6436] font-medium">
                ✓ Trade Member Privilege: 20% savings deducted (-${discountAmount.toLocaleString()} USD)
              </div>
            )}
            {couponError && (
              <div className="text-xs text-rose-600 font-medium">{couponError}</div>
            )}

            {/* Form */}
            <form onSubmit={handlePay} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7a7164] mb-1">Architect / Client Name</label>
                  <input
                    type="text"
                    required
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white border border-[#ded8cb] focus:border-[#24211d] p-2.5 text-[#24211d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7a7164] mb-1">Surname</label>
                  <input
                    type="text"
                    required
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white border border-[#ded8cb] focus:border-[#24211d] p-2.5 text-[#24211d] outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="atelier-email" className="block text-[10px] uppercase tracking-wider text-[#7a7164] mb-1">Email</label>
                <input id="atelier-email" type="email" autoComplete="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-[#ded8cb] focus:border-[#24211d] p-2.5 text-[#24211d] outline-none" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#7a7164] mb-1">Residence / Project Delivery Address</label>
                <input
                  type="text"
                  required
                  autoComplete="street-address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-[#ded8cb] focus:border-[#24211d] p-2.5 text-[#24211d] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7a7164] mb-1">City</label>
                  <input type="text" autoComplete="address-level2" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-white border border-[#ded8cb] focus:border-[#24211d] p-2.5 text-[#24211d] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7a7164] mb-1">Postal code</label>
                  <input type="text" autoComplete="postal-code" required value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} className="w-full bg-white border border-[#ded8cb] focus:border-[#24211d] p-2.5 text-[#24211d] outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#7a7164] mb-1">Card number · demo only</label>
                  <input type="text" inputMode="numeric" autoComplete="cc-number" required value={formData.cardNumber} onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} className="w-full bg-white border border-[#ded8cb] focus:border-[#24211d] p-2.5 text-[#24211d] font-mono outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7a7164] mb-1">Expiry</label>
                  <input type="text" autoComplete="cc-exp" placeholder="MM/YY" required value={formData.cardExp} onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })} className="w-full bg-white border border-[#ded8cb] focus:border-[#24211d] p-2.5 text-[#24211d] font-mono outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7a7164] mb-1">CVC</label>
                  <input type="text" inputMode="numeric" autoComplete="cc-csc" required value={formData.cardCvc} onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })} className="w-full bg-white border border-[#ded8cb] focus:border-[#24211d] p-2.5 text-[#24211d] font-mono outline-none" />
                </div>
              </div>
              {/* White Glove Service Check */}
              <div className="p-3 bg-[#ebe6dc] border border-[#ded8cb] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#7a7164]" />
                  <span className="text-[11px] text-[#24211d]">
                    Includes White-Glove In-Home Placement & Packaging Removal
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#2b6436] font-bold">COMPLIMENTARY</span>
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-[#ded8cb] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#7a7164] block">TOTAL ACQUISITION COST</span>
                  <div className="text-2xl font-mono font-bold text-[#24211d]">
                    ${finalTotal.toLocaleString()} USD
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3.5 bg-[#24211d] hover:bg-black text-white text-xs uppercase tracking-widest transition flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Securing Bond...' : `Authorize Acquisition ($${finalTotal.toLocaleString()})`}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#ebe6dc] border border-[#ded8cb] text-[#24211d] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#7a7164] block mb-1">
                ACQUISITION CONFIRMED // ATELIER ARCHIVE
              </span>
              <h3 className="text-2xl font-arch uppercase text-[#24211d]">
                Architectural Consignment Bound
              </h3>
              <p className="text-xs text-[#5c544a] mt-2 max-w-md mx-auto leading-relaxed">
                Certificate of Origin & Provenance dossier registered under consignment code <strong className="text-[#24211d] font-mono">{orderId}</strong>. White-glove installation appointment confirmed.
              </p>
            </div>

            <div className="bg-[#ebe6dc] border border-[#ded8cb] p-4 max-w-md mx-auto text-left text-xs space-y-2 text-[#3c362d]">
              <div className="flex justify-between">
                <span className="text-[#7a7164]">Dedicated Art Handler:</span>
                <span className="font-medium text-[#24211d]">Atelier Forma Private Logistics</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a7164]">Scheduled Window:</span>
                <span className="font-medium text-[#24211d]">Thursday, 10:00 - 14:00 EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a7164]">Architectural CAD/BIM:</span>
                <span className="text-[#2b6436] font-medium">Auto-dispatched to email</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#24211d] text-white text-xs uppercase tracking-widest hover:bg-black transition"
            >
              Return to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
