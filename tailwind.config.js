/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        3: '3', // For limiting to 3 lines
      },
    },
  },
  plugins: [],
}