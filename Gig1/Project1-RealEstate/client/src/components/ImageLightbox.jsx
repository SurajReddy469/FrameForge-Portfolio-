import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const ImageLightbox = ({ images, activeIndex, isOpen, onClose, onNavigate }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, images.length, onClose, onNavigate]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="w-full max-w-6xl flex items-center justify-between text-white pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Maximize2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider">
            High-Resolution Gallery Viewer
          </span>
          <span className="text-xs text-slate-400">
            • Photo {activeIndex + 1} of {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4">
        
        {/* Prev Button */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((activeIndex - 1 + images.length) % images.length)}
            className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white backdrop-blur-md transition cursor-pointer shadow-xl"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={images[activeIndex]}
          alt={`Gallery item ${activeIndex + 1}`}
          className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl select-none"
        />

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((activeIndex + 1) % images.length)}
            className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white backdrop-blur-md transition cursor-pointer shadow-xl"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="w-full max-w-xl flex items-center justify-center gap-2.5 overflow-x-auto py-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(idx)}
            className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition shrink-0 cursor-pointer ${
              activeIndex === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

    </div>
  );
};

export default ImageLightbox;
