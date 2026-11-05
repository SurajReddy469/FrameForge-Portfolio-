import React from 'react';
import { heroMetrics, trustedCompanies } from '../data/saasData';
import { Activity, Globe, Cpu, Zap } from 'lucide-react';

const metricIcons = [Activity, Globe, Zap, Cpu];

export default function MetricsBar({ isDarkMode }) {
  return (
    <section className={`py-12 border-y transition-colors ${
      isDarkMode ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-200 bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 pb-10 border-b border-slate-800/50">
          {heroMetrics.map((stat, idx) => {
            const Icon = metricIcons[idx % metricIcons.length];
            return (
              <div key={stat.label} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs uppercase tracking-wider font-mono text-slate-400">{stat.label}</span>
                </div>
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{stat.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Company Logo Strip */}
        <div className="pt-8">
          <p className="text-center text-xs uppercase tracking-widest text-slate-400 font-mono mb-6">
            Empowering Mission-Critical Autonomous Workloads Worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75">
            {trustedCompanies.map((name) => (
              <div
                key={name}
                className={`text-sm sm:text-base font-bold tracking-tight transition-colors hover:opacity-100 ${
                  isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                // {name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
