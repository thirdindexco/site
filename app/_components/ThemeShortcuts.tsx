"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { cycleTheme, themeAtom } from "../_lib/theme-state";

// Mounted once under AnimRoot. Owns everything that must run a single time
// per page: hydrating the atom from the pre-hydration <html data-theme>
// attribute, the system-preference listener, and the global T keybinding.
// ThemeSwatch can be rendered in multiple placements without duplicating
// listeners or racing on DOM writes.
export function ThemeShortcuts() {
  const [, setTheme] = useAtom(themeAtom);

  // Hydrate from the pre-hydration script's value, then follow system
  // color-scheme changes until the user explicitly picks a theme.
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark" || attr === "accent") {
      setTheme(attr);
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return; // user override wins
      const next = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [setTheme]);

  // T cycles the theme. Routes through the same cycleTheme used by the
  // swatch click so sound, haptic, and dedupe lock stay consistent.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "t" && e.key !== "T") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      )
        return;
      e.preventDefault();
      cycleTheme();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
