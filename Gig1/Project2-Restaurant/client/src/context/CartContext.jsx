import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('gh_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [tip, setTip] = useState(50);
  const [orderType, setOrderType] = useState('Delivery'); // 'Delivery' or 'Takeaway'

  useEffect(() => {
    try {
      localStorage.setItem('gh_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Cart save error', e);
    }
  }, [items]);

  const addToCart = (dish, quantity = 1, specialInstructions = '') => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.dish._id === dish._id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          specialInstructions: specialInstructions || next[existingIndex].specialInstructions
        };
        return next;
      }
      return [...prev, { dish, quantity, specialInstructions }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(dishId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.dish._id === dishId ? { ...i, quantity: newQty } : i))
    );
  };

  const removeFromCart = (dishId) => {
    setItems((prev) => prev.filter((i) => i.dish._id !== dishId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
    setPromoCode('');
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GOURMET10') {
      setAppliedPromo({ code: 'GOURMET10', percent: 10, discount: 0, desc: '10% Chef Welcome Privilege' });
      return { success: true, message: 'Coupon GOURMET10 applied (10% OFF)!' };
    }
    if (clean === 'TASTEFULL') {
      setAppliedPromo({ code: 'TASTEFULL', flat: 150, discount: 0, desc: '₹150 Artisanal Perk' });
      return { success: true, message: 'Coupon TASTEFULL applied (₹150 OFF)!' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try GOURMET10' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  // Price calculations
  const subtotal = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = orderType === 'Takeaway' || subtotal === 0 || subtotal >= 999 ? 0 : 60;

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.percent) {
      discount = Math.round((subtotal * appliedPromo.percent) / 100);
    } else if (appliedPromo.flat) {
      discount = Math.min(appliedPromo.flat, subtotal);
    }
  }

  const total = Math.max(0, subtotal + tax + deliveryFee + tip - discount);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        subtotal,
        tax,
        deliveryFee,
        tip,
        setTip,
        orderType,
        setOrderType,
        promoCode,
        setPromoCode,
        appliedPromo,
        applyPromo,
        removePromo,
        discount,
        total,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
