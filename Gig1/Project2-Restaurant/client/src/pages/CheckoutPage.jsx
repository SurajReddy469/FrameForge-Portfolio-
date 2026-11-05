import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, Smartphone, Banknote, ArrowLeft, Check, Sparkles, MapPin, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { orderService } from '../services/api';

const CheckoutPage = () => {
  const {
    items,
    subtotal,
    tax,
    deliveryFee,
    tip,
    discount,
    appliedPromo,
    total,
    orderType,
    setOrderType,
    clearCart
  } = useCart();

  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: user?.name || 'Ananya Deshmukh',
    customerEmail: user?.email || 'ananya.d@example.com',
    customerPhone: '+91 98765 43210',
    street: 'Skyline Penthouse 402, Jubilee Hills Road 36',
    city: 'Hyderabad',
    postalCode: '500033',
    landmark: 'Opposite Horizon Club',
    deliveryInstructions: 'Ring doorbell twice. Handover to security if unreachable.'
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-stone-900 mx-auto flex items-center justify-center text-stone-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif-luxury text-2xl font-bold text-stone-100">
          Your Culinary Bag is Empty
        </h2>
        <p className="text-xs text-stone-400">
          Please add dishes from our tasting menu before heading to checkout.
        </p>
        <Link
          to="/menu"
          className="inline-block px-6 py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  const [idempotencyKey] = useState(() => 'gh_idemp_' + Date.now() + '_' + Math.random().toString(36).substring(7));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderPayload = {
        idempotencyKey,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        orderType,
        deliveryAddress: {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          landmark: formData.landmark
        },
        items: items.map((i) => ({
          menuItem: i.dish._id,
          title: i.dish.title,
          price: i.dish.price,
          quantity: i.quantity,
          specialInstructions: i.specialInstructions || ''
        })),
        promoCode: appliedPromo?.code || '',
        tip,
        paymentMethod
      };

      const res = await orderService.createOrder(orderPayload, user?.token);
      if (res.success && res.data) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        clearCart();
        addToast(res.isFallback || res.isDemoMode ? 'Demo order saved temporarily; no payment was processed.' : 'Order received. Payment remains pending; no payment provider is connected.', 'success');
        navigate(`/order-success/${res.data.orderNumber}`);
      } else {
        throw new Error(res.message || 'Failed to place order');
      }
    } catch (err) {
      addToast(err.message || 'Error processing order', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        to="/menu"
        className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Menu</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column (7 Cols) */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
          {/* 1. Fulfillment Mode */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif-luxury text-base font-bold text-stone-100 flex items-center justify-between">
              <span>1. Fulfillment Mode</span>
              <span className="text-xs font-normal text-amber-400 uppercase tracking-wider">
                {orderType === 'Delivery' ? 'Express Courier' : 'Direct Pickup'}
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('Delivery')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  orderType === 'Delivery'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <p className="text-xs font-bold text-stone-100">Gourmet Delivery</p>
                <p className="text-[11px] text-stone-400 mt-0.5">30-40 min temperature-controlled</p>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('Takeaway')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  orderType === 'Takeaway'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <p className="text-xs font-bold text-stone-100">Self Pickup / Takeaway</p>
                <p className="text-[11px] text-stone-400 mt-0.5">Ready in 20 min at our Concierge</p>
              </button>
            </div>
          </div>

          {/* 2. Customer Contact */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif-luxury text-base font-bold text-stone-100">
              2. Guest Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* 3. Delivery Address (If delivery) */}
          {orderType === 'Delivery' && (
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 animate-in fade-in">
              <h3 className="font-serif-luxury text-base font-bold text-stone-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>3. Delivery Destination</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Street / Apartment / Villa</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">Courier Instructions</label>
                  <input
                    type="text"
                    value={formData.deliveryInstructions}
                    onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. Payment Method */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-base font-bold text-stone-100">
                4. Payment Method
              </h3>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Portfolio Sandbox Simulator
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              This portfolio application operates in a safe evaluation sandbox. No live card debits or banking charges will occur.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'Credit/Debit Card', label: 'Card Payment', icon: CreditCard },
                { id: 'UPI / Razorpay', label: 'UPI / Instant Pay', icon: Smartphone },
                { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote }
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === m.id
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-semibold text-stone-200">{m.label}</span>
                  </div>
                );
              })}
            </div>

            {paymentMethod === 'Credit/Debit Card' && (
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3 text-xs">
                <div>
                  <label className="text-stone-400 block text-[11px] mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8821"
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-300"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-stone-400 block text-[11px] mb-1">Expiry</label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-300"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block text-[11px] mb-1">CVV</label>
                    <input
                      type="password"
                      defaultValue="•••"
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-300"
                      disabled
                    />
                  </div>
                </div>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-bit TLS Encrypted Sandbox Simulator</span>
                </p>
              </div>
            )}
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm uppercase tracking-wider shadow-2xl shadow-amber-950/60 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            <span>{loading ? 'Authorizing & Preparing...' : `Place Gourmet Order • ₹${total}`}</span>
          </button>
        </form>

        {/* Right Summary Column (5 Cols) */}
        <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 sticky top-28">
          <h3 className="font-serif-luxury text-base font-bold text-stone-100 flex items-center justify-between pb-3 border-b border-stone-800">
            <span>Order Summary</span>
            <span className="text-xs font-normal text-stone-400">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </h3>

          {/* Items preview */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map(({ dish, quantity, specialInstructions }) => (
              <div key={dish._id} className="flex gap-3 text-xs">
                <img
                  src={dish.imageUrl}
                  alt={dish.title}
                  className="w-12 h-12 rounded-lg object-cover border border-stone-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-stone-200 truncate">{dish.title}</h4>
                  <p className="text-stone-400 text-[11px]">Qty: {quantity}</p>
                  {specialInstructions && (
                    <p className="text-stone-500 text-[10px] italic truncate">
                      "{specialInstructions}"
                    </p>
                  )}
                </div>
                <div className="font-bold text-amber-400 whitespace-nowrap">
                  ₹{dish.price * quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-stone-400 pt-3 border-t border-stone-800">
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="text-stone-200">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (5% GST)</span>
              <span className="text-stone-200">₹{tax}</span>
            </div>
            {orderType === 'Delivery' && (
              <div className="flex justify-between">
                <span>Delivery & Courier</span>
                <span className="text-stone-200">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
            )}
            {tip > 0 && (
              <div className="flex justify-between">
                <span>Culinary Crew Gratuity</span>
                <span className="text-stone-200">₹{tip}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-amber-400 font-semibold">
                <span>Promo Privilege ({appliedPromo?.code})</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-stone-100 pt-3 border-t border-stone-800">
              <span className="font-serif-luxury tracking-wide">Total Payable</span>
              <span className="text-amber-400 text-lg">₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
