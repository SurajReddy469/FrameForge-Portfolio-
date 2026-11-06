import React, { useState, useEffect } from 'react';
import { User, Award, Star, Clock, CheckCircle2, ShieldCheck, Mail, Calendar } from 'lucide-react';
import { trainerApi, INITIAL_TRAINERS } from '../services/api';

export default function TrainersPage() {
  const [trainers, setTrainers] = useState(INITIAL_TRAINERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await trainerApi.getTrainers();
        const list = Array.isArray(res?.data) ? res.data : (res?.trainers || []);
        if (list && list.length > 0) {
          setTrainers(list);
        }
      } catch (err) {
        console.warn('Fallback trainers loaded');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
          <Award className="w-3.5 h-3.5" /> Sample Coach Profiles
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          Elite Coaching Roster
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Guiding your movement with strict biomechanical precision, nutritional accountability, and progressive athletic overload.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {trainers.map((coach) => (
          <div
            key={coach._id || coach.id}
            className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-red-500/40 transition-all flex flex-col justify-between space-y-6 group"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-red-400 shrink-0">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">
                      {coach.name}
                    </h3>
                    <p className="text-xs font-bold text-red-400 mt-0.5">{coach.specialty}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <span className="flex items-center text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 inline mr-1" />
                        {coach.rating} ({coach.reviewCount || 100}+ reviews)
                      </span>
                      <span>•</span>
                      <span>{coach.experienceYears} Years Exp</span>
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950 text-slate-300 border border-slate-800">
                  Master Coach
                </span>
              </div>

              <p className="mt-5 text-xs text-slate-300 leading-relaxed">
                {coach.bio}
              </p>

              {/* Certifications checklist */}
              <div className="mt-6 space-y-2 pt-4 border-t border-slate-800/80">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Illustrative Credentials:</p>
                <div className="flex flex-wrap gap-2">
                  {(coach.certifications || []).map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom 1-on-1 Availability */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-400" />
                <span>Next 1-on-1 Slot: <strong>{(coach.availableSlots || [])[0] || '10:00 AM'}</strong></span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 font-bold">
                Elite VIP Tier Included
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
