import React, { useState } from 'react';
import { BREED_SIZING_GUIDE } from '../data/petData';
import { CheckCircle2, ArrowDown, ShieldCheck, Ruler } from 'lucide-react';

export default function BreedSizingCalculator({ onAddFittedBundle, onApplyRecommendedSize }) {
  const [selectedBreed, setSelectedBreed] = useState(BREED_SIZING_GUIDE[0]);
  const [customInches, setCustomInches] = useState('');
  const [bundleAdded, setBundleAdded] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState(false);

  const handleCustomCalculate = () => {
    const val = parseFloat(customInches);
    if (!val || val <= 0) return;

    if (val < 11) {
      setSelectedBreed({
        breed: `Custom (${val}") - Toy / Petite`,
        weight: "5 - 15 lbs",
        neckCircumference: `${val} inches`,
        recommendedSize: "Small",
        harnessTip: "Opt for our featherlight 0.5-inch width strap."
      });
    } else if (val <= 15) {
      setSelectedBreed({
        breed: `Custom (${val}") - Small / Compact`,
        weight: "15 - 30 lbs",
        neckCircumference: `${val} inches`,
        recommendedSize: "Small",
        harnessTip: "Standard 0.75-inch webbing provides ideal weight distribution."
      });
    } else if (val <= 20) {
      setSelectedBreed({
        breed: `Custom (${val}") - Athletic / Medium`,
        weight: "30 - 60 lbs",
        neckCircumference: `${val} inches`,
        recommendedSize: "Medium",
        harnessTip: "Our 1.0-inch heavy duty hardware withstands up to 600 lbs of pull force."
      });
    } else {
      setSelectedBreed({
        breed: `Custom (${val}") - Giant / Large`,
        weight: "60+ lbs",
        neckCircumference: `${val} inches`,
        recommendedSize: "Large",
        harnessTip: "Includes extra-thick neoprene neck padding for high-energy pulls."
      });
    }
  };

  const handleApplyToCatalog = () => {
    if (onApplyRecommendedSize) {
      onApplyRecommendedSize(selectedBreed.recommendedSize);
    }
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  const handleAddBundle = () => {
    onAddFittedBundle({
      id: `fitted-bundle-${Date.now()}`,
      name: `Fitted Walk Set Bundle (${selectedBreed.recommendedSize})`,
      price: 110,
      priceFormatted: "$110 USD",
      category: "Custom Walk Kit",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=400&q=80",
      description: `Custom sized for ${selectedBreed.breed}: Includes waterproof collar (${selectedBreed.recommendedSize}), 6ft leash, and brass-trimmed dispenser.`
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 3000);
  };

  return (
    <section id="sizing-guide" className="py-24 bg-[#ede5d5]/50 border-b border-[#e5ded0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-wider text-[#445341] block mb-2 font-bold">
            Guaranteed Perfect Fit Guarantee
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c332b] font-brand tracking-tight mb-4">
            Interactive Canine Sizing Diagnostic
          </h2>
          <p className="text-xs sm:text-sm text-[#556352] font-normal leading-relaxed">
            A poorly fitted collar or harness can cause tracheal pressure or chafing. Select your dog's breed or enter their neck circumference for veterinarian-calibrated sizing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Select Breed Left */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-[#445341] font-bold mb-3">
              1. Choose Common Breed
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BREED_SIZING_GUIDE.map((item) => (
                <button
                  key={item.breed}
                  onClick={() => setSelectedBreed(item)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedBreed.breed === item.breed
                      ? 'bg-[#445341] text-[#fcfaf4] border-[#445341] shadow-sm'
                      : 'bg-[#fcfaf4] text-[#2c332b] border-[#e5ded0] hover:border-[#445341]'
                  }`}
                >
                  <div className="font-bold text-sm">{item.breed}</div>
                  <div className={`text-xs mt-1 ${selectedBreed.breed === item.breed ? 'text-[#d5e0d3]' : 'text-[#798875]'}`}>
                    {item.weight}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom neck measurement option */}
            <div className="pt-4 border-t border-[#e5ded0]">
              <span className="text-xs uppercase tracking-wider text-[#445341] font-bold block mb-2">
                Or Enter Tape Measurement:
              </span>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="e.g. 16.5"
                  value={customInches}
                  onChange={(e) => setCustomInches(e.target.value)}
                  className="bg-white border border-[#e5ded0] px-4 py-2.5 rounded-xl text-xs text-[#2c332b] focus:outline-none focus:border-[#445341] flex-1 font-mono"
                />
                <button
                  onClick={handleCustomCalculate}
                  className="px-5 py-2.5 bg-[#445341] text-[#fcfaf4] rounded-xl text-xs font-bold hover:bg-[#323d30] transition-colors cursor-pointer"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>

          {/* Sizing Diagnostic Card Right */}
          <div className="lg:col-span-6 bg-[#fcfaf4] border border-[#445341] rounded-2xl p-8 sm:p-10 shadow-lg relative space-y-6">
            <div className="flex items-center justify-between">
              <div className="inline-block bg-[#445341] text-[#fcfaf4] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                Calibrated Fit Recommendation
              </div>
              <span className="text-xs font-mono text-[#798875]">100% Chew-Proof</span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-brand text-[#2c322b] mb-1">
                {selectedBreed.breed}
              </h3>
              <p className="text-xs text-[#798875]">Based on anatomical neck-to-shoulder ratio measurements</p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-[#e5ded0]">
                <span className="text-[#798875] font-semibold">Recommended Collar Size:</span>
                <span className="font-bold text-[#445341] text-base">{selectedBreed.recommendedSize}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#e5ded0]">
                <span className="text-[#798875] font-semibold">Neck Circumference Range:</span>
                <span className="font-semibold text-[#2c332b]">{selectedBreed.neckCircumference}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#e5ded0]">
                <span className="text-[#798875] font-semibold">Average Adult Weight:</span>
                <span className="font-semibold text-[#2c332b]">{selectedBreed.weight}</span>
              </div>
              <div className="py-2 text-[#556352] bg-[#f7f2e7] p-3 rounded-lg leading-relaxed text-xs">
                <strong>Anatomical Tip:</strong> {selectedBreed.harnessTip}
              </div>
            </div>

            {/* Direct Recommendation Transfer to Products */}
            <div className="p-4 bg-[#ece4d4] rounded-xl border border-[#ded5c3] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#2c322b] block">Transfer to Catalog</span>
                <span className="text-[11px] text-[#556352]">Pre-selects Size {selectedBreed.recommendedSize} across all gear</span>
              </div>
              <button
                type="button"
                onClick={handleApplyToCatalog}
                className="px-4 py-2 bg-white border border-[#445341] text-[#445341] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#445341] hover:text-white transition cursor-pointer"
              >
                {appliedNotice ? '✓ Applied!' : `Apply ${selectedBreed.recommendedSize}`}
              </button>
            </div>

            {/* Bundle Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#798875]">Fitted 3-Piece Bundle (15% Off)</div>
                <div className="text-xl font-extrabold text-[#445341]">$110 USD <span className="text-xs text-[#798875] line-through font-normal">$130</span></div>
              </div>

              <button
                onClick={handleAddBundle}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#445341] text-[#fcfaf4] rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-[#323d30] transition-colors shadow-md cursor-pointer"
              >
                {bundleAdded ? '✓ Bundle Added!' : `Add ${selectedBreed.recommendedSize} Bundle`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
