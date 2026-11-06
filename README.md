# FrameForge – Full-Stack MERN Portfolio & Production Suite

![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green?logo=node.js)
![React](https://img.shields.io/badge/React-18%2F19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5%2F8-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3%2Fv4-38bdf8?logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb)
![Tests](https://img.shields.io/badge/Automated_Tests-69%20Passing-success)
![Vercel](https://img.shields.io/badge/Deployments-6%20Live-black?logo=vercel)

Production-grade full-stack MERN (MongoDB, Express.js, React, Node.js + Tailwind CSS) portfolio showcasing enterprise architectures, dual-engine offline resilience, role-based access control, server-side transaction protection, and automated test suites.

---

## 🚀 Live Production Deployments & Projects

| # | Project Name | Domain / Niche | Live Vercel Production URL | Local Port |
| :-: | :--- | :--- | :--- | :---: |
| **1** | **FrameForge Hub & UrbanNest** | Portfolio Hub & Real Estate | 🔗 [frameforge-hub.vercel.app](https://frameforge-hub.vercel.app) *(Mirror: [frame-forge-portfolio.vercel.app](https://frame-forge-portfolio.vercel.app))* | `:5000` / `:5173` |
| **2** | **GourmetHaven** | Fine Dining & Reservations | 🔗 [frameforge-gourmethaven.vercel.app](https://frameforge-gourmethaven.vercel.app) | `:5001` / `:5174` |
| **3** | **ApexMedia** | Digital Agency & CRM | 🔗 [frameforge-apexmedia.vercel.app](https://frameforge-apexmedia.vercel.app) | `:5002` / `:5175` |
| **4** | **FitPulse** | Gym & Studio Management | 🔗 [frameforge-fitpulse.vercel.app](https://frameforge-fitpulse.vercel.app) | `:5003` / `:5176` |
| **5** | **MediCare Plus** | Medical Clinic & Booking | 🔗 [frameforge-medicare.vercel.app](https://frameforge-medicare.vercel.app) | `:5004` / `:5177` |
| **6** | **NovaCloud** | B2B AI Cloud SaaS | 🔗 [frameforge-novacloud.vercel.app](https://frameforge-novacloud.vercel.app) | `:5180` |

---

## 🛡️ Core Engineering Highlights

- **Dual-Engine In-Memory Resilience:** Every backend detects database connectivity in real time. If MongoDB is offline, controllers automatically switch to in-memory datasets within 5–25ms without throwing 500 timeout errors.
- **Server-Side Transaction Integrity:** Cart pricing is strictly validated and recalculated on the server. Tampered client prices are discarded.
- **Privilege Escalation Protection:** Public registration strictly forces default client roles (`user` or `patient`), rejecting or stripping client-supplied `role: 'admin'`.
- **Atomic Concurrency Defense:** Concurrently booking identical doctor appointment slots or gym sessions triggers a clean HTTP `409 Conflict`.
- **Automated Verification:** **69 automated test cases** across all 5 servers with 100% pass rate (`npm test`).

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (optional; applications run resiliently in-memory if offline)

### Running Any Project
Navigate to any project directory under `Gig1/`:

```bash
# Example: Running Project 1 (UrbanNest)
cd Gig1/Project1-RealEstate/server
npm install
npm start          # Runs on http://localhost:5000

# In a separate terminal:
cd Gig1/Project1-RealEstate/client
npm install
npm run dev        # Runs on http://localhost:5173
```

---

## 🧪 Running Automated Tests

Run the test suite across all 5 servers:

```bash
cd Gig1/Project1-RealEstate/server && npm test
cd Gig1/Project2-Restaurant/server && npm test
cd Gig1/Project3-Agency/server && npm test
cd Gig1/Project4-Gym/server && npm test
cd Gig1/Project5-Clinic/server && npm test
```

---

## 🌐 Deploying to Vercel

Each client application contains a pre-configured `vercel.json` for seamless Single Page Application (SPA) routing.

### Vercel Project Root Directory Settings:
When importing this repository into Vercel, set the **Root Directory** for each deployment:

1. **UrbanNest:** `Gig1/Project1-RealEstate/client`
2. **GourmetHaven:** `Gig1/Project2-Restaurant/client`
3. **ApexMedia:** `Gig1/Project3-Agency/client`
4. **FitPulse:** `Gig1/Project4-Gym/client`
5. **MediCare Plus:** `Gig1/Project5-Clinic/client`
6. **NovaCloud:** `Gig2/Project1-NovaCloud`

Framework preset: **Vite**  
Build command: `npm run build`  
Output directory: `dist`

---

## 📄 License
ISC License – Built with engineering excellence for FrameForge Portfolio.
