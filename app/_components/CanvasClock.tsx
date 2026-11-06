"use client";

import { useEffect, useState } from "react";

const STUDIO_TZ = "America/Los_Angeles";

// "Thu · 8:47 pm": the day and the time at the studio, ticking by the
// minute. Rendered empty on the server and until mounted, since the
// client's clock is the only one that matters.
function studioTime(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: STUDIO_TZ,
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")} · ${get("hour")}:${get("minute")} ${get("dayPeriod").toLowerCase()}`;
}

export function CanvasClock() {
  const [text, setText] = useState("");
  useEffect(() => {
    const tick = () => setText(studioTime(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <time className="tabular-nums opacity-50" suppressHydrationWarning>
      {text}
    </time>
  );
}
