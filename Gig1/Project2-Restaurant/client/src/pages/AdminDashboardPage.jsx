import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  Calendar,
  Utensils,
  Plus,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Bike,
  ChefHat,
  Filter,
  Eye,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { orderService, reservationService, menuService } from '../services/api';

const AdminDashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'reservations', 'menu'
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter and Search states
  const [orderFilter, setOrderFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [resFilter, setResFilter] = useState('All');

  // New Dish Modal
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [newDish, setNewDish] = useState({
    title: '',
    category: 'Chef Specials',
    price: 750,
    preparationTime: 20,
    calories: 450,
    spiceLevel: 'Mild',
    dietaryTags: ['Vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh seasonal culinary creation infused with artisanal aromas.'
  });

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersRes, resRes, menuRes] = await Promise.all([
        orderService.getOrders(user?.token),
        reservationService.getReservations(user?.token),
        menuService.getMenuItems()
      ]);

      if (ordersRes.data) setOrders(ordersRes.data);
      if (resRes.data) setReservations(resRes.data);
      if (menuRes.data) setDishes(menuRes.data);
    } catch (err) {
      console.error('Admin data fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await orderService.updateStatus(id, status, user?.token);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, orderStatus: status } : o))
      );
      addToast(`Order updated to "${status}"`, 'success');
    } catch (err) {
      addToast(err.message || 'Failed to update order', 'error');
    }
  };

  const handleUpdateResStatus = async (id, status) => {
    try {
      await reservationService.updateStatus(id, status, user?.token);
      setReservations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
      addToast(`Reservation marked as "${status}"`, 'success');
    } catch (err) {
      addToast(err.message || 'Failed to update reservation', 'error');
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    try {
      const res = await menuService.createMenuItem(newDish, user?.token);
      if (res.success && res.data) {
        setDishes((prev) => [res.data, ...prev]);
        setIsAddDishOpen(false);
        addToast(`Dish "${newDish.title}" added to menu`, 'success');
      }
    } catch (err) {
      addToast(err.message || 'Failed to add dish', 'error');
    }
  };

  const handleDeleteDish = async (id, title) => {
    if (!window.confirm(`Are you sure you want to remove "${title}" from the menu?`)) return;
    try {
      await menuService.deleteMenuItem(id, user?.token);
      setDishes((prev) => prev.filter((d) => d._id !== id));
      addToast(`Dish removed from menu`, 'info');
    } catch (err) {
      addToast(err.message || 'Failed to remove dish', 'error');
    }
  };

  const handleToggleAvailability = async (id, currentStatus) => {
    try {
      const nextStatus = !currentStatus;
      await menuService.updateMenuItem(id, { isAvailable: nextStatus }, user?.token);
      setDishes((prev) =>
        prev.map((d) => (d._id === id ? { ...d, isAvailable: nextStatus } : d))
      );
      addToast(`Dish marked as ${nextStatus ? 'In Stock' : 'Sold Out'}`, 'success');
    } catch (err) {
      addToast(err.message || 'Failed to update dish status', 'error');
    }
  };

  const escapeCSV = (value) => {
    if (value === null || value === undefined) return '""';
    const str = String(value);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const exportOrdersCSV = () => {
    if (orders.length === 0) {
      addToast('No orders to export', 'error');
      return;
    }
    const headers = ['Order Number', 'Date', 'Customer Name', 'Phone', 'Type', 'Payment Status', 'Order Status', 'Total (INR)'];
    const rows = orders.map((o) => [
      escapeCSV(o.orderNumber),
      escapeCSV(new Date(o.createdAt).toLocaleDateString()),
      escapeCSV(o.customerName),
      escapeCSV(o.customerPhone),
      escapeCSV(o.orderType),
      escapeCSV(o.paymentStatus || 'Pending'),
      escapeCSV(o.orderStatus),
      escapeCSV(o.totalAmount)
    ]);

    const csvContent = [headers.map(escapeCSV).join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const encodedUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GourmetHaven_Orders_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Orders report downloaded as CSV', 'success');
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' && o.orderStatus !== 'Cancelled' ? o.totalAmount : 0), 0);
  const activeOrdersCount = orders.filter((o) => ['Received', 'Preparing', 'Out for Delivery'].includes(o.orderStatus)).length;
  const confirmedResCount = reservations.filter((r) => r.status === 'Confirmed').length;

  const filteredOrders = orders.filter((o) => {
    const matchStatus = orderFilter === 'All' || o.orderStatus === orderFilter;
    const matchSearch =
      !orderSearch ||
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filteredReservations = reservations.filter((r) => {
    return resFilter === 'All' || r.status === resFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Executive Manager Portal</span>
          </div>
          <h1 className="font-serif-luxury text-3xl font-bold text-stone-100">
            GourmetHaven Operations Hub
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Real-time management for culinary orders, table bookings, and tasting menus.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportOrdersCSV}
            className="px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-500 text-stone-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-amber-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddDishOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-950/40 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dish</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-medium uppercase tracking-wider">
            <span>Collected Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-serif-luxury text-3xl font-bold text-amber-400">
            ₹{totalRevenue.toLocaleString()}
          </p>
          <span className="text-[11px] text-stone-400">From all processed food tickets</span>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-medium uppercase tracking-wider">
            <span>Active Orders</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-serif-luxury text-3xl font-bold text-stone-100">
            {activeOrdersCount}
          </p>
          <span className="text-[11px] text-amber-400 font-semibold">Kitchen & Delivery pipeline</span>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-medium uppercase tracking-wider">
            <span>Confirmed Tables</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-serif-luxury text-3xl font-bold text-stone-100">
            {confirmedResCount}
          </p>
          <span className="text-[11px] text-stone-400">Upcoming dining sessions</span>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-medium uppercase tracking-wider">
            <span>Menu Creations</span>
            <Utensils className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-serif-luxury text-3xl font-bold text-stone-100">
            {dishes.length}
          </p>
          <span className="text-[11px] text-stone-400">Active dishes in tasting menu</span>
        </div>
      </div>

      {/* Tabs Controller */}
      <div className="flex border-b border-stone-800 gap-6">
        {[
          { id: 'orders', label: `Orders CRM (${orders.length})` },
          { id: 'reservations', label: `Reservations (${reservations.length})` },
          { id: 'menu', label: `Menu Curation (${dishes.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-semibold tracking-wide cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'text-amber-400 border-b-2 border-amber-400 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ORDERS CRM */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search order # or customer..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['All', 'Received', 'Preparing', 'Out for Delivery', 'Delivered'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    orderFilter === st
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950/80 text-[11px] font-semibold uppercase tracking-wider text-stone-400 border-b border-stone-800">
                  <tr>
                    <th className="p-4">Order Code</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items Summary</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Current Status</th>
                    <th className="p-4 text-right">Quick Pipeline Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-stone-500">
                        No orders found matching the filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord._id} className="hover:bg-stone-850/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-amber-400">
                          {ord.orderNumber}
                          <span className="block text-[10px] text-stone-400 font-sans mt-0.5">
                            {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-stone-200">{ord.customerName}</p>
                          <p className="text-[11px] text-stone-400">{ord.customerPhone}</p>
                          <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] bg-stone-950 border border-stone-800 text-stone-400">
                            {ord.orderType}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="max-w-xs space-y-0.5">
                            {ord.items?.map((it, idx) => (
                              <p key={idx} className="truncate text-[11px] text-stone-300">
                                {it.quantity}x {it.title}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-stone-100">
                          ₹{ord.totalAmount}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              ord.orderStatus === 'Delivered'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : ord.orderStatus === 'Preparing'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : ord.orderStatus === 'Out for Delivery'
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                                : 'bg-stone-800 text-stone-300 border border-stone-700'
                            }`}
                          >
                            {ord.orderStatus}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {ord.orderStatus === 'Received' && (
                              <button
                                onClick={() => handleUpdateOrderStatus(ord._id, 'Preparing')}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-[11px] font-semibold cursor-pointer"
                              >
                                Start Prep
                              </button>
                            )}
                            {ord.orderStatus === 'Preparing' && (
                              <button
                                onClick={() => handleUpdateOrderStatus(ord._id, 'Out for Delivery')}
                                className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 text-[11px] font-semibold cursor-pointer"
                              >
                                Dispatch
                              </button>
                            )}
                            {ord.orderStatus === 'Out for Delivery' && (
                              <button
                                onClick={() => handleUpdateOrderStatus(ord._id, 'Delivered')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 text-[11px] font-semibold cursor-pointer"
                              >
                                Mark Delivered
                              </button>
                            )}
                            {ord.orderStatus === 'Delivered' && (
                              <span className="text-emerald-400 text-xs font-medium flex items-center gap-1 justify-end">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Completed</span>
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RESERVATIONS */}
      {activeTab === 'reservations' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {['All', 'Confirmed', 'Pending', 'Seated', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setResFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  resFilter === st
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950/80 text-[11px] font-semibold uppercase tracking-wider text-stone-400 border-b border-stone-800">
                  <tr>
                    <th className="p-4">Booking Code</th>
                    <th className="p-4">Primary Guest</th>
                    <th className="p-4">Date & Slot</th>
                    <th className="p-4">Party Size & Zone</th>
                    <th className="p-4">Occasion & Notes</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredReservations.map((res) => (
                    <tr key={res._id} className="hover:bg-stone-850/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-amber-400">
                        {res.reservationCode}
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-stone-200">{res.guestName}</p>
                        <p className="text-[11px] text-stone-400">{res.guestPhone}</p>
                        <p className="text-[11px] text-stone-400">{res.guestEmail}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-stone-200">{res.reservationDate}</p>
                        <p className="text-[11px] text-amber-400 font-semibold">{res.reservationTime}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-stone-200">{res.guestsCount} Guests</p>
                        <p className="text-[11px] text-stone-400">{res.seatingZone}</p>
                      </td>
                      <td className="p-4 max-w-xs">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-stone-950 border border-stone-800 text-amber-300">
                          {res.occasion}
                        </span>
                        {res.specialRequests && (
                          <p className="text-[11px] text-stone-400 italic line-clamp-1 mt-1">
                            "{res.specialRequests}"
                          </p>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {res.status !== 'Seated' && (
                          <button
                            onClick={() => handleUpdateResStatus(res._id, 'Seated')}
                            className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-semibold cursor-pointer"
                          >
                            Mark Seated
                          </button>
                        )}
                        {res.status !== 'Completed' && (
                          <button
                            onClick={() => handleUpdateResStatus(res._id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 text-[11px] font-semibold cursor-pointer"
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MENU MANAGEMENT */}
      {activeTab === 'menu' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex gap-4 items-center justify-between"
              >
                <img
                  src={dish.imageUrl}
                  alt={dish.title}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-stone-200 text-xs truncate">{dish.title}</h4>
                  <p className="text-[11px] text-amber-500 font-semibold mt-0.5">
                    ₹{dish.price} • {dish.category}
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">{dish.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleAvailability(dish._id, dish.isAvailable !== false)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                      dish.isAvailable !== false
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                        : 'bg-stone-800 text-stone-400 border border-stone-700 hover:text-stone-200'
                    }`}
                    title="Click to toggle availability"
                  >
                    {dish.isAvailable !== false ? 'In Stock' : 'Sold Out'}
                  </button>
                  <button
                    onClick={() => handleDeleteDish(dish._id, dish.title)}
                    className="p-2 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded-lg cursor-pointer transition-colors"
                    title="Remove dish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Dish Modal */}
      {isAddDishOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-serif-luxury text-lg font-bold text-stone-100">
                Add New Artisanal Dish
              </h3>
              <button
                onClick={() => setIsAddDishOpen(false)}
                className="text-stone-400 hover:text-stone-100 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDish} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-400 block mb-1">Dish Title *</label>
                <input
                  type="text"
                  value={newDish.title}
                  onChange={(e) => setNewDish({ ...newDish, title: e.target.value })}
                  placeholder="e.g. Saffron Infused Chilean Seabass"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-400 block mb-1">Category *</label>
                  <select
                    value={newDish.category}
                    onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200"
                  >
                    <option value="Starters">Starters</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Woodfired & Pasta">Woodfired & Pasta</option>
                    <option value="Chef Specials">Chef Specials</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Price (INR) *</label>
                  <input
                    type="number"
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Image URL *</label>
                <input
                  type="url"
                  value={newDish.imageUrl}
                  onChange={(e) => setNewDish({ ...newDish, imageUrl: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200"
                  required
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Culinary Description *</label>
                <textarea
                  rows={2}
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDishOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase tracking-wider cursor-pointer"
                >
                  Add to Menu
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
