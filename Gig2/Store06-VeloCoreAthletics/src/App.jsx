import React, { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import ScrollProgress from './components/ScrollProgress';
import TopAthleticTape from './components/TopAthleticTape';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InPageAeroDragVisualizer from './components/InPageAeroDragVisualizer';
import ApparelCatalog from './components/ApparelCatalog';
import FabricHeatMapSlider from './components/FabricHeatMapSlider';
import VeloLiveToast from './components/VeloLiveToast';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductDetailModal from './components/ProductDetailModal';
import WindTunnelCalcModal from './components/WindTunnelCalcModal';
import Footer from './components/Footer';

export default function App() {
  const [cart, setCart] = usePersistentState('gig2:store06:cart:v1', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isWindTunnelOpen, setIsWindTunnelOpen] = useState(false);

  const handleAddToCart = (item) => {
    const sz = item.selectedSize || 'M';
    const sck = Boolean(item.includeAeroSocks);
    const cartLineId = item.cartLineId || `${item.id}-${sz}-${sck ? 'socks' : 'nosocks'}`;
    const finalItem = { ...item, selectedSize: sz, includeAeroSocks: sck, cartLineId };

    setCart((prev) => {
      const existing = prev.find(p => (p.cartLineId || `${p.id}-${p.selectedSize}-${p.includeAeroSocks ? 'socks' : 'nosocks'}`) === cartLineId);
      if (existing) {
        return prev.map(p =>
          (p.cartLineId || `${p.id}-${p.selectedSize}-${p.includeAeroSocks ? 'socks' : 'nosocks'}`) === cartLineId
            ? { ...p, quantity: p.quantity + (item.quantity || 1) }
            : p
        );
      }
      return [...prev, { ...finalItem, quantity: item.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (lineId) => {
    setCart(prev => prev.filter(p => (p.cartLineId || `${p.id}-${p.selectedSize}-${p.includeAeroSocks ? 'socks' : 'nosocks'}`) !== lineId));
  };

  const handleUpdateQuantity = (lineId, delta) => {
    setCart(prev => prev.map(item => {
      const key = item.cartLineId || `${item.id}-${item.selectedSize}-${item.includeAeroSocks ? 'socks' : 'nosocks'}`;
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
    <div className="min-h-screen bg-[#0a0f1d] text-white flex flex-col font-sans selection:bg-[#00f0ff] selection:text-black">
      {/* Top Athletic Telemetry Tape */}
      <TopAthleticTape />

      {/* Sport Aerodynamic Header */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWindTunnel={() => setIsWindTunnelOpen(true)}
      />

      <main className="flex-1">
        {/* Kinetic Hero */}
        <Hero onOpenWindTunnel={() => setIsWindTunnelOpen(true)} />

        {/* Dynamic Aerodynamic Wattage Visualizer */}
        <InPageAeroDragVisualizer />

        {/* 4 Technical Competition Pieces */}
        <ApparelCatalog
          onAddToCart={handleAddToCart}
          onInspectItem={(item) => setSelectedItem(item)}
        />

        {/* Climatic Stress & Fabric Heat-Map Simulator */}
        <FabricHeatMapSlider />
      </main>

      {/* Live Pro Team Telemetry Toast */}
      <VeloLiveToast />

      {/* Boulder Lab Footer */}
      <Footer />

      {/* Slide-out Competition Bag */}
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
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Virtual Wind Tunnel Modal */}
      <WindTunnelCalcModal
        isOpen={isWindTunnelOpen}
        onClose={() => setIsWindTunnelOpen(false)}
      />

      {/* Express Pro Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={checkoutTotal || cartSubtotal}
        onOrderSuccess={(orderId) => {
          setCart([]);
        }}
      />
        <ScrollProgress accent="#00f0ff" />
</div>
  );
}
