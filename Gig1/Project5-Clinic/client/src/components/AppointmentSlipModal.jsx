import React from 'react';
import {
  X,
  Printer,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  HeartPulse,
  Phone,
  Mail,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

export default function AppointmentSlipModal({ appointment, onClose }) {
  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-teal-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>

          <h3 className="font-extrabold text-xl tracking-tight">Appointment Confirmed</h3>
          <p className="text-teal-100 text-xs mt-1">CarePoint Clinical Center • Verification Slip</p>
          <div className="mt-2 text-[10px] font-semibold tracking-wider uppercase text-teal-200 bg-teal-950/60 border border-teal-400/30 px-3 py-1 rounded-full inline-block">
            Illustrative Clinical Demo Slip
          </div>

          <div className="mt-4 inline-block bg-slate-950/40 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full font-mono text-sm tracking-wider font-bold">
            {appointment.appointmentCode}
          </div>
        </div>

        {/* Clinical Slip Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Doctor & Dept Card */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 block mb-0.5">
                Physician & Department
              </span>
              <div className="font-bold text-white text-base">{appointment.doctorName}</div>
              <div className="text-xs text-slate-300">{appointment.department}</div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                Consultation Fee
              </span>
              <div className="text-lg font-black text-teal-300">
                ${appointment.consultationFee}
              </div>
            </div>
          </div>

          {/* Schedule Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Date</span>
                <span className="font-semibold text-white">{appointment.date}</span>
              </div>
            </div>

            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Time Slot</span>
                <span className="font-semibold text-white">{appointment.timeSlot}</span>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Patient Name:</span>
              <span className="font-bold text-white">{appointment.patientName}</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Contact Phone:</span>
              <span className="font-medium text-slate-200">{appointment.patientPhone}</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Email:</span>
              <span className="font-medium text-slate-200">{appointment.patientEmail}</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Age / Gender:</span>
              <span className="font-medium text-slate-200">
                {appointment.patientAge} yrs • {appointment.patientGender}
              </span>
            </div>
            <div className="text-xs pt-1">
              <span className="text-slate-400 block mb-0.5">Reported Symptoms:</span>
              <span className="text-slate-300 italic">{appointment.symptoms}</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/40 p-3 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Please present this digital pass or code at the clinic reception desk upon arrival.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <Printer className="w-4 h-4 text-teal-400" />
              <span>Print Slip</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
