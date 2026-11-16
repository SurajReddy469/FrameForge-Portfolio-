import React, { useState } from 'react';
import { Database, Search, Plus, Check, FileText, Sparkles, Tag, Layers, Trash2 } from 'lucide-react';
import { KNOWLEDGE_BASES } from '../data/knowledgeBases';
import { sounds } from '../utils/audioSynth';

export default function RagInspector({ activeIndustry, customDocs, setCustomDocs }) {
  const kb = KNOWLEDGE_BASES[activeIndustry] || KNOWLEDGE_BASES.saas;
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Custom Policy');
  const [newCitation, setNewCitation] = useState('Client Doc v1.0');
  const [newKeywords, setNewKeywords] = useState('');
  const [newContent, setNewContent] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const allDocs = [...kb.documents, ...customDocs];

  const filteredDocs = allDocs.filter(doc => {
    const q = searchTerm.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.content.toLowerCase().includes(q) ||
      (doc.keywords && doc.keywords.some(k => k.toLowerCase().includes(q)))
    );
  });

  const handleAddCustomDoc = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const keywordsArray = newKeywords
      .split(',')
      .map(k => k.trim())
      .filter(Boolean);

    const doc = {
      id: `custom-${Date.now()}`,
      category: newCategory.trim() || 'Custom Knowledge',
      title: newTitle.trim(),
      citation: newCitation.trim() || 'Custom Uploaded Source',
      keywords: keywordsArray.length > 0 ? keywordsArray : [newTitle.toLowerCase()],
      content: newContent.trim()
    };

    setCustomDocs(prev => [doc, ...prev]);
    setIsAdding(false);
    setNewTitle('');
    setNewKeywords('');
    setNewContent('');
    setJustAdded(true);
    sounds.playChime();
    setTimeout(() => setJustAdded(false), 3000);
  };

  const removeCustomDoc = (id) => {
    setCustomDocs(prev => prev.filter(d => d.id !== id));
    sounds.playChime();
  };

  return (
    <section id="knowledge-base" className="py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
              <Database className="w-3.5 h-3.5" />
              <span>Vector Grounding & Document Chunks</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Interactive RAG Knowledge Base Inspector
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Inspect the exact verified document chunks the AI uses to formulate responses. Zero hallucinations—answers are strictly anchored to these chunks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{isAdding ? "Cancel Adding" : "Inject Custom Knowledge Chunk"}</span>
            </button>
          </div>
        </div>

        {/* Success toast if added */}
        {justAdded && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span><strong>Chunk Indexed!</strong> Your custom document has been embedded into the vector corpus. Ask the chat widget about it right now!</span>
          </div>
        )}

        {/* Modal / Panel for Adding Custom Chunk */}
        {isAdding && (
          <form
            onSubmit={handleAddCustomDoc}
            className="mb-8 p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-xl space-y-4 animate-in slide-in-from-top-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Add Custom Company Documentation / Policy Chunk</span>
              </div>
              <span className="text-[11px] text-slate-400">Live Client Training Simulation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. VIP Concierge & Free Returns"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Citation / Source</label>
                <input
                  type="text"
                  value={newCitation}
                  onChange={(e) => setNewCitation(e.target.value)}
                  placeholder="e.g. VIP Terms §1.2"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Trigger Keywords (comma separated)</label>
                <input
                  type="text"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  placeholder="e.g. vip, concierge, free returns, priority"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Knowledge Content (What the bot must answer) *</label>
              <textarea
                rows={3}
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="e.g. VIP members receive free white-glove delivery, dedicated 24/7 personal WhatsApp support, and 60-day instant returns..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30"
              >
                Embed Chunk into RAG
              </button>
            </div>
          </form>
        )}

        {/* Search & Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter indexed chunks by keyword..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Active Corpus: <strong className="text-white">{kb.name}</strong> ({filteredDocs.length} Chunks Indexed)</span>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => {
            const isCustom = doc.id.startsWith('custom-');
            return (
              <div
                key={doc.id}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-all hover:border-indigo-500/50 ${
                  isCustom
                    ? 'bg-indigo-950/20 border-indigo-500/40'
                    : 'bg-slate-900/60 border-slate-800/80'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700/60">
                      {doc.category}
                    </span>
                    {isCustom && (
                      <button
                        onClick={() => removeCustomDoc(doc.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove custom chunk"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-white mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{doc.title}</span>
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-4 font-mono">
                    {doc.content}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                  <span className="text-cyan-400 font-medium">{doc.citation}</span>
                  <div className="flex flex-wrap gap-1">
                    {(doc.keywords || []).slice(0, 3).map((kw, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
