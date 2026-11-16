import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, RotateCcw, Volume2, Award, Zap, Activity } from 'lucide-react';

const TEST_PHRASES = [
  "Precision CNC 6063 aerospace aluminum with gasket isolation yields pure acoustic bottom out feedback.",
  "Custom mechanical switches lubricated with Krytox two zero five grade zero produce rich deep thocks.",
  "High polling rate microcontrollers paired with hot swap PCBs guarantee zero latency competitive response."
];

export default function InPageTypingTestArena() {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [switchSound, setSwitchSound] = useState('thock'); // thock, pop, click
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);

  const audioCtxRef = useRef(null);
  const targetPhrase = TEST_PHRASES[activePhraseIndex];

  // Play synthesized keystroke sound on keypress
  const playSwitchAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current && AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state === 'suspended') ctx.resume();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      if (switchSound === 'thock') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.07);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      } else if (switchSound === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.06);
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1100, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.38, now + 0.003);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      } else {
        // click
        osc.type = 'square';
        osc.frequency.setValueAtTime(1900, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.04);
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.28, now + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      }

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      // AudioContext handling
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    playSwitchAudio();

    if (!startTime) {
      setStartTime(Date.now());
    }

    setUserInput(val);

    // Calculate real-time WPM
    const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;
    if (elapsedMinutes > 0) {
      const wordsTyped = val.trim().split(/\s+/).length;
      setWpm(Math.round(wordsTyped / elapsedMinutes));
    }

    // Calculate accuracy
    let errors = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== targetPhrase[i]) errors++;
    }
    const acc = val.length > 0 ? Math.max(0, Math.round(((val.length - errors) / val.length) * 100)) : 100;
    setAccuracy(acc);

    if (val.length >= targetPhrase.length) {
      setIsCompleted(true);
    }
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    setActivePhraseIndex((prev) => (prev + 1) % TEST_PHRASES.length);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#20242c] bg-[#0c0e12] font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181c22] border border-[#ff5722]/40 text-[#ff5722] text-xs font-bold uppercase mb-2">
              <Terminal className="w-3.5 h-3.5" /> LIVE IN-PAGE KEYSTROKE ACOUSTIC ARENA
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase text-white tracking-tight">
              Tactile WPM & Thock Benchmark
            </h2>
          </div>
          <div className="text-xs text-neutral-400">
            AUDIO ENGINE: <strong className="text-white">WEB AUDIO 0ms LATENCY SYNTHESIS</strong>
          </div>
        </div>

        {/* Interactive Typing Test Container */}
        <div className="bg-[#12151b] border-2 border-[#20252e] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#20242c] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 uppercase">Stem Sound Profile:</span>
              <div className="flex gap-1.5">
                {[
                  { id: 'thock', label: 'Linear (Deep Thock)' },
                  { id: 'pop', label: 'Tactile (Crisp Pop)' },
                  { id: 'click', label: 'Clicky (Sharp Snap)' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSwitchSound(s.id);
                      playSwitchAudio();
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition uppercase ${
                      switchSound === s.id
                        ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/30'
                        : 'bg-[#181c22] text-neutral-400 hover:text-white border border-[#2b303c]'
                    }`}
                  >
                    {s.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Scorecard telemetry */}
            <div className="flex items-center gap-6 text-xs">
              <div>
                <span className="text-neutral-500 uppercase block text-[10px]">SPEED</span>
                <span className="text-2xl font-black text-white">{wpm} <span className="text-xs font-normal text-neutral-400">WPM</span></span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase block text-[10px]">ACCURACY</span>
                <span className="text-2xl font-black text-emerald-400">{accuracy}%</span>
              </div>
              <button
                onClick={resetTest}
                className="p-2 rounded bg-[#181c22] border border-[#2b303c] text-neutral-300 hover:text-white"
                title="Reset or Change Test Sentence"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Target Phrase Display with Highlight */}
          <div className="p-6 bg-[#0a0c0f] border border-[#20252e] rounded-xl text-lg sm:text-xl leading-relaxed select-none">
            {targetPhrase.split('').map((char, index) => {
              let color = 'text-neutral-600';
              let bg = '';
              if (index < userInput.length) {
                if (userInput[index] === char) {
                  color = 'text-[#ff5722] font-bold';
                } else {
                  color = 'text-rose-400 font-bold';
                  bg = 'bg-rose-950/40';
                }
              } else if (index === userInput.length) {
                bg = 'bg-[#ff5722]/30 text-white animate-pulse';
              }
              return (
                <span key={index} className={`${color} ${bg}`}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* User Input Field */}
          <div>
            <textarea
              rows={3}
              value={userInput}
              onChange={handleInputChange}
              disabled={isCompleted}
              placeholder="Click here and begin typing to trigger mechanical switch acoustics in real-time..."
              className="w-full bg-[#0a0c0f] border-2 border-[#2b303c] focus:border-[#ff5722] p-4 rounded-xl text-white outline-none resize-none text-base placeholder:text-neutral-600 font-mono transition"
            />
          </div>

          {isCompleted && (
            <div className="p-5 bg-emerald-950/40 border border-emerald-500/50 rounded-xl space-y-3 text-xs font-mono text-emerald-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    Benchmark Complete! Speed: <strong>{wpm} WPM</strong> &bull; Accuracy: <strong>{accuracy}%</strong>.
                  </span>
                </div>
                <button
                  onClick={resetTest}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase rounded cursor-pointer self-start sm:self-auto"
                >
                  Retake Benchmark
                </button>
              </div>

              {/* Connected Ergonomic Product Recommendation */}
              <div className="p-3 bg-[#0a0c0f] border border-emerald-800/60 rounded-lg text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest block font-bold">
                    TAILORED HARDWARE RECOMMENDATION:
                  </span>
                  <div className="text-xs font-bold text-neutral-200 mt-0.5">
                    {wpm >= 75
                      ? 'High-Velocity Profile → Linear (55g) + Polycarbonate (Deep Thock) Plate'
                      : 'Tactile Cadence Profile → Tactile (62g) + Solid Brass (Crisp Clack) Plate'}
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    {wpm >= 75
                      ? 'Smooth zero-friction travel minimizes finger fatigue during rapid typing bursts.'
                      : 'Defined actuation bump provides tactile feedback to reinforce keystroke confidence.'}
                  </span>
                </div>
                <a
                  href="#chassis-catalog"
                  className="px-4 py-2 rounded bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold text-xs uppercase tracking-wider shrink-0"
                >
                  Configure In Catalog
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
