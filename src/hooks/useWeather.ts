import { useEffect, useState } from 'react'
import { fetchWeather } from '../lib/weather'
import type { WeatherData } from '../lib/weather'

interface WeatherState {
  data: WeatherData | null
  loading: boolean
  error: string | null
}

// fetching weather data and tracking 3 states

export function useWeather(
  lat: number | null,
  lng: number | null
): WeatherState {
  const [data, setData] = useState<WeatherData | null>(null) // on mount, these states are set to default
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // when this runs it calls the function with lat & lng passed in and collects data from API
    if (lat === null || lng === null) return

    fetchWeather(lat, lng)
      .then(setData)
      .catch(() => setError('Could not load weather'))
      .finally(() => setLoading(false))
  }, [lat, lng])

  return { data, loading, error }
}
