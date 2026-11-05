import React from 'react';
import { testimonials } from '../data/saasData';
import { Star, User, ShieldCheck, Quote } from 'lucide-react';

export default function TestimonialGrid({ isDarkMode }) {
  return (
    <section id="testimonials" className={`py-24 border-t transition-colors ${
      isDarkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
            <Quote className="w-3.5 h-3.5" />
            <span>Developer Reviews</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Trusted by Engineering Leaders
          </h2>
          <p className={`mt-4 text-base sm:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            See why high-growth startups and platform teams choose NovaCloud over legacy cloud providers.
          </p>
        </div>

        {/* 3 Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-8 flex flex-col justify-between border transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-slate-950/80 border-slate-800 hover:border-violet-500/40 shadow-lg' 
                  : 'bg-white border-slate-200 hover:border-violet-300 shadow-md'
              }`}
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className={`text-sm sm:text-base leading-relaxed italic ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer (Strict Neutral SVG Silhouette as per User Rules) */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 p-0.5 flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-slate-300">
                    <User className="w-5 h-5 text-violet-300" />
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {t.name}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" title="Verified Customer" />
                  </div>
                  <span className="text-xs text-slate-400 truncate">{t.role}</span>
                  <span className="text-[11px] font-mono text-violet-400 truncate">{t.company}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
