# Instacart — Grocery Delivery

A full-stack online grocery and fast delivery platform. Customers can browse products, manage their cart, place orders, and track deliveries in real time. The admin panel handles inventory and order management; the delivery partner panel supports field operations for couriers.

---

## Features

### Customer
- Product listing, search, filtering, and category browsing
- Flash deals and popular products
- Cart management and multi-step checkout (address → payment → review)
- Saved address management with location coordinates
- Order history and live order tracking (Leaflet map)
- Stripe card payments or cash on delivery (COD)
- JWT-based authentication

### Admin
- Dashboard statistics
- Create, edit, and delete products (Cloudinary image uploads)
- Update order status and assign delivery partners
- Create delivery partners and manage active/inactive status
- Email-based admin access via the `ADMIN_EMAILS` env variable

### Delivery Partner
- Dedicated login panel (`/delivery/login`)
- Active and completed deliveries
- Order status updates (Packed, Out for Delivery)
- OTP-based delivery confirmation
- Live location sharing

### Background Automations (Inngest)
- Low stock alerts → admin email
- Monthly promotional emails (1st of every month at 10:00 AM)
- Auto-assign courier 5 minutes after order placement + OTP generation

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Axios, Leaflet, React Hot Toast |
| **Backend** | Node.js, Express 5, TypeScript, JWT, bcrypt |
| **Database** | PostgreSQL, Prisma ORM (Neon adapter) |
| **Payments** | Stripe Checkout |
| **Media** | Cloudinary |
| **Email** | Nodemailer (SMTP) |
| **Automation** | Inngest |
| **Deploy** | Vercel (client + server) |

---

## Project Structure

```
Grocery-Delivery/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── context/        # Auth & Cart context
│   │   ├── pages/          # Customer, admin, delivery pages
│   │   └── config/         # Axios API configuration
│   └── vercel.json
├── server/                 # Express API
│   ├── controllers/        # Route handlers
│   ├── middleware/         # auth, admin, deliveryAuth
│   ├── routes/             # API routes
│   ├── inngest/            # Background jobs
│   ├── prisma/             # Schema and migrations
│   ├── seed.ts             # Sample product data
│   └── vercel.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database ([Neon](https://neon.tech) recommended)
- (Optional) Stripe, Cloudinary, SMTP, and Inngest accounts

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/Grocery-Delivery.git
cd Grocery-Delivery
```

### 2. Backend

```bash
cd server
npm install
```

Create a `server/.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Auth
JWT_SECRET="your-strong-secret-key"

# Admin (comma-separated emails)
ADMIN_EMAILS="admin@example.com"

# Stripe (for card payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Cloudinary (admin product image uploads)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Email (Inngest notifications)
SMTP_USER="..."
SMTP_PASS="..."
SENDER_EMAIL="noreply@example.com"

# App
PORT=5000
CLIENT_URL="http://localhost:5173"
```

Set up the database and seed sample products:

```bash
npx prisma db push
npm run seed
```

Start the server:

```bash
npm run server
```

API: `http://localhost:5000`

### 3. Frontend

```bash
cd client
npm install
```

Create a `client/.env` file:

```env
VITE_BASE_URL=http://localhost:5000/api
VITE_CURRENCY_SYMBOL=$
```

Start the development server:

```bash
npm run dev
```

App: `http://localhost:5173`

---

## Usage

| Role | URL | Notes |
|------|-----|-------|
| Customer | `/` | Register or log in |
| Checkout | `/checkout` | Requires login |
| Addresses | `/addresses` | Requires login |
| Orders | `/orders` | Requires login |
| Admin | `/admin` | Log in with an email listed in `ADMIN_EMAILS` |
| Delivery | `/delivery/login` | Account created from the admin panel |

> **Admin access:** Your login email must be defined in the `ADMIN_EMAILS` environment variable.

> **Delivery partner:** Create a partner from the admin panel, then log in at `/delivery/login`.

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/products` | Product list (filter, search, sort) |
| GET | `/api/products/flash-deals` | Discounted products |
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | User orders |
| GET | `/api/addresses` | Saved addresses |
| POST | `/api/delivery/login` | Delivery partner login |
| GET | `/api/delivery/my-deliveries` | Assigned deliveries |
| GET | `/api/admin/stats` | Admin dashboard |

---

## Architecture

```mermaid
flowchart LR
    subgraph Client
        A[Customer App]
        B[Admin Panel]
        C[Delivery App]
    end

    subgraph Server
        D[Express API]
        E[Inngest Jobs]
    end

    subgraph Services
        F[(PostgreSQL)]
        G[Stripe]
        H[Cloudinary]
        I[SMTP]
    end

    A --> D
    B --> D
    C --> D
    D --> F
    D --> G
    D --> H
    E --> F
    E --> I
    D --> E
```

---

## Production Build

```bash
# Frontend
cd client && npm run build

# Backend
cd server && npm run build
```

Both folders include a `vercel.json` for separate Vercel deployments. In production, set `VITE_BASE_URL` to your live API URL.

---

<img width="1919" height="1079" alt="Grocery-Delivery" src="https://github.com/user-attachments/assets/4cebff6b-b1f8-43b9-a03c-358c58dfe142" />

---

## License

This project was built for learning and portfolio purposes.
