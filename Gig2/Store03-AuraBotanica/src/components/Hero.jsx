import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Hero({ onOpenQuiz }) {
  const scrollToProducts = () => {
    document.getElementById('routines')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#ede8e1] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dad0] text-xs text-[#3e473d] tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Bio-Fermented Botanical Dermatology
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-[#2c322b] leading-tight">
            Restorative Science. <br />
            <span className="italic font-normal text-[#536151]">Pure Botanical Peace.</span>
          </h1>

          <p className="text-[#596455] font-light text-base sm:text-lg max-w-xl leading-relaxed">
            Formulated in Kyoto using traditional organic rice ferment and Scandinavian lipid barrier ceramides. 100% fragrance-free, essential-oil-free, and dermatologically clinically proven.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToProducts}
              className="px-8 py-4 rounded-full bg-[#3e473d] hover:bg-[#2e352d] text-[#fbf8f5] font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
            >
              <span>Explore The Formulations</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenQuiz}
              className="px-8 py-4 rounded-full border border-[#3e473d] text-[#3e473d] hover:bg-[#f0eae1] font-medium text-xs uppercase tracking-wider transition-all"
            >
              Diagnostic Routine Quiz
            </button>
          </div>

          <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#ede8e1] text-xs">
            <div>
              <span className="text-[#788574] block uppercase text-[10px]">PHILOSOPHY</span>
              <span className="font-serif text-lg text-[#2c322b]">Zero Fragrance</span>
              <span className="text-[#788574] text-[11px] block">Hypoallergenic</span>
            </div>
            <div>
              <span className="text-[#788574] block uppercase text-[10px]">FERMENTATION</span>
              <span className="font-serif text-lg text-[#2c322b]">Kyoto Rice</span>
              <span className="text-[#788574] text-[11px] block">Micro-Biotic Flora</span>
            </div>
            <div>
              <span className="text-[#788574] block uppercase text-[10px]">PACKAGING</span>
              <span className="font-serif text-lg text-[#2c322b]">Violet Glass</span>
              <span className="text-[#788574] text-[11px] block">UV Light Protective</span>
            </div>
          </div>
        </div>

        {/* Right Skincare Photography Box */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-[#ede8e1] bg-white p-4">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
              alt="Centella Ceramide Barrier Crème"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#ede8e1] shadow-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#788574] block">HERO FORMULATION</span>
                <span className="font-serif text-lg text-[#2c322b] font-normal">Centella Ceramide Crème</span>
              </div>
              <span className="font-serif text-xl font-bold text-[#3e473d]">$64</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
