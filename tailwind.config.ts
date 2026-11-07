import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  // hook the `dark:` variant into our <html data-theme="dark"> attribute so
  // per-mode overrides can live in the JSX, not just CSS vars.
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // The five roles from globals.css: canvas, ink, surface, subdued
        // text, and the one orange.
        background: {
          DEFAULT: "var(--background)",
          light: "#faf9f7",
          dark: "#0b0b0b",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          light: "#0b0b0b",
          dark: "#faf9f7",
        },
        muted: {
          DEFAULT: "var(--muted)",
          light: "#e8e5e0",
          dark: "#1c1b19",
          foreground: "var(--muted-foreground)",
        },
        "muted-foreground": {
          DEFAULT: "var(--muted-foreground)",
          light: "#6b6965",
          dark: "#a8a5a0",
        },
        accent: "var(--accent)",
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
