import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route path="/book" element={<BookAppointmentPage />} />
                <Route path="/my-appointments" element={<MyAppointmentsPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}
