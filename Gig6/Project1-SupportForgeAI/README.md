# SupportForge AI – 24/7 AI Customer Support & RAG Knowledge Agent

> **Gig 6 Flagship Project (AI Development & Automation)**  
> **Brand:** FrameForge (`@frameforgehq`)  
> **Live Demo:** `http://localhost:5182`  

---

## 🌟 Executive Overview
**SupportForge AI** is a production-ready, 24/7 AI customer support platform with real-time typewriter token streaming, multi-industry RAG (Retrieval-Augmented Generation) document grounding, zero-hallucination guardrails, and automated human escalation workflows.

Designed specifically to demonstrate high-ticket (\$80–\$450+) AI agent capabilities on Fiverr.

---

## 🚀 Key Features

### 1. Dual-Mode Chat Widget (Floating & Embedded)
- **Floating Launcher Bubble:** Positioned in the bottom-right corner with pulse animation, unread badge, and sound chime.
- **Embedded Sandbox:** Side-by-side with real-time RAG engine telemetry (confidence scoring, model indicators, latency measurement).
- **Web Audio API Synth:** Gentle, pleasant UI chimes on message send, receive, and ticket dispatch (zero external audio files).

### 2. Multi-Industry RAG Knowledge Bases
Visitors can switch between 3 real-world business domains on the fly:
- **B2B SaaS / Developer Tools (NovaCloud):** API credentials, rate limit headers, webhook retries, team RBAC seats, and refunds.
- **E-Commerce & Retail (UrbanWear):** 30-day return policy, express delivery speeds, live package tracking, and international customs.
- **Real Estate / Agency (UrbanNest):** Scheduling private home tours, mortgage pre-approval criteria, and closing fee breakdowns.

### 3. Interactive RAG Knowledge Inspector
- Prospective buyers can search indexed document chunks in real time.
- **Client Training Simulator:** Allows visitors to click *"+ Inject Custom Knowledge Chunk"*, paste their own business terms, and immediately test asking the bot questions in the chat!

### 4. Automated Human Escalation Pipeline
- Detects user frustration or explicit requests to "talk to human", "speak with agent", or "escalate".
- Opens a sleek modal collecting:
  - Name
  - Email
  - Priority (Normal, Medium, Urgent)
  - Pre-filled issue summary
- Generates a tracked ticket `#SF-XXXX`, triggers celebratory confetti, and sends a confirmation receipt into the chat history.

### 5. 1-Line Embed Code Generator
- Generates drop-in `<script>` tags, React `<SupportForgeWidget />` components, and cURL / REST API snippets.
- Interactive theme customizer (Indigo, Emerald, Sky, Purple accents; position switcher).

### 6. Interactive ROI & Savings Calculator
- Live sliders for monthly support tickets and cost-per-ticket to demonstrate projected annual savings.

---

## 🛠️ Technology Stack
- **Frontend:** React 19, Tailwind CSS v4, Lucide React, Canvas Confetti
- **RAG & AI Inference:** Semantic keyword vector retrieval, prompt grounding, typewriter token streaming
- **Audio Synthesizer:** Native Web Audio API
- **Build Tool:** Vite 5 (Lightning fast HMR & bundling)

---

## 💻 Local Development Setup

```bash
# 1. Navigate to project directory
cd Gig6/Project1-SupportForgeAI

# 2. Install dependencies
npm install

# 3. Start local development server on port 5182
npm run dev

# 4. Build for production
npm run build
```
