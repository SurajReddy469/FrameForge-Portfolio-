import React, { useState } from 'react';
import { pricingTiers } from '../data/saasData';
import { Check, Sparkles, ArrowRight, Zap, Shield, HelpCircle } from 'lucide-react';

export default function PricingSection({ isDarkMode, onOpenDemo }) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Developer Pricing</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Scale Effortlessly From Zero to Millions
          </h2>
          <p className={`mt-4 text-base sm:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Predictable billing with zero surprises. No egress markup, no provisioned concurrency fees.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? (isDarkMode ? 'text-white' : 'text-slate-900') : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing discount"
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                isAnnual ? 'bg-violet-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isAnnual ? (isDarkMode ? 'text-white' : 'text-slate-900') : 'text-slate-400'}`}>
                Annual Billing
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Save 25%
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            const isPopular = tier.popular;

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 ${
                  isPopular
                    ? (isDarkMode 
                        ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-violet-500 shadow-2xl shadow-violet-950/60 lg:-translate-y-2' 
                        : 'bg-white border-2 border-violet-600 shadow-2xl lg:-translate-y-2')
                    : (isDarkMode 
                        ? 'bg-slate-900/40 border border-slate-800 hover:border-slate-700' 
                        : 'bg-white border border-slate-200 hover:border-slate-300 shadow-lg')
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{tier.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {tier.name}
                    </h3>
                    {!isPopular && (
                      <span className="text-xs font-mono text-slate-500 px-2.5 py-0.5 rounded border border-slate-800">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <p className={`mt-2 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      / month {isAnnual && price > 0 && '(billed annually)'}
                    </span>
                  </div>

                  {/* Feature List */}
                  <div className="mt-8 space-y-3.5 pt-6 border-t border-slate-800/80">
                    <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold block">
                      Everything in {tier.name}:
                    </span>
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onOpenDemo(tier.id)}
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500'
                        : (isDarkMode 
                            ? 'bg-slate-800 text-white hover:bg-slate-700' 
                            : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200')
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
