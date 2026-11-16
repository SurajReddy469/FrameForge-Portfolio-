import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, RotateCw, Play, Pause, RefreshCw, Eye, Award, Sparkles } from 'lucide-react';

export default function InteractiveTourbillonCaliber() {
  const [time, setTime] = useState(new Date());
  const [isChronoRunning, setIsChronoRunning] = useState(false);
  const [chronoElapsedMs, setChronoElapsedMs] = useState(0);
  const [isSkeletonFlipped, setIsSkeletonFlipped] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const audioCtxRef = useRef(null);
  const chronoTimerRef = useRef(null);
  const lastChronoTimeRef = useRef(null);

  // Sync real-time clock smoothly at ~60fps for sweeping second hand
  useEffect(() => {
    let animId;
    const updateTime = () => {
      setTime(new Date());
      animId = requestAnimationFrame(updateTime);
    };
    animId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Chronograph timer loop
  useEffect(() => {
    if (isChronoRunning) {
      lastChronoTimeRef.current = performance.now();
      chronoTimerRef.current = setInterval(() => {
        const now = performance.now();
        const delta = now - lastChronoTimeRef.current;
        lastChronoTimeRef.current = now;
        setChronoElapsedMs(prev => prev + delta);
      }, 30);
    } else {
      clearInterval(chronoTimerRef.current);
    }
    return () => clearInterval(chronoTimerRef.current);
  }, [isChronoRunning]);

  // Web Audio Escapement Tick-Tock Generator (28,800 vph / 4 ticks per second)
  useEffect(() => {
    if (!isAudioEnabled) return;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!audioCtxRef.current && AudioCtx) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    const interval = setInterval(() => {
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;
      // High-frequency subtle mechanical escapement pallet click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.015);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    }, 250); // 4Hz = 28,800 vph

    return () => clearInterval(interval);
  }, [isAudioEnabled]);

  // Real-time hand angles
  const ms = time.getMilliseconds();
  const seconds = time.getSeconds() + ms / 1000;
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  const hourAngle = hours * 30; // 360 / 12
  const minuteAngle = minutes * 6; // 360 / 60
  const secondAngle = seconds * 6; // 360 / 60

  // Chrono subdial angles
  const chronoSeconds = (chronoElapsedMs / 1000) % 60;
  const chronoMinutes = (chronoElapsedMs / 60000) % 30;
  const chronoSecondAngle = chronoSeconds * 6;
  const chronoMinuteAngle = chronoMinutes * 12;

  const handleResetChrono = () => {
    setIsChronoRunning(false);
    setChronoElapsedMs(0);
  };

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center select-none font-mono">
      {/* 3D Perspective Card Wrapper */}
      <div
        className="relative w-80 sm:w-96 aspect-square transition-transform duration-700 [transform-style:preserve-3d]"
        style={{
          transform: isSkeletonFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* ================= FRONT: WATCH DIAL ================= */}
        <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/60 bg-gradient-to-br from-[#12141a] via-[#090a0c] to-[#040507] p-4 shadow-2xl [backface-visibility:hidden] flex items-center justify-center">
          {/* Outer Sunburst & Tachymeter Bezel */}
          <div className="absolute inset-2 rounded-full border border-[#d4af37]/25 pointer-events-none" />

          {/* SVG Dial with Real-Time Swiss Caliber */}
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <defs>
              <radialGradient id="dialGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#181a20" />
                <stop offset="70%" stopColor="#0b0c0f" />
                <stop offset="100%" stopColor="#050608" />
              </radialGradient>
              <linearGradient id="goldHand" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff3b0" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#8a6d1a" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Base Dial Circle */}
            <circle cx="200" cy="200" r="185" fill="url(#dialGrad)" stroke="#22252d" strokeWidth="2" />

            {/* Minute Markers (60 ticks) */}
            {Array.from({ length: 60 }).map((_, i) => {
              const isMajor = i % 5 === 0;
              const angle = i * 6 * (Math.PI / 180);
              const r1 = 175;
              const r2 = isMajor ? 160 : 168;
              const x1 = 200 + r1 * Math.sin(angle);
              const y1 = 200 - r1 * Math.cos(angle);
              const x2 = 200 + r2 * Math.sin(angle);
              const y2 = 200 - r2 * Math.cos(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? '#d4af37' : '#555a66'}
                  strokeWidth={isMajor ? 2.5 : 1}
                />
              );
            })}

            {/* Hour Roman/Index Markers */}
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => {
              const angle = h * 30 * (Math.PI / 180);
              const r = 146;
              const x = 200 + r * Math.sin(angle);
              const y = 200 - r * Math.cos(angle) + 4;
              return (
                <text
                  key={h}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#d4af37"
                  fontSize={h === 12 ? "14" : "11"}
                  fontWeight="bold"
                  letterSpacing="1"
                  className="font-serif select-none"
                >
                  {h === 12 ? 'XII' : h === 3 ? 'III' : h === 9 ? 'IX' : '•'}
                </text>
              );
            })}

            {/* Brand Signature */}
            <text x="200" y="105" textAnchor="middle" fill="#d4af37" fontSize="11" fontWeight="bold" letterSpacing="4">
              VANGUARD
            </text>
            <text x="200" y="118" textAnchor="middle" fill="#888c99" fontSize="6.5" letterSpacing="3">
              GENÈVE &bull; CHRONOMETRE
            </text>

            {/* Chronograph Left Subdial (30 Minutes) */}
            <g transform="translate(130, 200)">
              <circle cx="0" cy="0" r="32" fill="#0c0d11" stroke="#d4af37" strokeWidth="1" opacity="0.7" />
              <text x="0" y="-12" textAnchor="middle" fill="#888" fontSize="6">30 MIN</text>
              {/* Chrono Min Hand */}
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-24"
                stroke="#d4af37"
                strokeWidth="1.5"
                transform={`rotate(${chronoMinuteAngle})`}
              />
              <circle cx="0" cy="0" r="3" fill="#d4af37" />
            </g>

            {/* Chronograph Right Subdial (Seconds Counter) */}
            <g transform="translate(270, 200)">
              <circle cx="0" cy="0" r="32" fill="#0c0d11" stroke="#d4af37" strokeWidth="1" opacity="0.7" />
              <text x="0" y="-12" textAnchor="middle" fill="#888" fontSize="6">60 SEC</text>
              {/* Chrono Sec Hand */}
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-24"
                stroke="#d4af37"
                strokeWidth="1.5"
                transform={`rotate(${chronoSecondAngle})`}
              />
              <circle cx="0" cy="0" r="3" fill="#d4af37" />
            </g>

            {/* ================= 6 O'CLOCK: FLYING TOURBILLON ================= */}
            <g transform="translate(200, 280)">
              {/* Tourbillon Aperture Hole */}
              <circle cx="0" cy="0" r="44" fill="#050608" stroke="#d4af37" strokeWidth="2" />

              {/* Escapement Balance Wheel with Fast Harmonic Oscillation */}
              <g
                style={{
                  transformOrigin: '0px 0px',
                  animation: 'spin 1.5s linear infinite'
                }}
              >
                <circle cx="0" cy="0" r="34" fill="none" stroke="#e0c266" strokeWidth="2.5" strokeDasharray="8 6" />
                <line x1="-34" y1="0" x2="34" y2="0" stroke="#e0c266" strokeWidth="2" />
                <line x1="0" y1="-34" x2="0" y2="34" stroke="#e0c266" strokeWidth="2" />
                {/* Balance Weights */}
                <circle cx="24" cy="0" r="2.5" fill="#d4af37" />
                <circle cx="-24" cy="0" r="2.5" fill="#d4af37" />
                <circle cx="0" cy="24" r="2.5" fill="#d4af37" />
                <circle cx="0" cy="-24" r="2.5" fill="#d4af37" />
              </g>

              {/* Synthetic Ruby Jewel Center */}
              <circle cx="0" cy="0" r="5" fill="#c026d3" stroke="#d4af37" strokeWidth="1" />
              <text x="0" y="40" textAnchor="middle" fill="#d4af37" fontSize="5.5" letterSpacing="1.5">
                TOURBILLON
              </text>
            </g>

            {/* ================= REAL-TIME HANDS ================= */}
            {/* Hour Hand */}
            <g transform={`rotate(${hourAngle} 200 200)`}>
              <polygon points="196,215 197,105 200,90 203,105 204,215" fill="url(#goldHand)" filter="url(#glow)" />
              <line x1="200" y1="110" x2="200" y2="190" stroke="#8a6d1a" strokeWidth="1" />
            </g>

            {/* Minute Hand */}
            <g transform={`rotate(${minuteAngle} 200 200)`}>
              <polygon points="197,220 198,60 200,45 202,60 203,220" fill="url(#goldHand)" filter="url(#glow)" />
              <line x1="200" y1="65" x2="200" y2="200" stroke="#8a6d1a" strokeWidth="1" />
            </g>

            {/* High-Beat Continuous Sweeping Second Hand (Blued Steel / Gold Accent) */}
            <g transform={`rotate(${secondAngle} 200 200)`}>
              <line x1="200" y1="235" x2="200" y2="38" stroke="#38bdf8" strokeWidth="1.8" />
              <circle cx="200" cy="235" r="4.5" fill="#38bdf8" />
              <circle cx="200" cy="55" r="3" fill="#d4af37" />
            </g>

            {/* Center Cap Nut */}
            <circle cx="200" cy="200" r="6" fill="#181a20" stroke="#d4af37" strokeWidth="2" />
            <circle cx="200" cy="200" r="2" fill="#d4af37" />
          </svg>
        </div>

        {/* ================= BACK: SAPPHIRE CASEBACK SKELETON ================= */}
        <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/60 bg-[#07080a] p-4 shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center">
          {/* Engraved Caseback Ring */}
          <div className="absolute inset-2 rounded-full border border-[#d4af37]/30 pointer-events-none" />

          <svg className="w-full h-full" viewBox="0 0 400 400">
            {/* Movement Bridges with Côtes de Genève stripes */}
            <defs>
              <pattern id="cotesDeGeneve" width="10" height="400" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="400" stroke="#22252c" strokeWidth="1" />
                <rect x="0" y="0" width="10" height="400" fill="#14171d" opacity="0.6" />
              </pattern>
            </defs>

            <circle cx="200" cy="200" r="175" fill="url(#cotesDeGeneve)" stroke="#333" strokeWidth="2" />

            {/* Blued Steel Screws */}
            {[
              [100, 100], [300, 100], [100, 300], [300, 300],
              [200, 80], [200, 320], [80, 200], [320, 200]
            ].map(([x, y], idx) => (
              <g key={idx}>
                <circle cx={x} cy={y} r="5" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1" />
                <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke="#fff" strokeWidth="0.8" />
              </g>
            ))}

            {/* Synthetic Rubies */}
            {[
              [140, 150], [260, 150], [150, 250], [250, 250]
            ].map(([x, y], idx) => (
              <circle key={idx} cx={x} cy={y} r="6" fill="#be185d" stroke="#f472b6" strokeWidth="1" />
            ))}

            {/* 22K Solid Gold Oscillating Rotor (Spins with mouse movement / time) */}
            <g
              style={{
                transformOrigin: '200px 200px',
                animation: 'spin 6s ease-in-out infinite alternate'
              }}
            >
              <path
                d="M 200,200 L 90,130 A 130,130 0 0,0 310,130 Z"
                fill="#d4af37"
                stroke="#fff3b0"
                strokeWidth="1.5"
                opacity="0.88"
              />
              <text x="200" y="165" textAnchor="middle" fill="#5c450c" fontSize="8" fontWeight="bold" letterSpacing="1.5">
                VANGUARD MANUFACTURE &bull; 22K GOLD
              </text>
            </g>

            {/* Center Rotor Bearing */}
            <circle cx="200" cy="200" r="18" fill="#111" stroke="#d4af37" strokeWidth="2" />
            <circle cx="200" cy="200" r="8" fill="#38bdf8" />
          </svg>

          <div className="absolute bottom-6 text-[10px] text-[#d4af37] tracking-widest uppercase">
            VAL-701 TOURBILLON &bull; 34 JEWELS
          </div>
        </div>
      </div>

      {/* Interactive Caliber Telemetry & Control Dock */}
      <div className="mt-6 w-full max-w-sm bg-[#12141a] border border-[#262934] rounded-2xl p-4 space-y-3 text-xs shadow-xl">
        <div className="flex items-center justify-between text-[11px] border-b border-[#22242c] pb-2 text-neutral-400">
          <span>TIME SYNCHRONIZED:</span>
          <span className="text-[#d4af37] font-bold">
            {time.toLocaleTimeString()} (4 Hz Sweeping)
          </span>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-3 gap-2">
          {/* Chronograph Start/Stop */}
          <button
            onClick={() => setIsChronoRunning(!isChronoRunning)}
            className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition text-[11px] font-bold uppercase ${
              isChronoRunning
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-[#181b24] text-neutral-200 hover:text-white border border-[#2b303d]'
            }`}
          >
            {isChronoRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isChronoRunning ? 'Stop' : 'Chrono'}</span>
          </button>

          {/* Reset Chrono */}
          <button
            onClick={handleResetChrono}
            className="py-2 px-2 rounded-lg bg-[#181b24] text-neutral-400 hover:text-white border border-[#2b303d] flex items-center justify-center gap-1.5 transition text-[11px] uppercase"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Flip Skeleton Caseback */}
          <button
            onClick={() => setIsSkeletonFlipped(!isSkeletonFlipped)}
            className="py-2 px-2 rounded-lg bg-[#181b24] text-[#d4af37] border border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-black flex items-center justify-center gap-1.5 transition text-[11px] uppercase font-bold"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isSkeletonFlipped ? 'Dial' : 'Caseback'}</span>
          </button>
        </div>

        {/* Audio Escapement Tick Toggle */}
        <div className="pt-2 border-t border-[#22242c] flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
            {isAudioEnabled ? (
              <Volume2 className="w-4 h-4 text-[#d4af37] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-500" />
            )}
            <span>Mechanical 28,800 vph Audio:</span>
          </div>
          <button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition ${
              isAudioEnabled
                ? 'bg-[#d4af37] text-black font-bold'
                : 'bg-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            {isAudioEnabled ? 'Ticking ON' : 'Tick Muted'}
          </button>
        </div>
      </div>
    </div>
  );
}
