import React, { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import ScrollProgress from './components/ScrollProgress';
import TopWellnessBar from './components/TopWellnessBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import SkinQuizModal from './components/SkinQuizModal';
import ProductDetailModal from './components/ProductDetailModal';
import IngredientLabModal from './components/IngredientLabModal';
import HydrationBeforeAfterSlider from './components/HydrationBeforeAfterSlider';
import BotanicalLiveToast from './components/BotanicalLiveToast';
import CheckoutModal from './components/CheckoutModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { PRODUCTS } from './data/skincareData';

export default function App() {
  const [cart, setCart] = usePersistentState('gig2:store03:cart:v1', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [isIngredientLabOpen, setIsIngredientLabOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const handleAddToCart = (product) => {
    const isSub = Boolean(product.isSubscribed);
    const cartLineId = product.cartLineId || `${product.id}-${isSub ? 'sub' : 'onetime'}`;
    const finalProduct = { ...product, isSubscribed: isSub, cartLineId };

    setCart((prev) => {
      const existing = prev.find(item => (item.cartLineId || `${item.id}-${item.isSubscribed ? 'sub' : 'onetime'}`) === cartLineId);
      if (existing) {
        return prev.map(item =>
          (item.cartLineId || `${item.id}-${item.isSubscribed ? 'sub' : 'onetime'}`) === cartLineId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...finalProduct, quantity: product.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddRoutineToCart = (products) => {
    products.forEach(p => {
      const subPrice = Math.round(p.price * 0.85);
      handleAddToCart({
        ...p,
        price: subPrice,
        isSubscribed: true,
        cartLineId: `${p.id}-sub`
      });
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (lineId) => {
    setCart(prev => prev.filter(item => (item.cartLineId || `${item.id}-${item.isSubscribed ? 'sub' : 'onetime'}`) !== lineId));
  };

  const handleUpdateQuantity = (lineId, delta) => {
    setCart(prev => prev.map(item => {
      const key = item.cartLineId || `${item.id}-${item.isSubscribed ? 'sub' : 'onetime'}`;
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
    <div className="min-h-screen bg-[#fbf8f5] text-[#2c322b] flex flex-col font-sans selection:bg-[#3e473d] selection:text-[#fbf8f5]">
      {/* Top Botanical Announcement */}
      <TopWellnessBar onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Japandi Header */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsIngredientLabOpen(true)}
      />

      <main className="flex-1">
        {/* Serene Botanical Hero */}
        <Hero onOpenQuiz={() => setIsQuizOpen(true)} />

        {/* In-Page Interactive Moisture & Barrier Hydration Slider */}
        <HydrationBeforeAfterSlider />

        {/* Clinical Organic Routine Grid */}
        <ProductGrid
          onAddToCart={handleAddToCart}
          onInspectProduct={(prod) => setDetailProduct(prod)}
        />
      </main>

      {/* Kyoto & Copenhagen Footer */}
      <Footer onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
        product={detailProduct}
        onAddToCart={handleAddToCart}
        onOpenIngredientLab={() => setIsIngredientLabOpen(true)}
      />

      {/* Diagnostic Regimen Quiz Modal */}
      <SkinQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddRoutineToCart={handleAddRoutineToCart}
      />

      {/* Phytomedical Ingredient Research Lab Modal */}
      <IngredientLabModal
        isOpen={isIngredientLabOpen}
        onClose={() => setIsIngredientLabOpen(false)}
      />

      {/* Japandi Botanical Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Botanical Pure Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={checkoutTotal || cartSubtotal}
        onOrderSuccess={(orderId) => {
          setCart([]);
        }}
      />

      {/* Serene Organic Batch Harvest Toast */}
      <BotanicalLiveToast />
        <ScrollProgress accent="#788574" />
</div>
  );
}
