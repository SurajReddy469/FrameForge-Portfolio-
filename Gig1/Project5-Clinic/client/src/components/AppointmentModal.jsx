import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { doctorApi, appointmentApi } from '../services/api';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle2,
  FileText,
  ChevronRight,
  ChevronLeft,
  HeartPulse,
} from 'lucide-react';

export default function AppointmentModal({ doctor, onClose, onAppointmentSuccess }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const defaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(defaultDate());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  // Intake State
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    patientEmail: user?.email || '',
    patientPhone: user?.phone || '',
    patientAge: '32',
    patientGender: 'Male',
    symptoms: '',
    medicalHistory: '',
  });

  // Fetch slot availability when doctor or date changes
  useEffect(() => {
    if (!doctor?._id || !selectedDate) return;

    const fetchAvailability = async () => {
      setLoadingAvailability(true);
      try {
        const res = await doctorApi.getAvailability(doctor._id, selectedDate);
        setAvailableSlots(res.availableSlots || []);
        setBookedSlots(res.bookedSlots || []);
        if (res.availableSlots?.length > 0 && !res.availableSlots.includes(selectedSlot)) {
          setSelectedSlot(res.availableSlots[0]);
        } else if (res.availableSlots?.length === 0) {
          setSelectedSlot('');
        }
      } catch (err) {
        // Fallback to doctor's default slots
        setAvailableSlots(doctor.availableSlots || []);
        setBookedSlots([]);
      } finally {
        setLoadingAvailability(false);
      }
    };

    fetchAvailability();
  }, [doctor?._id, selectedDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToStep2 = () => {
    if (!selectedDate) {
      addToast('Please pick an appointment date.', 'error');
      return;
    }
    if (!selectedSlot) {
      addToast('Please choose an available consultation time slot.', 'error');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.patientName || !formData.patientEmail || !formData.patientPhone) {
      addToast('Please fill in patient contact information.', 'error');
      return;
    }
    if (!formData.symptoms || formData.symptoms.trim().length < 3) {
      addToast('Please describe primary symptoms or reason for visit.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        doctorId: doctor._id,
        date: selectedDate,
        timeSlot: selectedSlot,
        ...formData,
        patientAge: Number(formData.patientAge),
      };

      const result = await appointmentApi.book(payload);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#14b8a6', '#06b6d4', '#10b981'],
        });
      } catch (e) {
        // Ignore in environments where confetti canvas is unavailable
      }

      addToast('Appointment scheduled successfully!', 'success');
      onAppointmentSuccess(result);
    } catch (err) {
      addToast(err.message || 'Failed to book appointment', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative">
        {/* Modal Header */}
        <div className="bg-slate-800/80 p-5 px-6 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Book Appointment</h3>
              <p className="text-xs text-teal-400 font-medium">
                {doctor.name} • {doctor.department}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-900/90 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                step === 1 ? 'bg-teal-500 text-slate-950' : 'bg-teal-500/20 text-teal-300'
              }`}
            >
              1
            </span>
            <span className={step === 1 ? 'font-bold text-white' : 'text-slate-400'}>
              Date & Slot
            </span>
          </div>

          <div className="w-8 h-[1px] bg-slate-700"></div>

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                step === 2 ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              2
            </span>
            <span className={step === 2 ? 'font-bold text-white' : 'text-slate-400'}>
              Patient Intake
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              {/* Doctor Quick Snapshot */}
              <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Consultation Fee</div>
                  <div className="text-xl font-black text-white">${doctor.consultationFee}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Working Hours</div>
                  <div className="text-xs font-semibold text-teal-300">
                    {doctor.workingHours?.start} – {doctor.workingHours?.end}
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-2">
                  1. Select Appointment Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                    2. Available Time Slots
                  </label>
                  {loadingAvailability && (
                    <span className="text-xs text-teal-400 animate-pulse">Checking availability...</span>
                  )}
                </div>

                {availableSlots.length === 0 && !loadingAvailability ? (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-xs text-amber-300">
                    No open slots remaining for {selectedDate}. Please select another date.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2.5">
                    {doctor.availableSlots?.map((slot) => {
                      const isTaken = bookedSlots.includes(slot);
                      const isSelected = selectedSlot === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isTaken}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                            isTaken
                              ? 'bg-slate-800/40 text-slate-600 border border-slate-800 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  disabled={!selectedSlot}
                  onClick={handleProceedToStep2}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <span>Continue to Intake</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Slot Recap */}
              <div className="bg-teal-950/40 border border-teal-800/50 p-3 rounded-xl flex items-center justify-between text-xs text-teal-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>
                    {selectedDate} at {selectedSlot}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-teal-400 underline hover:text-white"
                >
                  Change Slot
                </button>
              </div>

              {/* Patient Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  name="patientName"
                  required
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="e.g. Johnathan Davis"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition"
                />
              </div>

              {/* Contact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="patientEmail"
                    required
                    value={formData.patientEmail}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="patientPhone"
                    required
                    value={formData.patientPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Patient Age *
                  </label>
                  <input
                    type="number"
                    name="patientAge"
                    min="0"
                    max="125"
                    required
                    value={formData.patientAge}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gender *</label>
                  <select
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Chief Complaint */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Symptoms / Reason for Consultation *
                </label>
                <textarea
                  name="symptoms"
                  rows="3"
                  required
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="Describe your symptoms, pain duration, or reason for this doctor appointment..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-500 transition"
                ></textarea>
              </div>

              {/* Prior Medical History */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Known Allergies or Prior Medical History (Optional)
                </label>
                <input
                  type="text"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  placeholder="e.g. Penicillin allergy, mild asthma"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-300 focus:outline-none focus:border-teal-500 transition"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-teal-500/20 disabled:opacity-50 transition"
                >
                  {submitting ? 'Confirming Lock...' : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
