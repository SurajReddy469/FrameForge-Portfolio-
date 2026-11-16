import React, { useState } from 'react';
import { Terminal, Copy, Check, Webhook, Send, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function WebhookInspector({ leadScore, answers, profile }) {
  const [activeChannel, setActiveChannel] = useState('hubspot');
  const [copied, setCopied] = useState(false);

  const getPayload = () => {
    if (activeChannel === 'hubspot') {
      return {
        event: "lead.qualified",
        timestamp: new Date().toISOString(),
        lead_score: leadScore.score,
        qualification_grade: leadScore.status,
        deal_parameters: {
          industry: profile.name,
          service_requested: answers.need?.tag || "Custom Software SaaS",
          allocated_budget: answers.budget?.tag || "$10,000-$25,000+",
          target_timeline: answers.timeline?.tag || "Urgent (2-4 wks)",
          decision_maker: answers.authority?.tag || "Founder / C-Level"
        },
        crm_action: leadScore.score >= 78 ? "CREATE_HIGH_PRIORITY_DEAL" : "ENROLL_NURTURE_SEQUENCE",
        assigned_rep: profile.avatarName
      };
    }

    if (activeChannel === 'slack') {
      return {
        channel: "#deals-inbound-vip",
        attachments: [
          {
            fallback: "🔥 Hot Lead Qualified: $15,000+ Budget",
            color: leadScore.score >= 78 ? "#10b981" : "#f59e0b",
            title: `🚀 LeadForge AI: ${leadScore.badgeText}`,
            fields: [
              { title: "BANT Score", value: `${leadScore.score} / 100`, short: true },
              { title: "Budget Tier", value: answers.budget?.tag || "High Priority", short: true },
              { title: "Scope", value: answers.need?.tag || "Full-Stack Web App", short: true },
              { title: "Calendar Status", value: "Meeting Booked (Google Meet)", short: true }
            ]
          }
        ]
      };
    }

    return {
      webhook_id: "wh_live_9482104",
      event: "leadforge.calendar.session_booked",
      payload: {
        host: profile.avatarName,
        guest_email: "prospect@enterprise.com",
        duration: "30_MINUTES",
        platform: "GOOGLE_MEET",
        source: "In-Chat Conversational SDR"
      }
    };
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(getPayload(), null, 2));
    setCopied(true);
    sounds.playSend();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="webhooks" className="py-16 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Webhook className="w-3.5 h-3.5" />
            <span>Automated CRM Sync Pipeline</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-syne">
            Real-Time Webhook & CRM Payloads
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Every conversation dynamically generates structured JSON payloads dispatched to your HubSpot, Salesforce, Zapier, or Slack channels.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveChannel('hubspot')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeChannel === 'hubspot' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                HubSpot CRM Deal JSON
              </button>
              <button
                onClick={() => setActiveChannel('slack')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeChannel === 'slack' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Slack VIP Inbound Alert
              </button>
              <button
                onClick={() => setActiveChannel('zapier')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeChannel === 'zapier' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Zapier / Make Webhook
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Payload"}</span>
            </button>
          </div>

          <div className="p-6 bg-slate-950 font-mono text-xs overflow-x-auto text-emerald-300">
            <pre>
              <code>{JSON.stringify(getPayload(), null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
