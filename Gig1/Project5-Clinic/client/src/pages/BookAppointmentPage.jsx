import React, { useState, useEffect } from 'react';
import { doctorApi, departmentApi, INITIAL_DOCTORS } from '../services/api';
import AppointmentModal from '../components/AppointmentModal';
import AppointmentSlipModal from '../components/AppointmentSlipModal';
import { Calendar, User, ShieldCheck, HeartPulse, Clock, Sparkles } from 'lucide-react';

export default function BookAppointmentPage() {
  const [doctors, setDoctors] = useState(() => {
    try {
      const stored = localStorage.getItem('medicare_doctors');
      return stored ? JSON.parse(stored) : INITIAL_DOCTORS;
    } catch {
      return INITIAL_DOCTORS;
    }
  });
  const [selectedDoctor, setSelectedDoctor] = useState(() => {
    try {
      const stored = localStorage.getItem('medicare_doctors');
      const list = stored ? JSON.parse(stored) : INITIAL_DOCTORS;
      return list[0] || INITIAL_DOCTORS[0];
    } catch {
      return INITIAL_DOCTORS[0];
    }
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctorApi.getAll();
        if (Array.isArray(data) && data.length > 0) {
          setDoctors(data);
          setSelectedDoctor(prev => prev ? (data.find(d => d._id === prev._id) || data[0]) : data[0]);
        }
      } catch (e) {
        console.warn('Using local fallback clinic doctors', e);
        setDoctors(INITIAL_DOCTORS);
        setSelectedDoctor(prev => prev || INITIAL_DOCTORS[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
          Clinical Scheduling Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Book Your Consultation</h1>
        <p className="text-sm text-slate-400 mt-2">
          Pick your physician, select your preferred date & time slot, and confirm in under 2 minutes.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 text-sm">Loading doctors...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Doctor Selector Left Column */}
          <div className="md:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
              Select Physician
            </h3>
            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {doctors.map((doc) => {
                const isSelected = selectedDoctor?._id === doc._id;
                return (
                  <button
                    key={doc._id}
                    onClick={() => setSelectedDoctor(doc)}
                    className={`w-full text-left p-3 rounded-xl transition flex items-center gap-3 ${
                      isSelected
                        ? 'bg-teal-500/15 border border-teal-500/40 text-white'
                        : 'bg-slate-800/40 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shrink-0 ${
                        isSelected ? 'border border-teal-400' : 'border border-slate-700'
                      }`}
                    >
                      {doc.avatar ? (
                        <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-xs truncate">{doc.name}</div>
                      <div className="text-[11px] text-teal-400 truncate">{doc.department}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doctor Detail & Booking Trigger */}
          {selectedDoctor && (
            <div className="md:col-span-2 bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center shadow-inner shrink-0">
                    {selectedDoctor.avatar ? (
                      <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-9 h-9" />
                    )}
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20 mb-1">
                      {selectedDoctor.department}
                    </span>
                    <h2 className="text-xl font-bold text-white">{selectedDoctor.name}</h2>
                    <p className="text-xs text-slate-400">{selectedDoctor.specialization}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Consultation Fee</div>
                  <div className="text-2xl font-black text-white">
                    ${selectedDoctor.consultationFee}
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="space-y-4 text-xs text-slate-300">
                <div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-1">
                    Qualifications & Experience
                  </h4>
                  <p className="text-slate-400">
                    {selectedDoctor.qualifications} • {selectedDoctor.experienceYears} Years Clinical Practice
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-1">
                    Physician Overview
                  </h4>
                  <p className="text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
                    "{selectedDoctor.bio}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">Working Days</span>
                    <span className="font-semibold text-slate-200">
                      {selectedDoctor.workingDays?.join(', ')}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">Working Hours</span>
                    <span className="font-semibold text-teal-300">
                      {selectedDoctor.workingHours?.start} – {selectedDoctor.workingHours?.end}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-teal-500/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Choose Date & Pick Time Slot</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Booking Modal */}
      {modalOpen && selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setModalOpen(false)}
          onAppointmentSuccess={(appointment) => {
            setModalOpen(false);
            setConfirmedAppointment(appointment);
          }}
        />
      )}

      {/* Slip Modal */}
      {confirmedAppointment && (
        <AppointmentSlipModal
          appointment={confirmedAppointment}
          onClose={() => setConfirmedAppointment(null)}
        />
      )}
    </div>
  );
}
