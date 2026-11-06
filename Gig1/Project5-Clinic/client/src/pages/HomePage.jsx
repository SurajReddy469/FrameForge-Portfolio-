import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doctorApi, departmentApi } from '../services/api';
import DoctorCard from '../components/DoctorCard';
import AppointmentModal from '../components/AppointmentModal';
import AppointmentSlipModal from '../components/AppointmentSlipModal';
import {
  HeartPulse,
  Calendar,
  Clock,
  ShieldCheck,
  Stethoscope,
  Users,
  Search,
  ArrowRight,
  Bone,
  Baby,
  Brain,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docs, depts] = await Promise.all([
          doctorApi.getAll(),
          departmentApi.getAll(),
        ]);
        setDoctors(docs);
        setDepartments(depts);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/doctors?search=${encodeURIComponent(searchTerm)}`);
  };

  const departmentIcons = {
    CARD: HeartPulse,
    ORTH: Bone,
    PEDI: Baby,
    NEUR: Brain,
    DERM: Sparkles,
    GENM: Stethoscope,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none animate-pulseSubtle"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold tracking-wide uppercase mb-6">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Certified Healthcare Network • CarePoint Center</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Compassionate Care,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                Seamless Scheduling.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Book consultations with world-class medical specialists, avoid waiting rooms with
              precision time-slot reservations, and manage your health records in one secure portal.
            </p>

            {/* Quick Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-2 p-2 bg-slate-800/90 border border-slate-700 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 px-3 py-2 w-full">
                <Search className="w-5 h-5 text-teal-400 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search doctor, condition, or specialty..."
                  className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 transition shadow-md shrink-0"
              >
                Find Doctor
              </button>
            </form>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14">
            <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">6</div>
              <div className="text-xs text-slate-400 font-medium">Specialized Departments</div>
            </div>
            <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-teal-400 mb-1">6</div>
              <div className="text-xs text-slate-400 font-medium">Sample Doctor Profiles</div>
            </div>
            <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mb-1">Demo</div>
              <div className="text-xs text-slate-400 font-medium">Appointment Workflows</div>
            </div>
            <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">24/7</div>
              <div className="text-xs text-slate-400 font-medium">Digital Intake Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
              Clinical Specializations
            </span>
            <h2 className="text-3xl font-extrabold text-white">Explore Clinical Departments</h2>
          </div>
          <Link
            to="/departments"
            className="flex items-center gap-1.5 text-sm font-bold text-teal-400 hover:text-teal-300 transition"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const Icon = departmentIcons[dept.code] || Stethoscope;
            return (
              <div
                key={dept.code}
                onClick={() => navigate(`/doctors?department=${dept.code}`)}
                className="bg-slate-800/60 border border-slate-700/60 hover:border-teal-500/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/20 group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {dept.description}
                </p>
                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                  <span>Head: {dept.headOfDepartment}</span>
                  <span className="text-teal-400 font-semibold">{dept.roomNumber}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
                Available Specialists
              </span>
              <h2 className="text-3xl font-extrabold text-white">Board-Certified Physicians</h2>
            </div>
            <Link
              to="/doctors"
              className="flex items-center gap-1.5 text-sm font-bold text-teal-400 hover:text-teal-300 transition"
            >
              <span>See Full Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Loading doctor schedule...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.slice(0, 6).map((doc) => (
                <DoctorCard
                  key={doc._id}
                  doctor={doc}
                  onBook={(d) => setSelectedDoctorForBooking(d)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How Appointment Scheduling Works */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            How MediCare Plus Appointment Booking Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl relative">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 font-black flex items-center justify-center text-lg mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Choose Doctor & Slot</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Filter by specialty or department, pick your preferred physician, and select an available, conflict-checked consultation time slot.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 text-slate-950 font-black flex items-center justify-center text-lg mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Complete Digital Intake</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter sample symptoms and medical background in a structured digital intake questionnaire demonstration.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-lg mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Instant Digital Slip</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive your confirmed appointment pass with unique verification code <code className="text-teal-300 font-mono text-[11px]">CARE-APPT-XXXXXX</code> for fast reception check-in.
            </p>
          </div>
        </div>
      </section>

      {/* World-Class Clinical Facilities Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
            State-Of-The-Art Medical Center
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Engineered For Clinical Excellence
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Equipped with 3T MRI diagnostics, HEPA-filtered surgical suites, and dedicated pediatric healing wards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-800/40 hover:border-teal-500/40 transition-all">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                alt="Advanced Diagnostic & MRI Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h4 className="font-bold text-white text-base">Advanced Diagnostic Imaging Suite</h4>
              <p className="text-xs text-slate-400 mt-1.5">3T High-Resolution MRI, 128-Slice CT, and real-time hemodynamic analysis.</p>
            </div>
          </div>

          <div className="group rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-800/40 hover:border-teal-500/40 transition-all">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                alt="Cardiac Intensive & Surgical Care"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h4 className="font-bold text-white text-base">Cardiac & Surgical Center</h4>
              <p className="text-xs text-slate-400 mt-1.5">Minimally invasive catheterization labs and 24/7 emergency telemetry monitoring.</p>
            </div>
          </div>

          <div className="group rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-800/40 hover:border-teal-500/40 transition-all">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80"
                alt="Pediatric & Family Healing Wing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h4 className="font-bold text-white text-base">Pediatric & Family Care Pavilion</h4>
              <p className="text-xs text-slate-400 mt-1.5">Calming, sensory-friendly clinic spaces designed specifically for children and families.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Illustrative Patient Testimonials Section */}
      <section className="bg-slate-900/40 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">Illustrative Sample Content</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Example Patient Feedback (Fictional)
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Fictional testimonials shown to demonstrate this interface. They do not represent real patients or clinical outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex text-amber-400 text-xs gap-1">★★★★★</div>
              <p className="text-xs text-slate-300 italic">"Dr. Jenkins was exceptionally thorough with my cardiac evaluation. The digital check-in saved 30 minutes in the waiting room."</p>
              <div className="pt-2 border-t border-slate-700/60">
                <p className="text-xs font-bold text-white">David K.</p>
                <p className="text-[11px] text-teal-400">Cardiology Patient • Oct 2026</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex text-amber-400 text-xs gap-1">★★★★★</div>
              <p className="text-xs text-slate-300 italic">"Finding a pediatric slot for my daughter was seamless. Dr. Rostova made her feel completely safe and relaxed."</p>
              <div className="pt-2 border-t border-slate-700/60">
                <p className="text-xs font-bold text-white">Sarah M.</p>
                <p className="text-[11px] text-teal-400">Pediatrics Parent • Nov 2026</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex text-amber-400 text-xs gap-1">★★★★★</div>
              <p className="text-xs text-slate-300 italic">"Direct upfront consultation fees with zero hidden charges. The appointment confirmation ticket on my phone was all I needed."</p>
              <div className="pt-2 border-t border-slate-700/60">
                <p className="text-xs font-bold text-white">Rajesh P.</p>
                <p className="text-[11px] text-teal-400">Orthopedics Patient • Nov 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking Modal */}
      {selectedDoctorForBooking && (
        <AppointmentModal
          doctor={selectedDoctorForBooking}
          onClose={() => setSelectedDoctorForBooking(null)}
          onAppointmentSuccess={(appointment) => {
            setSelectedDoctorForBooking(null);
            setConfirmedAppointment(appointment);
          }}
        />
      )}

      {/* Digital Appointment Slip Modal */}
      {confirmedAppointment && (
        <AppointmentSlipModal
          appointment={confirmedAppointment}
          onClose={() => setConfirmedAppointment(null)}
        />
      )}
    </div>
  );
}
