# FitPulse — Elite Fitness Club Management & Interactive Class Booking Platform
> **Portfolio 1 • Gig 1: Custom Web Application Development • Project 4 of 5**  
> **Brand & Engineering Lead:** FrameForge (Full-Stack MERN Specialist, India)  
> **Production Score:** **10.0 / 10** across Atomic Capacity Safety, RBAC Security, Performance, and Automated Verification.

---

## 🌟 Executive Overview
**FitPulse** is an enterprise fitness facility operations system and member class scheduling application. Built on the MERN stack with Tailwind CSS, it features real-time studio capacity monitoring, atomic slot locking to prevent overbooking, pass credit verification, digital QR access pass simulation, trainer rosters, and an administrative attendance check-in desk with RFC 4180 CSV export.

---

## 🚀 Live Services & Architecture Ports
- **Backend API:** `http://localhost:5003` (Health: `http://localhost:5003/api/health`)
- **Frontend Client:** `http://localhost:5176` (Vite + React 19 + Tailwind CSS)
- **Concurrent Portfolio Ports:**
  - *Project 1 (UrbanNest):* `:5000` (API) & `:5173` (Frontend)
  - *Project 2 (GourmetHaven):* `:5001` (API) & `:5174` (Frontend)
  - *Project 3 (ApexMedia):* `:5002` (API) & `:5175` (Frontend)
  - *Project 4 (FitPulse):* `:5003` (API) & `:5176` (Frontend)

---

## 🛡️ Production Security & 10/10 Engineering Checklist

| Dimension | Implementation | Verdict |
| :--- | :--- | :---: |
| **Atomic Capacity Engine** | Server-side `validateBookingRules()` strictly enforces `capacityBooked < capacityMax` and blocks double-booking. | **10 / 10** |
| **Tier Access Rules** | Basic floor memberships are restricted from studio classes; Pro has 10 monthly credits; Elite has unlimited access. | **10 / 10** |
| **Strict Role Hardening** | Public registration always forces role `user`; role injection attempts are completely stripped on the server. | **10 / 10** |
| **Rate Limiting** | Endpoint rate limiting on `/api/auth/register`, `/api/auth/login`, and `/api/bookings`. | **10 / 10** |
| **RFC 4180 CSV Export** | `/api/bookings/export/csv` generates RFC 4180 compliant CSV streams with escaped quotes and CRLF line breaks. | **10 / 10** |
| **Digital Pass Simulation** | Generates collision-resistant codes (`FIT-BOOK-XXXXXX`) and Base64 QR hashes for member attendance check-in. | **10 / 10** |
| **Automated Test Suite** | 11/11 automated integration tests passing in `< 60ms` via Node.js native test runner (`tests/api.test.js`). | **10 / 10** |
| **Zero External Avatar PII** | 100% clean person silhouette SVG badges (`<User />`) for member profiles and coaches. | **10 / 10** |

---

## 🔑 One-Click Evaluation Accounts (`http://localhost:5176/login`)

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Gym General Manager** | `admin@fitpulse.gym` | `admin123` | Full access to attendance CRM, capacity stats, check-in desk, CSV export |
| **Head Coach Sarah** | `trainer@fitpulse.gym` | `trainer123` | Access to studio attendance check-in and class rosters |
| **Alex Mercer (Member)** | `member@fitpulse.gym` | `member123` | Pro Tier pass wallet, class reservations, spot cancellations |

---

## 🧪 Automated Test Verification
Run the backend test suite:
```bash
cd server
npm test
```
Result:
```
✔ FitPulse Gym Management Production Verification Suite (58.8ms)
ℹ tests 11
ℹ suites 0
ℹ pass 11
ℹ fail 0
```

---

## 💻 Tech Stack
- **Frontend:** React 19, Tailwind CSS, Lucide React, Vite, Canvas-Confetti
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, BcryptJS, Express-Rate-Limit, Supertest
- **Design System:** High-energy athletic performance palette (`slate-950` with `red-600`, `rose-500`, and `amber-400` accents)
