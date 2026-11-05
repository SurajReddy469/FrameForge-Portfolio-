// ApexMedia Authoritative Scope & Pricing Estimation Engine

const BASE_PRICES_USD = {
  'Full-Stack Web': 3500,
  'SaaS Platform': 6500,
  'Mobile App': 5000,
  'Design System': 2500,
  'Custom Enterprise': 12000
};

const FEATURE_PRICES_USD = {
  'Authentication & RBAC': 800,
  'Payment Processing (Stripe/PayPal)': 1200,
  'Real-time WebSockets / Chat': 1500,
  'AI / LLM Integration': 2000,
  'Executive Analytics Dashboard': 1000,
  'Multi-language i18n': 600,
  'CMS & Content Authoring': 900,
  'SEO & Performance Tuning (95+ Lighthouse)': 700
};

const TIMELINE_MULTIPLIERS = {
  '< 1 Month': 1.35,      // Rush priority
  '1 - 3 Months': 1.0,    // Standard
  '3 - 6 Months': 0.95,   // Flexible milestone
  'Flexible': 0.90
};

const FEATURE_ALIASES = {
  auth_rbac: 'Authentication & RBAC',
  payments: 'Payment Processing (Stripe/PayPal)',
  realtime: 'Real-time WebSockets / Chat',
  ai_llm: 'AI / LLM Integration',
  analytics_crm: 'Executive Analytics Dashboard',
  multi_lang: 'Multi-language i18n',
  audit_security: 'SEO & Performance Tuning (95+ Lighthouse)'
};

const PLATFORM_ALIASES = {
  web: 'Full-Stack Web',
  saas: 'SaaS Platform',
  mobile: 'Mobile App',
  ecommerce: 'Full-Stack Web',
  enterprise: 'Custom Enterprise'
};

const TIMELINE_ALIASES = {
  rush: '< 1 Month',
  expedited: '< 1 Month',
  standard: '1 - 3 Months'
};

function calculateScopeEstimate({ projectType, platform, features = [], timeline = '1 - 3 Months' }) {
  // Normalize platform/projectType
  let resolvedType = projectType || platform || 'Full-Stack Web';
  if (PLATFORM_ALIASES[resolvedType]) resolvedType = PLATFORM_ALIASES[resolvedType];
  const base = BASE_PRICES_USD[resolvedType] || BASE_PRICES_USD['Full-Stack Web'];

  let featuresTotal = 0;
  const verifiedFeatures = [];

  for (const f of features) {
    const canonical = FEATURE_ALIASES[f] || f;
    if (FEATURE_PRICES_USD[canonical]) {
      featuresTotal += FEATURE_PRICES_USD[canonical];
      verifiedFeatures.push(canonical);
    }
  }

  const resolvedTimeline = TIMELINE_ALIASES[timeline] || timeline;
  const multiplier = TIMELINE_MULTIPLIERS[resolvedTimeline] || 1.0;
  const subtotal = base + featuresTotal;
  const calculatedEstimateUSD = Math.round(subtotal * multiplier);

  // Suggested budget tier string
  let suggestedTier = '$3,500 - $7,000';
  if (calculatedEstimateUSD > 15000) {
    suggestedTier = '$15,000+ Enterprise Tier';
  } else if (calculatedEstimateUSD > 10000) {
    suggestedTier = '$10,000 - $15,000 Growth Tier';
  } else if (calculatedEstimateUSD > 6000) {
    suggestedTier = '$6,000 - $10,000 Professional Tier';
  }

  const low = Math.round(calculatedEstimateUSD * 0.9);
  const high = Math.round(calculatedEstimateUSD * 1.15);

  return {
    basePriceUSD: base,
    basePrice: base,
    featuresTotalUSD: featuresTotal,
    featureCost: featuresTotal,
    verifiedFeatures,
    timelineMultiplier: multiplier,
    multiplier,
    calculatedEstimateUSD,
    totalPrice: calculatedEstimateUSD,
    suggestedTier,
    tier: suggestedTier,
    priceRange: {
      low,
      high,
      formatted: `$${low.toLocaleString()} - $${high.toLocaleString()}`
    }
  };
}

module.exports = {
  BASE_PRICES_USD,
  FEATURE_PRICES_USD,
  TIMELINE_MULTIPLIERS,
  calculateScopeEstimate
};
