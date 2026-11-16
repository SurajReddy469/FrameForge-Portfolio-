import React from 'react';
import { Target, Calendar, Kanban, Webhook, Zap, ShieldCheck, Flame, Users, Sparkles } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: Flame,
      title: "Real-Time BANT Lead Scoring",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      description: "Scores each inbound prospect (0–100) across Budget, Authority, Need, and Timeline, ensuring your sales reps only speak with tier-1 qualified buyers."
    },
    {
      icon: Calendar,
      title: "Native In-Chat Calendar Booking",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
      description: "Directly renders an interactive 30-min discovery session picker in the conversation. No annoying redirects to external Calendly links."
    },
    {
      icon: Kanban,
      title: "Executive CRM War Room",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
      description: "A centralized visual sales pipeline tracking every conversation in real time, moving leads from 'Inbound' to 'Discovery Call Booked'."
    },
    {
      icon: Webhook,
      title: "Instant Webhooks to HubSpot & Slack",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      description: "Dispatches structured JSON payloads to your CRM, Zapier, or team Slack channel the second a high-value lead is identified."
    },
    {
      icon: Zap,
      title: "Adaptive Conversation Branching",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      description: "Adapts follow-up questions intelligently based on industry, company stage, and technical scope, maintaining an authentic consultative tone."
    },
    {
      icon: ShieldCheck,
      title: "Zero Sales Pressure Guarantee",
      color: "text-pink-400",
      bg: "bg-pink-500/10 border-pink-500/20",
      description: "If a prospect is not yet ready for a sales call, the agent gracefully routes them to self-serve documentation, product tours, or whitepapers."
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built For Inbound Revenue Acceleration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-syne">
            Why Modern B2B Teams Upgrade from Forms to LeadForge
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Engineered to automate lead qualification, eliminate calendar coordination ping-pong, and skyrocket discovery call conversion.
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
                <h3 className="text-base font-bold text-white mb-2 font-syne">{f.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
