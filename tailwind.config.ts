import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F0",
        ivory: "#FFFAF5",
        beige: "#F0E6D6",
        brown: "#5C3D2E",
        darkBrown: "#3D2517",
        terracotta: "#C67B5C",
        peach: "#F5D5C0",
        mehndiGreen: "#7A9E7E",
        "mehndi-green": "#7A9E7E",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
