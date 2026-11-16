import React, { useState, useEffect } from 'react';
import { X, Zap, ShieldAlert, Sparkles, CheckCircle2, Copy } from 'lucide-react';

export default function DropPassModal({ isOpen, onClose }) {
  const [passCode, setPassCode] = useState('CYBER2026');
  const [isGenerated, setIsGenerated] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tokenCopied, setTokenCopied] = useState(false);

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

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText("0x7F2A...NYC-VIP-DROP-004");
    setTokenCopied(true);
    setTimeout(() => setTokenCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drop-pass-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-xl bg-[#090909] border-2 border-[#ccff00] brutal-shadow overflow-hidden my-8 z-10 text-white font-mono p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-black border border-white hover:border-[#ccff00] text-white hover:text-[#ccff00] flex items-center justify-center font-bold"
          aria-label="Close pass generator"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00] text-[#ccff00] text-[10px] font-black uppercase tracking-widest mb-3">
            <Zap className="w-3 h-3 fill-[#ccff00]" />
            VIP ARCHIVE PASS
          </div>
          <h2 id="drop-pass-title" className="text-2xl font-black uppercase text-white">
            Underground Drop Pass
          </h2>
          <p className="text-xs text-neutral-400 mt-2">
            Generate an encrypted proof-of-authenticity keycard granting early 15-minute priority queue access for Drop 005.
          </p>
        </div>

        {/* Holographic 3D Pass Simulation */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-[1.586] w-full max-w-sm mx-auto bg-gradient-to-tr from-neutral-900 via-neutral-950 to-black border-2 border-neutral-700 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-150 rounded-xl overflow-hidden mb-6"
          style={{
            transform: `perspective(800px) rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg)`,
            boxShadow: `${-mousePos.x * 25}px ${mousePos.y * 25}px 30px rgba(204,255,0,0.15)`
          }}
        >
          {/* Foil Shine Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/15 to-transparent pointer-events-none transition-opacity"
            style={{
              transform: `translateX(${mousePos.x * 120}%) rotate(25deg)`
            }}
          />

          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-[#ccff00] text-[10px] font-black tracking-widest uppercase block">ZERO//GRAVITY</span>
              <span className="text-neutral-500 text-[9px] uppercase">CRYPTOGRAPHIC ALLOCATION KEY</span>
            </div>
            <Zap className="w-5 h-5 text-[#ccff00] fill-[#ccff00]" />
          </div>

          <div className="z-10 text-center py-2">
            <div className="text-xl font-black tracking-widest text-white">
              {passCode || 'PASS-NYC-909'}
            </div>
            <div className="text-[9px] text-[#ccff00] tracking-wider mt-1">TIER 1 ARCHIVE CLEARANCE</div>
          </div>

          <div className="flex justify-between items-end text-[9px] text-neutral-400 font-mono z-10 pt-2 border-t border-neutral-800">
            <div>STATUS: <span className="text-emerald-400">ACTIVE</span></div>
            <div>EXP: DROP 005 DISPATCH</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopyToken}
            className="flex-1 py-3 bg-[#111] hover:bg-[#222] border border-[#333] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
          >
            {tokenCopied ? <CheckCircle2 className="w-4 h-4 text-[#ccff00]" /> : <Copy className="w-4 h-4" />}
            <span>{tokenCopied ? 'CODE COPIED' : 'COPY PASS CODE'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-black uppercase tracking-wider brutal-shadow transition"
          >
            CONFIRM & RETURN
          </button>
        </div>
      </div>
    </div>
  );
}
