"use client";

import { useEffect, useState } from "react";

type Weather = { temp: number; condition: string } | null;

export function WeatherClock({ weather }: { weather: Weather }) {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
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

      setLine(`${day} · ${time}`);
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span suppressHydrationWarning>{line ?? "--- · --:-- --"}</span>
      <span suppressHydrationWarning>
        {weather ? `${weather.temp}°f · ${weather.condition}` : "—"}
      </span>
    </>
  );
}
