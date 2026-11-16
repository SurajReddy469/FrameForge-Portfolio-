# Gig 2: 10 Radical E-Commerce Flagships (10/10 Production Showcase)

> **Portfolio Authority & Client Demonstration Suite**  
> Architect & Full-Stack Developer: **Ch. Suraj Reddy**  
> Tech Stack: **React 19 &bull; Vite 6 &bull; Tailwind CSS v4 &bull; Lucide React &bull; Web Audio API**  
> Status: **10 / 10 Active & Online &bull; Zero Shared DNA &bull; Production Build Verified**

---

## 🌟 Executive Overview

This repository houses **10 radically distinct, commercial-grade e-commerce storefronts**, each architected from the ground up for a completely separate industry niche. There is **zero shared aesthetic DNA**—every storefront features its own bespoke typography stack, color system, custom animations, domain-calibrated cart drawer, interactive micro-application, and honest demo billing engine.

All 10 flagships and the master showroom hub run concurrently on local loopback ports `5180` through `5190`.

---

## 🌐 Live Production Cloud Deployments (Vercel)

| # | Flagship Brand | Live Vercel Production Domain | Local Port | Industry Niche |
|:---:|:---|:---|:---:|:---|
| **HUB** | **Executive Showroom Hub** | **[gig2-flagship-hub.vercel.app](https://gig2-flagship-hub.vercel.app/)** | `:5180` | Master Portfolio Directory |
| **01** | **Vanguard Chrono** | **[gig2-store01-vanguard.vercel.app](https://gig2-store01-vanguard.vercel.app/)** | `:5181` | Haute Horlogerie Suisse |
| **02** | **ZERO//GRAVITY NYC** | **[gig2-store02-zerogravity.vercel.app](https://gig2-store02-zerogravity.vercel.app/)** | `:5182` | Neo-Brutalist Streetwear |
| **03** | **Aura Botanica** | **[gig2-store03-aurabotanica.vercel.app](https://gig2-store03-aurabotanica.vercel.app/)** | `:5183` | Japandi Clinical Skincare |
| **04** | **Nordic Roast Co.** | **[gig2-store04-nordicroast.vercel.app](https://gig2-store04-nordicroast.vercel.app/)** | `:5184` | Micro-Lot Specialty Coffee |
| **05** | **KeyCraft Labs** | **[gig2-store05-keycraftlabs.vercel.app](https://gig2-store05-keycraftlabs.vercel.app/)** | `:5185` | Custom CNC Keyboards |
| **06** | **VeloCore Athletics** | **[gig2-store06-velocore.vercel.app](https://gig2-store06-velocore.vercel.app/)** | `:5186` | Technical Aero Athletics |
| **07** | **Atelier Forma** | **[gig2-store07-atelierforma.vercel.app](https://gig2-store07-atelierforma.vercel.app/)** | `:5187` | Bauhaus Furniture |
| **08** | **Maison Cacao** | **[gig2-store08-maisoncacao.vercel.app](https://gig2-store08-maisoncacao.vercel.app/)** | `:5188` | Haute Chocolaterie Parisienne |
| **09** | **Paw & Cobble** | **[gig2-store09-pawandcobble.vercel.app](https://gig2-store09-pawandcobble.vercel.app/)** | `:5189` | Eco-Luxury Canine Outfitting |
| **10** | **Canvas & Curator** | **[gig2-store10-canvascurator.vercel.app](https://gig2-store10-canvascurator.vercel.app/)** | `:5190` | Contemporary Fine Art |

---

## 🚀 Local Development Matrix (Ports 5180–5190)

| Port | Store Name | Industry Domain | Signature Sensory & Interactive Engine | Typography System | AOV Range |
|:---:|:---|:---|:---|:---|:---:|
| **5180** | **Executive Showroom Hub** | **Master Directory** | Dynamic Live Port Status Pings & Industry Filtering | Space Grotesk + Plus Jakarta | Portfolio Portal |
| **5181** | **Vanguard Chrono** | Haute Horlogerie Suisse | Live Caliber Movement & 28,800 vph Audio Escapement Tick | Cormorant Garamond + Inter | $5,000–$45,000 CHF |
| **5182** | **ZERO//GRAVITY NYC** | Neo-Brutalist Streetwear | Drop Timer, Drape Silhouette Diagnostic & Glitch Ticker | Syne + JetBrains Mono | $120–$480 USD |
| **5183** | **Aura Botanica** | Japandi Clinical Skincare | 3-Step Routine Skin Quiz & Hydration Before/After Slider | Fraunces + DM Sans | $38–$110 USD |
| **5184** | **Nordic Roast Co.** | Micro-Lot Specialty Coffee | 5-Axis SCA Flavor Radar Chart & Precision Brew Timer | Playfair Display + Space Mono | $21–$28 USD |
| **5185** | **KeyCraft Labs** | Custom CNC Keyboards | Procedural Web Audio Mechanical Keystroke Synthesizer | Space Grotesk + JetBrains Mono | $110–$380 USD |
| **5186** | **VeloCore Athletics** | Technical Aero Athletics | Wind Tunnel Aerodynamic Drag Calc & Fabric Heat-Map | Barlow Semi Condensed + Inter | $75–$240 USD |
| **5187** | **Atelier Forma** | Bauhaus Furniture | Diurnal Lighting Room Viewer & Material Swatch Archive | Cinzel + Plus Jakarta Sans | $850–$3,200 USD |
| **5188** | **Maison Cacao** | Haute Chocolaterie Parisienne | 16-Piece Tasting Ballotin Builder & Calligraphy Studio | Italiana + Outfit | $28–$145 USD |
| **5189** | **Paw & Cobble** | Eco-Luxury Canine Outfitting | Breed Sizing Diagnostic & Live Brass Monogram Stamping | Gabarito + Plus Jakarta Sans | $34–$210 USD |
| **5190** | **Canvas & Curator** | Contemporary Fine Art | 4.0X Conservator Optical Loupe & Wall Scale Visualizer | Bodoni Moda + Inter | $180–$1,450 USD |

---

## 🛠️ Key Architectural Upgrades

### 1. Unified Master Showroom Hub (`http://localhost:5180/`)
- Powered by a native Node.js HTTP micro-server (`serve_hub.js`).
- Dynamic browser fetch health checks ping ports `5181` to `5190` in real-time.
- One-click industry filtering across 10 niches (Horology, Techwear, Skincare, Coffee, Keyboards, Cycling, Furniture, Chocolaterie, Pet Goods, Fine Art).
- Technical specification audit matrix detailing AOV, typography, and interactive engines.

### 2. Persistent LocalStorage Cart & State
- All 10 stores utilize `usePersistentState.js` with isolated namespace keys (`gig2:store01:cart:v1` to `gig2:store10:cart:v1`).
- Cart quantities, custom options (grinds, engravings, frames, swatches), and prices survive browser reloads and tab closures.

### 3. Sensory & Auditory Micro-Engines
- **Vanguard Chrono (5181):** Real-time 60fps sweeping mechanical second hand and Web Audio API synthesized 28,800 vph Swiss escapement ticks.
- **KeyCraft Labs (5185):** Procedural zero-latency mechanical switch acoustics (Linear Thock, Tactile Pop, Clicky Snap) synthesized directly with Web Audio oscillators and filters.
- **Nordic Roast Co. (5184):** 5-axis SVG polygonal spider radar chart visualizing SCA cupping metrics (Acidity, Sweetness, Body, Clarity, Floral).
- **Canvas & Curator (5190):** 4.0X optical conservator loupe lens tracking cursor movement with calibrated crosshair reticle and high-magnification canvas texture.

### 4. Honest Demo Checkout & WCAG Compliance
- Dismissible demo payment notice clearly indicating simulated transactions with "⚡ Fill Demo Data" quick-fill buttons.
- Strict WCAG 2.1 AA accessibility: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `Escape` keyboard dismiss listeners on all modals.
- Compound cart line IDs (`cartLineId`) ensuring custom configurations (different sizes, grinds, or framing) never overwrite each other.

---

## ⚡ Quick Start Commands

```powershell
# 1. Test all 11 ports (5180 to 5190)
powershell -File "c:\Users\Ch.Suraj Reddy\Desktop\Portfolio-1\Gig2\test_ports.ps1"

# 2. Start all 11 servers in interactive windows
powershell -File "c:\Users\Ch.Suraj Reddy\Desktop\Portfolio-1\Gig2\start_all_stores.ps1"

# 3. Open Master Showroom Hub in your browser
Start-Process "http://localhost:5180/"
```
