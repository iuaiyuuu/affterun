/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'reddit-sans': ['"Reddit Sans"', 'sans-serif'],
        'noto-sans': ['"Noto Sans"', 'sans-serif'],
        'noto-sans-gujarati': ['"Noto Sans Gujarati"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
