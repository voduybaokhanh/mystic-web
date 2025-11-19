/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Sau này chúng ta thêm màu "tâm linh" ở đây
      colors: {
        'mystic-dark': '#1a1a2e',
        'mystic-gold': '#c4a248',
      }
    },
  },
  plugins: [],
}