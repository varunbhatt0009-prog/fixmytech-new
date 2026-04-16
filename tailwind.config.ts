import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        sand: "#f8fafc",
        accent: "#0f766e",
        accentSoft: "#ccfbf1",
        borderSoft: "#dbe4ee"
      },
      boxShadow: {
        card: "0 18px 45px rgba(15, 23, 42, 0.08)"
      },
      maxWidth: {
        prose: "72ch"
      }
    }
  },
  plugins: []
};

export default config;
