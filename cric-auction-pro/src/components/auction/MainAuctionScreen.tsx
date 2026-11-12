import React, { useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { PlayerCard } from './PlayerCard';
import { LiveBiddingBoard } from './LiveBiddingBoard';
import { AuctionControls } from './AuctionControls';
import { AuctionFeed } from './AuctionFeed';
import { SoldOverlay } from './SoldOverlay';
import { UnsoldOverlay } from './UnsoldOverlay';
import { ScoutReportModal } from './ScoutReportModal';
import { AuctionSummaryModal } from './AuctionSummaryModal';
import { soundService } from '../../services/soundService';
import { Timer, Users, Layers } from 'lucide-react';

export const MainAuctionScreen: React.FC = () => {
  const {
    auction,
    players,
    tickAuctionTimer,
    setScoutModalOpen,
    settings,
    updateSettings,
    autoCompleteAuction,
  } = useGameStore();

  // Timer interval effect
  useEffect(() => {
    let speedMs = 1000;
    if (settings.timerSpeed === 'fast') speedMs = 350;
    else if (settings.timerSpeed === 'slow') speedMs = 1500;

    const interval = setInterval(() => {
      tickAuctionTimer();
    }, speedMs);

    return () => clearInterval(interval);
  }, [tickAuctionTimer, settings.timerSpeed]);

  if (!auction.currentPlayer) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Auction Completed or Inactive</h2>
        <p className="text-sm text-slate-600 mb-6">All registered players have been auctioned for this season.</p>
        <button
          onClick={() => { soundService.playClick(); useGameStore.getState().setScreen('squad'); }}
          className="px-8 py-3.5 rounded-2xl bg-amber-500 font-bold text-slate-950 text-sm shadow-lg hover:bg-amber-400 transition-colors"
        >
          View Squad & Playing XI
        </button>
        <AuctionSummaryModal />
      </div>
    );
  }

  const isUrgent = auction.timerSeconds <= 3;

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 lg:p-8 min-h-[calc(100vh-65px)] flex flex-col justify-between space-y-4">
      {/* Top Television Broadcast Bar */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-3 sm:p-4 shadow-sm flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        {/* Left: Round & Player Index */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-rose-600" />
            </span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-900">
              LIVE BROADCAST
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200" />

          <div className="flex items-center gap-1.5 text-xs">
            <Layers className="w-3.5 h-3.5 text-amber-600 hidden xs:block" />
            <span className="text-[11px] sm:text-xs font-black text-slate-900 uppercase">{auction.currentPlayer.tier} SET</span>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <Users className="w-4 h-4 text-sky-600" />
            <span className="text-slate-500 font-semibold">LOT:</span>
            <span className="font-black text-slate-900 font-mono">
              #{auction.currentPlayerIndex + 1} / {players.length}
            </span>
          </div>
        </div>

        {/* Center / Right: Speed Controls & Countdown Timer */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Auction Pace Quick Switcher */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 text-[10px] font-bold">
            <button
              onClick={() => { soundService.playClick(); updateSettings({ timerSpeed: 'standard' }); }}
              className={`px-2 py-1 rounded-lg transition-all ${settings.timerSpeed === 'standard' ? 'bg-white text-slate-900 shadow-sm font-black' : 'text-slate-500'}`}
            >
              1x Real
            </button>
            <button
              onClick={() => { soundService.playClick(); updateSettings({ timerSpeed: 'fast' }); }}
              className={`px-2 py-1 rounded-lg transition-all ${settings.timerSpeed === 'fast' ? 'bg-amber-500 text-slate-950 shadow-sm font-black' : 'text-slate-500'}`}
            >
              ⚡ Fast
            </button>
            <button
              onClick={() => {
                if (window.confirm('Simulate all remaining rounds and generate complete team rosters?')) {
                  soundService.playGavel();
                  autoCompleteAuction();
                }
              }}
              className="px-2 py-1 rounded-lg text-slate-600 hover:text-slate-900 transition-all"
              title="Fast auto-simulate full auction"
            >
              ⏩ Auto-Sim
            </button>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 sm:gap-2 rounded-2xl bg-slate-50 px-2.5 sm:px-4 py-1 sm:py-1.5 border border-slate-200">
            <Timer className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isUrgent ? 'text-rose-600 animate-pulse' : 'text-amber-600'}`} />
            <span className={`text-lg sm:text-xl font-black font-mono leading-none ${
              isUrgent ? 'text-rose-600 animate-ping' : 'text-slate-900'
            }`}>
              {auction.timerSeconds}s
            </span>
          </div>

          {/* Phase Pill */}
          <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider ${
            auction.phase === 'going_twice'
              ? 'bg-rose-500 text-white animate-pulse'
              : auction.phase === 'going_once'
              ? 'bg-amber-500 text-slate-950 animate-pulse'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
          }`}>
            {auction.phase === 'going_twice'
              ? '⚠️ 2ND CALL'
              : auction.phase === 'going_once'
              ? '1ST CALL'
              : 'ACTIVE'}
          </span>
        </div>
      </div>

      {/* Main 2-Column Grid: Large Player Card (Left 8 cols) + AI Bidding Board (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 items-start">
        {/* Left: Player Card & Live Controls */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          <PlayerCard 
            player={auction.currentPlayer} 
            onOpenScout={() => setScoutModalOpen(true, auction.currentPlayer!)}
          />
          <AuctionControls />
        </div>

        {/* Right: Live Franchise Bidding Board & Activity Feed */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <div className="h-[360px] sm:h-[420px]">
            <LiveBiddingBoard />
          </div>
          <div className="h-[220px]">
            <AuctionFeed />
          </div>
        </div>
      </div>

      {/* Overlays & Modals */}
      <SoldOverlay />
      <UnsoldOverlay />
      <ScoutReportModal />
      <AuctionSummaryModal />
    </div>
  );
};
