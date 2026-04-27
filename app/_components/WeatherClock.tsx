"use client";

import { useEffect, useState } from "react";

type Weather = { temp: number; condition: string } | null;

export function WeatherClock({ weather }: { weather: Weather }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const formatted = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Los_Angeles",
      });
      setTime(`${formatted} pt`);
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span suppressHydrationWarning>{time ?? "--:-- pt"}</span>
      <span suppressHydrationWarning>
        {weather ? `${weather.temp}°f · ${weather.condition}` : "—"}
      </span>
    </>
  );
}
