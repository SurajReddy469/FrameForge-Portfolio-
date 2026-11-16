import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function RoiCalculator({ onOpenChat }) {
  const [monthlyTickets, setMonthlyTickets] = useState(2500);
  const [costPerTicket, setCostPerTicket] = useState(14);
  const [automationRate, setAutomationRate] = useState(72); // 72%

  const currentMonthlyCost = monthlyTickets * costPerTicket;
  const ticketsResolvedByAI = Math.round(monthlyTickets * (automationRate / 100));
  const monthlySavings = ticketsResolvedByAI * costPerTicket * 0.85; // factoring light SaaS AI API cost
  const annualSavings = monthlySavings * 12;
  const hoursSaved = Math.round((ticketsResolvedByAI * 12) / 60); // 12 mins per ticket average

  return (
    <section id="roi" className="py-20 bg-slate-900/40 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Client ROI & Cost Analysis</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Calculate Your Customer Support Cost Reduction
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            See how much your business or your clients save by deploying a 24/7 AI customer service agent.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Sliders (7 cols) */}
          <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Monthly Support Inquiries:</span>
                <span className="text-indigo-400 font-mono text-sm">{monthlyTickets.toLocaleString()} tickets/mo</span>
              </div>
              <input
                type="range"
                min="200"
                max="20000"
                step="100"
                value={monthlyTickets}
                onChange={(e) => setMonthlyTickets(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>200</span>
                <span>5,000</span>
                <span>10,000</span>
                <span>20,000+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Avg Human Support Cost Per Ticket:</span>
                <span className="text-emerald-400 font-mono text-sm">${costPerTicket} / ticket</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={costPerTicket}
                onChange={(e) => setCostPerTicket(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$5 (Basic email)</span>
                <span>$14 (Industry avg)</span>
                <span>$35 (Technical tier 2)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Target AI Autonomous Resolution:</span>
                <span className="text-cyan-400 font-mono text-sm">{automationRate}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                step="2"
                value={automationRate}
                onChange={(e) => setAutomationRate(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>40% Conservative</span>
                <span>72% FrameForge Benchmark</span>
                <span>90% High Volume FAQ</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Includes zero-hallucination document filtering & automated human fallback dispatch.</span>
            </div>
          </div>

          {/* Results Summary Box (5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Projected Annual Savings</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-mono tracking-tight">
                ${Math.round(annualSavings).toLocaleString()}
                <span className="text-xs font-sans font-normal text-slate-400 ml-1">/year</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Net ROI after AI infrastructure costs</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Monthly Savings:
                </span>
                <strong className="text-emerald-400 font-mono text-sm">
                  ${Math.round(monthlySavings).toLocaleString()}
                </strong>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Support Hours Saved:
                </span>
                <strong className="text-cyan-400 font-mono text-sm">
                  {hoursSaved.toLocaleString()} hrs/mo
                </strong>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  Tickets Handled 24/7:
                </span>
                <strong className="text-white font-mono text-sm">
                  {ticketsResolvedByAI.toLocaleString()} tickets
                </strong>
              </div>
            </div>

            <button
              onClick={onOpenChat}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              <span>Test SupportForge Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
