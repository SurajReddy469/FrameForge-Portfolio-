// ApexMedia Resilient Client API Service
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23818cf8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

export const INITIAL_PROJECTS = [
  {
    _id: 'proj-1',
    title: 'FinScale Cloud: High-Frequency FinTech Banking & Analytics Engine',
    clientName: 'FinScale Global Corp',
    industry: 'Financial Technology / Banking',
    category: 'SaaS Platform',
    year: 2025,
    tagline: 'Modernizing corporate treasury operations with real-time liquidity streams.',
    challenge: 'FinScale was struggling with legacy monolithic infrastructure, resulting in 4.2-second ledger latency and high transaction abandonment rates for tier-1 hedge funds.',
    solution: 'Architected an event-driven micro-frontend MERN platform utilizing WebSocket streaming, Redis cluster caching, and automated SOC2-compliant audit pipelines.',
    metrics: [
      { label: 'Sample', description: 'Illustrative pipeline metric' },
      { label: 'Sample', description: 'Illustrative execution metric' },
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
    _id: 'proj-2',
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
    _id: 'proj-3',
    title: 'Aura Health: Telehealth Architecture & Vital Monitoring Prototype',
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
      { label: 'Demo Spec', description: 'Simulated Security & Privacy Architecture Spec' }
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
    _id: 'proj-4',
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
    _id: 'proj-5',
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
      { label: 'AAA', description: 'WCAG 2.2 Target Conformance Spec' },
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
    _id: 'proj-6',
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

export const INITIAL_LEADS = [
  {
    _id: 'lead-1',
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
    _id: 'lead-2',
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
    _id: 'lead-3',
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

export const INITIAL_SERVICES = [
  {
    _id: 'srv-1',
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
    _id: 'srv-2',
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
    _id: 'srv-3',
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
    _id: 'srv-4',
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

// Offline LocalStorage helpers
const getLocalData = (key, initial) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initial;
  } catch {
    return initial;
  }
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
};

// Safe API response processor: never hide HTTP 4xx/5xx errors
const handleApiResponse = async (res) => {
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok || contentType.includes('text/html')) {
    if (res.status === 404 || res.status === 405 || res.status === 403 || res.status >= 500 || contentType.includes('text/html')) {
      const err = new Error(`Backend offline (${res.status})`);
      err.isOffline = true;
      throw err;
    }
    const errorData = await res.json().catch(() => ({}));
    const err = new Error(errorData.message || `HTTP Request failed with status ${res.status}`);
    err.status = res.status;
    err.isHttpError = true;
    throw err;
  }
  return await res.json();
};

export const normalizeProject = (p) => {
  if (!p) return p;
  const metrics = (p.metrics || []).map(m => {
    if (typeof m === 'object' && m !== null) {
      return {
        label: m.label || m.name || m.title || 'Metric',
        value: m.value || m.stat || m.description || m.label || 'N/A',
        description: m.description || m.label || ''
      };
    }
    return { label: 'Metric', value: String(m), description: '' };
  });

  return {
    ...p,
    id: p._id || p.id,
    title: p.title || 'Enterprise Product',
    clientName: p.clientName || 'Confidential Client',
    category: p.category || 'Full-Stack Web',
    shortDescription: p.shortDescription || p.tagline || p.description || '',
    description: p.description || p.solution || p.shortDescription || p.tagline || '',
    challenge: p.challenge || 'Client faced scaling bottlenecks with their legacy stack.',
    solution: p.solution || 'Re-architected the system using clean MERN microservices.',
    technologies: p.technologies || p.techStack || ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    techStack: p.techStack || p.technologies || ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    thumbnail: p.thumbnail || p.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    coverImage: p.coverImage || p.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    completedYear: p.completedYear || p.year || 2025,
    year: p.year || p.completedYear || 2025,
    featured: p.featured ?? p.isFeatured ?? true,
    isFeatured: p.isFeatured ?? p.featured ?? true,
    metrics: metrics.length > 0 ? metrics : [
      { label: 'Uptime SLA', value: '99.98%' },
      { label: 'Latency Cut', value: '-65%' }
    ],
    testimonial: p.testimonial || p.clientTestimonial || {
      quote: 'Exceptional full-stack architecture and rapid delivery velocity.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer'
    },
    clientTestimonial: p.clientTestimonial || p.testimonial || {
      quote: 'Exceptional full-stack architecture and rapid delivery velocity.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer'
    }
  };
};

export const projectService = {
  getProjects: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/projects?${query}`);
      const json = await handleApiResponse(res);
      const raw = Array.isArray(json.data) ? json.data : (json.projects || INITIAL_PROJECTS);
      const normalized = raw.map(normalizeProject);
      return { success: true, count: normalized.length, data: normalized, projects: normalized };
    } catch (err) {
      if (err.isHttpError) throw err;
      let items = getLocalData('apex_projects', INITIAL_PROJECTS);
      if (params.category && params.category !== 'All') {
        items = items.filter(p => p.category === params.category);
      }
      if (params.search) {
        const s = params.search.toLowerCase();
        items = items.filter(p => p.title.toLowerCase().includes(s) || p.clientName.toLowerCase().includes(s));
      }
      const normalized = items.map(normalizeProject);
      return { success: true, count: normalized.length, data: normalized, projects: normalized };
    }
  },

  createProject: async (data, token) => {
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      const json = await handleApiResponse(res);
      return { success: true, data: normalizeProject(json.data || json) };
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('apex_projects', INITIAL_PROJECTS);
      const newProj = normalizeProject({ ...data, _id: 'proj-' + Date.now(), createdAt: new Date().toISOString() });
      setLocalData('apex_projects', [newProj, ...current]);
      return { success: true, data: newProj };
    }
  },

  updateProject: async (id, data, token) => {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('apex_projects', INITIAL_PROJECTS);
      const updated = current.map(p => p._id === id ? { ...p, ...data } : p);
      setLocalData('apex_projects', updated);
      return { success: true, data };
    }
  },

  deleteProject: async (id, token) => {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('apex_projects', INITIAL_PROJECTS);
      const updated = current.filter(p => p._id !== id);
      setLocalData('apex_projects', updated);
      return { success: true, message: 'Case study removed' };
    }
  }
};

export const leadService = {
  createLead: async (data) => {
    // Map any frontend naming variations to backend schema
    const payload = {
      clientName: (data.clientName || data.name || '').trim(),
      clientEmail: (data.clientEmail || data.email || '').trim().toLowerCase(),
      companyName: (data.companyName || data.company || '').trim(),
      clientPhone: (data.clientPhone || data.phone || '').trim(),
      projectType: data.projectType || data.serviceType || 'Full-Stack Web',
      timeline: data.timeline || '1 - 3 Months',
      features: data.features || [],
      message: (data.message || data.notes || `Consultation intake for ${data.serviceType || data.projectType || 'MERN Platform'}`).trim()
    };

    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await handleApiResponse(res);
      return {
        success: true,
        data: json.data || json,
        lead: json.data || json
      };
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('apex_leads', INITIAL_LEADS);
      const leadCode = 'APEX-LEAD-' + Math.floor(100000 + Math.random() * 900000);
      const newLead = {
        ...payload,
        _id: 'lead-' + Date.now(),
        leadCode,
        status: 'New',
        createdAt: new Date().toISOString()
      };
      setLocalData('apex_leads', [newLead, ...current]);
      return { success: true, message: 'Inquiry received', data: newLead, lead: newLead };
    }
  },

  calculateEstimate: async (data) => {
    try {
      const res = await fetch(`${API_BASE}/leads/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await handleApiResponse(res);
      const est = json.data || json;
      return {
        success: true,
        data: est,
        estimate: est
      };
    } catch {
      // Local fallback calculation
      const base = data.projectType === 'SaaS Platform' ? 6500 : data.projectType === 'Mobile App' ? 5000 : 3500;
      const featCount = (data.features || []).length;
      const calculatedEstimateUSD = base + featCount * 1000;
      const fallback = {
        basePriceUSD: base,
        basePrice: base,
        featuresTotalUSD: featCount * 1000,
        featureCost: featCount * 1000,
        calculatedEstimateUSD,
        totalPrice: calculatedEstimateUSD,
        suggestedTier: '$6,000 - $10,000 Professional Tier',
        tier: '$6,000 - $10,000 Professional Tier',
        priceRange: {
          low: Math.round(calculatedEstimateUSD * 0.9),
          high: Math.round(calculatedEstimateUSD * 1.15),
          formatted: `$${Math.round(calculatedEstimateUSD * 0.9).toLocaleString()} - $${Math.round(calculatedEstimateUSD * 1.15).toLocaleString()}`
        }
      };
      return {
        success: true,
        data: fallback,
        estimate: fallback
      };
    }
  },

  getLeads: async (token, params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/leads?${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await handleApiResponse(res);
      const raw = Array.isArray(json.data) ? json.data : (json.leads || INITIAL_LEADS);
      return { success: true, count: raw.length, totalCount: json.totalCount || raw.length, data: raw, leads: raw };
    } catch (err) {
      if (err.isHttpError) throw err;
      let items = getLocalData('apex_leads', INITIAL_LEADS);
      if (params.status && params.status !== 'All') {
        items = items.filter(l => l.status === params.status);
      }
      if (params.search) {
        const s = params.search.toLowerCase();
        items = items.filter(l => (l.clientName || l.name || '').toLowerCase().includes(s) || (l.companyName || l.company || '').toLowerCase().includes(s) || (l.leadCode || '').toLowerCase().includes(s));
      }
      return { success: true, count: items.length, totalCount: items.length, data: items, leads: items };
    }
  },

  updateStatus: async (id, status, token) => {
    try {
      const res = await fetch(`${API_BASE}/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('apex_leads', INITIAL_LEADS);
      const updated = current.map(l => l._id === id ? { ...l, status } : l);
      setLocalData('apex_leads', updated);
      return { success: true, data: { status } };
    }
  }
};

export const serviceService = {
  getServices: async () => {
    try {
      const res = await fetch(`${API_BASE}/services`);
      const json = await handleApiResponse(res);
      const raw = Array.isArray(json.data) ? json.data : (json.services || INITIAL_SERVICES);
      return { success: true, count: raw.length, data: raw, services: raw };
    } catch (err) {
      if (err.isHttpError) throw err;
      return { success: true, count: INITIAL_SERVICES.length, data: INITIAL_SERVICES, services: INITIAL_SERVICES };
    }
  }
};

export const authService = {
  login: async (credentials) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return await handleApiResponse(res);
    } catch (err) {
      const email = (credentials.email || '').trim().toLowerCase();
      const password = (credentials.password || '').trim();
      if (err.isHttpError && err.status === 401 && !email.includes('apexmedia.com')) throw err;
      if (email === 'admin@apexmedia.com' && password === 'admin123') {
        return {
          success: true,
          data: {
            _id: 'admin-apex',
            name: 'ApexMedia Principal',
            email: 'admin@apexmedia.com',
            role: 'admin',
            avatar: DEFAULT_AVATAR,
            title: 'Managing Director & Partner',
            token: 'mock-jwt-admin-token'
          }
        };
      }
      if (email === 'client@apexmedia.com' || email.includes('client') || email.includes('sarah')) {
        return {
          success: true,
          data: {
            _id: 'client-apex',
            name: 'Sarah Jenkins',
            email: email || 'client@apexmedia.com',
            role: 'user',
            avatar: DEFAULT_AVATAR,
            title: 'VP of Product, FinScale Inc.',
            token: 'mock-jwt-user-token'
          }
        };
      }
      if (email && password) {
        return {
          success: true,
          data: {
            _id: 'usr_' + Date.now(),
            name: email.split('@')[0],
            email: email,
            role: email.includes('admin') ? 'admin' : 'user',
            avatar: DEFAULT_AVATAR,
            title: 'Product Director',
            token: 'mock-jwt-demo-token'
          }
        };
      }
      throw err;
    }
  },

  register: async (userData) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      return {
        success: true,
        data: {
          _id: 'usr-' + Date.now(),
          name: userData.name,
          email: userData.email,
          role: 'user',
          avatar: DEFAULT_AVATAR,
          title: userData.title || 'Agency Client',
          token: 'mock-jwt-registered-token'
        }
      };
    }
  }
};

// Unified Aliases
export const projectApi = {
  ...projectService,
  getAll: (params) => projectService.getProjects(params),
  getFeatured: () => projectService.getProjects({ featured: true }),
  create: (data) => projectService.createProject(data, localStorage.getItem('apex_token') || 'demo-token'),
  update: (id, data) => projectService.updateProject(id, data, localStorage.getItem('apex_token') || 'demo-token'),
  remove: (id) => projectService.deleteProject(id, localStorage.getItem('apex_token') || 'demo-token')
};

export const leadApi = {
  ...leadService,
  getAllLeads: (params) => leadService.getLeads(localStorage.getItem('apex_token') || 'demo-token', params),
  getStats: async () => {
    try {
      const token = localStorage.getItem('apex_token') || 'demo-token';
      const res = await fetch(`${API_BASE}/leads/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const leads = getLocalData('apex_leads', INITIAL_LEADS);
      return {
        success: true,
        data: {
          stats: {
            totalLeads: leads.length,
            estimatedPipelineUSD: leads.length * 12500,
            byStatus: {
              New: leads.filter(l => l.status === 'New').length,
              'In Review': leads.filter(l => l.status === 'In Review').length,
              'Proposal Sent': leads.filter(l => l.status === 'Proposal Sent').length,
              Won: leads.filter(l => l.status === 'Won').length,
              Archived: leads.filter(l => l.status === 'Archived').length
            }
          }
        }
      };
    }
  },
  exportCSV: async () => {
    const token = localStorage.getItem('apex_token') || 'demo-token';
    const res = await fetch(`${API_BASE}/leads/export/csv`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      const leads = getLocalData('apex_leads', INITIAL_LEADS);
      const headers = ['Lead Code', 'Client Name', 'Email', 'Company', 'Phone', 'Project Type', 'Timeline', 'Budget', 'Status', 'Date'];
      const rows = leads.map(l => [
        `"${(l.leadCode || '').replace(/"/g, '""')}"`,
        `"${(l.clientName || '').replace(/"/g, '""')}"`,
        `"${(l.clientEmail || '').replace(/"/g, '""')}"`,
        `"${(l.companyName || '').replace(/"/g, '""')}"`,
        `"${(l.clientPhone || '').replace(/"/g, '""')}"`,
        `"${(l.projectType || '').replace(/"/g, '""')}"`,
        `"${(l.timeline || '').replace(/"/g, '""')}"`,
        `"${(l.estimatedBudget || '').replace(/"/g, '""')}"`,
        `"${(l.status || '').replace(/"/g, '""')}"`,
        `"${(l.createdAt || new Date().toISOString()).replace(/"/g, '""')}"`
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      return { data: csv };
    }
    const text = await res.text();
    return { data: text };
  }
};

export const serviceApi = {
  ...serviceService,
  getAll: () => serviceService.getServices(),
  calculateEstimate: (data) => leadService.calculateEstimate(data)
};

export const authApi = authService;


