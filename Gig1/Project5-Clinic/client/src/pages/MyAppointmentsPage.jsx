import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { appointmentApi } from '../services/api';
import AppointmentSlipModal from '../components/AppointmentSlipModal';
import {
  Calendar,
  Clock,
  User,
  HeartPulse,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
} from 'lucide-react';

export default function MyAppointmentsPage() {
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [lookupCode, setLookupCode] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchMy = async () => {
      try {
        const data = await appointmentApi.getMy();
        setAppointments(data);
      } catch (err) {
        console.error('Failed to load appointments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMy();
  }, [isAuthenticated]);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this scheduled appointment?')) return;
    try {
      await appointmentApi.cancel(id, 'Cancelled by patient');
      addToast('Appointment cancelled successfully.', 'info');
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: 'Cancelled' } : a))
      );
    } catch (err) {
      addToast(err.message || 'Failed to cancel appointment', 'error');
    }
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;

    setLookupLoading(true);
    try {
      const appt = await appointmentApi.getByCode(lookupCode.trim());
      setSelectedSlip(appt);
      setLookupCode('');
    } catch (err) {
      addToast(err.message || 'Appointment code not found', 'error');
    } finally {
      setLookupLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirmed</span>
          </span>
        );
      case 'Checked-In':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Checked In</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-700 text-slate-300">
            <span>Completed</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
            Patient Health Records
          </span>
          <h1 className="text-3xl font-extrabold text-white">My Appointments</h1>
        </div>

        {/* Code Lookup Bar */}
        <form onSubmit={handleLookup} className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={lookupCode}
            onChange={(e) => setLookupCode(e.target.value)}
            placeholder="Code (e.g. CARE-APPT-...)"
            className="bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 uppercase font-mono"
          />
          <button
            type="submit"
            disabled={lookupLoading}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 transition"
          >
            {lookupLoading ? 'Finding...' : 'Track'}
          </button>
        </form>
      </div>

      {!isAuthenticated ? (
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-10 text-center">
          <User className="w-12 h-12 mx-auto text-slate-500 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Sign In to View Your Schedule</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Log in to view upcoming appointments, access your medical intake history, and print verification slips.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-2.5 rounded-xl font-bold text-xs bg-teal-500 text-slate-950 hover:bg-teal-400 transition"
          >
            Go to Sign In
          </Link>
        </div>
      ) : loading ? (
        <div className="text-center py-20 text-slate-400 text-sm">Loading your appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-10 text-center">
          <Calendar className="w-12 h-12 mx-auto text-slate-500 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">No Scheduled Appointments</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            You currently have no active or past doctor consultations scheduled with MediCare Plus.
          </p>
          <Link
            to="/book"
            className="inline-block px-6 py-2.5 rounded-xl font-bold text-xs bg-teal-500 text-slate-950 hover:bg-teal-400 transition"
          >
            Schedule Consultation Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 sm:p-6 transition hover:border-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-teal-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                    {appt.appointmentCode}
                  </span>
                  {getStatusBadge(appt.status)}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{appt.doctorName}</h3>
                  <p className="text-xs text-slate-400">
                    {appt.department} • Consultation Fee: ${appt.consultationFee}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    {appt.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    {appt.timeSlot}
                  </span>
                </div>

                <p className="text-xs text-slate-400 italic line-clamp-1">
                  Reason: "{appt.symptoms}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 self-end sm:self-center">
                <button
                  onClick={() => setSelectedSlip(appt)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-850 hover:bg-slate-700 text-teal-300 border border-slate-700 transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Slip</span>
                </button>

                {appt.status === 'Confirmed' && (
                  <button
                    onClick={() => handleCancel(appt._id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

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
