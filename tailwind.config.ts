import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        interface: ["var(--font-interface)", "monospace"],
        cursive: ["Playwrite NZ", "cursive"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tightest: "-0.07em",
        widest: "0.5em",
      }
    },
  },
  plugins: [],
};
export default config;
