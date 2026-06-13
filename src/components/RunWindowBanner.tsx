import { findBestRunWindow } from '../lib/weather'
import type { HourlyWeather } from '../lib/weather'

interface RunWindowBannerProps {
  hourly: HourlyWeather
}
