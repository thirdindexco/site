"use client";

import { useEffect, useState } from "react";
import { availabilityFrom } from "../_lib/canvas";

// The availability line, named from the visitor's calendar so a page built
// last month never promises a month that has passed.
export function Availability() {
  const [text, setText] = useState(() => availabilityFrom());
  useEffect(() => setText(availabilityFrom()), []);
  return <span suppressHydrationWarning>{text}</span>;
}
