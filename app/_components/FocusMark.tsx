// Hairline diagrams for the focus areas — each one draws the kind of work,
// and a small motion on card hover finishes the thought. Every mark shares a
// 96×52 viewBox so they hold the same optical size across the grid. The
// motion is Tailwind group-hover off the card (`group/focus`), so rest
// states have to read on their own.

export type FocusMarkKey =
  | "interfaces"
  | "systems"
  | "websites"
  | "cms"
  | "creative"
  | "architecture";

const EASE =
  "transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
// Grows from its left edge.
const GROW = `${EASE} origin-left [transform-box:fill-box]`;
const LINE = { fill: "none", stroke: "currentColor", strokeWidth: 0.75 };

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 96 52" aria-hidden className="h-13 w-24">
      {children}
    </svg>
  );
}

// An app window: sidebar, one selected row that slides down the list.
function InterfacesMark() {
  return (
    <Svg>
      <rect x="10" y="6" width="76" height="40" {...LINE} />
      <line x1="30" y1="6" x2="30" y2="46" {...LINE} />
      <rect
        x="13"
        y="11"
        width="14"
        height="5"
        fill="currentColor"
        className={`opacity-25 ${EASE} group-hover/focus:translate-y-[9px]`}
      />
      {[20, 29, 38].map((y, i) => (
        <rect
          key={y}
          x="36"
          y={y - 8}
          width={[40, 32, 24][i]}
          height="4"
          fill="currentColor"
          className="opacity-15"
        />
      ))}
    </Svg>
  );
}

// A kit of four primitives: one present, the rest fill in.
function SystemsMark() {
  const cells = [
    [10, 8],
    [30, 8],
    [10, 28],
    [30, 28],
  ];
  return (
    <Svg>
      {cells.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="16"
          height="16"
          stroke="currentColor"
          strokeWidth="0.75"
          style={{ transitionDelay: `${i * 60}ms` }}
          className={
            i === 0
              ? "fill-current opacity-85"
              : `fill-transparent opacity-55 ${EASE} group-hover/focus:fill-current group-hover/focus:opacity-30`
          }
        />
      ))}
    </Svg>
  );
}

// A page — nav, hero, two columns. The columns rebuild to full on hover.
function WebsitesMark() {
  return (
    <Svg>
      <rect x="22" y="4" width="52" height="44" {...LINE} />
      <line x1="22" y1="10" x2="74" y2="10" {...LINE} />
      <rect x="27" y="14" width="42" height="12" fill="currentColor" className="opacity-15" />
      {[27, 50].map((x, i) => (
        <rect
          key={x}
          x={x}
          y="30"
          width="19"
          height="13"
          fill="currentColor"
          style={{ transitionDelay: `${i * 60}ms` }}
          className={`opacity-15 ${GROW} scale-x-40 group-hover/focus:scale-x-100 group-hover/focus:opacity-30`}
        />
      ))}
    </Svg>
  );
}

// Content blocks of mixed lengths that snap to one measure — systemized.
function CmsMark() {
  return (
    <Svg>
      {[
        [10, 58],
        [20, 34],
        [30, 70],
        [40, 46],
      ].map(([y, w], i) => (
        <g key={y}>
          <rect x="10" y={y - 4} width="6" height="6" {...LINE} />
          <rect
            x="22"
            y={y - 3}
            width="64"
            height="4"
            fill="currentColor"
            style={
              {
                "--w": w / 64,
                transitionDelay: `${i * 50}ms`,
              } as React.CSSProperties
            }
            className={`opacity-20 ${GROW} [transform:scaleX(var(--w))] group-hover/focus:[transform:scaleX(1)]`}
          />
        </g>
      ))}
    </Svg>
  );
}

// A wave that draws itself on hover — motion, canvas, choreography.
function CreativeMark() {
  const d = "M8 26 C 20 6, 30 6, 40 26 S 60 46, 72 26 S 84 12, 88 18";
  return (
    <Svg>
      <path d={d} {...LINE} className="opacity-25" />
      <path
        d={d}
        pathLength={1}
        {...LINE}
        strokeDasharray="1"
        className={`[stroke-dashoffset:0.7] group-hover/focus:[stroke-dashoffset:0] ${EASE} duration-900`}
      />
    </Svg>
  );
}

// A tree: root to modules to leaves. The leaves resolve on hover.
function ArchitectureMark() {
  const leaves = [18, 38, 58, 78];
  return (
    <Svg>
      <rect x="43" y="4" width="10" height="8" fill="currentColor" className="opacity-85" />
      <path
        d="M48 12 V18 M28 18 H68 M28 18 V24 M68 18 V24 M18 32 H38 M58 32 H78 M28 30 V32 M68 30 V32 M18 32 V38 M38 32 V38 M58 32 V38 M78 32 V38"
        {...LINE}
      />
      <rect x="23" y="24" width="10" height="6" {...LINE} />
      <rect x="63" y="24" width="10" height="6" {...LINE} />
      {leaves.map((x, i) => (
        <rect
          key={x}
          x={x - 4}
          y="38"
          width="8"
          height="8"
          stroke="currentColor"
          strokeWidth="0.75"
          style={{ transitionDelay: `${i * 60}ms` }}
          className={`fill-transparent opacity-55 ${EASE} group-hover/focus:fill-current group-hover/focus:opacity-30`}
        />
      ))}
    </Svg>
  );
}

const MARKS = {
  interfaces: InterfacesMark,
  systems: SystemsMark,
  websites: WebsitesMark,
  cms: CmsMark,
  creative: CreativeMark,
  architecture: ArchitectureMark,
} as const;

export function FocusMark({ mark }: { mark: FocusMarkKey }) {
  const Mark = MARKS[mark];
  return <Mark />;
}
