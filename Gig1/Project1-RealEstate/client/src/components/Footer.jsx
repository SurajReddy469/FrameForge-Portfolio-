import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Urban<span className="text-emerald-400">Nest</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A high-performance full-stack real estate marketplace engineered with the MERN stack. Designed and developed under the <strong>FrameForge</strong> portfolio standard for professional web development.
            </p>
            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                FrameForge Gig 1 Showcase
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-emerald-400 transition">Featured Listings</Link>
              </li>
              <li>
                <Link to="/properties?purpose=For+Sale" className="hover:text-emerald-400 transition">Properties for Sale</Link>
              </li>
              <li>
                <Link to="/properties?purpose=For+Rent" className="hover:text-emerald-400 transition">Rental Homes</Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Top Markets</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/properties?city=Hyderabad" className="hover:text-white transition">Hyderabad (Hitec City)</Link>
              </li>
              <li>
                <Link to="/properties?city=Bengaluru" className="hover:text-white transition">Bengaluru (Indiranagar)</Link>
              </li>
              <li>
                <Link to="/properties?city=Goa" className="hover:text-white transition">Goa (Coastal Luxury)</Link>
              </li>
              <li>
                <Link to="/properties?city=Mumbai" className="hover:text-white transition">Mumbai (Marine Drive)</Link>
              </li>
              <li>
                <Link to="/properties?city=Delhi+NCR" className="hover:text-white transition">Delhi NCR (DLF Estates)</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Verification */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Portfolio Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@frameforge.dev</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>India (Global Freelance)</span>
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/919876543210?text=Hi%20FrameForge,%20I'm%20interested%20in%20a%20custom%20real%20estate%20platform%20like%20UrbanNest"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <span>💬 WhatsApp Order Chat</span>
                </a>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                <span>Sample Property Data • Illustrative Demo</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FrameForge · UrbanNest MERN Portal. Built for client excellence.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>React.js</span>
            <span>·</span>
            <span>Tailwind CSS</span>
            <span>·</span>
            <span>Node.js</span>
            <span>·</span>
            <span>MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
