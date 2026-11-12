import React from 'react';
import { useGameStore, GameScreen } from '../../store/useGameStore';
import { TeamBadge } from './TeamBadge';
import { 
  Volume2, 
  VolumeX, 
  Settings, 
  Flame, 
  Users, 
  Calendar, 
  Home,
  RotateCcw
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentScreen,
    setScreen,
    userTeam,
    profile,
    settings,
    toggleSound,
    setSettingsOpen,
    resetAllGameData,
    auction
  } = useGameStore();

  const team = userTeam();

  const navItems: { screen: GameScreen; label: string; shortLabel: string; icon: any; highlight?: boolean }[] = [
    { screen: 'menu', label: 'Dashboard', shortLabel: 'Home', icon: Home },
    { screen: 'auction', label: 'Live Auction', shortLabel: 'Auction', icon: Flame, highlight: auction.phase !== 'completed' && auction.phase !== 'idle' },
    { screen: 'squad', label: 'Starting XI & Squad', shortLabel: 'Lineup', icon: Users },
    { screen: 'season', label: 'Season & Playoffs', shortLabel: 'Season', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Broadcast Ticker Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-rose-500 to-sky-500" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6">
        {/* Brand & Active Team Info */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button 
            onClick={() => setScreen('menu')}
            className="flex items-center gap-2 group text-left flex-shrink-0"
          >
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 font-black text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform text-sm sm:text-base">
              🏏
            </div>
            <div className="hidden xs:block sm:block">
              <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-amber-600 block leading-none">CRIC-AUCTION</span>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">PREMIER LEAGUE</div>
            </div>
          </button>

          {/* User's Team Pill */}
          {team && (
            <div className="flex items-center gap-1.5 sm:gap-2.5 rounded-full bg-slate-100 border border-slate-200 px-2 sm:px-3 py-1 shadow-inner min-w-0">
              <TeamBadge teamId={team.id} size="sm" />
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] sm:text-xs font-extrabold text-slate-900 tracking-wide truncate max-w-[70px] xs:max-w-[110px] sm:max-w-none">
                  {team.shortName}
                </span>
                <span className="text-[9px] sm:text-[10px] text-amber-700 font-bold font-mono leading-none">
                  ₹{team.currentPurse.toFixed(1)} Cr
                </span>
              </div>
              <div className="ml-1 pl-1.5 sm:pl-2 border-l border-slate-200 hidden sm:flex flex-col">
                <span className="text-[9px] sm:text-[10px] text-slate-500 leading-none">Squad</span>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-600">{team.squad.length}/25</span>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Navigation Screen Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => setScreen(item.screen)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${item.highlight && !isActive ? 'text-amber-600 animate-pulse' : ''}`} />
                {item.label}
                {item.highlight && !isActive && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Utility Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Scout Tokens Indicator */}
          <div 
            title="Available Scout Tokens"
            className="flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-200 px-2 py-1 text-[11px] sm:text-xs font-bold text-amber-700 cursor-default shadow-sm"
          >
            <span>🔍</span>
            <span>{profile.scoutTokens}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={settings.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-amber-600 hover:border-amber-300 shadow-sm transition-colors"
          >
            {settings.soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => setSettingsOpen(true)}
            title="Game Settings"
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-colors"
          >
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Reset / Restart */}
          <button
            onClick={() => {
              if (confirm('Start a fresh new auction campaign? This will reset the current draft and season.')) {
                resetAllGameData();
              }
            }}
            title="Reset / Start Fresh"
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 shadow-sm transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Phone Screen Navigation Bar (Grid 4 items, touch-friendly) */}
      <div className="grid grid-cols-4 md:hidden px-2 py-1 border-t border-slate-200 gap-1 bg-slate-50/90 text-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => setScreen(item.screen)}
              className={`relative flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 py-1.5 px-1 rounded-xl text-[10px] sm:text-xs font-bold transition-all ${
                isActive 
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-black' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="truncate">{item.shortLabel}</span>
              {item.highlight && !isActive && (
                <span className="absolute top-1 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
