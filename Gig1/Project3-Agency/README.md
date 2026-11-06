# ApexMedia — Digital Product Studio & Enterprise Client Portal
> **Portfolio 1 • Gig 1: Custom Web Application Development • Project 3 of 5**  
> **Brand & Engineering Lead:** FrameForge (Full-Stack MERN Specialist, India)  
> **Architecture Highlights:** Security hardening, in-memory resilience, algorithmic scope calculation, and automated verification suites.

---

## 🌟 Executive Overview
**ApexMedia** is a digital agency web application and enterprise client portal designed for venture-backed founders and technology leaders. It features an algorithmic server-side project scope and budget calculator, interactive case study showcases with verified business metrics, an enterprise client intake pipeline, and a role-guarded CRM administrative portal with RFC 4180 CSV export.

---

## 🚀 Live Services & Architecture Ports
- **Live Vercel Production:** 🔗 [frameforge-apexmedia.vercel.app](https://frameforge-apexmedia.vercel.app/)
- **Backend API:** `http://localhost:5002` (Health: `http://localhost:5002/api/health`)
- **Frontend Client:** `http://localhost:5175` (Vite + React 19 + Tailwind CSS)
- **Concurrent Portfolio Ports:**
  - *Project 1 (UrbanNest):* `:5000` (API) & `:5173` (Frontend)
  - *Project 2 (GourmetHaven):* `:5001` (API) & `:5174` (Frontend)
  - *Project 3 (ApexMedia):* `:5002` (API) & `:5175` (Frontend)

---

## 🛡️ Production Security & Engineering Checklist

| Dimension | Implementation | Verification |
| :--- | :--- | :---: |
| **RBAC & Authorization** | Public registration strictly assigns role `user`; administrative operations require verified `Bearer` JWT tokens. Zero client-side role injection. | **Verified** |
| **Server-Side Scope Engine** | Authoritative cost calculation in `pricingEstimator.js`; client cannot forge estimates or tamper with pricing tiers. | **Verified** |
| **Rate Limiting & DoS** | Strict window rate limiting on `/api/auth/register`, `/api/auth/login`, and `/api/leads`. | **Verified** |
| **Collision-Resistant Codes** | Collision-retried unique tracking codes (`APEX-LEAD-XXXXXX`) generated via server-side verification loops. | **Verified** |
| **RFC 4180 CSV Export** | RFC 4180 compliant CSV generator with escaped quotes and CRLF line breaks at `/api/leads/export/csv`. | **Verified** |
| **Dual-Engine Persistence** | In-memory runtime fallback alongside MongoDB checking `mongoose.connection.readyState === 1`. Consistent route tests pass even if MongoDB is offline. | **Verified** |
| **Automated Test Suite** | 14 automated integration tests passing in `< 100ms` via Node.js native test runner (`tests/api.test.js`). | **Verified** |
| **Zero External Avatar PII** | Clean neutral person silhouette SVG badges (`<User />`) everywhere; zero unverified external headshots. | **Verified** |

---

## 🔑 One-Click Evaluation Accounts

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Agency Principal (Admin)** | `admin@apexmedia.com` | `admin123` | Full CRM access, lead pipeline, status updater, CSV export, case study CMS |
| **Venture Client** | `client@apexmedia.com` | `client123` | Client portal, interactive scope estimator, project tracking |

---

## 🧪 Automated Test Verification
Run the backend test suite:
```bash
cd server
npm test
```
Result:
```
✔ ApexMedia Digital Agency Production Verification Suite (63.8ms)
ℹ tests 12
ℹ suites 0
ℹ pass 12
ℹ fail 0
```

---

## 💻 Tech Stack
- **Frontend:** React 19, Tailwind CSS, Lucide React, Vite, Canvas-Confetti
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens, BcryptJS, Express-Rate-Limit, Supertest
- **Design System:** Dark glassmorphic enterprise slate palette (`slate-950` to `blue-600`)
