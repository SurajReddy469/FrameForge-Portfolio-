import React from 'react';
import { Cloud, GitBranch, Terminal, MessageSquare, Globe, Shield } from 'lucide-react';

export default function Footer({ isDarkMode }) {
  return (
    <footer className={`border-t transition-colors ${
      isDarkMode ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-sky-400 flex items-center justify-center text-white shadow-md">
                <Cloud className="w-5 h-5" />
              </div>
              <span className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Nova<span className="text-violet-400">Cloud</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              Next-generation autonomous edge runtime engineered for high-concurrency AI workloads, distributed cache hydration, and serverless computing.
            </p>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 310 Global Nodes Operational</span>
            </div>
          </div>

          {/* Links Col 1: Platform */}
          <div className="space-y-3 text-sm">
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
              Platform
            </h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-violet-400 transition-colors">MicroVMs</a></li>
              <li><a href="#features" className="hover:text-violet-400 transition-colors">Anycast DNS</a></li>
              <li><a href="#features" className="hover:text-violet-400 transition-colors">Distributed Cache</a></li>
              <li><a href="#features" className="hover:text-violet-400 transition-colors">Auto-Scaling</a></li>
              <li><a href="#calculator" className="hover:text-violet-400 transition-colors">Cost Calculator</a></li>
            </ul>
          </div>

          {/* Links Col 2: Developers */}
          <div className="space-y-3 text-sm">
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
              Developers
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-violet-400 transition-colors">CLI Reference</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">TypeScript SDK</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Python SDK</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Go Worker API</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">API Changelog</a></li>
            </ul>
          </div>

          {/* Links Col 3: Compliance & Legal */}
          <div className="space-y-3 text-sm">
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
              Trust & Legal
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-violet-400 transition-colors">SOC2 Type II Report</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">HIPAA Compliance</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Security Whitepaper</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} NovaCloud Inc. Built for FrameForge Fiverr Showcase.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
              <GitBranch className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a href="#" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>Network</span>
            </a>
            <a href="#" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>Discord Community</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
