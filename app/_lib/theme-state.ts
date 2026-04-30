"use client";

import { atom } from "jotai";
import { store } from "./store";

export type Theme = "light" | "dark" | "accent";

// Shared theme atom so multiple ThemeSwatch placements (mobile + desktop)
// stay in sync. The pre-hydration script in layout.tsx writes data-theme to
// <html> before React mounts; ThemeShortcuts reads that back into this atom.
export const themeAtom = atom<Theme>("dark");

// Single-click cycle through the three modes.
const NEXT_THEME: Record<Theme, Theme> = {
  light: "dark",
  dark: "accent",
  accent: "light",
};

// Lazily-initialized AudioContext, shared across cycleTheme invocations.
// Created on first gesture so the browser autoplay policy is satisfied.
let audioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AC =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

// Per-theme click pitch in semitones above base — turns the 3-mode cycle
// into a tiny recurring motif when clicked repeatedly.
const PITCH_SEMITONES: Record<Theme, number> = {
  dark: 0,
  light: 1,
  accent: 2,
};

// Minimum gap between cycle-handled toggles — prevents rapid-fire input
// (click or keyboard) from stacking audio bursts and overlapping flips.
const CLICK_LOCK_MS = 120;
let lockedUntil = 0;

// Switch mech — two transients ~22ms apart. The first is a bright contact
// "click" (narrow BP at ~5.8kHz), the second a lower "clack" at ~1.3kHz
// for the housing rebound. Independent jitter on the two events so the
// pair reads as a real mechanical motion rather than a stereo-layered
// synth patch. Pitch is nudged per target theme to form a 3-note motif.
function playClick(target: Theme) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const mult = Math.pow(2, PITCH_SEMITONES[target] / 12);
    const jitterClick = 1 + (Math.random() - 0.5) * 0.06;
    const jitterClack = 1 + (Math.random() - 0.5) * 0.08;
    const now = ctx.currentTime;
    const out = ctx.destination;

    // Click — 9ms noise through a narrow BP
    const len1 = Math.floor(ctx.sampleRate * 0.009);
    const buf1 = ctx.createBuffer(1, len1, ctx.sampleRate);
    const d1 = buf1.getChannelData(0);
    for (let i = 0; i < len1; i++) {
      d1[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len1 * 0.12));
    }
    const s1 = ctx.createBufferSource();
    s1.buffer = buf1;
    const bp1 = ctx.createBiquadFilter();
    bp1.type = "bandpass";
    bp1.frequency.value = 5800 * mult * jitterClick;
    bp1.Q.value = 3;
    const g1 = ctx.createGain();
    g1.gain.value = 0.055;
    s1.connect(bp1).connect(g1).connect(out);
    s1.start(now);

    // Clack — 14ms noise, lower/softer, 22ms after the click
    const len2 = Math.floor(ctx.sampleRate * 0.014);
    const buf2 = ctx.createBuffer(1, len2, ctx.sampleRate);
    const d2 = buf2.getChannelData(0);
    for (let i = 0; i < len2; i++) {
      d2[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len2 * 0.16));
    }
    const s2 = ctx.createBufferSource();
    s2.buffer = buf2;
    const bp2 = ctx.createBiquadFilter();
    bp2.type = "bandpass";
    bp2.frequency.value = 1300 * mult * jitterClack;
    bp2.Q.value = 1.6;
    const g2 = ctx.createGain();
    g2.gain.value = 0.03;
    s2.connect(bp2).connect(g2).connect(out);
    s2.start(now + 0.022);
  } catch {
    // ignore audio errors silently
  }
}

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
  playClick(next);
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(8);
  }
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
  store.set(themeAtom, next);
}
