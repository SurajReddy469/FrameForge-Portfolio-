import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LeadSdrChat from './components/LeadSdrChat';
import LeadDossier from './components/LeadDossier';
import CrmPipeline from './components/CrmPipeline';
import WebhookInspector from './components/WebhookInspector';
import Features from './components/Features';
import PricingTiers from './components/PricingTiers';
import Footer from './components/Footer';
import { INDUSTRY_PROFILES } from './data/industryProfiles';
import { calculateLeadScore, INITIAL_CRM_LEADS } from './utils/sdrEngine';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [activeProfileId, setActiveProfileId] = useState('agency');
  const [activeTab, setActiveTab] = useState('sdr'); // 'sdr' or 'crm'
  const [answers, setAnswers] = useState({});
  const [leads, setLeads] = useState(INITIAL_CRM_LEADS);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentProfile = INDUSTRY_PROFILES[activeProfileId] || INDUSTRY_PROFILES.agency;
  const leadScore = calculateLeadScore(answers);

  const handleAnswerSelected = (stageId, option) => {
    setAnswers(prev => ({
      ...prev,
      [stageId]: option
    }));
  };

  const handleReset = () => {
    setAnswers({});
    sounds.playScoreUp();
  };

  const handleProfileSelect = (profId) => {
    setActiveProfileId(profId);
    setAnswers({});
    sounds.playScoreUp();
  };

  const handleBookingConfirmed = (details) => {
    // Add to CRM pipeline
    const newDeal = {
      id: `lead-${Date.now()}`,
      name: details.name,
      company: details.company,
      email: details.email,
      profile: activeProfileId,
      need: answers.need?.tag || 'Full-Stack Web App',
      budget: answers.budget?.tag || '$10,000+',
      timeline: answers.timeline?.tag || 'Urgent',
      score: leadScore.score >= 75 ? leadScore.score : 88,
      stage: 'Meeting Booked',
      bookedSlot: details.slot,
      createdAt: 'Just now'
    };

    setLeads(prev => [newDeal, ...prev]);

    // Switch to CRM view after 2.5s so user sees their deal in the pipeline
    setTimeout(() => {
      setActiveTab('crm');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      <main className="flex-1">
        {/* Hero */}
        <Hero
          currentProfileId={activeProfileId}
          onProfileSelect={handleProfileSelect}
        />

        {/* Main Interactive Stage */}
        <section id="demo" className="pb-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'sdr' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 cols: SDR Conversational Agent with In-Chat Calendar */}
                <div className="lg:col-span-7">
                  <LeadSdrChat
                    profile={currentProfile}
                    leadScore={leadScore}
                    onAnswerSelected={handleAnswerSelected}
                    onReset={handleReset}
                    answers={answers}
                    onBookingConfirmed={handleBookingConfirmed}
                  />
                </div>

                {/* Right 5 cols: Live Lead Intelligence Dossier */}
                <div className="lg:col-span-5">
                  <LeadDossier
                    leadScore={leadScore}
                    answers={answers}
                    currentProfile={currentProfile}
                  />
                </div>
              </div>
            ) : (
              /* Full Width Sales War Room CRM Pipeline */
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8">
                <CrmPipeline
                  leads={leads}
                  onMoveLead={(id, newStage) => {
                    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage: newStage } : l));
                  }}
                />
              </div>
            )}
          </div>
        </section>

        {/* Real-time Webhook Inspector */}
        <WebhookInspector
          leadScore={leadScore}
          answers={answers}
          profile={currentProfile}
        />

        {/* Features */}
        <Features />

        {/* Pricing Tiers */}
        <PricingTiers />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
