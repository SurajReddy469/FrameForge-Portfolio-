import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, CheckCircle2, Zap, ArrowRight, Lock, CreditCard, Sparkles, Info } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart = [], totalAmount = 0, onOrderSuccess }) {
  const [step, setStep] = useState('checkout'); // 'checkout' | 'success'
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Clean empty form state (no prefilled fake PII/credit card data)
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

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state on modal open
  useEffect(() => {
    if (isOpen) {
      setStep('checkout');
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFillDemoData = () => {
    setFormData({
      email: 'collector@zerogravity.nyc',
      firstName: 'Kai',
      lastName: 'Vexler',
      address: '482 Broome St, Loft 4B',
      city: 'New York',
      postalCode: '10013',
      country: 'United States',
      cardNumber: '4242 •••• •••• 4242',
      cardExp: '12/28',
      cardCvc: '888'
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === 'CYBER20' || normalized === 'VIP20') {
      setDiscountPercent(20);
      setCouponError('');
    } else if (normalized === 'HYPE') {
      setDiscountPercent(15);
      setCouponError('');
    } else {
      setCouponError('INVALID DROP CODE. TRY "CYBER20" FOR 20% OFF');
    }
  };

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);
  const finalTotal = Math.max(0, totalAmount - discountAmount);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const id = `ZG-${Math.floor(100000 + Math.random() * 900000)}`;
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
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#080808] border-2 border-[#ccff00] brutal-shadow overflow-hidden my-8 z-10 text-white font-mono">
        {/* Transparent Portfolio Prototype Notice */}
        <div className="bg-[#ccff00]/10 border-b border-[#ccff00]/30 px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#ccff00]">
            <Info className="w-4 h-4 shrink-0" />
            <span className="font-bold tracking-wider">PORTFOLIO DEMO CHECKOUT // NO REAL PAYMENT REQUIRED</span>
          </div>
          {step === 'checkout' && (
            <button
              type="button"
              onClick={handleFillDemoData}
              className="text-[11px] underline text-neutral-300 hover:text-[#ccff00] cursor-pointer"
            >
              Fill Demo Data
            </button>
          )}
        </div>

        {/* Header */}
        <div className="p-6 border-b border-[#222] flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#ccff00] tracking-widest uppercase">ENCRYPTED TACTICAL DISPATCH</div>
            <h2 id="checkout-modal-title" className="text-xl font-black uppercase text-white">
              {step === 'checkout' ? 'Order Allocation Protocol' : 'Allocation Confirmed'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 border border-neutral-700 hover:border-[#ccff00] text-neutral-400 hover:text-[#ccff00]"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handlePay} className="p-6 space-y-6">
            {/* Cart Summary */}
            <div className="p-4 bg-black border border-[#222] space-y-2">
              <div className="text-xs text-neutral-400 font-bold uppercase mb-2">Allocated Gear ({cart.length} unique items):</div>
              <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                {cart.map((item, idx) => (
                  <div key={item.cartLineId || idx} className="flex justify-between items-center text-xs">
                    <div className="truncate max-w-[280px]">
                      <span className="text-white">{item.name}</span>
                      <span className="text-[#ccff00] text-[10px] ml-2">SIZE: {item.selectedSize || 'L'}</span>
                      <span className="text-neutral-500 text-[10px] ml-2">×{item.quantity}</span>
                    </div>
                    <span className="font-bold text-white">${item.price * item.quantity} USD</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operative Contact */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">1. Recipient Coordinates</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-black border border-[#333] px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00]"
                />
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-black border border-[#333] px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00]"
                />
              </div>
              <input
                type="email"
                required
                placeholder="Tactical Comms Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black border border-[#333] px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00]"
              />
              <input
                type="text"
                required
                placeholder="Delivery Street Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-black border border-[#333] px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-black border border-[#333] px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00]"
                />
                <input
                  type="text"
                  required
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="bg-black border border-[#333] px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00]"
                />
              </div>
            </div>

            {/* Promo Code */}
            <div className="pt-2 border-t border-[#222]">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="DISPATCH CODE (e.g. CYBER20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-black border border-[#333] px-3 py-2 text-xs text-white uppercase placeholder-neutral-600 focus:outline-none focus:border-[#ccff00]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 bg-[#222] hover:bg-[#333] text-white text-xs font-bold uppercase transition"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-rose-400 text-[10px] mt-1">{couponError}</p>}
              {discountPercent > 0 && (
                <p className="text-[#ccff00] text-[10px] mt-1 font-bold">
                  ✓ {discountPercent}% OFF APPLIED (-${discountAmount} USD)
                </p>
              )}
            </div>

            {/* Mock Payment Details */}
            <div className="space-y-3 pt-2 border-t border-[#222]">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider">
                <span>2. Simulated Payment Vault</span>
                <span className="text-[10px] text-neutral-500 font-normal">Test cards accepted</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Card Number (4242...)"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-black border border-[#333] pl-10 pr-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00]"
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
                  className="bg-black border border-[#333] px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00]"
                />
                <input
                  type="text"
                  required
                  placeholder="CVC"
                  value={formData.cardCvc}
                  onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                  className="bg-black border border-[#333] px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#ccff00]"
                />
              </div>
            </div>

            {/* Total Valuation & Submit */}
            <div className="pt-4 border-t border-[#222] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Final Valuation</span>
                <span className="text-2xl font-black text-[#ccff00]">${finalTotal} USD</span>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs uppercase tracking-widest brutal-shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>AUTHENTICATING PROTOCOL...</span>
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
            <div className="w-16 h-16 bg-[#ccff00]/10 border-2 border-[#ccff00] text-[#ccff00] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <div className="text-[10px] text-[#ccff00] tracking-widest uppercase">DEMO SIMULATION SUCCESSFUL</div>
              <h3 className="text-2xl font-black uppercase text-white mt-1">Prototype Order Reserved</h3>
              <p className="text-xs text-neutral-400 mt-2 max-w-md mx-auto leading-relaxed">
                This is a portfolio demonstration store. No real charge has been made to your card, and your cart has been cleared.
              </p>
            </div>

            <div className="p-4 bg-black border border-[#222] max-w-sm mx-auto text-left text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-500">PROTOTYPE_ID:</span>
                <span className="text-[#ccff00] font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">CLIENT:</span>
                <span className="text-white">{formData.firstName} {formData.lastName || 'Operative'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">VALUATION:</span>
                <span className="text-white">${finalTotal} USD</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs uppercase tracking-wider brutal-shadow transition cursor-pointer"
            >
              RETURN TO CATALOG
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
