import { WeatherClock } from "./WeatherClock";

const WMO_MAP: Record<number, string> = {
  0: "CLEAR",
  1: "CLEAR",
  2: "CLOUDY",
  3: "OVERCAST",
  45: "FOG",
  48: "FOG",
  51: "DRIZZLE",
  53: "DRIZZLE",
  55: "DRIZZLE",
  61: "RAIN",
  63: "RAIN",
  65: "RAIN",
  71: "SNOW",
  73: "SNOW",
  75: "SNOW",
  95: "STORM",
  96: "STORM",
  99: "STORM",
};

type Weather = { temp: number; condition: string } | null;

// Fetched on the server with a 10-minute revalidation window so all clients
// read the cached Open-Meteo response instead of each hitting the API.
async function fetchWeather(): Promise<Weather> {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=36.1699&longitude=-115.1398&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/Los_Angeles",
      { next: { revalidate: 600 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      temp: Math.round(data.current.temperature_2m),
      condition: WMO_MAP[data.current.weather_code as number] ?? "CLEAR",
    };
  } catch {
    return null;
  }
}

export async function WeatherTime() {
  const weather = await fetchWeather();
  return <WeatherClock weather={weather} />;
}
