import React from 'react';
import { ShieldCheck, MapPin, Globe } from 'lucide-react';

export default function TopVipBar({ onOpenSalonModal, currency, onCurrencyChange }) {
  const currencies = ['USD', 'CHF', 'EUR', 'GBP', 'JPY'];

  return (
    <div className="bg-[#050607] border-b border-[#22242a] py-2 px-4 text-xs font-mono tracking-wider">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
          <span className="text-neutral-300 font-serif tracking-widest text-sm">HAUTE HORLOGERIE SUISSE • FONDÉE EN 1892</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          {/* Currency Switcher */}
          <div className="flex items-center gap-1.5 bg-[#12141a] px-2 py-1 rounded border border-[#262934] text-neutral-300">
            <Globe className="w-3 h-3 text-[#d4af37]" />
            <select
              value={currency}
              onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
              className="bg-transparent text-white font-mono text-[10px] outline-none cursor-pointer"
            >
              {currencies.map(c => (
                <option key={c} value={c} className="bg-[#12141a] text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Fully Insured Armored Courier</span>
          </div>

          <button
            onClick={onOpenSalonModal}
            className="text-[#d4af37] hover:text-[#f4d068] transition underline decoration-[#d4af37]/50 underline-offset-4 flex items-center gap-1 cursor-pointer"
          >
            <MapPin className="w-3 h-3" />
            <span>VIP Geneva Salon</span>
          </button>
        </div>
      </div>
    </div>
  );
}
