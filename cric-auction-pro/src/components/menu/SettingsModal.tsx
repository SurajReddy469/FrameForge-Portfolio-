import React from 'react';
import { Modal } from '../common/Modal';
import { useGameStore } from '../../store/useGameStore';
import { Volume2, VolumeX, Gauge, Zap, RotateCcw, Sun, Moon, ShieldCheck } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setSettingsOpen,
    settings,
    updateSettings,
    resetAllGameData,
  } = useGameStore();

  return (
    <Modal
      isOpen={isSettingsOpen}
      onClose={() => setSettingsOpen(false)}
      title="Game Settings"
      subtitle="Customize Auction Speed, Audio & AI Behavior"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Active Dataset Info */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <div>
                <span className="text-sm font-black text-slate-900 block">Authentic IPL 2025 Tournament Roster</span>
                <span className="text-xs text-slate-600">10 Official Franchises &bull; 112+ Real International Stars</span>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 shadow-sm">
              REAL DATASET
            </span>
          </div>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Game Sound FX</span>
              <span className="text-xs text-slate-500">Hammer gavels, crowd roars & boundary sirens</span>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.soundEnabled ? 'bg-amber-500' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Stadium Theme Mode */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Sun className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-slate-900">Stadium Environment Theme</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => updateSettings({ theme: 'day' })}
              className={`p-3 rounded-lg text-left transition-all flex items-center justify-between ${
                settings.theme === 'day'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <span className="text-xs font-black">Day Match (Clean Light)</span>
              </div>
              {settings.theme === 'day' && <span>✓</span>}
            </button>
            <button
              onClick={() => updateSettings({ theme: 'night' })}
              className={`p-3 rounded-lg text-left transition-all flex items-center justify-between ${
                settings.theme === 'night'
                  ? 'bg-slate-900 text-white shadow-md font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                <span className="text-xs font-black">Night Match (Floodlights)</span>
              </div>
              {settings.theme === 'night' && <span>✓</span>}
            </button>
          </div>
        </div>

        {/* Auction Speed */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-slate-900">Bidding Clock Pace</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['slow', 'standard', 'fast'] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => updateSettings({ timerSpeed: spd })}
                className={`py-2 px-3 rounded-lg text-xs font-bold capitalize transition-colors ${
                  settings.timerSpeed === spd
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {spd === 'slow' ? 'Relaxed (1.5s)' : spd === 'standard' ? 'Standard (1.0s)' : 'Blitz (0.5s)'}
              </button>
            ))}
          </div>
        </div>

        {/* AI Bidding Aggression */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-slate-900">Franchise AI Intelligence</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['chill', 'balanced', 'ruthless'] as const).map((agg) => (
              <button
                key={agg}
                onClick={() => updateSettings({ aiAggression: agg })}
                className={`py-2 px-3 rounded-lg text-xs font-bold capitalize transition-colors ${
                  settings.aiAggression === agg
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {agg === 'chill' ? 'Casual' : agg === 'balanced' ? 'Balanced' : 'Hardcore War'}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Progress */}
        <div className="pt-2 border-t border-slate-200">
          <button
            onClick={() => {
              if (window.confirm('Reset current career and start fresh with ₹120.00 Cr?')) {
                resetAllGameData();
                setSettingsOpen(false);
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Career & New Mega Auction</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
