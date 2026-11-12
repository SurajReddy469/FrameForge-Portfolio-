import React from 'react';
import { Modal } from '../common/Modal';
import { useGameStore } from '../../store/useGameStore';
import { Volume2, VolumeX, Gauge, Zap, RotateCcw, Sun, Moon, Flame } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setSettingsOpen,
    settings,
    updateSettings,
    setDataset,
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
        {/* Dataset Selection */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-bold text-slate-900">Player & Franchise Dataset</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {settings.dataset === 'fictional' ? 'Fictional' : '🔥 Live Real IPL'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDataset('real')}
              className={`p-3 rounded-lg text-left transition-all flex flex-col gap-1 ${
                settings.dataset !== 'fictional'
                  ? 'bg-emerald-600 text-white shadow-md font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-black">
                <span>🔥 Real IPL 2025 Dataset</span>
              </div>
              <span className={`text-[11px] leading-tight ${settings.dataset !== 'fictional' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Kohli, Dhoni, Rohit, Pant, Klaasen, Bumrah & 10 Official Franchises (CSK, MI, RCB...)
              </span>
            </button>
            <button
              onClick={() => setDataset('fictional')}
              className={`p-3 rounded-lg text-left transition-all flex flex-col gap-1 ${
                settings.dataset === 'fictional'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-black">
                <span>🛡️ Fictional League</span>
              </div>
              <span className={`text-[11px] leading-tight ${settings.dataset === 'fictional' ? 'text-slate-900' : 'text-slate-500'}`}>
                Original fictional cricket stars (Arjun Sharma, Zane Montgomery, Meteors, Chargers...)
              </span>
            </button>
          </div>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Sound Effects</span>
              <span className="text-xs text-slate-500">Synthesized gavels, crowd sounds & ticks</span>
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
              className={`py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                settings.theme === 'day'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-700" />
              <span>☀️ Day Match (Default)</span>
            </button>
            <button
              onClick={() => updateSettings({ theme: 'night' })}
              className={`py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                settings.theme === 'night'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              <Moon className="w-4 h-4 text-slate-600" />
              <span>🌙 Night Floodlights</span>
            </button>
          </div>
        </div>

        {/* Auction Timer Speed */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-bold text-slate-900">Bidding Countdown Speed</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['slow', 'standard', 'fast'] as const).map(speed => (
              <button
                key={speed}
                onClick={() => updateSettings({ timerSpeed: speed })}
                className={`py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
                  settings.timerSpeed === speed
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                {speed === 'slow' ? 'Slow (15s)' : speed === 'standard' ? 'Standard (10s)' : 'Turbo (5s)'}
              </button>
            ))}
          </div>
        </div>

        {/* AI Aggression Level */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-slate-900">AI Bidding Competitiveness</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['chill', 'balanced', 'ruthless'] as const).map(agg => (
              <button
                key={agg}
                onClick={() => updateSettings({ aiAggression: agg })}
                className={`py-2 px-3 rounded-lg text-xs font-bold capitalize transition-all ${
                  settings.aiAggression === agg
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                {agg === 'chill' ? 'Relaxed' : agg === 'balanced' ? 'Balanced' : 'Ruthless Wars'}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Game Data */}
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-red-800 block">Reset Career & Save Data</span>
            <span className="text-xs text-slate-500">Clears trophies, profile stats & restores fresh start</span>
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
                resetAllGameData();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 border border-red-300 text-xs font-bold text-red-800 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <button
          onClick={() => setSettingsOpen(false)}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-800 border border-slate-200 transition-colors shadow-sm"
        >
          Close Settings
        </button>
      </div>
    </Modal>
  );
};
