import React, { useState } from 'react';
import { ART_EDITIONS, FRAME_OPTIONS } from '../data/artData';
import { ShieldCheck, Award, Eye, CheckCircle2, Sparkles, Sliders } from 'lucide-react';

export default function InPageGalleryOpticsViewer() {
  const [selectedArtIndex, setSelectedArtIndex] = useState(0);
  const [glassType, setGlassType] = useState('museum'); // 'museum' | 'standard'
  const [lightTemp, setLightTemp] = useState('gallery'); // 'gallery' | 'sunlight' | 'evening'
  const [selectedFrameId, setSelectedFrameId] = useState(FRAME_OPTIONS[0].id);

  const art = ART_EDITIONS[selectedArtIndex];
  const frame = FRAME_OPTIONS.find(f => f.id === selectedFrameId) || FRAME_OPTIONS[0];

  const lightConfigs = {
    gallery: { name: '3000K Museum Spot (CRI 98)', bg: '#f4f3ef', glow: 'rgba(255, 248, 220, 0.4)' },
    sunlight: { name: '5000K Natural North Daylight', bg: '#f8fafc', glow: 'rgba(240, 249, 255, 0.5)' },
    evening: { name: '2200K Warm Dim Candlelight', bg: '#1c1917', glow: 'rgba(245, 158, 11, 0.25)' }
  };

  const currentLight = lightConfigs[lightTemp];
  const isDarkLight = lightTemp === 'evening';

  return (
    <section className="py-20 bg-[#0c0c0e] text-[#f4f4f5] border-y border-white/10 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Conservation Science • Tru Vue Museum Glazing Optics
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-tight text-white">
              Anti-Reflective Archival Optics Simulator
            </h2>
            <p className="mt-2 text-sm text-gray-400 max-w-2xl font-sans leading-relaxed">
              Experience actual catalog pieces framed under 99% UV-blocking Tru Vue Museum Glass with invisible 0.5% light reflection versus standard float glass.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full font-mono text-xs">
            <span>Surface Reflection: <strong className="text-amber-400">{glassType === 'museum' ? '0.5% (Museum Grade)' : '8.2% (Obscuring Glare)'}</strong></span>
            <span className="text-gray-500">•</span>
            <span>UV Protection: <strong>{glassType === 'museum' ? '99% Conservation' : '42% Low'}</strong></span>
          </div>
        </div>

        {/* 2-Column Staging Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Visualizer Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-[#141417] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-gray-400">
              <span className="text-amber-400 font-bold uppercase tracking-wider">
                FRAME SPEC: {frame.name} &bull; {glassType === 'museum' ? 'TRU VUE MUSEUM GLASS' : 'STANDARD FLOAT GLASS'}
              </span>
              <span>LIGHT: {currentLight.name.split(' ')[0]}</span>
            </div>

            {/* Framed Artwork Preview Canvas */}
            <div 
              className="relative h-80 sm:h-96 my-4 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden transition-colors duration-500"
              style={{ backgroundColor: currentLight.bg }}
            >
              {/* Gallery Ambient Wall Vignette */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 100px ${isDarkLight ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.12)'}`
                }}
              />

              {/* Framed Picture Assembly */}
              <div 
                className="relative z-10 w-64 h-80 p-3 shadow-2xl rounded flex items-center justify-center transition-all duration-300"
                style={{ 
                  backgroundColor: frame.borderHex || '#111',
                  border: '6px solid ' + (frame.borderHex || '#27272a'),
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65)'
                }}
              >
                {/* 8-Ply Cotton Rag Matboard Margin */}
                <div className="w-full h-full bg-[#faf9f6] p-3 shadow-inner flex items-center justify-center relative overflow-hidden rounded-sm">
                  {/* Genuine Photographic Catalog Artwork */}
                  <img
                    src={art.image}
                    alt={art.name}
                    className="w-full h-full object-cover shadow-sm transition-all duration-500"
                  />

                  {/* Standard Glass Harsh Glare Flare Layer */}
                  {glassType === 'standard' && (
                    <div className="absolute inset-0 pointer-events-none z-20">
                      <div 
                        className="absolute inset-0 opacity-80"
                        style={{
                          background: 'linear-gradient(125deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.7) 70%, transparent 100%)'
                        }}
                      />
                      <div className="absolute top-4 left-4 w-24 h-24 border-2 border-white/50 opacity-40 transform rotate-12" />
                    </div>
                  )}

                  {/* Tru Vue Museum Glass Invisible Anti-Reflective Layer */}
                  {glassType === 'museum' && (
                    <div className="absolute inset-0 pointer-events-none z-20">
                      <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                          background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(139,92,246,0.1) 100%)'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Glare Status Badge */}
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${glassType === 'museum' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                <span className="text-gray-300">Active Optics:</span>
                <span className="font-bold text-white">
                  {glassType === 'museum' ? 'Tru Vue Museum (Invisible 0.5% Reflection)' : 'Standard Float Glass (Harsh 8.2% Glare)'}
                </span>
              </div>
            </div>

            {/* Split Switcher */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setGlassType('museum')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                  glassType === 'museum'
                    ? 'bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                ✨ Tru Vue Museum Glass (0.5% Reflection &bull; 99% UV)
              </button>
              <button
                type="button"
                onClick={() => setGlassType('standard')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                  glassType === 'standard'
                    ? 'bg-red-500/20 text-red-300 border-red-500'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                ⚠️ Standard Picture Glass (High Glare)
              </button>
            </div>
          </div>

          {/* Right Controls & Conservation Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1. Actual Catalog Piece Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2 font-bold">
                1. Select Catalog Masterpiece
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ART_EDITIONS.map((a, idx) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedArtIndex(idx)}
                    className={`p-2.5 rounded-xl border text-xs font-sans transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                      selectedArtIndex === idx
                        ? 'border-amber-400 bg-white/10 text-white font-bold'
                        : 'border-white/10 bg-[#141417] text-gray-400 hover:text-white'
                    }`}
                  >
                    <img
                      src={a.image}
                      alt={a.name}
                      className="w-10 h-10 object-cover rounded-lg shrink-0 border border-white/10"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-white text-xs">{a.name}</div>
                      <div className="text-[10px] text-amber-400 font-mono truncate">{a.priceFormatted}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Print Dossier Card */}
            <div className="bg-[#17171a] p-4 rounded-xl border border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-baseline pb-2 border-b border-white/10">
                <span className="font-serif text-sm font-bold text-white">{art.name}</span>
                <span className="text-amber-400 font-bold">{art.priceFormatted}</span>
              </div>
              <div className="text-[11px] text-gray-300 font-sans">
                <strong>Artist:</strong> {art.artist}
              </div>
              <div className="text-[11px] text-gray-300 font-sans">
                <strong>Edition:</strong> {art.edition}
              </div>
              <div className="text-[11px] text-gray-300 font-sans">
                <strong>Substrate:</strong> {art.medium}
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Accompanied by Hahnemühle Certificate of Authenticity</span>
              </div>
            </div>

            {/* 2. Framing Profile Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2 font-bold">
                2. Select Custom Frame Moulding
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FRAME_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFrameId(f.id)}
                    className={`p-2.5 rounded-lg border text-xs font-sans text-left transition-all cursor-pointer ${
                      selectedFrameId === f.id
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-white/10 bg-[#141417] text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="truncate">{f.name}</div>
                    <div className="text-[10px] text-gray-500 font-mono">
                      {f.addCost > 0 ? `+ $${f.addCost} USD` : 'Included'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Gallery Light Picker */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2 font-bold">
                3. Gallery Lighting Temperature
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(lightConfigs).map((key) => {
                  const cfg = lightConfigs[key];
                  const isSelected = lightTemp === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setLightTemp(key)}
                      className={`p-2 rounded-lg border text-xs font-mono text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/15 text-white font-bold'
                          : 'border-white/10 bg-[#141417] text-gray-400 hover:text-white'
                      }`}
                    >
                      <div>{key === 'gallery' ? '3000K Spot' : key === 'sunlight' ? '5000K Sun' : '2200K Dim'}</div>
                      <div className="text-[10px] text-amber-400">{key === 'gallery' ? '98 CRI' : key === 'sunlight' ? '100 CRI' : '90 CRI'}</div>
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
