# SunRun — Project Plan

A running route app that suggests routes based on local weather conditions.

## Stack

| Layer | Technology |
|---|---|
| Frontend framework | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| Maps | Leaflet (react-leaflet) |
| Weather data | Open-Meteo (free, no API key) |
| Routing / directions | OpenRouteService API |
| Auth + persistence | Supabase (auth, saved routes) |

---

## Architecture Overview

```
src/
├── components/
│   ├── Map/             # Leaflet map, route overlay, markers
│   ├── Weather/         # Current conditions display, forecast strip
│   ├── RoutePanel/      # Route suggestions list, distance/elevation cards
│   └── Auth/            # Login, signup, user menu
├── hooks/
│   ├── useWeather.ts    # Open-Meteo fetch + caching
│   ├── useRoutes.ts     # OpenRouteService calls
│   └── useLocation.ts   # Geolocation + reverse geocoding
├── lib/
│   ├── supabase.ts      # Supabase client
│   ├── weather.ts       # Weather condition scoring logic
│   └── routing.ts       # Route scoring / filtering helpers
├── pages/
│   ├── Home.tsx         # Map + route suggestions
│   ├── SavedRoutes.tsx  # User's saved routes (auth-gated)
│   └── Auth.tsx         # Login / signup page
└── types/
    └── index.ts         # Shared TypeScript types
```

---

## Data Flow

1. **Location** — browser geolocation API → latitude/longitude
2. **Weather** — Open-Meteo `/forecast` with current conditions + hourly
3. **Route scoring** — weather conditions (temp, wind, precipitation, UV) → score per route option
4. **Routing** — OpenRouteService `directions` endpoint → GeoJSON polyline for map + distance/elevation stats
5. **Persistence** — Supabase `saved_routes` table stores GeoJSON + metadata per user

---

## Phases

### Phase 1 — Foundation
- [ ] Vite + React + TypeScript scaffold (`npm create vite@latest`)
- [ ] Tailwind CSS setup
- [ ] ESLint + Prettier config
- [ ] react-leaflet installed, basic map rendering at user's location
- [ ] `useLocation` hook — geolocation with fallback to IP-based coords

### Phase 2 — Weather Integration
- [ ] Open-Meteo API wrapper in `lib/weather.ts`
- [ ] `useWeather` hook — fetch current conditions + hourly forecast
- [ ] Weather display component — temperature, wind speed, precipitation, UV index
- [ ] Weather scoring function — maps conditions to a run-friendliness score (0–100)
- [ ] Condition labels: "Great day to run", "Dress warm", "Skip it — rain incoming"

### Phase 3 — Route Generation
- [ ] OpenRouteService account + API key (stored in `.env`)
- [ ] `useRoutes` hook — generate 3–5 loop route options from current location
- [ ] Route parameters driven by weather score: shorter/flatter routes in bad weather
- [ ] `RoutePanel` component — cards showing distance, elevation gain, estimated time, weather suitability badge
- [ ] Map overlay — draw selected route polyline on Leaflet map

### Phase 4 — Supabase Auth
- [ ] Supabase project setup, `.env` vars
- [ ] `lib/supabase.ts` client
- [ ] Auth pages — email/password login + signup (Supabase Auth)
- [ ] Auth context / hook — session state across app
- [ ] Protected routes — `SavedRoutes` requires login

### Phase 5 — Saved Routes
- [ ] Supabase `saved_routes` table: `id, user_id, name, geojson, distance_km, elevation_m, created_at`
- [ ] Row-level security (RLS) policy — users see only their own routes
- [ ] Save / unsave route action from `RoutePanel`
- [ ] `SavedRoutes` page — list saved routes, click to load on map

### Phase 6 — Polish
- [ ] Responsive layout — mobile-first, map full-screen with slide-up panel
- [ ] Loading skeletons for weather + route fetch states
- [ ] Error boundaries + user-facing error messages
- [ ] Route re-fetch on significant location change
- [ ] Hourly forecast strip — best window to run today
- [ ] PWA manifest + service worker for offline map tiles (stretch)

---

## Environment Variables

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_ORS_API_KEY=        # OpenRouteService
```

Open-Meteo requires no API key.

---

## Key Design Decisions

- **Loop routes only** — OpenRouteService `round-trip` profile keeps UX simple; no destination required.
- **Weather score drives route options** — bad weather surfaces shorter, more sheltered routes rather than blocking the user entirely.
- **Open-Meteo over OpenWeatherMap** — free with no key, good accuracy, includes UV index and precipitation probability.
- **Supabase over Firebase** — typed PostgreSQL, built-in RLS, first-class TypeScript support.
