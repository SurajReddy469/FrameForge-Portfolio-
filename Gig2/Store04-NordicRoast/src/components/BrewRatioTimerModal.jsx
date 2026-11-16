import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Coffee, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BrewRatioTimerModal({ isOpen, onClose, selectedCoffee }) {
  const [method, setMethod] = useState('v60');
  const [doseGrams, setDoseGrams] = useState(18);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  if (!isOpen) return null;

  const METHODS = {
    v60: { name: 'Hario V60', ratio: 16, temp: '93°C (200°F)', grind: 'Medium-Fine', timeTarget: 210 },
    chemex: { name: 'Chemex', ratio: 15, temp: '94°C (202°F)', grind: 'Medium-Coarse', timeTarget: 240 },
    aeropress: { name: 'AeroPress', ratio: 12, temp: '88°C (190°F)', grind: 'Fine-Medium', timeTarget: 120 },
    frenchpress: { name: 'French Press', ratio: 14, temp: '95°C (204°F)', grind: 'Coarse', timeTarget: 270 }
  };

  const currentMethod = METHODS[method];
  const waterGrams = Math.round(doseGrams * currentMethod.ratio);
  const bloomGrams = Math.round(doseGrams * 2.5);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleReset = () => {
    setIsActive(false);
    setTimerSeconds(0);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brew-timer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-mono"
    >
      <div className="fixed inset-0 bg-[#1c120c]/75 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg bg-[#fcfaf7] border-2 border-[#2b1d14] rounded-2xl p-6 sm:p-8 z-10 text-[#2b1d14] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8c7462] hover:text-[#2b1d14] p-1 cursor-pointer"
          aria-label="Close brew timer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#8c7462] uppercase tracking-wider">
          <Coffee className="w-4 h-4 text-[#2b1d14]" />
          <span>PRECISION EXTRACTION SUITE</span>
        </div>
        <h3 id="brew-timer-title" className="font-serif text-2xl font-bold text-[#2b1d14] mb-1">
          Barista Ratio & Pour Timer
        </h3>
        <p className="text-xs text-[#594637] mb-6">
          Calibrated for <strong className="text-[#2b1d14]">{selectedCoffee?.name || 'Single-Origin Nordic Roast'}</strong>.
        </p>

        {/* Method Selector */}
        <div className="grid grid-cols-4 gap-1.5 mb-6 text-xs">
          {Object.keys(METHODS).map((mKey) => (
            <button
              key={mKey}
              type="button"
              onClick={() => { setMethod(mKey); handleReset(); }}
              className={`py-2 px-1 rounded border text-center transition cursor-pointer ${
                method === mKey
                  ? 'bg-[#2b1d14] text-white border-[#2b1d14] font-bold'
                  : 'bg-white text-[#594637] border-[#ebdcc7] hover:border-[#2b1d14]'
              }`}
            >
              {METHODS[mKey].name}
            </button>
          ))}
        </div>

        {/* Ratio Parameters Card */}
        <div className="p-4 bg-white rounded-xl border border-[#ebdcc7] mb-6 space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-[#8c7462]">Coffee Dose:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDoseGrams(Math.max(12, doseGrams - 1))}
                className="w-6 h-6 rounded bg-[#f2e9dc] hover:bg-[#ebdcc7] font-bold"
              >
                -
              </button>
              <span className="font-bold text-[#2b1d14] w-10 text-center">{doseGrams}g</span>
              <button
                type="button"
                onClick={() => setDoseGrams(Math.min(35, doseGrams + 1))}
                className="w-6 h-6 rounded bg-[#f2e9dc] hover:bg-[#ebdcc7] font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-[#8c7462]">Water Yield (1:{currentMethod.ratio}):</span>
            <span className="font-bold text-[#2b1d14]">{waterGrams}g ({waterGrams}ml)</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#8c7462]">Bloom Phase (45s):</span>
            <span className="font-bold text-amber-900">{bloomGrams}g water</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#8c7462]">Water Temperature:</span>
            <span className="font-bold text-[#2b1d14]">{currentMethod.temp}</span>
          </div>
        </div>

        {/* Stopwatch Timer Display */}
        <div className="p-6 bg-[#2b1d14] text-[#fcfaf7] rounded-xl text-center mb-6">
          <div className="text-4xl font-bold tracking-widest font-mono mb-1">
            {formatTime(timerSeconds)}
          </div>
          <div className="text-[10px] text-[#ebdcc7] uppercase">
            TARGET DWELL: {Math.floor(currentMethod.timeTarget / 60)}:{(currentMethod.timeTarget % 60).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Stopwatch Controls */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className="flex-1 py-3.5 rounded-xl bg-[#2b1d14] hover:bg-[#3d2a1d] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause Pour' : 'Start Pour Timer'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-3.5 rounded-xl bg-white border border-[#ebdcc7] text-[#2b1d14] hover:bg-[#f2e9dc] cursor-pointer"
            title="Reset timer"
            aria-label="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
