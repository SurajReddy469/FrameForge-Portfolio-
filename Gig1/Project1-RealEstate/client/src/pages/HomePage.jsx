import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Building, 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  TrendingUp, 
  ArrowRight,
  Star,
  CheckCircle2
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import SkeletonCard from '../components/SkeletonCard';
import { propertyService } from '../services/api';
import { initialMockProperties } from '../data/mockProperties';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Hero Quick Search State
  const [searchCity, setSearchCity] = useState('All');
  const [searchType, setSearchType] = useState('All');
  const [searchPurpose, setSearchPurpose] = useState('For Sale');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await propertyService.getFeatured();
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setFeaturedProperties(res.data);
        } else {
          setFeaturedProperties(initialMockProperties.filter(p => p.featured));
        }
      } catch (err) {
        console.warn('Fallback applied for featured listings', err);
        setFeaturedProperties(initialMockProperties.filter(p => p.featured));
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const displayedProperties = React.useMemo(() => {
    let list = initialMockProperties;
    if (searchPurpose && searchPurpose !== 'All') {
      list = initialMockProperties.filter(p => p.purpose === searchPurpose);
    }
    return list;
  }, [searchPurpose]);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity !== 'All') params.append('city', searchCity);
    if (searchType !== 'All') params.append('propertyType', searchType);
    if (searchPurpose !== 'All') params.append('purpose', searchPurpose);
    navigate(`/properties?${params.toString()}`);
  };

  const categories = [
    { name: 'Luxury Villas', count: '180+ Properties', type: 'Villa', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80' },
    { name: 'Modern Apartments', count: '450+ Properties', type: 'Apartment', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
    { name: 'Sky Penthouses', count: '65+ Properties', type: 'Penthouse', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
    { name: 'Gated Houses', count: '240+ Properties', type: 'House', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center justify-center pt-16 pb-32 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-45">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md text-emerald-400 border border-emerald-500/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Discover Architecturally Significant Real Estate</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Find Your Next Sanctuary With <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Absolute Confidence.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Explore sample residences across the UrbanNest demo markets. Browse property details and send inquiries directly through the site.
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-100 max-w-4xl mx-auto text-left">
            
            {/* Purpose switchers: For Sale / For Rent */}
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
                Looking To:
              </span>
              
              <button
                type="button"
                onClick={() => setSearchPurpose('For Sale')}
                className={`px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-2 ${
                  searchPurpose === 'For Sale'
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>🏡 Buy Property (For Sale)</span>
              </button>

              <button
                type="button"
                onClick={() => setSearchPurpose('For Rent')}
                className={`px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-2 ${
                  searchPurpose === 'For Rent'
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>🔑 Rent Home (For Rent)</span>
              </button>
            </div>

            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              
              {/* City Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Location / City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-pointer"
                  >
                    <option value="All">All Metros</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Goa">Goa</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                  </select>
                </div>
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Property Category
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Penthouse">Penthouses</option>
                    <option value="Villa">Villas</option>
                    <option value="Apartment">Apartments</option>
                    <option value="House">Houses</option>
                  </select>
                </div>
              </div>

              {/* Budget Display */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Price Expectation
                </label>
                <div className="h-11 flex items-center px-3.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl">
                  {searchPurpose === 'For Sale' ? '₹1.5 Cr – ₹15 Cr' : '₹50,000 – ₹3L/mo'}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full h-11 flex items-center justify-center gap-2 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  Find Properties
                </button>
              </div>

            </form>

          </div>

        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Demo portfolio</p>
            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Sample property data</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">Curated</p>
            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Sample listings</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Demo</p>
            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Portfolio project</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">5 Cities</p>
            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Sample markets</p>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <Star className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              Handpicked Portfolios
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Exclusive Residences
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore sample listings from the UrbanNest portfolio demo.
            </p>
          </div>

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 group"
          >
            Explore All Listings
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
          </div>
        ) : featuredProperties.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="font-semibold text-slate-900">No featured listings yet.</p>
            <Link to="/properties" className="mt-2 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800">Browse all properties</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProperties.map((property) => <PropertyCard key={property._id} property={property} />)}
          </div>
        )}
      </section>

      {/* Categories Showcase */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore by Architecture & Typology
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Browse tailored residential formats matched to your lifestyle aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/properties?propertyType=${cat.type}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="font-extrabold text-lg leading-tight group-hover:text-emerald-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            The UrbanNest Advantage
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Engineered from ground up with integrity, security, and developer craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Listing Review Workflow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The demo supports a review workflow for property listings. Sample content is not evidence of legal title verification.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Direct Owner & Lead Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inquiries can be submitted through listing pages and managed from the administrator dashboard.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">High ROI Asset Insights</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore sample property details and neighborhood information across the demo markets.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 p-8 sm:p-14 overflow-hidden text-center text-white border border-slate-800 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Showcase or Acquire Your Dream Property?
            </h2>
            <p className="text-sm text-slate-400">
              Explore the sample catalog. Administrators can sign in to manage listings and inquiries.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/properties"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
              >
                Browse All Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
