import React, { useState } from 'react';
import { ArrowRight, Sparkles, Copy, Check, Terminal, Play, Zap, ShieldCheck } from 'lucide-react';
import { codeSnippets } from '../data/saasData';

export default function HeroSection({ onOpenDemo, isDarkMode }) {
  const [activeLang, setActiveLang] = useState('node');
  const [copied, setCopied] = useState(false);

  const activeCodeObj = codeSnippets[activeLang];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCodeObj.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-sky-500/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Pill */}
        <div className="flex justify-center mb-6">
          <a
            href="#features"
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 group ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-700/80 text-violet-300 hover:border-violet-500/60 shadow-sm shadow-violet-500/10' 
                : 'bg-white border-slate-300 text-violet-700 hover:border-violet-400 shadow-sm'
            }`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span>NovaCloud Engine v3.4 is Live</span>
            <span className="text-slate-500">|</span>
            <span className="group-hover:translate-x-0.5 transition-transform">See What's New &rarr;</span>
          </a>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Next-Gen Cloud Orchestration for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400">
              Autonomous AI Agents
            </span>
          </h1>

          <p className={`mt-6 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Deploy isolated microVMs, distributed cache tiers, and serverless workflows in 310 global edge points with sub-18ms boot times.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenDemo()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 hover:from-violet-500 hover:to-sky-400 shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
            >
              <Zap className="w-5 h-5 text-amber-300" />
              <span>Deploy in 60 Seconds</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#architecture"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium border transition-colors ${
                isDarkMode 
                  ? 'border-slate-800 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:border-slate-700' 
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Explore Architecture Tour</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-violet-400" /> 14-day full Pro access
            </span>
          </div>
        </div>

        {/* Interactive Code Sandbox Terminal */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl shadow-violet-950/40 overflow-hidden">
            
            {/* Terminal Window Header */}
            <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-slate-800 mx-2" />
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-violet-400" />
                  <span>agent-runtime.config.ts</span>
                </div>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
                {Object.keys(codeSnippets).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveLang(key)}
                    className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                      activeLang === key
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {key === 'node' ? 'Node.js' : key === 'python' ? 'Python' : 'Go'}
                  </button>
                ))}
              </div>

              {/* Copy Code Button */}
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-mono bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                title="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Install Banner */}
            <div className="px-6 py-2 bg-violet-950/30 border-b border-violet-900/30 flex items-center justify-between text-xs font-mono text-violet-300">
              <span className="flex items-center gap-2">
                <span className="text-slate-500">$</span>
                <span>{activeCodeObj.command}</span>
              </span>
              <span className="text-[11px] text-slate-500 uppercase">CLI Ready</span>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-x-auto text-sm font-mono text-slate-200 bg-slate-950/60 leading-relaxed">
              <pre className="text-xs sm:text-sm">
                <code>
                  {activeCodeObj.code.split('\n').map((line, idx) => (
                    <div key={idx} className="table-row">
                      <span className="table-cell pr-6 select-none text-slate-600 text-right w-8">{idx + 1}</span>
                      <span className="table-cell">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
