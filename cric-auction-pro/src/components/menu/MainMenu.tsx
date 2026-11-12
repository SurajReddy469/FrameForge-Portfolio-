import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { TeamBadge } from '../common/TeamBadge';
import { soundService } from '../../services/soundService';
import { 
  Play, 
  Trophy, 
  Zap, 
  Settings, 
  Shield, 
  Users,
  Flame,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Award,
  Swords,
  Layers,
  ChevronRight
} from 'lucide-react';

export const MainMenu: React.FC = () => {
  const {
    setScreen,
    userTeam,
    profile,
    setSettingsOpen,
    resetAllGameData,
    auction,
    updateSettings,
    settings,
  } = useGameStore();

  const team = userTeam();

  const isAuctionActive = auction.phase !== 'idle' && auction.phase !== 'completed';
  const isAuctionFinished = auction.phase === 'completed';

  const handlePlayAuction = () => {
    soundService.playClick();
    if (isAuctionActive) {
      setScreen('auction');
    } else if (isAuctionFinished) {
      setScreen('squad');
    } else {
      setScreen('teams');
    }
  };

  const handleBlitzPlay = () => {
    soundService.playClick();
    updateSettings({ timerSpeed: 'fast', aiAggression: 'ruthless' });
    if (isAuctionActive) {
      setScreen('auction');
    } else {
      setScreen('teams');
    }
  };

  const handleEnterLeague = () => {
    soundService.playClick();
    setScreen('season');
  };

  const handleSquadLab = () => {
    soundService.playClick();
    setScreen('squad');
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col justify-between p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      
      {/* Top Game HUD Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
      >
        {/* Manager Profile & Level */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-amber-400 font-black text-lg">
                IPL
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
              LVL 3
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black text-slate-900">
                {profile.name || 'Franchise Boss'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-extrabold text-[10px] tracking-wider uppercase border border-amber-300">
                ⭐ ELITE TACTICIAN
              </span>
            </div>
            
            {/* XP Progress Bar */}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-28 sm:w-40 h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 w-3/4 rounded-full" />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500">
                750 / 1000 XP
              </span>
            </div>
          </div>
        </div>

        {/* Selected Franchise Quick-Switch Pill */}
        {team && (
          <div className="flex items-center justify-between w-full sm:w-auto gap-3 bg-slate-50 border border-slate-200 p-2 sm:px-4 sm:py-2 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <TeamBadge teamId={team.id} size="sm" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  ACTIVE FRANCHISE
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                  {team.name}
                </span>
              </div>
            </div>
            <button
              onClick={() => { soundService.playClick(); setScreen('teams'); }}
              className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-amber-800 border border-slate-200 shadow-sm transition-all"
            >
              Change
            </button>
          </div>
        )}
      </motion.div>

      {/* Live IPL Broadcast News Ticker */}
      <div className="rounded-xl bg-slate-900 text-white px-3 py-2 flex items-center gap-3 overflow-hidden shadow-inner">
        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-400 flex-shrink-0 bg-slate-800 px-2.5 py-1 rounded-md">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          IPL LIVE WIRE
        </span>
        <div className="text-xs font-semibold text-slate-300 truncate">
          🏏 Virat Kohli, Rohit Sharma, MS Dhoni, Jasprit Bumrah & Heinrich Klaasen headline the ₹120 Cr Mega Auction &bull; 10 Franchises fighting for glory!
        </div>
      </div>

      {/* Hero Game Mode Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
        
        {/* MODE 1: IPL MEGA AUCTION 2025 */}
        <motion.div
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 p-6 sm:p-8 shadow-xl shadow-amber-500/15 flex flex-col justify-between text-slate-950 border border-amber-300"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Trophy className="w-48 h-48 text-slate-950" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 text-amber-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider mb-3 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MAIN GAME EVENT • 112 PLAYERS</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-none mb-2">
              IPL MEGA AUCTION
            </h2>
            
            <p className="text-xs sm:text-sm font-semibold text-slate-900/90 leading-relaxed max-w-md">
              Take the hot seat with a <span className="font-black text-slate-950">₹120.00 Cr purse</span>. Outbid 9 aggressive AI franchises in real-time gavel wars to sign India & world cricket legends!
            </p>
          </div>

          <div className="pt-6 sm:pt-8 flex items-center gap-3">
            <button
              onClick={handlePlayAuction}
              className="flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-sm sm:text-base shadow-2xl hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400" />
              <span>
                {isAuctionActive ? 'RESUME AUCTION' : isAuctionFinished ? 'SQUAD ASSEMBLED' : 'ENTER AUCTION ROOM'}
              </span>
            </button>

            <button
              onClick={() => { soundService.playClick(); setScreen('teams'); }}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/70 hover:bg-white text-slate-950 font-bold transition-all shadow-sm"
              title="Select Franchise"
            >
              <Shield className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Right Column: 3 Quick Action Game Modes */}
        <div className="flex flex-col gap-3 sm:gap-4">
          
          {/* MODE 2: Blitz Speed Auction */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={handleBlitzPlay}
            className="cursor-pointer rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm flex-shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    BLITZ SPEED AUCTION
                  </h3>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                    FAST 5s
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-stakes rapid bidding war with aggressive AI bidding timers.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </motion.div>

          {/* MODE 3: Premier Championship League */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={handleEnterLeague}
            className="cursor-pointer rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    IPL CHAMPIONSHIP LEAGUE
                  </h3>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    SEASON
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  56-match round-robin campaign, Net Run Rate table, Playoffs & Trophy Final.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </motion.div>

          {/* MODE 4: Squad Tactics & Playing XI */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={handleSquadLab}
            className="cursor-pointer rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm flex-shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    SQUAD LAB & PITCH XI
                  </h3>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                    {team ? `${team.squad.length}/25` : '0/25'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set starting 11, team chemistry, batting orders and death bowler roles.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </motion.div>

        </div>
      </div>

      {/* Bottom Game Stats & Settings Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            SALARY CAP
          </span>
          <span className="text-base sm:text-lg font-black text-amber-700 font-mono">
            ₹120.00 Cr
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            AUCTION WINS
          </span>
          <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
            {profile.auctionWins || 0}
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            TROPHY CABINET
          </span>
          <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
            🏆 {team?.trophies || 0}
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm flex items-center justify-center gap-2">
          <button
            onClick={() => { soundService.playClick(); setSettingsOpen(true); }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-slate-600" />
            <span>Settings</span>
          </button>
        </div>
      </div>

    </div>
  );
};
