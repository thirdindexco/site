"use client";

// Shared switch-mech click — two filtered noise transients ~22ms apart. The
// first is a bright contact "click" (narrow BP at ~5.8kHz), the second a
// lower "clack" at ~1.3kHz for the housing rebound. Independent jitter on
// the two events so the pair reads as a real mechanical motion rather than
// a stereo-layered synth patch. Used by the theme toggle, the settings
// switches, and the project index rollover.

// Lazily-initialized AudioContext, shared across all click sources.
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

// `semitones` nudges both transients' center frequencies so callers can
// form small motifs (theme dark/light, switch off/on). `volume` scales the
// whole event; rollover ticks run quieter than deliberate toggles.
export function playClick(semitones = 0, volume = 1) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const mult = Math.pow(2, semitones / 12);
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
    g1.gain.value = 0.055 * volume;
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
    g2.gain.value = 0.03 * volume;
    s2.connect(bp2).connect(g2).connect(out);
    s2.start(now + 0.022);
  } catch {
    // ignore audio errors silently
  }
}

// Shared throttle for high-frequency triggers (list rollovers): a fast
// sweep down the project index reads as discrete ticks instead of a
// continuous rasp.
let throttledUntil = 0;
export function playClickThrottled(minGapMs: number, semitones = 0, volume = 1) {
  const now = Date.now();
  if (now < throttledUntil) return;
  throttledUntil = now + minGapMs;
  playClick(semitones, volume);
}
