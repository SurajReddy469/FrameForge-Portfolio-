import React, { useState } from 'react';
import { ShieldCheck, Search, Award, CheckCircle2, FileCheck } from 'lucide-react';
import { WATCHES } from '../data/watchesData';

export default function ProvenanceChecker() {
  const [serialInput, setSerialInput] = useState('VC-TOURB-0824');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      const matched = WATCHES.find(w => w.serialExample.toLowerCase() === serialInput.trim().toLowerCase());
      if (matched) {
        setVerificationResult({
          valid: true,
          model: matched.name,
          collection: matched.collection,
          calibre: matched.calibre,
          year: 2026,
          masterWatchmaker: "Laurent Vautrin, Maître Horloger",
          coscNumber: "COSC-CH-89214-G",
          genevaSeal: "Verified (Bureau Officiel d'Etat)",
          chassis: matched.caseMaterial
        });
      } else {
        setVerificationResult({
          valid: true, // Default to valid bespoke verification for custom serials
          model: "Vanguard Atelier Bespoke Timepiece",
          collection: "Pièce Unique Archive",
          calibre: "Calibre VC-Bespoke Twin Barrel",
          year: 2026,
          masterWatchmaker: "Henri Dufour, Master Craftsman",
          coscNumber: "COSC-CH-99412-B",
          genevaSeal: "Verified Registry Active",
          chassis: "Grade 5 Titanium"
        });
      }
    }, 700);
  };

  return (
    <section id="provenance" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-[#22242a] bg-[#090a0c]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[#d4af37] font-mono text-xs uppercase tracking-[0.25em] mb-2">
            SWISS REGISTRY ARCHIVES
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif font-light text-white">
            Provenance & Geneva Seal Verification
          </h2>
          <p className="mt-4 text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
            Every Vanguard timepiece is recorded in the permanent canton archives of Geneva. Enter your individual serial code to verify chronometer certification and craftsmanship pedigree.
          </p>
        </div>

        {/* Verification Card */}
        <div className="max-w-3xl mx-auto bg-[#12141a] border border-[#22242a] rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value.toUpperCase())}
                placeholder="e.g. VC-TOURB-0824"
                className="w-full pl-11 pr-4 py-3.5 bg-[#090a0c] border border-neutral-700 rounded-xl text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4af37] uppercase tracking-widest"
              />
            </div>
            <button
              type="submit"
              disabled={isVerifying}
              className="px-8 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c14d] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shrink-0"
            >
              {isVerifying ? "Consulting Archives..." : "Verify Provenance"}
            </button>
          </form>

          {/* Quick Clickable Suggestions */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 mb-8 overflow-x-auto">
            <span>Test Codes:</span>
            {['VC-TOURB-0824', 'VC-PERP-1940', 'VC-CHRON-4491', 'VC-SKEL-7712'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setSerialInput(code)}
                className="px-2.5 py-1 rounded bg-[#181a22] text-[#d4af37] border border-neutral-800 hover:border-[#d4af37]/50 transition"
              >
                {code}
              </button>
            ))}
          </div>

          {/* Verification Results Certificate Box */}
          {verificationResult && (
            <div className="bg-[#090a0c] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 animate-fadeIn gold-glow">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif text-lg text-white font-bold">Official Certificate of Authenticity</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono text-[11px]">
                  Poinçon de Genève Approved
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block">AUTHENTICATED PIECE:</span>
                  <span className="text-white font-serif text-base">{verificationResult.model}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">MANUFACTURE CALIBRE:</span>
                  <span className="text-[#d4af37]">{verificationResult.calibre}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">MASTER HOROLOGIST:</span>
                  <span className="text-neutral-200">{verificationResult.masterWatchmaker}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">COSC CHRONOMETER CERTIFICATE:</span>
                  <span className="text-neutral-200">{verificationResult.coscNumber}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">CASING METALLURGY:</span>
                  <span className="text-neutral-200">{verificationResult.chassis}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">REGISTERED CANTON:</span>
                  <span className="text-neutral-200">République et Canton de Genève, Suisse</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
