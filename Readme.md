# TripSathi 🚆🚌🏨

> One platform. Every Indian journey.

TripSathi unifies trains, buses, hotels, and itinerary planning into one seamless platform — built for every Indian traveler, from metros to Tier-2/3 cities.

---

## 🚨 The Problem

India's travel ecosystem is completely fragmented. IRCTC for trains, redBus for buses, MakeMyTrip for hotels — no single platform connects them.

- **4+ apps** needed to plan one trip
- **3–5 hours** average planning time per trip
- **800M+ Indians** underserved by current tools
- **600M+ Tier-2/3 city users** with zero access to a unified, accessible travel planning tool

---

## ✅ Our Solution

TripSathi brings it all together:

- **Unified Multi-Modal Search** — Single search fetches trains + buses + hotels together. No switching apps. No missing the best deal.
- **Smart Route Aggregation** — Combines govt + private transport options and ranks by price, duration, and comfort. Finds combos no single app shows.
- **Price Comparison Engine** — Real-time side-by-side pricing across transport modes and hotels. Saves avg ₹500+ per trip booking.
- **Itinerary Saver & Sharer** — Save full trip plans (transport + hotel) to your account. Share via link with family or co-travelers.
- **Tier-2/3 Accessibility** — Hindi-first UI, low-bandwidth optimized, works on entry-level Android phones.

---

## 🧑‍🤝‍🧑 Target Audience

| Segment | Need |
|---|---|
| Students & Budget Travelers | Price-sensitive, mobile-first |
| Families | Multi-mode + hotel bundling |
| Tier-2/3 City Users | Hindi/regional language support |

---

## 🏁 Competitor Gap

| Feature | IRCTC | redBus | **TripSathi** |
|---|---|---|---|
| Train Booking | ✅ | ❌ | ✅ |
| Bus Booking | ❌ | ✅ | ✅ |
| Hotel Booking | ❌ | ❌ | ✅ |
| Price Comparison | ❌ | ❌ | ✅ |
| Itinerary Saver | ❌ | ❌ | ✅ |
| Hindi/Regional UI | ❌ | ❌ | ✅ |

---

## 🛠️ Tech Stack (Summary)

- **Frontend:** React / Next.js 14, Tailwind CSS
- **Backend:** Node.js 20, Express.js
- **Database:** MongoDB Atlas, Redis Cache
- **APIs:** Google Maps, IRCTC, redBus/AbhiBus, OYO, MakeMyTrip, Goibibo
- **Deployment:** Vercel (frontend), Render/Railway (backend)

---

## 💰 Business Model

- **Booking Commission:** 2–5% per confirmed booking
- **Premium Subscription:** ₹99/month for power users
- **B2B API Licensing:** Route aggregation engine licensed to travel agents & state tourism boards

---

## 👥 Team

**Crimson Syndicate** — Built at Hacknovate 7.0

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/crimson-syndicate/tripsathi.git
cd tripsathi

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

> **Note:** A mock API fallback is included — the full demo works without live API keys.
