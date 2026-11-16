export const KNOWLEDGE_BASES = {
  saas: {
    name: "NovaCloud Developer Platform",
    industry: "B2B SaaS / Developer Tools",
    version: "v2.4.1",
    avatar: "🤖",
    defaultGreeting: "Hi there! I'm your NovaCloud 24/7 AI Support Engineer. How can I assist you with our API, webhooks, or team seats today?",
    suggestedChips: [
      "How do I generate an API key?",
      "What are the API rate limits?",
      "How do webhooks handle retries?",
      "What is your refund policy?",
      "I want to speak with human support"
    ],
    documents: [
      {
        id: "saas-api-keys",
        category: "Authentication",
        title: "API Keys & Token Management",
        citation: "NovaCloud Docs §2.1 (Auth)",
        keywords: ["api key", "token", "generate", "authentication", "bearer", "header", "secret", "credentials"],
        content: `To generate a new API key in NovaCloud:
1. Navigate to **Dashboard > Settings > API Credentials**.
2. Click **Generate New Secret Key** and select your scope (Read-Only or Full-Access).
3. Copy your key immediately. For security, keys are never displayed again.
Include the key in your requests as an authorization header: \`Authorization: Bearer nc_live_...\`.`
      },
      {
        id: "saas-rate-limits",
        category: "Performance",
        title: "Rate Limits & Quota Tiers",
        citation: "NovaCloud Docs §3.4 (Rate Limits)",
        keywords: ["rate limit", "quota", "requests", "rpm", "tpm", "429", "throttle", "concurrency"],
        content: `NovaCloud enforces tier-based rate limits:
- **Starter Tier:** 60 requests/minute (10,000 requests/day).
- **Pro Tier:** 600 requests/minute (250,000 requests/day).
- **Enterprise Tier:** Custom limits up to 10,000 req/sec with dedicated egress IP.
If exceeded, the API returns HTTP 429 with standard \`Retry-After\` and \`X-RateLimit-Reset\` response headers.`
      },
      {
        id: "saas-webhooks",
        category: "Integrations",
        title: "Webhook Delivery & Retry Policy",
        citation: "NovaCloud Docs §5.2 (Webhooks)",
        keywords: ["webhook", "retry", "signature", "payload", "delivery", "timeout", "events", "endpoint"],
        content: `Webhooks are delivered via POST with a JSON payload and verified using HMAC SHA-256 signatures in the \`X-Nova-Signature\` header.
If your server responds with any non-2xx status code or times out after 5,000ms, our delivery engine automatically retries with exponential backoff:
- Attempt 1: Immediate
- Attempt 2: 5 minutes later
- Attempt 3: 30 minutes later
- Final Attempt: 4 hours later.`
      },
      {
        id: "saas-billing-refunds",
        category: "Billing & Plans",
        title: "Subscription Billing, Invoicing & Refunds",
        citation: "NovaCloud Terms §8.1 (Billing)",
        keywords: ["refund", "billing", "invoice", "cancel", "money back", "subscription", "stripe", "charge"],
        content: `All NovaCloud subscriptions come with a **14-day no-questions-asked money-back guarantee**.
- You can cancel anytime from **Account > Billing > Manage Subscription**.
- VAT/GST invoices are automatically generated on the 1st of each calendar month.
- To request a refund within 14 days, click 'Request Refund' in your billing portal or ask me to open a priority billing ticket.`
      },
      {
        id: "saas-team-seats",
        category: "Access Control",
        title: "Team Seats & Role-Based Permissions (RBAC)",
        citation: "NovaCloud Docs §1.8 (Team)",
        keywords: ["team", "seats", "invite", "members", "rbac", "roles", "admin", "viewer", "developer"],
        content: `NovaCloud supports 3 distinct permission roles:
1. **Owner:** Full billing, ownership transfer, and audit logs.
2. **Developer:** Read/write API access, webhook configuration, and deployment management.
3. **Viewer:** Read-only access to analytics, metrics, and logs.
Pro plans include up to 5 seats; additional seats cost $15/user/month.`
      }
    ]
  },
  ecommerce: {
    name: "UrbanWear Lifestyle & Gear",
    industry: "E-Commerce & Retail",
    version: "v3.1.0",
    avatar: "🛍️",
    defaultGreeting: "Welcome to UrbanWear Customer Support! Looking for order tracking, size advice, or return instructions?",
    suggestedChips: [
      "What is your return policy?",
      "How long does express shipping take?",
      "How can I track my package?",
      "Do you ship internationally?",
      "I need to speak with a representative"
    ],
    documents: [
      {
        id: "ecom-returns",
        category: "Returns & Exchanges",
        title: "30-Day Hassle-Free Return Policy",
        citation: "UrbanWear Policy §4.0 (Returns)",
        keywords: ["return", "refund", "exchange", "damaged", "return label", "store credit", "money back"],
        content: `We offer a **30-day return window** from the date of delivery.
- Items must be in original unworn condition with tags attached.
- Domestic returns are **100% free**—we provide a pre-paid printable shipping label.
- Once our warehouse scans your return package, your refund is credited to your original payment method in 3–5 business days.`
      },
      {
        id: "ecom-shipping",
        category: "Shipping & Delivery",
        title: "Shipping Speeds & Delivery Estimates",
        citation: "UrbanWear Shipping §2.3",
        keywords: ["shipping", "delivery", "fedex", "dhl", "express", "overnight", "courier", "how long"],
        content: `We ship all orders within 24 hours from our fulfillment centers:
- **Standard Shipping:** 3–5 business days (FREE on orders over $50).
- **Express Shipping:** 2 business days ($9.99 flat rate).
- **Next-Day Air:** Guaranteed next business day if ordered before 2:00 PM EST ($19.99).
Tracking links are emailed the moment your parcel leaves the warehouse.`
      },
      {
        id: "ecom-tracking",
        category: "Order Management",
        title: "Order Tracking & Status Updates",
        citation: "UrbanWear Support §1.2",
        keywords: ["track", "tracking number", "where is my order", "status", "courier", "delayed", "package"],
        content: `You can track any order directly on our site:
1. Visit \`urbanwear.com/track\` and input your Order ID (e.g., \`#UW-8472\`) and email address.
2. Real-time GPS checkpoints are provided via FedEx and DHL API.
If your package hasn't updated in 48 hours, I can connect you directly with a logistics specialist.`
      },
      {
        id: "ecom-international",
        category: "International Orders",
        title: "Global Shipping & Customs Duties",
        citation: "UrbanWear Policy §7.1",
        keywords: ["international", "worldwide", "customs", "duties", "vat", "europe", "canada", "taxes"],
        content: `We ship to over 85 countries worldwide!
- International delivery takes **6–10 business days** via DHL Express.
- All duties, import taxes, and VAT are calculated and paid upfront at checkout—**guaranteed zero surprise fees upon delivery**.`
      }
    ]
  },
  realestate: {
    name: "UrbanNest Premier Realty",
    industry: "Real Estate & Agency",
    version: "v1.9.0",
    avatar: "🏡",
    defaultGreeting: "Hello! I'm your UrbanNest AI Property Advisor. Are you interested in scheduling a viewing, checking property requirements, or speaking with a broker?",
    suggestedChips: [
      "How do I schedule a private property viewing?",
      "What documents do I need for mortgage pre-approval?",
      "What are the typical closing fees for buyers?",
      "How do I list my property for sale?",
      "Connect me with a licensed broker"
    ],
    documents: [
      {
        id: "re-viewing",
        category: "Property Tours",
        title: "Scheduling In-Person & Virtual Tours",
        citation: "UrbanNest Handbook §1.4",
        keywords: ["viewing", "tour", "visit", "schedule", "open house", "appointment", "walkthrough", "inspect"],
        content: `Private showings can be booked directly through our platform:
- Available 7 days a week between 9:00 AM and 7:00 PM.
- Same-day showings require at least 3 hours advance notice.
- We also provide immersive 4K Matterport 3D virtual walkthroughs for remote buyers.`
      },
      {
        id: "re-mortgage",
        category: "Financing & Loans",
        title: "Mortgage Pre-Approval & Financial Verification",
        citation: "UrbanNest Advisory §3.1",
        keywords: ["mortgage", "pre-approval", "loan", "bank", "down payment", "credit score", "financing"],
        content: `To submit an offer on an UrbanNest listed property, buyers should provide:
1. A valid Mortgage Pre-Approval Letter issued within the last 60 days.
2. Proof of Funds (POF) for the down payment (minimum 10% for conventional loans).
3. Government-issued photo identification.
Our preferred lenders can issue digital pre-approvals in as little as 24 hours.`
      },
      {
        id: "re-closing-costs",
        category: "Transactions",
        title: "Buyer Closing Costs & Fee Breakdown",
        citation: "UrbanNest Buyer Guide §5.0",
        keywords: ["closing costs", "fees", "escrow", "title insurance", "transfer tax", "appraisal"],
        content: `Estimated buyer closing costs typically range between **2% to 4%** of the total purchase price:
- Title Search & Lender's Title Insurance: ~0.5%–1.0%
- Escrow / Closing Attorney Fees: ~$800–$1,500
- Property Appraisal & Home Inspection: ~$500–$800
- Prorated Property Taxes & Homeowners Insurance Reserves.`
      }
    ]
  }
};
