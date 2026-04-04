# TripSathi 🚆🚌🏨

**One Platform. Every Indian Journey.**

TripSathi is a unified travel planning platform that lets you search trains, buses, and hotels in one place. Compare prices, build itineraries, and share trip plans — designed for every Indian traveler.

## Features

- **Unified Search** — Search trains, buses, and hotels from a single search bar
- **Price Comparison** — Side-by-side pricing across multiple providers
- **Itinerary Builder** — Select transport + hotel, save your complete trip plan
- **Share Trips** — Share itineraries with family via a simple link
- **Hindi Support** — Full Hindi language interface (i18n ready)
- **Mobile First** — Responsive design with bottom navigation for mobile

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | Next.js 14, React 18, TypeScript    |
| Styling    | Tailwind CSS 3, Google Fonts        |
| Backend    | Express.js 4, Node.js               |
| Database   | MongoDB (Mongoose ODM)              |
| Caching    | Redis                               |
| Auth       | JWT (JSON Web Tokens)               |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Redis (optional, for caching)

### Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start dev server
npm run dev
```

The frontend runs on [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start dev server
npm run dev
```

The backend runs on [http://localhost:5000](http://localhost:5000)

### Environment Variables

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

**Backend** (`server/.env`):
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tripsathi
JWT_SECRET=your-secret-key-here
REDIS_URL=redis://localhost:6379
```

## Project Structure

```
TripSathi/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Homepage
│   ├── search/             # Search results page
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── dashboard/          # Saved trips
│   ├── profile/            # User profile
│   └── shared/[token]/     # Shared itinerary view
├── components/
│   ├── layout/             # Header, Footer, MobileNav
│   ├── home/               # Hero, Features, PopularRoutes
│   ├── search/             # CityInput, DatePicker, SearchBar
│   ├── results/            # TransportCard, HotelCard, etc.
│   ├── itinerary/          # ItineraryBuilder, SaveButton
│   ├── dashboard/          # TripCard
│   └── ui/                 # Spinner, Skeleton, EmptyState
├── context/                # AuthContext
├── hooks/                  # useSearch
├── lib/                    # api.ts, cities.ts, i18n.ts
├── server/                 # Express.js backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/          # Auth, validation, security
│   ├── services/           # Aggregation, ranking, mock
│   └── data/mock/          # Mock JSON data
└── public/locales/         # i18n translation files
```

## API Endpoints

### Auth
- `POST /api/v1/auth/register` — Create account
- `POST /api/v1/auth/login` — Login
- `GET /api/v1/auth/me` — Get current user (protected)

### Search
- `GET /api/v1/search?from=Delhi&to=Mumbai` — Unified search
- `GET /api/v1/search/transport` — Transport only
- `GET /api/v1/search/hotels` — Hotels only

### Itinerary
- `POST /api/v1/itinerary` — Create itinerary (protected)
- `GET /api/v1/itinerary` — Get my itineraries (protected)
- `GET /api/v1/itinerary/shared/:token` — View shared itinerary
- `DELETE /api/v1/itinerary/:id` — Delete itinerary (protected)

## Mock Data

The app includes mock data for demo purposes — no real API keys needed. Search routes like:
- Delhi → Mumbai
- Bangalore → Goa
- Chennai → Hyderabad

## License

This project is for educational purposes.

---

Built with ❤️ for Indian travelers.
