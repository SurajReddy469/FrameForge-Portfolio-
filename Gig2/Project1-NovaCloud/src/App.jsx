import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MetricsBar from './components/MetricsBar';
import FeatureTabs from './components/FeatureTabs';
import InteractiveCalculator from './components/InteractiveCalculator';
import PricingSection from './components/PricingSection';
import TestimonialGrid from './components/TestimonialGrid';
import FaqAccordion from './components/FaqAccordion';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('novacloud_theme');
    return saved !== null ? saved === 'dark' : true; // default dark mode for developer SaaS
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  useEffect(() => {
    localStorage.setItem('novacloud_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleOpenDemo = (plan = 'pro') => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 selection:bg-violet-500 selection:text-white ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
    }`}>
      {/* Navigation */}
      <Navbar
        onOpenDemo={handleOpenDemo}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content */}
      <main>
        <HeroSection
          onOpenDemo={handleOpenDemo}
          isDarkMode={isDarkMode}
        />

        <MetricsBar
          isDarkMode={isDarkMode}
        />

        <FeatureTabs
          isDarkMode={isDarkMode}
          onOpenDemo={handleOpenDemo}
        />

        <InteractiveCalculator
          isDarkMode={isDarkMode}
          onOpenDemo={handleOpenDemo}
        />

        <PricingSection
          isDarkMode={isDarkMode}
          onOpenDemo={handleOpenDemo}
        />

        <TestimonialGrid
          isDarkMode={isDarkMode}
        />

        <FaqAccordion
          isDarkMode={isDarkMode}
          onOpenDemo={handleOpenDemo}
        />
      </main>

      {/* Footer */}
      <Footer
        isDarkMode={isDarkMode}
      />

      {/* Provisioning / Demo Lead Modal */}
      <DemoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPlan={selectedPlan}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
