"use client";

import { atom } from "jotai";
import { playClick } from "./click-sound";
import { store } from "./store";

export type Theme = "light" | "dark";

// Shared theme atom so multiple ThemeSwatch placements (mobile + desktop)
// stay in sync. The pre-hydration script in layout.tsx writes data-theme to
// <html> before React mounts; ThemeShortcuts reads that back into this atom.
export const themeAtom = atom<Theme>("dark");

// Single-click toggle between the two modes.
const NEXT_THEME: Record<Theme, Theme> = {
  light: "dark",
  dark: "light",
};

// Per-theme click pitch in semitones above base — turns the toggle into a
// tiny recurring motif when clicked repeatedly. The click synth itself
// lives in click-sound.ts, shared with the settings switches and the
// project index rollover.
const PITCH_SEMITONES: Record<Theme, number> = {
  dark: 0,
  light: 1,
};

// Minimum gap between cycle-handled toggles — prevents rapid-fire input
// (click or keyboard) from stacking audio bursts and overlapping flips.
const CLICK_LOCK_MS = 120;
let lockedUntil = 0;

// Canonical cycle entry point — called from both the swatch click and the
// T keyboard shortcut. Debounced at module scope so either path hitting
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
  playClick(PITCH_SEMITONES[next]);
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(8);
  }
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
  store.set(themeAtom, next);
}
