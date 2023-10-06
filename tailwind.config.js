/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'customh': {'raw': '(min-height: 840px)'},
      'customh2': {'raw': '((min-width: 300px) (max-height: 839px))'},
      'customh3': {'raw': '((min-height: 300px) and (max-height: 601px))'}
    },
    extend: {},
  },
  plugins: [],
}

