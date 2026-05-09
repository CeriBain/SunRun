import { useEffect, useState } from 'react'

interface Coords {
  lat: number
  lng: number
}

interface LocationState {
  coords: Coords | null
  loading: boolean
  error: string | null
}

async function fetchIPCoords(): Promise<Coords> {
  const res = await fetch('https://ipapi.co/json/')
  if (!res.ok) throw new Error('IP geolocation failed')

  const data = await res.json()
  return { lat: data.latitude, lng: data.longitude }
}

export function useLocation(): LocationState {
  const [coords, setCoords] = useState<Coords | null>(null) // <Coords tells us what type the state variable can hold
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      // navigator = browser object that's already on the browser / geolocation is a property
      fetchIPCoords()
        .then(setCoords)
        .catch(() => setError('Could not determine your location'))
        .finally(() => setLoading(false))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLoading(false)
      },
      () => {
        fetchIPCoords()
          .then(setCoords)
          .catch(() => setError('Could not determine your location'))
          .finally(() => setLoading(false))
      }
    )
  }, [])

  return { coords, loading, error }
}
