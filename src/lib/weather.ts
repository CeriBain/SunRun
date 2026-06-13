export interface CurrentWeather {
  temperature: number
  windSpeed: number
  precipitation: number
  uvIndex: number
}
export interface RunWindow {
  startTime: string
  endTime: string
  score: number
}

// types to describe what the data will look like when it comes back from the weather API
// comtracts that tell typesrcipt whenever ou see a weather data object it must have this structure

export interface HourlyWeather {
  time: string[]
  temperature: number[]
  windSpeed: number[]
  precipitationProbability: number[]
  uvIndex: number[]
}

export interface WeatherData {
  current: CurrentWeather
  hourly: HourlyWeather
}

export async function fetchWeather(
  lat: number,
  lng: number
): Promise<WeatherData> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')

  url.searchParams.set('latitude', String(lat)) // building the url query string (bit after the ?)
  url.searchParams.set('longitude', String(lng)) // does it safely and encodes as it goes
  url.searchParams.set(
    'current',
    'temperature_2m,wind_speed_10m,precipitation,uv_index'
  )
  url.searchParams.set(
    'hourly',
    'temperature_2m,wind_speed_10m,precipitation_probability,uv_index'
  )
  url.searchParams.set('forecast_days', '1')
  url.searchParams.set('timezone', 'auto')

  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather fetch failed')
  const data = await res.json()

  // the API responds with JSON object, so it's set below by drilling into the object with dot notation
  return {
    current: {
      temperature: data.current.temperature_2m,
      windSpeed: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
      uvIndex: data.current.uv_index,
    },
    hourly: {
      time: data.hourly.time,
      temperature: data.hourly.temperature_2m,
      windSpeed: data.hourly.wind_speed_10m,
      precipitationProbability: data.hourly.precipitation_probability,
      uvIndex: data.hourly.uv_index,
    },
  }
}
export function scoreWeather(current: CurrentWeather): number {
  let score = 100

  if (current.temperature < 0 || current.temperature > 35) score -= 40
  else if (current.temperature < 5 || current.temperature > 28) score -= 20

  if (current.windSpeed > 40) score -= 30
  else if (current.windSpeed > 20) score -= 15

  if (current.precipitation > 2) score -= 30
  else if (current.precipitation > 0) score -= 10

  if (current.uvIndex > 8) score -= 20
  else if (current.uvIndex > 6) score -= 10

  return Math.max(0, score) // error handling to stop it going to 0
}
export function getConditionLabel(score: number): string {
  if (score >= 80) return 'Great day to run, get out there!'
  if (score >= 60) return 'Good day to run but pack some extra clothes'
  if (score >= 40)
    return 'Varied conditions today, this route should mostly okay'
  if (score >= 20)
    return "Tough conditions today, but we've found you the best route available"
  return "It's not good out there, I'd skip it today"
}

export function findBestRunWindow(hourly: HourlyWeather): RunWindow | null {
  //takes argument called hourly and it must look like the imported Interface
  const now = new Date()
  const cutoff = new Date(now.getTime() + 12 * 60 * 60 * 1000)

  let bestScore = -1
  let bestIndex = -1

  for (let i = 0; i < hourly.time.length - 1; i++) {
    const slotTime = new Date(hourly.time[i])
    if (slotTime < now || slotTime > cutoff) continue

    const score1 = scoreWeather({
      temperature: hourly.temperature[i],
      windSpeed: hourly.windSpeed[i],
      precipitation: hourly.precipitationProbability[i] / 10,
      uvIndex: hourly.uvIndex[i],
    })
    const score2 = scoreWeather({
      temperature: hourly.temperature[i + 1],
      windSpeed: hourly.windSpeed[i + 1],
      precipitation: hourly.precipitationProbability[i + 1] / 10,
      uvIndex: hourly.uvIndex[i + 1],
    })

    const avgScore = (score1 + score2) / 2
    if (avgScore > bestScore) {
      bestScore = avgScore
      bestIndex = i
    }
  }

  if (bestIndex === -1) return null

  const fmt = (t: string) =>
    new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return {
    startTime: fmt(hourly.time[bestIndex]),
    endTime: fmt(hourly.time[bestIndex + 1]),
    score: Math.round(bestScore),
  }
}
