import React, { useState } from 'react';
import { Volume2, Play, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';
import { SWITCH_TYPES } from '../data/keyboardData';
import { playSwitchKeystroke } from '../utils/keyboardAudio';

export default function SwitchSoundTester() {
  const [activeSwitch, setActiveSwitch] = useState(SWITCH_TYPES[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySound = (sw) => {
    setActiveSwitch(sw);
    setIsPlaying(true);
    playSwitchKeystroke(sw.id, 0.45);
    setTimeout(() => setIsPlaying(false), 600);
  };

  return (
    <section id="sound-tester" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#20242c] bg-[#101216]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1a1e24] border border-[#ff5722]/50 text-xs font-mono text-[#ff5722] mb-3">
            <Volume2 className="w-3.5 h-3.5" /> LABORATORY ACOUSTIC ANALYSIS
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            Switch Acoustic Engine
          </h2>
          <p className="mt-2 text-xs font-mono text-neutral-400 max-w-xl mx-auto">
            Test the acoustic resonance of pre-lubed mechanical switches. Decoupled Poron gaskets absorb high-frequency ping, isolating the pure acoustic "thock" of each switch stem.
          </p>
        </div>

        {/* Interactive Sound Station */}
        <div className="max-w-4xl mx-auto bg-[#181c22] border-2 border-[#262b34] rounded-2xl p-6 sm:p-10 shadow-2xl">
          {/* Switch Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {SWITCH_TYPES.map((sw) => (
              <button
                key={sw.id}
                onClick={() => handlePlaySound(sw)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeSwitch.id === sw.id
                    ? 'bg-[#101216] border-[#ff5722] shadow-lg shadow-[#ff5722]/15 ring-1 ring-[#ff5722]'
                    : 'bg-[#12151a] border-[#262b34] text-neutral-400 hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-xs">{sw.name}</span>
                  {activeSwitch.id === sw.id && (
                    <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-ping" />
                  )}
                </div>
                <div className="text-[#ff5722] text-[11px] font-bold">{sw.soundType}</div>
                <div className="text-[10px] text-neutral-500 mt-1">{sw.force}</div>
              </button>
            ))}
          </div>

          {/* Sound Wave Visualization & Keystroke Trigger Box */}
          <div className="p-8 bg-[#101216] border border-[#262b34] rounded-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Animated SVG Harmonic Frequency Wave */}
            <div className="w-full max-w-md h-24 flex items-center justify-center gap-1.5 mb-6">
              {[40, 65, 85, 100, 75, 55, 90, 45, 80, 60, 95, 50, 70, 85, 40].map((h, i) => (
                <div
                  key={i}
                  className={`w-2 rounded-full transition-all duration-300 ${
                    isPlaying
                      ? 'bg-[#ff5722] animate-pulse'
                      : 'bg-neutral-700'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, h * (Math.random() * 0.6 + 0.6))}%` : '20%'
                  }}
                />
              ))}
            </div>

            <div className="font-mono text-xs text-neutral-300 mb-2">
              ACTIVE ACOUSTIC: <span className="text-[#ff5722] font-bold">{activeSwitch.soundType}</span>
            </div>
            <p className="text-[11px] font-mono text-neutral-500 max-w-md mb-6">
              {activeSwitch.description}
            </p>

            <button
              onClick={() => handlePlaySound(activeSwitch)}
              className="px-8 py-3.5 rounded bg-[#ff5722] hover:bg-[#f4511e] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#ff5722]/30 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isPlaying ? "Simulating Keystroke..." : "Trigger Keystroke Acoustic"}</span>
            </button>

            <div className="mt-6 pt-4 border-t border-[#262b34] w-full flex justify-between text-[11px] font-mono text-neutral-500">
              <span>FREQUENCY PEAK: {activeSwitch.frequencyHz}</span>
              <span>DAMPENING: Poron Gasket Isolation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
