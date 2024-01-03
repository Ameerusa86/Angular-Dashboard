/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#f6f6f9",
        darkBg: "#181A1E",
        darkText: "#363949",
        lightText: "#fbfbfb",
      },
    },
  },
  plugins: [],
  variants: {},
  darkMode: "class",
};
