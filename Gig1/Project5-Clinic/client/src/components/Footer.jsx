import React from 'react';
import { HeartPulse, PhoneCall, Clock, MapPin, ShieldCheck, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                MediCare <span className="text-teal-400">Plus</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4 text-slate-400">
              CarePoint Clinical Center provides board-certified physicians, modern diagnostic
              technology, and streamlined appointment scheduling for patients and families.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400/90 bg-teal-950/40 p-2.5 rounded-lg border border-teal-800/40">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>HIPAA-compliant encrypted medical intake</span>
            </div>
          </div>

          {/* Clinical Departments */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Specialized Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/doctors?department=CARD" className="hover:text-teal-400 transition">
                  Cardiology & Vascular Care
                </Link>
              </li>
              <li>
                <Link to="/doctors?department=ORTH" className="hover:text-teal-400 transition">
                  Orthopedics & Joint Health
                </Link>
              </li>
              <li>
                <Link to="/doctors?department=PEDI" className="hover:text-teal-400 transition">
                  Pediatrics & Neonatal Care
                </Link>
              </li>
              <li>
                <Link to="/doctors?department=NEUR" className="hover:text-teal-400 transition">
                  Neurology & Brain Sciences
                </Link>
              </li>
              <li>
                <Link to="/doctors?department=DERM" className="hover:text-teal-400 transition">
                  Dermatology & Skin Clinic
                </Link>
              </li>
              <li>
                <Link to="/doctors?department=GENM" className="hover:text-teal-400 transition">
                  General & Preventative Medicine
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinic Hours & Urgent Info */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Clinic Hours
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Monday – Friday</p>
                  <p className="text-xs text-slate-400">8:00 AM – 7:00 PM EST</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Saturday</p>
                  <p className="text-xs text-slate-400">9:00 AM – 3:00 PM EST</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Emergency Triage</p>
                  <p className="text-xs text-rose-400 font-medium">In emergency, dial 911</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Find Our Clinic
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <p>Medical Arts Plaza, Suite 400<br />742 Evergreen Terrace, Metropolis</p>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+1 (555) 019-CARE</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>appointments@medicare.clinic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© {new Date().getFullYear()} MediCare Plus CarePoint Clinic. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>FrameForge Portfolio Flagship</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span>Gig 1: Full-Stack MERN Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
