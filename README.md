# JENU'S Kashmir Gourmet — Luxury Valley Dry Fruits & Spices E-Commerce Platform

A state-of-the-art, high-conversion, luxury e-commerce web platform and operations suite for **JENU'S Kashmir Gourmet**, celebrating the authentic harvest of Kashmir with modern web aesthetics, interactive experiences, real-time Razorpay payment integration, a mobile phone consignment tracking system, and a frontend-accessible Admin Database.

---

## 🏔️ Highlights & Key Features

1. **Valley Harvest Catalog & Authentic Spices**:
   - High-grade Kashmiri Mamra Almonds, Kagzi Snow Walnuts, Grade-1 Pampore Mongra Saffron, Sun-Dried Figs, Wild Apricots, and Himalayan Chilgoza.
   - Naturally grown mountain spices: Kashmiri Mirch (Degi Red), Shahi Jeera, Whole Green Cardamom, and Wazwan Masala Ver.
   - Value & Super Saver Combos with automated savings tags and bundle pricing.

2. **Interactive Bespoke Hamper Builder**:
   - Real-time 3D-styled wooden box selector (Royal Walnut Carved, Chinar Velvet, Classic Pine).
   - Dynamic 3-to-5 item filling picker with interactive visual slot preview.
   - Personalized greeting card message note preview.

3. **Secure Razorpay Payment Gateway**:
   - Integrated with official Razorpay Checkout SDK.
   - Test API Key: `rzp_test_Tf36riXXdeFssw`
   - Complete checkout support for UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Wallets with 100% prepaid order confirmation.

4. **Mobile Number Consignment Tracker**:
   - Customers simply enter their 10-digit mobile number (e.g. `9876543210`) to track their orders.
   - Animated 5-step consignment stepper:
     1. Harvest Verified & Lab Tested (Pampore & Shopian)
     2. Nitrogen Vacuum Sealed (Srinagar Terminal)
     3. Air Cargo Transit (IndiGo Flight 6E-204)
     4. Regional Distribution Hub
     5. Consignment Delivered to Doorstep
   - Live Air Waybill (AWB) number and flight telemetry.

5. **Master Database & Admin Operations Portal**:
   - Accessible straight from the frontend via the **`🔐 Admin DB`** button in the header, navigation, floating dock, or URL hash (`#admin` / `#database`).
   - Protected by admin authentication:
     - **Admin ID**: `admin@jenus.com` (or `jenus_admin`)
     - **Password**: `Kashmir2026!`
   - Product Inventory Management: One-click stock toggle (`[ ✓ In Stock ]` / `[ ✕ Out of Stock ]`), bestseller marker (`[ ⭐ Bestseller ]` / `[ ☆ Regular ]`), and stock unit count editor.
   - Real-Time Storefront Reactivity: Out-of-stock items automatically disable the "Add to Cart" button and display "Out of Stock" across the store.
   - Live Consignment Advancement Controller: Advance order stages (1–5) and update AWB tracking codes, syncing immediately with customer phone tracking.
   - Revenue & Analytics Overview + Database JSON Export & Factory Reset utilities.

6. **Physical Heritage Branches Showcase**:
   - **Delhi Historic Branch**: **Kashyap Nathoo** *(Branch of JENU'S)* — Chandni Chowk, Khari Baoli Market, Gali Hinga Bag, Delhi – 110006.
   - **Srinagar Valley Flagship Hub**: **JENU'S Srinagar Valley Center** — Cherry Garden, गोग्जी बाग (Gogji Bagh), Srinagar, Kashmir – 190008.

7. **Immersive Audio & Visual Experience**:
   - Kashmiri Chinar & Saffron autumn breeze animation toggle.
   - Kashmiri Santoor ambient music soundscape using high-fidelity Web Audio synthesis.
   - Senior Orchardist Valley Concierge live chat assistant with automated knowledge of branches, recipes, and certifications.
   - FSSAI Central License `#10026061000412` and laboratory test certificate modal.

---

## 📁 Project Structure

```text
jenus-kashmir-dryfruits/
├── dist/                         # Compiled production distribution build (ready to deploy)
│   ├── index.html
│   └── assets/
│       ├── index-*.css
│       └── index-*.js
├── public/                       # Static public assets
│   ├── favicon.svg               # JENU'S royal emblem favicon
│   └── images/                   # High-resolution Kashmir harvest photography
│       ├── hero-kashmir.jpg
│       ├── saffron-pampore.jpg
│       ├── mamra-almonds.jpg
│       ├── walnuts-akhrot.jpg
│       ├── chilgoza-pine-nuts.jpg
│       ├── kashmiri-kahwa.jpg
│       ├── figs-apricots.jpg
│       ├── gift-hamper.jpg
│       ├── combos-pack.jpg
│       ├── spices-assortment.jpg
│       ├── kashmiri-mirch.jpg
│       ├── shahi-jeera.jpg
│       └── wazwan-masala.jpg
├── src/                          # Application source code
│   ├── admin-portal.js           # Full-screen Master Database portal & login modal
│   ├── ambient-leaves.js         # Canvas falling Chinar leaves & saffron breeze engine
│   ├── audio.js                  # Kashmiri Santoor Web Audio synthesis engine
│   ├── cart.js                   # Cart state management, coupons, and wishlist store
│   ├── data.js                   # Products, categories, hampers, and reviews catalog
│   ├── database.js               # Reactive local persistent database engine (dbStore)
│   ├── interactive-features.js   # 3D card tilt, saffron water test, and scroll reveal
│   ├── main.js                   # Master application orchestrator and controller
│   ├── razorpay.js               # Razorpay checkout integration and payment simulator
│   ├── style.css                 # 6,000+ lines of vanilla CSS design system
│   └── tracking.js               # Phone-based consignment tracker with 5-step stepper
├── .env                          # Razorpay API key configuration
├── .env.example                  # Template configuration file
├── index.html                    # Main HTML5 entry point
├── package.json                  # Node dependencies and build scripts
└── README.md                     # Documentation and guide
```

---

## 🚀 How to Run on Your PC

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Step 1: Install Dependencies
Open a terminal (Command Prompt or PowerShell) inside this folder and run:
```bash
npm install
```

### Step 2: Start the Local Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

### Step 3: Build for Production (Optional)
To create an optimized production build:
```bash
npm run build
```
The output will be placed in the `dist/` directory, ready to deploy to any web host (Vercel, Netlify, Cloudflare Pages, AWS S3, etc.).

---

## 🔐 Admin Login Credentials
- **URL**: Click **`🔐 Admin DB`** on the storefront or visit `http://localhost:5173/#admin`
- **Admin ID**: `admin@jenus.com` (or `jenus_admin`)
- **Password**: `Kashmir2026!`
- *(Tip: You can click the **`⚡ Auto-Fill Credentials`** button inside the modal to instantly fill and sign in).*

---

## 🏛️ Physical Branch Details

1. **Delhi Branch (Kashyap Nathoo)**:
   - Name: **Kashyap Nathoo** *(Branch of JENU'S)*
   - Address: Chandni Chowk, Khari Baoli Market, Gali Hinga Bag, Delhi – 110006, India
   - Market: Asia's premier wholesale dry fruit & spice bazaar

2. **Srinagar Flagship (Central Hub)**:
   - Name: **JENU'S Srinagar Valley Center**
   - Address: Cherry Garden, गोग्जी बाग (Gogji Bagh), Srinagar, Jammu & Kashmir – 190008, India
   - Function: Central processing, quality grading, and express air-cargo terminal

---

© 2026 JENU'S Kashmir Gourmet Pvt. Ltd. All rights reserved. FSSAI Central License #10026061000412.
