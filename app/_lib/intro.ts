// Timing for the load cover (IntroCover). It holds full-colour for
// INTRO_HOLD_S, then fades over INTRO_FADE_S. The fade's ease front-loads
// almost all of the change, so the page is effectively uncovered a beat
// into it — that beat is when AnimRoot starts the hero cascade.
export const INTRO_HOLD_S = 1.4;
export const INTRO_FADE_S = 0.9;
export const INTRO_REVEAL_AT_S = INTRO_HOLD_S + 0.1;
