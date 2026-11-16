import React, { useState, useEffect } from 'react';
import { X, Wind, Zap, Gauge, Play, RotateCcw, Activity, ArrowRight, ShieldCheck, Info } from 'lucide-react';

export default function WindTunnelCalcModal({ isOpen, onClose }) {
  const [speedKmh, setSpeedKmh] = useState(45); // 25 to 60 km/h
  const [yawAngle, setYawAngle] = useState(5); // 0 to 20 degrees
  const [riderPosition, setRiderPosition] = useState('drops'); // hoods, drops, aerobars
  const [fabricTech, setFabricTech] = useState('velocore'); // standard, velocore

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

  // Aerodynamic drag physics constants
  const airDensity = 1.225; // kg/m^3 (sea level 15°C)
  const speedMs = speedKmh / 3.6;

  // Base CdA depending on position
  let baseCdA = 0.32; // hoods
  if (riderPosition === 'drops') baseCdA = 0.28;
  if (riderPosition === 'aerobars') baseCdA = 0.23;

  // Fabric reduction: VeloCore Sonic saves ~0.018 m^2 CdA
  const fabricCdAReduction = fabricTech === 'velocore' ? 0.018 : 0.0;
  const yawFactor = 1 + (yawAngle * 0.008); // Slight drag increase at yaw angles
  const effectiveCdA = (baseCdA - fabricCdAReduction) * yawFactor;

  // Standard kit comparison CdA
  const standardCdA = baseCdA * yawFactor;

  // Power required to overcome aerodynamic drag: P = 0.5 * rho * CdA * v^3
  const currentAeroWatts = Math.round(0.5 * airDensity * effectiveCdA * Math.pow(speedMs, 3));
  const standardAeroWatts = Math.round(0.5 * airDensity * standardCdA * Math.pow(speedMs, 3));
  const wattsSaved = Math.max(0, standardAeroWatts - currentAeroWatts);

  // Time saved over 40 km (Olympic Distance / 40k TT)
  const standardTimeSec = (40000 / speedMs);
  const timeSavedSeconds = Math.round((wattsSaved / Math.max(1, 3 * standardAeroWatts)) * standardTimeSec);
  const minutesSaved = Math.floor(timeSavedSeconds / 60);
  const secondsRemainder = timeSavedSeconds % 60;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wind-tunnel-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans"
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#0a0f1d] border-2 border-[#00f0ff] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-white">
        {/* Header */}
        <div className="bg-[#11192e] px-6 py-4 border-b border-[#1e2a4a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Wind className="w-5 h-5 text-[#00f0ff] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00f0ff]">
              BOULDER AERO LAB // CdA & VIRTUAL WIND TUNNEL CALIBRATOR
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            aria-label="Close wind tunnel calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Virtual Wind Tunnel Animation Canvas / SVG */}
          <div className="bg-[#060a14] border border-[#1e2a4a] rounded-2xl p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono text-[#00f0ff] flex items-center gap-1.5 uppercase font-bold">
                <Gauge className="w-4 h-4" /> BOUNDARY LAYER AIRFLOW SIMULATION
              </span>
              <span className="text-xs font-mono text-neutral-400">
                TUNNEL SPEED: <strong className="text-white">{speedKmh} KM/H ({Math.round(speedKmh * 0.621371)} MPH)</strong>
              </span>
            </div>

            {/* Streamline SVG Graphic */}
            <div className="relative h-44 w-full flex items-center justify-center bg-[#070d1a] rounded-xl overflow-hidden border border-[#141e33]">
              <svg className="w-full h-full" viewBox="0 0 700 180">
                {/* Wind streamlines */}
                {[20, 45, 70, 95, 120, 145, 165].map((y, i) => (
                  <path
                    key={i}
                    d={`M 0,${y} C 220,${y + (i < 3 ? -18 : 18)} 350,${y + (i < 3 ? -10 : 10)} 700,${y + (fabricTech === 'velocore' ? 0 : (i % 2 === 0 ? 12 : -12))}`}
                    fill="none"
                    stroke={fabricTech === 'velocore' ? '#00f0ff' : '#ff4444'}
                    strokeWidth={fabricTech === 'velocore' ? '2' : '1.5'}
                    strokeDasharray={fabricTech === 'velocore' ? '6,3' : '4,8'}
                    opacity={0.8 - (Math.abs(y - 90) / 140)}
                    className="animate-pulse"
                  />
                ))}

                {/* Cyclist / Aero Silhouette */}
                <g transform="translate(320, 30) scale(0.75)">
                  <ellipse cx="65" cy="40" rx="26" ry="16" fill="#00f0ff" opacity="0.9" />
                  <path d="M 75,36 L 92,44 L 75,48 Z" fill="#ffffff" />
                  <path d="M 50,45 C 30,55 10,75 -15,100 L 25,120 C 50,90 70,70 70,55 Z" fill="#1e2a4a" stroke="#00f0ff" strokeWidth="2" />
                  <path d="M 60,55 L 90,85 L 120,80" fill="none" stroke="#00f0ff" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="-20" cy="140" r="30" fill="none" stroke="#334155" strokeWidth="3" />
                  <circle cx="120" cy="140" r="30" fill="none" stroke="#334155" strokeWidth="3" />
                  <path d="M -20,140 L 40,140 L 120,140" stroke="#334155" strokeWidth="3" />
                </g>

                {/* Micro turbulence dots if standard kit */}
                {fabricTech !== 'velocore' && (
                  <g fill="#ff4444" opacity="0.6">
                    <circle cx="480" cy="65" r="4" />
                    <circle cx="510" cy="55" r="5" />
                    <circle cx="535" cy="72" r="3" />
                    <circle cx="560" cy="60" r="4" />
                    <circle cx="490" cy="120" r="4" />
                    <circle cx="525" cy="130" r="5" />
                  </g>
                )}
              </svg>

              <div className="absolute bottom-3 left-4 text-[10px] font-mono">
                {fabricTech === 'velocore' ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    ✓ LAMINAR BOUNDARY ATTACHMENT • REDUCED WAKE TURBULENCE
                  </span>
                ) : (
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    ⚠ FLOW SEPARATION • INCREASED LOW-PRESSURE WAKE DRAG
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Metric Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="bg-[#11192e] border border-[#1e2a4a] p-4 rounded-xl">
              <span className="text-neutral-400 text-[10px] uppercase block">EFFECTIVE CdA</span>
              <span className="text-2xl font-black text-white">{effectiveCdA.toFixed(3)}</span>
              <span className="text-[10px] text-neutral-500 block">m² Aerodynamic Drag</span>
            </div>
            <div className="bg-[#11192e] border border-[#1e2a4a] p-4 rounded-xl">
              <span className="text-neutral-400 text-[10px] uppercase block">AERO POWER REQ.</span>
              <span className="text-2xl font-black text-white">{currentAeroWatts} W</span>
              <span className="text-[10px] text-neutral-500 block">Watts at {speedKmh} km/h</span>
            </div>
            <div className="bg-[#11192e] border border-[#00f0ff]/50 p-4 rounded-xl shadow-lg shadow-[#00f0ff]/10">
              <span className="text-[#00f0ff] text-[10px] uppercase block font-bold">WATTS SAVED</span>
              <span className="text-3xl font-black text-[#00f0ff]">
                {fabricTech === 'velocore' ? `-${wattsSaved} W` : '0 W'}
              </span>
              <span className="text-[10px] text-[#00f0ff]/80 block">Direct Metabolic Relief</span>
            </div>
            <div className="bg-[#11192e] border border-emerald-500/50 p-4 rounded-xl">
              <span className="text-emerald-400 text-[10px] uppercase block font-bold">40KM TIME SAVED</span>
              <span className="text-2xl font-black text-emerald-400">
                {fabricTech === 'velocore' ? `-${minutesSaved}m ${secondsRemainder}s` : '0s'}
              </span>
              <span className="text-[10px] text-emerald-400/80 block">Estimated 40k TT Delta</span>
            </div>
          </div>

          {/* Physics Model Assumptions & Methodology Note */}
          <div className="p-3.5 bg-[#0f172a] rounded-xl border border-[#1e2a4a] text-xs font-mono text-neutral-300 space-y-1">
            <div className="flex items-center gap-2 text-[#00f0ff] font-bold">
              <Info className="w-4 h-4 shrink-0" />
              <span>SIMPLIFIED AERODYNAMIC ESTIMATE MODEL:</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              Calculations use the classical drag power equation \(P = \frac{1}{2} \rho C_d A v^3\), assuming sea-level air density (\(\rho = 1.225\,\text{kg/m}^3\)) and flat road profile with zero rolling resistance included. Results are engineering estimates and do not substitute for dynamic wind tunnel or computational fluid dynamics (CFD) scans.
            </p>
          </div>

          {/* Controls: Speed, Yaw, Position, Fabric */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Speed Slider */}
            <div className="bg-[#11192e] border border-[#1e2a4a] p-4 rounded-xl">
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-neutral-400 uppercase">Rider Speed</span>
                <span className="text-[#00f0ff] font-bold">{speedKmh} km/h</span>
              </div>
              <input
                type="range"
                min="25"
                max="60"
                value={speedKmh}
                onChange={(e) => setSpeedKmh(Number(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2">
                <span>25 km/h</span>
                <span>45 (Pro)</span>
                <span>60 km/h</span>
              </div>
            </div>

            {/* Yaw Angle Slider */}
            <div className="bg-[#11192e] border border-[#1e2a4a] p-4 rounded-xl">
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-neutral-400 uppercase">Wind Yaw Angle</span>
                <span className="text-[#00f0ff] font-bold">{yawAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={yawAngle}
                onChange={(e) => setYawAngle(Number(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2">
                <span>0° (Headwind)</span>
                <span>10°</span>
                <span>20° (Cross)</span>
              </div>
            </div>

            {/* Rider Position */}
            <div className="bg-[#11192e] border border-[#1e2a4a] p-4 rounded-xl">
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">Rider Posture</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'hoods', label: 'Hoods' },
                  { id: 'drops', label: 'Drops' },
                  { id: 'aerobars', label: 'Aero TT' }
                ].map((pos) => (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => setRiderPosition(pos.id)}
                    className={`py-2 rounded font-mono text-[11px] font-bold transition ${
                      riderPosition === pos.id
                        ? 'bg-[#00f0ff] text-black shadow-md'
                        : 'bg-[#0a0f1d] text-neutral-400 hover:text-white border border-[#1e2a4a]'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Technology Toggle */}
            <div className="bg-[#11192e] border border-[#1e2a4a] p-4 rounded-xl">
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">Apparel Suite</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setFabricTech('standard')}
                  className={`py-2 rounded font-mono text-[11px] font-bold transition ${
                    fabricTech === 'standard'
                      ? 'bg-neutral-700 text-white'
                      : 'bg-[#0a0f1d] text-neutral-400 hover:text-white border border-[#1e2a4a]'
                  }`}
                >
                  Standard Kit
                </button>
                <button
                  type="button"
                  onClick={() => setFabricTech('velocore')}
                  className={`py-2 rounded font-mono text-[11px] font-bold transition ${
                    fabricTech === 'velocore'
                      ? 'bg-[#00f0ff] text-black font-sport italic'
                      : 'bg-[#0a0f1d] text-neutral-400 hover:text-white border border-[#1e2a4a]'
                  }`}
                >
                  VeloCore Sonic
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
