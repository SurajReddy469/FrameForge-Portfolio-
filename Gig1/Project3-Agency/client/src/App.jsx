import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScopeEstimatorModal from './components/ScopeEstimatorModal';

import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
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
                  path="/projects/:id"
                  element={<ProjectDetailPage onOpenEstimator={() => setIsEstimatorOpen(true)} />}
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
