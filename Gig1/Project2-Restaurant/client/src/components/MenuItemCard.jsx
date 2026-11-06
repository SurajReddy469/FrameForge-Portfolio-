import React from 'react';
import { Plus, Check, Flame, Clock, Star, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const MenuItemCard = ({ dish, onSelectDish }) => {
  const { items, addToCart, openCart } = useCart();
  const { addToast } = useToast();

  const cartItem = items.find((i) => i.dish._id === dish._id);
  const isInCart = !!cartItem;

  const isVeg = dish.dietaryTags?.includes('Vegetarian');
  const isChefSig = dish.dietaryTags?.includes('Chef Signature');

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(dish, 1);
    addToast(`Added "${dish.title}" to culinary bag`, 'success');
    openCart();
  };

  return (
    <div
      onClick={() => onSelectDish(dish)}
      className="group bg-stone-900/60 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/20 hover:-translate-y-1"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative h-52 w-full overflow-hidden bg-stone-950">
          <img
            src={dish.imageUrl}
            alt={dish.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            {/* Veg / Non-Veg Indicator Dot */}
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center bg-stone-950/80 backdrop-blur-sm ${
                isVeg ? 'border-emerald-500 text-emerald-400' : 'border-rose-500 text-rose-400'
              }`}
              title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
            </div>

            {isChefSig && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-stone-950 text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" />
                Signature
              </span>
            )}
          </div>

          {/* Spice Level Badge */}
          {dish.spiceLevel && dish.spiceLevel !== 'None' && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-stone-950/80 backdrop-blur-sm border border-stone-800 flex items-center gap-0.5 text-[11px] text-amber-400 font-medium">
              <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>{dish.spiceLevel}</span>
            </div>
          )}

          {/* Prep time & Rating Bottom Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-300">
            <span className="flex items-center gap-1 bg-stone-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{dish.preparationTime || 20}m prep</span>
            </span>
            <span className="flex items-center gap-1 bg-stone-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm text-amber-300 font-semibold">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{dish.rating || 4.8}</span>
              <span className="text-[10px] text-stone-400">({dish.numReviews || 40})</span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-amber-500/90">
            <span>{dish.category}</span>
            {dish.calories && <span className="text-stone-400">{dish.calories} kcal</span>}
          </div>

          <h3 className="font-serif-luxury text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1">
            {dish.title}
          </h3>

          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>

          {/* Dietary tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {dish.dietaryTags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-800/80 text-stone-300 border border-stone-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Price & Add to Cart Action */}
      <div className="px-5 pb-5 pt-3 border-t border-stone-800/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">Price</span>
          <span className="text-lg font-serif-luxury font-bold text-amber-400">
            ₹{dish.price}
          </span>
        </div>

        <button
          onClick={handleQuickAdd}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
            isInCart
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-950/30 hover:scale-105'
          }`}
        >
          {isInCart ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>In Bag ({cartItem.quantity})</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
