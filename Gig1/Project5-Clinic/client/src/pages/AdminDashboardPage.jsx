import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { appointmentApi } from '../services/api';
import AppointmentSlipModal from '../components/AppointmentSlipModal';
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Clock3,
  User,
  RefreshCw,
  FileText,
  Building2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isAdmin, isDoctor } = useAuth();
  const { addToast } = useToast();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [exporting, setExporting] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await appointmentApi.getAll({
        status: statusFilter,
        search,
        date: dateFilter,
      });
      setAppointments(data);
    } catch (err) {
      addToast(err.message || 'Failed to fetch appointments', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, dateFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAppointments();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await appointmentApi.updateStatus(id, newStatus);
      addToast(`Status updated to ${newStatus}`, 'success');
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      await appointmentApi.downloadCSV();
      addToast('Appointments exported to RFC 4180 CSV.', 'success');
    } catch (err) {
      addToast(err.message || 'CSV export failed', 'error');
    } finally {
      setExporting(false);
    }
  };

  // KPIs
  const totalCount = appointments.length;
  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;
  const checkedInCount = appointments.filter((a) => a.status === 'Checked-In').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;
  const cancelledCount = appointments.filter((a) => a.status === 'Cancelled').length;

  if (!isAdmin && !isDoctor) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4 min-h-[60vh] flex flex-col justify-center items-center">
        <ShieldAlert className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-white mb-2">Restricted Reception Area</h2>
        <p className="text-sm text-slate-400 mb-6">
          This portal is strictly authorized for clinic reception desk staff and attending physicians.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[85vh]">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Live Clinical Desk System
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Reception & Appointment Roster</h1>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as {user.name} ({user.role})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAppointments}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Refresh Roster"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {isAdmin && (
            <button
              onClick={handleExportCSV}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md transition disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{exporting ? 'Exporting...' : 'Export RFC 4180 CSV'}</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        <div className="bg-slate-800/60 border border-slate-700/80 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 mb-1">Total Entries</div>
          <div className="text-2xl font-black text-white">{totalCount}</div>
        </div>
        <div className="bg-slate-800/60 border border-teal-500/30 p-4 rounded-2xl">
          <div className="text-xs text-teal-400 mb-1">Confirmed</div>
          <div className="text-2xl font-black text-teal-300">{confirmedCount}</div>
        </div>
        <div className="bg-slate-800/60 border border-cyan-500/30 p-4 rounded-2xl">
          <div className="text-xs text-cyan-400 mb-1">Checked In</div>
          <div className="text-2xl font-black text-cyan-300">{checkedInCount}</div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/80 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 mb-1">Completed</div>
          <div className="text-2xl font-black text-slate-200">{completedCount}</div>
        </div>
        <div className="bg-slate-800/60 border border-rose-500/30 p-4 rounded-2xl col-span-2 sm:col-span-1">
          <div className="text-xs text-rose-400 mb-1">Cancelled</div>
          <div className="text-2xl font-black text-rose-400">{cancelledCount}</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-6 flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search code (CARE-APPT-...), patient name, doctor, or phone..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
          />
        </form>

        {/* Date Filter */}
        <div className="w-full md:w-auto">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Status Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed Only</option>
            <option value="Checked-In">Checked In Only</option>
            <option value="Completed">Completed Only</option>
            <option value="Cancelled">Cancelled Only</option>
          </select>
        </div>
      </div>

      {/* Table / List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-xs">Loading roster...</div>
        ) : appointments.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No appointment records found matching filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Date & Slot</th>
                  <th className="py-3 px-4">Patient Information</th>
                  <th className="py-3 px-4">Doctor & Dept</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {appointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-400 whitespace-nowrap">
                      {appt.appointmentCode}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-white">{appt.date}</div>
                      <div className="text-[11px] text-teal-300">{appt.timeSlot}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{appt.patientName}</div>
                      <div className="text-[11px] text-slate-400">{appt.patientPhone}</div>
                      <div className="text-[10px] text-slate-500">
                        {appt.patientAge} yrs • {appt.patientGender}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-white">{appt.doctorName}</div>
                      <div className="text-[11px] text-slate-400">{appt.department}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          appt.status === 'Confirmed'
                            ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                            : appt.status === 'Checked-In'
                            ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                            : appt.status === 'Completed'
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Quick Check-in button */}
                        {appt.status === 'Confirmed' && (
                          <button
                            onClick={() => handleStatusChange(appt._id, 'Checked-In')}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition"
                            title="Check-in Patient"
                          >
                            Check In
                          </button>
                        )}

                        {appt.status === 'Checked-In' && (
                          <button
                            onClick={() => handleStatusChange(appt._id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-700 hover:bg-slate-600 text-white transition"
                          >
                            Mark Done
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedSlip(appt)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                          title="Print Digital Slip"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slip Modal */}
      {selectedSlip && (
        <AppointmentSlipModal
          appointment={selectedSlip}
          onClose={() => setSelectedSlip(null)}
        />
      )}
    </div>
  );
}
