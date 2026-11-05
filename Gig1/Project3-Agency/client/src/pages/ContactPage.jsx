import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Sparkles, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { leadApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function ContactPage({ onOpenEstimator }) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: 'B2B SaaS Platform',
    budget: '$7,000 - $15,000',
    timeline: 'Standard (6-8 weeks)',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Please provide your name and work email.', 'warning');
      return;
    }

    setLoading(true);
    try {
      const res = await leadApi.createLead({
        ...formData,
        source: 'Consultation Intake Form',
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      const leadObj = res?.lead || res?.data?.lead || res?.data || { leadCode: 'APEX-LEAD-CONFIRMED', email: formData.email };
      setSubmittedLead(leadObj);
      showToast('Project Consultation Request Confirmed!', 'success');
    } catch (err) {
      showToast('Failed to submit consultation. Please verify inputs.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <MessageSquare className="w-3.5 h-3.5" /> High-Touch Consultation
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Initiate Your Project Brief
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Direct communication with senior engineers—no sales middlemen. Receive an architectural proposal and delivery schedule within 4 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info & Value Props */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Global Engineering Studios</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Operating with synchronized overlapping timezones across North America, Europe, and Asia for continuous 24-hour sprint velocity.
            </p>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Headquarters & Architecture Pod</p>
                  <p className="text-slate-400">San Francisco, CA & London, UK</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Global Development Center</p>
                  <p className="text-slate-400">HITEC City, Hyderabad, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Direct Engineering Desk</p>
                  <p className="text-slate-400">projects@apexmedia.agency</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Direct Line</p>
                  <p className="text-slate-400">+1 (415) 890-APEX</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">SLA Response Window</p>
                  <p className="text-emerald-400 font-semibold">&lt; 4 Business Hours Guaranteed</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Mutual Non-Disclosure Agreement (NDA) on request</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero obligation, high-fidelity architectural review</span>
              </div>
            </div>
          </div>

          {/* Quick Scope Estimator Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/30 border border-blue-500/20 text-center space-y-3">
            <h4 className="text-sm font-bold text-white">Need an Instant Budget Breakdown?</h4>
            <p className="text-xs text-slate-300">
              Use our real-time scope calculator to generate ballpark estimates across platform types and feature sets.
            </p>
            <button
              onClick={onOpenEstimator}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Launch Scope Estimator
            </button>
          </div>
        </div>

        {/* Right: Intake Form or Confirmation State */}
        <div className="lg:col-span-7">
          {!submittedLead ? (
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">Project Consultation Intake</h3>
              <p className="text-xs text-slate-400 mb-8">
                Fill out your high-level project parameters. All submissions are encrypted and reviewed by our Principal Engineer.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@startup.io"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vanguard Dynamics"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Service Type
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="B2B SaaS Platform">B2B SaaS Platform</option>
                      <option value="Full-Stack Web App">Full-Stack Web App</option>
                      <option value="Mobile App (React Native/Flutter)">Mobile App</option>
                      <option value="Custom E-Commerce">Custom E-Commerce</option>
                      <option value="Cloud Architecture & Migration">Cloud Architecture & Migration</option>
                      <option value="Codebase Audit & Hardening">Codebase Audit & Hardening</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="$3,500 - $7,000">$3,500 – $7,000 (Core MVP)</option>
                      <option value="$7,000 - $15,000">$7,000 – $15,000 (Growth Platform)</option>
                      <option value="$15,000 - $30,000">$15,000 – $30,000 (Enterprise Pod)</option>
                      <option value="$30,000+">$30,000+ (Custom Long-term)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Desired Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Standard (6-8 weeks)">Standard (6-8 weeks)</option>
                      <option value="Expedited (3-4 weeks)">Expedited (3-4 weeks)</option>
                      <option value="Emergency Rush (1-2 weeks)">Emergency Rush (1-2 weeks)</option>
                      <option value="Flexible / Exploration">Flexible / Exploration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Goals, Key Features & Architecture Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your technical requirements, user flows, target launch date, or link to design/spec documents..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Registering Brief...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Project Brief for Architectural Review
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-emerald-500/40 text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Consultation Intake Confirmed</h3>
                <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
                  Your project brief has been assigned a priority tracking code in our CRM:
                </p>
                <div className="mt-4 inline-block px-5 py-2 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-400 font-mono text-base font-bold">
                  {submittedLead.leadCode}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Client Contact:</span>
                  <strong className="text-white">{submittedLead.email || formData.email}</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Target Scope:</span>
                  <strong className="text-white">{formData.serviceType}</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Budget Tier:</span>
                  <strong className="text-emerald-400">{formData.budget}</strong>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setSubmittedLead(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Submit Another Inquiry
                </button>
                <button
                  onClick={onOpenEstimator}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all"
                >
                  Launch Scope Estimator
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
