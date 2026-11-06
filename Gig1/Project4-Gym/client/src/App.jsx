import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import TrainersPage from './pages/TrainersPage';
import MembershipsPage from './pages/MembershipsPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
            

            {/* Global Navbar */}
            <Navbar />

            {/* Application Main Content */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/trainers" element={<TrainersPage />} />
                <Route path="/memberships" element={<MembershipsPage />} />
                <Route path="/my-bookings" element={<MyBookingsPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
