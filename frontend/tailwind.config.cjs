const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#60A5FA',
          dark: '#1D4ED8'
        }
      },
      boxShadow: {
        glass: '0 10px 40px -20px rgba(15, 23, 42, 0.6)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};
