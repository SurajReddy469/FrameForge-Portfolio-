import React, { useState, useEffect, useRef } from 'react';
import {
  Send, Bot, User, Sparkles, X, Minimize2, Maximize2, RotateCcw,
  Volume2, VolumeX, ShieldCheck, CheckCircle2, AlertCircle, ArrowUpRight,
  Headphones, ChevronDown, ThumbsUp, ThumbsDown, Copy, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KNOWLEDGE_BASES } from '../data/knowledgeBases';
import { performRAGQuery } from '../utils/ragEngine';
import { sounds } from '../utils/audioSynth';

export default function ChatWidget({
  mode = 'floating', // 'floating' or 'embedded'
  isOpen = true,
  onClose,
  activeIndustry = 'saas',
  onIndustryChange,
  customDocs = [],
  soundEnabled = true
}) {
  const kb = KNOWLEDGE_BASES[activeIndustry] || KNOWLEDGE_BASES.saas;

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: kb.defaultGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      metadata: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [lastRAGMeta, setLastRAGMeta] = useState(null);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Ticket Form state
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    priority: 'Medium',
    notes: ''
  });
  const [ticketSubmitted, setTicketSubmitted] = useState(null);

  const messagesEndRef = useRef(null);

  // When industry changes, reset greeting
  useEffect(() => {
    setMessages([
      {
        id: `welcome-${activeIndustry}`,
        role: 'assistant',
        content: kb.defaultGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: null
      }
    ]);
  }, [activeIndustry]);

  // Scroll to bottom on new message or during typewriter streaming
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamedText, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    sounds.playSend();

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setStreamedText('');

    // Query RAG engine
    setTimeout(() => {
      const ragResult = performRAGQuery(query, kb, customDocs);
      setLastRAGMeta(ragResult);

      if (ragResult.intent === 'HUMAN_ESCALATION') {
        setShowEscalationModal(true);
        setTicketData(prev => ({ ...prev, notes: query }));
      }

      // Stream response tokens
      const fullResponse = ragResult.response;
      let currentIndex = 0;
      const streamInterval = setInterval(() => {
        currentIndex += 3;
        if (currentIndex >= fullResponse.length) {
          clearInterval(streamInterval);
          setStreamedText('');
          setIsTyping(false);

          sounds.playReceive();

          const assistantMessage = {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: fullResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            metadata: ragResult
          };
          setMessages(prev => [...prev, assistantMessage]);
        } else {
          setStreamedText(fullResponse.slice(0, currentIndex));
        }
      }, 14);
    }, 280);
  };

  const handleFeedback = (msgId, isHelpful) => {
    setFeedbackGiven(prev => ({ ...prev, [msgId]: isHelpful }));
    sounds.playChime();
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketData.name || !ticketData.email) return;

    const ticketId = `SF-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketSubmitted(ticketId);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {}

    sounds.playChime();

    // Push resolution message to chat
    setTimeout(() => {
      setShowEscalationModal(false);
      setTicketSubmitted(null);
      setTicketData({ name: '', email: '', priority: 'Medium', notes: '' });

      const escalationConfirmMsg = {
        id: `ticket-confirm-${Date.now()}`,
        role: 'assistant',
        content: `✅ **Priority Support Ticket #${ticketId} Dispatched!**\n\nOur human specialist team has received your inquiry. A confirmation receipt has been sent to \`${ticketData.email}\`.\n- **Priority:** ${ticketData.priority}\n- **Estimated Response Time:** Under 15 minutes.\n\nIs there anything else I can assist with in the meantime?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          intent: 'TICKET_CREATED',
          confidence: 1.0,
          latencyMs: 120
        }
      };
      setMessages(prev => [...prev, escalationConfirmMsg]);
    }, 1200);
  };

  const resetChat = () => {
    setMessages([
      {
        id: `welcome-${activeIndustry}-${Date.now()}`,
        role: 'assistant',
        content: kb.defaultGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: null
      }
    ]);
    setLastRAGMeta(null);
    sounds.playChime();
  };

  // Simple Markdown Formatter
  const renderFormattedContent = (content) => {
    return content.split('\n').map((line, idx) => {
      // Bold handling
      let formattedLine = line;

      // Handle Code block
      if (line.startsWith('```')) {
        return null;
      }

      // Handle Bullet lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletText = line.trim().slice(2);
        return (
          <li key={idx} className="ml-4 list-disc text-slate-200">
            {formatInlineCodeAndBold(bulletText)}
          </li>
        );
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <li key={idx} className="ml-4 list-decimal text-slate-200">
            {formatInlineCodeAndBold(line.trim().replace(/^\d+\.\s/, ''))}
          </li>
        );
      }

      // Handle Blockquotes
      if (line.trim().startsWith('>')) {
        return (
          <blockquote key={idx} className="border-l-2 border-indigo-500 pl-3 my-1.5 text-slate-300 italic text-xs">
            {line.trim().slice(1)}
          </blockquote>
        );
      }

      return (
        <p key={idx} className={`${line === '' ? 'h-2' : 'my-1'}`}>
          {formatInlineCodeAndBold(formattedLine)}
        </p>
      );
    });
  };

  const formatInlineCodeAndBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[11px] border border-slate-700/60">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  if (mode === 'floating' && !isOpen) {
    return null;
  }

  const containerClasses = mode === 'floating'
    ? 'fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh] flex flex-col rounded-2xl bg-slate-950/95 border border-indigo-500/30 shadow-2xl shadow-indigo-950/80 backdrop-blur-xl overflow-hidden'
    : 'w-full h-[620px] flex flex-col rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden';

  return (
    <div className={containerClasses}>
      {/* Widget Header */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px] shadow-sm">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-base">
                {kb.avatar}
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">{kb.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Grounding Active
              </span>
              <span className="text-[10px] text-slate-400">• {kb.version}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          {/* Industry dropdown */}
          <div className="relative group">
            <select
              value={activeIndustry}
              onChange={(e) => onIndustryChange(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-300 text-[11px] rounded-lg px-2 py-1 pr-6 cursor-pointer focus:outline-none focus:border-indigo-500 appearance-none"
            >
              <option value="saas">SaaS (NovaCloud)</option>
              <option value="ecommerce">E-Commerce</option>
              <option value="realestate">Real Estate</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
          </div>

          {/* Reset button */}
          <button
            onClick={resetChat}
            title="Reset conversation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Close button for floating widget */}
          {mode === 'floating' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* RAG Grounding Indicator Strip */}
      <div className="px-4 py-1.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>RAG Zero-Hallucination Corpus</span>
        </div>
        <button
          onClick={() => setShowEscalationModal(true)}
          className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
        >
          <Headphones className="w-3 h-3" />
          <span>Talk to Human</span>
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 overflow-y-auto chat-scroll space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[85%]">
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-xs flex-shrink-0 mb-1">
                  {kb.avatar}
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800/80 rounded-bl-none'
                }`}
              >
                {renderFormattedContent(msg.content)}

                {/* Grounding Source Badge */}
                {msg.metadata?.matchedDoc && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <ShieldCheck className="w-3 h-3" />
                      {msg.metadata.matchedDoc.citation}
                    </span>
                    <span className="text-slate-400">
                      {(msg.metadata.confidence * 100).toFixed(0)}% Match
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Message Meta & Feedback */}
            <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400">
              <span>{msg.timestamp}</span>
              {msg.role === 'assistant' && msg.id !== 'welcome' && (
                <div className="flex items-center gap-1.5 ml-1">
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="hover:text-slate-200 transition-colors"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => handleFeedback(msg.id, true)}
                    className={`transition-colors ${feedbackGiven[msg.id] === true ? 'text-emerald-400' : 'hover:text-slate-200'}`}
                    title="Helpful"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleFeedback(msg.id, false)}
                    className={`transition-colors ${feedbackGiven[msg.id] === false ? 'text-rose-400' : 'hover:text-slate-200'}`}
                    title="Not helpful"
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Live Typewriter Streaming Bubble */}
        {isTyping && (
          <div className="flex items-end gap-2 max-w-[85%]">
            <div className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-xs flex-shrink-0 mb-1">
              {kb.avatar}
            </div>
            <div className="p-3.5 rounded-2xl rounded-bl-none bg-slate-900/90 text-slate-200 border border-slate-800/80 text-xs sm:text-sm leading-relaxed">
              {streamedText ? (
                <>
                  {renderFormattedContent(streamedText)}
                  <span className="typing-cursor text-indigo-400" />
                </>
              ) : (
                <div className="flex items-center gap-1.5 py-1 text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] ml-2 text-slate-400">Retrieving verified knowledge...</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Chips */}
      <div className="px-3 py-2 bg-slate-900/40 border-t border-slate-800/70 overflow-x-auto whitespace-nowrap flex gap-1.5 chat-scroll">
        {kb.suggestedChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            disabled={isTyping}
            className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-slate-700/70 text-[11px] text-slate-300 transition-all flex-shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${kb.name} policies or APIs...`}
          disabled={isTyping}
          className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
        />

        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white shadow-md shadow-indigo-600/30 transition-all flex-shrink-0 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Escalation / Priority Ticket Modal */}
      {showEscalationModal && (
        <div className="absolute inset-0 z-20 bg-slate-950/85 backdrop-blur-md p-6 flex flex-col justify-center animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative">
            <button
              onClick={() => setShowEscalationModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Escalate to Human Agent</h4>
                <p className="text-[11px] text-slate-400">Direct priority dispatch queue</p>
              </div>
            </div>

            {ticketSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h5 className="font-bold text-white text-sm">Ticket #{ticketSubmitted} Created!</h5>
                <p className="text-xs text-slate-300">Routing to on-duty support engineer...</p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={ticketData.name}
                    onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={ticketData.email}
                    onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Priority</label>
                    <select
                      value={ticketData.priority}
                      onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Normal">Normal (2 hrs)</option>
                      <option value="Medium">Medium (45 min)</option>
                      <option value="Urgent">Urgent (15 min)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Channel</label>
                    <input
                      type="text"
                      disabled
                      value="Web Widget Direct"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Issue Summary</label>
                  <textarea
                    rows={2}
                    value={ticketData.notes}
                    onChange={(e) => setTicketData({ ...ticketData, notes: e.target.value })}
                    placeholder="Briefly describe what you need assistance with..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEscalationModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
                  >
                    Submit Priority Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
