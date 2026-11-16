import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Palette, Layout, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audioSynth';

export default function EmbedGenerator() {
  const [activeTab, setActiveTab] = useState('script'); // 'script', 'react', 'curl'
  const [accentColor, setAccentColor] = useState('indigo');
  const [position, setPosition] = useState('bottom-right');
  const [copied, setCopied] = useState(false);

  const colorCodes = {
    indigo: '#6366f1',
    emerald: '#10b981',
    sky: '#0284c7',
    purple: '#a855f7'
  };

  const getCodeSnippet = () => {
    const hex = colorCodes[accentColor];
    if (activeTab === 'script') {
      return `<!-- SupportForge 24/7 AI Support Widget -->
<script 
  src="https://cdn.supportforge.io/v2/widget.js"
  data-agent-id="ag_live_94827103"
  data-primary-color="${hex}"
  data-position="${position}"
  data-sound="true"
  async>
</script>`;
    }

    if (activeTab === 'react') {
      return `import { SupportForgeWidget } from '@supportforge/react-agent';

export default function App() {
  return (
    <>
      {/* Your app components */}
      <SupportForgeWidget
        agentId="ag_live_94827103"
        theme={{
          primaryColor: "${hex}",
          position: "${position}",
          enableSound: true
        }}
        onEscalate={(ticket) => console.log('Escalation created:', ticket)}
      />
    </>
  );
}`;
    }

    return `curl -X POST https://api.supportforge.io/v1/chat \\
  -H "Authorization: Bearer sf_live_token_4892" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "ag_live_94827103",
    "query": "What is your refund policy?",
    "stream": true
  }'`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    sounds.playChime();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="embed" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Developer Integration</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            1-Line Client Website Integration
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Easily drop this AI Customer Support widget into any WordPress site, Shopify store, Webflow project, or custom Next.js application.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          {/* Customizer controls */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('script')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'script' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                HTML / Script Tag
              </button>
              <button
                onClick={() => setActiveTab('react')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'react' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                React / Next.js
              </button>
              <button
                onClick={() => setActiveTab('curl')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'curl' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                REST API / cURL
              </button>
            </div>

            {/* Customizer options */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">Accent:</span>
                <div className="flex gap-1.5">
                  {Object.entries(colorCodes).map(([key, hex]) => (
                    <button
                      key={key}
                      onClick={() => setAccentColor(key)}
                      style={{ backgroundColor: hex }}
                      className={`w-4 h-4 rounded-full transition-all ${
                        accentColor === key ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-70 hover:opacity-100'
                      }`}
                      title={key}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Layout className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">Position:</span>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-300 rounded px-2 py-1 text-xs focus:outline-none"
                >
                  <option value="bottom-right">Bottom-Right</option>
                  <option value="bottom-left">Bottom-Left</option>
                </select>
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="relative bg-slate-950 p-6 font-mono text-xs text-slate-200 overflow-x-auto">
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-sans transition-all border border-slate-700 shadow"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Code"}</span>
            </button>

            <pre className="text-indigo-300 leading-relaxed">
              <code>{getCodeSnippet()}</code>
            </pre>
          </div>

          <div className="p-4 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Compatible with Webflow, Shopify, WordPress, Next.js, and custom HTML
            </span>
            <span className="font-mono text-[11px] text-slate-400">Bundle size: 12.4 kB gzipped</span>
          </div>
        </div>
      </div>
    </section>
  );
}
