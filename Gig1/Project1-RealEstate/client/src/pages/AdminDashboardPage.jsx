import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { propertyService, inquiryService } from '../services/api';
import { formatPrice } from '../components/PropertyCard';
import { 
  Building2, 
  Plus, 
  Pencil,
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  ShieldAlert, 
  X,
  TrendingUp,
  KeyRound,
  Download,
  Search,
  MessageCircle,
  Filter
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'inquiries'
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inquiries Search & Filter State
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('All');

  // Modal State for Adding New Property
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: 'Apartment',
    purpose: 'For Sale',
    city: 'Hyderabad',
    street: '',
    state: 'Telangana',
    bedrooms: 3,
    bathrooms: 2,
    areaSqFt: 1800,
    parkingSpaces: 1,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    featured: false
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAdmin) fetchDashboardData();
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [propRes, inqRes] = await Promise.all([
        propertyService.getProperties({ limit: 50 }),
        inquiryService.getAll()
      ]);
      if (propRes.success && propRes.data) setProperties(propRes.data);
      if (inqRes.success && inqRes.data) setInquiries(inqRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to remove this property listing?')) return;
    try {
      await propertyService.delete(id);
      setProperties(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      await inquiryService.updateStatus(inquiryId, newStatus);
      setInquiries(prev =>
        prev.map(inq => (inq._id === inquiryId ? { ...inq, status: newStatus } : inq))
      );
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: newProperty.title,
        description: newProperty.description,
        price: Number(newProperty.price),
        propertyType: newProperty.propertyType,
        purpose: newProperty.purpose,
        address: {
          street: newProperty.street || 'Prime City Central',
          city: newProperty.city,
          state: newProperty.state,
          country: 'India'
        },
        specs: {
          bedrooms: Number(newProperty.bedrooms),
          bathrooms: Number(newProperty.bathrooms),
          areaSqFt: Number(newProperty.areaSqFt),
          parkingSpaces: Number(newProperty.parkingSpaces)
        },
        amenities: ['24/7 Security', 'Elevators', 'Covered Parking', 'Power Backup'],
        images: [newProperty.imageUrl],
        featured: newProperty.featured
      };

      const res = editingPropertyId
        ? await propertyService.update(editingPropertyId, payload)
        : await propertyService.create(payload);
      if (res.success && res.data) {
        setProperties(prev => editingPropertyId
          ? prev.map((property) => property._id === editingPropertyId ? res.data : property)
          : [res.data, ...prev]);
        setShowAddModal(false);
        setEditingPropertyId(null);
        setNewProperty({
          title: '',
          description: '',
          price: '',
          propertyType: 'Apartment',
          purpose: 'For Sale',
          city: 'Hyderabad',
          street: '',
          state: 'Telangana',
          bedrooms: 3,
          bathrooms: 2,
          areaSqFt: 1800,
          parkingSpaces: 1,
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          featured: false
        });
      }
    } catch (err) {
      alert('Creation failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProperty = (property) => {
    setEditingPropertyId(property._id);
    setNewProperty({
      title: property.title || '', description: property.description || '', price: property.price || '',
      propertyType: property.propertyType || 'Apartment', purpose: property.purpose || 'For Sale',
      city: property.address?.city || '', street: property.address?.street || '', state: property.address?.state || '',
      bedrooms: property.specs?.bedrooms || 1, bathrooms: property.specs?.bathrooms || 1,
      areaSqFt: property.specs?.areaSqFt || 1, parkingSpaces: property.specs?.parkingSpaces || 0,
      imageUrl: property.images?.[0] || '', featured: Boolean(property.featured)
    });
    setShowAddModal(true);
  };

  // Package C: Export Leads to CSV
  const exportLeadsToCSV = () => {
    if (inquiries.length === 0) return alert('No inquiries available to export.');

    const headers = ['Client Name', 'Email', 'Phone', 'Property Title', 'Tour Type', 'Date', 'Time', 'Preferred Contact', 'Status', 'Date Logged'];
    const rows = inquiries.map(i => [
      `"${i.name || ''}"`,
      `"${i.email || ''}"`,
      `"${i.phone || ''}"`,
      `"${(i.property?.title || '').replace(/"/g, '""')}"`,
      `"${i.tourType || 'In-Person Tour'}"`,
      `"${i.preferredDate || ''}"`,
      `"${i.preferredTime || ''}"`,
      `"${i.preferredContact || 'Phone'}"`,
      `"${i.status || 'New'}"`,
      `"${new Date(i.createdAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UrbanNest_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      const matchSearch = 
        inq.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
        inq.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
        (inq.property?.title || '').toLowerCase().includes(leadSearch.toLowerCase());
      
      const matchStatus = leadStatusFilter === 'All' || inq.status === leadStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [inquiries, leadSearch, leadStatusFilter]);

  if (authLoading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm text-slate-500" role="status">Checking administrator access…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Admin Authentication Required</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          The Admin Control Center is restricted to authorized real estate administrators. Sign in with an administrator account to continue.
        </p>
        <Link
          to="/login"
          className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const forSaleCount = properties.filter(p => p.purpose === 'For Sale').length;
  const forRentCount = properties.filter(p => p.purpose === 'For Rent').length;
  const newLeadsCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Demo Administrator · {user?.name}
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Broker Operations Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your property inventory, pricing, featured status, and customer lead inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportLeadsToCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-sm transition cursor-pointer"
            title="Download Excel/CSV report"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            Export Leads (CSV)
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Listing
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Listings</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{properties.length}</p>
          <p className="text-[10px] text-slate-400 mt-1">Active inventory on platform</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Properties For Sale</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{forSaleCount}</p>
          <p className="text-[10px] text-slate-400 mt-1">Capital investment units</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Rental Units</span>
            <KeyRound className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{forRentCount}</p>
          <p className="text-[10px] text-slate-400 mt-1">Monthly recurring assets</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Customer Leads</span>
            <Mail className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{inquiries.length}</p>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">{newLeadsCount} awaiting response</p>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('listings')}
          className={`py-3 px-6 text-xs font-bold border-b-2 transition cursor-pointer ${
            activeTab === 'listings'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Property Listings ({properties.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`py-3 px-6 text-xs font-bold border-b-2 transition cursor-pointer ${
            activeTab === 'inquiries'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Customer Leads & Inquiries ({inquiries.length})
        </button>
      </div>

      {/* Tab 1: Listings Table */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties.map((prop) => (
                  <tr key={prop._id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80'}
                          alt={prop.title}
                          className="w-12 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900 truncate max-w-xs">{prop.title}</p>
                          <p className="text-[10px] text-slate-400">{prop.specs?.bedrooms} Beds • {prop.specs?.areaSqFt} sqft</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">{prop.propertyType}</td>
                    <td className="py-3 px-4 text-slate-600">{prop.address?.city}</td>
                    <td className="py-3 px-4 font-extrabold text-slate-900">{formatPrice(prop.price, prop.purpose)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        prop.purpose === 'For Sale' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {prop.purpose}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        to={`/properties/${prop._id}`}
                        className="inline-block p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition"
                        title="View Live Listing"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleEditProperty(prop)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                        title="Edit Listing"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(prop._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Inquiries Table with Search, Filter & Quick-WhatsApp */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          
          {/* Lead Search and Status Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                placeholder="Search leads by name, email, property..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses ({inquiries.length})</option>
                <option value="New">🟡 New Leads ({inquiries.filter(i => i.status === 'New').length})</option>
                <option value="Contacted">🔵 Contacted ({inquiries.filter(i => i.status === 'Contacted').length})</option>
                <option value="Closed">🟢 Closed ({inquiries.filter(i => i.status === 'Closed').length})</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Inquired Property</th>
                    <th className="py-3 px-4">Tour Booking</th>
                    <th className="py-3 px-4">Pipeline Status</th>
                    <th className="py-3 px-4 text-right">Quick Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                        No customer leads found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => {
                      const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
                      const waLink = `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=${encodeURIComponent(`Hello ${inq.name}, I received your tour booking for "${inq.property?.title || 'our listing'}" on UrbanNest. Is this time still convenient for you?`)}`;

                      return (
                        <tr key={inq._id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4">
                            <p className="font-bold text-slate-900">{inq.name}</p>
                            <p className="text-[10px] text-slate-400">Prefers {inq.preferredContact || 'Phone'}</p>
                          </td>
                          <td className="py-3 px-4 space-y-0.5">
                            <a href={`mailto:${inq.email}`} className="text-slate-700 hover:text-emerald-600 flex items-center gap-1.5 transition">
                              <Mail className="w-3 h-3 text-slate-400" /> {inq.email}
                            </a>
                            <a href={`tel:${inq.phone}`} className="text-slate-700 hover:text-emerald-600 flex items-center gap-1.5 transition">
                              <Phone className="w-3 h-3 text-slate-400" /> {inq.phone}
                            </a>
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {inq.property?.title || 'Skyline Penthouse'}
                          </td>
                          <td className="py-3 px-4 space-y-1">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              inq.tourType === 'Virtual Video Call'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {inq.tourType || 'In-Person Tour'}
                            </span>
                            <p className="text-[11px] font-semibold text-slate-700">
                              {inq.preferredDate || 'Tomorrow'} at {inq.preferredTime || '11:00 AM'}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-lg border focus:outline-none transition cursor-pointer ${
                                inq.status === 'New'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : inq.status === 'Contacted'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              <option value="New">🟡 New Lead</option>
                              <option value="Contacted">🔵 Contacted</option>
                              <option value="Closed">🟢 Closed / Resolved</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-sm transition"
                              title="Message via WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create or edit a property */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{editingPropertyId ? 'Edit Listing' : 'Publish New Listing'}</h3>
                <p className="text-xs text-slate-500">Provide property specifications and imagery to add to catalog.</p>
              </div>
              <button
              onClick={() => { setShowAddModal(false); setEditingPropertyId(null); }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newProperty.title}
                  onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                  placeholder="e.g. Royal Crest Modernist Villa"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={newProperty.price}
                    onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                    placeholder="e.g. 45000000"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProperty.propertyType}
                    onChange={(e) => setNewProperty({ ...newProperty, propertyType: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="House">House</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Purpose</label>
                  <select
                    value={newProperty.purpose}
                    onChange={(e) => setNewProperty({ ...newProperty, purpose: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                  <select
                    value={newProperty.city}
                    onChange={(e) => setNewProperty({ ...newProperty, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Goa">Goa</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={newProperty.street}
                    onChange={(e) => setNewProperty({ ...newProperty, street: e.target.value })}
                    placeholder="e.g. Jubilee Hills Road 45"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    min="1"
                    value={newProperty.bedrooms}
                    onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    min="1"
                    value={newProperty.bathrooms}
                    onChange={(e) => setNewProperty({ ...newProperty, bathrooms: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Area (Sq Ft)</label>
                  <input
                    type="number"
                    value={newProperty.areaSqFt}
                    onChange={(e) => setNewProperty({ ...newProperty, areaSqFt: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newProperty.imageUrl}
                  onChange={(e) => setNewProperty({ ...newProperty, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={newProperty.description}
                  onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                  placeholder="Describe architectural features, lighting, amenities, and location advantages..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={newProperty.featured}
                  onChange={(e) => setNewProperty({ ...newProperty, featured: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                />
                <label htmlFor="featuredCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Feature this listing on the homepage showcase
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingPropertyId(null); }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 transition disabled:opacity-70 cursor-pointer"
                >
                  {submitting ? 'Saving...' : editingPropertyId ? 'Save Changes' : 'Publish Listing'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;
