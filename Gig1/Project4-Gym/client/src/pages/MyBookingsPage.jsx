import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, Calendar, QrCode, Clock, MapPin, User, AlertCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { bookingApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, refundCredit } = useAuth();
  const { showToast } = useToast();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('fitpulse_token') || 'demo-token';
      const res = await bookingApi.getMyBookings(token);
      const list = Array.isArray(res?.data) ? res.data : (res?.bookings || []);
      setBookings(list);
    } catch (err) {
      showToast('Error loading active passes.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchMyBookings();
  }, [isAuthenticated]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this class reservation? Your credit will be returned.')) {
      return;
    }

    setCancellingId(bookingId);
    try {
      const token = localStorage.getItem('fitpulse_token') || 'demo-token';
      await bookingApi.cancelBooking(bookingId, token);
      showToast('Reservation cancelled and 1 credit refunded to your account.', 'info');
      refundCredit();
      // Update local state
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'Cancelled' } : b));
    } catch (err) {
      showToast(err.message || 'Failed to cancel reservation', 'error');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
            <Ticket className="w-4 h-4" /> Member Digital Wallet
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight mt-1 uppercase">
            My Studio Passes
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Present your digital pass QR code at the reception scanner or check in directly with your coach.
          </p>
        </div>

        <Link
          to="/schedule"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all self-start sm:self-auto"
        >
          <Calendar className="w-3.5 h-3.5" /> Book Another Class
        </Link>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">Loading member passes...</div>
      ) : bookings.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-white">No active class reservations</h3>
            <p className="text-xs text-slate-400 mt-1">Browse the weekly timetable and lock in your first studio workout.</p>
          </div>
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-500 transition-all"
          >
            Explore Classes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id || booking.bookingCode}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                booking.status === 'Confirmed'
                  ? 'bg-slate-900/90 border-slate-800 hover:border-red-500/50 shadow-xl'
                  : booking.status === 'Attended'
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-slate-950 border-slate-900 opacity-60'
              }`}
            >
              <div>
                {/* Header pass code & status */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Access Pass</span>
                    <p className="font-mono text-base font-black text-red-400">{booking.bookingCode}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase border ${
                    booking.status === 'Confirmed'
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : booking.status === 'Attended'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                {/* Class details */}
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-bold text-white">{booking.className}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <User className="w-3.5 h-3.5 text-red-400" />
                    <span>Coach: <strong>{booking.instructorName}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    <span>{booking.scheduleDay} at <strong>{booking.scheduleTime}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{booking.room || 'Studio A (Performance Turf)'}</span>
                  </div>
                </div>
              </div>

              {/* QR and actions footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <QrCode className="w-5 h-5 text-slate-300" />
                  <span className="font-mono text-[10px] truncate max-w-[120px]">{booking.qrHash || 'FIT-PASS-VALID'}</span>
                </div>

                {booking.status === 'Confirmed' && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    disabled={cancellingId === booking._id}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/40 text-xs font-semibold transition-all disabled:opacity-50"
                  >
                    {cancellingId === booking._id ? 'Cancelling...' : 'Cancel Reservation'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
