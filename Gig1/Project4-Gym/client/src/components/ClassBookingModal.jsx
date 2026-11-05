import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, Flame, Clock, MapPin, User, QrCode, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { bookingApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function ClassBookingModal({ fitnessClass, isOpen, onClose, onBookingSuccess }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, deductCredit } = useAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen || !fitnessClass) return null;

  const handleConfirmBooking = async () => {
    if (!isAuthenticated) {
      showToast('Please sign in to reserve your class spot.', 'warning');
      navigate('/login');
      return;
    }

    if (user.membershipTier === 'Basic') {
      showToast('Basic Floor memberships do not include studio classes. Please upgrade to Pro or Elite.', 'error');
      return;
    }

    if (user.membershipTier !== 'Elite' && (user.classCredits ?? 10) <= 0) {
      showToast('You have 0 class credits remaining this cycle.', 'error');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('fitpulse_token') || 'demo-token';
      const res = await bookingApi.bookClass(fitnessClass._id || fitnessClass.id, token);

      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });

      deductCredit();
      setConfirmedBooking(res.data || res.booking);
      showToast(res.message || 'Studio spot reserved successfully!', 'success');

      if (onBookingSuccess) {
        onBookingSuccess(fitnessClass);
      }
    } catch (err) {
      showToast(err.message || 'Failed to complete reservation.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/70 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        {!confirmedBooking ? (
          /* Pre-Booking State */
          <div>
            {/* Header Media */}
            <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
              <img
                src={fitnessClass.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'}
                alt={fitnessClass.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md">
                  {fitnessClass.category}
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  {fitnessClass.title}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-6">
              {/* Session Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Time</span>
                  <p className="text-xs font-bold text-white mt-0.5">{fitnessClass.scheduleTime}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Intensity</span>
                  <p className="text-xs font-bold text-red-400 mt-0.5">{fitnessClass.intensity}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Est. Burn</span>
                  <p className="text-xs font-bold text-amber-400 mt-0.5">{fitnessClass.caloriesBurnedEst} kcal</p>
                </div>
              </div>

              {/* Coach & Location */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Head Coach:</span>
                  <strong className="text-white flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-400" /> {fitnessClass.instructorName}
                  </strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Scheduled Day:</span>
                  <strong className="text-white">{fitnessClass.scheduleDay}</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Location:</span>
                  <strong className="text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {fitnessClass.room}
                  </strong>
                </div>
              </div>

              {/* Member Credit Notice */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Pass Deduction:</span>
                  <span className="font-bold text-emerald-400">1 Studio Credit</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Your Current Balance:</span>
                  <span className="font-mono font-bold text-white">
                    {user ? (user.membershipTier === 'Elite' ? 'Unlimited VIP' : `${user.classCredits ?? 10} Credits`) : 'Sign in to check'}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleConfirmBooking}
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Locking Slot...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm Studio Reservation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Confirmed Access Pass */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Studio Slot Locked
              </span>
              <h3 className="text-2xl font-black text-white mt-2">
                Reservation Confirmed!
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Your entry pass is registered for <strong>{confirmedBooking.className}</strong>.
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Access Pass Code</span>
                  <p className="font-mono text-base font-black text-red-400">
                    {confirmedBooking.bookingCode}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                  <QrCode className="w-7 h-7" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Session Time</span>
                  <span className="text-white font-bold">{confirmedBooking.scheduleDay} • {confirmedBooking.scheduleTime}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Room</span>
                  <span className="text-white font-bold">{confirmedBooking.room || 'Studio A'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/my-bookings');
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                View in My Passes
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
