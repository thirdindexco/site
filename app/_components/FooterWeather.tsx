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

export function FooterWeather() {
  const [timeLine, setTimeLine] = useState("--- · --:-- --");
  const [weatherLine, setWeatherLine] = useState("—");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = now
        .toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: "America/Los_Angeles",
        })
        .toLowerCase();
      const time = now
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/Los_Angeles",
        })
        .toLowerCase();
      setTimeLine(`${day} · ${time}`);
    };

    const updateWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=36.1699&longitude=-115.1398&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/Los_Angeles",
        );
        if (!res.ok) return;
        const weather = await res.json();
        const temp = Math.round(weather.current.temperature_2m);
        const condition =
          WMO_MAP[weather.current.weather_code as number] ?? "CLEAR";
        setWeatherLine(`${temp}°f · ${condition}`);
      } catch {
        setWeatherLine("—");
      }
    };

    updateTime();
    void updateWeather();
    const timeInterval = setInterval(updateTime, 60_000);
    const weatherInterval = setInterval(updateWeather, 600_000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-px font-mono text-2xs font-light uppercase tracking-wide">
      <span suppressHydrationWarning>{timeLine}</span>
      <span suppressHydrationWarning>{weatherLine}</span>
    </div>
  );
}
