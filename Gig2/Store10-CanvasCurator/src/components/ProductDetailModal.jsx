import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ShieldCheck, Award, Eye, ZoomIn, PackageCheck, Sparkles, Search, Sliders } from 'lucide-react';

export default function ProductDetailModal({ item, isOpen, onClose, onAddToCart }) {
  const [frameChoice, setFrameChoice] = useState('Raw White Oak Float');
  const [includeHangingSystem, setIncludeHangingSystem] = useState(false);
  const [added, setAdded] = useState(false);
  
  // 4.0X Conservator Loupe State
  const [isLoupeEnabled, setIsLoupeEnabled] = useState(true);
  const [loupeZoom, setLoupeZoom] = useState(4.0); // 2.5 or 4.0
  const [loupeState, setLoupeState] = useState({
    x: 0,
    y: 0,
    relX: 50,
    relY: 50,
    isHovering: false
  });
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleImageMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const relY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setLoupeState({ x, y, relX, relY, isHovering: true });
  };

  const handleImageMouseLeave = () => {
    setLoupeState(prev => ({ ...prev, isHovering: false }));
  };

  if (!isOpen || !item) return null;

  const basePrice = item.price || 420;
  const frameAddOn = frameChoice === 'Unframed Collector Print' ? 0 : frameChoice === 'Welsh Slate Shadowbox' ? 140 : 110;
  const totalPrice = basePrice + frameAddOn + (includeHangingSystem ? 38 : 0);
  const cartLineId = `${item.id}-${frameChoice}-${includeHangingSystem ? 'cleat' : 'standard'}`;

  const handleAdd = () => {
    onAddToCart({
      ...item,
      cartLineId,
      price: totalPrice,
      frameChoice,
      includeHangingSystem
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="art-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-gallery"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white border border-[#e5e5e5] shadow-2xl overflow-hidden my-8 z-10 text-[#111111]">
        {/* Header */}
        <div className="bg-[#fafafa] px-8 py-5 border-b border-[#e5e5e5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#777777]" />
            <span id="art-detail-title" className="text-[10px] uppercase tracking-widest text-[#777777]">
              CURATORIAL DOSSIER // {item.category || 'MUSEUM EDITION'}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Art Dossier"
            className="p-1 rounded text-[#777777] hover:text-[#111111] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 p-6 sm:p-8 gap-8">
          {/* Visuals with 4.0X Optical Loupe */}
          <div className="space-y-4">
            {/* Loupe Header Control */}
            <div className="flex items-center justify-between text-[11px] font-mono border-b border-[#e5e5e5] pb-2">
              <div className="flex items-center gap-1.5 text-[#111111] font-bold">
                <Search className="w-3.5 h-3.5 text-[#111111]" />
                <span>CONSERVATOR LOUPE</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsLoupeEnabled(!isLoupeEnabled)}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase transition ${
                    isLoupeEnabled ? 'bg-[#111111] text-white' : 'bg-[#eeeeee] text-[#777777]'
                  }`}
                >
                  {isLoupeEnabled ? 'LOUPE ACTIVE' : 'LOUPE OFF'}
                </button>
                {isLoupeEnabled && (
                  <div className="flex gap-1">
                    {[2.5, 4.0].map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => setLoupeZoom(z)}
                        className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                          loupeZoom === z ? 'bg-[#2b6436] text-white' : 'bg-[#e5e5e5] text-[#555555]'
                        }`}
                      >
                        {z}X
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Artwork Canvas Viewport with Hover Loupe */}
            <div
              ref={imageContainerRef}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
              className="relative aspect-[3/4] overflow-hidden bg-[#f7f7f7] border border-[#e5e5e5] cursor-crosshair select-none group"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#111111] text-white px-2.5 py-1 text-[10px] uppercase tracking-wider">
                {item.edition || 'LIMITED TO 50 PRINTS'}
              </div>

              {/* Status Hint on hover */}
              {!loupeState.isHovering && isLoupeEnabled && (
                <div className="absolute bottom-3 right-3 bg-white/95 text-[#111111] text-[10px] uppercase tracking-wider px-2.5 py-1 flex items-center gap-1 border border-[#e5e5e5] shadow-sm pointer-events-none">
                  <Search className="w-3 h-3 text-[#111111]" />
                  <span>HOVER TO MAGNIFY ({loupeZoom}X)</span>
                </div>
              )}

              {/* Interactive Circular Optical Loupe Lens */}
              {isLoupeEnabled && loupeState.isHovering && (
                <div
                  className="absolute pointer-events-none rounded-full border-2 border-white shadow-2xl overflow-hidden z-30 ring-2 ring-black/40"
                  style={{
                    width: 170,
                    height: 170,
                    left: `${loupeState.x - 85}px`,
                    top: `${loupeState.y - 85}px`,
                    backgroundImage: `url(${item.image})`,
                    backgroundPosition: `${loupeState.relX}% ${loupeState.relY}%`,
                    backgroundSize: `${loupeZoom * 100}% ${loupeZoom * 100}%`,
                    boxShadow: '0 15px 35px -5px rgba(0,0,0,0.5), inset 0 0 15px rgba(0,0,0,0.35)'
                  }}
                >
                  {/* Etched Precision Crosshairs & Calibrated Reticle */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-full h-[0.5px] bg-white shadow-sm" />
                    <div className="h-full w-[0.5px] bg-white shadow-sm absolute" />
                    <div className="w-6 h-6 rounded-full border border-white absolute" />
                  </div>

                  {/* Optical Specular Glare Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 rounded-full" />

                  {/* Lens Multiplier Badge */}
                  <div className="absolute bottom-2 inset-x-0 flex justify-center">
                    <span className="bg-black/80 text-white text-[9px] font-mono px-2 py-0.5 rounded tracking-widest uppercase">
                      {loupeZoom}X PIGMENT RESOLUTION
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Archival specs */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase">
              <div className="p-2.5 bg-[#fafafa] border border-[#e5e5e5]">
                <span className="text-[#777777] block">PAPER</span>
                <span className="font-bold text-[#111111]">Hahnemühle 308g</span>
              </div>
              <div className="p-2.5 bg-[#fafafa] border border-[#e5e5e5]">
                <span className="text-[#777777] block">PIGMENT</span>
                <span className="font-bold text-[#111111]">12-Color Lucia PRO</span>
              </div>
              <div className="p-2.5 bg-[#fafafa] border border-[#e5e5e5]">
                <span className="text-[#777777] block">LIGHTFAST</span>
                <span className="font-bold text-[#2b6436]">200+ Years</span>
              </div>
            </div>

            <div className="p-3 bg-[#fafafa] border border-[#e5e5e5] text-xs space-y-1 text-[#666666]">
              <div className="text-[#111111] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#777777]" />
                Includes Hahnemühle Tamper-Evident Hologram
              </div>
              <p className="text-[11px] leading-relaxed">
                Each limited edition is serialized with dual matching serialized holograms (one on reverse of print, one on physical certificate of authenticity).
              </p>
            </div>
          </div>

          {/* Configuration and Buy */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-2xl uppercase tracking-wider text-[#111111]">
                  {item.name}
                </h3>
                <span className="text-2xl font-mono font-bold text-[#111111]">${totalPrice.toLocaleString()} USD</span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed mb-6 font-light">
                {item.details || item.description || 'Archival fine art edition printed on heavyweight 100% cotton German rag with hand-deckled edges. Signed, numbered, and cataloged in the artist raisonné.'}
              </p>

              {/* Framing Selection */}
              <div className="space-y-2 mb-4">
                <label className="text-[10px] uppercase tracking-widest text-[#777777] block">
                  Museum Framing Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Raw White Oak Float', desc: 'Natural Warm Hardwood (+ $110)' },
                    { id: 'Ebonized Black Ash', desc: 'Minimalist Gallery Shadow (+ $110)' },
                    { id: 'Welsh Slate Shadowbox', desc: 'Hand-Milled Dark Stone (+ $140)' },
                    { id: 'Unframed Collector Print', desc: 'Archival Mylar Sleeve' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFrameChoice(f.id)}
                      className={`p-3 text-left border text-xs transition cursor-pointer ${
                        frameChoice === f.id
                          ? 'border-[#111111] bg-[#fafafa] text-[#111111] font-bold'
                          : 'border-[#e5e5e5] bg-white text-[#777777] hover:border-[#111111]'
                      }`}
                    >
                      <div>{f.id}</div>
                      <div className="text-[10px] opacity-75 font-normal">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upsell Museum Hanging Kit */}
              <div
                onClick={() => setIncludeHangingSystem(!includeHangingSystem)}
                className={`p-3.5 border transition cursor-pointer flex items-center justify-between ${
                  includeHangingSystem
                    ? 'border-[#111111] bg-[#fafafa]'
                    : 'border-[#e5e5e5] bg-white hover:border-[#777777]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 border flex items-center justify-center ${
                    includeHangingSystem ? 'bg-[#111111] border-[#111111] text-white' : 'border-[#e5e5e5]'
                  }`}>
                    {includeHangingSystem && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#111111] block">
                      Add Precision Aluminum French Cleat Hanging Kit
                    </span>
                    <span className="text-[10px] text-[#777777]">
                      Flush zero-tilt gallery mount + bubble level + wall anchors
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#111111]">+$38 USD</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              className="w-full py-4 bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Private Acquisitions!</span>
                </>
              ) : (
                <>
                  <PackageCheck className="w-4 h-4" />
                  <span>Acquire Edition — ${totalPrice.toLocaleString()} USD</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}