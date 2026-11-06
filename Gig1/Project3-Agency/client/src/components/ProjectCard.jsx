import React from 'react';
import { ArrowUpRight, TrendingUp, Sparkles, ExternalLink } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ project, onSelect }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      {/* Top Media / Thumbnail */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-950">
        <img
          src={project.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Category Pill */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-blue-400 border border-blue-500/30 backdrop-blur-md">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Client Name */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-medium">
          <span>Client: <strong className="text-white">{project.clientName}</strong></span>
          <span className="text-slate-400">{project.completedYear || '2025'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {project.shortDescription || project.description}
          </p>
        </div>

        {/* Impact Metrics Banner */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            {project.metrics.slice(0, 2).map((m, idx) => {
              const statVal = m.value || m.label;
              const statLabel = m.description || (m.value ? m.label : 'Impact');
              return (
                <div key={idx} className="flex flex-col">
                  <span className="text-xs text-slate-400 truncate">{statLabel}</span>
                  <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 shrink-0" /> {statVal}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60">
          {(project.technologies || project.techStack || []).slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/70 text-slate-300 border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
          {(project.technologies || project.techStack || []).length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-400">
              +{(project.technologies || project.techStack).length - 4} more
            </span>
          )}
        </div>

        {/* Explicit Clickable Action */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onSelect) onSelect(project);
            else navigate(`/projects/${project.id || project._id}`);
          }}
          className="w-full mt-4 py-2.5 px-4 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span>Explore Case Study & Spec Sheet</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
