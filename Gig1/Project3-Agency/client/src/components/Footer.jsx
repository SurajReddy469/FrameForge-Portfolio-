import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Code2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenEstimator }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
      {/* Top Banner / Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800/80">
        <div className="rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-violet-900/40 border border-blue-500/20 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> High-Growth Digital Acceleration
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Have a high-stakes vision ready to ship?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Calculate an authoritative scope & budget breakdown in under 60 seconds with our algorithmic scope estimator.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              Launch Scope Estimator
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-all hover:scale-[1.02]"
            >
              Book Strategy Call
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="md:col-span-1 space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black text-xl">
              Δ
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">APEX<span className="text-blue-500">MEDIA</span></span>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Digital Product Studio</p>
            </div>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Crafting enterprise-grade digital experiences, scalable SaaS architectures, and high-conversion web platforms for global innovators.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://github.com/SurajReddy469/FrameForge-Portfolio-" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors" title="GitHub Repository">
              <Code2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Studio Capabilities */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Core Capabilities</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Enterprise Web Development</Link></li>
            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Cloud Architecture & DevOps</Link></li>
            <li><Link to="/services" className="hover:text-blue-400 transition-colors">B2B SaaS Engineering</Link></li>
            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Conversion UI/UX Design</Link></li>
            <li><Link to="/services" className="hover:text-blue-400 transition-colors">AI & LLM Integration</Link></li>
            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Performance & Security Audits</Link></li>
          </ul>
        </div>

        {/* Navigation & Resources */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home & Agency Story</Link></li>
            <li><Link to="/projects" className="hover:text-blue-400 transition-colors">Case Studies Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Service Tiers & Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Client Intake Consultation</Link></li>
            <li><Link to="/login" className="hover:text-blue-400 transition-colors">Principal / Client Portal</Link></li>
          </ul>
        </div>

        {/* Global Delivery Hubs */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Demo Contact Details</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Sample locations only</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Sample email only</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Sample phone only</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Illustrative MERN application demo</span>
            </li>
            <li className="text-[11px] text-slate-400 bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-2">
              Notice: ApexMedia is a fictional digital engineering agency demo. Case studies and metrics represent sample portfolio work.
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ApexMedia Digital Product Agency. Built by ApexMedia Studio.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Sample portfolio project</span>
            <span>•</span>
            <span className="text-slate-400">No service-level guarantee is implied</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
