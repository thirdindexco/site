// The load sequence. The head script in layout.tsx sets html[data-intro]
// to "blue" or "grey" before first paint; while it is set, the page is a
// field of that colour with only the hero on it (globals.css). The hero
// writes itself in, holds for INTRO_HOLD_S, then leaveIntro() turns the
// field into the page: html[data-intro-out] arms the colour transitions,
// data-intro comes off on the next frame, and the rest of the page fades
// in around the hero. Below the desktop breakpoint there is no GSAP
// timeline, so AnimRoot runs the same hand-off on a timer.
export const INTRO_HOLD_S = 0.35;
export const INTRO_SWITCH_S = 0.6;
export const INTRO_MOBILE_MS = 1100;

export function leaveIntro() {
  const html = document.documentElement;
  if (!html.hasAttribute("data-intro")) return;
  html.setAttribute("data-intro-out", "");
  requestAnimationFrame(() => {
    html.removeAttribute("data-intro");
    window.setTimeout(
      () => html.removeAttribute("data-intro-out"),
      INTRO_SWITCH_S * 1000 + 200,
    );
  });
}
