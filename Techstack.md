# Tech Stack
## TripSathi — Unified Indian Travel Planning Platform

**Team:** Crimson Syndicate

---

## Architecture Overview

TripSathi follows a layered **3-tier architecture** — UI Layer, Logic Layer, and Data Layer — deployed on cloud platforms with a clear separation of concerns.

```
┌─────────────────────────────────────┐
│         User (Browser / Mobile)      │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│     React / Next.js 14 Frontend      │  ← Layer 1: UI Layer
│     (Vercel — SSR + CDN)             │
└────────────────┬────────────────────┘
                 │ REST API calls
┌────────────────▼────────────────────┐
│     Node.js 20 + Express.js API      │  ← Layer 2: Logic Layer
│     (Render / Railway)               │
└──────────┬───────────────┬──────────┘
           │               │
┌──────────▼──────┐  ┌─────▼───────────┐
│  MongoDB Atlas  │  │   Redis Cache   │  ← Layer 3: Data Layer
│  (Primary DB)   │  │  (15-min TTL)   │
└─────────────────┘  └─────────────────┘
           │
┌──────────▼──────────────────────────┐
│           External APIs              │
│  Transport | Hotels | Maps | Mock    │
└─────────────────────────────────────┘
```

---

## 1. Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.x | Component-based UI framework |
| **Next.js** | 14 | SSR, routing, performance optimization |
| **Tailwind CSS** | 3.x | Responsive, utility-first styling |

### Key Frontend Decisions
- **Next.js SSR** — Server-side rendering ensures fast load times on mobile networks and low-bandwidth environments (critical for Tier-2/3 users)
- **Tailwind CSS** — Rapid responsive UI development, optimized for 320px+ screen sizes (entry-level Android phones)
- **i18n-ready** — All strings abstracted for Hindi / English toggle via `next-i18next`

---

## 2. Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 20 LTS | JavaScript runtime |
| **Express.js** | 4.x | REST API framework |

### Key Backend Responsibilities
- Route aggregation: fetches from Transport API + Hotel API simultaneously (parallel `Promise.all` calls)
- Aggregation engine: sorts & ranks results by price, duration, and rating
- Itinerary CRUD: create, read, update, delete for saved trip plans
- Shareable link generation: UUID-based unique links per saved itinerary
- Mock API fallback: static JSON served when live API keys are unavailable

### API Design
- Architecture: REST
- Auth: JWT (JSON Web Tokens) for protected routes
- Format: JSON request/response
- Versioning: `/api/v1/...`

---

## 3. Database & Caching

| Technology | Purpose |
|---|---|
| **MongoDB Atlas** | Primary database — flexible schema for itineraries, search history, user preferences |
| **Redis Cache** | 15-minute TTL cache for transport search results to reduce API calls and improve response time |

### MongoDB Collections
```
users         → { _id, name, email, passwordHash, language, createdAt }
itineraries   → { _id, userId, title, transport[], hotels[], shareToken, createdAt }
searchHistory → { _id, userId, from, to, date, results[], createdAt }
```

### Caching Strategy
- Transport search results cached in Redis with key: `search:{from}:{to}:{date}`
- TTL: 15 minutes (real-time sync optimization)
- Cache miss → fetch from external APIs → store in Redis → return to client

---

## 4. External APIs

### Transport Layer
| API | Provider | Data |
|---|---|---|
| IRCTC API | Indian Railways | Train schedules, availability, fares |
| redBus / AbhiBus API | Bus aggregators | Bus routes, timings, pricing |
| Govt transport feeds | State RTCs | State bus data |

### Hotel Layer
| API | Provider | Data |
|---|---|---|
| OYO API | OYO Rooms | Budget hotel listings |
| MakeMyTrip feed | MMT | Hotel inventory + pricing |
| Goibibo listings | Goibibo | Hotel availability |

### Maps Layer
| API | Provider | Use |
|---|---|---|
| Google Maps API | Google | Route display, distance calculation, map embeds |

### Fallback
| Source | Purpose |
|---|---|
| Mock APIs (Static JSON) | Full demo without live API keys — demo-ready on hackathon day |

---

## 5. Deployment & DevOps

| Tool | Purpose |
|---|---|
| **Vercel** | Frontend hosting — automatic CI/CD from GitHub, global CDN |
| **Render / Railway** | Backend hosting — Node.js server with auto-deploy |
| **MongoDB Atlas** | Managed cloud database (free tier for MVP) |
| **GitHub** | Version control, branch-based workflow |
| **Postman** | API testing and documentation |

---

## 6. Development Environment

```bash
# Prerequisites
Node.js 20 LTS
npm 9+
MongoDB Atlas account (or local MongoDB)
Redis (local or Upstash for cloud)

# Environment Variables (.env)
MONGODB_URI=
REDIS_URL=
JWT_SECRET=
GOOGLE_MAPS_API_KEY=
IRCTC_API_KEY=
REDBUS_API_KEY=
OYO_API_KEY=
MMT_API_KEY=
USE_MOCK_API=true   # Set to false in production
```

---

## 7. Tech Stack Summary Card

```
Frontend    → Next.js 14 + React + Tailwind CSS
Backend     → Node.js 20 + Express.js (REST)
Database    → MongoDB Atlas + Redis Cache
APIs        → IRCTC, redBus/AbhiBus, OYO, MMT, Goibibo, Google Maps
Deploy      → Vercel (FE) + Render/Railway (BE)
Tools       → GitHub + Postman
Fallback    → Static JSON Mock APIs
```
