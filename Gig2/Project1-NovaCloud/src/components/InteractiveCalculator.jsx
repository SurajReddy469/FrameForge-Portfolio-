import React, { useState, useId } from 'react';
import { Calculator, DollarSign, TrendingDown, ArrowRight, Check } from 'lucide-react';

export default function InteractiveCalculator({ isDarkMode, onOpenDemo }) {
  const [requestsInMillions, setRequestsInMillions] = useState(10); // 10 Million
  const [storageGB, setStorageGB] = useState(150); // 150 GB

  const reqSliderId = useId();
  const storageSliderId = useId();

  // Price modeling:
  // AWS Lambda / Cloud Functions: ~$0.20 per million requests + $0.09/GB egress + concurrency overhead (~$0.04/M) = ~$0.30 per million
  // AWS Storage / Cache: ~$0.25 per GB for multi-region Redis/ElastiCache
  const awsCompute = requestsInMillions * 32; 
  const awsStorage = storageGB * 0.28;
  const awsTotal = Math.round(awsCompute + awsStorage + 45); // + base gateway fees

  // NovaCloud: $8 per million + $0.08 per GB distributed cache
  const novaCompute = requestsInMillions * 9.5;
  const novaStorage = storageGB * 0.08;
  const novaTotal = Math.max(19, Math.round(novaCompute + novaStorage));

  const monthlySavings = Math.max(0, awsTotal - novaTotal);
  const percentageSaved = Math.round((monthlySavings / awsTotal) * 100);

  return (
    <section id="calculator" className={`py-24 border-y transition-colors ${
      isDarkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive ROI & Infrastructure Calculator</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Calculate Your Cloud Savings
          </h2>
          <p className={`mt-4 text-base sm:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Move the sliders below to estimate your monthly infrastructure savings compared to legacy hyperscaler architectures (AWS Lambda, GCP Cloud Functions & NAT Egress).
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className={`max-w-5xl mx-auto rounded-3xl border p-6 sm:p-10 shadow-2xl transition-all ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Sliders Column (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Monthly Requests */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor={reqSliderId} className={`text-sm font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    Monthly Invocations / Requests
                  </label>
                  <span className="px-3 py-1 rounded-lg text-sm font-mono font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    {requestsInMillions} Million req/mo
                  </span>
                </div>
                <input
                  id={reqSliderId}
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={requestsInMillions}
                  onChange={(e) => setRequestsInMillions(Number(e.target.value))}
                  aria-label="Monthly Invocations in Millions"
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
                <div className="flex justify-between text-xs font-mono text-slate-500">
                  <span>1M (Startup)</span>
                  <span>50M (Scale)</span>
                  <span>100M+ (Enterprise)</span>
                </div>
              </div>

              {/* Slider 2: Distributed Cache Storage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor={storageSliderId} className={`text-sm font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    Global Cache & KV Storage
                  </label>
                  <span className="px-3 py-1 rounded-lg text-sm font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {storageGB} GB Memory
                  </span>
                </div>
                <input
                  id={storageSliderId}
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={storageGB}
                  onChange={(e) => setStorageGB(Number(e.target.value))}
                  aria-label="Global Cache & KV Storage in Gigabytes"
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
                <div className="flex justify-between text-xs font-mono text-slate-500">
                  <span>10 GB</span>
                  <span>500 GB</span>
                  <span>1,000 GB</span>
                </div>
              </div>

              {/* Included Perks */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Zero cross-region egress fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Built-in DDoS Shielding included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Sub-20ms cold-start guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Automatic SSL certificates</span>
                </div>
              </div>

            </div>

            {/* Results & Comparison Card (5 cols) */}
            <div className={`lg:col-span-5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-violet-500/30 shadow-xl shadow-violet-950/30' 
                : 'bg-gradient-to-br from-slate-50 to-violet-50/40 border-violet-200 shadow-lg'
            }`}>
              
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-violet-400 font-semibold">
                  Estimated Monthly Cost
                </span>

                {/* NovaCloud Price */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-black tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    ${novaTotal}
                  </span>
                  <span className="text-sm font-medium text-slate-500">/ month on NovaCloud</span>
                </div>

                {/* Legacy Comparison */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Legacy Hyperscalers (AWS / GCP):</span>
                    <span className="font-mono line-through text-rose-400">${awsTotal} / mo</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" /> Monthly Savings:
                    </span>
                    <span className="font-mono text-base font-bold text-emerald-400">
                      Save ${monthlySavings} ({percentageSaved}%)
                    </span>
                  </div>
                </div>

                {/* Visual Bar Comparison */}
                <div className="mt-6 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                    <span>AWS/GCP Cost</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-rose-500/80 w-full" />
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-1">
                    <span>NovaCloud Cost</span>
                    <span className="text-violet-400 font-bold">{100 - percentageSaved}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-sky-400 transition-all duration-300"
                      style={{ width: `${Math.max(10, 100 - percentageSaved)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => onOpenDemo('pro')}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Lock in This Rate with Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
