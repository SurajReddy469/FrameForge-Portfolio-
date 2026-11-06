# MediCare Plus – CarePoint Clinical Appointment & Patient Intake Platform
> **FrameForge Portfolio Flagship — Gig 1: Full-Stack MERN Application Development (Project 5)**  
> 🌐 **Live Vercel Production:** 🔗 [frameforge-medicare.vercel.app](https://frameforge-medicare.vercel.app/)

![MediCare Plus Header](https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80)

---

## 🏥 1. Executive Summary & Value Proposition

**MediCare Plus** is a clinical management and physician scheduling demonstration platform designed for outpatient medical practices and polyclinics. Built on the **MERN** stack (MongoDB, Express, React, Node.js) styled with **Tailwind CSS**, MediCare Plus showcases solutions for key scheduling challenges: **slot collision prevention**, **digital intake questionnaires**, **role-based authorization**, and **audited CSV export**. *(Note: MediCare Plus is an illustrative technical portfolio demonstration, not a certified clinical device or EHR system).*

### 🌟 Core Capabilities
- **Atomic Conflict-Free Appointment Engine:** Real-time slot locking prevents simultaneous double-bookings for the same physician, date, and time slot.
- **2-Step Digital Intake Demonstration:** Captures sample chief complaints, duration of symptoms, and history prior to arrival.
- **Cryptographic Confirmation Pass:** Generates collision-resistant verification codes (`CARE-APPT-XXXXXX`) with digital slip generator and browser print-to-PDF support.
- **Reception Desk Dashboard:** Staff desk interface with real-time status transitions (`Confirmed` ➔ `Checked-In` ➔ `Completed` ➔ `Cancelled`) and fast-action check-in timestamps.
- **RFC 4180 CSV Export:** Audited clinical appointment data export with sanitized fields, escaping, and patient confidentiality preservation.
- **Zero Role Escalation Security:** Strict server-side validation ensuring public patient registration cannot be escalated to doctor or admin roles.
- **Dual-Engine Offline Resilience:** High-availability architecture with an intelligent fallback store that keeps the application interactive with simulated local state even when database daemons are offline.

---

## 🛠️ 2. Tech Stack & Dedicated Ports

| Layer | Technology | Dedicated Port / Protocol |
| :--- | :--- | :--- |
| **Live Production** | Vercel Serverless Edge CDN | [frameforge-medicare.vercel.app](https://frameforge-medicare.vercel.app/) |
| **Frontend SPA** | React 18, Vite 5, Tailwind CSS, Lucide Icons, Canvas Confetti | `http://localhost:5177` |
| **Backend REST API** | Node.js, Express, JWT, BcryptJS, Express-Rate-Limit, Supertest | `http://localhost:5004` |
| **Database** | MongoDB & Mongoose (with automated dual-engine fallback) | `mongodb://127.0.0.1:27017/medicare_plus_db` |

---

## 👥 3. One-Click Demo Credentials

| Role | Email Address | Password | Permissions & Scope |
| :--- | :--- | :--- | :--- |
| **Reception Staff (Admin)** | `admin@medicare.clinic` | `Password123!` | Full reception roster, check-in patients, update status, export CSV |
| **Attending Physician** | `doctor@medicare.clinic` | `Password123!` | Clinical department schedule, patient symptom intake review |
| **Registered Patient** | `patient@medicare.clinic` | `Password123!` | Book consultations, view appointment slip, track status, cancel visit |

---

## 🌐 4. API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` — Patient registration (enforces `role: 'patient'`)
- `POST /api/auth/login` — Authenticate and receive signed JWT
- `GET /api/auth/me` — Retrieve current authenticated session

### 🩺 Doctors & Specialties (`/api/doctors`)
- `GET /api/doctors` — Search doctors by specialty, department, or keyword
- `GET /api/doctors/:id` — Detailed physician profile, qualifications, and fee
- `GET /api/doctors/:id/availability?date=YYYY-MM-DD` — Real-time available slot engine

### 🏥 Clinical Departments (`/api/departments`)
- `GET /api/departments` — List 6 departments (Cardiology, Orthopedics, Pediatrics, Neurology, Dermatology, General Medicine)
- `GET /api/departments/:code` — Department details with active physician roster

### 📅 Appointments & Scheduling (`/api/appointments`)
- `POST /api/appointments` — Atomic conflict-checked booking with intake
- `GET /api/appointments/my` — Patient's personal appointment history
- `GET /api/appointments/code/:code` — Public digital pass lookup
- `GET /api/appointments` — *(Admin/Doctor)* Complete clinical roster with filters
- `PATCH /api/appointments/:id/status` — *(Admin/Doctor)* Update status (`Checked-In`, `Completed`)
- `POST /api/appointments/:id/cancel` — Cancel appointment with audit reason
- `GET /api/appointments/export/csv` — *(Admin only)* RFC 4180 CSV download

---

## 🧪 5. Automated Verification Test Suite

MediCare Plus includes an automated test suite verifying all 13 core production assertions (auth security, atomic slot collision prevention, role authorization, and RFC 4180 CSV export):

```bash
cd Gig1/Project5-Clinic/server
npm test
```

### Verified Test Assertions (13/13 Pass):
1. `GET /api/health` ➔ 200 OK service alive
2. `GET /api/departments` ➔ 200 OK medical departments array
3. `GET /api/doctors` ➔ 200 OK active physicians directory
4. `POST /api/auth/register` ➔ 201 Created patient account
5. `POST /api/auth/register` ➔ 403 Forbidden on privilege escalation attempt
6. `POST /api/auth/login` ➔ 200 OK valid credentials & JWT issuance
7. `POST /api/auth/login` ➔ 401 Unauthorized invalid password
8. `POST /api/auth/login` ➔ 200 OK admin role token
9. `POST /api/appointments` ➔ 201 Created with `CARE-APPT-XXXXXX`
10. `POST /api/appointments` ➔ 409 Conflict atomic slot double-booking rejection
11. `GET /api/appointments/code/:code` ➔ 200 OK digital slip lookup
12. `GET /api/appointments` ➔ 403 Forbidden without admin credentials
13. `GET /api/appointments/export/csv` ➔ 200 OK RFC 4180 compliant CSV stream

---

## 🚀 6. Running Locally

```bash
# 1. Start Server (Port 5004)
cd Gig1/Project5-Clinic/server
npm install
npm start

# 2. Start Frontend Client (Port 5177)
cd Gig1/Project5-Clinic/client
npm install
npm run dev -- --port 5177
```
