import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Flame, Clock, Dumbbell, Sparkles } from 'lucide-react';
import ClassCard from '../components/ClassCard';
import ClassBookingModal from '../components/ClassBookingModal';
import { classApi } from '../services/api';

const DAYS = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CATEGORIES = ['All', 'CrossFit', 'Yoga', 'HIIT', 'Spin', 'Boxing', 'Strength'];
const INTENSITIES = ['All', 'Extreme', 'High', 'Medium'];

export default function SchedulePage() {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [dayFilter, setDayFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [intensityFilter, setIntensityFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await classApi.getClasses();
      const list = Array.isArray(res?.data) ? res.data : (res?.classes || []);
      setClasses(list);
      setFilteredClasses(list);
    } catch (err) {
      console.warn('Fallback classes loaded');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Filter effect
  useEffect(() => {
    let result = [...classes];

    if (dayFilter !== 'All') {
      result = result.filter(c => c.scheduleDay === dayFilter);
    }
    if (categoryFilter !== 'All') {
      result = result.filter(c => c.category === categoryFilter);
    }
    if (intensityFilter !== 'All') {
      result = result.filter(c => c.intensity === intensityFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.title?.toLowerCase().includes(q) ||
        c.instructorName?.toLowerCase().includes(q) ||
        c.room?.toLowerCase().includes(q)
      );
    }

    setFilteredClasses(result);
  }, [dayFilter, categoryFilter, intensityFilter, search, classes]);

  const handleBookClick = (cls) => {
    setSelectedClass(cls);
    setIsModalOpen(true);
  };

  const handleBookingSuccess = (cls) => {
    setClasses(prev =>
      prev.map(c => c._id === cls._id ? { ...c, capacityBooked: (c.capacityBooked || 0) + 1 } : c)
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> Weekly Studio Timetable
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1 uppercase">
            Interactive Class Schedule
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
            Live capacity tracking with atomic slot reservation. Filter by training discipline, day of the week, or coach.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">Atomic Capacity Reservation Active</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        {/* Days Scrollable Bar */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Training Day:
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => setDayFilter(day)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  dayFilter === day
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Categories, Intensity & Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-800/80">
          {/* Categories dropdown */}
          <div className="md:col-span-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Discipline</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-red-500"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Disciplines' : cat}</option>
              ))}
            </select>
          </div>

          {/* Intensity dropdown */}
          <div className="md:col-span-3">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Intensity Level</label>
            <select
              value={intensityFilter}
              onChange={(e) => setIntensityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-red-500"
            >
              {INTENSITIES.map(lvl => (
                <option key={lvl} value={lvl}>{lvl === 'All' ? 'All Intensities' : lvl}</option>
              ))}
            </select>
          </div>

          {/* Search bar */}
          <div className="md:col-span-5">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Search Sessions</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search class title, coach, or room..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Classes */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">Loading studio schedule...</div>
      ) : filteredClasses.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
          <Dumbbell className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No classes match your filter selection</h3>
          <p className="text-xs text-slate-400">Try clearing one of the filters or choosing another training day.</p>
          <button
            onClick={() => { setDayFilter('All'); setCategoryFilter('All'); setIntensityFilter('All'); setSearch(''); }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-red-400 hover:bg-slate-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map(fitnessClass => (
            <ClassCard
              key={fitnessClass._id || fitnessClass.id}
              fitnessClass={fitnessClass}
              onBook={handleBookClick}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedClass && (
        <ClassBookingModal
          fitnessClass={selectedClass}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedClass(null);
          }}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
