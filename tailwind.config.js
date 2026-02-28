/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],

  theme: {
    extend: {
      colors: {
        'brand-navy': '#0E1E36',        // main dark bg
        'brand-navy-soft': '#122844',   // gradient mid
        'brand-navy-light': '#162F52',  // card bg
        'brand-gold': '#C6A75E',
        'brand-blue': '#1E5CB3',
        'brand-dark': '#163d75',
      },

      fontFamily: {
        alata: ['Alata', 'sans-serif'],
        cabin: ['Cabin', 'sans-serif'],
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
}