import React from 'react';
import { X, ExternalLink, TrendingUp, CheckCircle2, User, Sparkles, Layers, Award } from 'lucide-react';

export default function ProjectModal({ project, onClose, onOpenEstimator }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/70 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="relative h-72 sm:h-96 w-full bg-slate-950 overflow-hidden">
          <img
            src={project.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/90 text-white shadow-lg shadow-blue-600/30">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/90 text-slate-300 border border-slate-700">
                Client: {project.clientName}
              </span>
              {project.completedYear && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/90 text-slate-400">
                  Shipped {project.completedYear}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[calc(85vh-24rem)] overflow-y-auto">
          {/* Key Impact Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" /> Verified Business Impact
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => {
                  const statVal = metric.value || metric.label;
                  const statLabel = metric.description || (metric.value ? metric.label : 'Verified Outcome');
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                      <p className="text-xs text-slate-400">{statLabel}</p>
                      <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-5 h-5 shrink-0" /> {statVal}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-400" /> The Challenge
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.challenge || 'Client faced severe architectural bottlenecks, legacy codebase latency, and suboptimal conversion funnels preventing international scaling.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Engineering Solution
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution || 'Re-architected the stack using high-throughput Node.js microservices, resilient MongoDB aggregations, and high-conversion responsive UI.'}
              </p>
            </div>
          </div>

          {/* Full Narrative */}
          {project.description && (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                Project Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-400" /> Technology Architecture
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || project.techStack || []).map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-950/40 text-blue-300 border border-blue-800/40"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Client Testimonial - Uses clean default silhouette avatar */}
          {(project.testimonial || project.clientTestimonial) && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-blue-950/30 border border-blue-500/20">
              <p className="text-sm sm:text-base italic text-slate-200 leading-relaxed">
                "{(project.testimonial || project.clientTestimonial).quote}"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{(project.testimonial || project.clientTestimonial).author}</p>
                  <p className="text-xs text-slate-400">{(project.testimonial || project.clientTestimonial).role}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Full production IP transferred under commercial enterprise licensing</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                if (onOpenEstimator) onOpenEstimator();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4" /> Estimate Similar Scope
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
