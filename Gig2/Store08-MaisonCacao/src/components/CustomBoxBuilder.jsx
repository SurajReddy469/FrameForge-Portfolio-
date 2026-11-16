import React, { useState } from 'react';
import { TRUFFLE_VARIETIES } from '../data/chocolateData';
import { Sparkles, AlertCircle, Snowflake, Thermometer, ShieldCheck } from 'lucide-react';

export default function CustomBoxBuilder({ onAddCustomBoxToCart }) {
  const TOTAL_SLOTS = 16;
  const [selectedTruffles, setSelectedTruffles] = useState([]);
  const [customBoxAdded, setCustomBoxAdded] = useState(false);

  const PRICE_PER_PIECE = 4.25; // 16 * 4.25 = $68.00
  const currentBoxPrice = (selectedTruffles.length * PRICE_PER_PIECE).toFixed(2);

  const handleAddTruffle = (truffle) => {
    if (selectedTruffles.length < TOTAL_SLOTS) {
      setSelectedTruffles([...selectedTruffles, truffle]);
    }
  };

  const handleRemoveSlot = (index) => {
    const updated = [...selectedTruffles];
    updated.splice(index, 1);
    setSelectedTruffles(updated);
  };

  const handleAutoFillChefsBlend = () => {
    const blend = [];
    for (let i = 0; i < TOTAL_SLOTS; i++) {
      blend.push(TRUFFLE_VARIETIES[i % TRUFFLE_VARIETIES.length]);
    }
    setSelectedTruffles(blend);
  };

  const handleClearBox = () => {
    setSelectedTruffles([]);
  };

  const handleAddToCart = () => {
    if (selectedTruffles.length === 0) return;

    // Summarize composition
    const compositionSummary = TRUFFLE_VARIETIES
      .map(t => {
        const count = selectedTruffles.filter(st => st.id === t.id).length;
        return count > 0 ? `${count}x ${t.name}` : null;
      })
      .filter(Boolean)
      .join(', ');

    const customBoxItem = {
      id: `custom-box-${Date.now()}`,
      name: `Bespoke Ballotin (${selectedTruffles.length} Pieces)`,
      price: Math.round(selectedTruffles.length * PRICE_PER_PIECE),
      priceFormatted: `$${Math.round(selectedTruffles.length * PRICE_PER_PIECE)} USD`,
      category: "Bespoke Ballotin",
      image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80",
      description: `Bespoke artisanal composition: ${compositionSummary}`
    };

    onAddCustomBoxToCart(customBoxItem);
    setCustomBoxAdded(true);
    setTimeout(() => setCustomBoxAdded(false), 3000);
  };

  const slotsRemaining = TOTAL_SLOTS - selectedTruffles.length;

  return (
    <section id="custom-box" className="py-24 bg-[#140b08] border-b border-[#352115]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] block mb-2 font-light">
            L'Atelier Sur-Mesure
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#fbf7f2] font-paris tracking-wide mb-4">
            Curate Your 16-Piece Ballotin
          </h2>
          <p className="text-xs sm:text-sm text-[#ded4ca] font-light leading-relaxed">
            Select your favorite hand-crafted ganaches and single-estate truffles to assemble your bespoke gold-foiled box. Shipped in our thermal climate-controlled luxury packaging.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Flavor Selection Left (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs uppercase tracking-widest text-[#c5a059]">
                Choose Handcrafted Truffles
              </h3>
              <button
                onClick={handleAutoFillChefsBlend}
                className="text-[11px] text-[#ded4ca] hover:text-[#c5a059] underline decoration-[#5a3e2b] cursor-pointer"
              >
                Auto-Fill Master Chef's Balance
              </button>
            </div>

            {TRUFFLE_VARIETIES.map((truffle) => {
              const countInBox = selectedTruffles.filter(t => t.id === truffle.id).length;
              return (
                <div
                  key={truffle.id}
                  onClick={() => handleAddTruffle(truffle)}
                  className="cursor-pointer p-3.5 bg-[#21140e] border border-[#352115] hover:border-[#c5a059]/70 transition-all flex items-center justify-between group rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-7 h-7 rounded-full shadow-inner border border-[#c5a059]/40 flex-shrink-0"
                      style={{ backgroundColor: truffle.color }}
                    />
                    <div>
                      <div className="text-sm font-light text-[#fbf7f2] group-hover:text-[#c5a059] transition-colors">
                        {truffle.name}
                      </div>
                      <div className="text-[11px] text-[#aa9585]">{truffle.taste} &bull; {truffle.shell}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {countInBox > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#c5a059] text-[#1c100c] text-[10px] font-bold flex items-center justify-center font-mono">
                        {countInBox}
                      </span>
                    )}
                    <button
                      disabled={selectedTruffles.length >= TOTAL_SLOTS}
                      className="text-xs uppercase tracking-wider px-2.5 py-1 bg-[#2f1c14] text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-[#1c100c] transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4x4 Ballotin Grid Display Right (7 cols) */}
          <div className="lg:col-span-7 bg-[#1c100c] border border-[#c5a059]/40 p-6 sm:p-8 rounded-2xl relative shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#352115] gap-2">
              <div>
                <h4 className="text-xl font-paris text-[#fbf7f2]">
                  Prestige Gold Leaf Ballotin Tray
                </h4>
                <span className="text-xs text-[#c5a059] font-light">
                  {selectedTruffles.length === 0
                    ? 'Empty Tray (0 / 16 filled)'
                    : selectedTruffles.length === TOTAL_SLOTS
                    ? 'Full 16-Piece Selection Complete'
                    : `${selectedTruffles.length} of ${TOTAL_SLOTS} filled ($${currentBoxPrice})`}
                </span>
              </div>

              {selectedTruffles.length > 0 && (
                <button
                  onClick={handleClearBox}
                  className="text-xs text-[#aa9585] hover:text-[#d32f2f] transition-colors text-left sm:text-right cursor-pointer"
                >
                  Clear Tray
                </button>
              )}
            </div>

            {/* 4x4 Ballotin Tray Grid */}
            <div className="grid grid-cols-4 gap-3 bg-[#120a07] p-4 sm:p-6 rounded-xl border border-[#352115]">
              {Array.from({ length: TOTAL_SLOTS }).map((_, index) => {
                const filledTruffle = selectedTruffles[index];
                return (
                  <div
                    key={index}
                    onClick={() => filledTruffle && handleRemoveSlot(index)}
                    className={`aspect-square rounded-full border flex flex-col items-center justify-center text-center p-1 transition-all relative ${
                      filledTruffle
                        ? 'cursor-pointer border-[#c5a059] shadow-md hover:scale-95'
                        : 'border-[#352115] bg-[#1a0f0a]/60 border-dashed'
                    }`}
                    style={{
                      backgroundColor: filledTruffle ? filledTruffle.color : undefined
                    }}
                    title={filledTruffle ? `${filledTruffle.name} (Click to remove)` : 'Empty slot'}
                  >
                    {filledTruffle ? (
                      <span className="text-[9px] font-bold text-white/90 drop-shadow-sm px-1 leading-tight select-none">
                        {filledTruffle.name.split(' ')[0]}
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#5a3e2b] font-mono select-none">
                        {index + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Live Contents Breakdown */}
            {selectedTruffles.length > 0 && (
              <div className="p-3 bg-[#241712] rounded-lg border border-[#352115] text-xs font-serif text-[#ded4ca]">
                <span className="text-[10px] uppercase font-mono text-[#c5a059] block mb-1">Current Box Manifest:</span>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {TRUFFLE_VARIETIES.map(t => {
                    const count = selectedTruffles.filter(st => st.id === t.id).length;
                    if (count === 0) return null;
                    return (
                      <span key={t.id} className="px-2 py-0.5 rounded bg-[#1c100c] border border-[#c5a059]/30 text-[#fbf7f2]">
                        {count}× {t.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price & Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#352115]">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#9c8474]">Current Box Value</div>
                <div className="text-2xl font-paris text-[#c5a059] font-mono">${currentBoxPrice} USD</div>
                <span className="text-[10px] text-neutral-400 font-sans">($4.25 per Grand Cru truffle)</span>
              </div>

              <button
                disabled={selectedTruffles.length === 0}
                onClick={handleAddToCart}
                className={`w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-lg ${
                  selectedTruffles.length > 0
                    ? 'bg-[#c5a059] text-[#1c100c] hover:bg-[#d8b775] cursor-pointer shadow-lg'
                    : 'bg-[#2b1c14] text-[#7a6455] cursor-not-allowed'
                }`}
              >
                {customBoxAdded ? '✓ Added to Panier!' : `Pack & Seal Box (${selectedTruffles.length} pcs)`}
              </button>
            </div>

            {/* Confection Trust Details & Storage Guidance */}
            <div className="p-4 rounded-xl bg-[#150d0a] border border-[#352115] text-[11px] text-[#baa89b] space-y-2">
              <div className="flex items-center gap-2 text-[#c5a059] font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Allergen Notice:</span>
              </div>
              <p className="text-[10px] leading-relaxed">
                Contains dairy (fresh Normandy butter/cream), tree nuts (Piedmont hazelnuts, Iranian pistachio), and soy lecithin. 100% Gluten-Free facility.
              </p>
              <div className="flex items-center gap-2 text-[#c5a059] font-medium pt-1">
                <Thermometer className="w-3.5 h-3.5" />
                <span>Storage & Tasting Temperature:</span>
              </div>
              <p className="text-[10px] leading-relaxed">
                Best enjoyed at 16°C–18°C (60°F–64°F). Do not refrigerate. Shipped in insulated isothermal pouches with dry gel packs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
