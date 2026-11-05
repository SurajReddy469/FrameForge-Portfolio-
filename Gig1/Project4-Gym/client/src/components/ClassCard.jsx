import React from 'react';
import { Clock, Flame, MapPin, User, Check, Users } from 'lucide-react';

export default function ClassCard({ fitnessClass, onBook }) {
  const booked = fitnessClass.capacityBooked || 0;
  const max = fitnessClass.capacityMax || 20;
  const percent = Math.min(100, Math.round((booked / max) * 100));
  const isFull = booked >= max;

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 overflow-hidden flex flex-col justify-between group">
      {/* Top Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={fitnessClass.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'}
          alt={fitnessClass.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Category & Intensity Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/90 text-white border border-slate-700 backdrop-blur-md">
            {fitnessClass.category}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${
            fitnessClass.intensity === 'Extreme'
              ? 'bg-red-500/20 text-red-400 border-red-500/40'
              : fitnessClass.intensity === 'High'
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
          }`}>
            {fitnessClass.intensity}
          </span>
        </div>

        {/* Calories Pill */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-xs font-bold text-amber-400 flex items-center gap-1 backdrop-blur-md">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>{fitnessClass.caloriesBurnedEst || 500} kcal</span>
        </div>

        {/* Schedule Strip */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 font-semibold">
          <span className="text-white font-bold">{fitnessClass.scheduleDay}</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-red-400" />
            {fitnessClass.scheduleTime} ({fitnessClass.durationMin || 50}m)
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
            {fitnessClass.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {fitnessClass.description || 'High-intensity conditioning designed to build power and stamina.'}
          </p>

          {/* Coach & Room */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-red-400">
                <User className="w-3 h-3" />
              </div>
              <span className="font-semibold text-slate-200">{fitnessClass.instructorName}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{fitnessClass.room || 'Studio A'}</span>
            </div>
          </div>
        </div>

        {/* Capacity Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> Studio Capacity:
            </span>
            <span className={`font-mono font-bold ${isFull ? 'text-rose-400' : percent > 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {booked} / {max} {isFull ? '(Sold Out)' : 'Filled'}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFull
                  ? 'bg-rose-500'
                  : percent > 80
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => onBook(fitnessClass)}
            disabled={isFull}
            className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
              isFull
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isFull ? (
              <span>Session Full</span>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Reserve Studio Spot</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
