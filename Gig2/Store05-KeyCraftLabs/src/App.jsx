import React, { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import ScrollProgress from './components/ScrollProgress';
import TopHardwareBar from './components/TopHardwareBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InPageTypingTestArena from './components/InPageTypingTestArena';
import KeyboardCatalog from './components/KeyboardCatalog';
import SwitchSoundTester from './components/SwitchSoundTester';
import KeyCraftLiveToast from './components/KeyCraftLiveToast';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductDetailModal from './components/ProductDetailModal';
import KeystrokeSynthesizerModal from './components/KeystrokeSynthesizerModal';
import Footer from './components/Footer';

export default function App() {
  const [cart, setCart] = usePersistentState('gig2:store05:cart:v1', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [selectedKeyboard, setSelectedKeyboard] = useState(null);
  const [isSynthesizerOpen, setIsSynthesizerOpen] = useState(false);

  const handleAddToCart = (item) => {
    const sw = item.selectedSwitch || 'Linear (55g)';
    const pl = item.selectedPlate || 'Polycarbonate (Deep Thock)';
    const lb = Boolean(item.includeLubeKit);
    const cartLineId = item.cartLineId || `${item.id}-${sw}-${pl}-${lb ? 'lube' : 'nolube'}`;
    const finalItem = { ...item, selectedSwitch: sw, selectedPlate: pl, includeLubeKit: lb, cartLineId };

    setCart((prev) => {
      const existing = prev.find(p => (p.cartLineId || `${p.id}-${p.selectedSwitch}-${p.selectedPlate}-${p.includeLubeKit ? 'lube' : 'nolube'}`) === cartLineId);
      if (existing) {
        return prev.map(p =>
          (p.cartLineId || `${p.id}-${p.selectedSwitch}-${p.selectedPlate}-${p.includeLubeKit ? 'lube' : 'nolube'}`) === cartLineId
            ? { ...p, quantity: p.quantity + (item.quantity || 1) }
            : p
        );
      }
      return [...prev, { ...finalItem, quantity: item.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (lineId) => {
    setCart(prev => prev.filter(p => (p.cartLineId || `${p.id}-${p.selectedSwitch}-${p.selectedPlate}-${p.includeLubeKit ? 'lube' : 'nolube'}`) !== lineId));
  };

  const handleUpdateQuantity = (lineId, delta) => {
    setCart(prev => prev.map(item => {
      const key = item.cartLineId || `${item.id}-${item.selectedSwitch}-${item.selectedPlate}-${item.includeLubeKit ? 'lube' : 'nolube'}`;
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
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#101216] text-[#e5e7eb] flex flex-col font-mono selection:bg-[#ff5722] selection:text-white">
      {/* Top Hardware Telemetry */}
      <TopHardwareBar />

      {/* Industrial Header */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSynthesizer={() => setIsSynthesizerOpen(true)}
      />

      <main className="flex-1">
        {/* Schematic Hero */}
        <Hero onOpenSynthesizer={() => setIsSynthesizerOpen(true)} />

        {/* Live Typing Speed & Switch Acoustic Arena */}
        <InPageTypingTestArena />

        {/* 4 CNC Keyboard Kits */}
        <KeyboardCatalog
          onAddToCart={handleAddToCart}
          onInspectKeyboard={(kb) => setSelectedKeyboard(kb)}
        />

        {/* Laboratory Switch Sound Tester */}
        <SwitchSoundTester />
      </main>

      {/* Live Cleanroom Telemetry Toast */}
      <KeyCraftLiveToast />

      {/* Munich Engineering Footer */}
      <Footer />

      {/* Slide-out Hardware Trunk */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Product Detail Dossier Modal */}
      <ProductDetailModal
        keyboard={selectedKeyboard}
        isOpen={Boolean(selectedKeyboard)}
        onClose={() => setSelectedKeyboard(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Web Audio Keystroke Synthesizer Modal */}
      <KeystrokeSynthesizerModal
        isOpen={isSynthesizerOpen}
        onClose={() => setIsSynthesizerOpen(false)}
      />

      {/* Cleanroom Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={checkoutTotal || cartSubtotal}
        onOrderSuccess={(orderId) => {
          setCart([]);
        }}
      />
        <ScrollProgress accent="#ff5722" />
</div>
  );
}
