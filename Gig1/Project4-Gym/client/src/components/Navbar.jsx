import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Calendar, Users, Award, Ticket, Shield, LogOut, User, Menu, X, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenQuickBook }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, isAdmin, isTrainer, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Class Schedule', path: '/schedule', icon: Calendar },
    { name: 'Elite Coaches', path: '/trainers', icon: Users },
    { name: 'Memberships', path: '/memberships', icon: Award },
    { name: 'My Class Passes', path: '/my-bookings', icon: Ticket, authRequired: true }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-lg shadow-red-600/30 text-white group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white group-hover:text-red-400 transition-colors">
                FIT<span className="text-red-500">PULSE</span>
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-slate-400 font-bold">
                Performance Athletics
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navLinks.map((link) => {
              if (link.authRequired && !user) return null;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors hover:text-red-400 flex items-center gap-1.5 ${
                    isActive(link.path)
                      ? 'text-red-500 border-b-2 border-red-500 pb-1'
                      : 'text-slate-300'
                  }`}
                >
                  <link.icon className="w-4 h-4 opacity-70" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Class Credits Badge for logged in member */}
            {user && (
              <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-slate-400">Pass:</span>
                <span className="text-amber-400 font-bold">
                  {user.membershipTier === 'Elite' ? 'VIP Unlimited' : `${user.classCredits ?? 10} Credits`}
                </span>
              </div>
            )}

            <Link
              to="/schedule"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/25 transition-all hover:scale-105"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Class</span>
            </Link>

            {/* Profile Dropdown / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-slate-800 hover:border-red-500 bg-slate-900 text-slate-200 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-red-400">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold pr-2 max-w-[100px] truncate hidden sm:inline text-slate-300">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-slate-800">
                      <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                          {user.role}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {user.membershipTier || 'Pro'} Tier
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/my-bookings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Ticket className="w-4 h-4 text-red-400" />
                      <span>My Active Passes</span>
                    </Link>

                    {(isAdmin || isTrainer) && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400 hover:bg-slate-800 transition-colors font-semibold"
                      >
                        <Shield className="w-4 h-4 text-red-400" />
                        <span>Studio Manager Hub</span>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-950/20 transition-colors text-left"
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
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-800 hover:border-red-500 bg-slate-900 text-xs font-bold text-slate-300 hover:text-red-400 transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>Member Portal</span>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-red-400"
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
              className={`block px-3 py-2 rounded-xl text-base font-semibold ${
                isActive(link.path) ? 'bg-red-500/10 text-red-400' : 'text-slate-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/schedule"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold uppercase tracking-wider text-sm shadow-lg shadow-red-600/30"
          >
            Book Studio Class
          </Link>
        </div>
      )}
    </header>
  );
}
