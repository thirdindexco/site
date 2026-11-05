"use client";

import { atom } from "jotai";
import { store } from "./store";

export type Theme = "light" | "dark";

// Shared theme atom so the theme controls (the T key and the settings
// panel's mood radios) stay in sync. The pre-hydration script in layout.tsx
// writes data-theme to <html> before React mounts; ThemeShortcuts reads
// that back into this atom.
export const themeAtom = atom<Theme>("dark");

// Where the current theme came from. "system" means nothing is stored and
// the page tracks prefers-color-scheme (the default for every new visitor);
// "manual" means a pick in the settings panel or the T key is pinned in
// localStorage. ThemeShortcuts hydrates this from storage on mount.
export type ThemeSource = "system" | "manual";
export const themeSourceAtom = atom<ThemeSource>("system");

export function systemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Drop the stored override and fall back to the OS setting. The listener
// in ThemeShortcuts picks up later OS changes once nothing is stored.
export function followSystemTheme() {
  const next = systemTheme();
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.removeItem("theme");
  } catch {}
  store.set(themeAtom, next);
  store.set(themeSourceAtom, "system");
}

// Single-click toggle between the two modes.
const NEXT_THEME: Record<Theme, Theme> = {
  light: "dark",
  dark: "light",
};

// Minimum gap between cycle-handled toggles — prevents rapid-fire input
// (click or keyboard) from overlapping flips.
const CLICK_LOCK_MS = 120;
let lockedUntil = 0;

// Canonical cycle entry point — called from the settings panel and the T
// keyboard shortcut. Debounced at module scope so either path hitting
// during the lock window is a no-op.
export function cycleTheme() {
  const now = Date.now();
  if (now < lockedUntil) return;
  lockedUntil = now + CLICK_LOCK_MS;

  const current = store.get(themeAtom);
  const next = NEXT_THEME[current];

  setTheme(next);
}

export function setTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
  store.set(themeAtom, next);
  store.set(themeSourceAtom, "manual");
}
