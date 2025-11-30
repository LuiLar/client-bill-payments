# client-bill-payments

Frontend application for managing client bills and payments. Built with Next.js and React, this app talks to the [service-bill-payments](https://github.com/LuiLar/service-bill-payments) API to create bills, show pending bills, and display payment history.

Quick summary

- Stack: Next.js, React 19, Tailwind CSS, TypeScript.
- Purpose: UI for creating bills, marking them paid (through API), and viewing client bill lists.

## Getting started

#### Prerequisites

- Node.js 18+ and npm or yarn.
- Duplicate and rename `.env.example` to `.env`.
- The `service-bill-payments` API running and reachable.
- Set `NEXT_PUBLIC_API_URL` as the running API's URL.

#### Install dependencies

```bash
cd client-bill-payments
npm install
```

#### Run in development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

#### Build and run production

```bash
npm run build
npm start
```

#### Project structure (important files/folders)

- `app/` — Next.js app routes and pages.
- `components/` — React components used across the app.
- `context/` — provides API integration to components.
- `lib/` — utility functions.

#### API endpoints used by the frontend

- `POST /bills` — create a bill.
- `POST /payments` — mark a bill as paid.
- `GET /clients/:id/pending-bills` — fetch pending bills for a client.
- `GET /clients/:id/payment-history` — fetch paid bills for a client.

#### Notes and recommendations

- The frontend expects `clientId` to be numeric when interacting with the API.
- Didn't have time to add unit testing.
- Didn't have time to implement memoize logic performance wise.
- Alerts could be replaced by dialog modals.
