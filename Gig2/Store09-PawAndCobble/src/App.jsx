import React, { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import ScrollProgress from './components/ScrollProgress';
import TopPetBar from './components/TopPetBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InPageCollarCustomizer from './components/InPageCollarCustomizer';
import PetCatalog from './components/PetCatalog';
import BreedSizingCalculator from './components/BreedSizingCalculator';
import PawLiveToast from './components/PawLiveToast';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductDetailModal from './components/ProductDetailModal';
import BrassTagMonogramModal from './components/BrassTagMonogramModal';
import Footer from './components/Footer';

export default function App() {
  const [activeSize, setActiveSize] = useState('Medium');
  const [cart, setCart] = usePersistentState('gig2:store09:cart:v1', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPetItem, setSelectedPetItem] = useState(null);
  const [isTagStudioOpen, setIsTagStudioOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleApplyRecommendedSize = (sz) => {
    setActiveSize(sz);
  };

  const handleAddToCart = (item) => {
    const sizeToUse = item.selectedSize || activeSize;
    const lineId = item.cartLineId || `${item.id}-${sizeToUse}-${item.includeTreats ? 'treats' : 'plain'}`;
    const finalItem = {
      ...item,
      selectedSize: sizeToUse,
      cartLineId: lineId
    };

    setCart((prev) => {
      const existing = prev.find((p) => (p.cartLineId || p.id) === lineId);
      if (existing) {
        return prev.map((p) =>
          (p.cartLineId || p.id) === lineId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...finalItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAttachTag = (tagData) => {
    const tagLineId = `brass-tag-${Date.now()}`;
    const tagItem = {
      id: tagLineId,
      cartLineId: tagLineId,
      name: `Solid Brass Monogram Tag (${tagData.dogName || 'PUPPY'})`,
      category: `Laser Engraved Brass (${tagData.tagShape.toUpperCase()})`,
      price: 18,
      priceFormatted: '$18 USD',
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80',
      tagDetails: tagData,
      quantity: 1
    };
    setCart((prev) => [...prev, tagItem]);
    setIsCartOpen(true);
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
    <div className="min-h-screen flex flex-col bg-[#fcfaf4] text-[#2c332b]">
      <TopPetBar />
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTagMonogramStudio={() => setIsTagStudioOpen(true)}
      />
      <main className="flex-1">
        <Hero onOpenTagMonogramStudio={() => setIsTagStudioOpen(true)} />
        {/* Interactive Bespoke Bridle Leather & Brass Tag Customizer */}
        <InPageCollarCustomizer />
        <PetCatalog
          onAddToCart={handleAddToCart}
          onInspectItem={(item) => setSelectedPetItem(item)}
          activeRecommendedSize={activeSize}
        />
        <BreedSizingCalculator
          onAddFittedBundle={handleAddToCart}
          onApplyRecommendedSize={handleApplyRecommendedSize}
        />
      </main>
      <PawLiveToast />
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

      {/* 1-Click Pack Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={cartSubtotal}
        onOrderSuccess={() => handleClearCart()}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedPetItem}
        isOpen={!!selectedPetItem}
        onClose={() => setSelectedPetItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Real-time Laser Engraved Solid Brass Tag Monogram Modal */}
      <BrassTagMonogramModal
        isOpen={isTagStudioOpen}
        onClose={() => setIsTagStudioOpen(false)}
        onAttachTag={handleAttachTag}
      />
        <ScrollProgress accent="#445341" ink="#ffffff" />
</div>
  );
}