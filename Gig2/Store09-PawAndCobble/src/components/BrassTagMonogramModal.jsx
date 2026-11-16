import React, { useState, useEffect } from 'react';
import { X, Sparkles, RotateCw, Check, ShieldCheck, Heart, Dog, Award } from 'lucide-react';

export default function BrassTagMonogramModal({ isOpen, onClose, onAttachTag }) {
  const [tagShape, setTagShape] = useState('round'); // round, bone, hex
  const [tagFinish, setTagFinish] = useState('brass'); // brass, antique, bronze
  const [dogName, setDogName] = useState('BARNABY');
  const [fontFamily, setFontFamily] = useState('font-serif');
  const [iconEmblem, setIconEmblem] = useState('mountain');
  const [isFlipped, setIsFlipped] = useState(false);
  const [phoneLine1, setPhoneLine1] = useState('(555) 839-2041');
  const [phoneLine2, setPhoneLine2] = useState('MICROCHIPPED & LOVED');
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const finishes = {
    brass: {
      name: 'Polished Cast Brass',
      bg: 'radial-gradient(circle at 35% 30%, #fff6cc, #d4af37 45%, #997a15 85%, #664f05)',
      ring: '#997a15',
      engraveColor: '#3d2f03'
    },
    antique: {
      name: 'Weathered Antique Brass',
      bg: 'radial-gradient(circle at 35% 30%, #e0ceaa, #b39356 50%, #6e5527 85%, #473615)',
      ring: '#6e5527',
      engraveColor: '#261b07'
    },
    bronze: {
      name: 'Warm Rose Bronze',
      bg: 'radial-gradient(circle at 35% 30%, #f7d5c8, #c4826b 50%, #874e3a 85%, #592e20)',
      ring: '#874e3a',
      engraveColor: '#30150d'
    }
  };

  const handleAttach = () => {
    if (onAttachTag) {
      onAttachTag({
        tagShape,
        tagFinish,
        dogName: dogName.trim() || 'PUPPY',
        phoneLine1: phoneLine1.trim() || '(555) 000-0000',
        phoneLine2: phoneLine2.trim()
      });
    }
    setAttached(true);
    setTimeout(() => {
      setAttached(false);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tag-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-brand"
    >
      <div className="fixed inset-0 bg-black/65 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#fcfaf4] border-2 border-[#445341] rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-[#2c332b]">
        {/* Header */}
        <div className="bg-[#f0ebe0] px-8 py-5 border-b border-[#e5ded0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#445341]" />
            <span id="tag-modal-title" className="text-[10px] uppercase tracking-widest text-[#445341] font-bold">
              PORTLAND WORKSHOP // DEEP FIBER LASER SOLID BRASS ID MONOGRAM
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Monogram Studio"
            className="p-1 rounded text-[#798875] hover:text-[#2c332b] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Live 3D Tag Preview Area (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#798875] font-bold">
                REAL-TIME 3D BRASS PREVIEW (CLICK TO FLIP REVERSE)
              </span>
              <button
                type="button"
                onClick={() => setIsFlipped(!isFlipped)}
                className="text-xs font-bold text-[#445341] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Show Front' : 'Flip to Emergency Back'}</span>
              </button>
            </div>

            {/* Brass Tag Presentation Bed */}
            <div
              className="relative aspect-square w-full max-w-sm mx-auto bg-[#e8ded0] rounded-2xl p-8 flex items-center justify-center shadow-inner border border-[#d8cdbc] cursor-pointer group"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Tag Mounting Hole with Split Ring */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-[#7a6428] shadow-md z-20 pointer-events-none" />

              {/* 3D Tag Body */}
              <div
                className={`relative w-64 h-64 flex flex-col items-center justify-center p-6 text-center transition-all duration-700 transform shadow-2xl ${
                  tagShape === 'round'
                    ? 'rounded-full'
                    : tagShape === 'bone'
                    ? 'rounded-3xl'
                    : tagShape === 'hex'
                    ? 'rounded-2xl'
                    : 'rounded-full'
                }`}
                style={{
                  background: finishes[tagFinish].bg,
                  border: `4px solid ${finishes[tagFinish].ring}`,
                  boxShadow: '0 20px 35px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,0.7)'
                }}
              >
                {/* Hole In Tag */}
                <div className="absolute top-4 w-4 h-4 rounded-full bg-[#e8ded0] border-2 border-[#7a6428] shadow-inner" />

                {!isFlipped ? (
                  /* FRONT FACE: Name & Emblem */
                  <div className="space-y-2 mt-4 select-none">
                    <div className="text-2xl" style={{ color: finishes[tagFinish].engraveColor }}>
                      {iconEmblem === 'mountain' && '▲ ▲'}
                      {iconEmblem === 'pine' && '🌲'}
                      {iconEmblem === 'paw' && '🐾'}
                      {iconEmblem === 'heart' && '♥'}
                    </div>

                    <h3
                      className={`text-2xl sm:text-3xl font-black uppercase tracking-wider ${fontFamily}`}
                      style={{
                        color: finishes[tagFinish].engraveColor,
                        textShadow: '0 1px 1px rgba(255,255,255,0.4), inset 0 2px 3px rgba(0,0,0,0.7)'
                      }}
                    >
                      {dogName || 'PUPPY'}
                    </h3>

                    <div
                      className="text-[10px] tracking-widest uppercase font-mono font-bold"
                      style={{ color: finishes[tagFinish].engraveColor }}
                    >
                      ★ EST. 2026 ★
                    </div>
                  </div>
                ) : (
                  /* BACK FACE: Emergency Rescue Details */
                  <div className="space-y-3 mt-4 select-none px-4">
                    <span
                      className="text-[9px] uppercase tracking-widest font-mono font-bold block"
                      style={{ color: finishes[tagFinish].engraveColor }}
                    >
                      IF LOST CALL PACK:
                    </span>

                    <div
                      className="text-base sm:text-lg font-mono font-bold tracking-tight"
                      style={{
                        color: finishes[tagFinish].engraveColor,
                        textShadow: '0 1px 1px rgba(255,255,255,0.4)'
                      }}
                    >
                      {phoneLine1 || '(555) 000-0000'}
                    </div>

                    <div
                      className="text-[10px] uppercase font-bold tracking-wider leading-tight"
                      style={{ color: finishes[tagFinish].engraveColor }}
                    >
                      {phoneLine2 || 'REWARD IF RETURNED'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#798875]">
              <span>Solid 2.5mm Gauge USA Brass</span>
              <span className="text-[#327a3c] font-bold">✓ Deep Engrave Never Rubs Off</span>
            </div>
          </div>

          {/* Form & Controls Area (5 cols) */}
          <div className="md:col-span-5 bg-[#f7f2e7] p-6 border border-[#e5ded0] rounded-xl flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#798875] font-bold block mb-1">
                  Dog's Front Engraved Name
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value.toUpperCase())}
                  className="w-full bg-white border border-[#e5ded0] focus:border-[#445341] p-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#2c332b] outline-none"
                  placeholder="Ex: BARNABY"
                />
              </div>

              {/* Tag Silhouette Shape */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#798875] font-bold block mb-1.5">
                  Tag Silhouette Shape
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: 'round', label: 'Classic Coin' },
                    { id: 'bone', label: 'Dog Bone' },
                    { id: 'hex', label: 'Hex Shield' }
                  ].map(shape => (
                    <button
                      key={shape.id}
                      type="button"
                      onClick={() => setTagShape(shape.id)}
                      className={`p-2 rounded-lg border text-center font-bold transition cursor-pointer ${
                        tagShape === shape.id
                          ? 'border-[#445341] bg-[#445341] text-white'
                          : 'border-[#e5ded0] bg-white text-[#556352] hover:border-[#445341]'
                      }`}
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal Finish */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#798875] font-bold block mb-1.5">
                  Hand-Rubbed Metal Alloy
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {Object.entries(finishes).map(([k, f]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setTagFinish(k)}
                      className={`p-2 rounded-lg border text-[11px] font-bold text-center transition cursor-pointer ${
                        tagFinish === k
                          ? 'border-[#445341] bg-[#445341] text-white'
                          : 'border-[#e5ded0] bg-white text-[#556352] hover:border-[#445341]'
                      }`}
                    >
                      {f.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reverse Emergency Details */}
              <div className="space-y-2 pt-2 border-t border-[#e5ded0]">
                <label className="text-[10px] uppercase tracking-widest text-[#798875] font-bold block">
                  Reverse Emergency Contact Info
                </label>
                <input
                  type="text"
                  value={phoneLine1}
                  onChange={(e) => setPhoneLine1(e.target.value)}
                  className="w-full bg-white border border-[#e5ded0] focus:border-[#445341] p-2 rounded text-xs font-mono text-[#2c332b] outline-none"
                  placeholder="Primary Phone (555) 000-0000"
                />
                <input
                  type="text"
                  value={phoneLine2}
                  onChange={(e) => setPhoneLine2(e.target.value)}
                  className="w-full bg-white border border-[#e5ded0] focus:border-[#445341] p-2 rounded text-xs text-[#2c332b] outline-none"
                  placeholder="Microchip # or Custom Note"
                />
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAttach}
              className="w-full py-3.5 bg-[#445341] hover:bg-[#344031] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#445341]/20"
            >
              {attached ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Custom Tag Added to Gear Pack!</span>
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  <span>Laser Engrave & Attach Tag (+$18 USD)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}