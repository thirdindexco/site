"use client";

import { useEffect, useState } from "react";

// 8 swatches × 22px = 176px, fills col-span-2 exactly (matches Figma).
// Gradual opacity falloff so the last dot is barely visible.
const swatchAlphas = [1, 0.82, 0.66, 0.5, 0.36, 0.24, 0.14, 0.06];

export function ThemeSwatch() {
  // Initial value matches SSR output; real theme is read from the attribute
  // set by the pre-hydration script in layout.tsx on mount.
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Hydrate from the pre-hydration attribute, then follow system changes
  // until the user explicitly picks a theme.
  useEffect(() => {
    const html = document.documentElement;
    const attr = html.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") setTheme(attr);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return; // user override wins
      setTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  const setThemePref = (t: "dark" | "light") => {
    try {
      localStorage.setItem("theme", t);
    } catch {}
    setTheme(t);
  };

  return (
    <button
      type="button"
      onClick={() => setThemePref(isDark ? "light" : "dark")}
      aria-label="toggle theme"
      className="group/theme relative hidden md:col-span-2 md:col-start-6 md:flex cursor-pointer"
    >
      {swatchAlphas.map((a) => (
        <span
          key={a}
          aria-hidden
          data-anim="swatch"
          style={{
            background: `color-mix(in srgb, var(--foreground) ${a * 100}%, transparent)`,
            willChange: "filter, opacity",
          }}
          className="block h-[22px] w-[22px]"
        />
      ))}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-full mt-2 font-mono font-light text-3xs uppercase tracking-tight opacity-0 group-hover/theme:opacity-60 group-focus-visible/theme:opacity-60 transition-opacity duration-200 whitespace-nowrap"
      >
        toggle light / dark
      </span>
    </button>
  );
}
