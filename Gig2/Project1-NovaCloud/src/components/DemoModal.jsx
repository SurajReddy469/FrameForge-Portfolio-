import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, Key, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DemoModal({ isOpen, onClose, defaultPlan = 'pro', isDarkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    cloudProvider: 'AWS',
    plan: defaultPlan,
    useCase: 'AI Agents'
  });

  const [submitted, setSubmitted] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (defaultPlan) {
      setFormData((prev) => ({ ...prev, plan: defaultPlan }));
    }
  }, [defaultPlan]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid work email';
    }
    if (!formData.company.trim()) errs.company = 'Company name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate simulated API key
    const generatedKey = `nova_live_${Math.random().toString(36).substring(2, 10)}_${Date.now().toString(36)}`;
    setApiKey(generatedKey);
    setSubmitted(true);

    // Save lead to local storage
    const existingLeads = JSON.parse(localStorage.getItem('novacloud_trials') || '[]');
    existingLeads.push({
      ...formData,
      apiKey: generatedKey,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('novacloud_trials', JSON.stringify(existingLeads));

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-all duration-200 ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-violet-400 font-bold">
                14-Day Full Pro Access
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight">
              Provision Your Edge Cluster
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Instant activation across 310 edge locations. No credit card required.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>

              {/* Company & Provider */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Inc"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  {errors.company && <p className="text-xs text-rose-400 mt-1">{errors.company}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Current Cloud
                  </label>
                  <select
                    value={formData.cloudProvider}
                    onChange={(e) => setFormData({ ...formData, cloudProvider: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="AWS">AWS</option>
                    <option value="Google Cloud">Google Cloud</option>
                    <option value="Azure">Azure</option>
                    <option value="Vercel / Cloudflare">Vercel / Cloudflare</option>
                    <option value="On-Premises">On-Premises</option>
                  </select>
                </div>
              </div>

              {/* Plan Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Cluster Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['dev', 'pro', 'enterprise'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, plan: p })}
                      className={`py-2 px-2 rounded-xl text-xs font-mono font-semibold uppercase border transition-colors ${
                        formData.plan === p
                          ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                          : (isDarkMode ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-300')
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Activate Free Cluster Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant provisioning · Zero commitments · Cancel anytime</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success Card */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Cluster Provisioned Successfully
              </span>
              <h3 className="text-2xl font-bold tracking-tight mt-1">
                Welcome to NovaCloud, {formData.name}!
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Your isolated microVM cluster has been allocated on the <span className="font-mono text-violet-400 font-bold uppercase">{formData.plan}</span> tier.
              </p>
            </div>

            {/* Simulated API Key Box */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-left space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>Personal Live API Key</span>
                </span>
                <span className="text-[10px] text-emerald-400">ACTIVE</span>
              </div>
              <div className="text-xs font-mono text-violet-300 break-all bg-slate-900/80 p-2.5 rounded border border-slate-800">
                {apiKey}
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Terminal className="w-3 h-3 text-slate-400" />
                <span>Configure via: <code className="text-slate-300">npx nova login --token {apiKey.substring(0, 16)}...</code></span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors text-sm"
            >
              Close & Start Exploring
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
