import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, Plus, Award } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { projectApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const CATEGORIES = [
  'All',
  'B2B SaaS',
  'Full-Stack Web',
  'Mobile App',
  'E-Commerce',
  'Cloud & DevOps',
];

export default function ProjectsPage({ onOpenEstimator }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // New Project Modal for Admin
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    clientName: '',
    category: 'B2B SaaS',
    shortDescription: '',
    description: '',
    challenge: '',
    solution: '',
    technologies: 'React, Node.js, Express, MongoDB, Tailwind CSS',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    featured: true,
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await projectApi.getAll();
      const list = Array.isArray(res?.data) ? res.data : (res?.projects || res?.data?.projects || []);
      setProjects(list);
      setFilteredProjects(list);
    } catch (err) {
      console.warn('Failed to fetch projects, using fallback data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Filter effect
  useEffect(() => {
    let result = [...projects];

    if (category !== 'All') {
      result = result.filter(
        (p) => (p.category || '').toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(query) ||
          p.clientName?.toLowerCase().includes(query) ||
          p.shortDescription?.toLowerCase().includes(query) ||
          (p.technologies || []).some((t) => t.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(result);
  }, [category, search, projects]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProject,
        technologies: newProject.technologies.split(',').map((t) => t.trim()),
        metrics: [
          { label: 'Latency Reduction', value: '-65%' },
          { label: 'Throughput', value: '10k req/s' },
        ],
      };
      await projectApi.create(payload);
      showToast('Case study successfully published to portfolio!', 'success');
      setShowCreateModal(false);
      loadProjects();
    } catch (err) {
      showToast('Failed to create case study. Admin rights required.', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
            <Award className="w-4 h-4" /> Production Showcase
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
            Case Studies & Architecture
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
            Explore illustrative project concepts and architecture breakdowns. Client names and business outcomes shown here are sample demo content, not verified client results.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user?.role === 'admin' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Case Study
            </button>
          )}
          <button
            onClick={onOpenEstimator}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Scope My Project
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by tech, client, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">Loading sample case studies...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <p className="text-base font-semibold text-white">No matching case studies found.</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your category filter or search keywords.</p>
          <button
            onClick={() => { setCategory('All'); setSearch(''); }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-xs text-blue-400 hover:bg-slate-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id || project.slug}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenEstimator={onOpenEstimator}
        />
      )}

      {/* Admin Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Publish New Case Study (Admin)</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={newProject.clientName}
                    onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newProject.shortDescription}
                  onChange={(e) => setNewProject({ ...newProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white"
                >
                  Publish Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
