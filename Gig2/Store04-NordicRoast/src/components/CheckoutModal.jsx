import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Coffee, ShieldCheck, Lock, CreditCard, Info } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart = [], totalAmount = 0, onOrderSuccess }) {
  const [step, setStep] = useState('checkout');
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
    country: 'Norway',
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
      email: 'roastery@oslo-coffee.no',
      firstName: 'Astrid',
      lastName: 'Lind',
      address: 'Grünerløkka 22',
      city: 'Oslo',
      postalCode: '0552',
      country: 'Norway',
      cardNumber: '4242 •••• •••• 4242',
      cardExp: '11/28',
      cardCvc: '184'
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === 'NORDIC20' || normalized === 'VIP20') {
      setDiscountPercent(20);
      setCouponError('');
    } else {
      setCouponError('Invalid roast coupon. Try "NORDIC20" for 20% off.');
    }
  };

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);
  const finalTotal = Math.max(0, totalAmount - discountAmount);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const id = `NR-${Math.floor(100000 + Math.random() * 900000)}`;
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
      <div className="fixed inset-0 bg-[#1c120c]/75 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#fcfaf7] border-2 border-[#2b1d14] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-[#2b1d14] font-mono">
        {/* Transparent Demo Notice */}
        <div className="bg-[#ebdcc7] border-b border-[#d8c5ab] px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#2b1d14]">
            <Info className="w-4 h-4 shrink-0" />
            <span className="font-bold">PORTFOLIO DEMO CHECKOUT // NO REAL CHARGES</span>
          </div>
          {step === 'checkout' && (
            <button
              type="button"
              onClick={handleFillDemoData}
              className="text-[11px] underline text-[#594637] hover:text-black cursor-pointer font-bold"
            >
              Fill Demo Data
            </button>
          )}
        </div>

        {/* Header */}
        <div className="p-6 border-b border-[#ebdcc7] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#8c7462] tracking-widest uppercase block font-bold">OSLO MICRO-ROASTERY</span>
            <h2 id="checkout-modal-title" className="font-serif text-2xl font-bold text-[#2b1d14]">
              {step === 'checkout' ? 'Coffee Dispatch Checkout' : 'Roast Batch Reserved'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#f2e9dc] text-neutral-400 hover:text-neutral-900 transition"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handlePay} className="p-6 space-y-6">
            {/* Bag Lots Summary */}
            <div className="p-4 bg-white rounded-xl border border-[#ebdcc7] space-y-2">
              <div className="text-xs font-bold text-[#8c7462] uppercase tracking-wider mb-2">Reserved Coffee Lots ({cart.length}):</div>
              <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                {cart.map((item, idx) => (
                  <div key={item.cartLineId || idx} className="flex justify-between items-center text-xs">
                    <div className="truncate max-w-[280px]">
                      <span className="font-bold text-[#2b1d14]">{item.name}</span>
                      <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-[#ebdcc7] text-[#2b1d14]">
                        {item.selectedSize || '250g'} • {item.selectedGrind || 'Whole Bean'}
                      </span>
                      {item.hasSub && <span className="text-[10px] ml-1 text-emerald-700 font-bold">(Sub)</span>}
                      <span className="text-neutral-500 text-[10px] ml-1.5">×{item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#2b1d14]">${item.price * item.quantity} USD</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#594637] uppercase tracking-wider">1. Fresh Dispatch Destination</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-white border border-[#ebdcc7] rounded-lg px-3 py-2 text-xs text-[#2b1d14] placeholder-neutral-400 focus:outline-none focus:border-[#2b1d14]"
                />
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-white border border-[#ebdcc7] rounded-lg px-3 py-2 text-xs text-[#2b1d14] placeholder-neutral-400 focus:outline-none focus:border-[#2b1d14]"
                />
              </div>
              <input
                type="email"
                required
                placeholder="Roast Notification Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-[#ebdcc7] rounded-lg px-3 py-2 text-xs text-[#2b1d14] placeholder-neutral-400 focus:outline-none focus:border-[#2b1d14]"
              />
              <input
                type="text"
                required
                placeholder="Street Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-white border border-[#ebdcc7] rounded-lg px-3 py-2 text-xs text-[#2b1d14] placeholder-neutral-400 focus:outline-none focus:border-[#2b1d14]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-white border border-[#ebdcc7] rounded-lg px-3 py-2 text-xs text-[#2b1d14] placeholder-neutral-400 focus:outline-none focus:border-[#2b1d14]"
                />
                <input
                  type="text"
                  required
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="bg-white border border-[#ebdcc7] rounded-lg px-3 py-2 text-xs text-[#2b1d14] placeholder-neutral-400 focus:outline-none focus:border-[#2b1d14]"
                />
              </div>
            </div>

            {/* Promo Code */}
            <div className="pt-2 border-t border-[#ebdcc7]">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ROAST COUPON (e.g. NORDIC20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-white border border-[#ebdcc7] rounded-lg px-3 py-2 text-xs text-[#2b1d14] uppercase placeholder-neutral-400 focus:outline-none focus:border-[#2b1d14]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 bg-[#2b1d14] hover:bg-[#3d2a1d] text-[#fcfaf7] text-xs font-bold uppercase rounded-lg transition"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-rose-600 text-[10px] mt-1 font-bold">{couponError}</p>}
              {discountPercent > 0 && (
                <p className="text-emerald-700 text-[10px] mt-1 font-bold">
                  ✓ {discountPercent}% OFF APPLIED (-${discountAmount} USD)
                </p>
              )}
            </div>

            {/* Mock Payment Details */}
            <div className="space-y-3 pt-2 border-t border-[#ebdcc7]">
              <div className="flex items-center justify-between text-xs font-bold text-[#594637] uppercase tracking-wider">
                <span>2. Simulated Coffee Payment</span>
                <span className="text-[10px] text-[#8c7462] font-normal">Test cards accepted</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Card Number (4242...)"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-white border border-[#ebdcc7] rounded-lg pl-10 pr-3 py-2 text-xs text-[#2b1d14] placeholder-neutral-400 focus:outline-none focus:border-[#2b1d14]"
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
                  className="bg-white border border-[#ebdcc7] rounded-lg px-3 py-2 text-xs text-[#2b1d14] placeholder-neutral-400 focus:outline-none focus:border-[#2b1d14]"
                />
                <input
                  type="text"
                  required
                  placeholder="CVC"
                  value={formData.cardCvc}
                  onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                  className="bg-white border border-[#ebdcc7] rounded-lg px-3 py-2 text-xs text-[#2b1d14] placeholder-neutral-400 focus:outline-none focus:border-[#2b1d14]"
                />
              </div>
            </div>

            {/* Total Valuation & Submit */}
            <div className="pt-4 border-t border-[#ebdcc7] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8c7462] uppercase block">Total Valuation</span>
                <span className="font-serif text-2xl font-bold text-[#2b1d14]">${finalTotal} USD</span>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3.5 rounded-xl bg-[#2b1d14] hover:bg-[#3d2a1d] text-[#fcfaf7] font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>DISPATCHING ORDER...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>AUTHORIZE DISPATCH</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Demo Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#ebdcc7] text-[#2b1d14] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] text-[#8c7462] uppercase tracking-wider font-bold">DEMO SIMULATION COMPLETED</span>
              <h3 className="font-serif text-3xl font-bold text-[#2b1d14] mt-1">Roast Order Confirmed</h3>
              <p className="text-xs text-[#594637] mt-2 max-w-md mx-auto leading-relaxed">
                This is a portfolio demonstration store. No real charge has been made to your payment card, and your coffee bag has been cleared.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#ebdcc7] max-w-sm mx-auto text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-[#8c7462]">ORDER_ID:</span>
                <span className="font-bold text-[#2b1d14]">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c7462]">PATRON:</span>
                <span className="text-[#2b1d14]">{formData.firstName} {formData.lastName || 'Barista'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c7462]">VALUATION:</span>
                <span className="text-[#2b1d14]">${finalTotal} USD</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 rounded-xl bg-[#2b1d14] hover:bg-[#3d2a1d] text-[#fcfaf7] font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              RETURN TO ROASTERY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
