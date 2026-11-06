import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Dumbbell,
  Calendar,
  Flame,
  Award,
  Users,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  User,
  HeartPulse
} from 'lucide-react';
import ClassCard from '../components/ClassCard';
import ClassBookingModal from '../components/ClassBookingModal';
import { classApi, trainerApi } from '../services/api';

export default function HomePage() {
  const [featuredClasses, setFeaturedClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadHomeData = async () => {
      try {
        const [clsRes, trnRes] = await Promise.all([
          classApi.getClasses(),
          trainerApi.getTrainers()
        ]);
        if (isMounted) {
          const cList = Array.isArray(clsRes?.data) ? clsRes.data : (clsRes?.classes || []);
          const tList = Array.isArray(trnRes?.data) ? trnRes.data : (trnRes?.trainers || []);
          setFeaturedClasses(cList);
          setTrainers(tList);
        }
      } catch (err) {
        console.warn('Fallback data loaded for home page');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadHomeData();
    return () => { isMounted = false; };
  }, []);

  const handleBookClick = (cls) => {
    setSelectedClass(cls);
    setIsModalOpen(true);
  };

  const handleBookingSuccess = (cls) => {
    setFeaturedClasses((prev) =>
      prev.map((c) =>
        c._id === cls._id ? { ...c, capacityBooked: (c.capacityBooked || 0) + 1 } : c
      )
    );
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 overflow-hidden">
        {/* Ambient energy background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-red-600/25 via-rose-600/15 to-amber-600/15 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 mb-6 backdrop-blur-md uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>High-Performance Functional Fitness & Conditioning</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-5xl mx-auto uppercase">
            Forged For Power. <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              Engineered For Results.
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience Olympic-standard equipment, heart-rate synchronized HIIT, and science-backed class programming designed to crush plateaus and elevate athletic conditioning.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/schedule"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Studio Class</span>
            </Link>
            <Link
              to="/memberships"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105"
            >
              <span>Explore Memberships</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Proof of Performance Strip */}
          <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl sm:text-3xl font-black text-white">60+</p>
              <p className="text-xs text-slate-400 mt-1">Weekly Studio Classes</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl sm:text-3xl font-black text-red-400">24 / 7</p>
              <p className="text-xs text-slate-400 mt-1">Keycard Turf Access</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl sm:text-3xl font-black text-amber-400">4.97 ★</p>
              <p className="text-xs text-slate-400 mt-1">Member Rating Average</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">100%</p>
              <p className="text-xs text-slate-400 mt-1">Certified CSCS / NASM Coaches</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scheduled Classes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> Real-Time Studio Capacity
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Today’s High-Demand Sessions
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Atomic capacity management ensures classes are never overcrowded. Reserve early to lock your turf spot.
            </p>
          </div>
          <Link
            to="/schedule"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-red-400 hover:text-red-300 transition-colors"
          >
            <span>View Full Weekly Timetable</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClasses.slice(0, 3).map((fitnessClass) => (
            <ClassCard
              key={fitnessClass._id || fitnessClass.id}
              fitnessClass={fitnessClass}
              onBook={handleBookClick}
            />
          ))}
        </div>
      </section>

      {/* Disciplines & Studio Turf */}
      <section className="bg-slate-900/50 border-y border-slate-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">Multidisciplinary Training</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Purpose-Built Training Zones
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every zone is custom-designed for maximum biomechanical efficiency, noise dampening, and athletic output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 overflow-hidden group hover:border-red-500/40 transition">
              <div className="h-44 w-full overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" alt="Eleiko Barbell Turf" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600/90 text-white flex items-center justify-center shadow-md">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Eleiko Barbell Turf</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Olympic lifting platforms, calibrated steel plates, Rogue power racks, and shock-absorbent drop zones engineered for heavy deadlifts and clean-and-jerks.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 overflow-hidden group hover:border-amber-500/40 transition">
              <div className="h-44 w-full overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80" alt="HIIT & Combat Annex" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-600/90 text-white flex items-center justify-center shadow-md">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">HIIT & Combat Annex</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Assault air bikes, Concept2 rowers, ski ergs, and heavy punch bags for brutal heart-rate conditioning, explosive speed, and combat endurance.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 overflow-hidden group hover:border-emerald-500/40 transition">
              <div className="h-44 w-full overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80" alt="Mobility & Recovery Lounge" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/90 text-white flex items-center justify-center shadow-md">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Mobility & Recovery Lounge</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Infrared saunas, cold plunge tubs, Normatec compression boots, and heated bamboo flooring for deep fascial release and accelerated nervous system recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Head Coach Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">Elite Pedigree</span>
          <h2 className="text-3xl font-black text-white tracking-tight mt-1">
            Meet the FitPulse Coaching Staff
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Every coach possesses collegiate or international athletic backgrounds with verified collegiate certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.slice(0, 4).map((trainer) => (
            <div
              key={trainer._id || trainer.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-red-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-red-400 mb-4">
                  <User className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white">{trainer.name}</h3>
                <p className="text-xs font-semibold text-red-400 mt-0.5">{trainer.specialty}</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {trainer.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold">★ {trainer.rating}</span>
                <span className="text-slate-500 font-medium">{trainer.experienceYears} Years Exp</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Athlete Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">Community Verdict</span>
          <h2 className="text-3xl font-black text-white tracking-tight mt-1">
            Athletes Dominating Daily
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "The real-time class booking and QR access pass makes my 6:30 AM workouts completely frictionless. I've shaved 4 minutes off my 5K and added 30kg to my deadlift."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-red-400 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">David Zhang</p>
                <p className="text-xs text-slate-400">Pro Tier Member • Tech Founder</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "Coach Sarah's barbell cycling technique clinic cured my lower back impingement. The coaches here genuinely care about long-term athletic durability."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-red-400 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Claire Henderson</p>
                <p className="text-xs text-slate-400">Elite VIP Member • Marathoner</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "Hands down the cleanest, best-managed conditioning facility in the city. The studio capacity enforcement guarantees you never fight for weights or space."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-red-400 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Marcus Vance</p>
                <p className="text-xs text-slate-400">Pro Tier Member • Competitive Athlete</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
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
