import React, { useState } from 'react';
import { architectureFeatures } from '../data/saasData';
import { Cpu, Globe, Database, TrendingUp, CheckCircle, ArrowRight, Layers, Lock, Zap } from 'lucide-react';

const icons = [Cpu, Globe, Database, TrendingUp];

export default function FeatureTabs({ isDarkMode, onOpenDemo }) {
  const [activeTab, setActiveTab] = useState(architectureFeatures[0].id);

  const currentFeature = architectureFeatures.find((f) => f.id === activeTab) || architectureFeatures[0];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Autonomous Cloud Fabric</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Engineered for Extreme Latency Sensitivity
          </h2>
          <p className={`mt-4 text-base sm:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Explore the four pillars of NovaCloud's low-latency architecture designed specifically for AI inference, streaming webhooks, and agent task execution.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {architectureFeatures.map((feat, index) => {
            const Icon = icons[index % icons.length];
            const isActive = activeTab === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-600/25 scale-[1.02]'
                    : (isDarkMode 
                        ? 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800' 
                        : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100')
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-violet-400'}`} />
                <span>{feat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Display Card */}
        <div className={`rounded-3xl border p-6 sm:p-10 transition-all duration-300 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800/90 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <span>{currentFeature.badge}</span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {currentFeature.title}
              </h3>

              <p className={`text-base leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {currentFeature.description}
              </p>

              {/* Bullet Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {currentFeature.metrics.map((m) => (
                  <div key={m} className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium ${
                    isDarkMode ? 'bg-slate-950/60 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>

              {/* Technology Specification */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500">Kernel Specification:</span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-violet-950/40 text-violet-300 border border-violet-800/40">
                  {currentFeature.codeHighlight}
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onOpenDemo()}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <span>Test this capability on a free cluster</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Architectural Diagram Box */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 font-mono text-xs text-slate-300 shadow-inner">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-violet-400" />
                    <span>topology://cluster.edge.nova</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    ONLINE
                  </span>
                </div>

                {/* Simulated Visual Topology */}
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Node US-East (Virginia)</span>
                    <span className="text-violet-400 font-bold">14ms latency</span>
                  </div>
                  <div className="flex justify-center text-slate-600 text-xs">▼ anycast tunnel sync ▼</div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Node EU-Central (Frankfurt)</span>
                    <span className="text-sky-400 font-bold">11ms latency</span>
                  </div>
                  <div className="flex justify-center text-slate-600 text-xs">▼ distributed consensus ▼</div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Node AP-East (Tokyo)</span>
                    <span className="text-emerald-400 font-bold">16ms latency</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Replication Protocol:</span>
                  <span className="text-violet-300">Raft Quorum (3/3 Verified)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
