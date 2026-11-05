import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Clock, Phone, Mail, ShieldCheck, Flame } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800/80">
        <div className="rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-rose-950/40 border border-red-500/20 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 mb-3">
              <Flame className="w-3.5 h-3.5" /> High-Performance Athletics
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to redefine your physical ceiling?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Join 250+ elite athletes, founders, and fitness enthusiasts pushing limits daily in our state-of-the-art conditioning studios.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <Dumbbell className="w-4 h-4" />
              View Class Timetable
            </Link>
            <Link
              to="/memberships"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Explore Passes
            </Link>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-lg">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white">FIT<span className="text-red-500">PULSE</span></span>
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Athletic Club</p>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            World-class functional fitness, Olympic lifting, high-intensity intervals, and restorative breathwork led by credentialed coaches.
          </p>
        </div>

        {/* Disciplines */}
        <div>
          <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Disciplines</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/schedule" className="hover:text-red-400 transition-colors">CrossFit MetCon & Barbell</Link></li>
            <li><Link to="/schedule" className="hover:text-red-400 transition-colors">Power Vinyasa & Mobility</Link></li>
            <li><Link to="/schedule" className="hover:text-red-400 transition-colors">Iron Core & Tabata Inferno</Link></li>
            <li><Link to="/schedule" className="hover:text-red-400 transition-colors">Velocity Rhythm Spin</Link></li>
            <li><Link to="/schedule" className="hover:text-red-400 transition-colors">Fight Club Combat Boxing</Link></li>
          </ul>
        </div>

        {/* Studio Info */}
        <div>
          <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Studio Hours</h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Monday – Friday: 5:00 AM – 11:00 PM</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Saturday – Sunday: 6:00 AM – 9:00 PM</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>+1 (555) 019-PULSE</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>concierge@fitpulse.gym</span>
            </li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Locations</h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <span><strong>Downtown Flagship:</strong> 428 Broadway, SoHo, NY</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <span><strong>European Studio:</strong> Shoreditch High St, London</span>
            </li>
            <li className="flex items-center gap-2 text-emerald-400 pt-2 text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>USAW & CSCS Certified Facility</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FitPulse Athletic Club. Built by FrameForge Studio.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/SurajReddy469/FrameForge-Portfolio-"
              target="_blank"
              rel="noreferrer"
              className="text-red-400 hover:text-red-300 font-semibold"
            >
              GitHub Source ↗
            </a>
            <span>•</span>
            <Link to="/login" className="hover:text-slate-400">Staff Portal</Link>
            <span>•</span>
            <Link to="/memberships" className="hover:text-slate-400">Terms & Class Rules</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
