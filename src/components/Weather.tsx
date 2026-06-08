import { useWeather } from '../hooks/useWeather'

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

  return (
    <div className="flex gap-6 p-4 bg-white rounded-xl shadow">
      <div>
        <div className="text-3xl font-bold">
          {Math.round(data.current.temperature)}°C
        </div>
        <div className="text-sm text-gray-500">Temperature</div>
      </div>
      <div>
        <div className="text-3xl font-bold">
          {Math.round(data.current.windSpeed)}
        </div>
        <div className="text-sm text-gray-500">km/h wind</div>
      </div>
      <div>
        <div className="text-3xl font-bold">{data.current.precipitation}mm</div>
        <div className="text-sm text-gray-500">Precipitation</div>
      </div>
      <div>
        <div className="text-3xl font-bold">
          {Math.round(data.current.uvIndex)}
        </div>
        <div className="text-sm text-gray-500">UV index</div>
      </div>
    </div>
  )
}
