/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        press: ['"Press Start 2P"', 'cursive'],
        vt323: ['"VT323"', 'monospace'],
      },
      colors: {
        pokemonYellow: '#FFCB05',
        pokemonBlue: '#3D7DCA',
        pokemonRed: '#e21c25'
      },
    },
  },
  plugins: [],
};
