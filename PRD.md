# Product Requirements Document (PRD)
## TripSathi — Unified Indian Travel Planning Platform

**Team:** Crimson Syndicate  
**Version:** 1.0 (MVP)  
**Status:** In Development  

---

## 1. Overview

### 1.1 Product Vision
TripSathi is a unified travel planning platform that aggregates trains, buses, hotels, and itinerary management into a single, accessible experience built for every Indian traveler — with a special focus on Tier-2/3 city users.

### 1.2 Problem Statement
India's travel ecosystem is completely fragmented. No single platform connects IRCTC (trains), redBus (buses), and MakeMyTrip/OYO (hotels). Users spend 3–5 hours and 4+ apps to plan a single trip, missing better routes and cheaper options hidden across platforms. 800M+ Indians are underserved, with 600M+ Tier-2/3 city users having zero access to a unified, accessible tool.

### 1.3 Opportunity
- India travel market size: **$75B (2025)**
- Daily domestic transport users: **23M+**
- Average revenue per booking: **~₹1,500**
- Potential commission per booking: **2–5%**

---

## 2. Goals & Success Metrics

### 2.1 MVP Goals
- Launch a fully functional web app that aggregates train + bus + hotel results in a single search
- Support mock API fallback so the product is demo-ready on Day 1
- Target Tier-2/3 users with a Hindi-first UI, optimized for low-bandwidth and low-end Android devices

### 2.2 Key Metrics (KPIs)

| Metric | Target (6 months) |
|---|---|
| Registered Users | 10,000+ |
| Monthly Active Users | 5,000+ |
| Average Session Duration | > 4 minutes |
| Searches per User per Month | 3+ |
| Itineraries Saved | 2,000+ |
| Premium Conversion Rate | 5% |

---

## 3. User Personas

### Persona 1 — Ravi, Budget Student Traveler
- Age: 21, Engineering student in Nagpur
- Travels 2–3x per year for college and family visits
- Pain: Jumps between IRCTC, redBus, and Google to compare options
- Need: Cheapest route from point A to B in one view

### Persona 2 — Sunita, Family Trip Planner
- Age: 38, homemaker in Indore
- Plans annual family vacations for 4–5 people
- Pain: Needs to book train + hotel + local bus separately; can't share plan with husband easily
- Need: Bundle search + itinerary sharing

### Persona 3 — Deepak, Tier-3 First-Timer
- Age: 29, small business owner in Raipur
- Low digital literacy, prefers Hindi UI
- Pain: English-only interfaces, slow load times on 3G
- Need: Hindi UI, works on basic Android, fast on slow internet

---

## 4. Features & Requirements

### 4.1 Core Features (MVP)

#### F1 — Unified Multi-Modal Search
- User inputs: Source city, destination city, travel dates
- System returns: Available trains, buses, and hotels in a single unified results page
- Supports: real API + mock JSON fallback

#### F2 — Smart Route Aggregation & Ranking
- Aggregates results from IRCTC API, Bus Aggregator APIs (redBus/AbhiBus), and Govt transport feeds
- Ranks results by: price (low to high), duration, comfort/rating
- Highlights combo routes not available on a single platform

#### F3 — Price Comparison View
- Side-by-side pricing for transport modes
- Hotel options filterable by rating, price, proximity
- Savings indicator vs. booking separately

#### F4 — Itinerary Saver & Sharer
- Logged-in users can save a complete trip (transport + hotel)
- System generates a unique shareable link per itinerary
- View saved itineraries from account dashboard

#### F5 — User Authentication
- Email + password sign-up/login
- Google OAuth (optional v1.1)
- JWT-based session management

#### F6 — Hindi / Regional Language UI
- Language toggle (Hindi / English) in header
- All UI strings i18n-ready
- Hindi as default for Tier-2/3 detected regions

### 4.2 Deferred Features (Post-MVP)

- Native mobile apps (iOS & Android)
- Real-time seat availability
- In-app booking & payment (Razorpay integration)
- Price alert notifications
- AI-powered trip suggestions
- Offline mode / PWA

---

## 5. User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-01 | Traveler | Search trains + buses + hotels in one step | I don't waste time on multiple apps |
| US-02 | Traveler | See results ranked by price and duration | I can find the best value option quickly |
| US-03 | Logged-in user | Save my trip plan | I can refer back and not lose my research |
| US-04 | User | Share my itinerary via a link | My family can see the full plan without me re-explaining |
| US-05 | Hindi speaker | Use the app in Hindi | I feel comfortable and understand everything |
| US-06 | Budget traveler | See price comparison across modes | I know I'm getting the cheapest option |

---

## 6. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Page Load Time (3G) | < 3 seconds |
| Search Response Time | < 2 seconds (cached) / < 5s (live) |
| Mobile Responsiveness | Works on 320px+ screens |
| Uptime | 99.5% |
| Data Caching | 15-minute Redis cache for transport data |
| Security | HTTPS, JWT, input sanitization |

---

## 7. Roadmap

### Phase 1 — 0–6 Months: Launch Free Tier
- Ship MVP with mock + real API integration
- Focus on user acquisition and retention
- Hindi UI, mobile-first design

### Phase 2 — 6–12 Months: Activate Revenue
- Commission model on hotel bookings
- Launch ₹99/month premium plan (price alerts, unlimited saves, ad-free)

### Phase 3 — 12–24 Months: B2B Expansion
- API licensing to state tourism boards and travel agents
- Target ₹10L Monthly Recurring Revenue (MRR)
