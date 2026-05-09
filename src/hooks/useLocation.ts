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
