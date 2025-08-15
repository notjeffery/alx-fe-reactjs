/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/index.html', // ✅ added for checker
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
