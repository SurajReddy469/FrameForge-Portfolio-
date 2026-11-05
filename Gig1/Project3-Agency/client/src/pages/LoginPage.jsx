import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register, isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await register(formData.name, formData.email, formData.password, formData.company);
        showToast('Account registered successfully! Welcome to ApexMedia.', 'success');
        navigate('/');
      } else {
        const loggedInUser = await login(formData.email, formData.password);
        showToast(`Welcome back, ${loggedInUser.name || 'Member'}!`, 'success');
        if (loggedInUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      showToast(err.message || 'Authentication failed. Please check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickDemo = (email, password) => {
    setFormData({
      ...formData,
      email,
      password,
    });
    setIsRegister(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 shadow-2xl space-y-6">
        {/* Brand / Avatar Icon - Clean silhouette */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20 text-white">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {isRegister ? 'Create Client Portal Account' : 'ApexMedia Principal Portal'}
          </h2>
          <p className="text-xs text-slate-400">
            {isRegister
              ? 'Register to track project deliverables and active sprint milestones.'
              : 'Sign in to access agency CRM, lead pipeline, and portfolio management.'}
          </p>
        </div>

        {/* Quick Demo Evaluation Buttons */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
            <span>One-Click Evaluation Accounts</span>
            <span className="text-blue-400">Click to fill</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillQuickDemo('admin@apexmedia.com', 'admin123')}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-left border border-slate-700/80 text-xs transition-colors group"
            >
              <div className="flex items-center gap-1.5 font-bold text-white group-hover:text-blue-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Admin Principal</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">admin@apexmedia.com</p>
            </button>

            <button
              type="button"
              onClick={() => fillQuickDemo('client@apexmedia.com', 'client123')}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-left border border-slate-700/80 text-xs transition-colors group"
            >
              <div className="flex items-center gap-1.5 font-bold text-white group-hover:text-emerald-400">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>Venture Client</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">client@apexmedia.com</p>
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Brand</label>
                <input
                  type="text"
                  placeholder="CloudSphere Inc."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isRegister ? 'Create Portal Account' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch tab */}
        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-blue-400 font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New venture client?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-blue-400 font-semibold hover:underline"
              >
                Register Portal Account
              </button>
            </p>
          )}
        </div>

        {/* Security badge */}
        <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Strict RBAC Protected • Zero privilege escalation permitted</span>
        </div>
      </div>
    </div>
  );
}
