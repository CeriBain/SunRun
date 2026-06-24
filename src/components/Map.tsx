import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import { useLocation } from '../hooks/useLocation'
import type { Route } from '../lib/routing'

interface MapProps {
  selectedRoute: Route | null
}

export function Map({ selectedRoute }: MapProps) {
  const { coords, loading, error } = useLocation()
  if (loading) return <div className="p-4">Locating you, hang tight...</div>
  if (error) return <div className="p-4 text-red-500">{error}"</div>
  if (!coords) return null

  return (
    <MapContainer
      center={[coords.lat, coords.lng]}
      zoom={14}
      className="h-screen w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {selectedRoute && (
        <Polyline
          positions={selectedRoute.coordinates}
          pathOptions={{ color: '#16a34a' }}
        />
      )}
    </MapContainer>
  )
}
