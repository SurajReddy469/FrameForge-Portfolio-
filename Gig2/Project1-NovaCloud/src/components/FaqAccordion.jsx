import React, { useState } from 'react';
import { faqList } from '../data/saasData';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export default function FaqAccordion({ isDarkMode, onOpenDemo }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqList.filter((f) =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Frequently Asked Questions
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Everything you need to know about NovaCloud architecture, migration, and compliance.
          </p>

          {/* Search Filter */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter questions (e.g. cold-start, SOC2, pricing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500' 
                  : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? (isDarkMode ? 'bg-slate-900/90 border-violet-500/40 shadow-lg' : 'bg-white border-violet-300 shadow-md')
                      : (isDarkMode ? 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200')
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-violet-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed border-t border-slate-800/40 text-slate-300">
                      <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-sm text-slate-500">
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center text-sm text-slate-400">
          <span>Still have questions about your specific stack? </span>
          <button
            onClick={() => onOpenDemo('enterprise')}
            className="text-violet-400 hover:text-violet-300 font-semibold underline underline-offset-4"
          >
            Schedule a technical consultation with an architect &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}
