import type { Config } from "tailwindcss";
 
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-emerald': 'oklch(79.2% 0.209 151.711)',
      },
      animation: {
        move: "move 5s linear infinite",
      },
      keyframes: {
        move: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(200px)" },
        },
      },
    },
  },
  plugins: [],
};
 
export default config;