import React, { useState, useEffect } from 'react';
import { X, Calculator, Check, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, Clock, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';
import { serviceApi, leadApi } from '../services/api';
import { useToast } from '../context/ToastContext';

const PLATFORM_OPTIONS = [
  { id: 'web', name: 'Modern Full-Stack Web Platform', base: 4500, time: '4-6 wks', desc: 'React/Next.js frontend, Node/Express API, MongoDB database, responsive design.' },
  { id: 'saas', name: 'B2B SaaS Platform / Multi-Tenant', base: 8500, time: '8-12 wks', desc: 'Multi-tenant architecture, subscription billing, team management, analytics.' },
  { id: 'ecommerce', name: 'E-Commerce / Custom Marketplace', base: 7000, time: '6-8 wks', desc: 'Catalog, cart, multi-gateway payments, inventory sync, order dispatch.' },
  { id: 'mobile', name: 'Cross-Platform Mobile Application', base: 9000, time: '8-10 wks', desc: 'React Native / Flutter, offline sync, push notifications, native integrations.' },
  { id: 'enterprise', name: 'Enterprise Cloud System & Microservices', base: 14000, time: '12-16 wks', desc: 'High-concurrency microservices, enterprise security architecture, CI/CD pipeline, monitoring.' },
];

const FEATURE_OPTIONS = [
  { id: 'auth_rbac', label: 'Enterprise Auth & RBAC', price: 800, desc: 'JWT/OAuth, MFA, multi-role granular permissions.' },
  { id: 'payments', label: 'Stripe & Payment Gateway Suite', price: 1200, desc: 'Recurring subscriptions, webhooks, invoice generation.' },
  { id: 'realtime', label: 'Real-Time WebSockets & Notifications', price: 1500, desc: 'Live chat, live status feeds, collaborative presence.' },
  { id: 'ai_llm', label: 'AI & LLM Integration (Gemini/OpenAI)', price: 2200, desc: 'RAG pipelines, vector search, embeddings, streaming LLM chat.' },
  { id: 'analytics_crm', label: 'Advanced Analytics & Admin CRM', price: 1400, desc: 'Visual charts, CSV exports, customer management funnels.' },
  { id: 'multi_lang', label: 'Multi-Language i18n & Localization', price: 900, desc: 'RTL support, dynamic locale switching, timezone awareness.' },
  { id: 'audit_security', label: 'Pen-Testing & Compliance Audit', price: 1800, desc: 'OWASP verification, data encryption at rest, rate limiting.' },
];

const TIMELINE_OPTIONS = [
  { id: 'standard', label: 'Standard Timeline (Recommended)', mult: 1.0, badge: 'Standard Rate' },
  { id: 'expedited', label: 'Expedited Sprint (Priority)', mult: 1.25, badge: '+25% Priority Surge' },
  { id: 'rush', label: 'Emergency Rush (Dedicated Pod)', mult: 1.5, badge: '+50% Dedicated 24/7 Pod' },
];

export default function ScopeEstimatorModal({ isOpen, onClose }) {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState('saas');
  const [selectedFeatures, setSelectedFeatures] = useState(['auth_rbac', 'payments', 'analytics_crm']);
  const [timeline, setTimeline] = useState('standard');
  const [estimateData, setEstimateData] = useState(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);

  // Lead submission form
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(null);

  // Recalculate server-side whenever inputs change
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const fetchEstimate = async () => {
      setLoadingEstimate(true);
      try {
        const res = await serviceApi.calculateEstimate({
          platform,
          features: selectedFeatures,
          timeline,
        });
        const est = res?.estimate || res?.data?.estimate || res?.data;
        if (isMounted && est) {
          setEstimateData(est);
        }
      } catch (err) {
        // Fallback local calculation
        const base = (PLATFORM_OPTIONS.find((p) => p.id === platform)?.base || 5000);
        const featCost = selectedFeatures.reduce((acc, fId) => {
          const item = FEATURE_OPTIONS.find((f) => f.id === fId);
          return acc + (item ? item.price : 0);
        }, 0);
        const mult = (TIMELINE_OPTIONS.find((t) => t.id === timeline)?.mult || 1.0);
        const total = Math.round((base + featCost) * mult);
        const low = Math.round(total * 0.9);
        const high = Math.round(total * 1.15);

        if (isMounted) {
          setEstimateData({
            totalPrice: total,
            priceRange: { low, high, formatted: `$${low.toLocaleString()} - $${high.toLocaleString()}` },
            tier: total > 15000 ? 'Enterprise Custom' : total > 9000 ? 'Growth Accelerator' : 'Core Launch',
            basePrice: base,
            featureCost: featCost,
            multiplier: mult,
          });
        }
      } finally {
        if (isMounted) setLoadingEstimate(false);
      }
    };

    fetchEstimate();
    return () => { isMounted = false; };
  }, [platform, selectedFeatures, timeline, isOpen]);

  const toggleFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) {
      showToast('Please provide sample name and email details to preview the demo flow.', 'warning');
      return;
    }

    setSubmittingLead(true);
    try {
      const res = await leadApi.createLead({
        name: leadForm.name,
        email: leadForm.email,
        company: leadForm.company || 'Direct Inquiry',
        serviceType: PLATFORM_OPTIONS.find((p) => p.id === platform)?.name || 'Custom Web',
        budget: estimateData?.priceRange?.formatted || `$${estimateData?.totalPrice}`,
        timeline: TIMELINE_OPTIONS.find((t) => t.id === timeline)?.label || 'Standard',
        notes: `Estimated scope: ${selectedFeatures.join(', ')}. Additional note: ${leadForm.message || 'None'}. Estimated base: $${estimateData?.totalPrice}`,
        source: 'Scope Estimator',
      });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      const created = res?.lead || res?.data?.lead || res?.data || { leadCode: 'APEX-LEAD-SUCCESS', email: leadForm.email };
      setLeadSuccess(created);
      showToast('Demo inquiry recorded. No proposal or email was sent.', 'success');
    } catch (err) {
      showToast('Failed to submit estimate proposal. Please check inputs.', 'error');
    } finally {
      setSubmittingLead(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                ApexMedia Interactive Scope & Budget Estimator
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Algorithmic Engine
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Illustrative scoping model. Final requirements, pricing, and delivery plans are agreed for each real project.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="bg-slate-950/50 px-6 py-3 border-b border-slate-800/80 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-6">
            <span className={step >= 1 ? 'text-blue-400' : 'text-slate-600'}>1. Platform Architecture</span>
            <span className="text-slate-700">→</span>
            <span className={step >= 2 ? 'text-blue-400' : 'text-slate-600'}>2. Features & Modules</span>
            <span className="text-slate-700">→</span>
            <span className={step >= 3 ? 'text-blue-400' : 'text-slate-600'}>3. Delivery & Proposal</span>
          </div>
          <span className="text-slate-400">Step {step} of 3</span>
        </div>

        {/* Main Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Left: Input Selection (Step 1, 2, 3) */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Select Base Architecture</h3>
                  <p className="text-xs text-slate-400">Choose the foundation that matches your primary product objectives.</p>
                </div>
                <div className="space-y-3">
                  {PLATFORM_OPTIONS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setPlatform(item.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        platform === item.id
                          ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/10'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{item.name}</span>
                        <span className="text-xs font-mono font-semibold text-blue-400">From ${item.base.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                      <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> Typical delivery: {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Select Product Capabilities</h3>
                  <p className="text-xs text-slate-400">Pick modular additions to include in the engineering roadmap.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FEATURE_OPTIONS.map((item) => {
                    const active = selectedFeatures.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleFeature(item.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          active
                            ? 'bg-blue-600/15 border-blue-500'
                            : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-white">{item.label}</span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                              active ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700 bg-slate-900'
                            }`}>
                              {active && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
                        </div>
                        <div className="mt-2 text-[11px] font-mono text-emerald-400 font-medium">
                          +${item.price.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {!leadSuccess ? (
                  <>
                    <div>
                      <h3 className="text-base font-bold text-white">Delivery Timeline & Demo Inquiry</h3>
                      <p className="text-xs text-slate-400">Choose a sample timeline to preview how project scope options can be collected.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {TIMELINE_OPTIONS.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setTimeline(t.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer text-center transition-all ${
                            timeline === t.id
                              ? 'bg-blue-600/15 border-blue-500 text-white'
                              : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <p className="text-xs font-bold text-white">{t.label}</p>
                          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-slate-900 text-blue-300 border border-slate-700">
                            {t.badge}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Contact Intake */}
                    <form onSubmit={handleLeadSubmit} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Preview Demo Inquiry
                      </h4>
                      <p className="text-[11px] text-amber-300" role="note">
                        Fictional portfolio demo: use sample details only. The inquiry may be recorded in the demo lead workflow; no real proposal or email response is sent.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-slate-400 mb-1">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Alex Morgan"
                            value={leadForm.name}
                            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-slate-400 mb-1">Work Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="alex@company.com"
                            value={leadForm.email}
                            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-slate-400 mb-1">Company / Organization</label>
                          <input
                            type="text"
                            placeholder="NovaCorp AI"
                            value={leadForm.company}
                            onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-slate-400 mb-1">Notes / Target Launch Date</label>
                          <input
                            type="text"
                            placeholder="Targeting Q2 launch, MVP in 8 weeks"
                            value={leadForm.message}
                            onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submittingLead}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      >
                        {submittingLead ? (
                          <span>Generating Lead Reference...</span>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            Lock Estimate & Submit Project Brief
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  /* Success State */
                  <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Demo Inquiry Recorded</h3>
                      <p className="text-xs text-slate-300 mt-1">
                        A sample inquiry was added to this demo workflow where the API is available. No proposal or email was sent. Reference:
                      </p>
                      <p className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-slate-950 font-mono text-sm font-bold text-emerald-400 border border-emerald-500/40">
                        {leadSuccess.leadCode}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      ApexMedia is a fictional portfolio demo. Do not enter real personal, company, or project-confidential information here.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
                      >
                        Close Window
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Real-time Live Scope Summary */}
          <div className="lg:col-span-4 bg-slate-950 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Live Breakdown</span>
                <h4 className="text-sm font-bold text-white mt-1">Authoritative Investment Summary</h4>
              </div>

              {/* Price Display */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400">Estimated Project Investment</span>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center">
                  <DollarSign className="w-6 h-6 text-emerald-400 shrink-0" />
                  {estimateData?.priceRange?.formatted || `$${estimateData?.totalPrice?.toLocaleString() || '7,500'}`}
                </div>
                <div className="inline-block px-2.5 py-1 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {estimateData?.tier || 'Growth Accelerator'}
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800">
                  <span>Base Architecture:</span>
                  <span className="font-mono text-white font-semibold">
                    ${estimateData?.basePrice?.toLocaleString() || '4,500'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800">
                  <span>Module Add-ons ({selectedFeatures.length}):</span>
                  <span className="font-mono text-white font-semibold">
                    +${estimateData?.featureCost?.toLocaleString() || '3,000'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800">
                  <span>Timeline Multiplier:</span>
                  <span className="font-mono text-white font-semibold">
                    {estimateData?.multiplier || 1.0}x
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-2 pt-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fixed-price milestone contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full source code & IP ownership</span>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-800 mt-6">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 ml-auto"
                >
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
