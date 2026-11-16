import React, { useState, useEffect } from 'react';

const mockDispatches = [
  { rider: 'UCI Pro Team Athlete', location: 'Girona, Catalonia', item: 'Chrono Pro Speedsuit (M)', time: '3 min ago', aeroGain: '-19.4W' },
  { rider: 'Olympic Triathlete', location: 'Boulder, CO, USA', item: 'Hydro-Shield Thermal Jacket', time: '7 min ago', aeroGain: '-12.0W' },
  { rider: 'Gran Fondo Competitor', location: 'Innsbruck, Austria', item: 'Apex Dimple Aero Bib', time: '11 min ago', aeroGain: '-8.5W' },
  { rider: 'Criterium Specialist', location: 'Flanders, Belgium', item: 'VeloCore Aero Trip Jersey', time: '15 min ago', aeroGain: '-14.2W' },
  { rider: 'National TT Champion', location: 'Melbourne, Australia', item: '2x Chrono Pro Speedsuit (L)', time: '21 min ago', aeroGain: '-22.1W' },
];

export default function VeloLiveToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockDispatches.length);
        setIsVisible(true);
      }, 600);
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  const current = mockDispatches[currentIndex];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm w-full transition-all duration-500 transform translate-y-0 opacity-100 font-sans pointer-events-none">
      <div className="bg-[#0c1424]/95 backdrop-blur-md border border-[#00f0ff]/30 p-3.5 rounded-xl shadow-2xl shadow-[#00f0ff]/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center flex-shrink-0 text-[#00f0ff]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[#00f0ff] font-bold tracking-wider">
              Telemetry Dispatch • {current.aeroGain}
            </span>
            <span className="text-[10px] font-mono text-gray-500">{current.time}</span>
          </div>
          <p className="text-xs font-semibold text-white truncate mt-0.5">
            {current.rider} <span className="text-gray-400 font-normal">({current.location})</span>
          </p>
          <p className="text-[11px] text-gray-300 truncate">
            Acquired: <span className="text-[#00f0ff] font-mono">{current.item}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
