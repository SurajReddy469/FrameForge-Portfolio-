# GourmetHaven – Artisanal Fine Dining & Online Culinary Experience
> **FrameForge Portfolio Showcase | Gig 1 (Full-Stack Website Development) – Project 2 of 5**

A full-stack fine dining restaurant demo built with MongoDB, Express, React, and Node.js, styled with Tailwind CSS. Payment processing and outbound email/SMS are not connected.

---

## 🌟 Live Demo & Quick Access
- **Live Vercel Production**: 🔗 [frameforge-gourmethaven.vercel.app](https://frameforge-gourmethaven.vercel.app/)
- **Local Web Application**: [http://localhost:5174/](http://localhost:5174/)
- **Local REST API**: [http://localhost:5001/api/health](http://localhost:5001/api/health)
*(Project 1 - UrbanNest continues to run concurrently on ports 5000 / 5173)*

---

## ⚡ 1-Click Evaluation Credentials
- **Executive Manager (Admin)**: `admin@gourmethaven.com` / `admin123`
- **Gourmet Foodie (Customer)**: `user@gourmethaven.com` / `user123`
*(Both available via 1-click preset buttons on the `/login` screen)*

---

## 🔒 Security and Demo Behavior
1. **Zero Role Escalation**: Public registration strictly forces `role = 'user'`, preventing privilege escalation exploits.
2. **Server-calculated Pricing**: Client prices and totals are ignored. Supported catalog items, taxes (5% GST), promo codes, and delivery fees are calculated on the server.
3. **Protected Admin & Customer Data**: Role-based access control guards all administrative order and reservation endpoints.
4. **Intelligent Network Fallback**: Real HTTP application errors (400, 401, 403) are surfaced cleanly to users rather than silently masked in localStorage.
5. **JWT Configuration**: Production startup requires a `JWT_SECRET` of at least 32 characters. Production seeding requires `ADMIN_SEED_PASSWORD` of at least 16 characters and does not create the demo customer.
6. **Demo Storage**: When MongoDB is unavailable, in-memory API records are temporary and may be lost on restart. Browser fallback data stays in that browser.
7. **Payment and Reservations**: Payment remains pending until a provider integration confirms it. New table requests are pending until staff confirmation. Each zone has a seat capacity per time slot (Main Dining Hall 40, Terrace 24, Chef Table 8, Rooftop 30), and requests are rejected when that capacity is reached. The current app does not send email or SMS.
8. **Automated Tests**: The backend suite covers validation, authorization, pricing, idempotency, and reservation slot conflicts. Run it with `npm test` from `server`.

```bash
# Run backend test suite
cd server
npm test
```

---

## 🚀 Key Features & Capabilities

### 🍽️ 1. Interactive Digital Tasting Menu
- Multi-category navigation: `Chef Specials`, `Starters`, `Main Course`, `Woodfired & Pasta`, `Desserts`, `Beverages`.
- Dietary profile filters: `Vegetarian`, `Vegan`, `Gluten-Free`, `Halal`, `Chef's Signature`.
- Real-time search across ingredients, descriptions, and preparation styles.
- Dynamic sorting by Chef's Recommendation, Price (Low/High), and Customer Ratings.
- Interactive **Dish Detail Modal** with calorie counts, spice meter, preparation time, and special allergy instructions.

### 📅 2. Priority Table Reservation Engine
- Party size selector (1 to 12+ guests).
- Date picker with instant validation.
- Lunch shift (12:00 PM – 2:30 PM) & Dinner shift (7:00 PM – 9:30 PM) time slot selector.
- 4 luxury seating ambience zones:
  - *Main Dining Hall*
  - *Outdoor Terrace Garden*
  - *Private Chef Table*
  - *Skyline Rooftop Lounge*
- Occasion customization (Romantic Date, Anniversary, Birthday, Business Summit).
- Instant confirmation ticket with unique code (`GH-RES-XXXXXX`), canvas confetti, and **1-click WhatsApp Concierge deep link**.

### 🛍️ 3. Online Ordering & Sliding Cart Drawer
- Persistent floating slide-over culinary bag.
- Item quantity stepper `[- 1 +]` and custom prep notes.
- Promo discount system (`GOURMET10` for 10% off, `TASTEFULL` for ₹150 off).
- Live tip selector for culinary crew.
- Smart bill calculator: Subtotal, 5% GST, free delivery above ₹999.
- Checkout flow with simulated Payment Gateway (Card, UPI / Instant Pay, Cash on Delivery).

### 🧭 4. Real-Time Order Tracking
- Track active food tickets with order code (e.g. `GH-ORD-104921`).
- Live visual progress pipeline: `Order Confirmed` -> `Artisanal Preparation` -> `Out for Delivery` -> `Delivered`.

### 📊 5. Operations & Kitchen Manager Hub (Admin CRM)
- Executive KPI dashboard: Total Gross Revenue, Active Orders count, Confirmed Tables, Active Tasting dishes.
- **Orders CRM**: Status progression controls (`Start Prep`, `Dispatch`, `Mark Delivered`).
- **Reservation Manager**: Table seating management and status updates.
- **Menu Management**: Add new dish modal with live pricing and category assignments.
- **Export CSV**: 1-click download of all restaurant transactions.

---

## 🛠️ Architecture & Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS v4, Lucide-React, Canvas Confetti.
- **Backend**: Node.js, Express.js, JWT, bcryptjs, CORS, Morgan.
- **Database**: MongoDB (Mongoose) with complete resilient mock fallback in `api.js` for zero-friction evaluation.
