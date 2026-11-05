import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompareModal from './components/CompareModal';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CompareProvider>
          <ToastProvider>
            <Router>
              <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
                
                {/* Top Demo Banner for Evaluators */}
                <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 text-center font-medium border-b border-slate-800 flex items-center justify-center gap-2 no-print">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>FrameForge Portfolio Demo • Gig 1: Full-Stack MERN Real Estate Platform</span>
                  <span className="hidden sm:inline text-slate-500">|</span>
                  <span className="hidden sm:inline text-slate-400">Demo admin credentials are available on the sign-in page</span>
                </div>

                <Navbar />

                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/properties" element={<PropertiesPage />} />
                    <Route path="/properties/:id" element={<PropertyDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>

                {/* Global Floating Comparison Bar and Modal */}
                <CompareModal />

                <Footer />

              </div>
            </Router>
          </ToastProvider>
        </CompareProvider>
      </AuthProvider>
      <Analytics />
    </ErrorBoundary>
  );
}

export default App;
