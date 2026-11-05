import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { departmentApi } from '../services/api';
import {
  HeartPulse,
  Bone,
  Baby,
  Brain,
  Sparkles,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function DepartmentsPage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const data = await departmentApi.getAll();
        setDepartments(data);
      } catch (err) {
        console.error('Failed to load departments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepts();
  }, []);

  const departmentIcons = {
    CARD: HeartPulse,
    ORTH: Bone,
    PEDI: Baby,
    NEUR: Brain,
    DERM: Sparkles,
    GENM: Stethoscope,
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
          Center of Clinical Excellence
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Specialized Medical Departments
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          From preventive wellness to complex interventional cardiology and neuro-sciences, our
          departments are equipped with modern diagnostics and compassionate clinical teams.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 text-sm">
          Loading medical departments...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => {
            const Icon = departmentIcons[dept.code] || Stethoscope;
            return (
              <div
                key={dept.code}
                className="bg-slate-800/70 border border-slate-700/80 hover:border-teal-500/50 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/20 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-cyan-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-center group-hover:scale-105 transition">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">
                      {dept.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {dept.description}
                  </p>

                  <div className="space-y-2 text-xs text-slate-400 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Department Lead:</span>
                      <span className="text-slate-200 font-semibold">{dept.headOfDepartment}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Location:</span>
                      <span className="text-teal-300 font-medium">{dept.roomNumber}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/doctors?department=${dept.code}`)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition"
                >
                  <span>View Specialists</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
