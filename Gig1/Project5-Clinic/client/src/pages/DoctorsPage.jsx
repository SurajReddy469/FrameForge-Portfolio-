import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doctorApi, departmentApi } from '../services/api';
import DoctorCard from '../components/DoctorCard';
import AppointmentModal from '../components/AppointmentModal';
import AppointmentSlipModal from '../components/AppointmentSlipModal';
import { Search, Filter, Stethoscope, HeartPulse } from 'lucide-react';

export default function DoctorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDept = searchParams.get('department') || 'ALL';
  const initialSearch = searchParams.get('search') || '';

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [loading, setLoading] = useState(true);

  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const depts = await departmentApi.getAll();
        setDepartments(depts);
      } catch (e) {
        console.error('Failed to load departments', e);
      }
    };
    fetchInitial();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedDept !== 'ALL') params.department = selectedDept;
        if (searchTerm.trim()) params.search = searchTerm.trim();

        const data = await doctorApi.getAll(params);
        setDoctors(data);
      } catch (err) {
        console.error('Failed to load doctors', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [selectedDept, searchTerm]);

  const handleDeptSelect = (code) => {
    setSelectedDept(code);
    const newParams = new URLSearchParams(searchParams);
    if (code === 'ALL') {
      newParams.delete('department');
    } else {
      newParams.set('department', code);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
          Clinical Specialists Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Find Your Physician</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Browse certified doctors across specialized medical fields. Schedule direct consultations
          with real-time slot reservation.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search physician by name, specialty, or condition..."
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition"
          />
        </div>

        {/* Department Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => handleDeptSelect('ALL')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition ${
              selectedDept === 'ALL'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            All Specialties
          </button>
          {departments.map((dept) => (
            <button
              key={dept.code}
              onClick={() => handleDeptSelect(dept.code)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition ${
                selectedDept === dept.code
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400 text-sm">
          Loading specialists directory...
        </div>
      ) : doctors.length === 0 ? (
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <Stethoscope className="w-10 h-10 mx-auto text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No doctors match your criteria</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search terms or clearing specialty filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <DoctorCard
              key={doc._id}
              doctor={doc}
              onBook={(d) => setSelectedDoctorForBooking(d)}
            />
          ))}
        </div>
      )}

      {/* Booking Modal */}
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

      {/* Slip Modal */}
      {confirmedAppointment && (
        <AppointmentSlipModal
          appointment={confirmedAppointment}
          onClose={() => setConfirmedAppointment(null)}
        />
      )}
    </div>
  );
}
