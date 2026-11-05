# UrbanNest – Full-Stack MERN Real Estate Marketplace

> **FrameForge Portfolio Showcase – Gig 1: Full-Stack Website Development**  
> Modern luxury real estate portal engineered with React, Node.js, Express, and MongoDB.

---

## 1. Project Overview & Business Purpose
Real estate firms, property developers, and independent brokers need a high-converting web platform that combines aesthetic visual listings with lead-generation tools and back-office management.

**UrbanNest** addresses this need by providing:
- High-resolution architectural presentation for luxury residences, penthouses, villas, and apartments.
- Fast multi-criteria search and dynamic filtering by city, property type, price, and bedrooms.
- High-converting property detail views with photo galleries and direct agent inquiry capture.
- **Interactive Mortgage & EMI Estimator:** Live sliders for Down Payment, Loan Duration, and Bank Interest rate with dynamic Principal vs. Interest calculations.
- **Side-by-Side Property Comparison Matrix:** Floating compare bar allowing users to compare up to 3 properties side-by-side across pricing, specs, rates/sqft, and amenities.
- **Modern Tour Appointment Booking:** Allows clients to book either an In-Person Walkthrough or a Live Video Call with selectable date and time windows.
- **Verified Broker Profile & 1-Click WhatsApp Integration:** Direct WhatsApp pre-filled messaging with licensed listing agents.
- **Neighborhood & Connectivity Hub:** Verified commute benchmarks to Airport, Metro, Hospitals, and International Schools.
- **Printable Property Spec Sheet:** 1-Click clean print/PDF brochure generator for executive buyers.
- **Admin Lead CRM Analytics & CSV Export:** Search, filter, and export customer leads to CSV/Excel, with 1-click WhatsApp reply actions from the dashboard table.
- Secure, role-based Admin Control Center (JWT + bcrypt) for real-time listing CRUD and lead status management.
- Built-in resilient demo fallback ensuring 100% testability even without a local MongoDB service.

---

## 2. Technology Stack

### Frontend
- **React.js 18** (Vite build engine)
- **Tailwind CSS v4** & PostCSS
- **React Router DOM v6** (declarative routing & URL query state synchronization)
- **Lucide React** (modern iconography)
- **Axios** (API communication with automatic JWT Authorization interceptor)

### Backend
- **Node.js & Express.js** (REST API architecture)
- **MongoDB & Mongoose ODM** (indexed property models, user schemas, and inquiry tracking)
- **JWT (JSON Web Tokens)** & **bcryptjs** (secure authentication & password hashing)
- **CORS & Dotenv** (environment isolation)

---

## 3. Project Architecture & Structure

```
Project1-RealEstate/
├── client/                     # Frontend (React 18 + Vite + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/         # Navbar, Footer, PropertyCard, FilterBar
│   │   ├── context/            # AuthContext (user, favorites, login, logout)
│   │   ├── data/               # mockProperties.js (resilient fallback data)
│   │   ├── pages/              # HomePage, PropertiesPage, PropertyDetailPage, LoginPage, AdminDashboard
│   │   ├── services/           # api.js (Axios instance + fallback handlers)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API (Express + MongoDB)
│   ├── src/
│   │   ├── config/             # db.js (MongoDB connection)
│   │   ├── controllers/        # authController, propertyController, inquiryController
│   │   ├── middleware/         # authMiddleware, errorMiddleware
│   │   ├── models/             # User.js, Property.js, Inquiry.js
│   │   ├── routes/             # authRoutes, propertyRoutes, inquiryRoutes
│   │   ├── utils/              # seeder.js (sample data generator)
│   │   └── server.js           # Server entrypoint
│   ├── .env.example
│   └── package.json
│
└── README.md                   # Complete documentation
```

---

## 4. Quick Start & Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- (Optional) Local MongoDB or free MongoDB Atlas URI

### 1. Backend Server Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and adjust if needed
cp .env.example .env

# (Optional) Seed initial data into MongoDB:
npm run seed

# Start server in development mode:
npm run dev
# Server will run at: http://localhost:5000
```

### 2. Frontend Client Setup
```bash
# In a new terminal, navigate to client directory
cd client

# Install dependencies
npm install

# Start Vite development server
npm run dev
# Client will run at: http://localhost:5173
```

---

## 5. Environment Variables

### Server (`server/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment | `development` |
| `PORT` | Backend listening port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/urbannest_db` |
| `JWT_SECRET` | Unique JWT signing secret (at least 32 characters in production) | Generate a unique random value; never commit it |
| `JWT_EXPIRE` | Token expiry duration | `30d` |
| `CLIENT_URL` | Allowed frontend origin(s), comma-separated | `http://localhost:5173` |
| `SEED_ADMIN_PASSWORD` | Password for the seeded admin account | Set a unique password before running the seed command |

### Client (`client/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Express API endpoint | `http://localhost:5000/api` |

---

## 6. Demo Accounts (Quick Evaluator Access)
The login screen features 1-click **⚡ Quick-Click Demo Credentials**:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin / Broker** | `admin@urbannest.com` | Value of `SEED_ADMIN_PASSWORD` | Admin Portal (database seed only) |
| **Client / User** | `user@urbannest.com` | `user123` | Local demo mode when the API is unavailable |

Demo credential buttons are for offline preview only; they do not authenticate with the API when it is available. Set `SEED_ADMIN_PASSWORD` to create a database admin account.

> **Warning:** `npm run seed` currently clears all existing properties, users, and inquiries before inserting sample records. Use it only with an empty or disposable database. Do not run it against production data.

---

## 7. Fiverr Gig Presentation Copy

**Gig Category:** Full-Stack Website Development (MERN Stack)  
**Suggested Title:** I will build a responsive full-stack real estate and business website using MERN stack.

### Portfolio Showcase Description:
> *"Need a custom, high-converting real estate portal or business website built to scale? UrbanNest demonstrates FrameForge's end-to-end full-stack capabilities. Featuring a modern responsive design inspired by luxury architecture, fast multi-criteria property search, lead capture inquiry forms, and a password-protected broker dashboard with real-time inventory management. Built with clean React.js, Express, Node.js, and MongoDB without bloated templates."*

### Key Deliverables Demonstrated:
1. Fast, responsive layout optimized for mobile, tablet, and 4K displays.
2. Complete RESTful API architecture with secure JWT authorization.
3. Interactive listing management (create, update, delete, feature toggle).
4. Customer lead acquisition pipeline with status tracking (New, Contacted, Closed).
5. Clean code, modular components, and comprehensive setup documentation.
