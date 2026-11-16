import React, { useState } from 'react';
import { Ruler, Truck, ShieldCheck, Box, Sparkles, CheckCircle2 } from 'lucide-react';

const lightingModes = {
  daylight: {
    label: 'High Noon (5500K)',
    sub: 'Crisp Natural Sunlight',
    bgGradient: 'from-[#f5f4ef] via-[#ede9df] to-[#dfd9cc]',
    wallColor: '#e8e4db',
    floorReflection: 'rgba(255,255,255,0.4)',
    shadowLength: '12px',
    shadowOpacity: '0.18',
    shadowAngle: '45deg',
    glowColor: 'rgba(255, 255, 255, 0.6)',
    kelvin: '5,500K',
    lux: '520 Lux'
  },
  golden: {
    label: 'Golden Hour (3200K)',
    sub: 'Low-Angle Warm Amber Sun',
    bgGradient: 'from-[#fef3c7] via-[#fcd34d]/20 to-[#e2c792]',
    wallColor: '#edd8b7',
    floorReflection: 'rgba(251, 191, 36, 0.35)',
    shadowLength: '36px',
    shadowOpacity: '0.28',
    shadowAngle: '65deg',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    kelvin: '3,200K',
    lux: '240 Lux'
  },
  evening: {
    label: 'Evening Gallery (2400K)',
    sub: 'Architectural Halogen Spotlights',
    bgGradient: 'from-[#1c1917] via-[#292524] to-[#0c0a09]',
    wallColor: '#1c1917',
    floorReflection: 'rgba(217, 119, 6, 0.25)',
    shadowLength: '20px',
    shadowOpacity: '0.6',
    shadowAngle: '25deg',
    glowColor: 'rgba(217, 119, 6, 0.35)',
    kelvin: '2,400K',
    lux: '95 Lux'
  }
};

const floors = {
  travertine: { name: 'Tivoli Travertine', texture: 'linear-gradient(45deg, #e3dcce 25%, #d8d0c0 50%, #e3dcce 75%)' },
  oak: { name: 'Quarter-Sawn Smoked Oak', texture: 'linear-gradient(90deg, #3d2b1f 0%, #4a3525 50%, #3d2b1f 100%)' },
  concrete: { name: 'Micro-Cement Concrete', texture: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)' },
};

const itemsData = {
  chair: {
    name: 'Kanso Minimalist Lounge Chair',
    price: '$1,850 USD',
    materials: 'Solid Smoked White Oak, Kvadrat 92% Virgin Wool Bouclé',
    dimensions: '84 cm W × 78 cm D × 72 cm H (Seat 41 cm)',
    roomScale: 'Room: 5.4m × 4.2m • Clearance: 1.20m Pass-Through',
    availability: 'In Stock • Ready to dispatch from Stockholm atelier',
    leadTime: 'White-glove in-home room delivery in 5–7 business days'
  },
  table: {
    name: 'Monolith Travertine Dining Table',
    price: '$3,800 USD',
    materials: 'Solid Rapolano Italian Travertine (Honed, Oleophobic Finish)',
    dimensions: '240 cm L × 105 cm W × 75 cm H • Weight: 185 kg',
    roomScale: 'Room: 6.2m × 4.8m • Clearance: 1.15m Perimeter Dining Arc',
    availability: 'Made to Order • Limited seasonal quarry extraction',
    leadTime: 'Reinforced timber crate freight + complimentary on-site assembly (3–4 weeks)'
  },
  daybed: {
    name: 'Atelier Raw Linen Daybed',
    price: '$2,450 USD',
    materials: 'European Walnut Base, Belgian Heavy Flax Linen, Brass Feet',
    dimensions: '200 cm L × 80 cm W × 42 cm H',
    roomScale: 'Room: 5.0m × 4.0m • Low-profile horizon spatial footprint',
    availability: 'In Stock • 3 Editions Available for Immediate Dispatch',
    leadTime: 'White-glove placement & packaging removal in 7–10 days'
  }
};

export default function InPageLightingRoomViewer() {
  const [currentLight, setCurrentLight] = useState('golden');
  const [currentFloor, setCurrentFloor] = useState('travertine');
  const [activeItem, setActiveItem] = useState('chair'); // 'chair' | 'table' | 'daybed'

  const light = lightingModes[currentLight];
  const item = itemsData[activeItem];
  const isDark = currentLight === 'evening';

  return (
    <section className={`py-16 transition-colors duration-700 ${isDark ? 'bg-[#141210] text-[#f4f1ea]' : 'bg-[#ece7de] text-[#24211d]'} border-y border-stone-300/40 relative overflow-hidden font-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-stone-400/20 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase mb-2 text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              Bespoke Interior Staging • Architectural Heliometry
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
              Solar Light Material Response & Spatial Scale
            </h2>
            <p className="mt-1 text-sm text-stone-500 max-w-xl font-sans">
              Observe how monolithic Italian travertine, French bouclé, and smoked oak absorb and refract variable ambient spectrums in your residence.
            </p>
          </div>

          {/* Telemetry pill */}
          <div className="flex items-center gap-3 bg-stone-200/50 dark:bg-stone-800/50 border border-stone-300 dark:border-stone-700 px-4 py-2 rounded-full font-mono text-xs">
            <span>Color Temp: <strong className="text-amber-600">{light.kelvin}</strong></span>
            <span className="text-stone-400">•</span>
            <span>Illuminance: <strong>{light.lux}</strong></span>
          </div>
        </div>

        {/* Room Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visualizer Room Canvas (7 cols) */}
          <div className="lg:col-span-7">
            <div 
              className={`relative h-80 sm:h-96 rounded-2xl overflow-hidden border transition-all duration-700 shadow-2xl flex flex-col justify-end p-6 ${
                isDark ? 'border-stone-800 bg-[#171513]' : 'border-stone-300 bg-[#faf8f5]'
              }`}
            >
              {/* Back Wall with Sun Angle Cast */}
              <div 
                className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `linear-gradient(${light.shadowAngle}, ${light.wallColor} 0%, transparent 80%)`,
                  opacity: 0.85
                }}
              />

              {/* Window Shadow Aperture Projection */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 40px, transparent 40px, transparent 80px)',
                  transform: `skewX(${currentLight === 'golden' ? '-20deg' : '0deg'}) scale(${currentLight === 'daylight' ? '1.1' : '1.0'})`
                }}
              />

              {/* Floor Plane Perspective */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-36 transition-all duration-500 border-t border-stone-400/20"
                style={{
                  background: floors[currentFloor].texture,
                  boxShadow: `inset 0 10px 25px ${isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.1)'}`
                }}
              />

              {/* Furniture Object Staged in Center */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto transition-transform duration-500">
                {activeItem === 'chair' && (
                  <div className="relative group">
                    <div 
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full blur-md transition-all duration-700"
                      style={{
                        backgroundColor: '#000',
                        opacity: light.shadowOpacity,
                        transform: `translateX(${currentLight === 'golden' ? '25px' : '0px'}) scaleY(0.7)`
                      }}
                    />
                    <svg className="w-48 h-48 drop-shadow-xl transition-all duration-700" viewBox="0 0 200 200" fill="none">
                      <rect x="55" y="45" width="90" height="40" rx="14" fill={isDark ? '#e7e5e4' : '#fafaf9'} stroke="#a8a29e" strokeWidth="2" />
                      <rect x="40" y="85" width="120" height="35" rx="12" fill={isDark ? '#d6d3d1' : '#f5f5f4'} stroke="#78716c" strokeWidth="2" />
                      <path d="M 50 115 L 42 165" stroke={isDark ? '#78350f' : '#b45309'} strokeWidth="8" strokeLinecap="round" />
                      <path d="M 150 115 L 158 165" stroke={isDark ? '#78350f' : '#b45309'} strokeWidth="8" strokeLinecap="round" />
                      <path d="M 65 115 L 60 160" stroke={isDark ? '#451a03' : '#78350f'} strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                      <path d="M 135 115 L 140 160" stroke={isDark ? '#451a03' : '#78350f'} strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  </div>
                )}

                {activeItem === 'table' && (
                  <div className="relative group">
                    <div 
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-10 rounded-full blur-md transition-all duration-700"
                      style={{
                        backgroundColor: '#000',
                        opacity: light.shadowOpacity,
                        transform: `translateX(${currentLight === 'golden' ? '35px' : '0px'})`
                      }}
                    />
                    <svg className="w-64 h-48 drop-shadow-xl transition-all duration-700" viewBox="0 0 260 200" fill="none">
                      <rect x="20" y="70" width="220" height="20" rx="4" fill={isDark ? '#78716c' : '#e7e5e4'} stroke="#57534e" strokeWidth="2" />
                      <rect x="50" y="90" width="35" height="75" rx="4" fill={isDark ? '#57534e' : '#d6d3d1'} stroke="#44403c" strokeWidth="2" />
                      <rect x="175" y="90" width="35" height="75" rx="4" fill={isDark ? '#57534e' : '#d6d3d1'} stroke="#44403c" strokeWidth="2" />
                    </svg>
                  </div>
                )}

                {activeItem === 'daybed' && (
                  <div className="relative group">
                    <div 
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-72 h-10 rounded-full blur-md transition-all duration-700"
                      style={{
                        backgroundColor: '#000',
                        opacity: light.shadowOpacity,
                        transform: `translateX(${currentLight === 'golden' ? '30px' : '0px'})`
                      }}
                    />
                    <svg className="w-72 h-48 drop-shadow-xl transition-all duration-700" viewBox="0 0 280 200" fill="none">
                      <rect x="25" y="105" width="230" height="15" rx="2" fill={isDark ? '#78350f' : '#92400e'} />
                      <rect x="30" y="80" width="220" height="28" rx="8" fill={isDark ? '#e7e5e4' : '#fafaf9'} stroke="#a8a29e" strokeWidth="2" />
                      <rect x="40" y="62" width="40" height="22" rx="10" fill={isDark ? '#a8a29e' : '#d6d3d1'} />
                      <line x1="45" y1="120" x2="40" y2="155" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                      <line x1="235" y1="120" x2="240" y2="155" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Bottom Telemetry Overlay */}
              <div className="relative z-10 flex items-center justify-between pt-3 border-t border-stone-400/20 text-xs font-mono">
                <span className={isDark ? 'text-stone-400' : 'text-stone-600'}>
                  Substrate: <strong className={isDark ? 'text-white' : 'text-stone-900'}>{floors[currentFloor].name}</strong>
                </span>
                <span className="text-amber-600 font-semibold uppercase tracking-wider">
                  {light.sub}
                </span>
              </div>
            </div>

            {/* Room Scale & Architectural Clearance Bar */}
            <div className="mt-3 p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-stone-400/20 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono gap-2">
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                <Ruler className="w-4 h-4 text-amber-600" />
                <span>Spatial Footprint: <strong className="text-stone-900 dark:text-white">{item.roomScale}</strong></span>
              </div>
              <span className="text-[10px] text-amber-700 uppercase font-semibold">CAD / BIM Available on Request</span>
            </div>
          </div>

          {/* Right Controls & Product Dossier Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Subject Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-2 font-bold">
                1. Select Architectural Subject
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'chair', name: 'Kanso Chair' },
                  { id: 'table', name: 'Monolith Table' },
                  { id: 'daybed', name: 'Raw Daybed' },
                ].map((it) => (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => setActiveItem(it.id)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-sans transition-all cursor-pointer ${
                      activeItem === it.id
                        ? 'bg-amber-600 text-white border-amber-600 font-semibold shadow'
                        : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    {it.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Specifications Dossier Card */}
            <div className={`p-4 rounded-xl border text-xs font-mono space-y-2.5 transition-colors ${isDark ? 'bg-[#1b1816] border-stone-800' : 'bg-white/70 border-stone-300'}`}>
              <div className="flex justify-between items-baseline pb-2 border-b border-stone-300/40 dark:border-stone-700">
                <span className="font-serif font-bold text-sm text-stone-900 dark:text-white">{item.name}</span>
                <span className="font-bold text-amber-600">{item.price}</span>
              </div>

              <div>
                <span className="text-[10px] text-stone-400 uppercase block">Material Curation:</span>
                <span className="text-stone-700 dark:text-stone-300 font-sans">{item.materials}</span>
              </div>

              <div>
                <span className="text-[10px] text-stone-400 uppercase block">Exact Dimensions:</span>
                <span className="text-stone-700 dark:text-stone-300">{item.dimensions}</span>
              </div>

              <div className="pt-1 flex items-start gap-2 text-[11px] text-stone-600 dark:text-stone-400 border-t border-stone-300/30 dark:border-stone-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item.availability}</span>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-stone-600 dark:text-stone-400">
                <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{item.leadTime}</span>
              </div>
            </div>

            {/* Ambient Condition Buttons */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-2 font-bold">
                2. Select Solar Illuminance
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(lightingModes).map((key) => {
                  const mode = lightingModes[key];
                  const isSelected = currentLight === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCurrentLight(key)}
                      className={`p-2 rounded-lg border text-xs font-sans text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-600/15 font-bold text-amber-900 dark:text-amber-400'
                          : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <div>{mode.label.split(' ')[0]}</div>
                      <div className="text-[10px] text-stone-400 font-mono">{mode.kelvin}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Substrate Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-2 font-bold">
                3. Flooring Substrate
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(floors).map((key) => {
                  const floor = floors[key];
                  const isSelected = currentFloor === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCurrentFloor(key)}
                      className={`p-2 rounded-lg border text-xs font-sans text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-600/15 font-bold text-amber-900 dark:text-amber-400'
                          : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {floor.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
