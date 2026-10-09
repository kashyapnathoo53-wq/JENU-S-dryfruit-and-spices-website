# JENU'S Kashmir Dryfruit and Spices - Full-Stack Production Deployment Guide

This guide covers step-by-step instructions to deploy the complete full-stack store:
- **Frontend**: Vite + Vanilla HTML/CSS/JS (Cloudflare Pages, Vercel, Netlify, or Render Static)
- **Backend**: Python Flask REST API with Gunicorn (Render Web Service)
- **Database**: PostgreSQL (Supabase)
- **Payments**: Razorpay Server-Verified Gateway & Webhooks

---

## Architecture Overview

```
Patron Browser (Vite Storefront)
   │
   ├─► [GET /api/products] ───────────────► Flask REST API (Render)
   ├─► [POST /api/orders/create] ─────────►       │
   ├─► [POST /api/payments/verify] ───────►       ├──► Supabase PostgreSQL (SSL)
   │                                              │      - Products & Variants
   ▼                                              │      - Inventory & Stock
Razorpay Checkout SDK                            │      - Orders & Order Items
   │                                              │      - Payments & Signatures
   └─► [POST /api/payments/webhook] ──────────────┘      - Wholesale Bulk Leads
```

---

## 1. Database Setup: Supabase PostgreSQL

1. Log in to [Supabase](https://supabase.com) and click **New project**.
2. Select an organization, name the project (e.g., `jenus-kashmir`), set a secure database password, and pick the region closest to India (e.g. **Mumbai `ap-south-1`** or **Singapore `ap-southeast-1`**).
3. Once the database is ready, navigate to the **SQL Editor** in your Supabase dashboard.
4. Copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**.
   - This creates all 7 relational tables (`products`, `product_variants`, `orders`, `order_items`, `payments`, `admin_users`, `wholesale_inquiries`), indexes, cascade rules, and updated-at triggers.
5. In Supabase, go to **Project Settings** ➔ **Database** ➔ **Connection String**.
   - Select **URI** mode (Transaction pooler on port 6543 or Direct on 5432).
   - Copy the string: `postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`
6. Migrate all 74 products and seed data into Supabase:
   ```bash
   # From your local machine or build terminal:
   $env:DATABASE_URL="postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
   python -m backend.seed
   ```
   All 74 products, 18 categories, weights, badges, and the default admin user will be seeded into Supabase.

---

## 2. Backend Deployment: Render Web Service

1. Log in to [Render](https://render.com) and click **New +** ➔ **Web Service**.
2. Connect your GitHub repository: `https://github.com/kashyapnathoo53-wq/JENU-S-dryfruit-and-spices-website`
3. Configure settings:
   - **Name**: `jenus-kashmir-api`
   - **Region**: Singapore (`sing`)
   - **Branch**: `main`
   - **Root Directory**: `.` (leave empty for repo root)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `gunicorn backend.app:app --bind 0.0.0.0:$PORT --workers 4 --threads 2 --timeout 120`
   - **Health Check Path**: `/api/health`
4. Add **Environment Variables** in Render Dashboard:
   | Variable | Value / Description |
   |---|---|
   | `PYTHON_VERSION` | `3.11.9` |
   | `FLASK_ENV` | `production` |
   | `DATABASE_URL` | Your Supabase PostgreSQL Connection URI |
   | `SECRET_KEY` | Long random 32-byte secret (e.g. `openssl rand -hex 32`) |
   | `JWT_SECRET_KEY` | Strong random key for admin authentication |
   | `RAZORPAY_KEY_ID` | Your Razorpay Key ID (`rzp_live_...` or `rzp_test_...`) |
   | `RAZORPAY_KEY_SECRET` | Your Razorpay Key Secret |
   | `RAZORPAY_WEBHOOK_SECRET`| Your webhook secret configured in Razorpay dashboard |
   | `CORS_ORIGINS` | Comma-separated domains: `https://your-frontend.pages.dev,http://localhost:5173` |
5. Click **Create Web Service**.
6. When deployment finishes, test the endpoint:
   `https://jenus-kashmir-api.onrender.com/api/health` ➔ should return `{"status": "healthy", "database": "connected"}`.

---

## 3. Frontend Deployment: Cloudflare Pages / Render Static / Vercel

### Option A: Cloudflare Pages (Recommended for Indian Latency)
1. In Cloudflare Dashboard, go to **Workers & Pages** ➔ **Create application** ➔ **Pages** ➔ **Connect to Git**.
2. Select your repository.
3. Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Environment Variables:
   - `VITE_API_URL`: `https://jenus-kashmir-api.onrender.com/api`
   - `VITE_RAZORPAY_KEY_ID`: Your Razorpay Key ID
5. Click **Save and Deploy**.

### Option B: Local Testing
```bash
# Terminal 1: Run Flask REST API
python -m backend.app

# Terminal 2: Run Vite Dev Server
npm run dev
```
Open `http://localhost:5173`. Any requests to `/api` are automatically proxied to Flask on port 5000.

---

## 4. Razorpay Webhook Configuration

To guarantee 100% order capture even if the patron's browser closes before the frontend callback completes:

1. Open [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Go to **Settings** ➔ **Webhooks** ➔ **Add New Webhook**.
3. **Webhook URL**: `https://jenus-kashmir-api.onrender.com/api/payments/webhook`
4. **Secret**: Enter a secret string and save the same string in Render as `RAZORPAY_WEBHOOK_SECRET`.
5. Select active events:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
6. Click **Save**.

---

## 5. Administrative Access & Security Controls

### Default Admin Account
- **Admin Email**: `admin@jenus.com`
- **Initial Password**: `KashmirValley2026!Secure` (configured via seed script or `ADMIN_PASSWORD` env var)

### Security Features Implemented
- **No Client Secrets**: Razorpay `keySecret` removed from client-side bundles.
- **Server Price Validation**: Anti-tampering cart recalculation on every checkout; client-side price overrides are completely rejected.
- **HMAC SHA-256 Signatures**: All payment callbacks validated with Razorpay signatures server-side.
- **JWT Authorization**: Admin operations (inventory, pricing, status, leads) strictly guarded by PyJWT.
- **SQLAlchemy Concurrency**: Stock decrement executed in atomic database transactions.
- **HTTPS & Security Headers**: Strict CORS, X-Content-Type-Options, X-Frame-Options, and referrer policy.
