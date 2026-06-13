import { Routes, Route } from 'react-router-dom'
import { Map } from './components/Map'
import { WeatherDisplay } from './components/Weather'
import { RunWindowBanner } from './components/RunWindowBanner'
import { useLocation } from './hooks/useLocation'
import { useWeather } from './hooks/useWeather'

function App() {
  const { coords } = useLocation()

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
      {coords && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000]">
          <WeatherDisplay lat={coords.lat} lng={coords.lng} />
        </div>
      )}
    </div>
  )
}

export default App
