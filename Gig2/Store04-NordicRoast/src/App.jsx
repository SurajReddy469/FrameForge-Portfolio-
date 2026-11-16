import React, { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import ScrollProgress from './components/ScrollProgress';
import TopHarvestBar from './components/TopHarvestBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoffeeGrid from './components/CoffeeGrid';
import FlavorWheelExplorer from './components/FlavorWheelExplorer';
import ProductDetailModal from './components/ProductDetailModal';
import BrewRatioTimerModal from './components/BrewRatioTimerModal';
import InPageBrewCalculator from './components/InPageBrewCalculator';
import RoasteryLiveToast from './components/RoasteryLiveToast';
import CheckoutModal from './components/CheckoutModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { COFFEES } from './data/coffeeData';

export default function App() {
  const [cart, setCart] = usePersistentState('gig2:store04:cart:v1', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [detailCoffee, setDetailCoffee] = useState(null);
  const [brewTimerCoffee, setBrewTimerCoffee] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const handleAddToCart = (coffee) => {
    const size = coffee.selectedSize || '250g';
    const grind = coffee.selectedGrind || 'Whole Bean';
    const sub = Boolean(coffee.hasSub);
    const cartLineId = coffee.cartLineId || `${coffee.id}-${size}-${grind}-${sub ? 'sub' : 'single'}`;
    const finalProduct = { ...coffee, selectedSize: size, selectedGrind: grind, hasSub: sub, cartLineId };

    setCart((prev) => {
      const existing = prev.find(item => (item.cartLineId || `${item.id}-${item.selectedSize}-${item.selectedGrind}-${item.hasSub ? 'sub' : 'single'}`) === cartLineId);
      if (existing) {
        return prev.map(item =>
          (item.cartLineId || `${item.id}-${item.selectedSize}-${item.selectedGrind}-${item.hasSub ? 'sub' : 'single'}`) === cartLineId
            ? { ...item, quantity: item.quantity + (coffee.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...finalProduct, quantity: coffee.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (lineId) => {
    setCart(prev => prev.filter(item => (item.cartLineId || `${item.id}-${item.selectedSize}-${item.selectedGrind}-${item.hasSub ? 'sub' : 'single'}`) !== lineId));
  };

  const handleUpdateQuantity = (lineId, delta) => {
    setCart(prev => prev.map(item => {
      const key = item.cartLineId || `${item.id}-${item.selectedSize}-${item.selectedGrind}-${item.hasSub ? 'sub' : 'single'}`;
      if (key === lineId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleProceedToCheckout = (subtotal) => {
    setCheckoutTotal(subtotal);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#2b1d14] flex flex-col font-mono selection:bg-[#2b1d14] selection:text-[#fcfaf7]">
      {/* Top Harvest Announcement */}
      <TopHarvestBar />

      {/* Craft Roastery Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* Roastery Hero */}
        <Hero />

        {/* 4 Single-Origin Harvest Lots */}
        <CoffeeGrid
          onAddToCart={handleAddToCart}
          onInspectCoffee={(c) => setDetailCoffee(c)}
        />

        {/* Sensory Flavor Wheel Explorer */}
        <FlavorWheelExplorer />

        {/* In-Page Golden Brew Ratio Extraction Engine */}
        <InPageBrewCalculator />
      </main>

      {/* Oslo Roastery Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={Boolean(detailCoffee)}
        onClose={() => setDetailCoffee(null)}
        coffee={detailCoffee}
        onAddToCart={handleAddToCart}
        onOpenBrewTimer={(c) => setBrewTimerCoffee(c)}
      />

      {/* Barista Brew Ratio Engine & Pour Timer */}
      <BrewRatioTimerModal
        isOpen={Boolean(brewTimerCoffee)}
        onClose={() => setBrewTimerCoffee(null)}
        selectedCoffee={brewTimerCoffee}
      />

      {/* Roastery Coffee Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Small-Batch Demo Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={checkoutTotal || cartSubtotal}
        onOrderSuccess={(orderId) => {
          setCart([]);
        }}
      />

      {/* Small-Batch Harvest Roast Alerts */}
      <RoasteryLiveToast />
        <ScrollProgress accent="#a67c52" />
</div>
  );
}
