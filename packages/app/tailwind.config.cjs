/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-lighter': 'var(--color-primary-lighter)',
        'primary-dark': 'var(--color-primary-dark)',
        white: '#f8fafc'
      }
    },
  },

  plugins: [
    require('daisyui')
  ],

  daisyui: {
    themes: ["light"],
  },
};

module.exports = config;