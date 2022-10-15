/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       
      gridTemplateColumns: {
        '28': 'repeat(28, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
      },
      gridColumnStart: {
        '22': '22',
        '25': '25',
      },
     
      gridColumn: {
        'span-20': 'span 19 / span 19',
        'span-27': 'span 27 / span 27',
      },
     
      colors: {
        LEADERBOARD:'#FFCC00'

      },
    },
  },
  plugins: [],
};
