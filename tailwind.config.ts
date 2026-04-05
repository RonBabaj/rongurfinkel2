import type { Config } from "tailwindcss";

/**
 * RTL: `rtl:` / `ltr:` variants are built into Tailwind v3.3+.
 * Prefer logical utilities: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`,
 * `text-start`, `text-end`, `border-s`, `border-e`, `rounded-s`, `rounded-e`.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        /** Base44-style tokens (ron-gurfinkel-portfolio base44.app) */
        obsidian: "#05070A",
        midnight: "#0F172A",
        brand: {
          DEFAULT: "#2DD4BF",
          dim: "#14b8a6",
        },
        indigo: {
          accent: "#6366F1",
        },
        accent: "var(--accent)",
        muted: "var(--muted)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scroll-hint-line": {
          "0%, 100%": { opacity: "0.35", transform: "scaleY(0.92)" },
          "50%": { opacity: "0.95", transform: "scaleY(1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "scroll-hint-line": "scroll-hint-line 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
