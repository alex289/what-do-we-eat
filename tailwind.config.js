/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          0: '#fff',
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', ...fontFamily.sans],
      },
    },
  },
  variants: {
    typography: ['dark'],
  },
  daisyui: {
    themes: ['dark'],
    base: false,
    logs: false,
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
