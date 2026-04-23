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

        // signature (accent) — same on both modes
        accent: "var(--accent)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        ld: ["var(--font-ld)", "Georgia", "serif"],
      },
      fontSize: {
        "3xs": ["9px", { lineHeight: "1.16" }],
        "2xs": ["10px", { lineHeight: "1.16" }],
      },
      maxWidth: {
        canvas: "1600px",
        grid: "1136px",
      },
    },
  },
  plugins: [],
} satisfies Config;
