import type { Config } from "tailwindcss";

const config: Config = {
  // CRITICAL: This tells Tailwind where to find your class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        interface: ["var(--font-interface)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "sans-serif"],
        cursive: ["Playwrite NZ", "cursive"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tightest: "-0.07em",
        widest: "0.5em",
      },
      animation: {
        'shimmer-fast': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
