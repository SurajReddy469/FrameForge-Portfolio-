import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Mail, MapPin, Layers, ExternalLink } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const isHub = location.pathname === '/';

  if (isHub) {
    return (
      <footer className="bg-white text-slate-600 pt-16 pb-12 border-t border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
                  <Layers className="w-5 h-5 text-white stroke-[2.5]" />
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  FRAME<span className="text-emerald-600">FORGE</span>
                </span>
              </Link>
              <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
                Custom full-stack web application engineering for startups, founders, and growing businesses. Responsive interfaces, REST APIs, databases, authentication, and turnkey cloud deployment.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Accepting Custom Projects
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  Fiverr Verified Standard
                </span>
              </div>
            </div>

            {/* Demos Column */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">5 Live Demos</h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li>
                  <Link to="/properties" className="hover:text-emerald-700 transition">1. UrbanNest (Real Estate)</Link>
                </li>
                <li>
                  <a href="https://frameforge-gourmethaven.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-emerald-700 transition flex items-center gap-1">
                    2. GourmetHaven (Dining) <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a href="https://frameforge-apexmedia.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-emerald-700 transition flex items-center gap-1">
                    3. ApexMedia (Agency CRM) <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a href="https://frameforge-fitpulse.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-emerald-700 transition flex items-center gap-1">
                    4. FitPulse (Fitness Club) <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a href="https://frameforge-medicare.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-emerald-700 transition flex items-center gap-1">
                    5. MediCare Plus (Clinic) <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Hub Navigation Column */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Scope & Process</h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li><a href="#deliverables" className="hover:text-emerald-700 transition">Full-Stack Scope</a></li>
                <li><a href="#demos" className="hover:text-emerald-700 transition">Interactive Demos</a></li>
                <li><a href="#workflow" className="hover:text-emerald-700 transition">6-Step Workflow</a></li>
                <li><a href="#services" className="hover:text-emerald-700 transition">Pricing & Packages</a></li>
                <li><a href="#faq" className="hover:text-emerald-700 transition">Client FAQ</a></li>
                <li><a href="#quote" className="hover:text-emerald-700 transition font-bold text-emerald-700">Request a Quote →</a></li>
              </ul>
            </div>

            {/* Direct Inquiry & Verification */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Direct Contact</h4>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">support@frameforge.dev</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Global Remote Freelance</span>
                </li>
                <li className="pt-1">
                  <a
                    href="https://wa.me/919876543210?text=Hi%20FrameForge,%20I'm%20interested%20in%20a%20custom%20full-stack%20web%20application"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
                  >
                    <span>💬 WhatsApp Project Chat</span>
                  </a>
                </li>
                <li className="pt-1">
                  <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-2.5 leading-relaxed">
                    Notice: All 5 showcase applications feature sample demo data to illustrate real-world architecture.
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Sub-footer */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} FrameForge Engineering. Custom full-stack web applications.</p>
            <div className="flex items-center gap-3 text-slate-500 font-medium">
              <span>React</span>
              <span>·</span>
              <span>Tailwind CSS</span>
              <span>·</span>
              <span>Node.js</span>
              <span>·</span>
              <span>Express</span>
              <span>·</span>
              <span>MongoDB</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

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
                <div className="text-[11px] text-emerald-400/90 bg-slate-800/90 border border-slate-700/80 rounded-lg p-2.5 mt-1">Notice: UrbanNest is an illustrative real estate demo with sample properties. All listings, specs, and prices are fictional technical demonstrations.</div>
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