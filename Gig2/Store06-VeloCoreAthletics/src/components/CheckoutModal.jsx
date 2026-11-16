import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Zap, Lock, CreditCard, Wind, ArrowRight, Info } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart = [], totalAmount = 0, onOrderSuccess }) {
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
    country: 'United States',
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
      email: 'racer@veloracing.com',
      firstName: 'Julian',
      lastName: 'Alaphilippe',
      address: '1440 Pine Street',
      city: 'Boulder',
      postalCode: '80302',
      country: 'United States',
      cardNumber: '4242 •••• •••• 4242',
      cardExp: '11/28',
      cardCvc: '448'
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === 'VELO20' || normalized === 'VIP20') {
      setDiscountPercent(20);
      setCouponError('');
    } else {
      setCouponError('Invalid racing promo. Try "VELO20" for 20% off.');
    }
  };

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);
  const finalTotal = Math.max(0, totalAmount - discountAmount);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const id = `VELO-${Math.floor(100000 + Math.random() * 900000)}`;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans"
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#0a0f1d] border-2 border-[#00f0ff] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-white">
        {/* Transparent Demo Notice */}
        <div className="bg-[#00f0ff]/15 border-b border-[#00f0ff]/30 px-6 py-2.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#00f0ff]">
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
        <div className="p-6 border-b border-[#1a233a] flex items-center justify-between bg-[#0e1529]">
          <div>
            <span className="text-[10px] text-[#00f0ff] tracking-widest uppercase block font-mono font-bold">BOULDER LAB DIRECT FULFILLMENT</span>
            <h2 id="checkout-modal-title" className="font-sport font-black uppercase text-xl text-white italic">
              {step === 'checkout' ? 'Speed Kit Checkout' : 'Race Allocation Secured'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handlePay} className="p-6 space-y-6">
            {/* Cart Items Summary */}
            <div className="p-4 bg-[#060a14] rounded-xl border border-[#1e2a4a] space-y-2 font-mono">
              <div className="text-xs font-bold text-[#00f0ff] uppercase tracking-wider mb-2">Race Bag Roster ({cart.length}):</div>
              <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                {cart.map((item, idx) => (
                  <div key={item.cartLineId || idx} className="flex justify-between items-center text-xs">
                    <div className="truncate max-w-[280px]">
                      <span className="font-bold text-white uppercase italic">{item.name}</span>
                      <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-[#11192e] text-[#00f0ff]">
                        SIZE {item.selectedSize || 'M'}
                      </span>
                      {item.includeAeroSocks && <span className="text-[10px] ml-1 text-emerald-400 font-bold">+Socks</span>}
                      <span className="text-neutral-500 text-[10px] ml-1.5">×{item.quantity}</span>
                    </div>
                    <span className="font-bold text-white">${item.price * item.quantity} USD</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-3 font-mono">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">1. Athlete Dispatch Coordinates</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-[#060a14] border border-[#1e2a4a] rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff]"
                />
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-[#060a14] border border-[#1e2a4a] rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
              <input
                type="email"
                required
                placeholder="Athlete Telemetry Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#060a14] border border-[#1e2a4a] rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff]"
              />
              <input
                type="text"
                required
                placeholder="Training Base / Street Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#060a14] border border-[#1e2a4a] rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-[#060a14] border border-[#1e2a4a] rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff]"
                />
                <input
                  type="text"
                  required
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="bg-[#060a14] border border-[#1e2a4a] rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
            </div>

            {/* Promo Code */}
            <div className="pt-2 border-t border-[#1a233a] font-mono">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="RACE CODE (e.g. VELO20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#060a14] border border-[#1e2a4a] rounded-lg px-3 py-2 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 bg-[#11192e] hover:bg-[#1a2542] text-white text-xs font-bold uppercase rounded-lg transition"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-rose-400 text-[10px] mt-1 font-bold">{couponError}</p>}
              {discountPercent > 0 && (
                <p className="text-[#00f0ff] text-[10px] mt-1 font-bold">
                  ✓ {discountPercent}% OFF APPLIED (-${discountAmount} USD)
                </p>
              )}
            </div>

            {/* Mock Payment Details */}
            <div className="space-y-3 pt-2 border-t border-[#1a233a] font-mono">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider">
                <span>2. Simulated Express Payment</span>
                <span className="text-[10px] text-neutral-500 font-normal">Test cards accepted</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Card Number (4242...)"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-[#060a14] border border-[#1e2a4a] rounded-lg pl-10 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff]"
                />
                <CreditCard className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={formData.cardExp}
                  onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                  className="bg-[#060a14] border border-[#1e2a4a] rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff]"
                />
                <input
                  type="text"
                  required
                  placeholder="CVC"
                  value={formData.cardCvc}
                  onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                  className="bg-[#060a14] border border-[#1e2a4a] rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
            </div>

            {/* Total Valuation & Submit */}
            <div className="pt-4 border-t border-[#1a233a] flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Total Valuation</span>
                <span className="font-sport font-black italic text-2xl text-[#00f0ff]">${finalTotal} USD</span>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3.5 rounded bg-[#00f0ff] hover:bg-[#33f3ff] text-black font-sport font-black italic text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-[#00f0ff]/20"
              >
                {isProcessing ? (
                  <span>AUTHENTICATING RACE TELEMETRY...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>AUTHORIZE ALLOCATION</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Demo Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] text-[#00f0ff] uppercase tracking-wider font-mono font-bold">DEMO SIMULATION COMPLETED</span>
              <h3 className="font-sport font-black uppercase text-3xl text-white italic mt-1">Race Allocation Secured</h3>
              <p className="text-xs text-neutral-400 mt-2 max-w-md mx-auto leading-relaxed">
                This is a portfolio showcase store. No real charge has been made to your payment card, and your competition bag has been cleared.
              </p>
            </div>

            <div className="p-4 bg-[#060a14] rounded-xl border border-[#1e2a4a] max-w-sm mx-auto text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-500">ROSTER_ID:</span>
                <span className="font-bold text-[#00f0ff]">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">ATHLETE:</span>
                <span className="text-white">{formData.firstName} {formData.lastName || 'Competitor'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">VALUATION:</span>
                <span className="text-white">${finalTotal} USD</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 rounded bg-[#00f0ff] hover:bg-[#33f3ff] text-black font-sport font-black italic text-xs uppercase tracking-wider transition cursor-pointer"
            >
              RETURN TO BOULDER LAB
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
