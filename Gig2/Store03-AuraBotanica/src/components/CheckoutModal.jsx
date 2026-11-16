import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, HeartHandshake, Lock, CreditCard, Info } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart = [], totalAmount = 0, onOrderSuccess }) {
  const [step, setStep] = useState('checkout');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Clean empty form state (no prefilled fake personal/card data)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Japan',
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
      email: 'client@kyoto-botanica.jp',
      firstName: 'Mei',
      lastName: 'Takahashi',
      address: '14 Gion-machi Minamigawa',
      city: 'Kyoto',
      postalCode: '605-0074',
      country: 'Japan',
      cardNumber: '4242 •••• •••• 4242',
      cardExp: '08/28',
      cardCvc: '312'
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === 'BOTANICA20' || normalized === 'VIP20') {
      setDiscountPercent(20);
      setCouponError('');
    } else {
      setCouponError('Invalid botanical code. Try "BOTANICA20" for 20% off.');
    }
  };

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);
  const finalTotal = Math.max(0, totalAmount - discountAmount);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const id = `AB-${Math.floor(100000 + Math.random() * 900000)}`;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#fbf8f5] border border-[#ede8e1] rounded-3xl shadow-2xl overflow-hidden my-8 z-10 text-[#2c322b] font-sans">
        {/* Transparent Demo Notice */}
        <div className="bg-[#e8f0e6] border-b border-[#c5d8c3] px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#334231]">
            <Info className="w-4 h-4 shrink-0 text-[#3e473d]" />
            <span className="font-medium">PORTFOLIO DEMO CHECKOUT // NO REAL PAYMENT REQUIRED</span>
          </div>
          {step === 'checkout' && (
            <button
              type="button"
              onClick={handleFillDemoData}
              className="text-[11px] underline text-[#3e473d] hover:text-black cursor-pointer font-medium"
            >
              Fill Demo Data
            </button>
          )}
        </div>

        {/* Header */}
        <div className="p-6 border-b border-[#ede8e1] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#788574] tracking-widest uppercase block font-medium">BOTANICAL APOTHECARY</span>
            <h2 id="checkout-modal-title" className="font-serif text-2xl font-light text-[#2c322b]">
              {step === 'checkout' ? 'Regimen Dispatch Checkout' : 'Regimen Allocation Reserved'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-200 text-neutral-400 hover:text-neutral-800 transition"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handlePay} className="p-6 space-y-6">
            {/* Basket Items Summary */}
            <div className="p-4 bg-white rounded-2xl border border-[#ede8e1] space-y-2">
              <div className="text-xs font-medium text-[#788574] uppercase tracking-wider mb-2">Formulations in Basket ({cart.length}):</div>
              <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                {cart.map((item, idx) => (
                  <div key={item.cartLineId || idx} className="flex justify-between items-center text-xs">
                    <div className="truncate max-w-[280px]">
                      <span className="font-medium text-[#2c322b]">{item.name}</span>
                      <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded-full bg-[#f5f0e8] text-[#556350]">
                        {item.isSubscribed ? 'Auto-Ship 60d' : 'One-Time'}
                      </span>
                      <span className="text-neutral-500 text-[10px] ml-2">×{item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#2c322b]">${item.price * item.quantity} USD</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-3">
              <div className="text-xs font-medium text-[#596455] uppercase tracking-wider">1. Delivery Destination</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-white border border-[#ede8e1] rounded-xl px-3 py-2 text-xs text-[#2c322b] placeholder-[#9ca899] focus:outline-none focus:border-[#3e473d]"
                />
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-white border border-[#ede8e1] rounded-xl px-3 py-2 text-xs text-[#2c322b] placeholder-[#9ca899] focus:outline-none focus:border-[#3e473d]"
                />
              </div>
              <input
                type="email"
                required
                placeholder="Confirmation Email (for batch harvest tracking)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-[#ede8e1] rounded-xl px-3 py-2 text-xs text-[#2c322b] placeholder-[#9ca899] focus:outline-none focus:border-[#3e473d]"
              />
              <input
                type="text"
                required
                placeholder="Street Address & Apartment"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-white border border-[#ede8e1] rounded-xl px-3 py-2 text-xs text-[#2c322b] placeholder-[#9ca899] focus:outline-none focus:border-[#3e473d]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-white border border-[#ede8e1] rounded-xl px-3 py-2 text-xs text-[#2c322b] placeholder-[#9ca899] focus:outline-none focus:border-[#3e473d]"
                />
                <input
                  type="text"
                  required
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="bg-white border border-[#ede8e1] rounded-xl px-3 py-2 text-xs text-[#2c322b] placeholder-[#9ca899] focus:outline-none focus:border-[#3e473d]"
                />
              </div>
            </div>

            {/* Botanical Promo */}
            <div className="pt-2 border-t border-[#ede8e1]">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="BOTANICAL CODE (e.g. BOTANICA20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-white border border-[#ede8e1] rounded-xl px-3 py-2 text-xs text-[#2c322b] uppercase placeholder-[#9ca899] focus:outline-none focus:border-[#3e473d]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 bg-[#3e473d] hover:bg-[#2c322b] text-[#fbf8f5] text-xs font-medium uppercase rounded-xl transition"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-rose-600 text-[10px] mt-1">{couponError}</p>}
              {discountPercent > 0 && (
                <p className="text-emerald-700 text-[10px] mt-1 font-medium">
                  ✓ {discountPercent}% OFF APPLIED (-${discountAmount} USD)
                </p>
              )}
            </div>

            {/* Mock Payment Details */}
            <div className="space-y-3 pt-2 border-t border-[#ede8e1]">
              <div className="flex items-center justify-between text-xs font-medium text-[#596455] uppercase tracking-wider">
                <span>2. Simulated Botanical Payment</span>
                <span className="text-[10px] text-[#788574] font-normal">Test cards accepted</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Card Number (4242...)"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-white border border-[#ede8e1] rounded-xl pl-10 pr-3 py-2 text-xs text-[#2c322b] placeholder-[#9ca899] focus:outline-none focus:border-[#3e473d]"
                />
                <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={formData.cardExp}
                  onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                  className="bg-white border border-[#ede8e1] rounded-xl px-3 py-2 text-xs text-[#2c322b] placeholder-[#9ca899] focus:outline-none focus:border-[#3e473d]"
                />
                <input
                  type="text"
                  required
                  placeholder="CVC"
                  value={formData.cardCvc}
                  onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                  className="bg-white border border-[#ede8e1] rounded-xl px-3 py-2 text-xs text-[#2c322b] placeholder-[#9ca899] focus:outline-none focus:border-[#3e473d]"
                />
              </div>
            </div>

            {/* Total Valuation & Submit */}
            <div className="pt-4 border-t border-[#ede8e1] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#788574] uppercase block">Total Valuation</span>
                <span className="font-serif text-2xl font-bold text-[#2c322b]">${finalTotal} USD</span>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3.5 rounded-2xl bg-[#3e473d] hover:bg-[#2c322b] text-[#fbf8f5] font-medium text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>DISPATCHING FORMULATION...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>AUTHORIZE HARVEST DISPATCH</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Demo Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#e8f0e6] text-[#3e473d] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] text-[#788574] uppercase tracking-wider font-mono">DEMO SIMULATION COMPLETED</span>
              <h3 className="font-serif text-3xl font-light text-[#2c322b] mt-1">Regimen Confirmed</h3>
              <p className="text-xs text-[#6e7a6a] mt-2 max-w-md mx-auto leading-relaxed">
                This is a portfolio showcase store. No real charge has been made to your payment card, and your botanical basket has been cleared.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#ede8e1] max-w-sm mx-auto text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-[#788574]">DISPATCH_ID:</span>
                <span className="font-bold text-[#3e473d]">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#788574]">CLIENT:</span>
                <span className="text-[#2c322b]">{formData.firstName} {formData.lastName || 'Patron'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#788574]">VALUATION:</span>
                <span className="text-[#2c322b]">${finalTotal} USD</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 rounded-2xl bg-[#3e473d] hover:bg-[#2c322b] text-[#fbf8f5] font-medium text-xs uppercase tracking-wider transition cursor-pointer"
            >
              RETURN TO APOTHECARY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
