import React from 'react';
import { Bot, Sparkles, Volume2, VolumeX, MessageSquare, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audioSynth';

export default function Navbar({ onOpenChat, soundEnabled, setSoundEnabled }) {
  const toggleSound = () => {
    sounds.muted = soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sounds.playChime();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight">SupportForge</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI Agent
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">By FrameForge Architecture</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#playground" className="hover:text-indigo-400 transition-colors">Live RAG Demo</a>
          <a href="#knowledge-base" className="hover:text-indigo-400 transition-colors">Knowledge Base</a>
          <a href="#embed" className="hover:text-indigo-400 transition-colors">1-Line Embed</a>
          <a href="#roi" className="hover:text-indigo-400 transition-colors">ROI Calculator</a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Fiverr Packages</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute audio chimes" : "Enable audio chimes"}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all text-xs flex items-center gap-1.5"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span className="hidden lg:inline text-[11px]">{soundEnabled ? "Sound ON" : "Sound OFF"}</span>
          </button>

          {/* Open Widget CTA */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-indigo-600/30 transition-all active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Test Live Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
}
