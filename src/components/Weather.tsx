import { useWeather } from '../hooks/useWeather'
import { useLocation } from '../hooks/useLocation'

//uses co-ordinates as props (arguments like a function) and uses them to call useWeather hook

interface WeatherDisplayProps {
  lat: number
  lng: number
}

export function WeatherDisplay({ lat, lng }: WeatherDisplayProps) {
  const { data, loading, error } = useWeather(lat, lng) // handling the states first, setting them with lat & lng

  if (loading) return <div className="p-4">Loading weather...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>
  if (!data) return null
}
