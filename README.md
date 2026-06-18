# SunRun

A weather-aware running route app. SunRun checks current conditions at your location and suggests round-trip running routes scaled to the weather — longer routes on good days, shorter on bad ones.

## Features

- Detects your location via GPS or IP fallback
- Fetches live weather data (temperature, wind, precipitation, UV index)
- Scores current conditions and labels the day for running
- Finds the best 2-hour window to run within the next 12 hours
- Generates three route options via OpenRouteService, scaled by weather score
- Displays routes on an interactive map

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Leaflet / react-leaflet
- [Open-Meteo](https://open-meteo.com/) — weather data (free, no key required)
- [OpenRouteService](https://openrouteservice.org/) — route generation

## Getting Started

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and add your OpenRouteService API key:

   ```bash
   cp .env.example .env
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable           | Description              |
| ------------------ | ------------------------ |
| `VITE_ORS_API_KEY` | OpenRouteService API key |

A free API key is available at [openrouteservice.org](https://openrouteservice.org/).
