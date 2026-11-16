export const KEYBOARDS = [
  {
    id: "apex-75-pro",
    name: "KeyCraft Apex 75 Pro",
    formFactor: "75% Exploded Layout",
    price: 340,
    priceFormatted: "$340 USD",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    chassis: "CNC Anodized 6063 Aluminum",
    mount: "Poron Isolation Gasket Mount",
    weight: "2.1 kg (4.6 lbs) Brass Weight Bar",
    pcb: "1.2mm Flex-Cut Hot-Swap (Per-Key RGB)",
    polling: "8,000Hz (0.125ms latency)",
    details: "Chamfered aerospace bezel. Features an integrated rotary encoder milled from solid brass with 24-step detents."
  },
  {
    id: "ergo-orbit-alice",
    name: "Ergo-Orbit Alice Ergonomic",
    formFactor: "Alice Split Ergo Layout",
    price: 380,
    priceFormatted: "$380 USD",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
    chassis: "Frosted Polycarbonate & Aluminum Base",
    mount: "Leaf-Spring Gasket Suspension",
    weight: "1.8 kg (3.9 lbs)",
    pcb: "QMK / VIA Fully Programmable",
    polling: "1,000Hz Ultra-Low Jitter",
    details: "10-degree inward natural typing angle that eliminates ulnar deviation and wrist fatigue during marathon coding sessions."
  },
  {
    id: "stealth-65-wireless",
    name: "Stealth 65 Wireless Tri-Mode",
    formFactor: "65% Compact Travel Edition",
    price: 260,
    priceFormatted: "$260 USD",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
    chassis: "E-Coated Matte Carbon Aluminum",
    mount: "Silicone Sock Isolation Gaskets",
    weight: "1.4 kg (3.1 lbs)",
    pcb: "Tri-Mode (2.4GHz + BT 5.2 + USB-C)",
    polling: "1,000Hz 2.4GHz Wireless",
    details: "4,000 mAh battery delivering 200 hours continuous typing. Internal IXPE switch pads for acoustic sound profile."
  },
  {
    id: "macro-knob-pad",
    name: "Command Numpad & Rotary Macro",
    formFactor: "Macro Companion Keypad",
    price: 110,
    priceFormatted: "$110 USD",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    chassis: "Solid CNC Milled Aluminum Block",
    mount: "Top Mount with Brass Plate",
    weight: "680 g (1.5 lbs)",
    pcb: "Hot-Swap 17-Keys + Clickable Knob",
    polling: "1,000Hz USB-C High-Speed",
    details: "Dedicated workflow controller for video editing, audio mixing, and software developers. 3 on-board profile layers."
  }
];

export const SWITCH_TYPES = [
  {
    id: "linear-oil-king",
    name: "Gateron Oil King (Linear)",
    force: "55g Actuation • 65g Bottom Out",
    soundType: "Deep Acoustic 'Thock'",
    description: "Factory pre-lubed nylon housing and POM stem for butter-smooth travel with zero scratchiness.",
    frequencyHz: "140Hz Fundamental Resonant Frequency"
  },
  {
    id: "tactile-holy-panda",
    name: "Holy Panda X (Tactile)",
    force: "62g Actuation • Medium Bump",
    soundType: "Crisp Tactile Pop",
    description: "Rounded D-profile tactile bump right at the start of travel. Highly responsive for touch typists.",
    frequencyHz: "320Hz Peak Harmonic Feedback"
  },
  {
    id: "clicky-box-navy",
    name: "Kailh Box Navy (Clicky)",
    force: "75g Heavy • Thick Clickbar",
    soundType: "Mechanical Sharp Snap",
    description: "Patented acoustic clickbar mechanism delivering a crisp tactile snap both on downstroke and upstroke.",
    frequencyHz: "880Hz Metallic Acoustic Snap"
  }
];
