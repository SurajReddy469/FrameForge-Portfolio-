# Gig 1 production readiness

The five projects are portfolio examples. Their local demo flows are not proof of a live business, payment processing, email delivery, or customer demand. Before presenting one as a real business website, deploy it and replace demo identity, sample content, and contact information with verified business details.

## API configuration added

Each frontend now reads `VITE_API_URL`; it defaults to `/api` so the existing Vite development proxy continues to work. Copy the frontend `.env.example` to `.env` for local work. For separately hosted frontend and API, set `VITE_API_URL` to the public API origin plus `/api` and allow the frontend origin in the backend's `CLIENT_URL` setting. Vite embeds `VITE_*` values at build time, so set them before building.

FitPulse and MediCare Plus now read `CLIENT_URL` for production CORS. ApexMedia, FitPulse, and MediCare Plus reject weak or missing production JWT secrets; all five APIs require persistent MongoDB in production. Clinic no longer auto-seeds fictional patients and appointments in production. Their server `.env.example` files list the required database, port, and JWT settings. Keep secrets in the host's secret settings; never commit `.env` files.

## Must complete for real customer use

1. Deploy each frontend and API, attach persistent MongoDB, set production secrets and allowed origins, and verify the public health endpoint.
2. Replace fictional sample listings, reviews, staff, prices, addresses, and demo accounts with authorized, accurate business content. UrbanNest and GourmetHaven WhatsApp buttons are disabled until `VITE_BUSINESS_WHATSAPP` is configured with a business-owned international number. Remove seeded demo credentials from any public production environment.
3. Configure a business-owned phone/email and test that customer leads and bookings reach a monitored account. Set real operating hours, service area, cancellation, privacy, and refund policies.
4. GourmetHaven's card/UPI checkout is a demo: integrate a payment provider and reconcile payment webhooks before accepting paid orders. Configure delivery coverage and order notifications.
5. FitPulse plan selection is a demo and does not activate a paid membership; connect billing and entitlement updates before selling memberships.
6. UrbanNest tour and inquiry workflows, ApexMedia lead forms, and MediCare Plus appointment requests need operational follow-up. Test each submission from a public browser and confirm it appears in the relevant admin workflow.
7. Run production builds and the backend suites, then check mobile layout, form validation, error states, accessibility, analytics, and backups before launch.

No real business contact details, payment credentials, domains, or hosting accounts were present in the workspace, so those launch-specific settings must be supplied by the site owner.
