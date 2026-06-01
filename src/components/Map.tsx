import { MapContainer, TileLayer } from 'react-leaflet'
import { useLocation } from '../hooks/useLocation'

export function Map() {
  const { coords, loading, error } = useLocation()
  if (loading) return <div className="p-4">Locating you, hang tight...</div>
  if (error) return <div className="p-4 text-red-500">{error}"</div>
  if (!coords) return null
}
return (
    <MapContainer center={[GeolocationCoordinates.lat, GeolocationCoordinates.lng]}
)
