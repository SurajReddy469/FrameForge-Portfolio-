import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Radio } from 'lucide-react';

export const AuctionFeed: React.FC = () => {
  const { auction } = useGameStore();

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5 pb-2 border-b border-slate-100">
        <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
        <span>LIVE AUCTIONEER COMMENTARY TICKER</span>
      </div>

      <div className="space-y-2 max-h-36 overflow-y-auto pr-1 text-xs">
        {auction.feedMessages.slice(0, 15).map((msg) => {
          let badgeColor = 'text-slate-700';
          if (msg.type === 'bid') badgeColor = 'text-amber-800 font-bold';
          else if (msg.type === 'warning') badgeColor = 'text-rose-700 font-bold';
          else if (msg.type === 'sold') badgeColor = 'text-emerald-700 font-black';
          else if (msg.type === 'unsold') badgeColor = 'text-slate-500 italic';

          return (
            <div key={msg.id} className="flex items-start gap-2 py-0.5 border-b border-slate-100 last:border-none">
              <span className="text-[10px] text-slate-400 font-mono flex-shrink-0 mt-0.5 font-bold">
                {new Date(msg.timestamp).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' })}
              </span>
              <p className={`leading-relaxed ${badgeColor}`}>
                {msg.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
