/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(111, 110, 105)",
        white: "rgb(255, 252, 240)",
        dark: "rgb(16, 15, 15)"
      }
    },
  },
  plugins: [],
}

