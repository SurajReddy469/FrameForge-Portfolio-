import React, { useState } from 'react';
import { MessageSquare, Bot, Sparkles, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Playground from './components/Playground';
import Features from './components/Features';
import RagInspector from './components/RagInspector';
import EmbedGenerator from './components/EmbedGenerator';
import RoiCalculator from './components/RoiCalculator';
import PricingTiers from './components/PricingTiers';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import { sounds } from './utils/audioSynth';

export default function App() {
  const [activeIndustry, setActiveIndustry] = useState('saas');
  const [customDocs, setCustomDocs] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleFloatingChat = () => {
    if (!isChatOpen) {
      sounds.playChime();
    }
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative">
      {/* Top Navbar */}
      <Navbar
        onOpenChat={() => {
          setIsChatOpen(true);
          sounds.playChime();
        }}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero
          onOpenChat={() => {
            setIsChatOpen(true);
            sounds.playChime();
          }}
          onSelectIndustry={setActiveIndustry}
          currentIndustry={activeIndustry}
        />

        <Playground
          activeIndustry={activeIndustry}
          onIndustryChange={setActiveIndustry}
          customDocs={customDocs}
          soundEnabled={soundEnabled}
        />

        <Features />

        <RagInspector
          activeIndustry={activeIndustry}
          customDocs={customDocs}
          setCustomDocs={setCustomDocs}
        />

        <EmbedGenerator />

        <RoiCalculator
          onOpenChat={() => {
            setIsChatOpen(true);
            sounds.playChime();
          }}
        />

        <PricingTiers
          onOpenChat={() => {
            setIsChatOpen(true);
            sounds.playChime();
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Chat Launcher Button (Bottom Right) */}
      {!isChatOpen && (
        <button
          onClick={toggleFloatingChat}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white shadow-2xl shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group border border-white/20"
          aria-label="Open AI Support Chat"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-600 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-600" />
          </div>

          <div className="text-left hidden sm:block pr-1">
            <div className="text-xs font-bold leading-none">24/7 AI Support</div>
            <div className="text-[10px] text-indigo-100 opacity-90 leading-tight mt-0.5">Ask questions & test RAG</div>
          </div>
        </button>
      )}

      {/* Floating Chat Widget Popup */}
      <ChatWidget
        mode="floating"
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        activeIndustry={activeIndustry}
        onIndustryChange={setActiveIndustry}
        customDocs={customDocs}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
