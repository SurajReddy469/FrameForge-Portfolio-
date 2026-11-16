import React, { useState, useEffect } from 'react';
import { X, Check, Award, Sparkles, Heart, ZoomIn, PackageCheck, Snowflake } from 'lucide-react';

export default function ProductDetailModal({ item, isOpen, onClose, onAddToCart }) {
  const [boxStyle, setBoxStyle] = useState('Velvet Noir & Gold');
  const [includeChampagneTruffles, setIncludeChampagneTruffles] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (item) {
      setBoxStyle('Velvet Noir & Gold');
      setIncludeChampagneTruffles(false);
      setAdded(false);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const basePrice = item.price || 48;
  const totalPrice = basePrice + (includeChampagneTruffles ? 22 : 0);

  const handleAdd = () => {
    onAddToCart({
      ...item,
      price: totalPrice,
      boxStyle,
      includeChampagneTruffles,
      cartLineId: `${item.id}-${boxStyle}-${includeChampagneTruffles ? 'champ' : 'nochamp'}`
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-paris"
    >
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#1c100c] border border-[#c5a059]/40 rounded-xl shadow-2xl overflow-hidden my-8 z-10 text-[#fbf7f2]">
        {/* Header */}
        <div className="bg-[#241712] px-8 py-5 border-b border-[#352115] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#c5a059]" />
            <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">
              FICHE DÉGUSTATION // {item.category || 'GRAND CRU CONFECTION'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#9c8474] hover:text-[#fbf7f2] transition cursor-pointer"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-[#140b08] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#352115]">
            <img
              src={item.image}
              alt={item.name}
              className={`max-h-[360px] w-full object-cover rounded transition-all duration-300 ${
                isZoomed ? 'scale-125' : 'scale-100'
              }`}
            />
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 bg-[#241712]/90 border border-[#c5a059]/50 hover:border-[#c5a059] px-3 py-1.5 text-[10px] uppercase tracking-widest flex items-center gap-1.5 text-[#ded4ca] cursor-pointer rounded"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{isZoomed ? 'Réinitialiser' : 'Inspecter Ganache'}</span>
            </button>
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#c5a059] mb-1 font-sans">
                <span className="tracking-wider">ORIGINE PUR PLANTATION</span>
                <span>{item.pieces || '16 Pièces'}</span>
              </div>

              <h2 id="product-detail-title" className="text-3xl font-normal text-[#fbf7f2] mb-2">
                {item.name}
              </h2>

              <p className="text-xs text-[#ded4ca] font-light leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Flavor & Allergen Profile Card */}
              <div className="p-4 bg-[#241712] border border-[#352115] rounded space-y-2 text-xs font-sans mb-4">
                <div className="flex justify-between">
                  <span className="text-[#9c8474]">Terroir Cacao:</span>
                  <span className="text-[#fbf7f2] font-medium">{item.terroir || 'Criollo Chuao 74%'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9c8474]">Texture en Bouche:</span>
                  <span className="text-[#fbf7f2] font-medium">Ganache soyeuse à infusion lente</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#352115] text-[#c5a059]">
                  <span className="flex items-center gap-1">
                    <Snowflake className="w-3.5 h-3.5" /> Conservation Froid:
                  </span>
                  <span>16°C &bull; Sans humidité</span>
                </div>
              </div>

              {/* Box Style */}
              <div className="mb-4 font-sans">
                <span className="text-[10px] uppercase tracking-wider text-[#c5a059] block mb-1.5">
                  1. Écrin & Ruban Artisanal:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Velvet Noir & Gold', 'Bourgogne Imperial Ribbon'].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setBoxStyle(style)}
                      className={`py-2 px-2 border rounded text-center transition ${
                        boxStyle === style
                          ? 'bg-[#c5a059] text-[#1c100c] border-[#c5a059] font-bold'
                          : 'bg-[#140b08] text-[#ded4ca] border-[#352115] hover:border-[#c5a059]'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Champagne Truffles Add-on */}
              <label className="flex items-start gap-3 p-3 bg-[#241712] rounded border border-[#352115] hover:border-[#c5a059] cursor-pointer transition select-none font-sans">
                <input
                  type="checkbox"
                  checked={includeChampagneTruffles}
                  onChange={(e) => setIncludeChampagneTruffles(e.target.checked)}
                  className="mt-0.5 accent-[#c5a059]"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Ajouter Écrin 4 Truffes au Champagne Grand Cru</span>
                    <span className="text-[#c5a059]">+$22</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">
                    Truffes enrobées de poudre de cacao brut infusées au Champagne Millésimé et marc de raisin.
                  </div>
                </div>
              </label>
            </div>

            {/* Total Valuation & Submit */}
            <div className="pt-4 border-t border-[#352115] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#9c8474] block font-sans">Prix de la Pièce:</span>
                <span className="text-2xl font-bold text-[#c5a059]">${totalPrice} USD</span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="px-8 py-3.5 bg-[#c5a059] hover:bg-[#b08c46] text-[#1c100c] text-xs uppercase tracking-widest font-bold rounded transition cursor-pointer shadow-lg shadow-[#c5a059]/20 font-sans"
              >
                {added ? "Ajouté au Panier!" : "Ajouter à la Dégustation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
