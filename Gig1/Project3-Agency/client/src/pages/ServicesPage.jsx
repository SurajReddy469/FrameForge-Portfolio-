import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap, Layers, Server, Code2, Clock } from 'lucide-react';
import { serviceApi } from '../services/api';

const TIERS = [
  {
    name: 'Core Launch',
    budget: '$3,500 – $7,000',
    turnaround: '3 – 4 Weeks',
    badge: 'Startup MVP',
    desc: 'Rapid high-fidelity MVP or custom web application ready for public beta and early customer traction.',
    features: [
      'Production MERN Stack Architecture',
      'Modern Tailwind CSS Responsive UI',
      'JWT Authentication & Protected Routes',
      'MongoDB Schema Design & Seed Data',
      'RESTful API with Validation & Rate Limiting',
      'Automated Jest/Supertest Test Suite',
      'CI/CD Deployment to Cloud (Vercel/Render)',
      '14-Day Post-Launch Warranty Support',
    ],
    popular: false,
  },
  {
    name: 'Growth Accelerator',
    budget: '$7,000 – $15,000',
    turnaround: '6 – 8 Weeks',
    badge: 'Most Popular',
    desc: 'Full-featured B2B SaaS platform or custom marketplace engineered for high concurrency and monetization.',
    features: [
      'Everything in Core Launch',
      'Multi-Tenant Data Isolation & RBAC',
      'Stripe Subscriptions & Webhook Engine',
      'Real-Time WebSockets & In-App Alerts',
      'Interactive Analytics & Admin CRM',
      'Algorithmic Scope/Budget Estimators',
      'Export Engine (RFC 4180 CSV & Reports)',
      '30-Day Post-Launch Warranty Support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise Custom',
    budget: '$15,000+',
    turnaround: '10 – 16 Weeks',
    badge: 'Scale-Up Pod',
    desc: 'Mission-critical distributed architectures, custom AI/LLM orchestration, and strict SOC-2 compliance.',
    features: [
      'Everything in Growth Accelerator',
      'Dedicated Senior Engineering Pod (3-4 devs)',
      'AI & LLM Integration (RAG, Gemini/OpenAI)',
      'Redis Caching & Queue Worker Clusters',
      'Zero-Trust Security & Penetration Testing',
      'Enterprise SLA Guarantee (99.98% Uptime)',
      'Full IP Ownership & Patent Assignment',
      '90-Day VIP Engineering Retainer',
    ],
    popular: false,
  },
];

export default function ServicesPage({ onOpenEstimator }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceApi.getAll();
        const list = Array.isArray(res?.data) ? res.data : (res?.services || res?.data?.services || []);
        setServices(list);
      } catch (err) {
        console.warn('Fallback services used');
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Transparent Engineering Tiers
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Capabilities & Engagements
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Predictable timelines, milestone-based payments, and authoritative deliverables. No vague hourly billing—only verified outcomes.
        </p>
      </div>

      {/* Pricing Tiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {TIERS.map((tier, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
              tier.popular
                ? 'bg-gradient-to-b from-blue-950/60 to-slate-900 border-2 border-blue-500/60 shadow-2xl shadow-blue-500/10 scale-100 lg:-translate-y-2'
                : 'bg-slate-900/60 border border-slate-800'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md">
                {tier.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                {!tier.popular && (
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {tier.badge}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <span className="text-3xl font-black text-white tracking-tight">{tier.budget}</span>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Target delivery: <strong className="text-slate-200">{tier.turnaround}</strong></span>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                {tier.desc}
              </p>

              {/* Feature Checklist */}
              <div className="mt-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Deliverables:</p>
                {tier.features.map((f, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={onOpenEstimator}
                className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  tier.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <span>Select & Customize Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Capabilities Grid */}
      <div className="pt-12 border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Engineering Disciplines</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            End-to-End Technology Competencies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <Code2 className="w-8 h-8 text-blue-400" />
            <h3 className="text-base font-bold text-white">Frontend Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              React 19, Next.js App Router, Tailwind CSS, Vite, Redux Toolkit/Zustand, responsive fluid typography, and sub-second Largest Contentful Paint (LCP).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <Server className="w-8 h-8 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Backend Engineering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Node.js, Express.js microservices, strict request validation schemas, rate limiting, dual-engine database fallback, and RFC 4180 streaming exports.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <Layers className="w-8 h-8 text-purple-400" />
            <h3 className="text-base font-bold text-white">Database Design & Scale</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              MongoDB Mongoose schema validation, high-cardinality compound indexing, collision-free transaction IDs, and automated data seeding engines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <Zap className="w-8 h-8 text-amber-400" />
            <h3 className="text-base font-bold text-white">AI & Autonomous Agents</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integration with Google Gemini 2.5/Flash, streaming vector embeddings, function calling, tool use, and automated background analysis workflows.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <ShieldCheck className="w-8 h-8 text-rose-400" />
            <h3 className="text-base font-bold text-white">Security & Zero Trust</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strict server-side role enforcement, no client-side privilege escalation, OWASP Top 10 hardening, CSP headers, and automated vulnerability scanning.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <Clock className="w-8 h-8 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Delivery SLA & IP Transfer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% intellectual property assignment upon milestone completion, comprehensive developer documentation, clean git commits, and post-launch warranties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
