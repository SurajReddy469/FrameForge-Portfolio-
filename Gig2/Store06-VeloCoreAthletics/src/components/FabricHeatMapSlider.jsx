import React, { useState } from 'react';
import { Gauge, Zap, Wind, Sun, Snowflake } from 'lucide-react';

export default function FabricHeatMapSlider() {
  const [ambientTemp, setAmbientTemp] = useState(22); // Celsius (0 to 40)

  // Environmental state calculation
  let stateTitle = "Optimal Aerodynamic Flow Zone";
  let stateColor = "text-[#00f0ff]";
  let skinCooling = "-1.8°C";
  let vaporExhaustRate = "240 g/m²/hr";
  let windResistance = "100% Wind-Deflection Active";

  if (ambientTemp < 10) {
    stateTitle = "Alpine Windstorm Barrier Mode";
    stateColor = "text-sky-400";
    skinCooling = "+4.2°C Thermal Retention";
    vaporExhaustRate = "120 g/m²/hr";
    windResistance = "Pertex Quantum Shield Engaged";
  } else if (ambientTemp > 28) {
    stateTitle = "Extreme Heatwave Vapor Release";
    stateColor = "text-amber-400";
    skinCooling = "-3.6°C Active Evaporative Chill";
    vaporExhaustRate = "480 g/m²/hr";
    windResistance = "Max Open-Mesh Venting";
  }

  return (
    <section id="thermal-map" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1a233a] bg-[#090e1b]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0f1b36] border border-[#00f0ff]/40 text-xs font-mono text-[#00f0ff] mb-3">
            <Gauge className="w-3.5 h-3.5" /> CLIMATIC STRESS SIMULATOR
          </div>
          <h2 className="text-4xl sm:text-5xl font-sport font-black uppercase text-white tracking-tight italic">
            Fabric Thermal Regulation
          </h2>
          <p className="mt-2 text-xs font-mono text-neutral-400 max-w-xl mx-auto">
            Simulate ambient weather conditions to inspect how our Swiss Schoeller® ceramic micro-yarns adapt between freezing alpine descents and high-desert marathons.
          </p>
        </div>

        {/* Interactive Climate Station */}
        <div className="max-w-4xl mx-auto bg-[#11192e] border-2 border-[#1e2a4a] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs font-mono mb-3">
              <span className="text-neutral-400 flex items-center gap-1.5">
                {ambientTemp < 12 ? <Snowflake className="w-4 h-4 text-sky-400" /> : ambientTemp > 26 ? <Sun className="w-4 h-4 text-amber-400" /> : <Wind className="w-4 h-4 text-[#00f0ff]" />}
                SIMULATE AMBIENT TEMPERATURE:
              </span>
              <span className="text-2xl font-sport font-black text-white italic">{ambientTemp}°C ({Math.round(ambientTemp * 1.8 + 32)}°F)</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={ambientTemp}
              onChange={(e) => setAmbientTemp(Number(e.target.value))}
              className="w-full accent-[#00f0ff] bg-black h-2.5 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2">
              <span>0°C (Alpine Descent)</span>
              <span>20°C (Optimal Race Day)</span>
              <span>40°C (Extreme Sahara)</span>
            </div>
          </div>

          {/* Visual Adaptive Heat-Map Card */}
          <div className="p-8 bg-[#0a0f1d] border border-[#1e2a4a] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">FABRIC REACTION STATUS</span>
              <h3 className={`font-sport font-black text-2xl uppercase italic ${stateColor}`}>
                {stateTitle}
              </h3>
              <p className="text-xs font-mono text-neutral-400 max-w-md">
                Micro-pores dynamically expand or constrict based on sweat vapor pressure and external air density.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono w-full md:w-auto shrink-0">
              <div className="p-3 bg-[#11192e] rounded-xl border border-[#1e2a4a]">
                <span className="text-neutral-500 block text-[10px]">VAPOR RELEASE:</span>
                <strong className="text-white text-sm">{vaporExhaustRate}</strong>
              </div>
              <div className="p-3 bg-[#11192e] rounded-xl border border-[#1e2a4a]">
                <span className="text-neutral-500 block text-[10px]">SKIN REGULATION:</span>
                <strong className="text-[#00f0ff] text-sm">{skinCooling}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
