import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, Sparkles, Sliders, Play, Disc, Activity, Layers, Keyboard } from 'lucide-react';

export default function KeystrokeSynthesizerModal({ isOpen, onClose }) {
  const [switchProfile, setSwitchProfile] = useState('linear'); // linear, tactile, clicky
  const [lubeLevel, setLubeLevel] = useState(85); // 0 (dry) to 100 (overlubed)
  const [springWeight, setSpringWeight] = useState(55); // grams
  const [lastKeyPressed, setLastKeyPressed] = useState('SPACE');
  const [wpmCounter, setWpmCounter] = useState(0);
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Initialize Web Audio Context safely on user gesture
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Sound synthesis engine using pure Web Audio API
  const playSynthesizedKeystroke = (keyLabel = 'KEY') => {
    setLastKeyPressed(keyLabel);
    setKeystrokeCount(prev => prev + 1);

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Base pitch depends on spring weight
    const baseFreq = 140 + (springWeight - 45) * 1.5;

    if (switchProfile === 'linear') {
      // Deep "Thock" sound: low pitch, rapid attack, warm dampening
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, now + 0.08);

      // Low pass filter mimics thick POM/PC housing
      filter.type = 'lowpass';
      const cutoff = 600 + (100 - lubeLevel) * 12;
      filter.frequency.setValueAtTime(cutoff, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (switchProfile === 'tactile') {
      // Tactile "Pop": initial tactile bump click + housing bottom-out
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * 2.2, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.07);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, now);
      filter.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else {
      // Clicky "Snap": sharp high-frequency mechanical leaf snap
      osc.type = 'square';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.05);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1200, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    }

    // Trigger visual pulse on canvas
    drawWaveform();
  };

  // Visual Oscilloscope pulse
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    c.clearRect(0, 0, w, h);
    c.beginPath();
    c.strokeStyle = switchProfile === 'linear' ? '#ff5722' : switchProfile === 'tactile' ? '#38bdf8' : '#eab308';
    c.lineWidth = 2.5;

    const points = 40;
    const midY = h / 2;
    for (let i = 0; i < points; i++) {
      const x = (i / (points - 1)) * w;
      const decay = Math.exp(-i / 8);
      const amp = (h * 0.42) * decay;
      const freqMultiplier = switchProfile === 'clicky' ? 1.4 : switchProfile === 'tactile' ? 0.9 : 0.6;
      const y = midY + Math.sin(i * freqMultiplier) * amp * (Math.random() * 0.4 + 0.8);
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.stroke();
  };

  // Keyboard listener when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Avoid interference if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      playSynthesizedKeystroke(e.key.toUpperCase());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, switchProfile, lubeLevel, springWeight]);

  // Initial canvas line
  useEffect(() => {
    if (isOpen) {
      drawWaveform();
    }
  }, [isOpen, switchProfile]);

  if (!isOpen) return null;

  const virtualKeys = [
    ['ESC', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'BACK'],
    ['TAB', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'],
    ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', 'SHIFT'],
    ['CTRL', 'ALT', 'SPACE', 'ALT', 'FN', 'CTRL']
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="synth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-mono"
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#0e1116] border-2 border-[#ff5722] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-white">
        {/* Header */}
        <div className="bg-[#181d24] px-6 py-4 border-b border-[#262b34] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-5 h-5 text-[#ff5722] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              SYNTH-THOCK V2.4 // Web Audio Keystroke Synthesizer
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Top Oscilloscope & Telemetry */}
          <div className="bg-[#14181f] border border-[#262b34] rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#ff5722]" /> REAL-TIME FREQUENCY HARMONICS
                </span>
                <span className="text-[#ff5722] font-bold">
                  LAST STEM TRIGGER: [{lastKeyPressed}]
                </span>
              </div>
              <canvas
                ref={canvasRef}
                width={500}
                height={70}
                className="w-full h-16 bg-[#0a0c0f] border border-[#20252e] rounded-lg"
              />
            </div>

            <div className="bg-[#0a0c0f] border border-[#20252e] p-4 rounded-lg space-y-2 text-xs">
              <div className="text-neutral-500 text-[10px] uppercase">ACOUSTIC TELEMETRY</div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Keystroke Count:</span>
                <span className="font-bold text-white">{keystrokeCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Peak Resonance:</span>
                <span className="font-bold text-[#ff5722]">
                  {switchProfile === 'linear' ? '184 Hz (Deep Thock)' : switchProfile === 'tactile' ? '320 Hz (Crisp Pop)' : '2.1 kHz (Click)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Damping:</span>
                <span className="font-bold text-emerald-400">Poron Sub-PCB 3.5mm</span>
              </div>
            </div>
          </div>

          {/* Controls: Profile, Lube, Spring */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Switch Profile */}
            <div className="bg-[#14181f] border border-[#262b34] p-4 rounded-xl">
              <label className="text-xs font-bold text-neutral-300 uppercase block mb-3">
                Stem Acoustic Profile
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'linear', label: 'Linear', desc: 'Thock' },
                  { id: 'tactile', label: 'Tactile', desc: 'Pop' },
                  { id: 'clicky', label: 'Clicky', desc: 'Snap' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSwitchProfile(p.id);
                      playSynthesizedKeystroke(p.label);
                    }}
                    className={`p-2 rounded text-center transition ${
                      switchProfile === p.id
                        ? 'bg-[#ff5722] text-white font-bold shadow-md shadow-[#ff5722]/30'
                        : 'bg-[#0a0c0f] text-neutral-400 hover:text-white border border-[#262b34]'
                    }`}
                  >
                    <div className="text-xs">{p.label}</div>
                    <div className="text-[10px] opacity-75">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Lubrication */}
            <div className="bg-[#14181f] border border-[#262b34] p-4 rounded-xl">
              <div className="flex justify-between text-xs mb-3">
                <span className="font-bold text-neutral-300 uppercase">Stem Lubrication</span>
                <span className="text-[#ff5722] font-bold">{lubeLevel}% Krytox 205g0</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={lubeLevel}
                onChange={(e) => setLubeLevel(Number(e.target.value))}
                className="w-full accent-[#ff5722] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 mt-2">
                <span>Bone Dry (Scratchy)</span>
                <span>Buttery Smooth</span>
              </div>
            </div>

            {/* Spring Weight */}
            <div className="bg-[#14181f] border border-[#262b34] p-4 rounded-xl">
              <div className="flex justify-between text-xs mb-3">
                <span className="font-bold text-neutral-300 uppercase">Spring Weight</span>
                <span className="text-[#ff5722] font-bold">{springWeight}g Bottom-Out</span>
              </div>
              <input
                type="range"
                min="45"
                max="80"
                value={springWeight}
                onChange={(e) => setSpringWeight(Number(e.target.value))}
                className="w-full accent-[#ff5722] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 mt-2">
                <span>45g (Feather)</span>
                <span>80g (Heavy Vintage)</span>
              </div>
            </div>
          </div>

          {/* Interactive Virtual Mechanical Keyboard */}
          <div className="bg-[#0b0d11] border-2 border-[#262b34] p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Keyboard className="w-4 h-4 text-[#ff5722]" />
                <span>INTERACTIVE 65% MECHANICAL MATRIX (PRESS KEYS OR USE PHYSICAL KEYBOARD)</span>
              </div>
              <span className="text-[10px] text-neutral-500 hidden sm:inline">
                LATENCY: &lt;1.2ms (WEB AUDIO RUNTIME)
              </span>
            </div>

            <div className="space-y-1.5">
              {virtualKeys.map((row, rowIdx) => (
                <div key={rowIdx} className="flex justify-center gap-1.5">
                  {row.map((keyName, kIdx) => {
                    const isSpace = keyName === 'SPACE';
                    const isShift = keyName === 'SHIFT';
                    const isEnter = keyName === 'ENTER';
                    const isBack = keyName === 'BACK';
                    const isActive = lastKeyPressed === keyName;

                    let widthClass = 'w-10 sm:w-12';
                    if (isSpace) widthClass = 'w-48 sm:w-64';
                    else if (isShift || isEnter) widthClass = 'w-16 sm:w-20';
                    else if (isBack) widthClass = 'w-14 sm:w-16';

                    return (
                      <button
                        key={kIdx}
                        onClick={() => playSynthesizedKeystroke(keyName)}
                        className={`h-10 sm:h-11 rounded-lg border text-xs font-bold transition-all transform active:scale-95 ${widthClass} ${
                          isActive
                            ? 'bg-[#ff5722] border-[#ff5722] text-white shadow-lg shadow-[#ff5722]/50 translate-y-0.5'
                            : 'bg-[#181c22] border-[#2c323d] text-neutral-300 hover:border-[#ff5722] hover:text-white'
                        }`}
                      >
                        {keyName}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
