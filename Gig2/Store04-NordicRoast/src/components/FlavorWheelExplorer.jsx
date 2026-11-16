import React, { useState } from 'react';
import { Compass, Sparkles, Coffee, Sliders, CheckCircle2 } from 'lucide-react';
import { COFFEES } from '../data/coffeeData';

export default function FlavorWheelExplorer({ onSelectCoffee }) {
  const [minAcidity, setMinAcidity] = useState(70);
  const [minSweetness, setMinSweetness] = useState(80);

  const matchedCoffees = COFFEES.filter(c =>
    c.flavorMetrics.acidity >= minAcidity &&
    c.flavorMetrics.sweetness >= minSweetness
  );

  return (
    <section id="flavor-wheel" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc7] bg-[#f7efe4]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[#8c7462] font-mono text-xs uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#2b1d14]" /> INTERACTIVE TASTE RADAR
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#2b1d14]">
              Flavor Wheel Explorer
            </h2>
            <p className="mt-2 text-xs font-mono text-[#594637] max-w-xl">
              Filter our micro-lot roasts by sensory cupping notes. High-elevation Ethiopian and Colombian lots exhibit vibrant malic and citric acidity.
            </p>
          </div>

          {/* Interactive Sliders */}
          <div className="bg-white p-5 rounded-2xl border border-[#ebdcc7] w-full md:w-80 space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#8c7462]">Min Citric Acidity:</span>
                <span className="text-[#2b1d14] font-bold">{minAcidity}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={minAcidity}
                onChange={(e) => setMinAcidity(Number(e.target.value))}
                className="w-full accent-[#2b1d14] bg-[#ebdcc7] h-2 rounded cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#8c7462]">Min Cane Sweetness:</span>
                <span className="text-[#2b1d14] font-bold">{minSweetness}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                value={minSweetness}
                onChange={(e) => setMinSweetness(Number(e.target.value))}
                className="w-full accent-[#2b1d14] bg-[#ebdcc7] h-2 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matchedCoffees.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#ebdcc7] col-span-2 font-mono text-xs text-[#8c7462]">
              No single-origin lots match these exact sensory parameters. Lower the acidity or sweetness threshold.
            </div>
          ) : (
            matchedCoffees.map((coffee) => (
              <div
                key={coffee.id}
                className="p-6 bg-white rounded-2xl border border-[#ebdcc7] flex flex-col sm:flex-row gap-6 items-center"
              >
                <img
                  src={coffee.image}
                  alt={coffee.name}
                  className="w-24 h-24 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 font-mono text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-base font-serif text-[#2b1d14]">{coffee.name}</span>
                    <span className="text-[#2b1d14] font-bold">{coffee.priceFormatted}</span>
                  </div>
                  <div className="text-[11px] text-[#8c7462] mb-3">{coffee.origin}</div>
                  
                  {/* Sensory Bar Indicators */}
                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div className="p-2 bg-[#fcfaf7] rounded border border-[#ebdcc7]">
                      <span className="text-[#8c7462] block">Acidity:</span>
                      <strong className="text-[#2b1d14]">{coffee.flavorMetrics.acidity}%</strong>
                    </div>
                    <div className="p-2 bg-[#fcfaf7] rounded border border-[#ebdcc7]">
                      <span className="text-[#8c7462] block">Sweetness:</span>
                      <strong className="text-[#2b1d14]">{coffee.flavorMetrics.sweetness}%</strong>
                    </div>
                    <div className="p-2 bg-[#fcfaf7] rounded border border-[#ebdcc7]">
                      <span className="text-[#8c7462] block">Clarity:</span>
                      <strong className="text-[#2b1d14]">{coffee.flavorMetrics.clarity}%</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
