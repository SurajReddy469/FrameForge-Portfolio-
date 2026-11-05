import React from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { formatPrice } from './PropertyCard';
import { X, Scale, Check, Minus, ArrowRight, Trash2 } from 'lucide-react';

const CompareModal = () => {
  const { compareList, removeCompare, clearCompare, isModalOpen, setIsModalOpen } = useCompare();

  if (compareList.length === 0) return null;

  const allAmenities = [
    'Private Terrace Deck',
    'Smart Home Automation',
    'Infinity Pool',
    'Clubhouse & Gym',
    '24/7 Monitored Security',
    'Private Heated Pool',
    'Landscaped Zen Garden',
    'High-Speed Elevators',
    'Modular Italian Kitchen',
    'Solar Powered System'
  ];

  return (
    <>
      {/* Floating Bottom Comparison Dock */}
      {!isModalOpen && (
        <aside 
          aria-label="Property comparison bar"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-950/95 text-white backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 max-w-xl w-[92%]"
        >
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold hidden sm:inline">Compare Residences:</span>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-2 flex-1">
            {compareList.map((prop) => (
              <div key={prop._id} className="relative group/thumb">
                <img
                  src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80'}
                  alt={prop.title}
                  className="w-10 h-10 rounded-lg object-cover border border-emerald-500/50"
                />
                <button
                  onClick={() => removeCompare(prop._id)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] cursor-pointer"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}

            {Array.from({ length: 3 - compareList.length }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg border border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-[10px] hidden sm:flex"
              >
                +{i + 1}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={compareList.length < 2}
              className={`px-4 py-2 text-xs font-black rounded-xl transition cursor-pointer shadow-md ${
                compareList.length >= 2
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              Compare ({compareList.length})
            </button>
            <button
              onClick={clearCompare}
              className="p-2 text-slate-400 hover:text-white transition cursor-pointer"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* Comparison Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl max-h-[92vh] overflow-y-auto space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Side-by-Side Property Matrix
                  </h3>
                  <p className="text-xs text-slate-500">
                    Comparing {compareList.length} luxury residences across specs, rates, and amenities.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearCompare}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="py-3 px-4 w-40 text-slate-400 font-bold uppercase tracking-wider bg-slate-50 rounded-l-xl">
                      Attribute
                    </th>
                    {compareList.map((prop) => (
                      <th key={prop._id} className="py-3 px-4 min-w-[240px] bg-slate-50 first:rounded-l-none last:rounded-r-xl">
                        <div className="space-y-2">
                          <img
                            src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'}
                            alt={prop.title}
                            className="w-full h-32 rounded-xl object-cover shadow-sm"
                          />
                          <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{prop.title}</h4>
                          <p className="text-emerald-700 font-black text-base">{formatPrice(prop.price, prop.purpose)}</p>
                          <Link
                            to={`/properties/${prop._id}`}
                            onClick={() => setIsModalOpen(false)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline"
                          >
                            Open Details <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-500">Location</td>
                    {compareList.map((p) => (
                      <td key={p._id} className="py-3 px-4 font-semibold text-slate-800">
                        {p.address?.city} ({p.address?.street})
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-500">Category & Purpose</td>
                    {compareList.map((p) => (
                      <td key={p._id} className="py-3 px-4">
                        <span className="font-bold text-slate-900">{p.propertyType}</span> • 
                        <span className="text-emerald-600 font-semibold ml-1">{p.purpose}</span>
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-500">Bedrooms & Baths</td>
                    {compareList.map((p) => (
                      <td key={p._id} className="py-3 px-4 font-semibold text-slate-800">
                        {p.specs?.bedrooms} BHK / {p.specs?.bathrooms} Baths
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-500">Built-up Area</td>
                    {compareList.map((p) => (
                      <td key={p._id} className="py-3 px-4 font-semibold text-slate-800">
                        {p.specs?.areaSqFt?.toLocaleString('en-IN')} sqft
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-500">Rate / Sq Ft</td>
                    {compareList.map((p) => {
                      const rate = p.specs?.areaSqFt ? Math.round(p.price / p.specs.areaSqFt) : 0;
                      return (
                        <td key={p._id} className="py-3 px-4 font-extrabold text-slate-900">
                          {p.purpose === 'For Sale' ? `₹${rate.toLocaleString('en-IN')} / sqft` : 'Rental asset'}
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-500">Parking Spaces</td>
                    {compareList.map((p) => (
                      <td key={p._id} className="py-3 px-4 font-semibold text-slate-800">
                        {p.specs?.parkingSpaces || 1} Covered
                      </td>
                    ))}
                  </tr>

                  {/* Amenities Comparison */}
                  {allAmenities.map((amenity) => (
                    <tr key={amenity} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-medium text-slate-600">{amenity}</td>
                      {compareList.map((p) => {
                        const has = p.amenities?.some((a) => a.toLowerCase().includes(amenity.toLowerCase().slice(0, 8)));
                        return (
                          <td key={p._id} className="py-2.5 px-4">
                            {has ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                                <Check className="w-4 h-4 stroke-[3]" /> Included
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-slate-300">
                                <Minus className="w-4 h-4" /> Not listed
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default CompareModal;
