/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-bg': '#1a1a1a',
        'chat-sidebar': '#1f2937',
        'chat-input': '#374151',
      }
    },
  },
  plugins: [],
}
