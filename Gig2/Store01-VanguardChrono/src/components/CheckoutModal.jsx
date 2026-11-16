import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Lock, CreditCard, Sparkles, X, ArrowRight, Info } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function CheckoutModal({ isOpen, onClose, cart, totalAmount, onOrderSuccess, currency = 'CHF' }) {
  const [step, setStep] = useState('checkout'); // 'checkout' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form states - Empty by default (no prefilled fake personal/card data)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Switzerland',
    cardNumber: '',
    cardExp: '',
    cardCvc: ''
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('checkout');
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFillDemoData = () => {
    setFormData({
      email: 'collector.geneva@example.ch',
      firstName: 'Henri',
      lastName: 'de Saint-Germain',
      address: 'Quai du Mont-Blanc 19',
      city: 'Geneva',
      postalCode: '1201',
      country: 'Switzerland',
      cardNumber: '4242 •••• •••• 4242',
      cardExp: '12/28',
      cardCvc: '884'
    });
    setCouponCode('VIP20');
    setDiscountPercent(20);
    setCouponError('');
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
      setCouponError('');
    } else if (couponCode.trim().toUpperCase() === 'GENEVA') {
      setDiscountPercent(10);
      setCouponError('');
    } else {
      setCouponError('Invalid VIP allocation code. Try "VIP20"');
    }
  };

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);
  const finalTotal = Math.max(0, totalAmount - discountAmount);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const generatedId = `VC-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setStep('success');
      if (onOrderSuccess) onOrderSuccess(generatedId);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0e1014] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-white font-sans">
        
        {/* Top Header */}
        <div className="bg-[#14171e] px-6 py-4 border-b border-[#232732] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#d4af37] text-black flex items-center justify-center font-serif font-bold text-xs">
              VC
            </div>
            <div>
              <h3 id="checkout-modal-title" className="font-serif font-semibold text-base text-white tracking-wide">
                {step === 'checkout' ? 'Geneva Private Acquisitions Terminal' : 'Commission Confirmed (Demo)'}
              </h3>
              <p className="text-[10px] font-mono text-[#d4af37]">DEMO ALLOCATION PORTAL &bull; NO REAL CHARGES</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Disclaimer Banner */}
        <div className="bg-[#1a1c24] px-6 py-2.5 border-b border-[#232732] flex items-center justify-between text-xs font-mono text-neutral-300">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>Interactive Portfolio Demo — Real funds are never captured.</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemoData}
            className="text-[11px] underline text-[#d4af37] hover:text-[#f3db83] shrink-0 ml-2 cursor-pointer font-bold"
          >
            Fill Demo Test Data
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handlePay} className="p-6 space-y-6">
            
            {/* Express Apple Pay Pill */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                Express Allocation (Demo Mode)
              </span>
              <button
                type="button"
                onClick={handlePay}
                className="w-full py-3 bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-xs cursor-pointer"
              >
                <span className="text-sm"></span>
                <span>Demo Apple Pay &bull; {formatPrice(finalTotal, currency)}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#232732]"></div>
              <span className="text-[10px] font-mono uppercase text-neutral-500">Or Consignment Details</span>
              <div className="flex-1 h-px bg-[#232732]"></div>
            </div>

            {/* Client & Shipping Fields */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-[#d4af37] tracking-wider">
                1. Diplomatic / White-Glove Consignment Address
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="fn" className="block text-[10px] text-neutral-400 mb-1">First Name</label>
                  <input
                    id="fn"
                    type="text"
                    placeholder="Henri"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#14171f] border border-[#232732] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label htmlFor="ln" className="block text-[10px] text-neutral-400 mb-1">Last Name</label>
                  <input
                    id="ln"
                    type="text"
                    placeholder="de Saint-Germain"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#14171f] border border-[#232732] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="em" className="block text-[10px] text-neutral-400 mb-1">Client Email</label>
                <input
                  id="em"
                  type="email"
                  placeholder="client@residence.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#14171f] border border-[#232732] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label htmlFor="addr" className="block text-[10px] text-neutral-400 mb-1">Residence Address</label>
                  <input
                    id="addr"
                    type="text"
                    placeholder="Quai du Mont-Blanc 19"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#14171f] border border-[#232732] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label htmlFor="pc" className="block text-[10px] text-neutral-400 mb-1">Postal Code</label>
                  <input
                    id="pc"
                    type="text"
                    placeholder="1201"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#14171f] border border-[#232732] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase text-[#d4af37] tracking-wider">
                  2. Payment Simulation Details
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                  <Lock className="w-3 h-3 text-[#d4af37]" /> Demo Sandboxed
                </div>
              </div>

              <div className="bg-[#14171f] border border-[#232732] p-3 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#232732] pb-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-xs text-neutral-300">Centurion Black / Visa Infinite</span>
                  </div>
                  <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded font-mono">
                    TEST MODE
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label htmlFor="cn" className="block text-[10px] text-neutral-400 mb-1">Card Number</label>
                    <input
                      id="cn"
                      type="text"
                      placeholder="•••• •••• •••• 4242"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-[#0e1014] border border-[#232732] rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="exp" className="block text-[10px] text-neutral-400 mb-1">Exp</label>
                      <input
                        id="exp"
                        type="text"
                        placeholder="MM/YY"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        className="w-full bg-[#0e1014] border border-[#232732] rounded-lg px-2 py-2 text-xs font-mono text-center text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-[10px] text-neutral-400 mb-1">CVC</label>
                      <input
                        id="cvc"
                        type="text"
                        placeholder="CVC"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-[#0e1014] border border-[#232732] rounded-lg px-2 py-2 text-xs font-mono text-center text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Coupon Code Box */}
            <div className="bg-[#12151c] p-3 rounded-xl border border-[#232732]">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter VIP Allocation Code (e.g. VIP20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#0e1014] border border-[#232732] rounded-lg px-3 py-1.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-1.5 bg-[#232732] hover:bg-[#d4af37] hover:text-black rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {discountPercent > 0 && (
                <p className="text-emerald-400 text-xs mt-1.5 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" /> VIP Privilege Applied: {discountPercent}% Off (-{formatPrice(discountAmount, currency)})
                </p>
              )}
              {couponError && (
                <p className="text-rose-400 text-xs mt-1.5 font-mono">{couponError}</p>
              )}
            </div>

            {/* Financial Summary */}
            <div className="space-y-1.5 border-t border-[#232732] pt-4 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal ({cart.length} item{cart.length > 1 ? 's' : ''}):</span>
                <span>{formatPrice(totalAmount, currency)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>VIP Privilege Discount ({discountPercent}%):</span>
                  <span>-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Armored Courier & In-Flight Insurance:</span>
                <span className="text-[#d4af37]">COMPLIMENTARY INCLUDED</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#232732]">
                <span className="font-serif">Total Commission Due:</span>
                <span className="text-[#d4af37] font-serif text-lg">{formatPrice(finalTotal, currency)}</span>
              </div>
            </div>

            {/* Authorize Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#d4af37] hover:bg-[#e5c14d] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin"></span>
                  <span>PROCESSING DEMO ALLOCATION...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>AUTHORIZE COMMISSION (DEMO) &bull; {formatPrice(finalTotal, currency)}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border-2 border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto shadow-lg shadow-[#d4af37]/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] block mb-1">
                DEMO COMMISSION REGISTERED
              </span>
              <h3 className="text-3xl font-serif text-white mb-2">
                Welcome to Vanguard Provenance.
              </h3>
              <p className="text-neutral-400 text-xs max-w-md mx-auto leading-relaxed">
                Your demo allocation reference is <strong className="text-white font-mono">{orderId}</strong>. This confirms your simulated transaction within the portfolio exhibition. No actual payment was debited.
              </p>
            </div>

            {/* Allocation Receipt Card */}
            <div className="bg-[#14171f] border border-[#232732] rounded-xl p-4 text-left font-mono text-xs max-w-md mx-auto space-y-2">
              <div className="flex justify-between border-b border-[#232732] pb-2">
                <span className="text-neutral-500">Registry Reference:</span>
                <span className="text-[#d4af37] font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Consignee:</span>
                <span className="text-white">{formData.firstName || 'Honored Guest'} {formData.lastName || ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Node:</span>
                <span className="text-white">{formData.city ? `${formData.city}, ${formData.country}` : 'Geneva Atelier'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Settled:</span>
                <span className="text-[#d4af37] font-bold">{formatPrice(finalTotal, currency)}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#d4af37] hover:bg-[#e5c14d] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Return to Masterpiece Salon
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
