import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Download,
  Search,
  Filter,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  DollarSign,
  QrCode,
  RefreshCw,
  Ticket
} from 'lucide-react';
import { bookingApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const STATUS_FILTERS = ['All', 'Confirmed', 'Attended', 'Cancelled'];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user, isAdmin, isTrainer, isAuthenticated, loading: authLoading } = useAuth();
  const { showToast } = useToast();

  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [checkingInId, setCheckingInId] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('fitpulse_token') || 'demo-token';
      const [bksRes, statsRes] = await Promise.all([
        bookingApi.getAllBookings(token),
        bookingApi.getStats(token)
      ]);
      const list = Array.isArray(bksRes?.data) ? bksRes.data : (bksRes?.bookings || []);
      setBookings(list);
      setStats(statsRes?.data || statsRes || null);
    } catch (err) {
      showToast('Error loading studio operations data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || (!isAdmin && !isTrainer)) {
        showToast('Administrative / Coach authorization required.', 'warning');
        navigate('/login');
        return;
      }
      fetchDashboardData();
    }
  }, [isAuthenticated, isAdmin, isTrainer, authLoading]);

  const handleCheckIn = async (bookingId) => {
    setCheckingInId(bookingId);
    try {
      const token = localStorage.getItem('fitpulse_token') || 'demo-token';
      await bookingApi.checkInBooking(bookingId, token);
      showToast('Member attendance confirmed! Pass marked as Attended.', 'success');
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'Attended' } : b));
    } catch (err) {
      showToast('Failed to check in member.', 'error');
    } finally {
      setCheckingInId(null);
    }
  };

  const handleExportCSV = async () => {
    try {
      const token = localStorage.getItem('fitpulse_token') || 'demo-token';
      const res = await bookingApi.exportCSV(token);
      const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `fitpulse_attendance_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Attendance report exported as RFC 4180 CSV.', 'success');
    } catch (err) {
      showToast('Failed to download CSV export.', 'error');
    }
  };

  // Filtered list
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search.trim() ||
      b.bookingCode?.toLowerCase().includes(q) ||
      b.userName?.toLowerCase().includes(q) ||
      b.userEmail?.toLowerCase().includes(q) ||
      b.className?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase">
              Operations Desk
            </span>
            <span className="text-xs text-slate-400">• Studio Manager & Coach Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 uppercase">
            Studio Attendance & Capacity CRM
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Refresh Timetable"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export RFC 4180 CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Class Capacity Utilization</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white mt-2">
            {stats?.utilizationRate ?? 78}%
          </p>
          <span className="text-[11px] text-emerald-400 font-semibold block mt-1">High studio velocity</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Active Member Base</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white mt-2">
            {stats?.activeMembersCount ?? 248}
          </p>
          <span className="text-[11px] text-slate-400 font-medium block mt-1">Pro & Elite athletes</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Confirmed Reservations</span>
            <Ticket className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-red-400 mt-2">
            {stats?.confirmedCount ?? bookings.filter(b => b.status === 'Confirmed').length}
          </p>
          <span className="text-[11px] text-slate-400 font-medium block mt-1">Locked studio passes</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Est. Monthly Recurring</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
            ${(stats?.monthlyRevenueUSD ?? 19840).toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400 font-medium block mt-1">Tiered memberships</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search code, member, email, class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Access Pass Code</th>
                <th className="px-5 py-3.5">Member Athlete</th>
                <th className="px-5 py-3.5">Class Session & Coach</th>
                <th className="px-5 py-3.5">Schedule</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Attendance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                    No reservations match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b._id || b.bookingCode} className="hover:bg-slate-800/30 transition-colors">
                    {/* Pass Code */}
                    <td className="px-5 py-4 font-mono font-bold text-red-400">
                      {b.bookingCode}
                    </td>

                    {/* Member */}
                    <td className="px-5 py-4">
                      <p className="font-bold text-white">{b.userName || 'Member'}</p>
                      <p className="text-[11px] text-slate-400">{b.userEmail}</p>
                    </td>

                    {/* Class */}
                    <td className="px-5 py-4">
                      <p className="font-bold text-white">{b.className}</p>
                      <p className="text-[11px] text-slate-400">Coach: {b.instructorName}</p>
                    </td>

                    {/* Schedule */}
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{b.scheduleDay}</p>
                      <span className="text-[11px] text-slate-400">{b.scheduleTime} • {b.room || 'Studio A'}</span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        b.status === 'Confirmed'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : b.status === 'Attended'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      }`}>
                        {b.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">
                      {b.status === 'Confirmed' ? (
                        <button
                          onClick={() => handleCheckIn(b._id)}
                          disabled={checkingInId === b._id}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-50"
                        >
                          {checkingInId === b._id ? 'Checking In...' : 'Verify Check-In'}
                        </button>
                      ) : b.status === 'Attended' ? (
                        <span className="text-emerald-400 text-xs font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Checked In
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs">Cancelled</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
