import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Sparkles, Utensils, Flame, Leaf, X } from 'lucide-react';
import MenuItemCard from '../components/MenuItemCard';
import DishDetailModal from '../components/DishDetailModal';
import { menuService, INITIAL_DISHES } from '../services/api';

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDietary, setSelectedDietary] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [selectedDish, setSelectedDish] = useState(null);

  const categories = ['All', 'Chef Specials', 'Starters', 'Main Course', 'Woodfired & Pasta', 'Desserts', 'Beverages'];
  const dietaryFilters = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Chef Signature'];

  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (selectedDietary !== 'All') params.dietary = selectedDietary;
        if (searchQuery.trim()) params.search = searchQuery.trim();
        if (sortOption !== 'default') params.sort = sortOption;

        const res = await menuService.getMenuItems(params);
        if (res.success && res.data) {
          setDishes(res.data);
        }
      } catch (err) {
        console.warn("Menu fetch fallback applied", err);
        setDishes(INITIAL_DISHES);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [selectedCategory, selectedDietary, searchQuery, sortOption]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Utensils className="w-3.5 h-3.5" />
          <span>Sensory Fine Dining</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-100">
          The Artisanal Tasting Menu
        </h1>
        <p className="text-sm text-stone-400 max-w-xl mx-auto">
          Crafted daily with seasonal regional harvests, aged Parmigiano, and single-origin chocolates.
        </p>
      </div>

      {/* Control Bar: Search & Sorting */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish, ingredient, or recipe..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-9 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs text-stone-400 font-medium whitespace-nowrap">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="default">Chef's Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-950/40 scale-105'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dietary Filters Pill Strip */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-850">
        <span className="text-xs text-stone-500 font-medium mr-2 flex items-center gap-1">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>Dietary Preference:</span>
        </span>
        {dietaryFilters.map((diet) => (
          <button
            key={diet}
            onClick={() => setSelectedDietary(diet)}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${
              selectedDietary === diet
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                : 'bg-stone-900 text-stone-400 hover:text-stone-300 border border-stone-800'
            }`}
          >
            {diet}
          </button>
        ))}
      </div>

      {/* Dishes Count Indicator */}
      <div className="flex items-center justify-between text-xs text-stone-400 pt-2">
        <span>Showing {dishes.length} artisanal dishes</span>
        {(selectedCategory !== 'All' || selectedDietary !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDietary('All');
              setSearchQuery('');
            }}
            className="text-amber-400 hover:underline cursor-pointer font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Dishes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-80 rounded-2xl bg-stone-900 animate-pulse border border-stone-800" />
          ))}
        </div>
      ) : dishes.length === 0 ? (
        <div className="text-center py-20 bg-stone-900/40 rounded-3xl border border-stone-800 space-y-4">
          <Utensils className="w-12 h-12 text-stone-600 mx-auto" />
          <h3 className="font-serif-luxury text-xl font-bold text-stone-300">
            No culinary creations match your filter
          </h3>
          <p className="text-xs text-stone-400 max-w-md mx-auto">
            Try adjusting your search criteria or explore our complete tasting menu across all categories.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDietary('All');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <MenuItemCard
              key={dish._id}
              dish={dish}
              onSelectDish={(d) => setSelectedDish(d)}
            />
          ))}
        </div>
      )}

      {/* Dish Detail Modal */}
      {selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  );
};

export default MenuPage;
