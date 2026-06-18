import { Routes, Route } from 'react-router-dom'
import { Map } from './components/Map'
import { WeatherDisplay } from './components/Weather'
import { RunWindowBanner } from './components/RunWindowBanner'
import { useLocation } from './hooks/useLocation'
import { useWeather } from './hooks/useWeather'
import { useRoutes } from './hooks/useRoutes'
import { RoutePanel } from './components/RoutePanel'
import type { Route } from './lib/routing'
import { useState } from 'react'
import { scoreWeather } from './lib/weather'

function App() {
  const { coords } = useLocation()
  const { data } = useWeather(coords?.lat ?? null, coords?.lng ?? null)
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const score = data ? scoreWeather(data.current) : null
  const { routes } = useRoutes(coords?.lat ?? null, coords?.lng ?? null, score)

  function handleSelectRoute(route: Route, index: number) {
    setSelectedRoute(route)
    setSelectedIndex(index)
  }

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
      {coords && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-3 w-96">
          {data && <RunWindowBanner hourly={data.hourly} />}
          <WeatherDisplay lat={coords.lat} lng={coords.lng} />
        </div>
      )}
    </div>
  )
}

export default App
