import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, ShoppingBag, Calendar, Compass, User, LogOut, Shield, Menu as MenuIcon, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenTrackModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { totalItemCount, openCart } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Artisanal Menu', path: '/menu' },
    { name: 'Reserve Table', path: '/reserve' },
    { name: 'About & Story', path: '/#story' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-950/40 text-stone-950 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-serif-luxury text-2xl font-bold tracking-wider text-amber-100 group-hover:text-amber-400 transition-colors">
                GOURMET<span className="text-amber-500">HAVEN</span>
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-stone-400 font-medium">
                Artisanal Gastronomy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-amber-400 ${
                  isActive(link.path)
                    ? 'text-amber-400 border-b-2 border-amber-400 pb-1'
                    : 'text-stone-300'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={onOpenTrackModal}
              className="text-sm font-medium text-stone-300 hover:text-amber-400 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Track Order</span>
            </button>
          </nav>

          {/* Actions: Cart, User Silhouette, Reservation CTA */}
          <div className="flex items-center gap-4">
            {/* Cart Trigger Pill */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-200 hover:text-amber-400 transition-all cursor-pointer group"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-md">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Reserve Quick Link */}
            <Link
              to="/reserve"
              className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/30 transition-all cursor-pointer hover:shadow-amber-500/20 hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table</span>
            </Link>

            {/* User Account / Profile Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-stone-700 hover:border-amber-500 bg-stone-900 text-stone-200 cursor-pointer transition-all"
                >
                  {/* Clean default user silhouette avatar badge */}
                  <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-amber-400">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium pr-2 max-w-[100px] truncate hidden sm:inline text-stone-300">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-stone-900 border border-stone-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2.5 border-b border-stone-800">
                      <p className="text-sm font-semibold text-stone-100 truncate">{user.name}</p>
                      <p className="text-xs text-stone-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {user.role}
                      </span>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-amber-400 hover:bg-stone-800/80 transition-colors font-medium"
                      >
                        <Shield className="w-4 h-4 text-amber-500" />
                        <span>Manager Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition-colors text-left cursor-pointer"
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
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-stone-800 hover:border-amber-500/60 bg-stone-900/60 text-xs font-medium text-stone-300 hover:text-amber-400 cursor-pointer transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center text-stone-400">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-stone-900 text-stone-300 hover:text-amber-400 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(link.path) ? 'bg-amber-500/10 text-amber-400' : 'text-stone-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTrackModal();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-stone-300 hover:text-amber-400"
          >
            <Compass className="w-5 h-5 text-amber-500" />
            <span>Track Order</span>
          </button>
          <Link
            to="/reserve"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold uppercase tracking-wider text-sm"
          >
            Book Table Reservation
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
