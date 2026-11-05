require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
const Lead = require('../models/Lead');
const Service = require('../models/Service');

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23818cf8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

const sampleUsers = [
  {
    name: 'FrameForge Principal',
    email: 'admin@apexmedia.com',
    password: 'admin123',
    role: 'admin',
    avatar: DEFAULT_AVATAR,
    title: 'Managing Director & Partner'
  },
  {
    name: 'Sarah Jenkins',
    email: 'client@apexmedia.com',
    password: 'client123',
    role: 'user',
    avatar: DEFAULT_AVATAR,
    title: 'VP of Product, FinScale Inc.'
  }
];

const sampleProjects = [
  {
    title: 'FinScale Cloud: High-Frequency FinTech Banking & Analytics Engine',
    clientName: 'FinScale Global Corp',
    industry: 'Financial Technology / Banking',
    category: 'SaaS Platform',
    year: 2025,
    tagline: 'Modernizing corporate treasury operations with real-time liquidity streams.',
    challenge: 'FinScale was struggling with legacy monolithic infrastructure, resulting in 4.2-second ledger latency and high transaction abandonment rates for tier-1 hedge funds.',
    solution: 'Architected an event-driven micro-frontend MERN platform utilizing WebSocket streaming, Redis cluster caching, and automated SOC2-compliant audit pipelines.',
    metrics: [
      { label: '$2.4M', description: 'Monthly Pipeline ARR Unlocked' },
      { label: '14ms', description: 'Global Execution Latency (down from 4.2s)' },
      { label: '99.99%', description: 'Uptime SLA Maintained' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://finscale-demo.example.com',
    techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Redis', 'WebSockets', 'AWS'],
    isFeatured: true,
    clientTestimonial: {
      quote: 'ApexMedia did not just write code; they fundamentally transformed our core product roadmap and unlocked our Series B funding round.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer, FinScale'
    }
  },
  {
    title: 'Veloce Motors: Interactive 3D Luxury EV Vehicle Configurator',
    clientName: 'Veloce Automotive Group',
    industry: 'Automotive / E-commerce',
    category: 'Full-Stack Web',
    year: 2025,
    tagline: 'Hyper-personalized digital showroom powering direct-to-consumer reservations.',
    challenge: 'High customer drop-off during traditional dealership inquiries; buyers demanded photorealistic paint, interior, and powertrain customizations directly on mobile browsers.',
    solution: 'Built a lightweight WebGL/Three.js integrated React application paired with serverless Express APIs for real-time inventory reservation and finance pre-approvals.',
    metrics: [
      { label: '+310%', description: 'Test Drive Booking Conversions' },
      { label: '62,000+', description: 'Digital Pre-orders Generated' },
      { label: '98/100', description: 'Google Lighthouse Performance Score' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://veloce-configurator.example.com',
    techStack: ['React', 'Three.js', 'Node.js', 'Tailwind CSS', 'Stripe API', 'Cloudinary'],
    isFeatured: true,
    clientTestimonial: {
      quote: 'The visual fidelity and checkout speed achieved by the ApexMedia team blew our executive board away. Simply world-class.',
      author: 'Elena Rostova',
      role: 'Head of Global Brand & Digital, Veloce'
    }
  },
  {
    title: 'Aura Health: HIPAA-Compliant Telehealth & Vital Monitoring Suite',
    clientName: 'Aura Digital Healthcare',
    industry: 'HealthTech / Telemedicine',
    category: 'Mobile App',
    year: 2024,
    tagline: 'Connecting patients with board-certified physicians in under 3 minutes.',
    challenge: 'Patients encountered frustrating appointment booking bottlenecks and unreliable video call dropouts during critical triage consultations.',
    solution: 'Constructed an end-to-end encrypted WebRTC telehealth portal with integrated electronic health record (EHR) sync and asynchronous chat queues.',
    metrics: [
      { label: '4.9 ★', description: 'Average Patient Satisfaction Score' },
      { label: '85,000+', description: 'Monthly Virtual Consultations' },
      { label: '100%', description: 'HIPAA & GDPR Compliance Audit Passed' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://aura-health.example.com',
    techStack: ['React Native', 'Node.js', 'Express', 'WebRTC', 'MongoDB', 'Docker'],
    isFeatured: true,
    clientTestimonial: {
      quote: 'Their deep understanding of healthcare compliance and buttery-smooth video integration gave us an immense competitive edge.',
      author: 'Dr. Arthur Pendelton',
      role: 'Chief Medical Officer, Aura Health'
    }
  },
  {
    title: 'HyperLogix: Autonomous Global Freight & Logistics Control Tower',
    clientName: 'HyperLogix Supply Networks',
    industry: 'Logistics & Supply Chain',
    category: 'Cloud & AI',
    year: 2024,
    tagline: 'Predictive port delay forecasting and automated customs customs clearance.',
    challenge: 'Container backlog at major sea ports caused millions in demurrage penalties and lack of real-time multi-modal visibility.',
    solution: 'Designed an enterprise MERN portal with interactive route topology maps, automated document extraction OCR, and predictive ETA models.',
    metrics: [
      { label: '$4.1M', description: 'Saved in Annual Demurrage Penalties' },
      { label: '-45%', description: 'Reduction in Customs Processing Delays' },
      { label: '18,400', description: 'Active Global Freight Vessels Monitored' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://hyperlogix-control.example.com',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mapbox GL', 'Python AI APIs'],
    isFeatured: false,
    clientTestimonial: {
      quote: 'ApexMedia simplified an extraordinarily complex multi-carrier data stream into a crystal-clear operational cockpit.',
      author: 'Kavita Patel',
      role: 'Director of Operations, HyperLogix'
    }
  },
  {
    title: 'Kinetix Design: Spatial Design System & Multi-Platform Component Library',
    clientName: 'Kinetix Interactive Studios',
    industry: 'Design & Media Production',
    category: 'Brand & UI/UX',
    year: 2025,
    tagline: 'Unified multi-platform token design system powering 14 agency web products.',
    challenge: 'Inconsistent brand visual rhythm, fragmented component repos, and slow engineering velocity across disparate engineering squads.',
    solution: 'Crafted an atomic design system with automated Figma-to-React token pipelines, WCAG AAA accessibility, and dark/light ambient tokens.',
    metrics: [
      { label: '3.5x', description: 'Faster Engineering Sprint Velocity' },
      { label: '100%', description: 'WCAG 2.2 AAA Accessibility Conformance' },
      { label: '14 Apps', description: 'Standardized on One Design Core' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://kinetix-design.example.com',
    techStack: ['React', 'Tailwind CSS', 'Storybook', 'Figma Tokens', 'TypeScript'],
    isFeatured: false,
    clientTestimonial: {
      quote: 'Our development team now ships production UI features in days instead of weeks thanks to Kinetix design tokens.',
      author: 'Julian Dubois',
      role: 'Creative Director, Kinetix'
    }
  },
  {
    title: 'CloudSync: Enterprise Developer DevSecOps & Security Observability',
    clientName: 'CloudSync Technologies',
    industry: 'Developer Tools & Cybersecurity',
    category: 'SaaS Platform',
    year: 2025,
    tagline: 'Unified container vulnerability scanning and real-time posture reporting.',
    challenge: 'DevOps teams overwhelmed by noisy vulnerability reports unable to prioritize zero-day dependency threats in CI/CD pipelines.',
    solution: 'Built an ultra-responsive dark-mode dashboard with interactive dependency graphs, instant remediation PRs, and RBAC team scopes.',
    metrics: [
      { label: '+420%', description: 'Productivity Lift for Security Teams' },
      { label: '1.2M', description: 'Containers Scanned per Day' },
      { label: 'Zero', description: 'False-Positive Alert Backlog' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://cloudsync-sec.example.com',
    techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Docker', 'GraphQL'],
    isFeatured: true,
    clientTestimonial: {
      quote: 'The UX of CloudSync makes high-stakes security posture accessible to any engineer on our team.',
      author: 'Alexandre Renoir',
      role: 'Head of Infrastructure, CloudSync'
    }
  }
];

const sampleServices = [
  {
    title: 'B2B SaaS & Web Application Development',
    slug: 'saas-web-development',
    shortDesc: 'Production-ready React & Node.js architectures built for rapid ARR scaling.',
    fullDesc: 'We architect and build full-scale cloud applications featuring robust authentication, multi-tenant databases, Stripe billing, and high-performance React frontends.',
    iconName: 'LayoutGrid',
    startingPriceUSD: 4500,
    typicalTurnaroundWeeks: 4,
    features: [
      'Next.js / React 18 SPA Architecture',
      'Scalable Express.js & MongoDB Backend',
      'Stripe Recurring Billing & Subscriptions',
      'Role-Based Access Control (RBAC)',
      'Automated CI/CD Deployment Pipeline'
    ],
    deliverables: ['Production Web Application', 'Source Code Repository', 'API Documentation', '30-Day Post-Launch Support'],
    isPopular: true
  },
  {
    title: 'Cross-Platform Mobile App Engineering',
    slug: 'mobile-app-engineering',
    shortDesc: 'Native performance on iOS and Android with single-codebase velocity.',
    fullDesc: 'High-polish mobile applications designed with fluid gestures, offline data caching, biometrics, push notifications, and App Store / Play Store submission support.',
    iconName: 'Smartphone',
    startingPriceUSD: 5000,
    typicalTurnaroundWeeks: 5,
    features: [
      'React Native / Expo Architecture',
      'Offline-First Redux & Async Storage',
      'Push Notifications & Deep Linking',
      'Biometric FaceID / Fingerprint Auth',
      'App Store & Play Store Submissions'
    ],
    deliverables: ['iOS & Android Production Builds', 'Store Submission Assets', 'Crashlytics Integration'],
    isPopular: false
  },
  {
    title: 'High-Conversion Design Systems & UI/UX',
    slug: 'design-systems-uiux',
    shortDesc: 'Pixel-perfect digital experiences that captivate buyers and maximize conversions.',
    fullDesc: 'End-to-end design sprints covering user research, interactive Figma prototypes, motion design, WCAG AAA accessibility, and drop-in Tailwind component tokens.',
    iconName: 'Palette',
    startingPriceUSD: 3000,
    typicalTurnaroundWeeks: 3,
    features: [
      'Comprehensive Figma Component System',
      'Interactive Clickable Prototypes',
      'Tailwind CSS Token Mapping',
      'WCAG 2.2 AAA Accessibility Audit',
      'Responsive Mobile & Tablet Layouts'
    ],
    deliverables: ['Full Figma Source File', 'Tailwind Design System Tokens', 'UX Research Report'],
    isPopular: false
  },
  {
    title: 'AI Integration & Cloud Microservices',
    slug: 'ai-cloud-microservices',
    shortDesc: 'Supercharge your existing platform with LLMs, RAG, and high-throughput APIs.',
    fullDesc: 'Custom AI agent pipelines, vector database search, automated customer workflows, and resilient cloud architectures designed for zero-downtime scalability.',
    iconName: 'Cpu',
    startingPriceUSD: 6000,
    typicalTurnaroundWeeks: 4,
    features: [
      'OpenAI & Gemini API Agent Workflows',
      'Vector Embeddings & Semantic Search (Pinecone)',
      'High-Concurrency Redis Caching',
      'Automated Background Worker Queues',
      'SOC2 Ready Security & Rate Limiting'
    ],
    deliverables: ['AI Microservice API', 'Vector Index Configuration', 'Load Testing Report'],
    isPopular: true
  }
];

const sampleLeads = [
  {
    leadCode: 'APEX-LEAD-849102',
    clientName: 'David Sterling',
    clientEmail: 'david.s@sterlingtech.io',
    companyName: 'Sterling Tech Ventures',
    clientPhone: '+1 (415) 890-2341',
    projectType: 'SaaS Platform',
    timeline: '1 - 3 Months',
    estimatedBudget: '$10,000 - $15,000 Growth Tier',
    scopeBreakdown: {
      features: ['Authentication & RBAC', 'Payment Processing (Stripe/PayPal)', 'Executive Analytics Dashboard'],
      calculatedEstimateUSD: 10400
    },
    message: 'We are raising our seed round and need an ultra-modern SaaS MVP for our real-time ESG compliance software. Would love to review past case studies and schedule a 30-min discovery call.',
    status: 'Proposal Sent',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    leadCode: 'APEX-LEAD-310492',
    clientName: 'Camilla Moreau',
    clientEmail: 'camilla@moreaudesign.fr',
    companyName: 'Moreau Luxury Goods',
    clientPhone: '+33 6 12 34 56 78',
    projectType: 'Full-Stack Web',
    timeline: '< 1 Month',
    estimatedBudget: '$6,000 - $10,000 Professional Tier',
    scopeBreakdown: {
      features: ['CMS & Content Authoring', 'SEO & Performance Tuning (95+ Lighthouse)'],
      calculatedEstimateUSD: 6885
    },
    message: 'Looking for a bespoke, high-fashion agency website redesign before Paris Fashion Week. Need interactive transitions and high Lighthouse speed scores.',
    status: 'In Review',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    leadCode: 'APEX-LEAD-672194',
    clientName: 'Rajesh Kulkarni',
    clientEmail: 'rajesh.k@omnicloud.in',
    companyName: 'OmniCloud India Pvt Ltd',
    clientPhone: '+91 98450 12345',
    projectType: 'Custom Enterprise',
    timeline: '3 - 6 Months',
    estimatedBudget: '$15,000+ Enterprise Tier',
    scopeBreakdown: {
      features: ['Authentication & RBAC', 'Real-time WebSockets / Chat', 'AI / LLM Integration', 'Executive Analytics Dashboard'],
      calculatedEstimateUSD: 16435
    },
    message: 'Enterprise migration project for our multi-cloud deployment orchestrator. Looking for high-throughput Node.js microservices and clean React dashboard.',
    status: 'Won',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/apexmedia_db');
    console.log('[ApexMedia Seed] Connected to database');

    await User.deleteMany({});
    await Project.deleteMany({});
    await Service.deleteMany({});
    await Lead.deleteMany({});

    await User.create(sampleUsers);
    console.log(`[ApexMedia Seed] Created ${sampleUsers.length} users (Admin & Client)`);

    await Project.create(sampleProjects);
    console.log(`[ApexMedia Seed] Created ${sampleProjects.length} case studies`);

    await Service.create(sampleServices);
    console.log(`[ApexMedia Seed] Created ${sampleServices.length} agency service packages`);

    await Lead.create(sampleLeads);
    console.log(`[ApexMedia Seed] Created ${sampleLeads.length} consultation leads`);

    console.log('[ApexMedia Seed] Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[ApexMedia Seed Error]', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = { sampleProjects, sampleServices, sampleLeads, sampleUsers };
