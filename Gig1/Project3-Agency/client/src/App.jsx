import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScopeEstimatorModal from './components/ScopeEstimatorModal';

import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
            {/* Top Operational Pill Banner */}
            <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-900/60 border-b border-slate-800 text-[11px] py-1.5 px-4 text-center text-slate-300 flex items-center justify-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                <strong>ApexMedia Agency</strong> (Gig 1 • Project 3) • Ports <strong>:5002</strong> (API) & <strong>:5175</strong> (Web) • 100% Test & Security Verified
              </span>
            </div>

            {/* Global Navbar */}
            <Navbar onOpenEstimator={() => setIsEstimatorOpen(true)} />

            {/* Main Application Body */}
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={<HomePage onOpenEstimator={() => setIsEstimatorOpen(true)} />}
                />
                <Route
                  path="/projects"
                  element={<ProjectsPage onOpenEstimator={() => setIsEstimatorOpen(true)} />}
                />
                <Route
                  path="/services"
                  element={<ServicesPage onOpenEstimator={() => setIsEstimatorOpen(true)} />}
                />
                <Route
                  path="/contact"
                  element={<ContactPage onOpenEstimator={() => setIsEstimatorOpen(true)} />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer onOpenEstimator={() => setIsEstimatorOpen(true)} />

            {/* Global Scope Estimator Modal */}
            <ScopeEstimatorModal
              isOpen={isEstimatorOpen}
              onClose={() => setIsEstimatorOpen(false)}
            />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
