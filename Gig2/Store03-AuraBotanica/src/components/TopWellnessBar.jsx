import React from 'react';
import { Sparkles, Leaf } from 'lucide-react';

export default function TopWellnessBar({ onOpenQuiz }) {
  return (
    <div className="bg-[#3e473d] text-[#fbf8f5] py-2 px-4 text-xs font-light tracking-wide">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Leaf className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Complimentary Rice Barrier Hydrosol with Orders Over $85 • Carbon-Neutral Glass Packaging</span>
        </div>

        <button
          onClick={onOpenQuiz}
          className="text-[#fbf8f5] underline hover:text-[#e2dad0] transition text-[11px]"
        >
          Take the 2-Minute Botanical Skin Diagnostic →
        </button>
      </div>
    </div>
  );
}
