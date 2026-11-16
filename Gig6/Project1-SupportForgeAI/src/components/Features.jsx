import React from 'react';
import { ShieldCheck, Zap, Users, FileSearch, Palette, Lock, Headphones, Database, Bot } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: ShieldCheck,
      title: "Zero-Hallucination Grounding",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      description: "Strict vector retrieval ensures the agent only speaks from verified business docs, citing the exact paragraph and document version."
    },
    {
      icon: Zap,
      title: "Real-Time Token Streaming",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
      description: "Typewriter-style token streaming starts within 220ms, eliminating awkward loading spinners and delivering instant answers."
    },
    {
      icon: Headphones,
      title: "Automated Human Escalation",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
      description: "When sentiment turns negative or a visitor asks for human help, the bot smoothly collects contact details and routes a priority ticket."
    },
    {
      icon: FileSearch,
      title: "Multi-Format Document Ingestion",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      description: "Ingests company policy PDFs, Zendesk articles, Notion workspaces, product catalogs, and website URLs into optimized semantic chunks."
    },
    {
      icon: Palette,
      title: "Custom Brand Theming",
      color: "text-pink-400",
      bg: "bg-pink-500/10 border-pink-500/20",
      description: "Match your company's exact primary color, typography, launcher icon, custom avatar, and tone-of-voice instructions."
    },
    {
      icon: Lock,
      title: "Enterprise Data Privacy",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      description: "Private vector namespaces ensure your confidential company documents are never leaked or used to train third-party public AI models."
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-900/30 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>Built For Production Reliability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why High-Growth Companies Choose SupportForge
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Engineered with enterprise RAG patterns, instant token streaming, and automatic fallback safeguards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${f.bg} border flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}>
                  <Icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
