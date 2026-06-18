import { useEffect, useState } from 'react'
import { fetchRoutes } from '../lib/routing'
import type { Route } from '../lib/routing'

interface RoutesState {
  routes: Array<object | null>(null)
  loading: boolean | null
  error: string | null
}

export function useRoutes(
  lat: number | null,
  lng: number | null,
  weatherScore: number | null
): RoutesState {
  const [routes, setRoutes] = useState<Route[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (lat === null || lng === null) return

    fetchRoutes(lat, lng, weatherScore)
      .then(setRoutes)
      .catch(() => setError('Could not load routes'))
      .finally(() => setLoading(false))

  }, [lat, lng, weatherScore])

  return { routes, loading, error }
}
