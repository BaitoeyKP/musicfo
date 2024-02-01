/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      m: "500px",
      l: "1000px",
      hd: "1280px",
      fhd: "1920px",
      "4k": "3840px",
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          accent: "#D8B4FE",
          neutral: "#303030",
          "base-100": "#D8D8D8",
          info: "#101010",
          error: "#FCA5A5",
        },
        dark: {
          accent: "#D8B4FE",
          neutral: "#BBBBBB",
          "base-100": "#101010",
          info: "#D8D8D8",
          error: "#FCA5A5",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
