import React, { useState, useMemo } from 'react';

export default function InPageAeroDragVisualizer() {
  const [speed, setSpeed] = useState(45); // km/h
  const [selectedSuit, setSelectedSuit] = useState('chrono'); // 'standard' | 'road' | 'chrono'
  const [yawAngle, setYawAngle] = useState(0); // -15 to +15 degrees

  const suitData = {
    standard: {
      name: 'Standard Club Kit',
      cda: 0.268,
      dragColor: '#ef4444',
      flowState: 'Turbulent Boundary Separation',
      desc: 'Conventional woven polyester fabric with loose seams generating micro-vortex drag.'
    },
    road: {
      name: 'VeloCore Aero Jersey',
      cda: 0.238,
      dragColor: '#3b82f6',
      flowState: 'Controlled Boundary Layer',
      desc: 'Dimpled aero-trip mesh shoulders engineered to delay boundary layer separation.'
    },
    chrono: {
      name: 'Chrono Pro Speedsuit',
      cda: 0.214,
      dragColor: '#00f0ff',
      flowState: 'Laminar Airfoil Compression',
      desc: 'Seamless Swiss-woven mono-filament sleeve pattern validated at Silverstone Wind Tunnel.'
    }
  };

  const currentSuit = suitData[selectedSuit];

  // Aerodynamic power calculation: P = 0.5 * rho * v^3 * CdA + rolling resistance
  // rho = 1.225 kg/m^3 (sea level air density)
  // v in m/s = speed / 3.6
  const metrics = useMemo(() => {
    const v = speed / 3.6; // m/s
    const rho = 1.225;
    const standardCdA = 0.268;
    const rollingResistance = 0.004 * 75 * 9.81 * v; // 75kg rider + bike

    const standardWatts = Math.round(0.5 * rho * Math.pow(v, 3) * standardCdA + rollingResistance);
    const suitWatts = Math.round(0.5 * rho * Math.pow(v, 3) * currentSuit.cda + rollingResistance);
    const wattsSaved = Math.max(0, standardWatts - suitWatts);

    // Time saved over 40km Olympic Time Trial
    // Distance = 40,000m
    const standardTimeSec = 40000 / v;
    // Approximated speed with same standard power:
    const velocityWithSuit = Math.pow((standardWatts - rollingResistance) / (0.5 * rho * currentSuit.cda), 1 / 3);
    const suitTimeSec = 40000 / velocityWithSuit;
    const secondsSaved = Math.max(0, standardTimeSec - suitTimeSec).toFixed(1);

    return {
      standardWatts,
      suitWatts,
      wattsSaved,
      secondsSaved,
      pctReduction: (((standardCdA - currentSuit.cda) / standardCdA) * 100).toFixed(1)
    };
  }, [speed, currentSuit]);

  return (
    <section className="py-16 bg-[#080d1a] border-y border-white/10 relative overflow-hidden">
      {/* Background Tech Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              Aerodynamic Physics Model • CdA Power Estimation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
              Dynamic Aerodynamic Wattage Matrix
            </h2>
            <p className="mt-2 text-sm text-gray-400 max-w-2xl font-mono">
              Theoretical power calculation model (P = ½ρv³CdA + Crr) estimating boundary layer wattage differences across steady-state velocities. Not a substitute for physical wind tunnel testing.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-lg font-mono text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Rider Air Density</span>
              <span className="text-white font-bold">1.225 kg/m³ (ISA)</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Test Distance</span>
              <span className="text-[#00f0ff] font-bold">40.0 km TT</span>
            </div>
          </div>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Visualizer / Wind Tunnel Stream View (7 cols) */}
          <div className="lg:col-span-7 bg-[#0d1424] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            {/* Stream Chamber Frame */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-2 text-[#00f0ff]">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                WIND TUNNEL CHAMBER 04 • VELOCITY: {speed} KM/H
              </span>
              <span>YAW: {yawAngle > 0 ? `+${yawAngle}°` : `${yawAngle}°`}</span>
            </div>

            {/* Interactive SVG Wind Stream Simulation */}
            <div className="relative h-64 sm:h-72 my-4 rounded-xl bg-gradient-to-r from-[#060a12] via-[#0b1324] to-[#060a12] border border-white/5 flex items-center justify-center overflow-hidden">
              {/* Velocity Vector Grid Lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.1" />
                    <stop offset="50%" stopColor={currentSuit.dragColor} stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Animated Streamlines */}
                {[20, 50, 80, 110, 140, 170, 200, 230, 260].map((y, idx) => {
                  const animDuration = Math.max(0.4, (70 - speed) / 30);
                  const strokeWidth = idx === 4 || idx === 5 ? 2.5 : 1.2;
                  const opacity = idx === 4 || idx === 5 ? 0.9 : 0.35;
                  return (
                    <g key={idx}>
                      <line
                        x1="0"
                        y1={y}
                        x2="100%"
                        y2={y + (yawAngle * 1.5)}
                        stroke="url(#streamGrad)"
                        strokeWidth={strokeWidth}
                        strokeDasharray="16, 12"
                        strokeOpacity={opacity}
                        style={{
                          animation: `dashFlow ${animDuration}s linear infinite`
                        }}
                      />
                    </g>
                  );
                })}

                {/* Rider Silhouette Placeholder in Vector */}
                <g transform="translate(190, 85)" className="transition-all duration-300">
                  {/* Aero Helmet & Rider Shape */}
                  <ellipse cx="65" cy="40" rx="36" ry="18" fill={currentSuit.dragColor} fillOpacity="0.2" stroke={currentSuit.dragColor} strokeWidth="1.5" />
                  <path d="M 30,45 Q 65,30 110,50 L 95,95 Q 60,85 25,65 Z" fill="#15203b" stroke={currentSuit.dragColor} strokeWidth="1.5" />
                  {/* Handlebar & Arm Extension */}
                  <path d="M 95,65 L 135,55 L 140,75" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  {/* Wheel arc */}
                  <circle cx="140" cy="120" r="28" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="4,4" />
                  <circle cx="10" cy="120" r="28" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="4,4" />
                  {/* Frame tube */}
                  <path d="M 10,120 L 55,75 L 105,75 L 140,120 L 65,120 Z" stroke="#64748b" strokeWidth="2.5" fill="none" />
                </g>
              </svg>

              {/* Dynamic Flow State Overlay Badge */}
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[11px] font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentSuit.dragColor }} />
                <span className="text-gray-300">Boundary Flow:</span>
                <span className="font-bold text-white">{currentSuit.flowState}</span>
              </div>

              {/* Live CdA Indicator */}
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#00f0ff]/30 text-[11px] font-mono text-[#00f0ff] font-bold">
                CdA = {currentSuit.cda.toFixed(3)} m²
              </div>
            </div>

            {/* In-Line Slider Controls */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                  <span className="text-gray-300 font-bold uppercase">Wind Speed Velocity:</span>
                  <span className="text-[#00f0ff] text-base font-extrabold">{speed} km/h ({(speed * 0.621371).toFixed(1)} mph)</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="65"
                  step="1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full accent-[#00f0ff] h-2 bg-gray-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                  <span>25 km/h (Recovery)</span>
                  <span>45 km/h (Peloton Pace)</span>
                  <span>65 km/h (Sprint/Descent)</span>
                </div>
              </div>

              {/* Yaw Angle Selector */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                  <span className="text-gray-300 font-bold uppercase">Crosswind Yaw Angle:</span>
                  <span className="text-white font-bold">{yawAngle > 0 ? `+${yawAngle}° Head-Cross` : yawAngle < 0 ? `${yawAngle}° Tail-Cross` : '0° Pure Headwind'}</span>
                </div>
                <div className="flex gap-2">
                  {[-10, 0, 7.5, 15].map((angle) => (
                    <button
                      key={angle}
                      type="button"
                      onClick={() => setYawAngle(angle)}
                      className={`flex-1 py-1.5 rounded text-xs font-mono border transition-all ${
                        yawAngle === angle
                          ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {angle > 0 ? `+${angle}°` : `${angle}°`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Suit Comparison & Performance Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Suit Selector Cards */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block">
                Select Tested Equipment Profile
              </label>

              {(Object.keys(suitData)).map((key) => {
                const isSelected = selectedSuit === key;
                const suit = suitData[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSuit(key)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all relative ${
                      isSelected
                        ? 'bg-white/10 border-[#00f0ff] shadow-lg shadow-[#00f0ff]/10'
                        : 'bg-[#0d1424] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: suit.dragColor }} />
                        {suit.name}
                      </span>
                      <span className="font-mono text-xs text-[#00f0ff] font-bold">
                        CdA {suit.cda.toFixed(3)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 font-sans line-clamp-1">
                      {suit.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Performance Live Readout Card */}
            <div className="bg-gradient-to-br from-[#0c182d] to-[#080f1e] border border-[#00f0ff]/30 rounded-2xl p-5 shadow-xl">
              <div className="text-xs font-mono uppercase text-[#00f0ff] font-bold tracking-wider mb-4 flex items-center justify-between">
                <span>Calculated Performance Gain</span>
                <span className="px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[10px]">
                  -{metrics.pctReduction}% Drag
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Wattage Saved */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">Watts Saved at {speed} km/h</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#00f0ff] font-mono">
                      +{metrics.wattsSaved}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">W</span>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {metrics.suitWatts}W vs {metrics.standardWatts}W (Std)
                  </span>
                </div>

                {/* 40km TT Time Saved */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">40km TT Time Delta</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                      -{metrics.secondsSaved}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">s</span>
                  </div>
                  <span className="text-[10px] text-emerald-400/80 mt-1 block">
                    Over standard club kit
                  </span>
                </div>
              </div>

              {/* Aerodynamic Benefit Callout */}
              <div className="text-xs text-gray-300 font-mono bg-white/5 border border-white/10 p-3 rounded-lg leading-relaxed">
                <span className="text-[#00f0ff] font-bold">MODEL METHODOLOGY:</span> At {speed} km/h, aerodynamic drag represents ~85–90% of total mechanical resistance. This mathematical model computes power savings via P = ½ρv³·ΔCdA. Actual real-world savings vary with athlete anthropometry, helmet positioning, crosswind turbulence, and drafting.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dashFlow {
          from { stroke-dashoffset: 28; }
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </section>
  );
}
