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
          DEFAULT: "#2EE6D4",
          dim: "#0d9488",
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
          "0%, 100%": { opacity: "0.55", transform: "scaleY(0.88)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
        "scroll-hint-chevron": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.75" },
          "50%": { transform: "translateY(5px)", opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "scroll-hint-line": "scroll-hint-line 2.2s ease-in-out infinite",
        "scroll-hint-chevron": "scroll-hint-chevron 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
