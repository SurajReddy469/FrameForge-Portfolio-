import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PricingTiers() {
  const tiers = [
    {
      name: "Basic",
      tagline: "AI Lead Capture Widget",
      price: "$80",
      delivery: "3 Days Delivery",
      revisions: "2 Revisions",
      description: "Custom conversational lead capture agent that qualifies basic visitor intent and routes contact details via email.",
      popular: false,
      features: [
        "Conversational lead qualification widget",
        "Pre-set BANT question sequence",
        "Lead capture (Name, Email, Budget tier)",
        "Email notifications on every inquiry",
        "Mobile responsive & brand styled",
        "Installation code for WordPress / HTML"
      ],
      buttonText: "Order Basic ($80)",
      buttonStyle: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
    },
    {
      name: "Standard",
      tagline: "Autonomous SDR & Calendar Agent",
      price: "$220",
      delivery: "6 Days Delivery",
      revisions: "4 Revisions",
      description: "Full conversational SDR that calculates real-time lead score dossiers and books meetings directly into your calendar.",
      popular: true,
      features: [
        "Everything in Basic, PLUS:",
        "Real-time BANT lead scoring (0–100)",
        "Native in-chat calendar booking (Google/Outlook)",
        "Automated Google Meet link generation",
        "Lead intelligence dossier preview",
        "Webhook sync to Slack or Zapier",
        "4 Revisions & 14-day warranty"
      ],
      buttonText: "Order Standard ($220)",
      buttonStyle: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900"
    },
    {
      name: "Premium",
      tagline: "Enterprise Inbound Revenue Hub",
      price: "$450",
      delivery: "10 Days Delivery",
      revisions: "Unlimited Revisions",
      description: "Complete autonomous inbound sales system with live Kanban CRM pipeline, multi-channel routing, and HubSpot sync.",
      popular: false,
      features: [
        "Everything in Standard, PLUS:",
        "Executive Sales War Room Kanban board",
        "Full two-way HubSpot / Salesforce CRM sync",
        "Custom conversational AI branching per industry",
        "SMS reminder dispatch via Twilio integration",
        "Full source code & commercial license",
        "VIP 30-day post-launch optimization"
      ],
      buttonText: "Order Premium ($450)",
      buttonStyle: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Fiverr Gig Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-syne">
            Fixed Pricing For Your Custom Sales AI Agent
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Engineered by FrameForge with clean code, enterprise security, and 100% money-back guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 ${
                tier.popular
                  ? 'bg-gradient-to-b from-emerald-950/60 via-slate-900 to-slate-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-950/60 md:-translate-y-2'
                  : 'bg-slate-900/70 border border-slate-800'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 text-[11px] font-extrabold tracking-wide uppercase shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-slate-950" />
                  Most Popular For B2B
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">{tier.name}</span>
                  <span className="text-xs text-slate-400 font-medium">{tier.delivery}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 font-syne">{tier.tagline}</h3>
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
