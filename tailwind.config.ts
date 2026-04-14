import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        accent: "var(--accent)",
        neutral: "var(--neutral)",
        ink: "var(--ink)",
      },
    },
  },
  plugins: [],
} satisfies Config;
