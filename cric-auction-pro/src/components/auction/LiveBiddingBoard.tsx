import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { TeamBadge } from '../common/TeamBadge';
import { Flame } from 'lucide-react';

export const LiveBiddingBoard: React.FC = () => {
  const { teams, auction, userTeamId } = useGameStore();

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-600" />
          FRANCHISE BIDDING BOARD
        </h3>
        <span className="text-[11px] text-slate-500 font-mono font-bold">
          8 TEAMS ACTIVE
        </span>
      </div>

      {/* Franchises List */}
      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {teams.map((team) => {
          const isHighestBidder = auction.highestBidderId === team.id;
          const isUser = team.id === userTeamId;

          return (
            <div
              key={team.id}
              className={`p-3 rounded-2xl transition-all relative border flex items-center justify-between gap-3 ${
                isHighestBidder
                  ? 'bg-amber-50/90 border-amber-400 shadow-md ring-2 ring-amber-400/40'
                  : 'bg-slate-50/70 border-slate-200/70 hover:bg-slate-100/70'
              }`}
            >
              {/* Team Crest & Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <TeamBadge teamId={team.id} size="sm" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-black tracking-wide truncate ${isHighestBidder ? 'text-amber-900' : 'text-slate-900'}`}>
                      {team.shortName}
                    </span>
                    {isUser && (
                      <span className="text-[9px] px-1 rounded bg-amber-100 text-amber-800 font-bold border border-amber-300">
                        YOU
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 block truncate font-medium">
                    Purse: ₹{team.currentPurse.toFixed(1)} Cr
                  </span>
                </div>
              </div>

              {/* Status Pill: Current Bid or Squad Count */}
              <div className="text-right flex-shrink-0">
                {isHighestBidder ? (
                  <div className="flex flex-col items-end">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs font-mono shadow-sm animate-pulse">
                      ₹{auction.currentBid.toFixed(2)} Cr
                    </span>
                    <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider mt-0.5 flex items-center gap-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping inline-block" />
                      HIGHEST BIDDER
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-700 font-mono">
                      {team.squad.length}/25
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {team.personality.split(' ')[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="pt-3 mt-3 border-t border-slate-100 text-center text-[11px] text-slate-500 font-medium">
        Live AI Valuation & Strategy Active
      </div>
    </div>
  );
};
