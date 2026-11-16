import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PricingTiers({ onOpenChat }) {
  const tiers = [
    {
      name: "Basic",
      tagline: "AI Chat Widget",
      price: "$80",
      delivery: "3 Days Delivery",
      revisions: "2 Revisions",
      description: "Custom embeddable AI chat widget with company FAQ knowledge, light/dark mode, and instant lead capture.",
      popular: false,
      features: [
        "Embeddable floating chat widget",
        "Pre-prompted business context & static FAQs",
        "Gemini 1.5 Flash / GPT-4o-mini integration",
        "Lead capture form (Name & Email)",
        "Mobile responsive & theme customized",
        "Installation script for WordPress / HTML"
      ],
      buttonText: "Order Basic ($80)",
      buttonStyle: "bg-slate-850 hover:bg-slate-700 text-white border border-slate-700"
    },
    {
      name: "Standard",
      tagline: "Smart RAG Support Agent",
      price: "$220",
      delivery: "6 Days Delivery",
      revisions: "4 Revisions",
      description: "Full RAG customer support agent trained directly on your business documents (PDFs, URLs, manuals) with streaming chat.",
      popular: true,
      features: [
        "Everything in Basic, PLUS:",
        "Vector RAG search on company PDFs / Docs",
        "Real-time token typewriter streaming",
        "Strict zero-hallucination source citations",
        "Email alert to human support on escalation",
        "React / Next.js / Shopify / Webflow embed",
        "4 Revisions & 14-day warranty"
      ],
      buttonText: "Order Standard ($220)",
      buttonStyle: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
    },
    {
      name: "Premium",
      tagline: "Full Autonomous Support Hub",
      price: "$450",
      delivery: "10 Days Delivery",
      revisions: "Unlimited Revisions",
      description: "Enterprise autonomous support system with multi-channel routing, live ticket escalation, and CRM integrations.",
      popular: false,
      features: [
        "Everything in Standard, PLUS:",
        "Multi-doc vector indexing with live upload",
        "Live human agent takeover modal & ticketing",
        "Calendly / Cal.com meeting booking embed",
        "Webhook CRM sync (Zapier / Make / Slack)",
        "Admin analytics & conversation review logs",
        "Full source code & commercial license",
        "VIP 30-day post-launch priority support"
      ],
      buttonText: "Order Premium ($450)",
      buttonStyle: "bg-slate-850 hover:bg-slate-700 text-white border border-slate-700"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Fiverr Gig Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Predictable Fixed Pricing For Your AI Agent
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Backed by FrameForge's production standards, clean code delivery, and 100% money-back guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 ${
                tier.popular
                  ? 'bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-950/60 md:-translate-y-2'
                  : 'bg-slate-900/70 border border-slate-800'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-[11px] font-extrabold tracking-wide uppercase shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular for Businesses
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">{tier.name}</span>
                  <span className="text-xs text-slate-400 font-medium">{tier.delivery}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{tier.tagline}</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-extrabold text-white font-mono">{tier.price}</span>
                  <span className="text-xs text-slate-400">/ one-time</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {tier.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href="https://www.fiverr.com/frameforgehq?public_mode=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all active:scale-95 ${tier.buttonStyle}`}
                >
                  <span>{tier.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <div className="mt-3 text-center">
                  <span className="text-[11px] text-slate-400">
                    Includes {tier.revisions} • Safe Fiverr Escrow
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
