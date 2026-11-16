import React from 'react';
import { Bot, ExternalLink, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">SupportForge AI</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Gig 6 Flagship
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Engineered by <strong>FrameForge</strong>. Delivering modern, production-ready AI Customer Support Agents and full-stack web solutions.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.fiverr.com/frameforgehq?public_mode=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all font-semibold text-xs"
              >
                <span>Hire FrameForge on Fiverr</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">FrameForge Flagships</h4>
            <ul className="space-y-1.5">
              <li>
                <a href="https://frameforge-novacloud.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>NovaCloud (Gig 2 SaaS)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://frame-forge-portfolio.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>UrbanNest (Gig 1 Real Estate)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://frameforge-fitpulse.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>FitPulse (Gig 1 Gym Portal)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Specs */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Architecture Stack</h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">React 19</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Tailwind CSS v4</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Gemini 1.5 Flash</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Vector RAG</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Web Audio API</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Vite</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} SupportForge AI by FrameForge Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision for top-tier Fiverr clients</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
