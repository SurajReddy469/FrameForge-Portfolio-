import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HeartPulse,
  Calendar,
  Users,
  Building2,
  ClipboardList,
  ShieldAlert,
  User,
  LogOut,
  Menu,
  X,
  Stethoscope,
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, isDoctor, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Departments', path: '/departments' },
    { label: 'Book Appointment', path: '/book' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 group-hover:scale-105 transition">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-white tracking-tight">MediCare</span>
                <span className="font-extrabold text-xl text-teal-400">Plus</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">CarePoint Clinical Center</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  isActive(link.path)
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && !isAdmin && (
              <Link
                to="/my-appointments"
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                  isActive('/my-appointments')
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ClipboardList className="w-4 h-4 text-teal-400" />
                <span>My Appointments</span>
              </Link>
            )}

            {(isAdmin || isDoctor) && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                  isActive('/admin')
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'text-teal-400 hover:text-teal-300 hover:bg-teal-950/40'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Reception Desk</span>
              </Link>
            )}
          </nav>

          {/* Right Action / User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
                <div className="flex items-center gap-2.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                  <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-semibold text-white leading-tight">{user.name}</div>
                    <div className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">
                      {user.role}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/book"
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-teal-500/20 transition transform hover:-translate-y-0.5"
                >
                  Book Visit
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-semibold ${
                isActive(link.path)
                  ? 'bg-teal-500/10 text-teal-400'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated && !isAdmin && (
            <Link
              to="/my-appointments"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-300 hover:bg-slate-800"
            >
              My Appointments
            </Link>
          )}

          {(isAdmin || isDoctor) && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-teal-400 hover:bg-teal-950/40"
            >
              Reception Desk
            </Link>
          )}

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{user.name}</div>
                    <div className="text-xs text-teal-400 capitalize">{user.role}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs text-rose-400 border border-rose-500/30 rounded-lg hover:bg-rose-500/10"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-semibold text-slate-300 bg-slate-800 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-bold bg-teal-500 text-slate-950 rounded-lg"
                >
                  Book Visit
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
