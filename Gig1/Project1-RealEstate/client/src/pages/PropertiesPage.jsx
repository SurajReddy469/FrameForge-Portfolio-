import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import SkeletonCard from '../components/SkeletonCard';
import FilterBar from '../components/FilterBar';
import { propertyService } from '../services/api';
import { initialMockProperties } from '../data/mockProperties';
import { Building2, X, ArrowUpDown } from 'lucide-react';

const CITIES = ['Hyderabad', 'Bengaluru', 'Goa', 'Mumbai', 'Delhi NCR'];
const PROPERTY_TYPES = ['Penthouse', 'Villa', 'Apartment', 'House', 'Commercial'];

const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  // Directly derive filters from URL searchParams (single source of truth)
  const filters = useMemo(() => ({
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || 'All',
    propertyType: searchParams.get('propertyType') || 'All',
    purpose: searchParams.get('purpose') || 'All',
    bedrooms: searchParams.get('bedrooms') || 'All'
  }), [searchParams]);

  // Update URL searchParams when user modifies filters
  const setFilters = useCallback((updater) => {
    const nextFilters = typeof updater === 'function' ? updater(filters) : updater;
    const params = new URLSearchParams();
    if (nextFilters.search) params.set('search', nextFilters.search);
    if (nextFilters.city && nextFilters.city !== 'All') params.set('city', nextFilters.city);
    if (nextFilters.propertyType && nextFilters.propertyType !== 'All') params.set('propertyType', nextFilters.propertyType);
    if (nextFilters.purpose && nextFilters.purpose !== 'All') params.set('purpose', nextFilters.purpose);
    if (nextFilters.bedrooms && nextFilters.bedrooms !== 'All') params.set('bedrooms', nextFilters.bedrooms);
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  // Fetch properties once whenever searchParams, sortBy, or retryKey change
  useEffect(() => {
    let isSubscribed = true;

    const fetchListings = async () => {
      setLoading(true);
      try {
        const queryParams = {
          ...filters,
          sortBy
        };
        const res = await propertyService.getProperties(queryParams);
        if (isSubscribed) {
          if (res && res.data && Array.isArray(res.data)) {
            setProperties(res.data);
          } else {
            // Infallible fallback: filter mock properties client-side
            let fallbackList = [...initialMockProperties];
            if (filters.search) {
              const q = filters.search.toLowerCase();
              fallbackList = fallbackList.filter(
                p => p.title.toLowerCase().includes(q) || (p.address?.city && p.address.city.toLowerCase().includes(q))
              );
            }
            if (filters.city && filters.city !== 'All') {
              fallbackList = fallbackList.filter(p => p.address?.city?.toLowerCase() === filters.city.toLowerCase());
            }
            if (filters.propertyType && filters.propertyType !== 'All') {
              fallbackList = fallbackList.filter(p => p.propertyType === filters.propertyType);
            }
            if (filters.purpose && filters.purpose !== 'All') {
              fallbackList = fallbackList.filter(p => p.purpose === filters.purpose);
            }
            if (filters.bedrooms && filters.bedrooms !== 'All') {
              fallbackList = fallbackList.filter(p => p.specs?.bedrooms === Number(filters.bedrooms));
            }
            if (sortBy === 'price-low') {
              fallbackList.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-high') {
              fallbackList.sort((a, b) => b.price - a.price);
            }
            setProperties(fallbackList);
          }
        }
      } catch (err) {
        if (isSubscribed) {
          console.warn('Fallback applied for properties list:', err);
          let fallbackList = [...initialMockProperties];
          if (filters.search) {
            const q = filters.search.toLowerCase();
            fallbackList = fallbackList.filter(
              p => p.title.toLowerCase().includes(q) || (p.address?.city && p.address.city.toLowerCase().includes(q))
            );
          }
          if (filters.city && filters.city !== 'All') {
            fallbackList = fallbackList.filter(p => p.address?.city?.toLowerCase() === filters.city.toLowerCase());
          }
          if (filters.propertyType && filters.propertyType !== 'All') {
            fallbackList = fallbackList.filter(p => p.propertyType === filters.propertyType);
          }
          if (filters.purpose && filters.purpose !== 'All') {
            fallbackList = fallbackList.filter(p => p.purpose === filters.purpose);
          }
          if (filters.bedrooms && filters.bedrooms !== 'All') {
            fallbackList = fallbackList.filter(p => p.specs?.bedrooms === Number(filters.bedrooms));
          }
          if (sortBy === 'price-low') {
            fallbackList.sort((a, b) => a.price - b.price);
          } else if (sortBy === 'price-high') {
            fallbackList.sort((a, b) => b.price - a.price);
          }
          setProperties(fallbackList);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchListings();

    return () => {
      isSubscribed = false;
    };
  }, [filters, sortBy]);

  const handleReset = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
    setSortBy('newest');
  };

  const removeFilter = (key, defaultValue = 'All') => {
    const params = new URLSearchParams(searchParams);
    if (defaultValue === '' || defaultValue === 'All') {
      params.delete(key);
    } else {
      params.set(key, defaultValue);
    }
    setSearchParams(params, { replace: true });
  };

  const activeFilterCount = Object.entries(filters).filter(
    ([k, v]) => v && v !== 'All' && v !== ''
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Curated Real Estate Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse sample luxury residences with live criteria filtering.
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort By:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm cursor-pointer"
          >
            <option value="newest">Newest Listed</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Component */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onReset={handleReset}
        cities={CITIES}
        propertyTypes={PROPERTY_TYPES}
      />

      {/* Active Filter Pills Bar */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-semibold text-slate-500 mr-1">Active Filters:</span>

          {filters.search && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
              Keyword: "{filters.search}"
              <button onClick={() => removeFilter('search', '')} className="cursor-pointer"><X className="w-3 h-3 hover:text-rose-500" /></button>
            </span>
          )}

          {filters.city !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              City: {filters.city}
              <button onClick={() => removeFilter('city')} className="cursor-pointer"><X className="w-3 h-3 hover:text-rose-500" /></button>
            </span>
          )}

          {filters.purpose !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Purpose: {filters.purpose}
              <button onClick={() => removeFilter('purpose')} className="cursor-pointer"><X className="w-3 h-3 hover:text-rose-500" /></button>
            </span>
          )}

          {filters.propertyType !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              Type: {filters.propertyType}
              <button onClick={() => removeFilter('propertyType')} className="cursor-pointer"><X className="w-3 h-3 hover:text-rose-500" /></button>
            </span>
          )}

          {filters.bedrooms !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              Bedrooms: {filters.bedrooms} BHK
              <button onClick={() => removeFilter('bedrooms')} className="cursor-pointer"><X className="w-3 h-3 hover:text-rose-500" /></button>
            </span>
          )}

          <button
            onClick={handleReset}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing <strong className="text-slate-900 font-bold">{properties.length}</strong> matching properties</span>
      </div>

      {/* Grid of Properties */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching properties found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We couldn't find any property matching your active criteria. Try broadening your search or resetting filters.
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}

    </div>
  );
};

export default PropertiesPage;
