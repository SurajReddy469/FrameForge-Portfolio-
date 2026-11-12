import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { getNextBidAmount, getNextBidIncrement } from '../../services/aiBiddingEngine';
import { Gavel, FastForward, Search, Sparkles } from 'lucide-react';

export const AuctionControls: React.FC = () => {
  const {
    auction,
    userTeamId,
    teams,
    placeHumanBid,
    passCurrentPlayer,
    setScoutModalOpen,
    autoCompleteAuction,
  } = useGameStore();

  const userTeam = teams.find(t => t.id === userTeamId);
  if (!userTeam || !auction.currentPlayer) return null;

  const currentBid = auction.currentBid;
  const basePrice = auction.currentPlayer.basePrice;
  const nextMinBid = getNextBidAmount(currentBid, basePrice);
  const increment = getNextBidIncrement(currentBid);

  // Jump bid (+2 increments)
  const jumpBid = Number((nextMinBid + increment).toFixed(2));

  const isUserHighestBidder = auction.highestBidderId === userTeamId;
  const canAffordNextBid = userTeam.currentPurse >= nextMinBid;
  const isBiddingActive = auction.phase === 'bidding' || auction.phase === 'going_once' || auction.phase === 'going_twice';

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-md">
      {/* Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            CURRENT AUCTION PRICE
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-4xl font-black text-amber-700 font-mono tracking-tight">
              {currentBid > 0 ? `₹${currentBid.toFixed(2)} Cr` : `Base: ₹${basePrice.toFixed(2)} Cr`}
            </span>
            {currentBid > 0 && (
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                (+₹{increment.toFixed(2)} Cr)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-left sm:text-right">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              HIGHEST BIDDER
            </span>
            <span className={`text-sm sm:text-base font-extrabold ${isUserHighestBidder ? 'text-emerald-700' : 'text-slate-900'}`}>
              {auction.highestBidderName || 'None (Awaiting Bids)'}
              {isUserHighestBidder && ' (Your Bid ✓)'}
            </span>
          </div>
        </div>
      </div>

      {/* Large Action Controls (Phone Adaptive) */}
      <div className="grid grid-cols-12 gap-2 sm:gap-3">
        {/* Primary Bid Button (Full width on mobile, half on desktop) */}
        <button
          disabled={!isBiddingActive || isUserHighestBidder || !canAffordNextBid}
          onClick={() => placeHumanBid(nextMinBid)}
          className={`col-span-12 sm:col-span-6 py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 sm:gap-3 shadow-xl transition-all ${
            isBiddingActive && !isUserHighestBidder && canAffordNextBid
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 hover:scale-[1.02] active:scale-[0.98] shadow-amber-500/25 ring-2 ring-amber-300'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <Gavel className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          <span className="truncate">
            {isUserHighestBidder
              ? 'YOU ARE HIGHEST BIDDER'
              : `BID ₹${nextMinBid.toFixed(2)} Cr`}
          </span>
        </button>

        {/* Aggressive Power Bid Button */}
        <button
          disabled={!isBiddingActive || isUserHighestBidder || userTeam.currentPurse < jumpBid}
          onClick={() => placeHumanBid(jumpBid)}
          className={`col-span-6 sm:col-span-3 py-3 sm:py-4 px-2 sm:px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 border transition-all ${
            isBiddingActive && !isUserHighestBidder && userTeam.currentPurse >= jumpBid
              ? 'bg-slate-50 hover:bg-slate-100 text-amber-800 border-amber-300 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
          <span className="truncate">RAISE ₹{jumpBid.toFixed(2)} Cr</span>
        </button>

        {/* Pass / Skip Player */}
        <button
          disabled={!isBiddingActive}
          onClick={passCurrentPlayer}
          className="col-span-6 sm:col-span-3 py-3 sm:py-4 px-2 sm:px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-[0.98]"
        >
          <FastForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="truncate">PASS / SKIP</span>
        </button>
      </div>

      {/* Auxiliary bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScoutModalOpen(true, auction.currentPlayer!)}
            className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-bold"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Open Scout Report</span>
          </button>
          <span>•</span>
          <span>Your Remaining Purse: <strong className="text-slate-900 font-mono">₹{userTeam.currentPurse.toFixed(2)} Cr</strong></span>
        </div>

        <button
          onClick={() => {
            if (confirm('Simulate remaining players in auction instantly using intelligent AI logic?')) {
              autoCompleteAuction();
            }
          }}
          className="text-xs text-slate-500 hover:text-amber-700 font-semibold transition-colors"
        >
          ⚡ Auto-Complete Entire Auction
        </button>
      </div>
    </div>
  );
};
