# Design Document
## TripSathi — Unified Indian Travel Planning Platform

**Team:** Crimson Syndicate  
**Version:** 1.0 (MVP)  

---

## 1. System Architecture

TripSathi follows a **4-layer architecture** with a unidirectional data flow from user to data sources and back.

```
Layer 1: User (Browser/Mobile)
         │
Layer 2: React Frontend (Next.js 14)
         │
Layer 3: Node.js / Express API
         │
Layer 4: MongoDB Atlas
         │
    ┌────┴────────────────┐
    │                     │
Transport Layer     Hotel Layer
IRCTC, redBus,      OYO, MMT,
AbhiBus, Govt       Goibibo
    │                     │
    └────────┬────────────┘
             │
         Maps Layer
       Google Maps API
```

---

## 2. Data Flow — 6-Step User Journey

| Step | Actor | Action |
|---|---|---|
| **1. User Input** | User | Enters source city, destination city, and travel dates |
| **2. API Request** | Frontend | Sends `GET /api/v1/search?from=&to=&date=` to Express API |
| **3. Data Fetching** | Backend | Fetches from Transport API + Hotel API simultaneously (`Promise.all`) |
| **4. Aggregation** | Backend | Engine sorts & ranks results by price, duration, and rating |
| **5. Display Results** | Frontend | User sees a unified comparison view with all transport + hotel options |
| **6. Save & Share** | Backend + DB | Itinerary saved to MongoDB → shareable link generated via UUID token |

---

## 3. Component Design

### 3.1 Frontend Components

```
/components
  ├── SearchBar/
  │     ├── CityInput.jsx          — Autocomplete city selector
  │     ├── DatePicker.jsx         — Travel date selector
  │     └── SearchButton.jsx       — Triggers API call
  │
  ├── Results/
  │     ├── ResultsContainer.jsx   — Manages state, calls API
  │     ├── TransportCard.jsx      — Individual train/bus result
  │     ├── HotelCard.jsx          — Individual hotel result
  │     ├── SortFilter.jsx         — Sort by price/duration/rating
  │     └── ComparisonBanner.jsx   — Shows savings vs. booking separately
  │
  ├── Itinerary/
  │     ├── ItineraryBuilder.jsx   — Add/remove items to trip plan
  │     ├── SaveButton.jsx         — Saves to MongoDB via API
  │     └── ShareLink.jsx          — Displays shareable UUID link
  │
  └── Layout/
        ├── Header.jsx             — Nav + language toggle (Hindi/English)
        ├── Footer.jsx
        └── MobileNav.jsx          — Bottom tab bar for mobile
```

### 3.2 Backend API Routes

```
GET    /api/v1/search             — Unified search (transport + hotels)
GET    /api/v1/transport          — Transport-only results
GET    /api/v1/hotels             — Hotel-only results

POST   /api/v1/itinerary          — Save a new itinerary
GET    /api/v1/itinerary/:id      — Fetch itinerary by ID (for share links)
GET    /api/v1/itinerary/user     — Fetch all itineraries for logged-in user
DELETE /api/v1/itinerary/:id      — Delete an itinerary

POST   /api/v1/auth/register      — Create account
POST   /api/v1/auth/login         — Login, returns JWT
GET    /api/v1/auth/me            — Fetch current user profile
```

---

## 4. Database Schema

### 4.1 Users Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "passwordHash": "string (bcrypt)",
  "language": "enum: ['en', 'hi']",
  "createdAt": "Date"
}
```

### 4.2 Itineraries Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: users)",
  "title": "string",
  "from": "string",
  "to": "string",
  "travelDate": "Date",
  "transport": [
    {
      "type": "enum: ['train', 'bus']",
      "provider": "string",
      "departureTime": "string",
      "arrivalTime": "string",
      "price": "number",
      "duration": "string"
    }
  ],
  "hotels": [
    {
      "name": "string",
      "provider": "string",
      "pricePerNight": "number",
      "rating": "number",
      "location": "string"
    }
  ],
  "shareToken": "string (UUID, unique)",
  "createdAt": "Date"
}
```

### 4.3 Search History Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: users, optional)",
  "from": "string",
  "to": "string",
  "date": "Date",
  "resultsCount": "number",
  "createdAt": "Date"
}
```

---

## 5. Aggregation Engine Design

The core of TripSathi's value is the **Route Aggregation Engine** in the backend.

```
Input: { from, to, date }
         │
         ▼
┌─────────────────────────┐
│   Check Redis Cache      │  → Cache hit? → Return cached results
└────────────┬────────────┘
             │ Cache miss
             ▼
┌─────────────────────────────────────────────┐
│  Parallel API Fetch (Promise.all)            │
│  ├── fetchIRCTC(from, to, date)              │
│  ├── fetchRedBus(from, to, date)             │
│  └── fetchMockFallback(from, to, date)       │
└────────────────────────┬────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────┐
│  Normalize Results to Unified Schema         │
│  { type, provider, price, duration, rating } │
└────────────────────────┬────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────┐
│  Sort & Rank                                 │
│  ├── Sort by price (default)                 │
│  ├── Sort by duration                        │
│  └── Sort by rating / comfort                │
└────────────────────────┬────────────────────┘
                         │
                         ▼
              Store in Redis (TTL: 15 min)
                         │
                         ▼
              Return to Frontend
```

---

## 6. Caching Strategy

| Layer | Technology | TTL | Scope |
|---|---|---|---|
| Transport search results | Redis | 15 minutes | `search:{from}:{to}:{date}` |
| Hotel search results | Redis | 15 minutes | `hotels:{city}:{date}` |
| User session | JWT | 7 days | Client-side |
| Static assets | Vercel CDN | Immutable | Global CDN edge |

---

## 7. UI/UX Design Principles

### 7.1 Mobile-First
- All layouts designed for 320px minimum screen width
- Bottom navigation bar on mobile (Home, Search, Saved, Profile)
- Touch targets minimum 44×44px

### 7.2 Performance for Low-Bandwidth
- SSR via Next.js — first contentful paint under 3s on 3G
- Lazy loading for hotel images
- Redis caching reduces repeat API latency to ~50ms

### 7.3 Accessibility & Language
- Language toggle (EN / हिंदी) persistent in header
- i18n via `next-i18next` — all strings externalized
- High contrast mode support

### 7.4 Key Screens
| Screen | Description |
|---|---|
| Home / Search | City inputs, date picker, prominent CTA |
| Results Page | Unified list of transport + hotels, sort/filter bar |
| Itinerary Builder | Drag-and-drop to build trip, save + share |
| Saved Trips Dashboard | List of saved itineraries per user |
| Shared Itinerary View | Read-only view for shared links (no login required) |

---

## 8. Security Design

| Concern | Approach |
|---|---|
| Authentication | JWT tokens (7-day expiry, HTTP-only cookies) |
| Password storage | bcrypt (salt rounds: 12) |
| API key protection | All third-party keys in server-side env vars only |
| Input validation | `express-validator` on all API inputs |
| CORS | Whitelist only Vercel frontend domain |
| Rate limiting | `express-rate-limit` — 100 req/min per IP |

---

## 9. Mock API Fallback

To ensure a complete demo without live API keys:

- A `/data/mock/` directory holds static JSON fixtures for trains, buses, and hotels
- Backend detects `USE_MOCK_API=true` in env and routes all external calls to local mock files
- Mock data covers 5 popular Indian city pairs: Delhi–Mumbai, Mumbai–Pune, Bangalore–Chennai, Delhi–Jaipur, Hyderabad–Goa
- All features (search, aggregation, save, share) work fully in mock mode

---

## 10. Deployment Architecture

```
GitHub (main branch)
    │
    ├──► Vercel (Frontend CI/CD)
    │    └── Auto-deploy on push
    │    └── Edge CDN globally
    │
    └──► Render / Railway (Backend CI/CD)
         └── Auto-deploy on push
         └── Node.js 20 server
         └── Connected to MongoDB Atlas + Redis
         CD
```
