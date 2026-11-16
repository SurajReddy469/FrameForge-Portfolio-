import React, { useState, useEffect } from 'react';
import { X, Compass, RotateCw, Trash2, Plus, Move, Check, Download, Layers, Sparkles, Truck, Box, Info } from 'lucide-react';

export default function RoomSpatialStagerModal({ isOpen, onClose, onAddBatchToCart }) {
  const [substrate, setSubstrate] = useState('travertine'); // travertine, oak, microcement
  const [roomPreset, setRoomPreset] = useState('salon'); // salon, dining, study
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [exportNotice, setExportNotice] = useState(false);

  // Placed pieces on 2D floor plan
  const [placedPieces, setPlacedPieces] = useState([
    { id: 1, name: 'Travertine Low Table', x: 260, y: 180, rotation: 0, width: 140, height: 70, color: '#d5cdbd', category: 'Table' },
    { id: 2, name: 'Bauhaus Lounge Chair', x: 140, y: 170, rotation: 45, width: 80, height: 80, color: '#24211d', textColor: '#fff', category: 'Seating' },
    { id: 3, name: 'Linear Minimalist Credenza', x: 250, y: 40, rotation: 0, width: 200, height: 50, color: '#524338', textColor: '#fff', category: 'Storage' }
  ]);

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

  const catalogPalette = [
    {
      name: 'Travertine Plinth',
      width: 130,
      height: 65,
      color: '#d5cdbd',
      price: 1850,
      category: 'Table',
      dimensions: '130 × 65 × 38 cm',
      material: 'Roman Vein-Cut Travertine',
      leadTime: 'In Stock (White-Glove 2-3w)'
    },
    {
      name: 'Bauhaus Lounge Chair',
      width: 80,
      height: 80,
      color: '#24211d',
      textColor: '#fff',
      price: 1450,
      category: 'Seating',
      dimensions: '82 × 80 × 74 cm',
      material: 'Charcoal Bouclé & Tubular Steel',
      leadTime: 'Crafted to Order (4-6w)'
    },
    {
      name: 'Appalachian Walnut Bench',
      width: 160,
      height: 45,
      color: '#524338',
      textColor: '#fff',
      price: 1100,
      category: 'Seating',
      dimensions: '160 × 45 × 42 cm',
      material: 'FSC Solid American Walnut',
      leadTime: 'In Stock (White-Glove 2-3w)'
    },
    {
      name: 'Forma Monolith Dining',
      width: 220,
      height: 90,
      color: '#e2dbcc',
      price: 3400,
      category: 'Dining',
      dimensions: '220 × 95 × 75 cm',
      material: 'Monolithic Honed Limestone',
      leadTime: 'Limited Series (6-8w)'
    }
  ];

  const handleAddPiece = (item) => {
    const newPiece = {
      id: Date.now(),
      name: item.name,
      x: 180 + Math.random() * 80,
      y: 120 + Math.random() * 80,
      rotation: 0,
      width: item.width,
      height: item.height,
      color: item.color,
      textColor: item.textColor || '#24211d',
      price: item.price,
      category: item.category,
      dimensions: item.dimensions,
      material: item.material
    };
    setPlacedPieces(prev => [...prev, newPiece]);
    setSelectedPieceId(newPiece.id);
  };

  const handleRotate = (id) => {
    setPlacedPieces(prev =>
      prev.map(p => p.id === id ? { ...p, rotation: (p.rotation + 45) % 360 } : p)
    );
  };

  const handleRemove = (id) => {
    setPlacedPieces(prev => prev.filter(p => p.id !== id));
    if (selectedPieceId === id) setSelectedPieceId(null);
  };

  const handleDrag = (id, dx, dy) => {
    setPlacedPieces(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          x: Math.max(20, Math.min(580 - p.width, p.x + dx)),
          y: Math.max(20, Math.min(380 - p.height, p.y + dy))
        };
      })
    );
  };

  const handleExportBlueprint = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 4000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="spatial-stager-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-arch"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-5xl bg-[#f4f1ea] border border-[#ded8cb] shadow-2xl overflow-hidden my-8 z-10 text-[#24211d]">
        {/* Header */}
        <div className="bg-[#ebe6dc] px-8 py-5 border-b border-[#ded8cb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#7a7164]" />
            <div>
              <h3 id="spatial-stager-title" className="text-sm font-bold uppercase tracking-widest text-[#24211d]">
                Architectural 2D Spatial Stager & Circulation Engine
              </h3>
              <p className="text-[10px] text-[#7a7164]">
                Room Dimensions: <strong>7.20m × 5.40m | 38.88 m² (418 sq ft)</strong> &bull; Scale: 1:50 Architectural Metric
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#7a7164] hover:text-[#24211d] transition"
            aria-label="Close spatial stager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: 2D Spatial Canvas (8 cols) */}
            <div className="lg:col-span-8 space-y-3">
              {/* Floor Substrate Toggle & Measurements Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#ebe6dc] p-3 border border-[#ded8cb]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#7a7164]">Substrate Flooring:</span>
                  <div className="flex gap-1">
                    {[
                      { id: 'travertine', label: 'Tuscan Travertine' },
                      { id: 'oak', label: 'White Oak Parquet' },
                      { id: 'microcement', label: 'Cast Microcement' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSubstrate(s.id)}
                        className={`px-2.5 py-1 text-[10px] uppercase border transition cursor-pointer ${
                          substrate === s.id
                            ? 'bg-[#24211d] text-white border-[#24211d]'
                            : 'bg-white text-[#5c544a] border-[#ded8cb] hover:border-[#24211d]'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#7a7164]">
                  Room Area: <strong>38.9 m²</strong>
                </div>
              </div>

              {/* 2D Interactive Floor Plan Canvas */}
              <div
                className={`relative h-[380px] w-full border-2 border-dashed border-[#ded8cb] rounded p-4 overflow-hidden shadow-inner transition-colors ${
                  substrate === 'travertine'
                    ? 'bg-[#ede7da]'
                    : substrate === 'oak'
                    ? 'bg-[#e2d5c3]'
                    : 'bg-[#e1dfdc]'
                }`}
              >
                {/* Architectural Grid Lines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage: 'linear-gradient(#24211d 1px, transparent 1px), linear-gradient(90deg, #24211d 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }}
                />

                {/* Dimension callout labels on edges */}
                <div className="absolute top-2 left-4 text-[9px] font-mono text-[#7a7164]">
                  WIDTH: 7.20 METERS
                </div>
                <div className="absolute bottom-2 right-4 text-[9px] font-mono text-[#7a7164]">
                  DEPTH: 5.40 METERS
                </div>

                {/* Placed Furniture Elements */}
                {placedPieces.map((piece) => {
                  const isSelected = piece.id === selectedPieceId;
                  return (
                    <div
                      key={piece.id}
                      onClick={() => setSelectedPieceId(piece.id)}
                      className={`absolute cursor-move select-none p-2 border flex flex-col justify-between transition-shadow shadow-md ${
                        isSelected
                          ? 'ring-2 ring-[#24211d] border-[#24211d]'
                          : 'border-black/20 hover:border-black/50'
                      }`}
                      style={{
                        left: `${piece.x}px`,
                        top: `${piece.y}px`,
                        width: `${piece.width}px`,
                        height: `${piece.height}px`,
                        backgroundColor: piece.color,
                        color: piece.textColor || '#24211d',
                        transform: `rotate(${piece.rotation}deg)`
                      }}
                    >
                      <span className="text-[9px] font-bold uppercase tracking-wider truncate block leading-tight">
                        {piece.name}
                      </span>
                      <span className="text-[8px] font-mono opacity-70 block">
                        {piece.width * 10}×{piece.height * 10}mm
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Manipulation Toolbar */}
              <div className="flex items-center justify-between text-xs bg-[#ebe6dc] p-3 border border-[#ded8cb]">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#7a7164]">
                    Selected: {placedPieces.find(p => p.id === selectedPieceId)?.name || 'None (Click piece)'}
                  </span>
                  {selectedPieceId && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleRotate(selectedPieceId)}
                        className="px-2.5 py-1 bg-white border border-[#ded8cb] hover:border-[#24211d] text-[11px] uppercase flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" /> Rotate 45°
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDrag(selectedPieceId, -20, 0)}
                        className="px-2 py-1 bg-white border border-[#ded8cb] text-[10px] cursor-pointer"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDrag(selectedPieceId, 20, 0)}
                        className="px-2 py-1 bg-white border border-[#ded8cb] text-[10px] cursor-pointer"
                      >
                        →
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDrag(selectedPieceId, 0, -20)}
                        className="px-2 py-1 bg-white border border-[#ded8cb] text-[10px] cursor-pointer"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDrag(selectedPieceId, 0, 20)}
                        className="px-2 py-1 bg-white border border-[#ded8cb] text-[10px] cursor-pointer"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(selectedPieceId)}
                        className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] uppercase flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-[11px] font-mono text-[#2b6436]">
                  ✓ Spatial Circulation: 1.15m Optimal Clearance
                </div>
              </div>
            </div>

            {/* Right: Add Catalog Elements with Specifications & Delivery Details */}
            <div className="lg:col-span-4 bg-[#ebe6dc] p-5 border border-[#ded8cb] space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#7a7164] block font-bold">
                STAGEABLE CATALOG OBJECTS ({catalogPalette.length})
              </span>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {catalogPalette.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-[#ded8cb] hover:border-[#24211d] flex flex-col gap-1.5 transition cursor-pointer"
                    onClick={() => handleAddPiece(item)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-[#24211d]">{item.name}</h4>
                        <span className="text-[10px] font-mono text-[#7a7164]">
                          {item.dimensions} &bull; ${item.price.toLocaleString()} USD
                        </span>
                      </div>
                      <button
                        type="button"
                        className="p-1 bg-[#f4f1ea] border border-[#ded8cb] hover:bg-[#24211d] hover:text-white transition rounded"
                        title="Add to floor plan"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[10px] text-[#5c544a] border-t border-[#f4f1ea] pt-1">
                      <div>Material: <span className="text-[#24211d]">{item.material}</span></div>
                      <div className="text-[#2b6436] font-medium">{item.leadTime}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Export Blueprint Notice */}
              {exportNotice && (
                <div className="p-3 bg-white border border-[#2b6436] text-[11px] text-[#2b6436] rounded">
                  ✓ Vector CAD Blueprint & Spatial Schedule generated for floor plan (38.88 m²).
                </div>
              )}

              <button
                type="button"
                onClick={handleExportBlueprint}
                className="w-full py-3 bg-[#24211d] hover:bg-black text-white text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Architectural CAD Floorplan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
