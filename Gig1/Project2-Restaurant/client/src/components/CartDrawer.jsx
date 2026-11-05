import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    tax,
    deliveryFee,
    tip,
    setTip,
    orderType,
    setOrderType,
    appliedPromo,
    applyPromo,
    removePromo,
    discount,
    total
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const { addToast } = useToast();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyPromo(code);
    if (res.success) {
      addToast(res.message, 'success');
      setCouponInput('');
    } else {
      addToast(res.message, 'error');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm cursor-pointer"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-amber-100">
                  Your Culinary Bag
                </h3>
                <p className="text-xs text-stone-400">
                  {items.length} {items.length === 1 ? 'dish' : 'dishes'} selected
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery or Takeaway toggle */}
          <div className="px-6 py-3 bg-stone-950/60 border-b border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-400 font-medium">Order Method:</span>
            <div className="flex bg-stone-900 p-1 rounded-lg border border-stone-800 text-xs font-semibold">
              <button
                onClick={() => setOrderType('Delivery')}
                className={`px-3 py-1 rounded-md cursor-pointer transition-all ${
                  orderType === 'Delivery'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Delivery
              </button>
              <button
                onClick={() => setOrderType('Takeaway')}
                className={`px-3 py-1 rounded-md cursor-pointer transition-all ${
                  orderType === 'Takeaway'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Self Pickup
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-800/80 mx-auto flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base font-semibold text-stone-200">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                    Explore our curated artisanal menu and select your favorite gastronomy dishes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/menu');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-950/40"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              items.map(({ dish, quantity, specialInstructions }) => (
                <div
                  key={dish._id}
                  className="p-3.5 rounded-xl bg-stone-950/50 border border-stone-800/90 flex gap-3.5 group hover:border-stone-700 transition-all"
                >
                  <img
                    src={dish.imageUrl}
                    alt={dish.title}
                    className="w-18 h-18 rounded-lg object-cover border border-stone-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-stone-200 truncate group-hover:text-amber-400 transition-colors">
                          {dish.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(dish._id)}
                          className="text-stone-500 hover:text-rose-400 cursor-pointer p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-amber-400 mt-0.5">
                        ₹{dish.price}
                      </p>
                      {specialInstructions && (
                        <p className="text-[11px] text-stone-400 italic line-clamp-1 mt-0.5">
                          "{specialInstructions}"
                        </p>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-800/60">
                      <div className="flex items-center gap-2 bg-stone-900 px-2 py-1 rounded-lg border border-stone-800">
                        <button
                          onClick={() => updateQuantity(dish._id, quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-amber-400 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-stone-200 w-5 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(dish._id, quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-amber-400 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-stone-200">
                        ₹{dish.price * quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-stone-950/80 space-y-4">
              {/* Coupon Code section */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="font-semibold">{appliedPromo.code} Applied</span>
                      <span className="text-stone-400">(-₹{discount})</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-stone-400 hover:text-stone-100 font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Promo code (e.g. GOURMET10)"
                          className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 uppercase"
                        />
                      </div>
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 font-semibold text-xs cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                      <span>Quick code:</span>
                      <button
                        onClick={() => handleApplyCoupon('GOURMET10')}
                        className="text-amber-400 hover:underline cursor-pointer font-medium"
                      >
                        GOURMET10 (10% OFF)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tip options */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-850">
                <span className="text-stone-400">Chef & Crew Gratuity:</span>
                <div className="flex gap-1.5">
                  {[0, 30, 50, 100].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTip(t)}
                      className={`px-2 py-0.5 rounded text-xs cursor-pointer ${
                        tip === t
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50 font-bold'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      {t === 0 ? 'None' : `₹${t}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-400 pt-2 border-t border-stone-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (5% GST)</span>
                  <span className="text-stone-200">₹{tax}</span>
                </div>
                {orderType === 'Delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Packaging & Express</span>
                    <span className="text-stone-200">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-400 font-semibold">FREE (Above ₹999)</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                )}
                {tip > 0 && (
                  <div className="flex justify-between">
                    <span>Staff Tip</span>
                    <span className="text-stone-200">₹{tip}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>Promotional Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-stone-100 pt-2 border-t border-stone-800">
                  <span className="font-serif-luxury tracking-wide">Grand Total</span>
                  <span className="text-amber-400 text-base">₹{total}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
