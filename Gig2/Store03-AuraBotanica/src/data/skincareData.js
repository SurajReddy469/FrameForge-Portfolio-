export const PRODUCTS = [
  {
    id: "ceramide-barrier-creme",
    name: "Centella Ceramide Barrier Crème",
    subtitle: "Bio-Identical Lipid Recovery Cream",
    price: 64,
    priceFormatted: "$64",
    volume: "50 ml / 1.7 fl. oz",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    keyActives: ["Centella Asiatica 68%", "Ceramide NP/AP/EOP", "Madecassoside"],
    benefits: "Restores impaired acid mantle, relieves visible flushing, and locks in 72-hour moisture.",
    routineStep: "Step 03 • Moisturize (AM / PM)",
    bestFor: "Sensitive, Compromised, Dry Skin"
  },
  {
    id: "fermented-rice-essence",
    name: "Fermented Rice Radiance Essence",
    subtitle: "Micro-Biotic Cellular Hydrosol",
    price: 52,
    priceFormatted: "$52",
    volume: "150 ml / 5.1 fl. oz",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    keyActives: ["Fermented Rice Filtrate 84%", "Niacinamide 4%", "Polyglutamic Acid"],
    benefits: "Refines pore texture, evens post-inflammatory hyperpigmentation, and preps absorption.",
    routineStep: "Step 01 • Hydrate (AM / PM)",
    bestFor: "Dull, Uneven, Dehydrated Complexions"
  },
  {
    id: "bakuchiol-night-oil",
    name: "Bakuchiol Cellular Renewal Oil",
    subtitle: "Botanical Retinoid Alternative",
    price: 78,
    priceFormatted: "$78",
    volume: "30 ml / 1.0 fl. oz",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80",
    keyActives: ["Pure Sytenol® A Bakuchiol 2%", "Cold-Pressed Rosehip", "Sea Buckthorn"],
    benefits: "Stimulates collagen turnover with zero flaking, peeling, or photosensitivity.",
    routineStep: "Step 04 • Seal (PM Routine)",
    bestFor: "Fine Lines, Loss of Elasticity"
  },
  {
    id: "polypeptide-cleansing-milk",
    name: "Camellia Polypeptide Cleanser",
    subtitle: "Gentle pH 5.5 Melting Emulsion",
    price: 38,
    priceFormatted: "$38",
    volume: "200 ml / 6.8 fl. oz",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    keyActives: ["Japanese Camellia Seed Oil", "Oat Amino Acids", "Bisabolol"],
    benefits: "Dissolves water-resistant mineral sunscreen without stripping the moisture barrier.",
    routineStep: "Step 00 • Cleanse (AM / PM)",
    bestFor: "All Skin Types, Reactive Barrier"
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: "skin-type",
    question: "How would you characterize your skin barrier?",
    options: [
      { label: "Dry & Reactive", desc: "Tight feeling, prone to flaking and redness", target: "ceramide-barrier-creme" },
      { label: "Dehydrated & Dull", desc: "Surface oiliness with deep underlying thirst", target: "fermented-rice-essence" },
      { label: "Mature & Uneven", desc: "Looking for smoothing without harsh acids", target: "bakuchiol-night-oil" }
    ]
  },
  {
    id: "primary-concern",
    question: "What is your primary clinical skin goal?",
    options: [
      { label: "Barrier Repair & Calming", desc: "Soothe irritation and rebuild lipid barrier" },
      { label: "Radiance & Hyperpigmentation", desc: "Fade sun spots and boost natural glow" },
      { label: "Texture Smoothing & Firming", desc: "Refine fine lines and increase bounce" }
    ]
  }
];
