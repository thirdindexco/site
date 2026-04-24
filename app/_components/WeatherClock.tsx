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

  if (!time || !weather) {
    return <span suppressHydrationWarning>loading…</span>;
  }

  return (
    <span suppressHydrationWarning>
      {time} · {weather.temp}°f
      <span className="hidden xl:inline"> · {weather.condition}</span>
    </span>
  );
}
