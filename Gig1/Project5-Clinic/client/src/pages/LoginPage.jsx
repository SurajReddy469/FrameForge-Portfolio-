import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { HeartPulse, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const { addToast } = useToast();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: 'patient@medicare.clinic',
    password: 'Password123!',
    phone: '+1 (555) 987-6543',
    bloodGroup: 'B+',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setDemoCredentials = (email, role) => {
    setFormData((prev) => ({
      ...prev,
      email,
      password: 'Password123!',
    }));
    setIsRegisterMode(false);
    addToast(`Filled demo credentials for ${role}`, 'info');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegisterMode) {
        const user = await register(formData);
        addToast(`Patient account created! Welcome, ${user.name}.`, 'success');
        navigate('/my-appointments');
      } else {
        const user = await login(formData.email, formData.password);
        addToast(`Signed in successfully as ${user.name}.`, 'success');
        if (user.role === 'admin' || user.role === 'doctor') {
          navigate('/admin');
        } else {
          navigate('/my-appointments');
        }
      }
    } catch (err) {
      addToast(err.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4 min-h-[80vh] flex flex-col justify-center">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center mb-3">
            <HeartPulse className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {isRegisterMode ? 'Patient Registration' : 'MediCare Plus Portal'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isRegisterMode
              ? 'Create a secure patient account for rapid clinical booking'
              : 'Sign in to access your appointments and medical records'}
          </p>
        </div>

        {/* Demo Fast Logins (when in login mode) */}
        {!isRegisterMode && (
          <div className="mb-6 bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block text-center">
              One-Click Demo Credentials
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setDemoCredentials('admin@medicare.clinic', 'Reception Desk')}
                className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-300 border border-slate-700 transition"
              >
                Reception
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials('doctor@medicare.clinic', 'Physician')}
                className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-300 border border-slate-700 transition"
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials('patient@medicare.clinic', 'Patient')}
                className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-300 border border-slate-700 transition"
              >
                Patient
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Samantha Miller"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@medicare.clinic"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {isRegisterMode && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555)..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-teal-500/20 disabled:opacity-50 transition"
          >
            {loading ? 'Processing...' : isRegisterMode ? 'Create Patient Account' : 'Sign In'}
          </button>
        </form>

        {/* Mode Switch */}
        <div className="mt-6 text-center text-xs text-slate-400">
          {isRegisterMode ? (
            <span>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(false)}
                className="text-teal-400 font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New patient?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(true)}
                className="text-teal-400 font-bold hover:underline"
              >
                Create Account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
