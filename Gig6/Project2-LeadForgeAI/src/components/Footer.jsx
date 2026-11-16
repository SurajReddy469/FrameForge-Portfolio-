import React from 'react';
import { Target, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#070b14] text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
                  <Target className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="font-extrabold text-base text-white tracking-tight font-syne">LeadForge AI</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Gig 6 Project 2
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Architected by <strong>FrameForge</strong>. Delivering autonomous inbound sales agents, real-time BANT qualification pipelines, and full-stack web solutions.
            </p>
            <div className="pt-2">
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
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider font-syne">FrameForge Live Flagships</h4>
            <ul className="space-y-1.5">
              <li>
                <a href="http://localhost:5182" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1 text-emerald-400">
                  <span>SupportForge AI (Gig 6.1)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
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
            </ul>
          </div>

          {/* Tech Specs */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider font-syne">Architecture Stack</h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">React 19</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Tailwind CSS v4</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">BANT Scoring</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Calendar Engine</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Web Audio API</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">Vite 5</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} LeadForge AI by FrameForge Studio. All rights reserved.
          </div>
          <div className="text-slate-400">
            Unrivaled quality for premier Fiverr buyers
          </div>
        </div>
      </div>
    </footer>
  );
}
