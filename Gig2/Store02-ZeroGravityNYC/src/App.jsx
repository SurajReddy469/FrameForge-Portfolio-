import React, { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import ScrollProgress from './components/ScrollProgress';
import MarqueeBar from './components/MarqueeBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import FitFinder from './components/FitFinder';
import ProductDetailModal from './components/ProductDetailModal';
import DropPassModal from './components/DropPassModal';
import CheckoutModal from './components/CheckoutModal';
import CartDrawer from './components/CartDrawer';
import DrapeSilhouetteShowcase from './components/DrapeSilhouetteShowcase';
import { CyberDropLiveToast } from './components/CyberSoundEffects';
import Footer from './components/Footer';
import { PRODUCTS } from './data/streetwearData';

export default function App() {
  const [activeSize, setActiveSize] = useState('L');
  const [cart, setCart] = usePersistentState('gig2:store02:cart:v1', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFitFinderOpen, setIsFitFinderOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [isDropPassOpen, setIsDropPassOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  // Fit recommendation guides future selections without modifying items already in cart
  const handleApplyRecommendedSize = (newSize) => {
    setActiveSize(newSize);
  };

  const handleAddToCart = (product) => {
    const sizeToUse = product.selectedSize || activeSize;
    const cartLineId = product.cartLineId || `${product.id}-${sizeToUse}`;
    const finalProduct = { ...product, selectedSize: sizeToUse, cartLineId };

    setCart((prev) => {
      const existing = prev.find(item => (item.cartLineId || `${item.id}-${item.selectedSize}`) === cartLineId);
      if (existing) {
        return prev.map(item =>
          (item.cartLineId || `${item.id}-${item.selectedSize}`) === cartLineId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...finalProduct, quantity: product.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (lineId) => {
    setCart(prev => prev.filter(item => (item.cartLineId || `${item.id}-${item.selectedSize}`) !== lineId));
  };

  const handleUpdateQuantity = (lineId, delta) => {
    setCart(prev => prev.map(item => {
      const key = item.cartLineId || `${item.id}-${item.selectedSize}`;
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
    <div className="min-h-screen bg-[#050505] text-[#ededed] flex flex-col font-mono selection:bg-[#ccff00] selection:text-black">
      {/* Live Marquee Ticker */}
      <MarqueeBar />

      {/* Brutalist Header with Drop Information */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFitFinder={() => setIsFitFinderOpen(true)}
        activeSize={activeSize}
      />

      <main className="flex-1">
        {/* Cyberpunk Heavyweight Hero */}
        <Hero onOpenFitFinder={() => setIsFitFinderOpen(true)} />

        {/* In-Page Interactive Drape Silhouette Showcase */}
        <DrapeSilhouetteShowcase />

        {/* Drop 004 Catalog with Live Stock Indicators */}
        <ProductGrid
          onAddToCart={handleAddToCart}
          onInspectProduct={(prod) => setDetailProduct(prod)}
        />
      </main>

      {/* Underground Brooklyn Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
        product={detailProduct}
        onAddToCart={handleAddToCart}
        onOpenDropPass={() => setIsDropPassOpen(true)}
      />

      {/* Cryptographic Drop Pass Modal */}
      <DropPassModal
        isOpen={isDropPassOpen}
        onClose={() => setIsDropPassOpen(false)}
      />

      {/* Interactive Biometric Fit Diagnostic Modal */}
      <FitFinder
        isOpen={isFitFinderOpen}
        onClose={() => setIsFitFinderOpen(false)}
        onApplySize={handleApplyRecommendedSize}
        initialSize={activeSize}
      />

      {/* Drop Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Encrypted Demo Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={checkoutTotal || cartSubtotal}
        onOrderSuccess={(orderId) => {
          setCart([]);
        }}
      />

      {/* Live Drop Alert Toasts */}
      <CyberDropLiveToast />
        <ScrollProgress accent="#ccff00" />
</div>
  );
}
