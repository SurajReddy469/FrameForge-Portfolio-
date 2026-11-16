import React, { useState } from 'react';
import { Layers, Flame, Zap, Calendar, User, Building, DollarSign, Clock, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function CrmPipeline({ leads, onMoveLead }) {
  const [selectedLead, setSelectedLead] = useState(null);

  const columns = [
    { id: "Inbound Inquiry", title: "Inbound Inquiries", color: "border-slate-700 text-slate-400" },
    { id: "AI Qualified (BANT)", title: "AI Qualified (BANT)", color: "border-cyan-500/40 text-cyan-400" },
    { id: "Meeting Booked", title: "Discovery Call Booked", color: "border-emerald-500/40 text-emerald-400" },
    { id: "Contract Sent", title: "Contract / Proposal", color: "border-indigo-500/40 text-indigo-400" }
  ];

  const handleCardClick = (lead) => {
    setSelectedLead(lead);
    sounds.playSend();
  };

  return (
    <div className="space-y-6">
      {/* Board Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="font-extrabold text-lg text-white font-syne">
              Live Sales Pipeline & Executive War Room
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry showing leads qualified and booked automatically by LeadForge AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            Total Pipeline Value: <strong className="text-emerald-400">$185,000+</strong>
          </span>
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colLeads = leads.filter(l => l.stage === col.id);
          return (
            <div
              key={col.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[460px]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${col.color}`}>
                  {col.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px] font-mono font-bold text-slate-300">
                  {colLeads.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => handleCardClick(lead)}
                    className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all shadow-sm group hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                      <h4 className="font-bold text-xs text-white group-hover:text-emerald-400 transition-colors truncate">
                        {lead.name}
                      </h4>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        lead.score >= 85 ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {lead.score} pts
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 mb-2 truncate">
                      {lead.company}
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 space-y-1 mb-2">
                      <div className="truncate font-medium text-white">{lead.need}</div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="text-emerald-400 font-mono font-semibold">{lead.budget}</span>
                        <span>{lead.timeline}</span>
                      </div>
                    </div>

                    {lead.bookedSlot && (
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{lead.bookedSlot}</span>
                      </div>
                    )}
                  </div>
                ))}

                {colLeads.length === 0 && (
                  <div className="h-32 flex items-center justify-center text-xs text-slate-500 italic border border-dashed border-slate-800 rounded-xl">
                    No deals in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-base">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">{selectedLead.name}</h4>
                <p className="text-xs text-slate-400">{selectedLead.company} • {selectedLead.email}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-400 block mb-0.5">BANT Lead Score:</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">{selectedLead.score} / 100</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Pipeline Stage:</span>
                  <span className="text-indigo-400 font-semibold">{selectedLead.stage}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Budget Tier:</span>
                  <span className="text-white font-mono font-semibold">{selectedLead.budget}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Target Launch:</span>
                  <span className="text-white">{selectedLead.timeline}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">Technical Specification:</span>
                <p className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                  {selectedLead.need}
                </p>
              </div>

              {selectedLead.bookedSlot && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Confirmed Discovery Call: <strong>{selectedLead.bookedSlot}</strong></span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-500 font-mono">Lead ID: {selectedLead.id}</span>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
