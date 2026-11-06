import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompareModal from './components/CompareModal';
const PortfolioHubPage = lazy(() => import('./pages/PortfolioHubPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CompareProvider>
          <ToastProvider>
            <Router>
              <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
                
                

                <Navbar />

                <main className="flex-1">
                  <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-sm text-slate-500">Loading page…</div>}>
                    <Routes>
                      <Route path="/" element={<PortfolioHubPage />} />
                      <Route path="/demo/urbannest" element={<HomePage />} />
                      <Route path="/properties" element={<PropertiesPage />} />
                      <Route path="/properties/:id" element={<PropertyDetailPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/admin" element={<AdminDashboardPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Suspense>
                </main>

                {/* Global Floating Comparison Bar and Modal */}
                <CompareModal />

                <Footer />

              </div>
            </Router>
          </ToastProvider>
        </CompareProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
