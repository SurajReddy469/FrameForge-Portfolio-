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
    deliverables: ['Responsive Frontend', 'REST API Backend', 'Database Design'],
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(null);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);
  const [activeWalkthrough, setActiveWalkthrough] = useState(0);

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
      // Front-end demo only: do not persist personal data or imply an inquiry was sent.
      setQuoteSuccess({ ...quoteForm, refCode });
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
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: Building2,
      accentColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 border-emerald-200'
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
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: UtensilsCrossed,
      accentColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-200'
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
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: Briefcase,
      accentColor: 'text-blue-600',
      iconBg: 'bg-blue-50 border-blue-200'
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
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: Dumbbell,
      accentColor: 'text-rose-600',
      iconBg: 'bg-rose-50 border-rose-200'
    },
    {
      id: 'medicare',
      title: 'MediCare Plus — CarePoint Clinic & Doctor Directory',
      industry: 'Healthcare Technical Demo',
      tagline: 'Physician credential profiles, real-time availability calendar, and intake slips.',
      purpose: 'Built to illustrate conflict-free scheduling and multi-step intake questionnaires for outpatient medical practices. (Illustrative demonstration — not for real clinical care).',
      features: [
        'Sample physician profiles with departmental filters and illustrative portraits',
        'Real-time availability calendar with open time slots on every date',
        'Two-step digital symptom intake questionnaire with input validation',
        'Cryptographic appointment confirmation slip generator (CARE-APPT-XXXXXX)',
        'Receptionist desk management workflow with attendance status transitions'
      ],
      techStack: ['React 18', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS v3'],
      demoUrl: 'https://frameforge-medicare.vercel.app/',
      internalRoute: false,
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      icon: HeartPulse,
      accentColor: 'text-teal-600',
      iconBg: 'bg-teal-50 border-teal-200'
    }
  ];

  const walkthroughs = [
    {
      id: 'urbannest',
      name: '1. UrbanNest',
      title: 'UrbanNest — Luxury PropTech Marketplace',
      industry: 'PropTech & Marketplace',
      tagline: 'Multi-city search filtering, live mortgage EMI calculator, and viewing tour pass generation.',
      customerSteps: [
        'Open /properties to test live Buy (4) vs. Rent (2) filtering and metro location tags.',
        'Select Skyline Penthouse (/properties/prop-101) to interact with the Mortgage & EMI installment calculator.',
        'Complete the Schedule Private Tour form to generate a simulated inspection pass with reference code (UN-TOUR-XXXXXX).'
      ],
      adminSteps: [
        'Open /login and click "Fill Admin Credentials" (admin@urbannest.com / admin123).',
        'Navigate to /admin dashboard to inspect total portfolio valuation, active inventory, and inbound tour leads.',
        'Transition tour lead workflow status from Pending to Contacted.'
      ],
      highlight: 'Reactive multi-city filtering, atomic comparison matrix, and role-protected broker CRM.',
      customerUrl: '/properties',
      adminUrl: '/login',
      internal: true
    },
    {
      id: 'gourmethaven',
      name: '2. GourmetHaven',
      title: 'GourmetHaven — Fine Dining & Artisanal Takeaway',
      industry: 'Hospitality & FoodTech',
      tagline: 'Dietary-curated menu, slide-out cart drawer with promo validation, and table reservations.',
      customerSteps: [
        'Browse /menu to filter dishes by dietary tags (Vegetarian, Halal, Gluten-Free, Chef Specials).',
        'Add dishes to the slide-over cart drawer and test promo discount codes (e.g. WELCOME10 or CHEF20).',
        'Submit a table reservation on /reserve specifying guest party size and seating zone.'
      ],
      adminSteps: [
        'Navigate to /login and click "Fill Staff/Chef" credentials (admin@gourmethaven.com / admin123).',
        'Inspect the reservations schedule queue and live kitchen takeaway orders.'
      ],
      highlight: 'Slide-over cart state with server-side tax/discount calculation and responsive drawer animation.',
      customerUrl: 'https://frameforge-gourmethaven.vercel.app/menu',
      adminUrl: 'https://frameforge-gourmethaven.vercel.app/login',
      internal: false
    },
    {
      id: 'apexmedia',
      name: '3. ApexMedia',
      title: 'ApexMedia — Digital Product Agency & CRM',
      industry: 'B2B Consultancy & Services',
      tagline: 'Algorithmic project budget estimator, case study spec sheets, and CSV lead pipeline.',
      customerSteps: [
        'Launch the Scope & Budget Estimator on the homepage and select your target platform architecture.',
        'Toggle feature add-ons (Auth, Stripe Payments, Admin CRM) to watch real-time investment calculation.',
        'Submit inquiry to receive an instant proposal reference tracking pass.'
      ],
      adminSteps: [
        'Open /login and authenticate as Admin Principal (admin@apexmedia.com / admin123).',
        'Navigate the Client Pipeline CRM and advance lead stages (New -> In Review -> Proposal Sent -> Won).',
        'Export pipeline data with 1-click RFC 4180 CSV export.'
      ],
      highlight: 'Algorithmic scope calculator, lead pipeline stage management, and client-side CSV parsing.',
      customerUrl: 'https://frameforge-apexmedia.vercel.app/',
      adminUrl: 'https://frameforge-apexmedia.vercel.app/login',
      internal: false
    },
    {
      id: 'fitpulse',
      name: '4. FitPulse',
      title: 'FitPulse — Athletic Club & Studio Management',
      industry: 'Health & Wellness SaaS',
      tagline: 'Weekly timetable schedule across all 7 days, atomic capacity locks, and QR entry passes.',
      customerSteps: [
        'Browse /schedule to view all 8 sessions spanning Monday through Sunday across 6 disciplines.',
        'Click "Reserve Studio Spot" on CrossFit MetCon to lock capacity and confirm reservation.',
        'Receive instant digital entry pass with scannable QR access code (FIT-BOOK-XXXXXX).',
        'Open /my-bookings to verify remaining class passes and pass deductions.'
      ],
      adminSteps: [
        'Log in with staff credentials (admin@fitpulse.gym / admin123).',
        'Monitor live studio roster capacities and member check-in verification logs.'
      ],
      highlight: 'Atomic spot reservation preventing overbooking, dynamic capacity bars, and QR code SVG generation.',
      customerUrl: 'https://frameforge-fitpulse.vercel.app/schedule',
      adminUrl: 'https://frameforge-fitpulse.vercel.app/login',
      internal: false
    },
    {
      id: 'medicare',
      name: '5. MediCare Plus',
      title: 'MediCare Plus — CarePoint Clinic & Doctor Directory',
      industry: 'Healthcare Technical Demo',
      tagline: 'Physician credential profiles, real-time availability calendar, and printable intake slips.',
      customerSteps: [
        'Navigate to /book to view all 6 specialist doctors and consultation rates.',
        'Select a doctor and click "Choose Date & Pick Time Slot" to view real-time open slots.',
        'Complete the 2-step digital intake questionnaire with symptom details.',
        'Generate and view a sample appointment slip (CARE-APPT-XXXXXX).'
      ],
      adminSteps: [
        'Sign in with desk staff credentials (admin@medicare.clinic / admin123).',
        'Open receptionist calendar overview to update attendance triage status (Scheduled -> Checked In -> Completed).'
      ],
      highlight: 'Multi-doctor calendar slot conflict resolution, multi-step intake validation, and printable confirmation slips.',
      customerUrl: 'https://frameforge-medicare.vercel.app/book',
      adminUrl: 'https://frameforge-medicare.vercel.app/login',
      internal: false
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
      a: 'You receive full intellectual property ownership of the clean Git repository, environment variable templates (.env.example), deployed production links on your hosting account (Vercel, Railway, Render, or AWS), database seed scripts, and a step-by-step setup documentation guide.'
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
    <div className="bg-slate-50 text-slate-800 min-h-screen selection:bg-emerald-600 selection:text-white font-sans">
      
      {/* 1. HERO SECTION (CRISP LIGHT THEME) */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-200/90 bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-300 shadow-xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>FrameForge Engineering • Custom Full-Stack Web Development</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Custom Full-Stack Web Applications <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700">
              Built for Production & Scale.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            I design and engineer custom full-stack web platforms using <strong>React, Node.js, Express, and MongoDB/PostgreSQL</strong>. Explore 5 live interactive demos below, inspect our clean component architecture, and request a tailored quote for your next product launch.
          </p>

          {/* Core Trust Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 5 Live Deployed Demos
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Interactive sample workflows
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sample full-stack architecture
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Full Source Code Handover
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quote"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/20 transition-all hover:scale-105 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Request a Project Quote</span>
            </a>
            <a
              href="#demos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <span>Explore 5 Live Demos</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. CONCRETE DELIVERABLES SECTION */}
      <section id="deliverables" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200/90">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Concrete Full-Stack Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What I Deliver in Every Application
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            These are examples of common deliverables. The final scope, implementation, and verification plan are agreed for each project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Responsive Frontend Interface</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mobile-first, high-performance UI created with modern React and Tailwind CSS. Clean component breakdown, interactive states, accessible inputs, and keyboard navigation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-500/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Modular REST / API Backend</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Express.js & Node.js server architecture with controller-service separation, schema validation middleware, rate limiting, and structured error responses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Database Design & Modeling</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Schema design for MongoDB (Mongoose) or PostgreSQL (Prisma/pg). Optimized query indexing, relational data references, and atomic transaction protection.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Authentication & Role-Based Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Secure user authentication using hashed credentials (bcrypt) and signed JWT tokens. Granular multi-role RBAC (Customer, Staff, Manager, Admin) preventing privilege leaks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-cyan-500/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-200">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Cloud Deployment & SSL Setup</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full deployment to Vercel, Render, Railway, or AWS. Environment secrets configuration, automated CI/CD continuous deployment from Git, and custom domain linking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Full Source Code Handover</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clean, well-commented Git repository transfer with complete intellectual property ownership. Comprehensive README setup instructions, .env.example, and seed data.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 5 LIVE DEMO SHOWCASE CARDS (LIGHT ELEGANCE) */}
      <section id="demos" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200/90">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Interactive Demonstrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore 5 Deployed Full-Stack Applications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Each application below is an interactive technical demonstration built with React and Node.js to showcase responsive UI craft, state handling, and simulated booking or inquiry user journeys.
          </p>
        </div>

        <div className="space-y-8">
          {demoProjects.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.id}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 hover:border-slate-300 transition-all shadow-sm hover:shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Overview Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-bold text-slate-500 font-mono">Demo 0{idx + 1}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${p.badgeColor}`}>
                      {p.industry}
                    </span>
                    <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      Sample Data • Illustrative Project
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${p.iconBg}`}>
                      <IconComponent className={`w-5 h-5 ${p.accentColor}`} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Purpose:</strong> {p.purpose}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Key Working Capabilities:</span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {p.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action & Launch Card */}
                <div className="lg:col-span-5 bg-slate-50/90 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Interactive Demo Link</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Explore the sample workflows. Booking, inquiry, ordering, and account actions use demo data; check each app for details.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {p.internalRoute ? (
                      <>
                        <Link
                          to={p.demoUrl}
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                        >
                          <span>Launch UrbanNest Catalog</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          to="/demo/urbannest"
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300 shadow-xs transition-all"
                        >
                          <span>UrbanNest Marketplace Homepage</span>
                        </Link>
                      </>
                    ) : (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                      >
                        <span>Launch Live Demo Application</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span>Clean Source Code in Repo</span>
                    <span className="text-emerald-700 font-semibold">Demo Flow Examples</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE APPLICATION WALKTHROUGHS SECTION */}
      <section id="walkthroughs" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200/90">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Step-by-Step Flow Audits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Interactive Walkthroughs & User Journeys
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Follow suggested demo paths for the customer experience and management views. The projects use illustrative data.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {walkthroughs.map((w, idx) => (
            <button
              key={w.id}
              onClick={() => setActiveWalkthrough(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeWalkthrough === idx
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {w.name}
            </button>
          ))}
        </div>

        {/* Selected Walkthrough Card */}
        {(() => {
          const item = walkthroughs[activeWalkthrough];
          return (
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
              <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2 inline-block">
                    {item.industry}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">{item.tagline}</p>
                </div>
                <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 p-3 rounded-xl max-w-xs">
                  <span className="font-bold text-slate-700 block mb-0.5">Key Technical Craft:</span>
                  <span>{item.highlight}</span>
                </div>
              </div>

              {/* Two Column Steps: Customer Flow vs Admin Flow */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Customer Flow Column */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm border-b border-slate-200 pb-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">1</span>
                    <span>Example Customer Flow</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-700">
                    {item.customerSteps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    {item.internal ? (
                      <Link
                        to={item.customerUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                      >
                        <span>Test Customer Flow</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <a
                        href={item.customerUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                      >
                        <span>Test Customer Flow</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Admin Management Column */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-200 pb-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">2</span>
                    <span>Role-Protected Admin & Staff View</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-700">
                    {item.adminSteps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    {item.internal ? (
                      <Link
                        to={item.adminUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition shadow-xs"
                      >
                        <span>Test Admin Credentials</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <a
                        href={item.adminUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition shadow-xs"
                      >
                        <span>Test Admin Credentials</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 4. HOW I WORK SECTION */}
      <section id="workflow" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200/90">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Structured Engineering Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How I Work — From Discovery to Handover
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Transparent, milestone-based full-stack delivery so you stay in complete control of timeline, budget, and features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block">01</span>
            <h3 className="text-base font-bold text-slate-900">Discovery & Scope Definition</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We review your user journeys, wireframes, and business rules. I provide an itemized deliverables breakdown so expectations are aligned before coding begins.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 inline-block">02</span>
            <h3 className="text-base font-bold text-slate-900">Architecture & Schema Design</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              I draft database models, API endpoint contracts, authentication flow, and component hierarchy to avoid costly rework later in development.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200 inline-block">03</span>
            <h3 className="text-base font-bold text-slate-900">Iterative Development & Staging</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              I build the frontend and backend simultaneously, providing live testable staging links at each milestone so you can interact with working features.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 inline-block">04</span>
            <h3 className="text-base font-bold text-slate-900">Quality Review & Automated Testing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Core endpoints, authentication routes, and transaction calculations are verified with automated test suites. Cross-browser and mobile responsive audits are completed.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 inline-block">05</span>
            <h3 className="text-base font-bold text-slate-900">Cloud Deployment & Production Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We connect your production database and deploy frontend/API with SSL encryption, environment secrets, and automated continuous deployment (CI/CD).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 inline-block">06</span>
            <h3 className="text-base font-bold text-slate-900">Clean Handover & Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You receive complete intellectual property ownership of the repository, environment documentation, database seed scripts, and post-delivery revision assistance.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SERVICE TIERS & PACKAGES */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200/90">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Fiverr Service Packages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparent Deliverable Tiers
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Scope is defined in concrete deliverables rather than vague promises. Pricing and turnaround timelines can be tailored to your specific project needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Starter Tier */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                Starter Tier
              </span>
              <h3 className="text-xl font-bold text-slate-900">Frontend MVP Prototype</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ideal for validating product concepts, investor pitch prototypes, or single-page landing workflows with interactive mock data.
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-800 block">Pricing & delivery:</span>
                <span>Agreed after reviewing the requested scope.</span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase text-slate-600">Included Deliverables:</span>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Responsive React + Tailwind CSS UI</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Mobile, Tablet & Desktop Layouts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Interactive Mock Datasets & State</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Cloud Deployment (Vercel)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Source Code Handover via GitHub</li>
                </ul>
              </div>
            </div>

            <a
              href="#quote"
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider text-center border border-slate-300 transition"
            >
              Select Starter Scope
            </a>
          </div>

          {/* Standard Tier (Highlighted) */}
          <div className="rounded-3xl bg-white border-2 border-emerald-600 p-8 flex flex-col justify-between space-y-6 relative shadow-xl shadow-emerald-600/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-sm">
              Most Popular for Full-Stack MVPs
            </div>

            <div className="space-y-4 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Standard Tier
              </span>
              <h3 className="text-xl font-bold text-slate-900">Full-Stack Web Application</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-stack application scope with a database, authenticated accounts, and validated inquiry or booking forms.
              </p>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-slate-700">
                <span className="font-semibold text-slate-800 block">Pricing & delivery:</span>
                <span>Agreed after reviewing the requested scope.</span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase text-slate-600">Included Deliverables:</span>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Everything in Starter Tier</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Node.js / Express.js REST API</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> MongoDB / PostgreSQL Database</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> User Authentication (JWT + bcrypt)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Contact / Booking Intake with Validation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Automated Test Suite on Key Routes</li>
                </ul>
              </div>
            </div>

            <a
              href="#quote"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider text-center shadow-md shadow-emerald-600/30 transition hover:scale-[1.02]"
            >
              Select Standard Scope
            </a>
          </div>

          {/* Premium Tier */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                Premium Tier
              </span>
              <h3 className="text-xl font-bold text-slate-900">Custom Multi-Role Platform</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-scale web platform featuring multi-role RBAC, administrator analytics dashboards, complex scheduling, or marketplace dynamics.
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-800 block">Pricing & delivery:</span>
                <span>Agreed after reviewing the requested scope.</span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase text-slate-600">Included Deliverables:</span>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Everything in Standard Tier</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Multi-Role RBAC (Admin, Staff, Client)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Custom Admin Dashboard & Lead CRM</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> CSV Export & Searchable Data Tables</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Complex Business Logic & Calculators</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 14 Days Post-Delivery Support</li>
                </ul>
              </div>
            </div>

            <a
              href="#quote"
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider text-center border border-slate-300 transition"
            >
              Select Premium Scope
            </a>
          </div>

        </div>
      </section>

      {/* 6. CONCISE FAQ SECTION */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200/90">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Client FAQ
          </h2>
          <p className="text-sm text-slate-600">
            Clear answers about communication, technical scope, delivery, and commercial handover.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-emerald-700 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. INTERACTIVE "REQUEST A QUOTE" CONSULTATION FORM (LIGHT THEME) */}
      <section id="quote" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                Direct Consultation
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Request a Custom Full-Stack Quote
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Describe your project requirements, target timeline, and deliverables. This portfolio form is a front-end demo and does not send or store your submission. Use Fiverr messaging for a real inquiry.
              </p>
            </div>

            {quoteSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 shadow-sm">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-bold text-slate-900">Demo Preview Created</h3>
                <p className="text-xs text-emerald-800">
                  This sample confirmation was generated in your browser only. No inquiry was sent. Demo reference:
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-white font-mono text-sm font-black text-emerald-700 border border-emerald-300 shadow-xs">
                  {quoteSuccess.refCode}
                </div>
                <div className="text-left bg-white p-4 rounded-xl text-xs space-y-1.5 text-slate-700 max-w-md mx-auto border border-emerald-200 shadow-xs">
                  <p><strong>Project Type:</strong> {quoteSuccess.projectType}</p>
                  <p><strong>Target Timeline:</strong> {quoteSuccess.timeline}</p>
                  <p><strong>Selected Deliverables:</strong> {quoteSuccess.deliverables.join(', ')}</p>
                </div>
                <p className="text-xs text-slate-600">
                  For a real project inquiry, use the Fiverr message link below. This demo reference is not delivered to FrameForge.
                </p>
                <button
                  onClick={() => setQuoteSuccess(null)}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition shadow-sm"
                >
                  Submit Another Project Scope
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                
                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sample Name (Demo Only) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sample Email (Demo Only) *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                    />
                  </div>
                </div>

                {/* Project niche & Timeline row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project Industry / Format</label>
                    <select
                      value={quoteForm.projectType}
                      onChange={(e) => setQuoteForm({ ...quoteForm, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition cursor-pointer"
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Delivery Timeline</label>
                    <select
                      value={quoteForm.timeline}
                      onChange={(e) => setQuoteForm({ ...quoteForm, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition cursor-pointer"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Required Deliverables (Select all that apply)</label>
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
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <span>{item}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project Overview & Specific Features</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you are building, any reference websites, key user roles, or custom workflows needed..."
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <span>Generating Demo Preview...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                    <span>Preview Demo Quote (Not Sent)</span>
                    </>
                  )}
                </button>

                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider text-center">
                    Ready to discuss a real project?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="https://www.fiverr.com/inbox"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition cursor-pointer"
                    >
                      <span>💬 Message & Order on Fiverr</span>
                    </a>
                    <a
                      href="#demos"
                      className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                    >
                      <span>🔍 Explore Live Demos & Code</span>
                    </a>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 text-center leading-relaxed">
                    Demo clarification: these applications use sample data. Some payment, notification, booking, and pass flows are simulations and do not create real transactions or appointments.
                  </div>
                </div>

              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
