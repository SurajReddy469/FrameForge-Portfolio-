import React, { useState, useEffect } from 'react';
import { Sliders, CheckCircle2, ShieldCheck, X, ArrowRight } from 'lucide-react';

export default function FitFinder({ isOpen, onClose, onApplySize, initialSize = 'L' }) {
  const [heightCm, setHeightCm] = useState(180); // cm
  const [weightKg, setWeightKg] = useState(75); // kg
  const [fitPreference, setFitPreference] = useState('oversized'); // 'oversized' | 'boxy' | 'true'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Fit logic
  let recommendedSize = 'M';
  if (heightCm > 185 || weightKg > 85) recommendedSize = 'XL';
  else if (heightCm > 178 || weightKg > 74) recommendedSize = 'L';
  else if (heightCm < 170 || weightKg < 62) recommendedSize = 'S';

  if (fitPreference === 'oversized' && recommendedSize === 'M' && heightCm >= 175) {
    recommendedSize = 'L';
  }

  const handleApply = () => {
    if (onApplySize) {
      onApplySize(recommendedSize);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fit-finder-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="bg-[#111111] border-2 border-[#ccff00] max-w-lg w-full p-8 relative brutal-shadow font-mono text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 cursor-pointer"
          aria-label="Close fit diagnostic"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-5 h-5 text-[#ccff00]" />
          <span className="text-[#ccff00] text-[10px] uppercase font-bold tracking-widest">BIOMETRIC DRAPE CALCULATOR</span>
        </div>
        <h3 id="fit-finder-title" className="text-2xl font-black uppercase text-white mb-4">
          Tactical Fit Diagnostic
        </h3>

        <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
          Zero//Gravity cuts are engineered with dropped shoulders, elongated torsos, and heavyweight GSM drape. Enter your dimensions to calibrate your silhouette.
        </p>

        <div className="space-y-5 mb-8">
          {/* Height Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="height-slider" className="text-neutral-400 uppercase">Height:</label>
              <span className="font-bold text-white">{heightCm} cm ({Math.floor(heightCm / 30.48)}' {Math.round((heightCm % 30.48) / 2.54)}")</span>
            </div>
            <input
              id="height-slider"
              type="range"
              min="155"
              max="205"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full accent-[#ccff00] cursor-pointer"
            />
          </div>

          {/* Weight Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="weight-slider" className="text-neutral-400 uppercase">Weight:</label>
              <span className="font-bold text-white">{weightKg} kg ({Math.round(weightKg * 2.20462)} lbs)</span>
            </div>
            <input
              id="weight-slider"
              type="range"
              min="50"
              max="120"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-[#ccff00] cursor-pointer"
            />
          </div>

          {/* Fit Preference */}
          <div>
            <span className="block text-xs text-neutral-400 uppercase mb-2">Desired Drape:</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'boxy', label: 'Boxy Cropped' },
                { id: 'oversized', label: 'Oversized Drape' },
                { id: 'true', label: 'True to Size' }
              ].map((pref) => (
                <button
                  key={pref.id}
                  type="button"
                  onClick={() => setFitPreference(pref.id)}
                  className={`py-2 px-1 text-[11px] font-bold border transition ${
                    fitPreference === pref.id
                      ? 'bg-[#ccff00] text-black border-[#ccff00]'
                      : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  {pref.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Output */}
        <div className="p-4 bg-black border border-[#222] mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 uppercase block">RECOMMENDED CALIBRATION:</span>
            <span className="text-2xl font-black text-[#ccff00]">SIZE {recommendedSize}</span>
          </div>
          <div className="text-right text-[11px] text-neutral-400">
            <div>Drape: <strong className="text-white capitalize">{fitPreference}</strong></div>
            <div className="text-[10px] text-neutral-500">Guides new item selections</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="w-full py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs uppercase tracking-widest brutal-shadow transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span>SET ACTIVE SHOPPING SIZE TO {recommendedSize}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
