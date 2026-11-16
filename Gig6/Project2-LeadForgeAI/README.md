# LeadForge AI – Autonomous Inbound SDR & Conversational Calendar Agent

> **Gig 6 Project 2 (AI Agents & Sales Qualification)**  
> **Brand:** FrameForge (`@frameforgehq`)  
> **Live Local Server:** `http://localhost:5183`  

---

## 🌟 Executive Overview
**LeadForge AI** is an enterprise-grade autonomous inbound sales development representative (SDR) and real-time meeting qualification agent. It replaces high-friction static contact forms by actively qualifying inbound web traffic using the BANT framework (Budget, Authority, Need, Timeline), calculating a live **Lead Score (0–100)**, and embedding an interactive meeting scheduler that books discovery sessions directly into your calendar.

---

## 🚀 Key Differentiators & Killer Features

### 1. Adaptive Conversational SDR
- Acts as a consultative solutions architect (e.g. Elena Vance, Marcus Reed, Sophia Montgomery).
- Asks conversational questions tailored to the client's industry:
  - **Agency & Custom Software**
  - **B2B Cloud SaaS**
  - **High-End Real Estate**
- Allows one-click option selections OR custom text inputs.

### 2. Real-Time Lead Intelligence Dossier
- Live radial SVG score gauge that updates dynamically as the visitor responds.
- **BANT Vector Breakdown:**
  - Need / Technical Scope Alignment (0–100%)
  - Launch Urgency / Timeline (0–100%)
  - Budget Tier Alignment (0–100%)
  - Decision-Making Authority (0–100%)
- Extracted signal tags for CRM routing.

### 3. Native In-Chat Calendar Booking
- Injects a responsive 30-minute discovery call scheduler directly into the conversation bubble.
- Next 5 business days date picker + 6 available time slots per day.
- Collects name, email, and company domain.
- Generates instant meeting ID (`#MTG-XXXX`), triggers celebratory confetti, and sends Google Calendar / Outlook `.ics` sync badges.

### 4. Executive Sales War Room CRM Pipeline
- Kanban pipeline tracking live deals across 4 stages:
  1. `Inbound Inquiries`
  2. `AI Qualified (BANT)`
  3. `Meeting Booked`
  4. `Contract Sent`
- When a visitor completes a booking, their deal is injected live into the "Meeting Booked" column with a glowing badge!

### 5. Automated Webhook & CRM Sync Inspector
- Real-time JSON payload viewer showing the exact structured data dispatched to **HubSpot**, **Slack** (#deals-inbound-vip), and **Zapier**.

---

## 🛠️ Technology Stack
- **Frontend:** React 19, Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **Lead Qualification:** Dynamic BANT scoring algorithm & state machine
- **Audio:** Native Web Audio API Synthesizer
- **Build Tool:** Vite 5 (Bundles in ~10 seconds)

---

## 💻 Local Development Setup

```bash
# 1. Navigate to project directory
cd Gig6/Project2-LeadForgeAI

# 2. Install dependencies
npm install

# 3. Start local development server on port 5183
npm run dev

# 4. Build for production
npm run build
```
