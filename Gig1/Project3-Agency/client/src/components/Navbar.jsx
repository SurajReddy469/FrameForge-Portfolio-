import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, Sparkles, User, Shield, LogOut, Calculator, ArrowRight, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenEstimator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Case Studies', path: '/projects' },
    { name: 'Capabilities', path: '/services' },
    { name: 'Why Apex', path: '/#agency-story' },
    { name: 'Client Inquiries', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 text-white group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading text-xl font-bold tracking-wider text-slate-100 group-hover:text-indigo-400 transition-colors">
                APEX<span className="text-indigo-500">MEDIA</span>
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium">
                B2B Digital Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors hover:text-indigo-400 ${
                  isActive(link.path)
                    ? 'text-indigo-400 border-b-2 border-indigo-500 pb-1'
                    : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={onOpenEstimator}
              className="text-slate-300 hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Calculator className="w-4 h-4 text-indigo-400" />
              <span>Scope Estimator</span>
            </button>
          </nav>

          {/* Actions & Profile */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenEstimator}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 hover:border-indigo-500 text-indigo-300 text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Estimate Budget</span>
            </button>

            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Start Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-slate-800 hover:border-indigo-500 bg-slate-900 text-slate-200 cursor-pointer transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium pr-2 max-w-[100px] truncate hidden sm:inline text-slate-300">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2.5 border-b border-slate-800">
                      <p className="text-sm font-semibold text-slate-100 truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                        {user.role}
                      </span>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-indigo-400 hover:bg-slate-800 transition-colors font-medium"
                      >
                        <Shield className="w-4 h-4 text-indigo-400" />
                        <span>Agency CRM Hub</span>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-950/20 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-800 hover:border-indigo-500 bg-slate-900 text-xs font-semibold text-slate-300 hover:text-indigo-400 cursor-pointer transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>Client Portal</span>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-indigo-400 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-base font-medium ${
                isActive(link.path) ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEstimator();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-base font-medium text-slate-300 hover:text-indigo-400"
          >
            <Calculator className="w-5 h-5 text-indigo-400" />
            <span>Interactive Scope Estimator</span>
          </button>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold uppercase tracking-wider text-sm"
          >
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
