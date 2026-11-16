import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Image, Lock, Box, Sparkles, Award, AlertCircle } from 'lucide-react';
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
    crateHandling: 'Rigid Plywood Art Crate + ShockWatch Telemetry',
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
      email: 'curator@guggenheim-patrons.org',
      firstName: 'Julian',
      lastName: 'Vane',
      address: '1080 Fifth Avenue, Floor 18',
      city: 'New York',
      postalCode: '10128',
      country: 'United States',
      crateHandling: 'Rigid Plywood Art Crate + ShockWatch Telemetry',
      cardNumber: '4582 •••• •••• 1928',
      cardExp: '10/29',
      cardCvc: '902'
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'ART20' || couponCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
      setCouponError('');
    } else {
      setCouponError('Invalid patron credential. Try "ART20"');
    }
  };

  const discountAmount = Math.round((totalAmount * discountPercent) / 100);
  const finalTotal = totalAmount - discountAmount;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const id = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(id);
      setIsProcessing(false);
      setStep('success');
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe confetti fallback
      }
      if (onOrderSuccess) onOrderSuccess(id);
    }, 1300);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="art-checkout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-gallery"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white border border-[#e5e5e5] shadow-2xl overflow-hidden my-8 z-10 text-[#111111]">
        {/* Top Disclaimer Banner */}
        <div className="bg-[#111111] text-white px-4 py-2 text-center text-[10px] tracking-widest uppercase font-mono flex items-center justify-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>PORTFOLIO DEMO CHECKOUT // NO REAL CHARGES // PROTOTYPE SYSTEM</span>
        </div>

        {/* Header */}
        <div className="bg-[#fafafa] px-8 py-5 border-b border-[#e5e5e5] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#777777] block mb-0.5">
              CANVAS & CURATOR // FINE ART REGISTRATION
            </span>
            <h2 id="art-checkout-title" className="text-xl uppercase tracking-wider text-[#111111]">
              Acquisition Settlement & Archival Crate
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Acquisition Modal"
            className="p-1 rounded text-[#777777] hover:text-[#111111] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Quick Demo Fill & Apple Pay */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-widest text-[#777777]">
                PATRON EXPEDITED ACQUISITION
              </span>
              <button
                type="button"
                onClick={handleFillDemoData}
                className="text-[11px] font-mono text-[#111111] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>⚡ Fill Demo Data</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handlePay}
              className="w-full py-3.5 bg-[#111111] hover:bg-black text-white font-medium text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Acquire with Pay Concierge (Simulation)</span>
            </button>

            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-[#e5e5e5]" />
              <span className="text-[10px] uppercase tracking-widest text-[#777777]">OR ART INVOICE / CREDIT</span>
              <div className="flex-1 h-px bg-[#e5e5e5]" />
            </div>

            {/* Selected Works Preview */}
            <div className="bg-[#fafafa] p-4 border border-[#e5e5e5] space-y-2 max-h-36 overflow-y-auto">
              {cart.map((item, idx) => (
                <div key={item.cartLineId || idx} className="flex justify-between items-center text-xs">
                  <span className="text-[#333333]">
                    {item.name} {item.frameChoice ? `• ${item.frameChoice}` : ''} × {item.quantity}
                  </span>
                  <span className="font-mono font-medium text-[#111111]">
                    ${(item.price * item.quantity).toLocaleString()} USD
                  </span>
                </div>
              ))}
            </div>

            {/* Patron Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="PATRON CODE (TRY 'ART20')"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-white border border-[#e5e5e5] focus:border-[#111111] px-4 py-2.5 text-xs uppercase text-[#111111] outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-widest transition cursor-pointer"
              >
                Apply
              </button>
            </form>
            {discountPercent > 0 && (
              <div className="text-xs text-[#2b6436] font-medium">
                ✓ Gallery Patron Honorarium: 20% savings deducted (-${discountAmount.toLocaleString()} USD)
              </div>
            )}
            {couponError && (
              <div className="text-xs text-rose-600 font-medium">{couponError}</div>
            )}

            {/* Form */}
            <form onSubmit={handlePay} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#777777] mb-1">Patron First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Julian"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white border border-[#e5e5e5] focus:border-[#111111] p-2.5 text-[#111111] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#777777] mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Vane"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white border border-[#e5e5e5] focus:border-[#111111] p-2.5 text-[#111111] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#777777] mb-1">Private Residence / Gallery Address</label>
                <input
                  type="text"
                  required
                  placeholder="1080 Fifth Avenue, Floor 18"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-[#e5e5e5] focus:border-[#111111] p-2.5 text-[#111111] outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#777777] mb-1">Credit Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4582 •••• •••• 1928"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full bg-white border border-[#e5e5e5] focus:border-[#111111] p-2.5 text-[#111111] font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#777777] mb-1">EXP / CVC</label>
                  <input
                    type="text"
                    required
                    placeholder="10/29 • 902"
                    value={formData.cardExp}
                    onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                    className="w-full bg-white border border-[#e5e5e5] focus:border-[#111111] p-2.5 text-[#111111] font-mono text-center outline-none"
                  />
                </div>
              </div>

              {/* Surfaced Archival Crate & Certificate of Authenticity Terms */}
              <div className="p-3.5 bg-[#fafafa] border border-[#e5e5e5] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#111111] font-medium">
                    <Box className="w-4 h-4 text-[#777777]" />
                    <span>Museum Archival Crate & Certificate Guarantee</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#2b6436] font-bold">INCLUDED</span>
                </div>
                <p className="text-[11px] text-[#666666] leading-relaxed">
                  Every print is sealed inside an archival Acid-Free Mylar sleeve and suspended in custom foam-lined rigid plywood crating with ShockWatch impact telemetry. Includes physical embossed Certificate of Authenticity with serialized Hahnemühle dual-tamper holograms registered in the curatorial catalogue raisonné.
                </p>
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#777777] block">DEMO SETTLEMENT TOTAL</span>
                  <div className="text-2xl font-mono font-bold text-[#111111]">
                    ${finalTotal.toLocaleString()} USD
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3.5 bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-widest transition flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Registering Accession...' : `Authorize Demo Acquisition ($${finalTotal.toLocaleString()})`}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[#111111] flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#777777] block mb-1">
                DEMO ACCESSION RECORDED // SOHO CURATORIAL ARCHIVE
              </span>
              <h3 className="text-2xl uppercase tracking-wider text-[#111111]">
                Artwork Registered for {formData.firstName || 'Patron'} {formData.lastName}
              </h3>
              <p className="text-xs text-[#666666] mt-2 max-w-md mx-auto leading-relaxed">
                Thank you for previewing Canvas & Curator. Curatorial accession reference <strong className="text-[#111111] font-mono">{orderId}</strong> recorded in session memory. No actual financial transaction was processed.
              </p>
            </div>

            <div className="bg-[#fafafa] border border-[#e5e5e5] p-4 max-w-md mx-auto text-left text-xs space-y-2 text-[#333333]">
              <div className="flex justify-between">
                <span className="text-[#777777]">Curator:</span>
                <span className="font-medium text-[#111111]">Canvas & Curator Editions NY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777777]">Crate Preparation:</span>
                <span className="font-medium text-[#2b6436]">Plywood Crated with Foam Cushion</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777777]">Hahnemühle Certificate:</span>
                <span className="text-[#111111] font-medium">Tamper Hologram Sealed</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#111111] text-white text-xs uppercase tracking-widest hover:bg-black transition cursor-pointer"
            >
              Return to Gallery
            </button>
          </div>
        )}
      </div>
    </div>
  );
}