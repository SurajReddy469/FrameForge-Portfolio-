import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { TeamBadge } from '../common/TeamBadge';
import { 
  Play, 
  Trophy, 
  Zap, 
  Settings, 
  Shield, 
  DollarSign,
  Users,
  Flame,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const MainMenu: React.FC = () => {
  const {
    setScreen,
    userTeam,
    profile,
    setSettingsOpen,
    startAuction,
    resetAllGameData,
    auction
  } = useGameStore();

  const team = userTeam();

  const isAuctionActive = auction.phase !== 'idle' && auction.phase !== 'completed';
  const isAuctionFinished = auction.phase === 'completed';

  const handlePrimaryAction = () => {
    if (isAuctionActive) {
      setScreen('auction');
    } else if (isAuctionFinished) {
      setScreen('squad');
    } else {
      setScreen('teams');
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col justify-between p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 shadow-sm mb-4 sm:mb-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-amber-50 border border-amber-200 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold text-amber-800 mb-2 sm:mb-3 uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Premier League Cricket Auction Simulator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              CRIC-AUCTION <span className="text-gold-gradient">PRO 2026</span>
            </h1>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-slate-600 leading-relaxed">
              Step into the high-stakes boardroom. Command a <span className="text-amber-700 font-bold">₹120 Crore</span> purse, outbid 7 intelligent AI franchises, assemble a balanced Starting XI, and simulate a full 56-match championship season!
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full lg:w-auto">
            <button
              onClick={handlePrimaryAction}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-black text-slate-950 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950" />
              <span>
                {isAuctionActive
                  ? 'RESUME LIVE AUCTION'
                  : isAuctionFinished
                  ? 'MANAGE SQUAD & XI'
                  : 'START NEW AUCTION (₹120 CR)'}
              </span>
            </button>

            <button
              onClick={() => setScreen('teams')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 px-5 py-3.5 sm:py-4 text-xs font-bold text-slate-800 transition-colors shadow-sm"
            >
              <Shield className="w-4 h-4 text-slate-600" />
              <span>Choose Team</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Left Column (7 cols): Franchise Status & Quick Navigation */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
          {/* Active Franchise Card */}
          {team && (
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <TeamBadge teamId={team.id} size="lg" />
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 truncate">{team.name}</h2>
                    <span className="text-[11px] sm:text-xs text-slate-500 block truncate">
                      {team.stadium.split(',')[0]} • Strategy: <strong className="text-amber-800">{team.personality}</strong>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setScreen('teams')}
                  className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200 transition-colors"
                >
                  Change Franchise
                </button>
              </div>

              {/* Financial & Squad Stats Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3 sm:my-4">
                <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200 text-center sm:text-left">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5 truncate">
                    Purse
                  </span>
                  <span className="text-sm sm:text-xl font-black text-amber-700 font-mono">
                    ₹{team.currentPurse.toFixed(1)} Cr
                  </span>
                </div>

                <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-sky-50/70 border border-sky-200 text-center sm:text-left">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5 truncate">
                    Squad
                  </span>
                  <span className="text-sm sm:text-xl font-black text-sky-800 font-mono">
                    {team.squad.length}/25
                  </span>
                </div>

                <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-purple-50/70 border border-purple-200 text-center sm:text-left">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5 truncate">
                    Overseas
                  </span>
                  <span className="text-sm sm:text-xl font-black text-purple-800 font-mono">
                    {team.squad.filter(p => p.isOverseas).length}/8
                  </span>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-1 sm:pt-2">
                <button
                  onClick={() => setScreen('auction')}
                  className="flex items-center justify-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-800 hover:text-slate-950 font-extrabold text-[11px] sm:text-xs transition-colors border border-amber-300"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span className="truncate">Auction</span>
                </button>

                <button
                  onClick={() => setScreen('squad')}
                  className="flex items-center justify-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] sm:text-xs transition-colors border border-slate-200"
                >
                  <Users className="w-3.5 h-3.5 text-sky-700" />
                  <span className="truncate">Lineup</span>
                </button>

                <button
                  onClick={() => setScreen('season')}
                  className="flex items-center justify-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] sm:text-xs transition-colors border border-slate-200"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  <span className="truncate">Season</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Auction Rules & Strategy Guide */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              AUCTION RULES & STRATEGY CHEAT-SHEET
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">💰 ₹120.0 Cr Purse Cap</strong>
                <p className="text-slate-600">
                  Each franchise has ₹120 Cr to draft 18 to 25 players. Always reserve at least ₹0.20 Cr per unfilled slot!
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">📈 Dynamic Bid Brackets</strong>
                <p className="text-slate-600">
                  Bids increase by +₹0.25 Cr (up to 5 Cr), +₹0.5 Cr (5-10 Cr), +₹1 Cr (10-20 Cr), and +₹2 Cr (20+ Cr).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">⏱️ 10-Second Timer</strong>
                <p className="text-slate-600">
                  New bids reset the countdown. At 3s: "Going ONCE". At 1s: "Going TWICE". Zero: Hammer hits SOLD!
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">✈️ Overseas Limit</strong>
                <p className="text-slate-600">
                  Max 8 overseas in squad, and max 4 in your Starting XI. Over-limit causes severe chemistry penalties!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Manager Career Profile & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black text-xl shadow-md">
                👔
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{profile.name}</h3>
                <span className="text-xs text-amber-800 font-bold">
                  Franchise Owner & Manager
                </span>
              </div>
            </div>

            {/* Manager Stats Grid */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                  Trophies Won
                </span>
                <span className="text-2xl font-black text-amber-600 font-mono flex items-center justify-center gap-1">
                  🏆 {team?.trophies || profile.trophies}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                  Reputation
                </span>
                <span className="text-2xl font-black text-emerald-600 font-mono">
                  ⭐ {profile.reputation}/100
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                  Total Seasons
                </span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  #{profile.totalSeasons}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                  Scout Tokens
                </span>
                <span className="text-2xl font-black text-purple-600 font-mono">
                  🔍 {profile.scoutTokens}
                </span>
              </div>
            </div>

            {/* Settings Trigger */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 border border-slate-200 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Settings className="w-4 h-4 text-slate-600" />
              <span>Configure Settings & Auction Speed</span>
            </button>
          </div>

          {/* Quick Start Tip Box */}
          <div className="rounded-3xl bg-amber-50/60 border border-amber-200 p-5">
            <span className="text-xs font-black uppercase text-amber-800 tracking-wider flex items-center gap-1.5 mb-1.5">
              💡 PRO MANAGER TIP
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Don't blow your entire purse on one superstar! Teams that balance a marquee anchor with high-potential young bargains and designated death bowlers consistently win the 56-match league!
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-3 border-t border-slate-200">
        Cric-Auction Pro 2026 • Modern Cricket Auction & Season Simulator
      </footer>
    </div>
  );
};
