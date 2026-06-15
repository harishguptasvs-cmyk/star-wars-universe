/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sw-gold': '#FFD700',
        'sw-blue': '#4FC3F7',
        'sw-red': '#EF5350',
        'sw-green': '#66BB6A',
        'sw-purple': '#AB47BC',
        'sw-dark': '#020408',
      },
      fontFamily: {
        'star': ['Trebuchet MS', 'sans-serif'],
      },
    },
  },
  plugins: [],
}