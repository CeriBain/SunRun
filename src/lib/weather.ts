export interface CurrentWeather {
  temperature: number
  windSpeed: number
  precipitation: number
  uvIndex: number
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
