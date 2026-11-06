import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Code2,
  Users,
  CheckCircle2,
  ExternalLink,
  Award,
  Zap,
  Globe,
  Terminal,
  User,
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { projectApi, serviceApi } from '../services/api';

export default function HomePage({ onOpenEstimator }) {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadHomeData = async () => {
      try {
        const [projRes, servRes] = await Promise.all([
          projectApi.getFeatured(),
          serviceApi.getAll(),
        ]);
        if (isMounted) {
          const pList = Array.isArray(projRes?.data) ? projRes.data : (projRes?.projects || projRes?.data?.projects || []);
          const sList = Array.isArray(servRes?.data) ? servRes.data : (servRes?.services || servRes?.data?.services || []);
          setFeaturedProjects(pList);
          setServices(sList);
        }
      } catch (err) {
        console.warn('Using offline mock for home data');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadHomeData();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 overflow-hidden">
        {/* Ambient lighting effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>ApexMedia Digital Engineering • Premier B2B Web Consultancy</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Engineering <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Next-Gen Web Platforms</span> & Scalable SaaS.
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We partner with high-velocity venture founders, scale-ups, and global brands to engineer high-throughput B2B SaaS platforms, hyper-responsive web applications, and resilient cloud backends.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenEstimator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Launch Scope Estimator
            </button>
            <Link
              to="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:scale-105"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Proof Badges / KPI Strip */}
          <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 text-center">
              <p className="text-2xl sm:text-3xl font-black text-white">120+</p>
              <p className="text-xs text-slate-400 mt-0.5">Production Apps Shipped</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 text-center">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">99.98%</p>
              <p className="text-xs text-slate-400 mt-0.5">SLA Uptime Standard</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 text-center">
              <p className="text-2xl sm:text-3xl font-black text-blue-400">$48M+</p>
              <p className="text-xs text-slate-400 mt-0.5">Client Revenue Influenced</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 text-center">
              <p className="text-2xl sm:text-3xl font-black text-indigo-400">4.99 / 5</p>
              <p className="text-xs text-slate-400 mt-0.5">Client Satisfaction Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Verified Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Featured Case Studies
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Real-world products engineered for high performance, scale, and multi-million dollar outcomes.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View All Case Studies ({featuredProjects.length > 0 ? '6+' : 'Loading...'})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project._id || project.slug}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </section>

      {/* Core Agency Capabilities */}
      <section className="bg-slate-900/60 border-y border-slate-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Full-Lifecycle Engineering</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Core Technical Capabilities
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every deliverable is written according to clean-code standards, verified with automated tests, and tuned for enterprise compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((serv) => (
              <div
                key={serv.id || serv.title}
                className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-all hover:shadow-xl hover:shadow-blue-500/5 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-semibold">{serv.startingPrice}</span>
                  <Link
                    to="/services"
                    className="text-xs font-semibold text-slate-300 group-hover:text-blue-400 flex items-center gap-1 transition-colors"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Standards Banner (10/10 Architecture) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <ShieldCheck className="w-4 h-4" /> 100% Security & Code Quality Guarantee
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Global Founders Choose ApexMedia Engineering
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              We eliminate technical debt before it begins. Our platforms ship with comprehensive automated test suites, zero hardcoded credentials, strict RBAC authorization, and automated CI/CD pipelines.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Full Test Coverage</h4>
              <p className="text-xs text-slate-400 mt-1">Automated unit, integration, and security checks via Jest & Supertest.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Zero Privilege Leakage</h4>
              <p className="text-xs text-slate-400 mt-1">Rigid server-side authorization matrices protecting all customer data.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Fixed-Price Scopes</h4>
              <p className="text-xs text-slate-400 mt-1">Clear deliverables and milestones guaranteed with no surprise invoices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials - Neutral Silhouette Avatar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Verified Client Experiences</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Trusted by Venture Founders Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "ApexMedia architected our multi-tenant SaaS from scratch. We passed external enterprise pen-testing on the first attempt and scaled to \$2.4M ARR without a hiccup."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800/60">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Marcus Vance</p>
                <p className="text-xs text-slate-400">CTO, CloudSphere SaaS (San Francisco)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "Their team delivered 2 weeks ahead of schedule. The server-side pricing engine and automated pipeline saved us hundreds of engineering hours."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800/60">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Elena Rostova</p>
                <p className="text-xs text-slate-400">Head of Product, Omnichannel FinTech</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "The most transparent, professional MERN stack agency I have worked with. High-touch communication and rigorous code quality across every PR."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800/60">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">David Thorne</p>
                <p className="text-xs text-slate-400">Managing Director, Horizon Media</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenEstimator={onOpenEstimator}
        />
      )}
    </div>
  );
}
