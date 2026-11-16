import React, { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import ScrollProgress from './components/ScrollProgress';
import TopParisianBar from './components/TopParisianBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InPageTastingExperience from './components/InPageTastingExperience';
import TruffleCatalog from './components/TruffleCatalog';
import CustomBoxBuilder from './components/CustomBoxBuilder';
import MaisonLiveToast from './components/MaisonLiveToast';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductDetailModal from './components/ProductDetailModal';
import CalligraphyCardModal from './components/CalligraphyCardModal';
import Footer from './components/Footer';
import { CHOCOLATE_COLLECTIONS } from './data/chocolateData';

export default function App() {
  const [cart, setCart] = usePersistentState('gig2:store08:cart:v1', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [selectedChocolate, setSelectedChocolate] = useState(null);
  const [isCalligraphyOpen, setIsCalligraphyOpen] = useState(false);
  const [attachedCard, setAttachedCard] = useState(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleAddToCart = (item) => {
    const style = item.boxStyle || 'Standard';
    const champ = Boolean(item.includeChampagneTruffles);
    const cartLineId = item.cartLineId || `${item.id}-${style}-${champ ? 'champ' : 'nochamp'}`;
    const finalItem = { ...item, boxStyle: style, includeChampagneTruffles: champ, cartLineId };

    setCart((prev) => {
      const existing = prev.find(p => (p.cartLineId || `${p.id}-${p.boxStyle}-${p.includeChampagneTruffles ? 'champ' : 'nochamp'}`) === cartLineId);
      if (existing) {
        return prev.map(p =>
          (p.cartLineId || `${p.id}-${p.boxStyle}-${p.includeChampagneTruffles ? 'champ' : 'nochamp'}`) === cartLineId
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
        const key = item.cartLineId || `${item.id}-${item.boxStyle}-${item.includeChampagneTruffles ? 'champ' : 'nochamp'}`;
        if (key === lineId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const handleRemoveFromCart = (lineId) => {
    setCart((prev) => prev.filter((item) => (item.cartLineId || `${item.id}-${item.boxStyle}-${item.includeChampagneTruffles ? 'champ' : 'nochamp'}`) !== lineId));
  };

  const handleProceedToCheckout = (subtotal) => {
    setCheckoutTotal(subtotal);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1c100c] text-[#fbf7f2]">
      <TopParisianBar />
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCalligraphyStudio={() => setIsCalligraphyOpen(true)}
      />
      <main className="flex-1">
        <Hero onOpenCalligraphyStudio={() => setIsCalligraphyOpen(true)} />
        {/* Interactive Single-Origin Terroir Tasting Experience */}
        <InPageTastingExperience />
        <TruffleCatalog
          onAddToCart={handleAddToCart}
          onInspectItem={(item) => setSelectedChocolate(item)}
        />
        <CustomBoxBuilder onAddCustomBoxToCart={handleAddToCart} />
      </main>
      <MaisonLiveToast />
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
        item={selectedChocolate}
        isOpen={Boolean(selectedChocolate)}
        onClose={() => setSelectedChocolate(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Parisian Calligraphy Studio Modal */}
      <CalligraphyCardModal
        isOpen={isCalligraphyOpen}
        onClose={() => setIsCalligraphyOpen(false)}
        onAttachCard={(cardData) => {
          setAttachedCard(cardData);
        }}
      />

      {/* Haute Confiserie Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={checkoutTotal || cartSubtotal}
        attachedCard={attachedCard}
        onOrderSuccess={(orderId) => {
          setCart([]);
          setAttachedCard(null);
        }}
      />
        <ScrollProgress accent="#c5a059" />
</div>
  );
}
