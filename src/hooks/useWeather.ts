import { NewLifecycle, useEffect, useState } from 'react'
import { fetchWeather } from '../lib/weather'
import type { WeatherData } from '../lib/weather'

interface WeatherState {
  data: WeatherData | null
  loading: boolean
  error: string | null
}
