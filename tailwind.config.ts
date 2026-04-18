import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        accent: "var(--accent)",
        neutral: "var(--neutral)",
        ink: "var(--ink)",
        muted: "var(--muted)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        ld: ["var(--font-ld)", "Georgia", "serif"],
        sd: ["var(--font-sd)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
