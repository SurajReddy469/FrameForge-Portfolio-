import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Terminal, ShieldAlert, X } from 'lucide-react';

export function playCyberGlitchSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    // Quick dual-frequency cyber chirp
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.exponentialRampToValueAtTime(220, now + 0.05);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(1760, now);
    osc2.frequency.exponentialRampToValueAtTime(440, now + 0.04);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.07);
    osc2.stop(now + 0.07);
  } catch (e) {
    // audio context not allowed yet
  }
}

export function CyberDropLiveToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const feeds = [
    { id: '#042', city: 'SEOUL, KR', item: 'EXO-V4 TACTICAL SHELL', time: '12M AGO' },
    { id: '#089', city: 'BERLIN, DE', item: 'KINETIC CARGO V2', time: '24M AGO' },
    { id: '#114', city: 'BROOKLYN, NY', item: 'NEO-HOODIE 550 GSM', time: '38M AGO' },
    { id: '#019', city: 'TOKYO, JP', item: 'FIDLOCK BALACLAVA RIG', time: '1H AGO' }
  ];

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % feeds.length);
        setVisible(true);
      }, 400);
    }, 10000);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = feeds[index];

  return (
    <div
      className={`fixed bottom-4 right-4 z-30 max-w-xs bg-black/95 border border-[#ccff00]/60 p-3 shadow-2xl font-mono text-xs transition-all duration-500 brutal-shadow flex items-start gap-2.5 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="w-2 h-2 rounded-full bg-[#ccff00] shrink-0 mt-1" />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] text-[#ccff00] font-bold tracking-widest uppercase flex items-center gap-1.5">
          <Terminal className="w-3 h-3" />
          <span>DISPATCH LOG // {current.id}</span>
        </div>
        <p className="text-white font-bold tracking-tight truncate mt-0.5 text-xs">
          {current.item}
        </p>
        <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
          <span>{current.city}</span>
          <span className="text-neutral-500">{current.time}</span>
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-neutral-500 hover:text-white p-0.5"
        aria-label="Dismiss dispatch alert"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
