import React from 'react';

export default function TopGalleryBar() {
  return (
    <div className="bg-[#111111] text-[#f5f5f5] py-2 px-4 text-xs tracking-wider border-b border-[#222222]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a68b55]"></span>
          <span className="font-light text-[#cccccc]">
            Museum Archival Guarantee: 100% Acid-Free Rag & Tru Vue® UV Anti-Reflective Glass
          </span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-[#999999]">
          <span className="hidden md:inline">London & New York Gallery Inquiries</span>
          <span>•</span>
          <a href="#wall-preview" className="hover:text-white transition-colors underline decoration-[#555555]">
            Interactive Wall Visualizer
          </a>
          <span>•</span>
          <span className="font-medium text-[#cccccc]">Curator Direct: +44 20 7946 0991</span>
        </div>
      </div>
    </div>
  );
}
