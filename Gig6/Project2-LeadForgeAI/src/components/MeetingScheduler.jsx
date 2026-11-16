import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Video, Globe, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

export default function MeetingScheduler({
  profile,
  leadInfo,
  onBookingConfirmed
}) {
  const [selectedDate, setSelectedDate] = useState('Tomorrow (Thu, Nov 13)');
  const [selectedTime, setSelectedTime] = useState('2:30 PM EST');
  const [name, setName] = useState(leadInfo?.name || '');
  const [email, setEmail] = useState(leadInfo?.email || '');
  const [company, setCompany] = useState(leadInfo?.company || '');
  const [isBooked, setIsBooked] = useState(false);
  const [bookedDetails, setBookedDetails] = useState(null);

  const availableDates = [
    { label: 'Today (Wed, Nov 12)', slotsCount: '2 slots left' },
    { label: 'Tomorrow (Thu, Nov 13)', slotsCount: '5 slots available' },
    { label: 'Friday (Nov 14)', slotsCount: '4 slots available' },
    { label: 'Monday (Nov 17)', slotsCount: '6 slots available' }
  ];

  const availableSlots = [
    '10:00 AM EST',
    '11:30 AM EST',
    '2:00 PM EST',
    '2:30 PM EST',
    '4:00 PM EST',
    '5:15 PM EST'
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    sounds.playFanfare();

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 }
      });
    } catch {}

    const meetingId = `MTG-${Math.floor(1000 + Math.random() * 9000)}`;
    const details = {
      id: meetingId,
      name,
      email,
      company: company || 'Self-Employed / Growth Co',
      slot: `${selectedDate} @ ${selectedTime}`,
      host: profile.avatarName
    };

    setBookedDetails(details);
    setIsBooked(true);

    if (onBookingConfirmed) {
      onBookingConfirmed(details);
    }
  };

  if (isBooked) {
    return (
      <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Confirmed • Google Meet Link Dispatched
          </span>
          <h4 className="text-lg font-bold text-white mt-1.5 font-syne">Strategy Session Confirmed!</h4>
          <p className="text-xs text-slate-300 mt-1">
            Meeting ID: <span className="font-mono text-emerald-300 font-bold">#{bookedDetails.id}</span>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">Date & Time:</span>
            <strong className="text-white font-mono">{bookedDetails.slot}</strong>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">Host:</span>
            <strong className="text-indigo-400">{bookedDetails.host}</strong>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">Invitee:</span>
            <strong className="text-white">{bookedDetails.email}</strong>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">Location:</span>
            <span className="text-cyan-400 flex items-center gap-1 font-semibold">
              <Video className="w-3.5 h-3.5" />
              Google Meet (Auto-generated)
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-2 text-[11px] text-slate-400">
          <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-1">
            📅 Google Calendar Synced
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-1">
            📬 Outlook .ics Sent
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>High-Priority Lead Qualified</span>
          </div>
          <h4 className="font-bold text-sm text-white font-syne">
            Book 30-Min Architecture Discovery Call
          </h4>
          <p className="text-[11px] text-slate-400">With {profile.avatarName} ({profile.avatarTitle})</p>
        </div>
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <CalendarIcon className="w-5 h-5" />
        </div>
      </div>

      <form onSubmit={handleBooking} className="space-y-4">
        {/* Step 1: Select Date */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Select Date (Next Available):
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {availableDates.map((d, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setSelectedDate(d.label)}
                className={`p-2 rounded-xl text-left text-xs border transition-all ${
                  selectedDate === d.label
                    ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="font-medium truncate">{d.label}</div>
                <div className="text-[10px] text-emerald-400 opacity-90">{d.slotsCount}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Time Slot */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Select Time Slot ({selectedDate}):
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {availableSlots.map((slot, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setSelectedTime(slot)}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono border text-center transition-all ${
                  selectedTime === slot
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Contact Details */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-medium text-slate-400 mb-0.5">Your Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-slate-400 mb-0.5">Work Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-medium text-slate-400 mb-0.5">Company / Project Domain</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. acme-corp.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <span>Confirm Strategy Session & Calendar Invite</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          Zero sales pressure • 30-min architectural scope & feasibility review
        </p>
      </form>
    </div>
  );
}
