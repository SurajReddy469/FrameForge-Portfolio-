import React, { useState, useEffect } from 'react';
import { X, Sun, Lamp, Eye, ShieldCheck, Sparkles, Sliders, Check } from 'lucide-react';

export default function GalleryLightingModal({ isOpen, onClose }) {
  const [lightPreset, setLightPreset] = useState('spotlight'); // sunlight, spotlight, evening
  const [glassType, setGlassType] = useState('museum'); // standard, museum
  const [glareAngle, setGlareAngle] = useState(25); // 0 to 45 degrees

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const presets = {
    sunlight: {
      name: 'Direct Morning Sunlight',
      temp: '5500K Daylight',
      lux: '1,450 Lux',
      bgFilter: 'brightness-110 saturate-105',
      ambientGlow: 'rgba(255, 250, 240, 0.4)'
    },
    spotlight: {
      name: 'Curatorial Halogen Track',
      temp: '3000K Museum Warm',
      lux: '480 Lux (Optimal)',
      bgFilter: 'brightness-100 contrast-105',
      ambientGlow: 'rgba(255, 240, 215, 0.25)'
    },
    evening: {
      name: 'Evening Residence Lamp',
      temp: '2400K Amber Cozy',
      lux: '160 Lux',
      bgFilter: 'brightness-85 sepia-15',
      ambientGlow: 'rgba(240, 200, 160, 0.35)'
    }
  };

  const currentPreset = presets[lightPreset];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lighting-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-gallery"
    >
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white border border-[#e5e5e5] shadow-2xl overflow-hidden my-8 z-10 text-[#111111]">
        {/* Header */}
        <div className="bg-[#fafafa] px-8 py-5 border-b border-[#e5e5e5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sun className="w-5 h-5 text-[#111111]" />
            <span id="lighting-modal-title" className="text-[10px] uppercase tracking-widest text-[#777777]">
              CURATORIAL OPTICS // TRU VUE® MUSEUM ANTI-GLARE & LIGHTING SIMULATOR
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Lighting Simulator"
            className="p-1 rounded text-[#777777] hover:text-[#111111] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Gallery Wall Simulation Stage */}
          <div className="relative w-full bg-[#1e2024] rounded-xl p-8 overflow-hidden shadow-2xl flex items-center justify-center min-h-[380px]">
            {/* Ambient Lighting Cone Overlay */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-700"
              style={{
                background: `radial-gradient(circle at 50% 35%, ${currentPreset.ambientGlow}, transparent 70%)`
              }}
            />

            {/* Framed Artwork in Room */}
            <div className="relative w-72 sm:w-80 aspect-[3/4] bg-white p-4 shadow-2xl transition-all duration-500 border-8 border-[#111111]">
              {/* Art Canvas Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85"
                  alt="Gallery Masterpiece"
                  className={`w-full h-full object-cover transition-all duration-500 ${currentPreset.bgFilter}`}
                />

                {/* Glare Simulation Layer */}
                {glassType === 'standard' ? (
                  /* Harsh Float Glass Reflection with Window Glare & Halos */
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(${115 + glareAngle}deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.2) 25%, transparent 60%, rgba(255,255,255,0.45) 85%)`,
                      opacity: 0.85
                    }}
                  >
                    {/* Simulated Window Frame Reflection */}
                    <div className="w-48 h-56 border-4 border-white/60 opacity-60 grid grid-cols-2 grid-rows-2 gap-2 transform -rotate-6" />
                  </div>
                ) : (
                  /* Tru Vue Museum Glass: <0.5% Anti-Reflective Nano-Coating */
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(${115 + glareAngle}deg, rgba(200,240,255,0.15) 0%, transparent 40%)`
                    }}
                  />
                )}
              </div>
            </div>

            {/* Real-time Indicator Badge */}
            <div className="absolute bottom-4 left-6 text-xs font-mono text-white/90 bg-black/60 backdrop-blur px-3 py-1.5 rounded border border-white/10 flex items-center gap-3">
              <span>COLOR TEMP: <strong className="text-white">{currentPreset.temp}</strong></span>
              <span>•</span>
              <span>LUMINANCE: <strong className="text-white">{currentPreset.lux}</strong></span>
              <span>•</span>
              <span>
                GLASS: <strong className={glassType === 'museum' ? 'text-emerald-400' : 'text-amber-400'}>
                  {glassType === 'museum' ? 'Optium Museum 99% UV' : 'Standard Float (High Glare)'}
                </strong>
              </span>
            </div>
          </div>

          {/* Controls: Lighting Presets & Glass Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lighting Scenarios */}
            <div className="bg-[#fafafa] p-5 border border-[#e5e5e5] space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#777777] block">
                Gallery Environment Lighting
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sunlight', label: 'Daylight', sub: '5500K' },
                  { id: 'spotlight', label: 'Halogen Spot', sub: '3000K' },
                  { id: 'evening', label: 'Ambient Lamp', sub: '2400K' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setLightPreset(p.id)}
                    className={`p-3 text-left border text-xs transition cursor-pointer ${
                      lightPreset === p.id
                        ? 'border-[#111111] bg-white text-[#111111] font-bold shadow-sm'
                        : 'border-[#e5e5e5] bg-[#fafafa] text-[#777777] hover:border-[#111111]'
                    }`}
                  >
                    <div>{p.label}</div>
                    <div className="text-[10px] opacity-75 font-normal">{p.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Glass Glare Comparison */}
            <div className="bg-[#fafafa] p-5 border border-[#e5e5e5] space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#777777] block">
                Glazing Substrate Comparison
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGlassType('standard')}
                  className={`p-3 text-left border text-xs transition cursor-pointer ${
                    glassType === 'standard'
                      ? 'border-[#111111] bg-white text-[#111111] font-bold shadow-sm'
                      : 'border-[#e5e5e5] bg-[#fafafa] text-[#777777] hover:border-[#111111]'
                  }`}
                >
                  <div className="text-amber-700">Standard Float Glass</div>
                  <div className="text-[10px] opacity-75 font-normal text-[#777777]">8% Glare Reflection • 46% UV</div>
                </button>
                <button
                  onClick={() => setGlassType('museum')}
                  className={`p-3 text-left border text-xs transition cursor-pointer ${
                    glassType === 'museum'
                      ? 'border-[#111111] bg-white text-[#111111] font-bold shadow-sm'
                      : 'border-[#e5e5e5] bg-[#fafafa] text-[#777777] hover:border-[#111111]'
                  }`}
                >
                  <div className="text-[#2b6436]">Tru Vue® Optium</div>
                  <div className="text-[10px] opacity-75 font-normal text-[#777777]">&lt;1% Anti-Reflect • 99% UV Block</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}