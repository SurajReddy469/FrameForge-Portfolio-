import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Check, Sparkles, ArrowRight, ShieldCheck, Flame, X, Dumbbell } from 'lucide-react';
import { planApi, INITIAL_PLANS } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function MembershipsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [plans, setPlans] = useState(INITIAL_PLANS);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await planApi.getPlans();
        const list = Array.isArray(res?.data) ? res.data : (res?.plans || []);
        if (list && list.length > 0) {
          setPlans(list);
        }
      } catch (err) {
        console.warn('Fallback plans loaded');
      }
    };
    fetchPlans();
  }, []);

  const handleSelectPlan = (tier) => {
    showToast(`The ${tier} plan is a demo. Contact the gym to purchase a membership.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
          <Award className="w-3.5 h-3.5" /> Sample Plans • Demo Only
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          Membership Passes
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Illustrative membership options for this portfolio demo. Selecting a plan does not start a membership or payment.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan._id || plan.id || plan.tier}
            className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
              plan.popular
                ? 'bg-gradient-to-b from-red-950/60 via-slate-900 to-slate-900 border-2 border-red-500 shadow-2xl shadow-red-500/10 scale-100 lg:-translate-y-2'
                : 'bg-slate-900/60 border border-slate-800'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md">
                {plan.badge || 'Most Popular'}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                {!plan.popular && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {plan.tier} Tier
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  ${plan.priceMonthlyUSD}
                </span>
                <span className="text-xs text-slate-400 font-semibold">/ month</span>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                {plan.classCreditsMonthly === 0
                  ? 'Open gym floor access only. Studio classes excluded.'
                  : plan.classCreditsMonthly === -1
                  ? 'Unlimited studio class bookings & VIP recovery amenities.'
                  : `${plan.classCreditsMonthly} studio class credits included per month.`}
              </p>

              {/* Feature Checklist */}
              <div className="mt-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Privileges:</p>
                {(plan.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={() => handleSelectPlan(plan.tier)}
                className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <span>{user?.membershipTier === plan.tier ? 'Current Active Tier' : `Select ${plan.tier} Pass`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-white text-center">Membership Feature Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Facility Privilege</th>
                <th className="px-5 py-3 text-center">Basic ($39)</th>
                <th className="px-5 py-3 text-center">Pro ($79)</th>
                <th className="px-5 py-3 text-center text-red-400 font-bold">Elite VIP ($129)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="px-5 py-3.5 font-medium text-white">24/7 Turf & Free Weights Access</td>
                <td className="px-5 py-3.5 text-center text-emerald-400 font-bold">✓</td>
                <td className="px-5 py-3.5 text-center text-emerald-400 font-bold">✓</td>
                <td className="px-5 py-3.5 text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 font-medium text-white">Studio Class Credits Monthly</td>
                <td className="px-5 py-3.5 text-center text-slate-500">0 (Upgrade)</td>
                <td className="px-5 py-3.5 text-center text-white font-bold">12 Credits</td>
                <td className="px-5 py-3.5 text-center text-red-400 font-bold">Unlimited</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 font-medium text-white">Advance Booking Window</td>
                <td className="px-5 py-3.5 text-center text-slate-500">N/A</td>
                <td className="px-5 py-3.5 text-center text-white">7 Days</td>
                <td className="px-5 py-3.5 text-center text-red-400 font-bold">14 Days Priority</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 font-medium text-white">Infrared Sauna & Cryo Lounge</td>
                <td className="px-5 py-3.5 text-center text-slate-500">✗</td>
                <td className="px-5 py-3.5 text-center text-slate-500">✗</td>
                <td className="px-5 py-3.5 text-center text-emerald-400 font-bold">✓ Included</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 font-medium text-white">Monthly 1-on-1 Coach Session</td>
                <td className="px-5 py-3.5 text-center text-slate-500">✗</td>
                <td className="px-5 py-3.5 text-center text-slate-500">✗</td>
                <td className="px-5 py-3.5 text-center text-emerald-400 font-bold">✓ 1 Session/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
