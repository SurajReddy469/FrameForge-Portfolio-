import React, { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import ScrollProgress from './components/ScrollProgress';
import TopGalleryBar from './components/TopGalleryBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InPageGalleryOpticsViewer from './components/InPageGalleryOpticsViewer';
import ArtCatalog from './components/ArtCatalog';
import WallScalePreviewer from './components/WallScalePreviewer';
import GalleryLiveToast from './components/GalleryLiveToast';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductDetailModal from './components/ProductDetailModal';
import GalleryLightingModal from './components/GalleryLightingModal';
import Footer from './components/Footer';

export default function App() {
  const [cart, setCart] = usePersistentState('gig2:store10:cart:v1', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isLightingOpen, setIsLightingOpen] = useState(false);
  const [previewArt, setPreviewArt] = useState(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleAddToCart = (item) => {
    const lineId = item.cartLineId || `${item.id}-${item.frameChoice || 'standard'}-${item.includeHangingSystem ? 'cleat' : 'standard'}`;
    const finalItem = {
      ...item,
      cartLineId: lineId
    };

    setCart((prev) => {
      const existing = prev.find((p) => (p.cartLineId || p.id) === lineId);
      if (existing) {
        return prev.map((p) =>
          (p.cartLineId || p.id) === lineId ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...finalItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handlePreviewOnWall = (item) => {
    setPreviewArt(item);
    const element = document.getElementById('wall-preview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateQuantity = (lineId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(lineId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item.cartLineId || item.id) === lineId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (lineId) => {
    setCart((prev) => prev.filter((item) => (item.cartLineId || item.id) !== lineId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      <TopGalleryBar />
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLightingSimulator={() => setIsLightingOpen(true)}
      />
      <main className="flex-1">
        <Hero onOpenLightingSimulator={() => setIsLightingOpen(true)} />
        {/* Anti-Reflective Archival Optics Simulator */}
        <InPageGalleryOpticsViewer />
        <ArtCatalog
          onAddToCart={handleAddToCart}
          onPreviewOnWall={handlePreviewOnWall}
          onInspectItem={(item) => setSelectedArtwork(item)}
        />
        <WallScalePreviewer
          selectedArtwork={previewArt}
          onAddToCartWithFrame={handleAddToCart}
        />
      </main>
      <GalleryLiveToast />
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 1-Click Apple Pay / Fine Art Acquisition Checkout */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={cartSubtotal}
        onOrderSuccess={() => handleClearCart()}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedArtwork}
        isOpen={!!selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Tru Vue® Museum Glare & Gallery Lighting Simulator */}
      <GalleryLightingModal
        isOpen={isLightingOpen}
        onClose={() => setIsLightingOpen(false)}
      />
        <ScrollProgress accent="#111111" ink="#ffffff" />
</div>
  );
}