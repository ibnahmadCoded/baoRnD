/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        custom: {
          50: '#F2E8CF',
          100: '#386641',
          120: '#828282',
          150: '#E36414',
          155: '#faddca'
        },
      }
    },
  },
  plugins: [],
}
