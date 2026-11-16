import React, { useState } from 'react';

const terroirs = [
  {
    id: 'chuao',
    name: 'Chuao Criollo 75%',
    origin: 'Aragua Valley, Venezuela',
    rareLevel: 'Rare Harvest (Sub-1% Global)',
    palette: ['Wild Blackberry', 'Dried Smyrna Fig', 'Plum Wine Acidity', 'Roasted Hazelnut'],
    radar: { aroma: 92, acidity: 68, bitterness: 54, fruitiness: 96, floral: 74, roasted: 60 },
    color: '#d97706',
    accentBg: 'from-[#d97706]/20 to-transparent',
    sommelierPairing: '2016 Saint-Émilion Grand Cru or Speyside 18yr Single Malt',
    tastingNote: 'Opens with explosive sun-ripened dark stone fruit before yielding to a lingering molasses and toasted almond finish.'
  },
  {
    id: 'piura',
    name: 'Piura Blanco 70%',
    origin: 'Alto Piura, Peru',
    rareLevel: 'White Porcelain Bean (Zero Bitterness)',
    palette: ['Lime Blossom', 'Passion Fruit Curd', 'Raw Mountain Honey', 'Cacao Butter'],
    radar: { aroma: 88, acidity: 85, bitterness: 25, fruitiness: 92, floral: 90, roasted: 45 },
    color: '#eab308',
    accentBg: 'from-[#eab308]/20 to-transparent',
    sommelierPairing: 'Vintage Champagne (Blanc de Blancs) or Cold-Drip Geisha Coffee',
    tastingNote: 'Remarkably pale ivory-tinted chocolate with crystalline citrus vibrancy and zero astringency.'
  },
  {
    id: 'sambirano',
    name: 'Sambirano 80%',
    origin: 'Ambanja, Madagascar',
    rareLevel: 'Organic Agroforestry Micro-Lot',
    palette: ['Raspberry Coulis', 'Marmalade', 'Pink Peppercorn', 'Himalayan Cedar'],
    radar: { aroma: 95, acidity: 90, bitterness: 62, fruitiness: 88, floral: 65, roasted: 72 },
    color: '#f43f5e',
    accentBg: 'from-[#f43f5e]/20 to-transparent',
    sommelierPairing: 'Tawny Port 20 Year or Smoked Lapsang Souchong Tea',
    tastingNote: 'Lively, electrifying red berry acidity reminiscent of fresh summer fruit tart with dark spice complexity.'
  },
  {
    id: 'esmeraldas',
    name: 'Esmeraldas 68%',
    origin: 'Cloud Forest, Ecuador',
    rareLevel: 'Heirloom Nacional Arriba',
    palette: ['Jasmine Flower', 'Green Banana', 'Toasted Brioche', 'Crushed Cocoa Nib'],
    radar: { aroma: 86, acidity: 50, bitterness: 58, fruitiness: 70, floral: 98, roasted: 80 },
    color: '#10b981',
    accentBg: 'from-[#10b981]/20 to-transparent',
    sommelierPairing: 'Cognac XO or Rare Darjeeling First Flush',
    tastingNote: 'Seductive bouquet of white blossoms followed by deeply soothing nutty warmth and velvet ganache texture.'
  }
];

export default function InPageTastingExperience() {
  const [selectedTerroir, setSelectedTerroir] = useState(terroirs[0]);
  const [isSampling, setIsSampling] = useState(false);

  // Synthesize crystal chime / crisp cacao snap sound
  const playCacaoSnapSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // High frequency click / snap
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1800, audioCtx.currentTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);

      // Sweet lingering crystal resonance
      setTimeout(() => {
        const chime = audioCtx.createOscillator();
        const chimeGain = audioCtx.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(1174.66, audioCtx.currentTime); // D6 note
        chimeGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);
        chime.connect(chimeGain);
        chimeGain.connect(audioCtx.destination);
        chime.start();
        chime.stop(audioCtx.currentTime + 0.6);
      }, 30);
    } catch (e) {
      // AudioContext fallback
    }
  };

  const handleSelect = (t) => {
    setSelectedTerroir(t);
    playCacaoSnapSound();
    setIsSampling(true);
    setTimeout(() => setIsSampling(false), 500);
  };

  // Compute SVG Radar polygon points
  const getRadarPoints = (radar) => {
    // 6 axes: 0: Top (Aroma), 60: Top-Right (Acidity), 120: Bottom-Right (Bitterness),
    // 180: Bottom (Fruitiness), 240: Bottom-Left (Floral), 300: Top-Left (Roasted)
    const center = 110;
    const maxRadius = 80;
    const vals = [
      radar.aroma / 100,
      radar.acidity / 100,
      radar.bitterness / 100,
      radar.fruitiness / 100,
      radar.floral / 100,
      radar.roasted / 100
    ];

    const points = vals.map((val, idx) => {
      const angle = (idx * 60 - 90) * (Math.PI / 180);
      const r = val * maxRadius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    return points;
  };

  return (
    <section className="py-16 bg-[#160c09] text-[#fbf7f2] border-y border-[#d4af37]/20 relative overflow-hidden font-serif">
      {/* Background Gold Leaf Dust Effect */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#d4af37]/20 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#d4af37] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              Chocolatier de Paris • Sensory Organoleptic Profile
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#fbf7f2]">
              Interactive Single-Origin Terroir Radar
            </h2>
            <p className="mt-1 text-sm text-[#c7b9a5] max-w-xl font-sans">
              Explore the delicate aromatic spectrum of rare estate cacaos. Listen to the audible crystal snap of properly tempered 72-hour conched chocolate.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#261713] border border-[#d4af37]/30 px-4 py-2 rounded-full font-mono text-xs text-[#d4af37]">
            <span>Conching: <strong>72 Hours Stone-Rolled</strong></span>
            <span className="text-stone-600">•</span>
            <span>Origin: <strong>Single Plantation</strong></span>
          </div>
        </div>

        {/* 2-Column Organoleptic Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Terroir Selection & Interactive Tasting Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Terroir Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {terroirs.map((t) => {
                const isSelected = selectedTerroir.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelect(t)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#d4af37] bg-[#2d1b15] shadow-lg shadow-[#d4af37]/10'
                        : 'border-[#3a221b] bg-[#22130e] hover:border-[#d4af37]/40'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full mb-2" style={{ backgroundColor: t.color }} />
                    <div className="text-xs font-bold text-white font-sans truncate">{t.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-[#c7b9a5] font-mono">{t.origin.split(',')[1] || t.origin}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Tasting Showcase */}
            <div className={`p-6 rounded-2xl bg-gradient-to-br from-[#271712] to-[#1a0f0c] border border-[#d4af37]/30 shadow-2xl relative transition-all duration-300 ${isSampling ? 'ring-2 ring-[#d4af37]' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#d4af37] font-semibold">
                    {selectedTerroir.rareLevel}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">
                    {selectedTerroir.name}
                  </h3>
                  <p className="text-xs text-[#d4af37]/90 font-sans mt-0.5">
                    Harvest Region: {selectedTerroir.origin}
                  </p>
                </div>

                {/* Audible Snap Test Trigger */}
                <button
                  type="button"
                  onClick={() => handleSelect(selectedTerroir)}
                  className="px-3.5 py-2 rounded-lg bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-sans font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span>Sample Cacao Snap</span>
                </button>
              </div>

              {/* Organoleptic Description */}
              <p className="mt-4 text-sm text-[#e6ded5] font-sans leading-relaxed italic border-l-2 border-[#d4af37] pl-3 py-1">
                "{selectedTerroir.tastingNote}"
              </p>

              {/* Flavor Palettes Pills */}
              <div className="mt-4 pt-4 border-t border-[#3e241c]">
                <span className="text-[10px] font-mono uppercase text-[#c7b9a5] block mb-2 tracking-wider">
                  Distinguishing Palate Notes
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedTerroir.palette.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-sans font-medium bg-[#361f18] text-[#fbf7f2] border border-[#d4af37]/30"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sommelier Recommended Pairing */}
              <div className="mt-4 bg-[#1f120e] p-3 rounded-xl border border-[#3e241c] flex items-center gap-3">
                <span className="text-lg">🍷</span>
                <div className="text-xs font-sans">
                  <span className="text-[#d4af37] font-semibold block">Sommelier Recommendation:</span>
                  <span className="text-[#c7b9a5]">{selectedTerroir.sommelierPairing}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hexagonal Sensory Radar Chart (5 cols) */}
          <div className="lg:col-span-5 bg-[#20120d] border border-[#d4af37]/30 rounded-2xl p-6 shadow-2xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#3b211a] text-xs font-mono text-[#c7b9a5]">
              <span className="text-[#d4af37] font-bold">ORGANOLEPTIC WHEEL</span>
              <span>100-PT GASTRONOMY SCALE</span>
            </div>

            {/* SVG Hexagonal Radar Wheel */}
            <div className="relative my-4 flex items-center justify-center">
              <svg className="w-64 h-64" viewBox="0 0 220 220">
                {/* Concentric Hexagons */}
                {[0.25, 0.5, 0.75, 1.0].map((scale, i) => {
                  const points = [0, 60, 120, 180, 240, 300].map((deg) => {
                    const angle = (deg - 90) * (Math.PI / 180);
                    const r = scale * 80;
                    return `${(110 + r * Math.cos(angle)).toFixed(1)},${(110 + r * Math.sin(angle)).toFixed(1)}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={i}
                      points={points}
                      fill="none"
                      stroke="#42251d"
                      strokeWidth="1"
                      strokeDasharray={i < 3 ? '2,2' : 'none'}
                    />
                  );
                })}

                {/* Axis Radial Lines */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                  const angle = (deg - 90) * (Math.PI / 180);
                  const x2 = 110 + 80 * Math.cos(angle);
                  const y2 = 110 + 80 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="110"
                      y1="110"
                      x2={x2}
                      y2={y2}
                      stroke="#3b211a"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Dynamic Polygon for Selected Terroir */}
                <polygon
                  points={getRadarPoints(selectedTerroir.radar)}
                  fill={selectedTerroir.color}
                  fillOpacity="0.35"
                  stroke={selectedTerroir.color}
                  strokeWidth="2.5"
                  className="transition-all duration-700 ease-out"
                />

                {/* Radar Vertex Circles */}
                {Object.values(selectedTerroir.radar).map((val, idx) => {
                  const angle = (idx * 60 - 90) * (Math.PI / 180);
                  const r = (val / 100) * 80;
                  const cx = 110 + r * Math.cos(angle);
                  const cy = 110 + r * Math.sin(angle);
                  return (
                    <circle
                      key={idx}
                      cx={cx}
                      cy={cy}
                      r="4"
                      fill="#fff"
                      stroke={selectedTerroir.color}
                      strokeWidth="2"
                      className="transition-all duration-700"
                    />
                  );
                })}

                {/* Axis Labels */}
                <text x="110" y="18" fill="#d4af37" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Aroma</text>
                <text x="195" y="65" fill="#d4af37" fontSize="9" textAnchor="start" fontFamily="sans-serif">Acidity</text>
                <text x="195" y="165" fill="#d4af37" fontSize="9" textAnchor="start" fontFamily="sans-serif">Bitterness</text>
                <text x="110" y="210" fill="#d4af37" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Fruitiness</text>
                <text x="10" y="165" fill="#d4af37" fontSize="9" textAnchor="end" fontFamily="sans-serif">Floral</text>
                <text x="10" y="65" fill="#d4af37" fontSize="9" textAnchor="end" fontFamily="sans-serif">Roasted</text>
              </svg>
            </div>

            {/* Radar Score Legend */}
            <div className="w-full grid grid-cols-3 gap-2 text-center text-xs font-mono pt-3 border-t border-[#3b211a]">
              <div>
                <span className="text-[10px] text-[#c7b9a5] block">Aroma</span>
                <span className="font-bold text-[#d4af37]">{selectedTerroir.radar.aroma}/100</span>
              </div>
              <div>
                <span className="text-[10px] text-[#c7b9a5] block">Fruitiness</span>
                <span className="font-bold text-[#d4af37]">{selectedTerroir.radar.fruitiness}/100</span>
              </div>
              <div>
                <span className="text-[10px] text-[#c7b9a5] block">Floral</span>
                <span className="font-bold text-[#d4af37]">{selectedTerroir.radar.floral}/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
