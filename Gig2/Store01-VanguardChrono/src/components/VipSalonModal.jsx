import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Check, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SALONS } from '../data/watchesData';

export default function VipSalonModal({ isOpen, onClose }) {
  const [selectedSalon, setSelectedSalon] = useState(SALONS[0]);
  const [date, setDate] = useState('2026-11-28');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12141a] border border-[#d4af37]/40 rounded-3xl max-w-lg w-full p-8 relative shadow-2xl gold-glow">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#1e2015] border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl font-light text-white mb-2">Private Salon Confirmed</h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
              Our Senior Horological Director at <span className="text-[#d4af37] font-medium">{selectedSalon.city} ({selectedSalon.address})</span> will welcome you for an exclusive private presentation.
            </p>
            <div className="p-4 bg-[#090a0c] rounded-2xl border border-neutral-800 text-left font-mono text-xs text-neutral-400 space-y-1 mb-6">
              <div>APPOINTMENT CODE: <span className="text-[#d4af37]">GEN-VIP-84920</span></div>
              <div>DATE: <span className="text-white">{date} (14:00 CET)</span></div>
              <div>RECEPTION: <span className="text-emerald-400">Dom Pérignon Vintage Reception</span></div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#d4af37] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="text-[#d4af37] font-mono text-xs uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> VIP PRIVATE CONCIERGE
            </div>
            <h3 className="font-serif text-3xl font-light text-white mb-2">
              Reserve Private Viewing Salon
            </h3>
            <p className="text-xs text-neutral-400 font-light mb-6">
              Experience the Vanguard Manufacture collection in a confidential salon with our master watchmakers.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Select Manufacture Salon</label>
                <div className="grid grid-cols-2 gap-2">
                  {SALONS.map((salon) => (
                    <button
                      key={salon.city}
                      type="button"
                      onClick={() => setSelectedSalon(salon)}
                      className={`p-3 rounded-xl border text-left transition ${
                        selectedSalon.city === salon.city
                          ? 'bg-[#1e1c12] border-[#d4af37] text-[#d4af37]'
                          : 'bg-[#090a0c] border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-bold text-white text-xs">{salon.city}</div>
                      <div className="text-[10px] text-neutral-500">{salon.country}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#090a0c] border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="Lord Alexander Sterling"
                  className="w-full bg-[#090a0c] border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-4 rounded-xl bg-[#d4af37] hover:bg-[#e5c14d] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-[#d4af37]/20"
              >
                Confirm Confidential Salon
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
