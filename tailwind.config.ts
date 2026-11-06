import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  // hook the `dark:` variant into our <html data-theme="dark"> attribute so
  // per-mode overrides can live in the JSX, not just CSS vars.
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // canvas / ink
        background: {
          DEFAULT: "var(--background)",
          light: "#fafafa",
          dark: "#0b0b0b",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          light: "#0b0b0b",
          dark: "#fafafa",
        },

        // cards / popovers mirror canvas
        card: {
          DEFAULT: "var(--card)",
          light: "#fafafa",
          dark: "#0b0b0b",
        },
        popover: {
          DEFAULT: "var(--popover)",
          light: "#fafafa",
          dark: "#0b0b0b",
        },

        // primary (ink-on-canvas, inverted between modes)
        primary: {
          DEFAULT: "var(--primary)",
          light: "#0b0b0b",
          dark: "#fafafa",
          foreground: "var(--primary-foreground)",
        },
        "primary-foreground": {
          DEFAULT: "var(--primary-foreground)",
          light: "#fafafa",
          dark: "#0b0b0b",
        },

        // surface (secondary / muted)
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "#e8e5e0",
          dark: "#1a1a1a",
        },
        muted: {
          DEFAULT: "var(--muted)",
          light: "#e8e5e0",
          dark: "#1a1a1a",
          foreground: "var(--muted-foreground)",
        },
        "muted-foreground": {
          DEFAULT: "var(--muted-foreground)",
          light: "#6b6b6b",
          dark: "#9b9b9b",
        },

        // signature (accent) — blue in light/dark, ink in accent mode.
        // -hover variant is a brighter sibling for primary CTA hover.
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
      },
      fontFamily: {
        // Only the debug overlays set mono now; the page is one family.
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
      },
      // The serif runs small across the whole page, after the reference:
      // twelve on thirteen for everything, a step up for the one statement
      // on the about view. Overriding the stock steps here keeps every
      // text-sm/base/xs call site in place while shrinking them together.
      fontSize: {
        "3xs": ["9px", { lineHeight: "10px" }],
        "2xs": ["10px", { lineHeight: "11px" }],
        xs: ["11px", { lineHeight: "12px" }],
        sm: ["12px", { lineHeight: "13px" }],
        base: ["13px", { lineHeight: "14px" }],
        lg: ["20px", { lineHeight: "1.15" }],
      },
      maxWidth: {
        canvas: "1600px",
        grid: "1136px",
      },
    },
  },
  plugins: [],
} satisfies Config;
