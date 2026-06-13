import { findBestRunWindow } from '../lib/weather'
import type { HourlyWeather } from '../lib/weather'

interface RunWindowBannerProps {
  hourly: HourlyWeather
}

export function RunWindowBanner({ hourly }: RunWindowBannerProps) {
  const window = findBestRunWindow(hourly)

  if (!window) {
    return (
      <div className="p-3 bg-gray-100 rounded-xl text-center text-gray-500">
        No good run window found in the next 12 hours
      </div>
    )
  }

  return (
    <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center">
      <span className="font-semibold text-green-700">Best time to run: </span>
      <span className="text-green-600">
        {window.startTime} – {window.endTime}
      </span>
      <span className="ml-2 text-sm text-gray-400">
        (score: {window.score}/100)
      </span>
    </div>
  )
}
