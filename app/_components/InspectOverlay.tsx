"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Box = { x: number; y: number; w: number; h: number };
type Edges = { t: number; r: number; b: number; l: number };

type Metrics = {
  tag: string;
  classes: string;
  margin: Edges;
  border: Edges;
  padding: Edges;
  marginBox: Box;
  borderBox: Box;
  paddingBox: Box;
  contentBox: Box;
};

const num = (v: string) => parseFloat(v) || 0;
const r = Math.round;

function readMetrics(el: HTMLElement): Metrics {
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);

  const margin: Edges = {
    t: num(cs.marginTop),
    r: num(cs.marginRight),
    b: num(cs.marginBottom),
    l: num(cs.marginLeft),
  };
  const border: Edges = {
    t: num(cs.borderTopWidth),
    r: num(cs.borderRightWidth),
    b: num(cs.borderBottomWidth),
    l: num(cs.borderLeftWidth),
  };
  const padding: Edges = {
    t: num(cs.paddingTop),
    r: num(cs.paddingRight),
    b: num(cs.paddingBottom),
    l: num(cs.paddingLeft),
  };

  // getBoundingClientRect() is the border box.
  const borderBox: Box = {
    x: rect.left,
    y: rect.top,
    w: rect.width,
    h: rect.height,
  };
  const marginBox: Box = {
    x: rect.left - margin.l,
    y: rect.top - margin.t,
    w: rect.width + margin.l + margin.r,
    h: rect.height + margin.t + margin.b,
  };
  const paddingBox: Box = {
    x: rect.left + border.l,
    y: rect.top + border.t,
    w: rect.width - border.l - border.r,
    h: rect.height - border.t - border.b,
  };
  const contentBox: Box = {
    x: paddingBox.x + padding.l,
    y: paddingBox.y + padding.t,
    w: paddingBox.w - padding.l - padding.r,
    h: paddingBox.h - padding.t - padding.b,
  };

  const classes =
    typeof el.className === "string" ? el.className.trim() : "";

  return {
    tag: el.tagName.toLowerCase(),
    classes,
    margin,
    border,
    padding,
    marginBox,
    borderBox,
    paddingBox,
    contentBox,
  };
}

// Nearest-edge gap between two 1D segments. 0 when they overlap.
function axisGap(a1: number, a2: number, b1: number, b2: number) {
  if (b1 > a2) return b1 - a2;
  if (a1 > b2) return a1 - b2;
  return 0;
}

function boxStyle(b: Box): React.CSSProperties {
  return { left: b.x, top: b.y, width: b.w, height: b.h };
}

const BadgeRow = ({ children }: { children: React.ReactNode }) => (
  <span className="flex gap-2">{children}</span>
);

export function InspectOverlay({ enabled }: { enabled: boolean }) {
  const elRef = useRef<HTMLElement | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  // Anchor element captured while ⌥/Alt is held, for distance mode.
  const anchorElRef = useRef<HTMLElement | null>(null);
  const [anchor, setAnchor] = useState<Metrics | null>(null);

  const recompute = useCallback(() => {
    if (elRef.current?.isConnected) {
      setMetrics(readMetrics(elRef.current));
    }
    if (anchorElRef.current?.isConnected) {
      setAnchor(readMetrics(anchorElRef.current));
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      elRef.current = null;
      anchorElRef.current = null;
      setMetrics(null);
      setAnchor(null);
      return;
    }

    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "crosshair";

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        !target ||
        target === document.documentElement ||
        target === document.body
      ) {
        return;
      }
      elRef.current = target;
      setMetrics(readMetrics(target));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Alt" && elRef.current && !anchorElRef.current) {
        anchorElRef.current = elRef.current;
        setAnchor(readMetrics(elRef.current));
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        anchorElRef.current = null;
        setAnchor(null);
      }
    };

    let frame = 0;
    const onScrollOrResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        recompute();
      });
    };

    document.addEventListener("mouseover", onOver, true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      document.body.style.cursor = prevCursor;
      document.removeEventListener("mouseover", onOver, true);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, recompute]);

  if (!enabled || !metrics) return null;

  const bb = metrics.borderBox;
  const { padding: p, margin: m } = metrics;

  // Distance mode: connector + gap labels between anchor and current.
  let distance: React.ReactNode = null;
  if (anchor && anchorElRef.current !== elRef.current) {
    const a = anchor.borderBox;
    const ac = { x: a.x + a.w / 2, y: a.y + a.h / 2 };
    const bc = { x: bb.x + bb.w / 2, y: bb.y + bb.h / 2 };
    const hGap = axisGap(a.x, a.x + a.w, bb.x, bb.x + bb.w);
    const vGap = axisGap(a.y, a.y + a.h, bb.y, bb.y + bb.h);

    distance = (
      <>
        <div
          className="absolute border border-dashed border-pink-500/70"
          style={boxStyle(a)}
        />
        {/* horizontal then vertical connector, devtools-style L */}
        <div
          className="absolute h-px bg-pink-500"
          style={{
            left: Math.min(ac.x, bc.x),
            top: ac.y,
            width: Math.abs(bc.x - ac.x),
          }}
        />
        <div
          className="absolute w-px bg-pink-500"
          style={{
            left: bc.x,
            top: Math.min(ac.y, bc.y),
            height: Math.abs(bc.y - ac.y),
          }}
        />
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-pink-500 px-1.5 py-1 font-mono text-[9px] uppercase leading-none text-white"
          style={{ left: (ac.x + bc.x) / 2, top: ac.y - 10 }}
        >
          h {r(hGap)}px · v {r(vGap)}px
        </div>
      </>
    );
  }

  // Badge: clamp into viewport, prefer just above the element.
  const badgeTop = bb.y > 92 ? bb.y - 4 : bb.y + bb.h + 4;
  const badgeLeft = Math.max(4, Math.min(bb.x, window.innerWidth - 220));
  const badgeBelow = bb.y <= 92;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* box model: margin → border → padding → content */}
      <div
        className="absolute bg-pink-500/10"
        style={boxStyle(metrics.marginBox)}
      />
      <div
        className="absolute bg-pink-500/15"
        style={boxStyle(metrics.borderBox)}
      />
      <div
        className="absolute bg-pink-500/25"
        style={boxStyle(metrics.paddingBox)}
      />
      <div
        className="absolute bg-pink-500/40 outline outline-1 -outline-offset-1 outline-pink-500/70"
        style={boxStyle(metrics.contentBox)}
      />

      {distance}

      <div
        className={`absolute flex max-w-[14rem] flex-col gap-1 bg-pink-500 px-1.5 py-1 font-mono text-[9px] uppercase leading-none text-white ${
          badgeBelow ? "" : "-translate-y-full"
        }`}
        style={{ left: badgeLeft, top: badgeTop }}
      >
        <span className="truncate">
          {metrics.tag}
          {metrics.classes ? ` · ${metrics.classes}` : ""}
        </span>
        <BadgeRow>
          <span>
            {r(bb.w)}×{r(bb.h)}
          </span>
          <span>
            x {r(bb.x)} y {r(bb.y)}
          </span>
        </BadgeRow>
        <BadgeRow>
          <span>
            pad {r(p.t)}·{r(p.r)}·{r(p.b)}·{r(p.l)}
          </span>
          <span>
            mar {r(m.t)}·{r(m.r)}·{r(m.b)}·{r(m.l)}
          </span>
        </BadgeRow>
      </div>
    </div>
  );
}
