import React, { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import ScrollProgress from './components/ScrollProgress';
import TopVipBar from './components/TopVipBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CollectionGrid from './components/CollectionGrid';
import InteractiveTourbillonCaliber from './components/InteractiveTourbillonCaliber';
import HorologyComparisonTable from './components/HorologyComparisonTable';
import ProvenanceChecker from './components/ProvenanceChecker';
import VipSalonModal from './components/VipSalonModal';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import WatchConfiguratorModal from './components/WatchConfiguratorModal';
import CheckoutModal from './components/CheckoutModal';
import LiveAcquisitionToast from './components/LiveAcquisitionToast';
import Footer from './components/Footer';
import { WATCHES } from './data/watchesData';

export default function App() {
  const [cart, setCart] = usePersistentState('gig2:store01:cart:v1', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSalonModalOpen, setIsSalonModalOpen] = useState(false);
  const [detailWatch, setDetailWatch] = useState(null);
  const [configuratorWatch, setConfiguratorWatch] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [currency, setCurrency] = useState('CHF');

  const handleAddToCart = (watch) => {
    const lineId = watch.cartLineId || `${watch.id}-${watch.selectedDial || 'std'}-${watch.selectedCase || 'std'}-${watch.selectedStrap || 'std'}-${watch.customEngraving || ''}-${watch.addTravelRoll ? 'roll' : 'noroll'}`;
    setCart((prev) => {
      const existing = prev.find(item => (item.cartLineId || item.id) === lineId);
      if (existing) {
        return prev.map(item => (item.cartLineId || item.id) === lineId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...watch, cartLineId: lineId, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (lineId) => {
    setCart(prev => prev.filter(item => (item.cartLineId || item.id) !== lineId));
  };

  const handleUpdateQuantity = (lineId, delta) => {
    setCart(prev => prev.map(item => {
      if ((item.cartLineId || item.id) === lineId) {
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
    <div className="min-h-screen bg-[#090a0c] text-neutral-100 flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Top VIP Bar */}
      <TopVipBar
        onOpenSalonModal={() => setIsSalonModalOpen(true)}
        currency={currency}
        onCurrencyChange={(c) => setCurrency(c)}
      />

      {/* Main Luxury Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSalonModal={() => setIsSalonModalOpen(true)}
      />

      <main className="flex-1">
        {/* Cinematic Horology Split-Screen Hero */}
        <Hero
          onOpenSalonModal={() => setIsSalonModalOpen(true)}
          onOpenConfigurator={() => setConfiguratorWatch(WATCHES[0])}
        />

        {/* Grandes Complications Collection Grid */}
        <CollectionGrid
          onAddToCart={handleAddToCart}
          onInspectWatch={(w) => setDetailWatch(w)}
          currency={currency}
        />

        {/* Live Haute Horlogerie Tourbillon Caliber & Escapement Audio */}
        <InteractiveTourbillonCaliber />

        {/* Technical Movement & Metallurgy Comparison */}
        <HorologyComparisonTable
          onSelectWatch={(w) => setDetailWatch(w)}
          currency={currency}
        />

        {/* Interactive Provenance & Geneva Seal Verification Registry */}
        <ProvenanceChecker />
      </main>

      {/* Swiss Manufacture Footer */}
      <Footer onOpenSalonModal={() => setIsSalonModalOpen(true)} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={Boolean(detailWatch)}
        onClose={() => setDetailWatch(null)}
        watch={detailWatch}
        onAddToCart={handleAddToCart}
        onOpenConfigurator={(w) => setConfiguratorWatch(w)}
        currency={currency}
      />

      {/* Bespoke 360° Watch Configurator Modal */}
      <WatchConfiguratorModal
        isOpen={Boolean(configuratorWatch)}
        onClose={() => setConfiguratorWatch(null)}
        baseWatch={configuratorWatch}
        onAddConfiguredWatch={handleAddToCart}
        currency={currency}
      />

      {/* VIP Salon Private Appointment Modal */}
      <VipSalonModal
        isOpen={isSalonModalOpen}
        onClose={() => setIsSalonModalOpen(false)}
      />

      {/* Luxury Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedToCheckout={handleProceedToCheckout}
        currency={currency}
      />

      {/* VIP 256-Bit Encrypted Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={checkoutTotal || cartSubtotal}
        currency={currency}
        onOrderSuccess={(orderId) => {
          setCart([]);
        }}
      />

      {/* Live Verified Collector Acquisition Toast */}
      <LiveAcquisitionToast />
        <ScrollProgress accent="#d4af37" />
</div>
  );
}
