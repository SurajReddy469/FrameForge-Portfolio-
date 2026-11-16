import React, { useState } from 'react';
import { Bot, Sparkles, ShieldCheck, Activity, Terminal, RefreshCw, Cpu, Layers } from 'lucide-react';
import ChatWidget from './ChatWidget';
import { KNOWLEDGE_BASES } from '../data/knowledgeBases';

export default function Playground({
  activeIndustry,
  onIndustryChange,
  customDocs,
  soundEnabled
}) {
  const kb = KNOWLEDGE_BASES[activeIndustry] || KNOWLEDGE_BASES.saas;

  return (
    <section id="playground" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Interactive Live Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Test The 24/7 AI Customer Support Agent
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Ask complex questions, test edge cases, click quick reply chips, or ask to speak with a human to experience the automated ticket escalation pipeline.
          </p>
        </div>

        {/* 2-Column Playground: Left is Embedded Chat, Right is RAG Telemetry Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chat Widget Container (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-1 bg-gradient-to-tr from-indigo-500/20 via-slate-800 to-cyan-500/20 shadow-2xl">
              <ChatWidget
                mode="embedded"
                isOpen={true}
                activeIndustry={activeIndustry}
                onIndustryChange={onIndustryChange}
                customDocs={customDocs}
                soundEnabled={soundEnabled}
              />
            </div>
          </div>

          {/* Telemetry & Architecture Inspector (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* System Status Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-sm text-white">RAG Engine Telemetry</h3>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  HEALTHY
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Inference Engine:</span>
                  <span className="text-indigo-400 font-bold">Gemini 1.5 Flash / GPT-4o-mini</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Grounding Policy:</span>
                  <span className="text-emerald-400 font-bold">Zero-Hallucination Guardrail</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Embedding Vectorizer:</span>
                  <span className="text-slate-200">Cosine CosSim k=3</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Active Knowledge Domain:</span>
                  <span className="text-white font-bold">{kb.name}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Avg First Token Latency:</span>
                  <span className="text-cyan-400 font-bold">&lt; 210ms</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">Human Fallback Dispatch:</span>
                  <span className="text-emerald-400 font-bold">Integrated (#SF Ticketing)</span>
                </div>
              </div>
            </div>

            {/* Test Prompts Guide */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h4 className="font-bold text-sm text-white">Recommended Test Scenarios</h4>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Try asking the chatbot these queries to test different capabilities:
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <strong className="text-indigo-300 block mb-0.5">1. Specific Policy / Rate Limit:</strong>
                  <span className="text-slate-300">"What are the rate limits on the Pro plan?"</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <strong className="text-cyan-300 block mb-0.5">2. Refund & Billing Policy:</strong>
                  <span className="text-slate-300">"Can I get a refund if I cancel within 10 days?"</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <strong className="text-emerald-300 block mb-0.5">3. Human Escalation Trigger:</strong>
                  <span className="text-slate-300">"I want to speak with a human support agent."</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <strong className="text-purple-300 block mb-0.5">4. Out-of-Domain Guardrail:</strong>
                  <span className="text-slate-300">"Who won the 1994 World Cup final?"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
