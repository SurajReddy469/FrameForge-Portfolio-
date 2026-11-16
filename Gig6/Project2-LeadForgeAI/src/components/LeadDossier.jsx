import React from 'react';
import { Target, Flame, Zap, Shield, CheckCircle2, TrendingUp, Layers, Activity } from 'lucide-react';

export default function LeadDossier({ leadScore, answers, currentProfile }) {
  const { score, status, gradeColor, badgeText, breakdown } = leadScore;

  // Circular gauge calculations (radius: 40)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-sm text-white font-syne">Live Lead Intelligence Dossier</h3>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
          Real-Time BANT
        </span>
      </div>

      {/* Main Score Visualizer */}
      <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
        {/* Radial SVG Gauge */}
        <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              className="text-slate-800"
              fill="transparent"
            />
            {/* Animated progress ring */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-700 ease-out ${
                score >= 78 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-slate-600'
              }`}
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-white font-mono leading-none">{score}</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 mt-0.5">/ 100</span>
          </div>
        </div>

        {/* Grade Details */}
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pipeline Status</div>
          <div className={`text-sm font-extrabold flex items-center gap-1.5 ${gradeColor}`}>
            {status === 'HOT' && <Flame className="w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse" />}
            {status === 'WARM' && <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />}
            <span>{badgeText}</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            {score >= 78
              ? 'Qualified high-value deal. In-chat discovery call booking unlocked.'
              : score >= 50
              ? 'Good fit identified. Further timeline qualification active.'
              : 'Early stage discovery. Initial signals processing...'}
          </p>
        </div>
      </div>

      {/* BANT Meters */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>BANT Qualification Vectors</span>
        </div>

        {/* Budget */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Budget Tier Alignment</span>
            <span className="font-mono text-emerald-400 font-bold">{breakdown.budgetPct}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${breakdown.budgetPct}%` }}
            />
          </div>
        </div>

        {/* Need */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Technical Scope & Need</span>
            <span className="font-mono text-cyan-400 font-bold">{breakdown.needPct}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${breakdown.needPct}%` }}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Target Launch Urgency</span>
            <span className="font-mono text-indigo-400 font-bold">{breakdown.timelinePct}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${breakdown.timelinePct}%` }}
            />
          </div>
        </div>

        {/* Authority */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Decision-Making Authority</span>
            <span className="font-mono text-purple-400 font-bold">{breakdown.authorityPct}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${breakdown.authorityPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Extracted Intent Tags */}
      <div>
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          <span>Extracted Signals Dossier</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(answers).map(([key, val]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-medium"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{val.tag}</span>
            </span>
          ))}
          {Object.keys(answers).length === 0 && (
            <span className="text-xs text-slate-500 italic">
              Answer the conversational prompts to build lead dossier...
            </span>
          )}
        </div>
      </div>

      {/* CRM Webhook Sync Status */}
      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          HubSpot & Slack CRM Sync: <strong className="text-emerald-400">ACTIVE</strong>
        </span>
        <span className="font-mono text-[10px] text-slate-500">Latency: 110ms</span>
      </div>
    </div>
  );
}
