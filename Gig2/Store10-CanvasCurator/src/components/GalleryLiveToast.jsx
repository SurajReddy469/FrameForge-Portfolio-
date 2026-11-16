import React, { useState, useEffect } from 'react';

const mockAcquisitions = [
  { institution: 'MoMA Contemporary Circle', location: 'New York, USA', artwork: 'Spatial Study 1928 (Ed. 03/25)', detail: 'Tru Vue Museum Glazed', time: '3 min ago' },
  { institution: 'Private Collector', location: 'Basel, Switzerland', artwork: 'Stone Lithograph No. 4', detail: 'Framed in Welsh Slate', time: '7 min ago' },
  { institution: 'Art Institute Curator', location: 'Chicago, IL, USA', artwork: 'Botanical Cyanotype Flora II', detail: 'Archival 8-Ply Cotton Mat', time: '13 min ago' },
  { institution: 'Fondation Beyeler Patron', location: 'Riehen, Switzerland', artwork: 'Minimalist Monochrome Study', detail: 'Certificate of Authenticity Verified', time: '21 min ago' },
  { institution: 'Tate Modern Benefactor', location: 'London, UK', artwork: 'Cyanotype Diptych Set', detail: 'Dispatched via Fine Art Courier', time: '28 min ago' },
];

export default function GalleryLiveToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockAcquisitions.length);
        setIsVisible(true);
      }, 700);
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  const current = mockAcquisitions[currentIndex];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm w-full transition-all duration-700 transform translate-y-0 opacity-100 font-sans pointer-events-none">
      <div className="bg-[#121214]/95 backdrop-blur-md text-[#f4f4f5] border border-amber-400/40 p-3.5 rounded-xl shadow-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/40 flex items-center justify-center flex-shrink-0 text-amber-400 font-serif font-bold text-base">
          CC
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
              Archival Acquisition
            </span>
            <span className="text-[10px] font-mono text-gray-500">{current.time}</span>
          </div>
          <p className="text-xs font-serif font-semibold text-white truncate mt-0.5">
            {current.institution} <span className="text-gray-400 font-sans text-[11px] font-normal">({current.location})</span>
          </p>
          <p className="text-[11px] text-gray-300 truncate font-sans">
            Accession: <span className="text-amber-300 font-medium">{current.artwork}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
