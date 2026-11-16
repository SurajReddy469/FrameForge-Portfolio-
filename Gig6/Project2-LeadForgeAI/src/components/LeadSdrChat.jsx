import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, RotateCcw, Calendar, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import MeetingScheduler from './MeetingScheduler';
import { sounds } from '../utils/soundEffects';

export default function LeadSdrChat({
  profile,
  leadScore,
  onAnswerSelected,
  onReset,
  answers,
  onBookingConfirmed
}) {
  const [messages, setMessages] = useState([
    {
      id: 'greet',
      role: 'assistant',
      content: profile.initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stageIndex: 0
    }
  ]);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [showScheduler, setShowScheduler] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Reset messages when profile changes
    setMessages([
      {
        id: `greet-${profile.id}`,
        role: 'assistant',
        content: profile.initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        stageIndex: 0
      }
    ]);
    setCurrentStageIdx(0);
    setShowScheduler(false);
  }, [profile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showScheduler]);

  const activeStage = profile.stages[currentStageIdx];

  const handleSelectOption = (option) => {
    if (isTyping) return;
    sounds.playSend();

    const currentStage = profile.stages[currentStageIdx];

    // User message
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: option.label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Update parent dossier
    onAnswerSelected(currentStage.id, option);
    sounds.playScoreUp();

    // Generate assistant acknowledgment & next question
    setTimeout(() => {
      setIsTyping(false);
      const nextIdx = currentStageIdx + 1;

      if (nextIdx < profile.stages.length) {
        const nextStage = profile.stages[nextIdx];
        const nextMsg = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: `Noted: **${option.tag}**. Understood.\n\n${nextStage.question}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          stageIndex: nextIdx
        };
        setMessages(prev => [...prev, nextMsg]);
        setCurrentStageIdx(nextIdx);
      } else {
        // All stages answered! Final qualification message
        const finalMsg = {
          id: `asst-final-${Date.now()}`,
          role: 'assistant',
          content: `Excellent. Based on your technical scope, target timeline, and budget parameters, your project is a **Tier 1 Strategic Fit** for our engineering studio.\n\nI have unlocked our direct calendar dispatcher below so you can schedule a 30-minute discovery session with our lead architects.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFinal: true
        };
        setMessages(prev => [...prev, finalMsg]);
        setShowScheduler(true);
      }
    }, 500);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim() || isTyping) return;

    const dummyOption = {
      label: customInput.trim(),
      weight: 25,
      tag: customInput.trim().slice(0, 24)
    };
    handleSelectOption(dummyOption);
    setCustomInput('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[640px]">
      {/* Header */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-lg">
                {profile.avatarEmoji}
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white font-syne">{profile.avatarName}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                SDR Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{profile.avatarTitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            title="Reset conversation flow"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-5 overflow-y-auto chat-scroll space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[85%]">
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-lg bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-center text-xs flex-shrink-0 mb-1">
                  {profile.avatarEmoji}
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                    : 'bg-slate-950/90 text-slate-200 border border-slate-800 rounded-bl-none'
                }`}
              >
                {msg.content.split('\n\n').map((para, pIdx) => (
                  <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2 max-w-[85%]">
            <div className="w-6 h-6 rounded-lg bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-center text-xs flex-shrink-0 mb-1">
              {profile.avatarEmoji}
            </div>
            <div className="p-3 rounded-2xl rounded-bl-none bg-slate-950/90 border border-slate-800 text-xs flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-200" />
              <span className="text-[11px] ml-1">Analyzing BANT fit...</span>
            </div>
          </div>
        )}

        {/* In-Chat Meeting Scheduler Box */}
        {showScheduler && (
          <div className="pt-2 animate-in fade-in slide-in-from-bottom-4">
            <MeetingScheduler
              profile={profile}
              leadInfo={answers}
              onBookingConfirmed={onBookingConfirmed}
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Options Chips Area */}
      {!showScheduler && activeStage && (
        <div className="p-3 bg-slate-950/90 border-t border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 px-1 flex items-center justify-between">
            <span>Select one option to advance:</span>
            <span className="text-emerald-400 font-mono">Stage {currentStageIdx + 1} of {profile.stages.length}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {activeStage.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt)}
                disabled={isTyping}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-950/50 hover:border-emerald-500/40 border border-slate-800 text-left text-xs text-slate-200 transition-all flex items-center justify-between group active:scale-[0.99]"
              >
                <span className="truncate">{opt.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-1.5" />
              </button>
            ))}
          </div>

          {/* Custom text input */}
          <form onSubmit={handleCustomSubmit} className="mt-2.5 flex items-center gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Or type custom specification..."
              disabled={isTyping}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!customInput.trim() || isTyping}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-all shadow-md shadow-emerald-900"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
