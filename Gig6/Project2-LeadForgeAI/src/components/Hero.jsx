import React from 'react';
import { Target, Sparkles, TrendingUp, Calendar, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { INDUSTRY_PROFILES } from '../data/industryProfiles';

export default function Hero({ currentProfileId, onProfileSelect, onStartDemo }) {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Fiverr Gig 6 • Autonomous AI Inbound Sales & Lead Qualification</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto font-syne">
          Convert Anonymous Visitors into <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Qualified Discovery Calls</span> 24/7
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Static contact forms lose 97% of high-intent buyers. LeadForge AI autonomously interviews inbound prospects, calculates a real-time BANT score dossier, and books meetings directly on your Google/Outlook calendar.
        </p>

        {/* Industry Persona Switcher */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="text-xs font-medium text-slate-400">Select an industry persona to test:</span>
          <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
            {Object.values(INDUSTRY_PROFILES).map((prof) => (
              <button
                key={prof.id}
                onClick={() => onProfileSelect(prof.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentProfileId === prof.id
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span>{prof.avatarEmoji}</span>
                <span>{prof.name.split(' ')[0]} {prof.name.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Booking Rate</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">4.2x</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Vs static web contact forms</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Qualification Speed</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">&lt; 90 sec</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Full BANT criteria assessed</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Calendar Sync</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">100% Auto</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Google Meet & Outlook .ics</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">CRM Dispatch</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">HubSpot Ready</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Zapier & Slack alerts</p>
          </div>
        </div>
      </div>
    </section>
  );
}
