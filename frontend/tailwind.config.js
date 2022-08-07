/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          50: '#F2E8CF',
          100: '#386641',
          120: '#828282',
          150: '#E36414'
        },
      }
    },
  },
  plugins: [],
}
