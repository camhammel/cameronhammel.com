/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: '#024CA4'
      }
    },
  },

  plugins: [
    require('daisyui')
  ],

  daisyui: {
    themes: ["light", "dark"],
  },
};

module.exports = config;