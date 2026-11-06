import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, TrendingUp, Award, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, Calendar, Code2, Users } from 'lucide-react';
import { projectApi } from '../services/api';

export default function ProjectDetailPage({ onOpenEstimator }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await projectApi.getAll();
        const list = Array.isArray(res?.data) ? res.data : (res?.projects || res?.data?.projects || []);
        const found = list.find((p) => p._id === id || p.id === id || p.slug === id) || list[0];
        setProject(found);
      } catch (err) {
        console.warn('Fallback loading for project detail', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-slate-800 rounded" />
        <div className="h-12 w-3/4 bg-slate-800 rounded" />
        <div className="h-96 bg-slate-800 rounded-3xl" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Case Study Not Found</h2>
        <p className="text-sm text-slate-400">The requested case study could not be loaded.</p>
        <Link to="/projects" className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs">
          Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all case studies</span>
        </Link>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
          Case Study Reference #{project.id || project._id}
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            Client: {project.clientName}
          </span>
          {project.year && (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-400">
              Shipped {project.year}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          {project.shortDescription || project.tagline}
        </p>
      </div>

      {/* Main Cover Visual */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
        <img
          src={project.coverImage || project.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
          alt={project.title}
          className="w-full h-80 sm:h-[480px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
      </div>

      {/* Illustrative demo metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Illustrative Demo Metrics</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 shadow-lg"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-5 h-5 shrink-0" />
                  <span>{m.value || m.label}</span>
                </div>
                <p className="text-xs text-slate-300 font-semibold">{m.description || m.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <span>The Challenge</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.challenge || 'Client faced severe architectural bottlenecks, high infrastructure latencies, and legacy technical debt that prevented executive roadmap execution.'}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span>The Engineered Solution</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.solution || 'Engineered an ultra-resilient, event-driven web platform with automated CI/CD validation, high-throughput caching layers, and automated security best practices.'}
          </p>
        </div>
      </div>

      {/* Tech Stack Matrix */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Code2 className="w-4 h-4 text-blue-400" />
          <span>Core Technologies & Architecture</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {(project.technologies || project.techStack || []).map((t, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Client Testimonial */}
      {project.clientTestimonial && (
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/20 space-y-4">
          <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
            "{project.clientTestimonial.quote}"
          </p>
          <div className="pt-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              {project.clientTestimonial.author?.[0] || 'C'}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{project.clientTestimonial.author}</p>
              <p className="text-xs text-slate-400">{project.clientTestimonial.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Footer */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Engineer Similar Results?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Get an instant fixed-price budget breakdown in 60 seconds, or schedule an executive architectural discovery session.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenEstimator}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition cursor-pointer"
          >
            Launch Scope Estimator (60 Sec)
          </button>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
          >
            Book Strategy Call
          </Link>
        </div>
      </div>
    </div>
  );
}
