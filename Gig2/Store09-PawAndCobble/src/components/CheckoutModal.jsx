import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Heart, Dog, Lock, Sparkles, Truck, AlertCircle, Sparkle } from 'lucide-react';
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
    dogName: '',
    dogBreed: '',
    cardNumber: '',
    cardExp: '',
    cardCvc: ''
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFillDemoData = () => {
    setFormData({
      email: 'oliver.trailpup@adventurehound.com',
      firstName: 'Oliver',
      lastName: 'Bennett',
      address: '742 Evergreen Trail, Cabin 4',
      city: 'Aspen',
      postalCode: '81611',
      country: 'United States',
      dogName: 'Barnaby',
      dogBreed: 'Golden Retriever (72 lbs)',
      cardNumber: '4012 •••• •••• 9214',
      cardExp: '09/28',
      cardCvc: '614'
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'PUPPY20' || couponCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
      setCouponError('');
    } else {
      setCouponError('Invalid pack coupon. Try "PUPPY20"');
    }
  };

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);
  const finalTotal = totalAmount - discountAmount;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const id = `PC-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(id);
      setIsProcessing(false);
      setStep('success');
      try {
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe confetti fallback
      }
      if (onOrderSuccess) onOrderSuccess(id);
    }, 1250);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paw-checkout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-brand"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#fcfaf4] border-2 border-[#445341] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-[#2c332b]">
        {/* Top Disclaimer Banner */}
        <div className="bg-[#445341] text-[#fcfaf4] px-4 py-2 text-center text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-amber-300" />
          <span>PORTFOLIO DEMO CHECKOUT // NO REAL CHARGES // PROTOTYPE SYSTEM</span>
        </div>

        {/* Header */}
        <div className="bg-[#f0ebe0] px-8 py-5 border-b border-[#e5ded0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🐾</span>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#445341] font-bold block">
                PAW & COBBLE // HERITAGE CANINE OUTFITTERS
              </span>
              <h2 id="paw-checkout-title" className="text-xl font-bold uppercase tracking-wider text-[#2c332b]">
                Adventure Pack Checkout
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Checkout"
            className="p-1 rounded text-[#798875] hover:text-[#2c332b] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Quick Demo Fill & Apple Pay */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-widest text-[#798875] font-bold">
                EXPRESS PUPPY CHECKOUT
              </span>
              <button
                type="button"
                onClick={handleFillDemoData}
                className="text-[11px] font-bold text-[#445341] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>⚡ Fill Demo Data</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handlePay}
              className="w-full py-3.5 bg-[#2c332b] hover:bg-black text-[#fcfaf4] font-bold text-xs uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Pay with Pay 1-Click (Simulation)</span>
            </button>

            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-[#e5ded0]" />
              <span className="text-[10px] uppercase tracking-widest text-[#798875] font-bold">OR CREDIT CARD</span>
              <div className="flex-1 h-px bg-[#e5ded0]" />
            </div>

            {/* Selected Gear Preview */}
            <div className="bg-[#f7f2e7] p-4 border border-[#e5ded0] rounded-xl space-y-2 max-h-36 overflow-y-auto">
              {cart.map((item, idx) => (
                <div key={item.cartLineId || idx} className="flex justify-between items-center text-xs">
                  <span className="text-[#3c463b] font-medium">
                    {item.name} {item.selectedSize ? `(${item.selectedSize})` : ''} × {item.quantity}
                  </span>
                  <span className="font-mono font-bold text-[#445341]">
                    ${(item.price * item.quantity).toLocaleString()} USD
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="PACK PROMO (TRY 'PUPPY20')"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-white border border-[#e5ded0] focus:border-[#445341] px-4 py-2.5 rounded-xl text-xs uppercase text-[#2c332b] outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#445341] hover:bg-[#344031] text-white font-bold text-xs uppercase rounded-xl transition cursor-pointer"
              >
                Apply
              </button>
            </form>
            {discountPercent > 0 && (
              <div className="text-xs text-[#327a3c] font-bold">
                ✓ Puppy VIP Code Applied: 20% savings deducted (-${discountAmount} USD)
              </div>
            )}
            {couponError && (
              <div className="text-xs text-rose-600 font-bold">{couponError}</div>
            )}

            {/* Form */}
            <form onSubmit={handlePay} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#798875] font-bold mb-1">Human Parent Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Oliver Bennett"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white border border-[#e5ded0] focus:border-[#445341] p-2.5 rounded-lg text-[#2c332b] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#798875] font-bold mb-1">Dog's Name & Breed</label>
                  <input
                    type="text"
                    required
                    placeholder="Barnaby (Golden Retriever)"
                    value={formData.dogName}
                    onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                    className="w-full bg-white border border-[#e5ded0] focus:border-[#445341] p-2.5 rounded-lg text-[#2c332b] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#798875] font-bold mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  placeholder="742 Evergreen Trail, Cabin 4"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-[#e5ded0] focus:border-[#445341] p-2.5 rounded-lg text-[#2c332b] outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#798875] font-bold mb-1">Credit Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4012 •••• •••• 9214"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full bg-white border border-[#e5ded0] focus:border-[#445341] p-2.5 rounded-lg text-[#2c332b] font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#798875] font-bold mb-1">EXP / CVC</label>
                  <input
                    type="text"
                    required
                    placeholder="09/28 • 614"
                    value={formData.cardExp}
                    onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                    className="w-full bg-white border border-[#e5ded0] focus:border-[#445341] p-2.5 rounded-lg text-[#2c332b] font-mono text-center outline-none"
                  />
                </div>
              </div>

              {/* Surfaced Care Instructions & Lifetime Hardware Warranty */}
              <div className="p-3.5 bg-[#f7f2e7] border border-[#e5ded0] rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-[#2c332b]">
                    <ShieldCheck className="w-4 h-4 text-[#445341]" />
                    <span>Lifetime Hardware & Chew-Through Warranty</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#327a3c] font-bold">GUARANTEED</span>
                </div>
                <p className="text-[11px] text-[#556352] leading-relaxed">
                  <strong>Leather Care Protocol:</strong> Rinse mud with clean tap water; dry naturally away from radiators. Apply a thin coat of natural beeswax balm once every 6 months to preserve bridle suppleness. Solid brass hardware will develop a warm heirloom patina over seasons of use.
                </p>
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-[#e5ded0] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#798875] font-bold block">DEMO TOTAL AMOUNT</span>
                  <div className="text-2xl font-mono font-bold text-[#445341]">
                    ${finalTotal.toLocaleString()} USD
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3.5 bg-[#445341] hover:bg-[#344031] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg shadow-[#445341]/25 disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Processing Demo...' : `Place Demo Order ($${finalTotal})`}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#f0ebe0] border-2 border-[#445341] text-[#445341] flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#445341] font-bold block mb-1">
                DEMO RESERVATION CONFIRMED // PORTFOLIO PREVIEW
              </span>
              <h3 className="text-2xl font-bold uppercase text-[#2c332b]">
                Adventure Gear Configured for {formData.dogName || 'Your Dog'}!
              </h3>
              <p className="text-xs text-[#556352] mt-2 max-w-md mx-auto leading-relaxed">
                Thank you for previewing Paw & Cobble. Reference code <strong className="text-[#445341] font-mono">{orderId}</strong> recorded in session memory. No real credit card charges were processed.
              </p>
            </div>

            <div className="bg-[#f7f2e7] border border-[#e5ded0] p-4 max-w-md mx-auto text-left text-xs space-y-2 text-[#3c463b] rounded-xl">
              <div className="flex justify-between">
                <span className="text-[#798875]">Craft Guild:</span>
                <span className="font-bold text-[#2c332b]">Paw & Cobble Oregon Workshop</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#798875]">Warranty:</span>
                <span className="font-bold text-[#327a3c]">Lifetime Rivet & Brass Guarantee</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#798875]">Care Guide:</span>
                <span className="text-[#445341] font-bold">Beeswax balm kit included</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#445341] hover:bg-[#344031] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition cursor-pointer"
            >
              Back to Dog Supplies
            </button>
          </div>
        )}
      </div>
    </div>
  );
}