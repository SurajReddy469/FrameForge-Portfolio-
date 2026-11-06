import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  propertyService, 
  inquiryService 
} from '../services/api';
import { formatPrice } from '../components/PropertyCard';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import { useToast } from '../context/ToastContext';
import MortgageCalculator from '../components/MortgageCalculator';
import ImageLightbox from '../components/ImageLightbox';
import { 
  Bed, 
  Bath, 
  Move, 
  Car, 
  MapPin, 
  Heart, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft,
  Send,
  Calendar,
  Video,
  UserCheck,
  Scale,
  Plane,
  Train,
  Hospital,
  GraduationCap,
  ShoppingBag,
  MessageCircle,
  Phone,
  Award,
  Star,
  Printer,
  Maximize2,
  User
} from 'lucide-react';

const BUSINESS_WHATSAPP = import.meta.env.VITE_BUSINESS_WHATSAPP ? import.meta.env.VITE_BUSINESS_WHATSAPP.replace(/\D/g, '') : null;

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite, user } = useAuth();
  const { toggleCompare, isComparing } = useCompare();
  const { addToast } = useToast();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Modern Tour & Booking Form State
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    message: 'I would like to schedule an inspection for this property.',
    tourType: 'In-Person Tour',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: '11:00 AM',
    preferredContact: 'Phone'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [tourConfirmationModalOpen, setTourConfirmationModalOpen] = useState(false);
  const [confirmedTour, setConfirmedTour] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await propertyService.getById(id);
        if (res && res.data) {
          setProperty(res.data);
          document.title = `${res.data.title} – UrbanNest | FrameForge Luxury`;
        } else {
          const match = initialMockProperties.find(p => p._id === id || p.id === id) || initialMockProperties[0];
          setProperty(match);
          document.title = `${match.title} – UrbanNest | FrameForge Luxury`;
        }
      } catch (err) {
        console.warn('Fallback applied for property detail', err);
        const match = initialMockProperties.find(p => p._id === id || p.id === id) || initialMockProperties[0];
        setProperty(match);
        document.title = `${match.title} – UrbanNest | FrameForge Luxury`;
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();

    return () => {
      document.title = 'UrbanNest – Luxury & Modern Real Estate | FrameForge';
    };
  }, [id]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      addToast('Please enter your full name', 'error');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    if (!form.phone.trim()) {
      addToast('Please enter your phone number', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await inquiryService.create({
        property: property._id,
        ...form
      });
      const code = 'UN-TOUR-' + Math.floor(100000 + Math.random() * 900000);
      const bookingData = {
        confirmationCode: code,
        propertyTitle: property.title,
        tourType: form.tourType,
        date: form.preferredDate,
        time: form.preferredTime,
        contactMethod: form.preferredContact,
        guestName: form.name
      };
      setConfirmedTour(bookingData);
      setTourConfirmationModalOpen(true);
      setSubmitSuccess(true);
      addToast('Tour inspection requested successfully!', 'success');
    } catch (err) {
      addToast('Failed to send booking: ' + (err.message || 'Please check your inputs'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Link copied to clipboard!', 'success');
  };

  const handleFavorite = () => {
    toggleFavorite(property._id).then(() => {
      addToast(isFav ? 'Removed from favorites' : 'Saved to your favorites!', isFav ? 'info' : 'success');
    }).catch(() => addToast('Could not update favorites. Please try again.', 'error'));
  };

  const handleCompare = () => {
    toggleCompare(property);
    addToast(inCompare ? 'Removed from comparison' : 'Added to comparison matrix!', inCompare ? 'info' : 'success');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="h-[480px] bg-slate-200 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Property not found</h2>
        <p className="text-sm text-slate-500">{loadError ? 'We could not load this listing. Check your connection and try again.' : 'This listing may have been removed or is no longer available.'}</p>
        <Link to="/properties" className="inline-block px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">
          Back to Listings
        </Link>
      </div>
    );
  }

  const isFav = Array.isArray(favorites) && favorites.includes(property._id);
  const inCompare = isComparing(property._id);
  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];

  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

  const whatsappMessage = encodeURIComponent(
    `Hello Aditya, I am inquiring about "${property.title}" (${formatPrice(property.price, property.purpose)}) on UrbanNest. Is it currently available for an inspection walkthrough?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button and title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all properties
        </Link>

        <div className="flex items-center gap-3">
          {/* Print Spec Sheet */}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-sm cursor-pointer"
            title="Download or Print Executive Property Spec Sheet"
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>Print Spec Sheet</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={handleCompare}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition shadow-sm cursor-pointer ${
              inCompare
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-4 h-4" />
            {inCompare ? 'In Comparison' : 'Add to Compare'}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-sm cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition shadow-sm cursor-pointer ${
              isFav
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            {isFav ? 'Saved in Favorites' : 'Save Property'}
          </button>
        </div>
      </div>

      {/* Property Hero Gallery */}
      <div className="space-y-4">
        <div 
          onClick={() => setLightboxOpen(true)}
          className="group relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200 cursor-zoom-in"
          title="Click to expand high-resolution photo viewer"
        >
          <img
            src={images[selectedImage]}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-3 py-1.5 text-xs font-extrabold rounded-lg uppercase tracking-wider text-white shadow-md ${
              property.purpose === 'For Sale' ? 'bg-emerald-600' : 'bg-blue-600'
            }`}>
              {property.purpose}
            </span>
            <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-950/85 backdrop-blur-md text-white shadow-md">
              {property.propertyType}
            </span>
          </div>

          <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Click to View Fullscreen • Photo {selectedImage + 1} of {images.length}</span>
          </div>
        </div>

        {/* Thumbnail Row */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-print">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                  selectedImage === idx ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Columns: Left Details, Right Lead & Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Header & Price */}
          <div className="border-b border-slate-200 pb-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{property.address?.street}, {property.address?.city}, {property.address?.state} {property.address?.zipCode}</span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {property.title}
            </h1>

            <div className="pt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {formatPrice(property.price, property.purpose)}
              </span>
              {property.purpose === 'For Rent' && (
                <span className="text-xs text-slate-500 ml-2 font-medium">inclusive of maintenance</span>
              )}
            </div>
          </div>

          {/* Key Specs Matrix */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Property Overview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Bedrooms</p>
                  <p className="text-sm font-bold text-slate-900">{property.specs?.bedrooms || 1} BHK</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Bathrooms</p>
                  <p className="text-sm font-bold text-slate-900">{property.specs?.bathrooms || 1} Full</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600">
                  <Move className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Built-up Area</p>
                  <p className="text-sm font-bold text-slate-900">{property.specs?.areaSqFt?.toLocaleString('en-IN')} sqft</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Parking</p>
                  <p className="text-sm font-bold text-slate-900">{property.specs?.parkingSpaces || 1} Covered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-200 pt-8 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">About This Residence</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities & Features */}
          <div className="border-t border-slate-200 pt-8 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Amenities & Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(property.amenities || [
                'Smart Home Automation',
                '24/7 Monitored Security',
                'Infinity Lap Pool',
                'Landscaped Zen Garden',
                'Modular Italian Kitchen',
                'High-Speed Elevators'
              ]).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhood Commute & Connectivity Hub */}
          <div className="border-t border-slate-200 pt-8 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Neighborhood & Connectivity Benchmarks
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Example travel times near {property.title}. Confirm current routes and distances before relying on them.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Metro Transit Line</p>
                  <p className="text-[11px] text-slate-500">6 Mins Walk (650m)</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">International Airport</p>
                  <p className="text-[11px] text-slate-500">28 Mins Expressway</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 shrink-0">
                  <Hospital className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Multispecialty Care</p>
                  <p className="text-[11px] text-slate-500">10 Mins (Apollo Hub)</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">International IB School</p>
                  <p className="text-[11px] text-slate-500">12 Mins (Oakridge / Chirec)</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Commercial & Retail</p>
                  <p className="text-[11px] text-slate-500">8 Mins Promenade</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Police / Civic Station</p>
                  <p className="text-[11px] text-slate-500">4 Mins Rapid Access</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Mortgage & EMI Calculator */}
          <div className="border-t border-slate-200 pt-8 no-print">
            <MortgageCalculator propertyPrice={property.price} />
          </div>

        </div>

        {/* Right Column: Tour Booking Card & Listing Agent Card */}
        <div className="space-y-6">
          
          {/* Demo listing contact card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 ring-2 ring-emerald-500/30 shrink-0 shadow-sm">
                <User className="w-7 h-7 text-slate-600" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-slate-900">Aditya Vardhan</h4>
                  <Award className="w-4 h-4 text-emerald-600" title="Demo listing contact" />
                </div>
                <p className="text-xs text-slate-500">VP, Luxury Residential Portfolio</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500 mr-1" /> 4.9 (38 Sales)
                  </span>
                  <span className="text-[10px] text-slate-400">Demo contact</span>
                </div>
              </div>
            </div>

            {BUSINESS_WHATSAPP ? <div className="grid grid-cols-2 gap-2 pt-2 no-print">
              <a
                href={`https://wa.me/${BUSINESS_WHATSAPP}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={`tel:+${BUSINESS_WHATSAPP}`}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Phone className="w-4 h-4" />
                Call Agent
              </a>
            </div> : <p className="pt-2 text-xs text-slate-500">Demo listing contact. Set VITE_BUSINESS_WHATSAPP to enable direct contact.</p>}
          </div>

          {/* Tour Inspection Booking Card */}
          <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-6 no-print">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Demo booking request
              </div>
              <h3 className="text-xl font-bold text-slate-900">Schedule a Private Tour</h3>
              <p className="text-xs text-slate-500 mt-1">
                Choose between an on-site walkthrough or a live guided video walkthrough.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-emerald-950">Appointment Requested!</h4>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-slate-700 space-y-1 text-left">
                  <p><strong>Tour Type:</strong> {form.tourType}</p>
                  <p><strong>Date & Time:</strong> {form.preferredDate} at {form.preferredTime}</p>
                  <p><strong>Property:</strong> {property.title}</p>
                </div>
                <p className="text-xs text-emerald-800">
                  Your demo request was submitted. The listing contact can follow up via {form.preferredContact}.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-2 text-xs font-bold text-emerald-800 underline cursor-pointer"
                >
                  Book another slot
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                
                {/* Tour Format Selector: In-Person vs Video */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tour Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, tourType: 'In-Person Tour' })}
                      className={`p-2.5 text-xs font-bold rounded-xl border flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                        form.tourType === 'In-Person Tour'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>In-Person Tour</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, tourType: 'Virtual Video Call' })}
                      className={`p-2.5 text-xs font-bold rounded-xl border flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                        form.tourType === 'Virtual Video Call'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Video className="w-4 h-4 text-blue-400" />
                      <span>Live Video Call</span>
                    </button>
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Inspection Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={form.preferredDate}
                      onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Time Window</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setForm({ ...form, preferredTime: time })}
                        className={`py-1.5 text-[11px] font-bold rounded-lg border transition cursor-pointer ${
                          form.preferredTime === time
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Client Contact Info */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Vikram Patel"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="vikram@example.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Contact Channel</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['WhatsApp', 'Phone', 'Email'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setForm({ ...form, preferredContact: mode })}
                        className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                          form.preferredContact === mode
                            ? 'bg-slate-900 border-slate-900 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Confirming Tour...' : 'Request Inspection Tour'}
                </button>

              </form>
            )}

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 text-center">
              Sample Property Data • Fictional Real Estate Entity for Technical Demonstration.
            </div>

          </div>
        </div>

      </div>

      {/* Tour Confirmation Modal */}
      {tourConfirmationModalOpen && confirmedTour && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
                Tour Booking Confirmed
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Inspection Walkthrough Reserved
              </h3>
              <p className="text-xs text-slate-500">
                A confirmation spec sheet and calendar invite have been reserved for your visit.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Pass Reference:</span>
                <span className="font-mono font-bold text-emerald-600 text-sm">
                  {confirmedTour.confirmationCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Property:</span>
                <span className="font-semibold text-slate-900 text-right truncate max-w-[200px]">
                  {confirmedTour.propertyTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Schedule:</span>
                <span className="font-semibold text-slate-900">
                  {confirmedTour.date} at {confirmedTour.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Format:</span>
                <span className="font-semibold text-emerald-700">
                  {confirmedTour.tourType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guest:</span>
                <span className="font-semibold text-slate-900">
                  {confirmedTour.guestName} ({confirmedTour.contactMethod})
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setTourConfirmationModalOpen(false)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                Done • View Property Spec
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      <ImageLightbox
        images={images}
        activeIndex={selectedImage}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setSelectedImage(newIdx)}
      />

    </div>
  );
};

export default PropertyDetailPage;
