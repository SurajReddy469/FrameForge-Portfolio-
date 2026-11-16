import React, { useState } from 'react';

const leathers = {
  tan: { name: 'English Tan Bridle', bg: '#8b4513', strapGrad: 'linear-gradient(90deg, #964b15 0%, #b85c1c 50%, #803b0d 100%)', stitchColor: '#fef08a' },
  forest: { name: 'Highland Moss Waxed', bg: '#233d28', strapGrad: 'linear-gradient(90deg, #1b3320 0%, #29472f 50%, #152618 100%)', stitchColor: '#fef9c3' },
  espresso: { name: 'Espresso Saddlehide', bg: '#2b1b17', strapGrad: 'linear-gradient(90deg, #221411 0%, #36221d 50%, #1a0f0d 100%)', stitchColor: '#e2e8f0' }
};

const tagFinishes = {
  antique: { name: 'Antiqued Brass', grad: 'linear-gradient(135deg, #d4af37 0%, #a88422 50%, #7d5e12 100%)', text: '#3f2e08' },
  polished: { name: 'Mirror Solid Brass', grad: 'linear-gradient(135deg, #fef08a 0%, #eab308 50%, #ca8a04 100%)', text: '#422006' },
  gunmetal: { name: 'Weathered Gunmetal', grad: 'linear-gradient(135deg, #64748b 0%, #475569 50%, #1e293b 100%)', text: '#0f172a' }
};

export default function InPageCollarCustomizer() {
  const [petName, setPetName] = useState('BARNABY');
  const [phone, setPhone] = useState('555-0192');
  const [selectedLeather, setSelectedLeather] = useState('tan');
  const [selectedTag, setSelectedTag] = useState('antique');
  const [isMudSplattered, setIsMudSplattered] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  const leather = leathers[selectedLeather];
  const tag = tagFinishes[selectedTag];

  const handleWipeMud = () => {
    setIsWiping(true);
    setTimeout(() => {
      setIsMudSplattered(false);
      setIsWiping(false);
    }, 700);
  };

  return (
    <section className="py-16 bg-[#252f23] text-[#f4f2ea] border-y border-[#3d4d3a] relative overflow-hidden font-sans">
      {/* Background Subtle Wool Herringbone Pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#3d4d3a] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#d4af37] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              Saddlery Workshop • Live Bridle Leather Engraver
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white">
              Bespoke Collar & Solid Brass Tag Customizer
            </h2>
            <p className="mt-1 text-sm text-[#b8c2b5] max-w-xl">
              Type your canine companion's name to preview real-time laser engraving on heavy solid brass, paired with vegetable-tanned bridle leather that repels mud and river water.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#1d261b] border border-[#3d4d3a] px-4 py-2 rounded-full font-mono text-xs text-[#d4af37]">
            <span>Hardware: <strong>Solid Forged Brass</strong></span>
            <span className="text-stone-600">•</span>
            <span>Leather: <strong>12oz Bridle Waxed</strong></span>
          </div>
        </div>

        {/* 2-Column Workshop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visualizer Workbench (7 cols) */}
          <div className="lg:col-span-7 bg-[#1c241a] border border-[#3d4d3a] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#2c3829] text-xs font-mono text-[#b8c2b5]">
              <span className="text-[#d4af37] font-bold">WORKBENCH STAGED PREVIEW</span>
              <span>100% WATERPROOF RESIN COATED</span>
            </div>

            {/* Collar & Tag Canvas */}
            <div className="relative h-64 sm:h-72 my-4 rounded-xl bg-gradient-to-b from-[#182017] to-[#121911] border border-[#2d3a2b] flex items-center justify-center overflow-hidden">
              {/* Wood Grain Tabletop Texture */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 20px)'
                }}
              />

              {/* Collar Strap Illustration */}
              <div 
                className="relative z-10 w-4/5 h-16 rounded-xl shadow-2xl flex items-center justify-between px-6 transition-all duration-500 border border-black/40"
                style={{ background: leather.strapGrad }}
              >
                {/* Yellow Saddle Stitches along top and bottom */}
                <div 
                  className="absolute top-1.5 left-3 right-3 h-0.5 border-t border-dashed opacity-80"
                  style={{ borderColor: leather.stitchColor }}
                />
                <div 
                  className="absolute bottom-1.5 left-3 right-3 h-0.5 border-b border-dashed opacity-80"
                  style={{ borderColor: leather.stitchColor }}
                />

                {/* Brass Buckle on Left */}
                <div className="w-10 h-12 rounded border-4 border-[#d4af37] bg-black/40 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-8 bg-[#d4af37] rounded" />
                </div>

                {/* Center Solid Brass D-Ring with Hanging Tag */}
                <div className="relative flex flex-col items-center">
                  {/* D-Ring */}
                  <div className="w-7 h-4 border-2 border-t-0 border-[#d4af37] rounded-b-lg -mt-3 shadow-md" />

                  {/* Hanging Brass Medal */}
                  <div 
                    className="relative z-20 w-24 h-24 rounded-full shadow-2xl flex flex-col items-center justify-center border-2 border-[#b8942b] transition-all duration-300 transform translate-y-3 cursor-pointer group"
                    style={{ background: tag.grad }}
                  >
                    {/* Ring Hole */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1c241a] mb-1 shadow-inner border border-[#d4af37]" />

                    {/* Engraved Pet Name */}
                    <div 
                      className="text-xs font-serif font-black tracking-widest uppercase transition-all"
                      style={{ color: tag.text, textShadow: '0 1px 1px rgba(255,255,255,0.4)' }}
                    >
                      {petName || 'PAW'}
                    </div>

                    {/* Phone Number */}
                    <div 
                      className="text-[9px] font-mono tracking-tighter opacity-80"
                      style={{ color: tag.text }}
                    >
                      {phone || '000-0000'}
                    </div>
                  </div>
                </div>

                {/* Eyelet Holes on Right */}
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-black/60 border border-[#d4af37] shadow-inner" />
                  ))}
                </div>
              </div>

              {/* Mud Splatter Overlay */}
              {isMudSplattered && (
                <div className={`absolute inset-0 z-30 pointer-events-none flex items-center justify-center transition-opacity duration-300 ${isWiping ? 'opacity-20' : 'opacity-90'}`}>
                  {/* SVG Mud Splats */}
                  <svg className="w-full h-full" viewBox="0 0 400 200" fill="#3e2723">
                    <circle cx="160" cy="90" r="14" opacity="0.85" />
                    <circle cx="175" cy="82" r="8" opacity="0.8" />
                    <circle cx="145" cy="100" r="6" opacity="0.75" />
                    <circle cx="250" cy="115" r="16" opacity="0.85" />
                    <circle cx="235" cy="125" r="9" opacity="0.8" />
                    <circle cx="265" cy="105" r="7" opacity="0.75" />
                    <path d="M 190 70 Q 200 85 210 75 Q 215 95 195 90 Z" opacity="0.8" />
                  </svg>
                </div>
              )}

              {/* Live Status Badge */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-[#d4af37] border border-[#d4af37]/30">
                {leather.name} • {tag.name}
              </div>
            </div>

            {/* Mud-Test Interactive Toggle Bar */}
            <div className="mt-3 pt-3 border-t border-[#2d3a2b] flex items-center justify-between text-xs">
              <span className="text-[#b8c2b5] font-sans">
                Wax Impregnation Resilience: <strong className="text-white">Field Grade Waterproof</strong>
              </span>

              <div className="flex gap-2">
                {!isMudSplattered ? (
                  <button
                    type="button"
                    onClick={() => setIsMudSplattered(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#3e2723] hover:bg-[#4e342e] text-amber-200 border border-amber-900/50 font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>🐾</span>
                    <span>Simulate Trail Mud Splash</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleWipeMud}
                    className="px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#c49f27] text-stone-900 font-bold font-mono text-xs flex items-center gap-1.5 transition-colors shadow-lg animate-pulse"
                  >
                    <span>🧽</span>
                    <span>{isWiping ? 'Wiping Clean...' : 'Wipe Clean with Wax Rag'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Inputs & Leather Pickers (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Input 1: Pet Name Monogram */}
            <div className="bg-[#1c241a] border border-[#3d4d3a] p-4 rounded-xl space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-[#d4af37] block font-bold">
                1. Canine Name & Microchip/Phone
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-gray-400 block mb-1">PET'S NAME:</span>
                  <input
                    type="text"
                    maxLength={10}
                    value={petName}
                    onChange={(e) => setPetName(e.target.value.toUpperCase())}
                    className="w-full bg-[#141b12] border border-[#3d4d3a] rounded-lg px-3 py-2 text-sm font-serif font-bold text-[#d4af37] focus:outline-none focus:border-[#d4af37] tracking-wider uppercase"
                    placeholder="BARNABY"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block mb-1">CONTACT TEL:</span>
                  <input
                    type="text"
                    maxLength={14}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#141b12] border border-[#3d4d3a] rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                    placeholder="555-0192"
                  />
                </div>
              </div>
            </div>

            {/* Input 2: Leather Choice */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2 font-bold">
                2. Select English Bridle Leather Tannage
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(leathers).map((key) => {
                  const l = leathers[key];
                  const isSelected = selectedLeather === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedLeather(key)}
                      className={`p-2.5 rounded-xl border text-xs font-sans text-center transition-all ${
                        isSelected
                          ? 'border-[#d4af37] bg-[#293626] font-bold text-white shadow-md'
                          : 'border-[#3d4d3a] bg-[#1a2318] text-[#b8c2b5] hover:border-gray-500'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full mx-auto mb-1.5" style={{ backgroundColor: l.bg }} />
                      <div className="truncate">{l.name.split(' ')[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input 3: Solid Brass Tag Finish */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2 font-bold">
                3. Solid Brass Tag Patina
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(tagFinishes).map((key) => {
                  const t = tagFinishes[key];
                  const isSelected = selectedTag === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedTag(key)}
                      className={`p-2.5 rounded-xl border text-xs font-sans text-center transition-all ${
                        isSelected
                          ? 'border-[#d4af37] bg-[#293626] font-bold text-white shadow-md'
                          : 'border-[#3d4d3a] bg-[#1a2318] text-[#b8c2b5] hover:border-gray-500'
                      }`}
                    >
                      <div className="truncate">{t.name.split(' ')[0]}</div>
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
