import React, { useState, useEffect } from 'react';
import { X, Droplets, Sparkles, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

export default function IngredientLabModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('centella');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const INGREDIENTS = {
    centella: {
      name: "Centella Asiatica (Cica)",
      extract: "Bio-Identical Madecassoside & Asiatic Acid 68%",
      origin: "Jeju Organic Volcanic Terraces",
      ph: "5.5 Balanced",
      penetration: "Deep Stratum Corneum to Basal Layer",
      mechanism: "Stimulates type-I collagen synthesis and suppresses pro-inflammatory cytokines (IL-1α and TNF-α).",
      clinicalResults: [
        { label: "Acid Mantle Barrier Recovery", value: "96% in 14 days" },
        { label: "Reduction in Transepidermal Water Loss", value: "-42% in 48 hours" },
        { label: "Visible Erythema (Flushing) Calming", value: "88% immediate relief" }
      ]
    },
    rice: {
      name: "Kyoto Fermented Rice Filtrate",
      extract: "Saccharomyces & Galactomyces Ferment 84%",
      origin: "Fushimi Rice Paddies, Kyoto",
      ph: "5.2 Micro-Acidic",
      penetration: "Epidermal Surface & Microbiome Layer",
      mechanism: "Naturally rich in amino acids, Kojic acid peptides, and vitamin B complexes that reinforce beneficial micro-flora.",
      clinicalResults: [
        { label: "Pore Volume & Texture Uniformity", value: "84% refinement" },
        { label: "Melanin Clustering Diminution", value: "79% more radiant" },
        { label: "Microbiome Diversity Index", value: "+3.2x vs. untreated" }
      ]
    },
    bakuchiol: {
      name: "Sytenol® A Bakuchiol",
      extract: "100% Pure Psoralea Corylifolia Seed Monoterpene 2%",
      origin: "Himalayan Foothills",
      ph: "5.6 Neutral",
      penetration: "Fibroblast Dermal Layer",
      mechanism: "Functions as a functional analog of retinol via retinoid receptor gene expression, without retinoic peeling or flaking.",
      clinicalResults: [
        { label: "Wrinkle Depth Diminution", value: "-20% at 12 weeks" },
        { label: "Skin Firmness & Elasticity", value: "+31% improvement" },
        { label: "Zero Retinoid Dermatitis or Purging", value: "100% tolerance rate" }
      ]
    }
  };

  const curr = INGREDIENTS[activeTab];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lab-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-[#fbf8f5] border border-[#ede8e1] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-[#2c322b]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#788574] hover:text-[#2c322b] p-1 cursor-pointer"
          aria-label="Close ingredient research lab"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#788574] text-xs uppercase tracking-wider font-medium">
          <Droplets className="w-4 h-4 text-[#3e473d]" />
          <span>PHYTOMEDICAL RESEARCH ARCHIVE</span>
        </div>
        <h2 id="lab-modal-title" className="font-serif text-3xl font-light text-[#2c322b] mb-4">
          Cellular Efficacy Laboratory
        </h2>

        {/* Tab Pills */}
        <div className="flex gap-2 border-b border-[#ede8e1] pb-4 mb-6 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('centella')}
            className={`px-4 py-2 rounded-full transition ${
              activeTab === 'centella' ? 'bg-[#3e473d] text-white' : 'bg-white text-[#788574] hover:bg-[#ede8e1]'
            }`}
          >
            Jeju Centella
          </button>
          <button
            onClick={() => setActiveTab('rice')}
            className={`px-4 py-2 rounded-full transition ${
              activeTab === 'rice' ? 'bg-[#3e473d] text-white' : 'bg-white text-[#788574] hover:bg-[#ede8e1]'
            }`}
          >
            Fermented Rice
          </button>
          <button
            onClick={() => setActiveTab('bakuchiol')}
            className={`px-4 py-2 rounded-full transition ${
              activeTab === 'bakuchiol' ? 'bg-[#3e473d] text-white' : 'bg-white text-[#788574] hover:bg-[#ede8e1]'
            }`}
          >
            Sytenol® A Bakuchiol
          </button>
        </div>

        {/* Active Ingredient Details */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#ede8e1]">
            <h3 className="font-serif text-xl font-normal text-[#2c322b]">{curr.name}</h3>
            <p className="text-xs text-[#788574] mt-0.5">{curr.extract} • Origin: {curr.origin}</p>
            <div className="mt-3 text-xs text-[#596455] leading-relaxed">
              <strong>Mechanism of Action:</strong> {curr.mechanism}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#f0eae1] border border-[#e2d8cb]">
              <span className="text-[10px] text-[#788574] block uppercase">Acid Balance:</span>
              <strong className="text-[#2c322b]">{curr.ph}</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#f0eae1] border border-[#e2d8cb]">
              <span className="text-[10px] text-[#788574] block uppercase">Dermal Penetration:</span>
              <strong className="text-[#2c322b]">{curr.penetration}</strong>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-medium text-[#2c322b] block">Third-Party In-Vivo Clinical Metrics:</span>
            {curr.clinicalResults.map((metric, mIdx) => (
              <div key={mIdx} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-white border border-[#ede8e1]">
                <span className="text-[#596455]">{metric.label}</span>
                <span className="font-bold text-[#3e473d]">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
