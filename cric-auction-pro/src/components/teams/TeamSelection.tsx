import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { TeamBadge } from '../common/TeamBadge';
import { MapPin, Users, Zap, Check, ArrowRight, DollarSign } from 'lucide-react';

export const TeamSelection: React.FC = () => {
  const { teams, userTeamId, selectTeam, startAuction } = useGameStore();
  const [selectedId, setSelectedId] = useState<string>(userTeamId);

  const selectedTeam = teams.find(t => t.id === selectedId) || teams[0];

  const handleConfirm = () => {
    selectTeam(selectedId);
    startAuction();
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 lg:p-8 min-h-[calc(100vh-65px)] flex flex-col justify-between">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-700 mb-2 uppercase tracking-wider shadow-sm">
          Franchise Selection
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          CHOOSE YOUR <span className="text-gold-gradient">FRANCHISE</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Select the club you want to lead into the mega auction. Each franchise boasts unique fan traditions, home fortress conditions, and strategic philosophies.
        </p>
      </div>

      {/* Grid of Franchises */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {teams.map((t) => {
          const isSelected = t.id === selectedId;
          return (
            <motion.div
              key={t.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedId(t.id)}
              className={`cursor-pointer rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 transition-all relative border overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-white to-amber-50/50 border-amber-500 shadow-lg ring-2 ring-amber-400/50'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Corner accent glow */}
              <div 
                className="absolute -top-12 -right-12 h-28 w-28 rounded-full blur-2xl opacity-15 pointer-events-none"
                style={{ backgroundColor: t.primaryColor }}
              />

              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <TeamBadge teamId={t.id} size="md" />
                  {isSelected ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-bold shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {t.shortName}
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                  {t.name}
                </h3>
                <span className="text-xs text-amber-700 font-bold block mt-0.5">
                  {t.city}
                </span>

                <div className="mt-2.5 sm:mt-3 space-y-1 text-xs border-t border-slate-100 pt-2.5 sm:pt-3">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{t.stadium.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Zap className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span className="truncate text-amber-800 font-semibold">{t.personality}</span>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between text-xs pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-slate-100 font-semibold">
                <span className="text-slate-500">Trophies: {t.trophies > 0 ? `🏆 ${t.trophies}` : '0'}</span>
                <span className="text-emerald-600 font-mono font-bold">₹{t.startingPurse} Cr</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Team Dossier & Confirmation Banner */}
      <motion.div
        key={selectedTeam.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
      >
        <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
          <TeamBadge teamId={selectedTeam.id} size="lg" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 truncate">{selectedTeam.name}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex-shrink-0">
                {selectedTeam.strategicStrength}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 max-w-xl">
              {selectedTeam.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 text-[11px] sm:text-xs font-semibold">
              <span className="flex items-center gap-1 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span className="truncate max-w-[120px] sm:max-w-none">{selectedTeam.stadium.split(',')[0]}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-700">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                Fans: {selectedTeam.fanPopularity}%
              </span>
              <span className="flex items-center gap-1 text-amber-700 font-mono font-bold">
                <DollarSign className="w-3.5 h-3.5" />
                ₹{selectedTeam.startingPurse.toFixed(1)} Cr
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full md:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 font-black text-slate-950 text-sm sm:text-base shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <span>CONFIRM & START AUCTION (₹120 CR)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};
