import React, { useState } from 'react';
import { Coffee, Flame, Droplets, Clock, ArrowRight, Check, Award, Thermometer } from 'lucide-react';
import { COFFEES } from '../data/coffeeData';

export default function InPageBrewCalculator({ onSelectRatio }) {
  const [method, setMethod] = useState('v60'); // v60, chemex, aeropress, french
  const [selectedCoffeeId, setSelectedCoffeeId] = useState(COFFEES[0].id);
  const [cups, setCups] = useState(2); // 1 to 4 cups
  const [isPouring, setIsPouring] = useState(false);

  const selectedCoffee = COFFEES.find(c => c.id === selectedCoffeeId) || COFFEES[0];

  const methods = {
    v60: { name: 'Hario V60', ratio: 16, grind: 'Medium-Fine (Sand)', temp: '93°C / 200°F', bloom: '45s' },
    chemex: { name: 'Classic Chemex', ratio: 15, grind: 'Medium-Coarse', temp: '94°C / 202°F', bloom: '60s' },
    aeropress: { name: 'Inverted Aeropress', ratio: 13, grind: 'Fine Espresso Grind', temp: '88°C / 190°F', bloom: '30s' },
    french: { name: 'Nordic French Press', ratio: 14, grind: 'Coarse Sea Salt', temp: '95°C / 204°F', bloom: '4m Steep' }
  };

  const currentMethod = methods[method];
  const waterMl = cups * 250;
  const coffeeGrams = (waterMl / currentMethod.ratio).toFixed(1);
  const bloomMl = Math.round(coffeeGrams * 3);

  const triggerPourAnimation = () => {
    setIsPouring(true);
    setTimeout(() => setIsPouring(false), 1600);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc7] bg-[#f9f6f0] font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebdcc7] text-[#2b1d14] text-xs font-mono font-bold uppercase mb-2">
              <Coffee className="w-3.5 h-3.5" /> SPECIALTY COFFEE EXTRACTION ENGINE
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-black text-[#2b1d14] tracking-tight">
              Interactive Coffee Brew Calculator
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500 bg-white px-3.5 py-1.5 rounded-full border border-[#ebdcc7]">
            CONNECTED TO: <strong className="text-[#2b1d14]">{selectedCoffee.name}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-[#ebdcc7] shadow-xl">
          {/* Controls: Coffee Selection, Method & Cups (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Coffee Bean */}
            <div>
              <label className="text-xs font-mono uppercase font-bold text-neutral-500 block mb-2">
                1. Select Current Roast
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COFFEES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCoffeeId(c.id)}
                    className={`p-3 rounded-xl border text-left transition font-mono text-xs cursor-pointer ${
                      selectedCoffeeId === c.id
                        ? 'bg-[#2b1d14] text-white border-[#2b1d14] shadow font-bold'
                        : 'bg-[#faf8f5] text-neutral-600 border-[#e8dfd3] hover:border-neutral-400'
                    }`}
                  >
                    <div className="truncate">{c.name}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">{c.origin} • {c.scaScore}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Extraction Method */}
            <div>
              <label className="text-xs font-mono uppercase font-bold text-neutral-500 block mb-2">
                2. Select Extraction Apparatus
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(methods).map(([key, m]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMethod(key)}
                    className={`p-3 rounded-xl border text-left transition font-mono text-xs cursor-pointer ${
                      method === key
                        ? 'bg-[#2b1d14] text-white border-[#2b1d14] shadow-md font-bold'
                        : 'bg-[#faf8f5] text-neutral-600 border-[#e8dfd3] hover:border-neutral-400'
                    }`}
                  >
                    <div>{m.name.split(' ')[1] || m.name}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">1:{m.ratio} Ratio</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Cups Slider */}
            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="uppercase font-bold text-neutral-500">Yield Volume:</span>
                <span className="text-[#2b1d14] font-bold text-sm">
                  {cups} {cups === 1 ? 'Cup' : 'Cups'} ({waterMl} ml Total Water)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={cups}
                onChange={(e) => setCups(Number(e.target.value))}
                className="w-full accent-[#2b1d14] h-2 bg-neutral-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                <span>1 Cup (250ml)</span>
                <span>2 Cups (500ml)</span>
                <span>3 Cups (750ml)</span>
                <span>4 Cups (1000ml)</span>
              </div>
            </div>
          </div>

          {/* Right Precision Telemetry Box (5 cols) */}
          <div className="lg:col-span-5 bg-[#faf8f5] border-2 border-[#ebdcc7] p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#ebdcc7]">
              <div>
                <span className="text-[10px] font-mono text-[#8c7462] uppercase block">TARGET EXTRACTION</span>
                <span className="font-serif text-2xl font-bold text-[#2b1d14]">{currentMethod.name}</span>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="text-neutral-500 block text-[10px]">GOLDEN RATIO</span>
                <span className="font-bold text-[#2b1d14]">1 : {currentMethod.ratio}</span>
              </div>
            </div>

            {/* Dialed Metric Cards */}
            <div className="grid grid-cols-2 gap-4 my-6 font-mono">
              <div className="p-4 bg-white rounded-xl border border-[#ebdcc7]">
                <span className="text-[10px] text-neutral-500 block uppercase">COFFEE DOSE</span>
                <div className="text-3xl font-black text-[#2b1d14] mt-1">{coffeeGrams}g</div>
                <span className="text-[10px] text-[#8c7462]">{selectedCoffee.name.split(' ')[0]}</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#ebdcc7]">
                <span className="text-[10px] text-neutral-500 block uppercase">WATER TOTAL</span>
                <div className="text-3xl font-black text-[#2b1d14] mt-1">{waterMl}ml</div>
                <span className="text-[10px] text-[#8c7462]">Filtered 93°C</span>
              </div>
            </div>

            {/* Brewing Steps Guidance */}
            <div className="space-y-2 text-xs font-mono text-neutral-600 pb-6 border-b border-[#ebdcc7]">
              <div className="flex justify-between">
                <span>1. Bloom Pour:</span>
                <strong className="text-[#2b1d14]">{bloomMl}ml for {currentMethod.bloom}</strong>
              </div>
              <div className="flex justify-between">
                <span>2. Burr Grind:</span>
                <strong className="text-[#2b1d14]">{currentMethod.grind}</strong>
              </div>
              <div className="flex justify-between">
                <span>3. Kettle Temp:</span>
                <strong className="text-[#2b1d14]">{currentMethod.temp}</strong>
              </div>
            </div>

            {/* Interactive Pour Simulator */}
            <div className="pt-6">
              <button
                type="button"
                onClick={triggerPourAnimation}
                disabled={isPouring}
                className="w-full py-3.5 bg-[#2b1d14] hover:bg-[#3d2a1d] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Droplets className={`w-4 h-4 ${isPouring ? 'animate-bounce text-[#ebdcc7]' : ''}`} />
                <span>{isPouring ? `Pouring ${coffeeGrams}g Extraction...` : `Simulate Pour Extraction`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
