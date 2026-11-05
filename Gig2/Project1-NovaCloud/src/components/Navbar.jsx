import React, { useState, useEffect } from 'react';
import { Cloud, Menu, X, ArrowRight, Sun, Moon, Terminal } from 'lucide-react';
import { navigationLinks } from '../data/saasData';

export default function Navbar({ onOpenDemo, isDarkMode, setIsDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? (isDarkMode ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20' : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-md')
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:scale-105 transition-transform duration-200">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Nova<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">Cloud</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-violet-400">Edge Runtime</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 hover:text-violet-400 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Theme"
              className={`p-2.5 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900' 
                  : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onOpenDemo()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Theme"
              className={`p-2 rounded-lg border ${
                isDarkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className={`p-2 rounded-lg border ${
                isDarkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-3 pb-6 space-y-4 ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col space-y-3">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-base font-medium ${
                  isDarkMode ? 'text-slate-200 hover:bg-slate-900' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
