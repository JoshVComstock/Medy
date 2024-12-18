import colors from "tailwindcss/colors";
import { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "rgb(0,0,0)",
        white: "rgb(255,255,255)",
        accent: "rgb(255,255,255)",
        text: colors.gray["900"],
        primary: {
          700:"#2AB0AAff",
          300:"#FCFDFDff",
          600:"#ADE4E3ff",
          500:"#2AB0AAff",
          900:"#2AB0AAff",
          100:"#F8FFFEff"
        },
        gray: {
          ...colors.gray,
        },
        danger: colors.rose["800"],
        deleted: colors.rose["100"],
        success: {
          "100": colors.green["100"],
          "500": colors.green["500"],
        },
        warning: colors.amber["100"],
      },
      keyframes: {
        appear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        spin: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(360deg)" },
        },
        appearFromRight: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        growFromLeft: {
          "0%": {
            transform: "scaleX(0)",
          },
          "100%": {
            transform: "scaleX(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default tailwindConfig;
