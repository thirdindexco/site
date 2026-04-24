"use client";

import { useEffect, useState } from "react";

// 8 swatches × 22px = 176px, fills col-span-2 exactly (matches Figma).
// Gradual opacity falloff so the last dot is barely visible.
const swatchAlphas = [0.95, 0.8, 0.7, 0.5, 0.4, 0.3, 0.15, 0.05];

export function ThemeSwatch() {
  // Initial value matches SSR output; real theme is read from the attribute
  // set by the pre-hydration script in layout.tsx on mount.
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Hydrate from the pre-hydration attribute, then follow system changes
  // until the user explicitly picks a theme.
  useEffect(() => {
    const html = document.documentElement;
    const attr = html.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") setTheme(attr);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return; // user override wins
      setTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  const applyTheme = (t: "dark" | "light") => {
    try {
      localStorage.setItem("theme", t);
    } catch {}
    // Set the attribute synchronously so View Transitions can snapshot the
    // new DOM state immediately; the React state update just keeps the
    // component in sync afterwards.
    document.documentElement.setAttribute("data-theme", t);
    setTheme(t);
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!doc.startViewTransition || prefersReducedMotion) {
      applyTheme(next);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => applyTheme(next));

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 450,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="toggle theme"
      className="hidden md:col-span-2 md:col-start-4 md:flex cursor-pointer"
    >
      {swatchAlphas.map((a) => (
        <span
          key={a}
          aria-hidden
          data-anim="swatch"
          style={{
            background: `color-mix(in srgb, var(--foreground) ${a * 100}%, transparent)`,
            willChange: "filter, opacity",
          }}
          className="block h-[22px] w-[22px]"
        />
      ))}
    </button>
  );
}
