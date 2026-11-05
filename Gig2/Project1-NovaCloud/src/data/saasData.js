export const navigationLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Architecture', href: '#architecture' },
  { name: 'Cost Calculator', href: '#calculator' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' }
];

export const heroMetrics = [
  { label: 'Uptime SLA', value: '99.999%', sub: 'Zero-downtime rolling deploys' },
  { label: 'Edge Latency', value: '< 12ms', sub: 'Across 310 global edge points' },
  { label: 'Daily Requests', value: '4.8B+', sub: 'Processed with distributed cache' },
  { label: 'Cold-Start Time', value: '18ms', sub: 'Instant microVM hydration' }
];

export const trustedCompanies = [
  'HyperScale AI', 'CloudMatrix', 'ApexLogic', 'PulseData', 'DevVanguard', 'OmniStack'
];

export const codeSnippets = {
  node: {
    language: 'JavaScript / Node',
    command: 'npm i @novacloud/agent-runtime',
    code: `import { createEdgeAgent, Cluster } from '@novacloud/runtime';

// Initialize multi-region autonomous agent cluster
const cluster = new Cluster({
  regions: ['iad1', 'fra1', 'sin1'],
  scalingPolicy: 'predictive-concurrency'
});

export default createEdgeAgent({
  name: 'fintech-recon-worker',
  memory: '512MB',
  maxDurationMs: 60000,
  async handler({ payload, telemetry }) {
    telemetry.span('batch-process');
    const result = await cluster.dispatchParallel(payload.transactions);
    return { status: 200, processed: result.length };
  }
});`
  },
  python: {
    language: 'Python 3.12',
    command: 'pip install novacloud-agent',
    code: `from novacloud import EdgeAgent, AutoCluster

cluster = AutoCluster(regions=["us-east", "eu-central", "ap-southeast"])

@EdgeAgent.register(memory="1024MB", cold_start="instant")
async def handle_agent_inference(context):
    async with cluster.distributed_cache() as cache:
        embeddings = await cache.get_or_compute(context.query)
        res = await cluster.infer_vector(embeddings)
    return {"status": "success", "latency_ms": context.latency}`
  },
  go: {
    language: 'Go 1.23',
    command: 'go get github.com/novacloud/agent-sdk-go',
    code: `package main

import (
  "context"
  "github.com/novacloud/agent-sdk-go/v2/edge"
)

func main() {
  worker := edge.NewWorker(&edge.Config{
    Regions: []string{"iad1", "fra1"},
    MemoryMB: 256,
  })

  worker.Handle(func(ctx context.Context, req *edge.Request) (*edge.Response, error) {
    return edge.JSON(200, map[string]string{
      "status": "active",
      "region": req.Header.Get("x-nova-edge-region"),
    })
  })
}`
  }
};

export const architectureFeatures = [
  {
    id: 'edge-containers',
    title: 'Isolated MicroVMs',
    badge: 'Hardware Virtualization',
    description: 'Each autonomous agent and microservice runs inside an ephemeral Firecracker microVM with sub-20ms boot times and hardware memory sandboxing.',
    metrics: ['18ms cold start', 'Strict tenant isolation', '60% less memory overhead'],
    codeHighlight: 'Firecracker v1.9 + Linux KVM kernel'
  },
  {
    id: 'smart-routing',
    title: 'Anycast Geo-Routing',
    badge: '310 Global POPs',
    description: 'Incoming customer requests hit the closest physical edge location within 12 milliseconds, performing SSL termination and cache inspection automatically.',
    metrics: ['BGP Anycast routing', 'Zero DNS propagation delay', 'Automatic DDoS shielding'],
    codeHighlight: 'HTTP/3 + QUIC over Cloudflare Edge'
  },
  {
    id: 'distributed-cache',
    title: 'Multi-Region Cache Engine',
    badge: 'Zero-Egress Read Tier',
    description: 'Ultra-fast NVMe-backed distributed key-value store with active-active synchronization across North America, Europe, and Asia-Pacific.',
    metrics: ['< 2ms read latency', 'ACID-guaranteed transactions', 'Automatic invalidation tags'],
    codeHighlight: 'Global Consensus via Raft protocol'
  },
  {
    id: 'auto-scaling',
    title: 'Predictive Auto-Scaling',
    badge: 'Autonomous Concurrency',
    description: 'AI-driven workload forecasting anticipates traffic spikes 90 seconds before they occur, pre-warming serverless workers without manual rules.',
    metrics: ['Zero queue lag spikes', 'Scale from 0 to 100,000 req/s', 'Zero idle compute billing'],
    codeHighlight: 'Kubernetes KEDA + ML traffic predictor'
  }
];

export const pricingTiers = [
  {
    id: 'dev',
    name: 'Developer',
    badge: 'Free Forever',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Perfect for prototyping, side projects, and testing autonomous AI agents.',
    popular: false,
    ctaText: 'Deploy for Free',
    features: [
      '100,000 monthly edge requests',
      '3 active microVM clusters',
      'Community Discord support',
      'Built-in Anycast SSL certs',
      '14-day log retention'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Team',
    badge: 'Most Popular',
    monthlyPrice: 49,
    annualPrice: 36, // ~25% off
    description: 'Built for scaling startups, fast-growing SaaS apps, and production agent clusters.',
    popular: true,
    ctaText: 'Start 14-Day Pro Trial',
    features: [
      '5,000,000 monthly edge requests',
      'Unlimited microVM clusters',
      'Predictive Auto-Scaling Engine',
      'Multi-region cache replication',
      'Priority 24/7 Slack & Email support',
      '99.99% uptime guarantee SLA',
      'Custom domain & SSL pinning'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Cloud',
    badge: 'High-Scale Workloads',
    monthlyPrice: 299,
    annualPrice: 224, // ~25% off
    description: 'Custom infrastructure dedicated to high-volume APIs, strict compliance, and SOC2.',
    popular: false,
    ctaText: 'Contact Enterprise Sales',
    features: [
      'Unlimited edge requests & workers',
      'Dedicated VPC peering & IP pools',
      '99.999% SLA with financial guarantee',
      'SOC2 Type II & HIPAA BAA compliance',
      'Custom retention & cold-storage tiers',
      'Dedicated TAM & 15-min response time',
      'Single Sign-On (SAML / Okta / Azure AD)'
    ]
  }
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'VP of Platform Engineering',
    company: 'FinPulse Systems',
    quote: 'Migrating our distributed agent pipelines to NovaCloud sliced our cold-start latency from 1.8 seconds down to 18 milliseconds. Our cloud infrastructure bill dropped by 42% in month one.',
    verified: true,
    rating: 5
  },
  {
    name: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'Apex Data Labs',
    quote: 'The predictive auto-scaling is unlike anything on AWS or GCP. We had a sudden 20x traffic spike during a product launch and NovaCloud scaled instantly with 0 dropped packets.',
    verified: true,
    rating: 5
  },
  {
    name: 'Elena Rostova',
    role: 'Lead AI Infrastructure Architect',
    company: 'NeuralFlow Technologies',
    quote: 'The developer experience is flawless. Deploying multi-region microVMs takes literally one CLI command, and the built-in distributed cache eliminated the need for a separate Redis cluster.',
    verified: true,
    rating: 5
  }
];

export const faqList = [
  {
    question: 'How does NovaCloud achieve 18ms cold-start boot times?',
    answer: 'NovaCloud uses custom-tuned Firecracker microVMs over lightweight Linux kernels. We snapshot uninitialized worker states and hydrate memory pools directly from distributed NVMe cache, bypassing traditional container boot steps.'
  },
  {
    question: 'Can I migrate our existing Docker containers or Node/Python code?',
    answer: 'Yes! NovaCloud natively supports standard OCI container images, as well as native zero-config runtimes for Node.js (v18-v22), Python (3.10-3.12), Go, and Rust.'
  },
  {
    question: 'How does the pricing calculator compare to AWS Lambda or Google Cloud Functions?',
    answer: 'Traditional hyperscalers charge for idle provisioned concurrency, cross-region bandwidth egress, and API gateways. NovaCloud includes zero egress fees between our POPs and bills only for active CPU execution time.'
  },
  {
    question: 'What compliance and security certifications does NovaCloud support?',
    answer: 'All NovaCloud clusters run in ISO 27001, SOC 2 Type II, and PCI-DSS Level 1 certified facilities. Enterprise plans also offer HIPAA Business Associate Agreements (BAAs) and GDPR EU-only data residency.'
  },
  {
    question: 'Can I try NovaCloud before committing my company to a paid plan?',
    answer: 'Absolutely. Our Developer plan is free forever with 100,000 monthly requests, and our Pro plan includes a full 14-day free trial with no credit card required to start.'
  }
];
