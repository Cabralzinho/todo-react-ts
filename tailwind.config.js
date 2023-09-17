/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: {
          max: "850px"
        },
        medium: {
          max: "1200px"
        }
      }
    },
  },
  plugins: [],
}