import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  Filter,
  Search,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { leadApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const STATUS_OPTIONS = ['New', 'In Review', 'Proposal Sent', 'Won', 'Archived'];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { showToast } = useToast();

  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        leadApi.getAllLeads(),
        leadApi.getStats(),
      ]);
      const lList = Array.isArray(leadsRes?.data) ? leadsRes.data : (leadsRes?.leads || leadsRes?.data?.leads || []);
      setLeads(lList);
      const sObj = statsRes?.data?.stats || statsRes?.data || statsRes?.stats || null;
      setStats(sObj);
    } catch (err) {
      showToast('Error loading CRM leads. Ensure admin token is active.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || user?.role !== 'admin') {
        showToast('Administrative authorization required. Redirecting to login.', 'warning');
        navigate('/login');
        return;
      }
      fetchDashboardData();
    }
  }, [isAuthenticated, user, authLoading]);

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingId(leadId);
    try {
      await leadApi.updateStatus(leadId, newStatus);
      showToast(`Lead status updated to ${newStatus}`, 'success');
      // Update locally
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
      );
      if (selectedLead && selectedLead._id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (err) {
      showToast('Failed to update lead status.', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await leadApi.exportCSV();
      const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `apexmedia_leads_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('RFC 4180 CSV export downloaded successfully.', 'success');
    } catch (err) {
      showToast('Failed to download CSV export.', 'error');
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search.trim() ||
      lead.name?.toLowerCase().includes(q) ||
      lead.email?.toLowerCase().includes(q) ||
      lead.company?.toLowerCase().includes(q) ||
      lead.leadCode?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Agency CRM Operations
            </span>
            <span className="text-xs text-slate-400">• Principal Executive Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Pipeline & Consultation Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export RFC 4180 CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Intake Leads</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white mt-2">
            {stats?.totalLeads ?? leads.length}
          </p>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Real-time active intake
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Active Pipeline Value</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
            ${(stats?.estimatedPipelineUSD || 68500).toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">Authoritative scope sum</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Proposals In Review</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white mt-2">
            {stats?.proposalsSent ?? stats?.byStatus?.['Proposal Sent'] ?? 3}
          </p>
          <span className="text-[11px] text-amber-400 font-semibold mt-1 block">&lt; 4 hr SLA adherence</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Won / Closed Deals</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-indigo-400 mt-2">
            {stats?.wonDeals ?? stats?.byStatus?.['Won'] ?? 2}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">In production sprint</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', ...STATUS_OPTIONS].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search code, name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Lead Reference</th>
                <th className="px-5 py-3.5">Client & Company</th>
                <th className="px-5 py-3.5">Service & Budget</th>
                <th className="px-5 py-3.5">Status Pipeline</th>
                <th className="px-5 py-3.5">Created</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                    No inquiries match the current filter.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead._id || lead.leadCode} className="hover:bg-slate-800/30 transition-colors">
                    {/* Code */}
                    <td className="px-5 py-4 font-mono font-bold text-blue-400">
                      {lead.leadCode}
                    </td>

                    {/* Client Info */}
                    <td className="px-5 py-4">
                      <p className="font-bold text-white">{lead.clientName || lead.name || 'Inquiry Contact'}</p>
                      <p className="text-[11px] text-slate-400">{lead.clientEmail || lead.email}</p>
                      {(lead.companyName || lead.company) && (
                        <p className="text-[10px] text-slate-500 font-medium">{lead.companyName || lead.company}</p>
                      )}
                    </td>

                    {/* Scope & Budget */}
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{lead.projectType || lead.serviceType || 'Custom Web'}</p>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-1">
                        {lead.estimatedBudget || lead.budget || '$7,000 - $15,000'}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-5 py-4">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead._id}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border bg-slate-950 focus:outline-none cursor-pointer ${
                          lead.status === 'Won'
                            ? 'text-emerald-400 border-emerald-500/40'
                            : lead.status === 'Proposal Sent'
                            ? 'text-blue-400 border-blue-500/40'
                            : lead.status === 'In Review'
                            ? 'text-amber-400 border-amber-500/40'
                            : lead.status === 'Archived'
                            ? 'text-slate-500 border-slate-700'
                            : 'text-purple-400 border-purple-500/40'
                        }`}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-slate-400 text-[11px]">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Today'}
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Lead Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">
                  Lead File: {selectedLead.leadCode}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedLead.clientName || selectedLead.name}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <a href={`mailto:${selectedLead.clientEmail || selectedLead.email}`} className="text-blue-400 font-semibold hover:underline">
                    {selectedLead.clientEmail || selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">Company:</span>
                  <span className="text-white font-semibold">{selectedLead.companyName || selectedLead.company || 'N/A'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block">Service Scope:</span>
                  <span className="text-white font-semibold">{selectedLead.projectType || selectedLead.serviceType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Estimated Budget:</span>
                  <span className="text-emerald-400 font-bold">{selectedLead.estimatedBudget || selectedLead.budget}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block">Timeline:</span>
                  <span className="text-slate-300">{selectedLead.timeline || 'Standard'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Intake Source:</span>
                  <span className="text-slate-300">{selectedLead.source || 'Website'}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-1">Architectural Brief / Notes:</span>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.notes || 'No additional notes provided by client.'}
                </p>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">Pipeline Stage:</span>
                <div className="flex gap-1.5 flex-wrap">
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedLead._id, st)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        selectedLead.status === st
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
