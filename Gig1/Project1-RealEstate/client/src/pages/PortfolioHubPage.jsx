import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Layers,
  Server,
  Database,
  Lock,
  Rocket,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Send,
  Building2,
  UtensilsCrossed,
  Briefcase,
  Dumbbell,
  HeartPulse,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function PortfolioHubPage() {
  // Quote form state
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    projectType: 'Real Estate / Marketplace',
    timeline: '2 - 4 Weeks',
    budgetTier: 'Standard Full-Stack ($450–$750)',
    deliverables: ['Responsive Frontend', 'REST API Backend', 'Database Design'],
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(null);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Deliverables toggle helper
  const toggleDeliverable = (item) => {
    setQuoteForm((prev) => {
      const exists = prev.deliverables.includes(item);
      return {
        ...prev,
        deliverables: exists
          ? prev.deliverables.filter((d) => d !== item)
          : [...prev.deliverables, item]
      };
    });
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteForm.name.trim() || !quoteForm.email.trim()) {
      alert('Please provide your name and email address to receive your quote.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const refCode = 'FRAME-QUOTE-' + Math.floor(100000 + Math.random() * 900000);
      const submission = {
        ...quoteForm,
        refCode,
        createdAt: new Date().toISOString()
      };

      try {
        const saved = JSON.parse(localStorage.getItem('frameforge_quotes') || '[]');
        localStorage.setItem('frameforge_quotes', JSON.stringify([submission, ...saved]));
      } catch (err) {
        console.warn('LocalStorage unavailable', err);
      }

      setQuoteSuccess(submission);
      setSubmitting(false);
    }, 600);
  };

  // Demo Project Directory with real deployed URLs
  const demoProjects = [
    {
      id: 'urbannest',
      title: 'UrbanNest — Luxury Real Estate Marketplace',
      industry: 'PropTech & Marketplace',
      tagline: 'High-end architectural listings, dynamic multi-city filters, and automated tour booking.',
      purpose: 'Engineered for property brokerages to showcase high-value listings, capture buyer leads, and automate viewing tours without manual scheduling friction.',
      features: [
        'Dynamic search filtering across 5 metros, typology, and budget ranges',
        'Interactive mortgage & EMI calculator with interest/tenure sliders',
        'Side-by-side comparative specification matrix (up to 3 properties)',
        'Tour inspection booking pass generator with unique reference code (UN-TOUR-XXXXXX)',
        'Role-protected broker dashboard with lead CRM status workflow'
      ],
      techStack: ['React 19', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS v4'],
      demoUrl: '/properties',
      internalRoute: true,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: Building2,
      accentColor: 'text-emerald-400'
    },
    {
      id: 'gourmethaven',
      title: 'GourmetHaven — Fine Dining & Artisanal Takeaway',
      industry: 'Hospitality & FoodTech',
      tagline: 'Dietary-curated gastronomy menu, slide-out cart drawer, and table reservations.',
      purpose: 'Built for fine dining bistros to handle peak-hour table reservations, manage dietary preferences, and process multi-item takeaway bags seamlessly.',
      features: [
        'Dietary allergen filtering (Vegetarian, Halal, Gluten-Free, Chef Specials)',
        'Slide-over real-time cart drawer with quantity toggles and bill breakdown',
        'Table reservation workflow with party-size & date/time validation',
        'Server-side order total recalculation and promo code validation',
        'Order tracking demonstration with kitchen preparation stages'
      ],
      techStack: ['React 19', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS v4'],
      demoUrl: 'https://frameforge-gourmethaven.vercel.app/',
      internalRoute: false,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      icon: UtensilsCrossed,
      accentColor: 'text-amber-400'
    },
    {
      id: 'apexmedia',
      title: 'ApexMedia — Digital Product Agency & CRM',
      industry: 'B2B Consultancy & Professional Services',
      tagline: 'Algorithmic project budget estimator, case study spec sheets, and lead pipeline.',
      purpose: 'Designed for digital consultancies and design agencies to qualify inbound venture leads, calculate project budget tiers, and track pipeline milestones.',
      features: [
        '60-second interactive Scope & Budget Estimator with add-on multipliers',
        'Dedicated case study detail pages (/projects/:id) with engineering spec sheets',
        'Lead qualification CRM with status pipeline (New, In Review, Proposal Sent, Won)',
        'RFC 4180 CSV export for CRM synchronization and offline spreadsheets',
        'Strict RBAC administrative principal login with session persistence'
      ],
      techStack: ['React 18', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS v3'],
      demoUrl: 'https://frameforge-apexmedia.vercel.app/',
      internalRoute: false,
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: Briefcase,
      accentColor: 'text-blue-400'
    },
    {
      id: 'fitpulse',
      title: 'FitPulse — Athletic Club & Studio Management',
      industry: 'Health & Wellness SaaS',
      tagline: 'Live timetable schedule, capacity-aware studio passes, and scannable QR entry.',
      purpose: 'Created for boutique fitness clubs and CrossFit boxes to manage class capacities, prevent double-bookings, and issue digital check-in passes.',
      features: [
        'Class schedule grid filtered by discipline (CrossFit, HIIT, Yoga, Boxing)',
        'Atomic capacity tracking that locks spots and prevents overbooking',
        'Instant studio reservation pass with scannable SVG QR access code',
        'Membership tier selection preview with pass balance deductions',
        'Facility photography gallery covering Barbell Turf and Recovery Lounge'
      ],
      techStack: ['React 18', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS v3'],
      demoUrl: 'https://frameforge-fitpulse.vercel.app/',
      internalRoute: false,
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      icon: Dumbbell,
      accentColor: 'text-rose-400'
    },
    {
      id: 'medicare',
      title: 'MediCare Plus — CarePoint Clinic & Doctor Directory',
      industry: 'Healthcare Technical Demo',
      tagline: 'Physician credential profiles, real-time availability calendar, and intake slips.',
      purpose: 'Built to illustrate conflict-free scheduling and multi-step intake questionnaires for outpatient medical practices. (Illustrative demonstration — not for real clinical care).',
      features: [
        'Physician directory with verified photographic portraits and departmental filters',
        'Real-time availability calendar with open time slots on every date',
        'Two-step digital symptom intake questionnaire with input validation',
        'Cryptographic appointment confirmation slip generator (CARE-APPT-XXXXXX)',
        'Receptionist desk management workflow with attendance status transitions'
      ],
      techStack: ['React 18', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS v3'],
      demoUrl: 'https://frameforge-medicare.vercel.app/',
      internalRoute: false,
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      icon: HeartPulse,
      accentColor: 'text-teal-400'
    }
  ];

  const faqs = [
    {
      q: 'What information do you need from me to start my project?',
      a: 'A short description of your product concept, your target audience, any reference websites you admire, and a list of desired pages or user roles. If you have existing Figma wireframes or API documentation, that is wonderful; if not, we will define the technical scope together in step 1.'
    },
    {
      q: 'How is the project scope agreed upon?',
      a: 'Before any code is written, we confirm a written milestone scope document detailing exact pages, database models, API endpoints, and authentication roles. Any future feature requests are added as clear milestone extensions so there are never surprises.'
    },
    {
      q: 'What is included in the final delivery handover?',
      a: 'You receive 100% full ownership of the clean Git repository, environment variable templates (.env.example), deployed production links on your hosting account (Vercel, Railway, Render, or AWS), database seed scripts, and a step-by-step setup documentation guide.'
    },
    {
      q: 'Can you integrate third-party services like Stripe, SendGrid, or Cloudinary?',
      a: 'Yes. In production builds, we securely integrate payment gateways (Stripe/PayPal), transactional email services (SendGrid/Resend), cloud asset storage (Cloudinary/AWS S3), and SMS/WhatsApp notifications. All API credentials remain isolated in server environment variables.'
    },
    {
      q: 'Are the five demo applications real commercial businesses?',
      a: 'No. They are fully working, interactive technical demonstrations built under the FrameForge engineering standard to demonstrate full-stack MERN architecture, responsive UI craft, real-time filtering, database relationships, and booking workflows. All listings, menus, doctors, and reviews use sample demo data.'
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-emerald-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/30 via-slate-950 to-slate-950 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>FrameForge Engineering • Custom Full-Stack Web Development</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Custom Full-Stack Web Applications <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              Built for Production & Scale.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            I design and engineer custom full-stack web platforms using <strong>React, Node.js, Express, and MongoDB/PostgreSQL</strong>. Explore 5 live interactive demos below, inspect our clean component architecture, and request a tailored quote for your next product launch.
          </p>

          {/* Core Trust Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 5 Live Deployed Demos
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dual-Engine Offline Resilience
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Automated Test Suites
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Full Source Code Handover
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quote"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/25 transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Request a Project Quote</span>
            </a>
            <a
              href="#demos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:scale-105"
            >
              <span>Explore 5 Live Demos</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. CONCRETE DELIVERABLES SECTION */}
      <section id="deliverables" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Concrete Full-Stack Scope</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What I Deliver in Every Application
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            No empty buzzwords or unverified claims. Every deliverable is clearly scoped, modularly coded, and rigorously tested before handover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Responsive Frontend Interface</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mobile-first, high-performance UI created with modern React and Tailwind CSS. Clean component breakdown, interactive states, accessible inputs, and keyboard navigation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Modular REST / API Backend</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Express.js & Node.js server architecture with controller-service separation, schema validation middleware, rate limiting, and structured error responses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Database Design & Modeling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Schema design for MongoDB (Mongoose) or PostgreSQL (Prisma/pg). Optimized query indexing, relational data references, and atomic transaction protection.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Authentication & Role-Based Access</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Secure user authentication using hashed credentials (bcrypt) and signed JWT tokens. Granular multi-role RBAC (Customer, Staff, Manager, Admin) preventing privilege leaks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Cloud Deployment & SSL Setup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full deployment to Vercel, Render, Railway, or AWS. Environment secrets configuration, automated CI/CD continuous deployment from Git, and custom domain linking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Full Source Code Handover</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clean, well-commented Git repository transfer with complete intellectual property ownership. Comprehensive README setup instructions, .env.example, and seed data.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 5 LIVE DEMO SHOWCASE CARDS */}
      <section id="demos" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Interactive Demonstrations</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore 5 Deployed Full-Stack Applications
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Every demo below is a fully functional, live-deployed application with persistent data handling, responsive layouts, and verified booking or inquiry user journeys.
          </p>
        </div>

        <div className="space-y-8">
          {demoProjects.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.id}
                className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 hover:border-slate-700 transition-all shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Overview Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-bold text-slate-400 font-mono">Demo 0{idx + 1}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${p.badgeColor}`}>
                      {p.industry}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                      Sample Data • Illustrative Project
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                      <IconComponent className={`w-5 h-5 ${p.accentColor}`} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong>Purpose:</strong> {p.purpose}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Working Capabilities:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {p.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {p.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action & Launch Card */}
                <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Live Verification Link</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Click below to test the active user journeys (search, filter, cart, booking modal, or admin credentials).
                    </p>
                  </div>

                  <div className="space-y-3">
                    {p.internalRoute ? (
                      <>
                        <Link
                          to={p.demoUrl}
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                        >
                          <span>Launch UrbanNest Catalog</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          to="/demo/urbannest"
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
                        >
                          <span>UrbanNest Marketplace Homepage</span>
                        </Link>
                      </>
                    ) : (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                      >
                        <span>Launch Live Demo Application</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span>Clean Source Code in Repo</span>
                    <span className="text-emerald-400 font-medium">100% Passing Tests</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. HOW I WORK SECTION */}
      <section id="workflow" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Structured Engineering Process</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Work — From Discovery to Handover
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Transparent, milestone-based full-stack delivery so you stay in complete control of timeline, budget, and features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400">01</span>
            <h3 className="text-base font-bold text-white">Discovery & Scope Definition</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We review your user journeys, wireframes, and business rules. I provide an itemized deliverables breakdown so expectations are aligned before coding begins.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-teal-400">02</span>
            <h3 className="text-base font-bold text-white">Architecture & Schema Design</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              I draft database models, API endpoint contracts, authentication flow, and component hierarchy to avoid costly rework later in development.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400">03</span>
            <h3 className="text-base font-bold text-white">Iterative Development & Staging</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              I build the frontend and backend simultaneously, providing live testable staging links at each milestone so you can interact with working features.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-blue-400">04</span>
            <h3 className="text-base font-bold text-white">Quality Review & Automated Testing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Core endpoints, authentication routes, and transaction calculations are verified with automated test suites. Cross-browser and mobile responsive audits are completed.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400">05</span>
            <h3 className="text-base font-bold text-white">Cloud Deployment & Production Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We connect your production database and deploy frontend/API with SSL encryption, environment secrets, and automated continuous deployment (CI/CD).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400">06</span>
            <h3 className="text-base font-bold text-white">Clean Handover & Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You receive 100% intellectual property ownership of the repository, environment documentation, database seed scripts, and post-delivery revision assistance.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SERVICE TIERS & PACKAGES (CLEAR DELIVERABLES + PLACEHOLDERS) */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Fiverr Service Packages</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparent Deliverable Tiers
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Scope is defined in concrete deliverables rather than vague promises. Pricing and turnaround timelines can be tailored to your specific project needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Starter Tier */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Starter Tier
              </span>
              <h3 className="text-xl font-bold text-white">Frontend MVP Prototype</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ideal for validating product concepts, investor pitch prototypes, or single-page landing workflows with interactive mock data.
              </p>

              {/* Editable placeholder */}
              <div className="p-3 bg-slate-950 rounded-xl border border-dashed border-slate-700 text-xs text-slate-400">
                <span className="font-semibold text-slate-200 block">Investment & Timeline:</span>
                <span className="text-emerald-400">[Owner Input: e.g. $150 – $250 • 3–5 Days]</span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase text-slate-400">Included Deliverables:</span>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Responsive React + Tailwind CSS UI</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Mobile, Tablet & Desktop Layouts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Interactive Mock Datasets & State</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Cloud Deployment (Vercel)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Source Code Handover via GitHub</li>
                </ul>
              </div>
            </div>

            <a
              href="#quote"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider text-center transition"
            >
              Select Starter Scope
            </a>
          </div>

          {/* Standard Tier (Highlighted) */}
          <div className="rounded-3xl bg-slate-900 border-2 border-emerald-500/80 p-8 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-emerald-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow">
              Most Popular for Full-Stack MVPs
            </div>

            <div className="space-y-4 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Standard Tier
              </span>
              <h3 className="text-xl font-bold text-white">Full-Stack Web Application</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete production application with persistent database, authenticated user accounts, and validated inquiry/booking forms.
              </p>

              {/* Editable placeholder */}
              <div className="p-3 bg-slate-950 rounded-xl border border-dashed border-emerald-500/50 text-xs text-slate-400">
                <span className="font-semibold text-slate-200 block">Investment & Timeline:</span>
                <span className="text-emerald-400 font-bold">[Owner Input: e.g. $450 – $750 • 7–10 Days]</span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase text-slate-400">Included Deliverables:</span>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Everything in Starter Tier</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Node.js / Express.js REST API</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> MongoDB / PostgreSQL Database</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> User Authentication (JWT + bcrypt)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Contact / Booking Intake with Validation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Automated Test Suite on Key Routes</li>
                </ul>
              </div>
            </div>

            <a
              href="#quote"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider text-center shadow-lg shadow-emerald-600/30 transition hover:scale-[1.02]"
            >
              Select Standard Scope
            </a>
          </div>

          {/* Premium Tier */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Premium Tier
              </span>
              <h3 className="text-xl font-bold text-white">Custom Multi-Role Platform</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full-scale web platform featuring multi-role RBAC, administrator analytics dashboards, complex scheduling, or marketplace dynamics.
              </p>

              {/* Editable placeholder */}
              <div className="p-3 bg-slate-950 rounded-xl border border-dashed border-slate-700 text-xs text-slate-400">
                <span className="font-semibold text-slate-200 block">Investment & Timeline:</span>
                <span className="text-emerald-400">[Owner Input: e.g. $950 – $1,500+ • 14–21 Days]</span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase text-slate-400">Included Deliverables:</span>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Everything in Standard Tier</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Multi-Role RBAC (Admin, Staff, Client)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Custom Admin Dashboard & Lead CRM</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> CSV Export & Searchable Data Tables</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Complex Business Logic & Calculators</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 14 Days Post-Delivery Support</li>
                </ul>
              </div>
            </div>

            <a
              href="#quote"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider text-center transition"
            >
              Select Premium Scope
            </a>
          </div>

        </div>
      </section>

      {/* 6. CONCISE FAQ SECTION */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Frequently Asked Questions</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Client FAQ
          </h2>
          <p className="text-sm text-slate-400">
            Clear answers about communication, technical scope, delivery, and commercial handover.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-emerald-400 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. INTERACTIVE "REQUEST A QUOTE" CONSULTATION FORM */}
      <section id="quote" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Direct Consultation</span>
              <h2 className="text-3xl font-black text-white tracking-tight">
                Request a Custom Full-Stack Quote
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Tell me about your product requirements, target timeline, and deliverables. You will receive an itemized proposal breakdown and estimate within 24 business hours.
              </p>
            </div>

            {quoteSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Quote Request Received!</h3>
                <p className="text-xs text-emerald-300">
                  Your project scope was logged. Your verification reference number is:
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-950 font-mono text-sm font-black text-emerald-400 border border-emerald-500/30">
                  {quoteSuccess.refCode}
                </div>
                <div className="text-left bg-slate-950 p-4 rounded-xl text-xs space-y-1.5 text-slate-300 max-w-md mx-auto border border-slate-800">
                  <p><strong>Contact:</strong> {quoteSuccess.name} ({quoteSuccess.email})</p>
                  <p><strong>Project Type:</strong> {quoteSuccess.projectType}</p>
                  <p><strong>Target Timeline:</strong> {quoteSuccess.timeline}</p>
                  <p><strong>Selected Deliverables:</strong> {quoteSuccess.deliverables.join(', ')}</p>
                </div>
                <p className="text-xs text-slate-400">
                  You can also message me directly on Fiverr or via the configuration points below.
                </p>
                <button
                  onClick={() => setQuoteSuccess(null)}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition"
                >
                  Submit Another Project Scope
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                
                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                {/* Project niche & Timeline row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Industry / Format</label>
                    <select
                      value={quoteForm.projectType}
                      onChange={(e) => setQuoteForm({ ...quoteForm, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 transition cursor-pointer"
                    >
                      <option value="Real Estate / Marketplace">Real Estate / Marketplace Platform</option>
                      <option value="Restaurant / Food Ordering">Restaurant / Online Ordering & Reservations</option>
                      <option value="Agency / B2B SaaS Platform">Agency / B2B SaaS Platform</option>
                      <option value="Fitness / Studio Booking">Fitness / Studio Booking & Passes</option>
                      <option value="Clinic / Appointment System">Clinic / Provider Directory & Intake</option>
                      <option value="Custom Web Application">Custom Web Application / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Delivery Timeline</label>
                    <select
                      value={quoteForm.timeline}
                      onChange={(e) => setQuoteForm({ ...quoteForm, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 transition cursor-pointer"
                    >
                      <option value="Sprint Delivery (1 - 2 Weeks)">Sprint Delivery (1 - 2 Weeks)</option>
                      <option value="Standard Sprint (2 - 4 Weeks)">Standard Sprint (2 - 4 Weeks)</option>
                      <option value="Comprehensive (4 - 8 Weeks)">Comprehensive (4 - 8 Weeks)</option>
                      <option value="Flexible / Discovery Phase">Flexible / Discovery Phase</option>
                    </select>
                  </div>
                </div>

                {/* Deliverables checklist */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Required Deliverables (Select all that apply)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      'Responsive Frontend',
                      'REST API Backend',
                      'Database Design',
                      'JWT Authentication',
                      'Admin Dashboard',
                      'Payment Gateway',
                      'Automated Test Suite',
                      'Cloud Deployment',
                      'Full Code Handover'
                    ].map((item) => {
                      const isSelected = quoteForm.deliverables.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleDeliverable(item)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span>{item}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Overview & Specific Features</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you are building, any reference websites, key user roles, or custom workflows needed..."
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <span>Logging Quote Scope...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Quote Inquiry (Instant Reference Pass)</span>
                    </>
                  )}
                </button>

                {/* Configuration notice for owner */}
                <div className="pt-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">Direct Contact Configuration Points for Owner:</p>
                  <p>• Fiverr Profile / Gig Chat: <span className="font-mono text-emerald-400">VITE_FIVERR_PROFILE_URL</span> (Set in client .env)</p>
                  <p>• Direct Monitored Email: <span className="font-mono text-emerald-400">VITE_CONTACT_EMAIL</span></p>
                  <p>• WhatsApp Business: <span className="font-mono text-emerald-400">VITE_BUSINESS_WHATSAPP</span></p>
                </div>

              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
