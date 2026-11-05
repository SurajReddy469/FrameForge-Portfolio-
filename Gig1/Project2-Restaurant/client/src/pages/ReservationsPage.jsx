import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Sparkles, CheckCircle2, MessageSquare, Phone, MapPin, AlertCircle, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { reservationService } from '../services/api';
import { useToast } from '../context/ToastContext';

const BUSINESS_WHATSAPP = (import.meta.env.VITE_BUSINESS_WHATSAPP || '').replace(/\D/g, '');

const ReservationsPage = () => {
  const { addToast } = useToast();

  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    guestsCount: 2,
    reservationDate: today,
    reservationTime: '20:00',
    seatingZone: 'Main Dining Hall',
    occasion: 'Casual Dining',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const lunchSlots = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];
  const dinnerSlots = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  const seatingZones = [
    { id: 'Main Dining Hall', title: 'Main Dining Hall', desc: 'Acoustic luxury & warm chandelier glow' },
    { id: 'Outdoor Terrace Garden', title: 'Outdoor Terrace Garden', desc: 'Lush greenery with starlit open sky' },
    { id: 'Private Chef Table', title: 'Private Chef Table', desc: 'Degustation & front-row kitchen alchemy' },
    { id: 'Skyline Rooftop Lounge', title: 'Skyline Rooftop Lounge', desc: 'Panoramic 360° city lights horizon' }
  ];

  const occasions = [
    'Casual Dining',
    'Romantic Date',
    'Anniversary Dinner',
    'Birthday Celebration',
    'Business Meeting'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guestName || !formData.guestEmail || !formData.guestPhone) {
      addToast('Please fill all contact details', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await reservationService.createReservation(formData);
      if (res.success && res.data) {
        setConfirmedReservation({ ...res.data, isDemoMode: res.isFallback || res.isDemoMode });
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        addToast(res.isFallback || res.isDemoMode ? 'Demo reservation is temporary and may not persist.' : 'Reservation request received and awaiting confirmation.', 'success');
      } else {
        throw new Error(res.message || 'Failed to reserve table');
      }
    } catch (err) {
      addToast(err.message || 'Could not complete reservation', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = (res) => {
    if (!BUSINESS_WHATSAPP) return null;
    const text = `Hello GourmetHaven Concierge, I would like to confirm my table booking (${res.reservationCode}) for ${res.guestsCount} guests on ${res.reservationDate} at ${res.reservationTime} in the ${res.seatingZone}. Guest: ${res.guestName}.`;
    return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Priority Table Booking</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-100">
          Reserve Your Dining Experience
        </h1>
        <p className="text-sm text-stone-400">
          Secure an exquisite culinary table for intimate dinners, milestones, or corporate gatherings.
        </p>
      </div>

      {/* Confirmation State */}
      {confirmedReservation ? (
        <div className="bg-stone-900 border border-amber-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-8 animate-in fade-in duration-300">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-amber-950/50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              {confirmedReservation.status === 'Confirmed' ? 'Reservation Confirmed' : 'Reservation Request Received'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-100">
              We Look Forward to Welcoming You
            </h2>
            <p className="text-sm text-stone-400 max-w-lg mx-auto">
              {confirmedReservation.isDemoMode
                ? 'This demo reservation is temporary and may be lost when the server restarts.'
                : confirmedReservation.status === 'Confirmed'
                  ? 'Your table is confirmed. Keep the code if you contact the restaurant.'
                  : 'Your request is awaiting confirmation. Keep the code if you contact the restaurant.'}
            </p>
          </div>

          {/* Reservation Ticket Details */}
          <div className="max-w-md mx-auto bg-stone-950/70 border border-stone-800 rounded-2xl p-6 text-left space-y-3 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-stone-800">
              <span className="text-stone-400">Confirmation Code:</span>
              <span className="font-mono text-base font-bold text-amber-400">
                {confirmedReservation.reservationCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Primary Guest:</span>
              <span className="text-stone-200 font-semibold">{confirmedReservation.guestName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Party Size:</span>
              <span className="text-stone-200 font-semibold">{confirmedReservation.guestsCount} Guests</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Date & Slot:</span>
              <span className="text-stone-200 font-semibold">
                {confirmedReservation.reservationDate} at {confirmedReservation.reservationTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Seating Zone:</span>
              <span className="text-stone-200 font-semibold">{confirmedReservation.seatingZone}</span>
            </div>
            {confirmedReservation.specialRequests && (
              <div className="pt-2 border-t border-stone-800">
                <span className="text-stone-400 block text-[11px]">Special Notes:</span>
                <span className="text-stone-300 italic">"{confirmedReservation.specialRequests}"</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {BUSINESS_WHATSAPP && <a
              href={getWhatsAppLink(confirmedReservation)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-100 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm via WhatsApp Host</span>
            </a>}

            <button
              onClick={() => setConfirmedReservation(null)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs uppercase tracking-wider cursor-pointer"
            >
              Book Another Table
            </button>
          </div>
        </div>
      ) : (
        /* Reservation Form */
        <form onSubmit={handleSubmit} className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Party Size Selector */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span>1. Select Number of Guests</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setFormData({ ...formData, guestsCount: num })}
                  className={`w-12 h-12 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    formData.guestsCount === num
                      ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-950/50 scale-105'
                      : 'bg-stone-950 border border-stone-800 text-stone-300 hover:border-amber-500/40'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-amber-500" />
                <span>2. Reservation Date</span>
              </label>
              <input
                type="date"
                min={today}
                value={formData.reservationDate}
                onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                required
              />
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>3. Time Slot ({formData.reservationTime})</span>
              </label>

              {/* Dinner Shifts */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span>Dinner Service:</span>
                  <span>Lunch Service:</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {dinnerSlots.map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setFormData({ ...formData, reservationTime: time })}
                      className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        formData.reservationTime === time
                          ? 'bg-amber-500 text-stone-950 font-bold shadow'
                          : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seating Zones */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>4. Preferred Seating Ambience</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {seatingZones.map((zone) => (
                <div
                  key={zone.id}
                  onClick={() => setFormData({ ...formData, seatingZone: zone.id })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.seatingZone === zone.id
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-400'
                  }`}
                >
                  <h4 className="text-xs font-bold text-stone-100">{zone.title}</h4>
                  <p className="text-[11px] text-stone-400 mt-1">{zone.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Occasion & Special Requests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                5. Dining Occasion
              </label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {occasions.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Special Requests or Dietary Allergies
              </label>
              <input
                type="text"
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="e.g. Quiet booth, anniversary flowers, wheelchair access..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Guest Contact Information */}
          <div className="space-y-3 pt-4 border-t border-stone-800">
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
              6. Primary Guest Contact Details
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="Full Name *"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  value={formData.guestEmail}
                  onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                  placeholder="Email Address *"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  value={formData.guestPhone}
                  onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                  placeholder="Mobile Phone (+91) *"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm uppercase tracking-wider shadow-2xl shadow-amber-950/60 cursor-pointer transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? 'Confirming Reservation...' : 'Complete Table Reservation'}
            </button>
            <p className="text-center text-[11px] text-stone-500 mt-3">
              We hold tables for 15 minutes past the reservation time. Smart casual dress code recommended.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReservationsPage;
