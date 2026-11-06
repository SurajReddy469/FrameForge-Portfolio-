import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Calendar, ArrowRight, Star, Award, Sparkles, ChefHat, Clock, Wine, ShieldCheck } from 'lucide-react';
import MenuItemCard from '../components/MenuItemCard';
import DishDetailModal from '../components/DishDetailModal';
import { menuService, INITIAL_DISHES } from '../services/api';

const HomePage = () => {
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await menuService.getMenuItems({ featured: 'true' });
        if (res.success && res.data) {
          setFeaturedDishes(res.data.slice(0, 6));
        }
      } catch (err) {
        console.warn("Featured dishes fallback applied", err);
        setFeaturedDishes(INITIAL_DISHES.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: 'Chef Specials', desc: 'Rare seasonal tasting plates', img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80' },
    { name: 'Main Course', desc: 'Prime cuts & ocean catches', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80' },
    { name: 'Woodfired & Pasta', desc: 'Handcrafted sourdough & pasta', img: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=600&q=80' },
    { name: 'Artisanal Desserts', desc: 'Single-origin Valrhona cocoa', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Atmosphere Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
            alt="GourmetHaven Luxury Ambience"
            className="w-full h-full object-cover filter brightness-[0.35] scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-10">
          {/* Michelin Accolade Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-xl animate-fade-in">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Artisanal Dining Concept • Technical Demo Project</span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-300">Hyderabad Sanctuary</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-100 leading-[1.1]">
            Where Culinary Artistry Meets{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              Timeless Elegance
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 font-light leading-relaxed">
            Experience sensorial gastronomy curated by Master Chef Alessandro Moretti. Sourced from sustainable regional farms, hand-finished over woodfire, and served in an atmosphere of refined indulgence.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm uppercase tracking-wider shadow-2xl shadow-amber-950/60 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 stroke-[2.5]" />
              <span>Explore Tasting Menu</span>
            </Link>

            <Link
              to="/reserve"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-amber-300 border border-amber-500/30 hover:border-amber-400 font-bold text-sm uppercase tracking-wider backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-stone-800/80 max-w-4xl mx-auto text-stone-300">
            <div>
              <span className="font-serif-luxury text-3xl font-bold text-amber-400 block">4.9 / 5</span>
              <span className="text-xs uppercase tracking-wider text-stone-400">Sample Concept Ratings</span>
            </div>
            <div>
              <span className="font-serif-luxury text-3xl font-bold text-amber-400 block">100%</span>
              <span className="text-xs uppercase tracking-wider text-stone-400">Fresh Farm Sourced</span>
            </div>
            <div>
              <span className="font-serif-luxury text-3xl font-bold text-amber-400 block">35 Mins</span>
              <span className="text-xs uppercase tracking-wider text-stone-400">Express Delivery</span>
            </div>
            <div>
              <span className="font-serif-luxury text-3xl font-bold text-amber-400 block">4 Zones</span>
              <span className="text-xs uppercase tracking-wider text-stone-400">Luxury Dining Spaces</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chef's Story & Philosophy Section */}
      <section id="story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image composition */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                alt="Executive Chef preparing artisan dish"
                className="w-full h-[480px] object-cover"
              />
            </div>
            {/* Overlay Experience Card */}
            <div className="absolute -bottom-6 -right-6 z-20 bg-stone-900 border border-stone-800 p-6 rounded-2xl shadow-2xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-stone-100 font-bold text-base">24+ Years</h4>
                  <p className="text-xs text-stone-400">Artisan culinary craft & pastry design</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>The Culinary Philosophy</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-100 leading-tight">
              Honoring Heritage, Reimagining Modern Gastronomy
            </h2>

            <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
              At GourmetHaven, every ingredient tells a tale of terroir, climate, and dedication. Our culinary philosophy centers on hyper-seasonal produce, sustainable organic partnerships with regional growers, and the age-old alchemy of slow fermentation and woodfire roasting.
            </p>

            <blockquote className="p-4 rounded-2xl bg-stone-900/80 border-l-4 border-amber-500 text-stone-200 italic text-sm">
              "We don't merely cook food; we compose an intimate narrative of taste, texture, and aroma that lingers long after the final sip."
              <span className="block not-italic text-xs font-semibold text-amber-400 mt-2">
                — Chef Alessandro Moretti, Head of Culinary Arts
              </span>
            </blockquote>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wide">Pure Terroir</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Zero artificial preservatives or additive chemicals.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Wine className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wide">Curated Cellar</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Over 180 vintage labels handpicked by our sommelier.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Signature Dishes Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
              Curated Masterpieces
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-100">
              Chef's Signature Creations
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-stone-900 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(dietaryFilter === 'All' ? featuredDishes : featuredDishes.filter(d => dietaryFilter === 'Veg' ? d.dietaryTags?.includes('Vegetarian') : d.dietaryTags?.includes('Chef Signature'))).map((dish) => (
              <MenuItemCard
                key={dish._id}
                dish={dish}
                onSelectDish={(d) => setSelectedDish(d)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Culinary Categories Exploration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Culinary Odyssey
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-100">
            Explore by Course
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            From sensory starters to decadent desserts, embark on an artisanal tasting journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${encodeURIComponent(cat.name)}`}
              className="group relative h-72 rounded-3xl overflow-hidden border border-stone-800 shadow-xl cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif-luxury text-xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1">{cat.desc}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore dishes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Table Reservation Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 to-stone-950 border border-amber-500/20 p-8 sm:p-14 shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Intimate Hospitality</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-100 leading-tight">
              An Unforgettable Evening Awaits You
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Reserve your personal table across our Skyline Rooftop, Private Chef's Table, or Main Dining Hall. Ideal for milestones, business summits, or romantic celebrations.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/reserve"
                className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-950/50 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Table Now</span>
              </Link>

              <Link
                to="/menu"
                className="px-8 py-4 rounded-2xl bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>View Menu First</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

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

export default HomePage;
