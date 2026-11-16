import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ArrowRight, X, Heart, ShieldCheck, Microscope } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS, QUIZ_QUESTIONS } from '../data/skincareData';

export default function SkinQuizModal({ isOpen, onClose, onAddRoutineToCart }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectOption = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResult(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-transparent" onClick={onClose} aria-hidden="true" />
      <div className="bg-[#fbf8f5] border border-[#ede8e1] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto z-10 text-[#2c322b]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#788574] hover:text-[#2c322b] p-1 cursor-pointer"
          aria-label="Close skincare quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!showResult ? (
          <div>
            <div className="mb-6">
              <span className="text-xs text-[#788574] uppercase tracking-wider block mb-1">
                STEP {currentStep + 1} OF {QUIZ_QUESTIONS.length}
              </span>
              <h3 id="quiz-modal-title" className="font-serif text-2xl font-light text-[#2c322b]">
                {QUIZ_QUESTIONS[currentStep].question}
              </h3>
            </div>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, option)}
                  className="w-full text-left p-4 rounded-2xl bg-white border border-[#ede8e1] hover:border-[#3e473d] hover:bg-[#f7f3ed] transition text-xs font-normal text-[#2c322b] cursor-pointer flex items-center justify-between group"
                >
                  <span>{option}</span>
                  <ArrowRight className="w-4 h-4 text-[#788574] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#e8f0e6] text-[#3e473d] flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-xs text-[#788574] uppercase tracking-wider block mb-0.5">CLINICALLY FORMULATED REGIMEN</span>
              <h3 id="quiz-modal-title" className="font-serif text-2xl sm:text-3xl font-light text-[#2c322b]">Your Tailored Routine</h3>
              <p className="text-xs text-[#6e7a6a] mt-1 font-light">
                Reconstructs stratum corneum lipid barrier density with bio-fermented botanicals.
              </p>
            </div>

            {/* Routine Steps with Explicit Usage & Ingredient Details */}
            <div className="space-y-3 mb-5 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-[#ede8e1]">
                <div className="flex items-center justify-between font-serif text-sm font-medium text-[#2c322b]">
                  <span>AM Step 1: Fermented Rice Essence</span>
                  <span className="text-[#3e473d] font-sans text-xs">pH 5.4</span>
                </div>
                <div className="text-[11px] text-[#556350] mt-1">
                  <strong>Active:</strong> 92% Galactomyces Ferment Filtrate + Niacinamide (2%).
                </div>
                <div className="text-[10px] text-[#788574] mt-0.5 font-light">
                  <strong>How to use:</strong> Press 3-4 drops directly into freshly cleansed, damp skin.
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#ede8e1]">
                <div className="flex items-center justify-between font-serif text-sm font-medium text-[#2c322b]">
                  <span>AM/PM Step 2: Centella Ceramide Crème</span>
                  <span className="text-[#3e473d] font-sans text-xs">Barrier</span>
                </div>
                <div className="text-[11px] text-[#556350] mt-1">
                  <strong>Active:</strong> 5-Ceramide Matrix (NP, AP, EOP) + Madecassoside (3%).
                </div>
                <div className="text-[10px] text-[#788574] mt-0.5 font-light">
                  <strong>How to use:</strong> Warm dime-sized amount between palms; massage upward.
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#ede8e1]">
                <div className="flex items-center justify-between font-serif text-sm font-medium text-[#2c322b]">
                  <span>PM Night: Bakuchiol 2% Renewal Oil</span>
                  <span className="text-[#3e473d] font-sans text-xs">Cellular</span>
                </div>
                <div className="text-[11px] text-[#556350] mt-1">
                  <strong>Active:</strong> 2.0% Sytenol® A Pure Bakuchiol + Cold-Pressed Camellia Oil.
                </div>
                <div className="text-[10px] text-[#788574] mt-0.5 font-light">
                  <strong>How to use:</strong> Press 2 drops as final occlusive night step over crème.
                </div>
              </div>
            </div>

            {/* Clinical Evidence Panel */}
            <div className="p-3 bg-[#e8f0e6]/70 border border-[#c5d8c3] rounded-2xl text-[11px] text-[#334231] mb-5 space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-[#253223]">
                <Microscope className="w-3.5 h-3.5 text-[#3e473d]" />
                <span>Clinical Trial Methodology (n=32 healthy human subjects):</span>
              </div>
              <p className="font-light text-[10px] leading-relaxed">
                In a 14-day double-blind clinical Corneometer & Tewameter trial, participants exhibited a mean <strong>+42.4% increase in stratum corneum hydration</strong> and a <strong>-38.1% reduction in transepidermal water loss (TEWL)</strong> at p &lt; 0.001.
              </p>
            </div>

            <div className="p-3 bg-[#f0eae1] rounded-2xl text-xs flex items-center justify-between mb-5">
              <div>
                <span className="font-medium text-[#2c322b]">Complete 3-Step Routine Bundle</span>
                <div className="text-[10px] text-[#788574]">Includes 15% Diagnostic Savings + Free Refill Pouch</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] line-through text-[#8f9b8b] block">$194</span>
                <span className="font-serif text-xl font-bold text-[#3e473d]">$164 USD</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddRoutineToCart(PRODUCTS.slice(0, 3));
                onClose();
              }}
              className="w-full py-4 rounded-2xl bg-[#3e473d] hover:bg-[#2c322b] text-[#fbf8f5] font-medium text-xs uppercase tracking-wider transition shadow-sm mb-2 cursor-pointer"
            >
              Add Tailored Routine to Basket ($164 USD)
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full text-center text-xs text-[#788574] hover:text-[#2c322b] cursor-pointer py-1"
            >
              Retake Diagnostic Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
