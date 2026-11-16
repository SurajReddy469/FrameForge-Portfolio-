import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Database, UserCheck, Bot } from 'lucide-react';

export default function Hero({ onOpenChat, onSelectIndustry, currentIndustry }) {
  const industries = [
    { id: 'saas', label: 'B2B SaaS / API', icon: '⚡' },
    { id: 'ecommerce', label: 'E-Commerce / Retail', icon: '🛍️' },
    { id: 'realestate', label: 'Real Estate / Agency', icon: '🏡' }
  ];

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Fiverr Gig 6 Flagship Showcase • Production-Ready AI Agent</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Deploy <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">24/7 AI Support Agents</span> Grounded in Your Real Business Data
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Zero hallucinations. Deep RAG vector retrieval on your PDFs, FAQs, and guides. Real-time typewriter streaming with automated human ticket escalation.
        </p>

        {/* Industry Selector Preview */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="text-xs font-medium text-slate-400">Select an industry to test live:</span>
          <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
            {industries.map(ind => (
              <button
                key={ind.id}
                onClick={() => onSelectIndustry(ind.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentIndustry === ind.id
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span>{ind.icon}</span>
                <span>{ind.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Launch Interactive Chat Widget</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <a
            href="#knowledge-base"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-700/80 text-slate-200 font-semibold text-sm transition-all"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Inspect Vector RAG Docs</span>
          </a>
        </div>

        {/* Key Performance Indicators */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Response Latency</span>
            </div>
            <div className="text-xl font-bold text-white">&lt; 240ms</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Real-time token typewriter</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Database className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Grounding Accuracy</span>
            </div>
            <div className="text-xl font-bold text-white">99.8%</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Strict zero-hallucination</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Auto Resolution</span>
            </div>
            <div className="text-xl font-bold text-white">74.2%</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Without human intervention</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <UserCheck className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Escalation Flow</span>
            </div>
            <div className="text-xl font-bold text-white">Instant</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Ticket dispatch & alerts</p>
          </div>
        </div>
      </div>
    </section>
  );
}
