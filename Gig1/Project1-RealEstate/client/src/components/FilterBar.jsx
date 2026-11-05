import React, { useState } from 'react';
import { Search, RotateCcw, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

const FilterBar = ({ filters, setFilters, onReset, cities, propertyTypes }) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const activeCount = Object.entries(filters || {}).filter(
    ([k, v]) => v && v !== 'All' && v !== ''
  ).length;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
      {/* Header with Title, Reset, and Mobile Expand Toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <span>Filter Listings</span>
          {activeCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
              {activeCount} active
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 font-medium transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset All</span>
          </button>

          {/* Mobile Accordion Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="md:hidden inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
          >
            <span>{isMobileExpanded ? 'Hide' : 'Show'}</span>
            {isMobileExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Filter Body: Collapsible on mobile, always visible on md+ */}
      <div className={`${isMobileExpanded ? 'block' : 'hidden md:block'} space-y-4 pt-1`}>
        {/* Search Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Keyword Search
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="search"
              value={filters.search || ''}
              onChange={handleChange}
              placeholder="Search by title, street, area..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Grid of Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* City Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              City / Location
            </label>
            <select
              name="city"
              value={filters.city || 'All'}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-pointer"
            >
              <option value="All">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Purpose Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Purpose
            </label>
            <select
              name="purpose"
              value={filters.purpose || 'All'}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-pointer"
            >
              <option value="All">Buy or Rent</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          {/* Property Type Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Property Category
            </label>
            <select
              name="propertyType"
              value={filters.propertyType || 'All'}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-pointer"
            >
              <option value="All">All Categories</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Bedrooms Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Bedrooms
            </label>
            <select
              name="bedrooms"
              value={filters.bedrooms || 'All'}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-pointer"
            >
              <option value="All">Any Bedrooms</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterBar;
