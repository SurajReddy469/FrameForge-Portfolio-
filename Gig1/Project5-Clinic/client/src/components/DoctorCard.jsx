import React from 'react';
import { Star, Clock, Calendar, Stethoscope, User, ShieldCheck } from 'lucide-react';

export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="bg-slate-800/80 border border-slate-700/80 hover:border-teal-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/30 flex flex-col justify-between group">
      <div>
        {/* Header: Neutral Silhouette Avatar & Rating */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-tr from-teal-500/20 to-cyan-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 shadow-inner group-hover:border-teal-400 transition shrink-0">
              {doctor.avatar ? (
                <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20 mb-1">
                {doctor.department}
              </span>
              <h3 className="font-bold text-lg text-white group-hover:text-teal-300 transition">
                {doctor.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-300">{doctor.rating || 4.9}</span>
          </div>
        </div>

        {/* Specialization & Qualifications */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-teal-400 mb-1">{doctor.specialization}</p>
          <p className="text-xs text-slate-400 leading-snug">{doctor.qualifications}</p>
        </div>

        {/* Bio quote */}
        <p className="text-xs text-slate-300/80 leading-relaxed italic line-clamp-2 mb-4 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
          "{doctor.bio}"
        </p>

        {/* Quick Meta Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mb-5">
          <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-lg">
            <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
            <span>{doctor.experienceYears} Years Exp</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>{doctor.availableSlots?.length || 5} Daily Slots</span>
          </div>
        </div>
      </div>

      {/* Footer: Fee & Action */}
      <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Consultation</span>
          <span className="text-xl font-extrabold text-white">
            ${doctor.consultationFee}
          </span>
        </div>

        <button
          onClick={() => onBook(doctor)}
          className="px-4 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-teal-500/20 hover:shadow-teal-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Book Slot
        </button>
      </div>
    </div>
  );
}
