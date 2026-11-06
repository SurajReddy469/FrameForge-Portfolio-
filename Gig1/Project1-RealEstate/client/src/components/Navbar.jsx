import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  LogOut,
  Send,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHub = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const navLinksUrban = [
    { label: 'Explore All', path: '/properties' },
    { label: 'For Sale', path: '/properties?purpose=For+Sale' },
    { label: 'For Rent', path: '/properties?purpose=For+Rent' },
  ];

  const demoList = [
    { name: '1. UrbanNest (Real Estate)', path: '/properties', internal: true },
    { name: '2. GourmetHaven (Restaurant)', path: 'https://frameforge-gourmethaven.vercel.app/', internal: false },
    { name: '3. ApexMedia (Digital Agency)', path: 'https://frameforge-apexmedia.vercel.app/', internal: false },
    { name: '4. FitPulse (Athletic Studio)', path: 'https://frameforge-fitpulse.vercel.app/', internal: false },
    { name: '5. MediCare Plus (Clinic)', path: 'https://frameforge-medicare.vercel.app/', internal: false },
  ];

  if (isHub) {
    // -------------------------------------------------------------
    // FRAMEFORGE PORTFOLIO HUB NAVBAR (LIGHT THEME)
    // -------------------------------------------------------------
    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all text-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform font-black">
                <Layers className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  FRAME<span className="text-emerald-600">FORGE</span>
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Full-Stack Web Engineering
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <a href="#demos" className="hover:text-emerald-700 transition-colors">5 Live Demos</a>
              <a href="#walkthroughs" className="hover:text-emerald-700 transition-colors">Walkthroughs</a>
              <a href="#deliverables" className="hover:text-emerald-700 transition-colors">Deliverables</a>
              <a href="#workflow" className="hover:text-emerald-700 transition-colors">How I Work</a>
              <a href="#services" className="hover:text-emerald-700 transition-colors">Service Tiers</a>
              <a href="#faq" className="hover:text-emerald-700 transition-colors">FAQ</a>

              {/* Demo Quick Jump */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition shadow-xs"
                >
                  <span>Select Demo</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {demoMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      Live Deployed Demos
                    </div>
                    {demoList.map((d) => (
                      d.internal ? (
                        <Link
                          key={d.name}
                          to={d.path}
                          onClick={() => setDemoMenuOpen(false)}
                          className="block px-3 py-2 text-xs text-slate-700 hover:text-emerald-700 hover:bg-slate-50 transition"
                        >
                          {d.name}
                        </Link>
                      ) : (
                        <a
                          key={d.name}
                          href={d.path}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setDemoMenuOpen(false)}
                          className="block px-3 py-2 text-xs text-slate-700 hover:text-emerald-700 hover:bg-slate-50 transition"
                        >
                          {d.name} ↗
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Action: Request Quote CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://www.fiverr.com/sellers/frameforgehq/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Message on Fiverr</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle Navigation Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Hub Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl text-slate-800">
            <div className="flex flex-col space-y-2 text-sm font-semibold">
              <a
                href="#demos"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                5 Live Demos
              </a>
              <a
                href="#walkthroughs"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                Walkthroughs
              </a>
              <a
                href="#deliverables"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                Deliverables
              </a>
              <a
                href="#workflow"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                How I Work
              </a>
              <a
                href="#services"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                Service Tiers
              </a>
              <a
                href="#faq"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                FAQ
              </a>
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block px-3">
                Live Demos:
              </span>
              {demoList.map((d) => (
                d.internal ? (
                  <Link
                    key={d.name}
                    to={d.path}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-1.5 text-xs text-slate-700 hover:text-emerald-700"
                  >
                    {d.name}
                  </Link>
                ) : (
                  <a
                    key={d.name}
                    href={d.path}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-1.5 text-xs text-slate-700 hover:text-emerald-700"
                  >
                    {d.name} ↗
                  </a>
                )
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200">
              <a
                href="https://www.fiverr.com/sellers/frameforgehq/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Message on Fiverr</span>
              </a>
            </div>
          </div>
        )}
      </header>
    );
  }

  // -------------------------------------------------------------
  // URBANNEST DEMO APPLICATION NAVBAR
  // -------------------------------------------------------------
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top Portfolio Return Banner */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-200">UrbanNest Live Demo</span>
            <span className="text-slate-500 hidden sm:inline">• Illustrative PropTech Marketplace</span>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>← FrameForge Portfolio Overview</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/demo/urbannest" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                Urban<span className="text-emerald-600">Nest</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                FrameForge Architecture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/demo/urbannest"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/demo/urbannest' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Marketplace Home
            </Link>

            {navLinksUrban.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname + location.search === link.path ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/properties"
              className="p-2.5 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
              title="Search Properties"
            >
              <Search className="w-5 h-5" />
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Admin Portal
                  </Link>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 ring-2 ring-emerald-500/30 shrink-0">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-slate-900 truncate max-w-[100px]">{user.name}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Log Out"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/login?tab=register"
                  className="px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/30 transition hover:shadow cursor-pointer"
                >
                  Demo Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm font-bold text-emerald-600 bg-emerald-50 rounded-lg"
            >
              ← Back to FrameForge Portfolio Overview
            </Link>
            <Link
              to="/demo/urbannest"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Marketplace Home
            </Link>
            {navLinksUrban.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 ring-2 ring-emerald-500/30 shrink-0">
                    <User className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-semibold rounded-lg bg-slate-900 text-white"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Admin Control Center
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-2.5 text-sm font-semibold border border-slate-200 rounded-lg text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/login?tab=register"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-2.5 text-sm font-semibold bg-emerald-600 text-white rounded-lg shadow-sm"
                >
                  Demo Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
