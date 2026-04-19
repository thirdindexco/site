"use client";

import { useEffect, useState } from "react";

const WMO_MAP: Record<number, string> = {
  0: "CLEAR",
  1: "MOSTLY CLEAR",
  2: "PARTLY CLOUDY",
  3: "OVERCAST",
  45: "FOG",
  48: "FOG",
  51: "DRIZZLE",
  53: "DRIZZLE",
  55: "DRIZZLE",
  61: "RAIN",
  63: "RAIN",
  65: "HEAVY RAIN",
  71: "SNOW",
  73: "SNOW",
  75: "HEAVY SNOW",
  95: "STORM",
  96: "STORM",
  99: "STORM",
};

export function WeatherTime() {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Los_Angeles",
      });
      setTime(`${formatted} pt`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60_000);

    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=36.1699&longitude=-115.1398&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/Los_Angeles",
    )
      .then((r) => r.json())
      .then((data) => {
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: WMO_MAP[data.current.weather_code] ?? "CLEAR",
        });
      })
      .catch(() => {});

    return () => clearInterval(interval);
  }, []);

  return (
    <span suppressHydrationWarning>
      {time || "00:00 pt"}
      {weather && ` · ${weather.temp}°f · ${weather.condition}`}
    </span>
  );
}
