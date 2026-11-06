import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Move, MapPin, Heart, Scale, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import { useToast } from '../context/ToastContext';

export const formatPrice = (price, purpose) => {
  if (!price) return '₹0';
  
  if (purpose === 'For Rent') {
    return `₹${price.toLocaleString('en-IN')}/mo`;
  }
  
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lac`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

const PropertyCard = ({ property }) => {
  const { favorites, toggleFavorite } = useAuth();
  const { toggleCompare, isComparing } = useCompare();
  const { addToast } = useToast();
  
  const isFav = Array.isArray(favorites) && favorites.includes(property._id);
  const inCompare = isComparing(property._id);

  const mainImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(property._id).then(() => {
      addToast(isFav ? 'Removed from saved favorites' : 'Saved to favorites!', isFav ? 'info' : 'success');
    }).catch(() => addToast('Could not update favorites. Please try again.', 'error'));
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    toggleCompare(property);
    addToast(inCompare ? 'Removed from comparison list' : 'Added to comparison list!', inCompare ? 'info' : 'success');
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className={`px-2.5 py-1 text-xs font-extrabold rounded-lg uppercase tracking-wider shadow-sm text-white ${
            property.purpose === 'For Sale' ? 'bg-emerald-600' : 'bg-blue-600'
          }`}>
            {property.purpose}
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-900/85 backdrop-blur-md text-white shadow-sm">
            {property.propertyType}
          </span>
        </div>

        {/* Right Action Icons (Compare & Favorite) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {/* Compare Button */}
          <button
            onClick={handleCompareClick}
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              inCompare
                ? 'bg-emerald-600 text-white shadow-md scale-105 ring-2 ring-white'
                : 'bg-white/85 text-slate-700 hover:text-emerald-600 hover:bg-white'
            }`}
            title={inCompare ? 'Remove from comparison' : 'Compare property'}
            aria-label={inCompare ? 'Remove from comparison' : 'Compare property'}
          >
            <Scale className="w-4 h-4" />
          </button>

          {/* Favorite Heart Button */}
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              isFav
                ? 'bg-rose-500 text-white shadow-md scale-110'
                : 'bg-white/85 text-slate-700 hover:text-rose-500 hover:bg-white'
            }`}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Price overlay pill */}
        <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-lg border border-white/10">
          <span className="text-base font-extrabold text-white tracking-tight">
            {formatPrice(property.price, property.purpose)}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{property.address?.street}, {property.address?.city}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-600 transition-colors line-clamp-1 mb-2">
            {property.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specs bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5" title="Bedrooms">
            <Bed className="w-4 h-4 text-slate-400" />
            <span className="font-semibold">{property.specs?.bedrooms || 1} Beds</span>
          </div>

          <div className="flex items-center gap-1.5" title="Bathrooms">
            <Bath className="w-4 h-4 text-slate-400" />
            <span className="font-semibold">{property.specs?.bathrooms || 1} Baths</span>
          </div>

          <div className="flex items-center gap-1.5" title="Built-up Area">
            <Move className="w-4 h-4 text-slate-400" />
            <span className="font-semibold">{property.specs?.areaSqFt?.toLocaleString('en-IN') || 1000} sqft</span>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-4 flex items-center gap-2">
          <Link
            to={`/properties/${property._id}`}
            className="w-full text-center py-2.5 px-3 text-xs font-bold rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 transition-all duration-200 shadow-sm hover:shadow"
          >
            Explore Property & Schedule Tour
          </Link>
        </div>

      </div>

    </div>
  );
};

export default PropertyCard;
