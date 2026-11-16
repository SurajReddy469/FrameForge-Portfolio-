export const INDUSTRY_PROFILES = {
  agency: {
    id: "agency",
    name: "Software & Web Engineering Agency",
    tagline: "Custom MERN, Next.js & AI Web Applications",
    avatarName: "Elena Vance",
    avatarTitle: "Lead Solutions Architect @ FrameForge",
    avatarEmoji: "👩‍💻",
    initialGreeting: "Hello! I'm Elena, Lead Solutions Architect at FrameForge. What custom software or web application are you looking to architect today?",
    stages: [
      {
        id: "need",
        question: "What core product or system are you looking to build?",
        options: [
          { label: "Full-Stack SaaS Platform (MERN/Next.js)", weight: 30, tag: "SaaS Platform" },
          { label: "AI Customer Support & RAG Chatbot", weight: 35, tag: "AI RAG Agent" },
          { label: "High-Converting Brand / Marketing Site", weight: 20, tag: "Landing Page" },
          { label: "Custom REST API & Database Architecture", weight: 25, tag: "Backend/API" }
        ]
      },
      {
        id: "timeline",
        question: "What is your target launch timeline?",
        options: [
          { label: "Urgent (Within 2–4 weeks)", weight: 25, tag: "Urgent (2-4 wks)" },
          { label: "Standard (1–2 months)", weight: 20, tag: "1-2 Months" },
          { label: "Flexible / Planning Stage", weight: 10, tag: "Planning" }
        ]
      },
      {
        id: "budget",
        question: "What is your allocated budget for this initiative?",
        options: [
          { label: "$10,000 – $25,000+ (High Priority Tier)", weight: 35, tag: "Tier 1 ($10k-$25k+)" },
          { label: "$3,000 – $10,000 (Growth Tier)", weight: 25, tag: "Tier 2 ($3k-$10k)" },
          { label: "$1,000 – $3,000 (MVP Tier)", weight: 15, tag: "Tier 3 ($1k-$3k)" },
          { label: "Under $1,000 (Bootstrap)", weight: 5, tag: "Bootstrap (<$1k)" }
        ]
      },
      {
        id: "authority",
        question: "What is your role in the decision-making process?",
        options: [
          { label: "Founder / C-Level / Sole Decision Maker", weight: 15, tag: "Sole Decision Maker" },
          { label: "VP / Product Manager / Tech Lead", weight: 12, tag: "Tech Evaluator" },
          { label: "Exploring for Team Consideration", weight: 8, tag: "Team Researcher" }
        ]
      }
    ]
  },
  saas: {
    id: "saas",
    name: "Enterprise Cloud & B2B SaaS",
    tagline: "Developer Infrastructure & API Tools",
    avatarName: "Marcus Reed",
    avatarTitle: "Inbound Enterprise Consultant",
    avatarEmoji: "⚡",
    initialGreeting: "Welcome to NovaCloud Enterprise! I'm Marcus. Which infrastructure or cloud deployment tier can I assist your team with?",
    stages: [
      {
        id: "need",
        question: "What is your primary infrastructure requirement?",
        options: [
          { label: "Dedicated Multi-Region Egress & VPC", weight: 35, tag: "VPC & Multi-Region" },
          { label: "Custom Rate Limits & High-Volume API", weight: 30, tag: "API Quota Upgrade" },
          { label: "SOC2 Compliance & SSO / SAML Integration", weight: 25, tag: "Security & SSO" },
          { label: "Self-Hosted Enterprise Migration", weight: 20, tag: "Migration" }
        ]
      },
      {
        id: "timeline",
        question: "When are you aiming to deploy to production?",
        options: [
          { label: "Immediate (This sprint)", weight: 25, tag: "Immediate" },
          { label: "Next 30–60 Days", weight: 20, tag: "30-60 Days" },
          { label: "Evaluating for next quarter", weight: 12, tag: "Q3 Evaluation" }
        ]
      },
      {
        id: "budget",
        question: "What is your anticipated monthly cloud spend?",
        options: [
          { label: "$2,500 – $10,000+ / month (Enterprise)", weight: 35, tag: "Spend >$2.5k/mo" },
          { label: "$500 – $2,500 / month (Growth Pro)", weight: 25, tag: "Spend $500-$2.5k" },
          { label: "Starter Tier ($99–$499 / mo)", weight: 15, tag: "Starter Tier" }
        ]
      },
      {
        id: "authority",
        question: "Are you authorized to approve enterprise cloud billing?",
        options: [
          { label: "Yes, I hold full procurement authority", weight: 15, tag: "Authorized Buyer" },
          { label: "Co-evaluating with VP of Engineering", weight: 10, tag: "Co-evaluator" },
          { label: "Individual developer exploring sandbox", weight: 5, tag: "Developer" }
        ]
      }
    ]
  },
  realestate: {
    id: "realestate",
    name: "Luxury Real Estate & Investments",
    tagline: "High-Net-Worth Acquisitions & Brokerage",
    avatarName: "Sophia Montgomery",
    avatarTitle: "Private Client Portfolio Advisor",
    avatarEmoji: "🏛️",
    initialGreeting: "Good day. I am Sophia with UrbanNest Private Brokerage. Are you seeking property acquisitions, luxury leasing, or development investment?",
    stages: [
      {
        id: "need",
        question: "What type of luxury asset are you evaluating?",
        options: [
          { label: "Prime Residential Penthouse / Estate", weight: 35, tag: "Luxury Estate" },
          { label: "Commercial Multi-Family Investment", weight: 30, tag: "Commercial Investment" },
          { label: "Off-Market Waterfront Land Development", weight: 25, tag: "Land Development" }
        ]
      },
      {
        id: "timeline",
        question: "What is your target purchase or closing window?",
        options: [
          { label: "All-Cash Purchase within 30 days", weight: 25, tag: "Cash 30 Days" },
          { label: "Pre-Approved Financing (60–90 days)", weight: 20, tag: "Financed 60 Days" },
          { label: "Market Research / Scouting", weight: 10, tag: "Scouting" }
        ]
      },
      {
        id: "budget",
        question: "What price range aligns with your portfolio?",
        options: [
          { label: "$3,000,000 – $10,000,000+ (Ultra Luxury)", weight: 35, tag: "$3M-$10M+" },
          { label: "$1,500,000 – $3,000,000 (Prime)", weight: 25, tag: "$1.5M-$3M" },
          { label: "$750,000 – $1,500,000 (Standard Luxury)", weight: 15, tag: "$750k-$1.5M" }
        ]
      },
      {
        id: "authority",
        question: "Will you be the primary titleholder or acting via trust?",
        options: [
          { label: "Individual Titleholder / Family Office", weight: 15, tag: "Direct Titleholder" },
          { label: "Corporate Entity / Fund Manager", weight: 15, tag: "Fund Manager" },
          { label: "Buyer Agent Representative", weight: 10, tag: "Agent" }
        ]
      }
    ]
  }
};
