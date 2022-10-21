module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Arcade Normal']
    },
    extend: {
      backgroundImage: {
        bg: "url('/assets/bg.png')",
        layout_title: "url('/assets/layout_title.png')",
        event1: "url('/assets/event1.png')",
        event2: "url('/assets/event2.png')",
        event3: "url('/assets/event3.png')",
        event4: "url('/assets/event4.png')",
      }, 
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
}
