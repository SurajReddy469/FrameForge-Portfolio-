import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleQuickDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@gourmethaven.com');
      setPassword('admin123');
    } else {
      setEmail('user@gourmethaven.com');
      setPassword('user123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login({ email, password });
      addToast(`Welcome back, ${user.name}!`, 'success');
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/menu');
      }
    } catch (err) {
      addToast(err.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Header with default person avatar */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-stone-800 border-2 border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-serif-luxury text-2xl font-bold text-stone-100">
              {isRegister ? 'Join GourmetHaven' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              {isRegister ? 'Create an account to reserve and dine' : 'Sign in to access your culinary reservations & orders'}
            </p>
          </div>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block text-center">
            ⚡ 1-Click Evaluation Accounts
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold cursor-pointer transition-all hover:border-amber-500/40"
            >
              👑 Manager (Admin)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('user')}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold cursor-pointer transition-all hover:border-amber-500/40"
            >
              🍷 Foodie (Customer)
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-[11px] text-stone-400 uppercase tracking-wider block mb-1 font-medium">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] text-stone-400 uppercase tracking-wider block mb-1 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gourmethaven.com"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-stone-400 uppercase tracking-wider block mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-stone-800">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            {isRegister
              ? 'Already have an account? Sign In'
              : "Don't have an account yet? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
