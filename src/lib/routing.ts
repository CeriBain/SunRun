export interface Route {
  distance: number // meters
  duration: number // seconds
  elevationGain: number //metres climbed
  coordinates: [number, number][] //array of lat & lng points that draw the roiute on the map
}

const ORS_URL =
  'https://api.openrouteservice.org/v2/directions/foot-walking/geojson'

export async function fetchRoutes(
  lat: number,
  lng: number,
  weatherScore: number
): Promise<Route[]> {
  const apiKey = import.meta.env.VITE_ORS_API_KEY

  const lengths = weatherScore >= 60 ? [3000, 5000, 8000] : [2000, 3000, 5000]

  const routes = await Promise.all(
    lengths.map((length, i) =>
      fetch(ORS_URL, {
        method: 'POST',
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: [[lng, lat]],
          options: { round_trip: { length, seed: i + 1 } },
          elevation: true,
        }),
      }).then((res) => {
        if (!res.ok) throw new Error('Route fetch failed')
        return res.json()
      })
    )
  )

  return routes.map((data) => {
    const feature = data.features[0]
    const summary = feature.properties.summary
    const coords: [number, number][] = feature.geometry.coordinates.map(
      ([lon, lat]: [number, number]) => [lat, lon]
    )
    return {
      distance: summary.distance,
      duration: summary.duration,
      elevationGain: feature.properties.ascent ?? 0,
      coordinates: coords,
    }
  })
}
