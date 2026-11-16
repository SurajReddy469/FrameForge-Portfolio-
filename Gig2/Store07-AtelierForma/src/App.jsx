import React, { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import ScrollProgress from './components/ScrollProgress';
import TopArchitecturalBar from './components/TopArchitecturalBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InPageLightingRoomViewer from './components/InPageLightingRoomViewer';
import FurnitureCatalog from './components/FurnitureCatalog';
import MaterialSwatchSelector from './components/MaterialSwatchSelector';
import AtelierLiveToast from './components/AtelierLiveToast';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductDetailModal from './components/ProductDetailModal';
import RoomSpatialStagerModal from './components/RoomSpatialStagerModal';
import Footer from './components/Footer';
import { FURNITURE } from './data/furnitureData';

export default function App() {
  const [cart, setCart] = usePersistentState('gig2:store07:cart:v1', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [isSpatialStagerOpen, setIsSpatialStagerOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleAddToCart = (item) => {
    const fin = item.selectedFinish || 'Raw Honed Matte';
    const care = Boolean(item.includeCareKit);
    const cartLineId = item.cartLineId || `${item.id}-${fin}-${care ? 'care' : 'nocare'}`;
    const finalItem = { ...item, selectedFinish: fin, includeCareKit: care, cartLineId };

    setCart((prev) => {
      const existing = prev.find(p => (p.cartLineId || `${p.id}-${p.selectedFinish}-${p.includeCareKit ? 'care' : 'nocare'}`) === cartLineId);
      if (existing) {
        return prev.map(p =>
          (p.cartLineId || `${p.id}-${p.selectedFinish}-${p.includeCareKit ? 'care' : 'nocare'}`) === cartLineId
            ? { ...p, quantity: p.quantity + (item.quantity || 1) }
            : p
        );
      }
      return [...prev, { ...finalItem, quantity: item.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (lineId, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        const key = item.cartLineId || `${item.id}-${item.selectedFinish}-${item.includeCareKit ? 'care' : 'nocare'}`;
        if (key === lineId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const handleRemoveFromCart = (lineId) => {
    setCart((prev) => prev.filter((item) => (item.cartLineId || `${item.id}-${item.selectedFinish}-${item.includeCareKit ? 'care' : 'nocare'}`) !== lineId));
  };

  const handleProceedToCheckout = (subtotal) => {
    setCheckoutTotal(subtotal);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f1ea] text-[#24211d]">
      <TopArchitecturalBar />
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSpatialStager={() => setIsSpatialStagerOpen(true)}
      />
      <main className="flex-1">
        <Hero onOpenSpatialStager={() => setIsSpatialStagerOpen(true)} />
        {/* In-Page Solar & Ambient Room Lighting Visualizer */}
        <InPageLightingRoomViewer />
        <FurnitureCatalog
          onAddToCart={handleAddToCart}
          onInspectItem={(item) => setSelectedFurniture(item)}
        />
        <MaterialSwatchSelector />
      </main>
      <AtelierLiveToast />
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedFurniture}
        isOpen={Boolean(selectedFurniture)}
        onClose={() => setSelectedFurniture(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Spatial 2D Stager Modal */}
      <RoomSpatialStagerModal
        isOpen={isSpatialStagerOpen}
        onClose={() => setIsSpatialStagerOpen(false)}
      />

      {/* Architectural Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={checkoutTotal || cartSubtotal}
        onOrderSuccess={(orderId) => {
          setCart([]);
        }}
      />
        <ScrollProgress accent="#24211d" ink="#ffffff" />
</div>
  );
}
