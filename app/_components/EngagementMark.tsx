import type { EngagementSlug } from "../_lib/engagements";

// Hairline diagrams that encode the engagement, not decorate it.
// Each mark is a 96×52 viewBox so they share an optical size in the card.

function BuildMark() {
  return (
    <svg
      viewBox="0 0 96 52"
      aria-hidden
      className="engagement-mark h-[52px] w-[96px]"
    >
      {/* Page frame with a header bar — a surface being built. */}
      <rect
        x="10"
        y="6"
        width="76"
        height="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <line
        x1="10"
        y1="14"
        x2="86"
        y2="14"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      {/* Body blocks: they grow to full measure on hover, like a render. */}
      <rect className="mark-fill" x="16" y="20" width="44" height="5" />
      <rect
        className="mark-fill"
        x="16"
        y="28"
        width="36"
        height="5"
        style={{ transitionDelay: "50ms" }}
      />
      <rect
        className="mark-fill"
        x="16"
        y="36"
        width="24"
        height="5"
        style={{ transitionDelay: "100ms" }}
      />
    </svg>
  );
}

function PrototypeMark() {
  return (
    <svg
      viewBox="0 0 96 52"
      aria-hidden
      className="engagement-mark h-[52px] w-[96px]"
    >
      {/* Three frames — the core flows — joined by a path a dot travels. */}
      <rect
        x="6"
        y="16"
        width="22"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <rect
        x="37"
        y="16"
        width="22"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <rect
        x="68"
        y="16"
        width="22"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        d="M28 24 H37 M59 24 H68"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle className="mark-dot" r="1.6" fill="currentColor" cx="17" cy="24" />
    </svg>
  );
}

function SystemsMark() {
  return (
    <svg
      viewBox="0 0 96 52"
      aria-hidden
      className="engagement-mark h-[52px] w-[96px]"
    >
      {/* Type scale on a baseline — tokens, not a component collage. */}
      <line
        x1="10"
        y1="40"
        x2="86"
        y2="40"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.4"
      />
      <rect
        className="mark-token"
        x="12"
        y="32"
        width="8"
        height="8"
      />
      <rect
        className="mark-token"
        x="28"
        y="26"
        width="12"
        height="14"
      />
      <rect
        className="mark-token"
        x="48"
        y="18"
        width="16"
        height="22"
      />
      <rect
        className="mark-token"
        x="72"
        y="10"
        width="14"
        height="30"
      />
    </svg>
  );
}

function FractionalMark() {
  return (
    <svg
      viewBox="0 0 96 52"
      aria-hidden
      className="engagement-mark h-[52px] w-[96px]"
    >
      {/* A week. Two days filled; a third ghosts in on hover. */}
      {[0, 1, 2, 3, 4, 5, 6].map((d) => {
        const x = 10 + d * 12;
        const filled = d === 0 || d === 1;
        const extra = d === 2;
        return (
          <rect
            key={d}
            x={x}
            y="16"
            width="8"
            height="20"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="0.75"
            opacity={filled ? 0.85 : extra ? undefined : 0.55}
            className={extra ? "mark-third" : undefined}
          />
        );
      })}
    </svg>
  );
}

const MARKS = {
  sprint: BuildMark,
  prototype: PrototypeMark,
  systems: SystemsMark,
  fractional: FractionalMark,
} as const;

export function EngagementMark({ slug }: { slug: EngagementSlug }) {
  const Mark = MARKS[slug];
  return <Mark />;
}
