import React, { useState } from 'react';
import { X, Plus, Minus, Flame, Clock, Star, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const DishDetailModal = ({ dish, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { addToCart } = useCart();
  const { addToast } = useToast();

  if (!dish) return null;

  const isVeg = dish.dietaryTags?.includes('Vegetarian');
  const isChefSig = dish.dietaryTags?.includes('Chef Signature');

  const handleAdd = () => {
    addToCart(dish, quantity, specialInstructions);
    addToast(`Added ${quantity}x "${dish.title}" to bag`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/85 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-800 text-stone-300 hover:text-stone-100 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo with Gradient */}
        <div className="relative h-72 w-full bg-stone-950">
          <img
            src={dish.imageUrl}
            alt={dish.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-950/30" />

          {/* Badges Overlay */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-md border flex items-center justify-center bg-stone-950/80 backdrop-blur-sm ${
                isVeg ? 'border-emerald-500 text-emerald-400' : 'border-rose-500 text-rose-400'
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
            </div>
            {isChefSig && (
              <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                Chef's Signature
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-sm border border-stone-800 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              {dish.category}
            </span>
          </div>
        </div>

        {/* Details Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-stone-100">
                {dish.title}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-stone-400">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{dish.rating || 4.8} / 5.0</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{dish.preparationTime || 20} minutes prep</span>
                </span>
                <span>•</span>
                <span>{dish.calories || 450} kcal</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs uppercase text-stone-400 font-medium block">A La Carte</span>
              <span className="font-serif-luxury text-3xl font-bold text-amber-400">
                ₹{dish.price}
              </span>
            </div>
          </div>

          <p className="text-sm text-stone-300 leading-relaxed">
            {dish.description}
          </p>

          {/* Dietary & Spice attributes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 text-xs">
            <div>
              <span className="text-stone-400 block text-[11px]">Dietary Profile</span>
              <span className="text-stone-200 font-medium">
                {dish.dietaryTags?.join(', ') || 'Chef Curated'}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Spice Level</span>
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                {dish.spiceLevel || 'Mild'}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-stone-400 block text-[11px]">Kitchen Guarantee</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Fresh Farm Sourced
              </span>
            </div>
          </div>

          {/* Special Instructions Note */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 block">
              Special Dietary / Preparation Request (Optional)
            </label>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Mild spice, no cilantro, dressing on the side..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 bg-stone-950 px-3 py-2 rounded-xl border border-stone-800">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg bg-stone-900 text-stone-300 hover:text-amber-400 flex items-center justify-center cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-stone-100 text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg bg-stone-900 text-stone-300 hover:text-amber-400 flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Bag CTA */}
            <button
              onClick={handleAdd}
              className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-950/50 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Culinary Bag • ₹{dish.price * quantity}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetailModal;
