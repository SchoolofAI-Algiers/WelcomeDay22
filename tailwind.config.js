module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Arcade Normal"],
    },
    fontSize: {
      xxxs : "0.5rem",
      xxs : "0.7rem",
      xs : "0.75 rem",
      sm : "0.875rem",
      base : "1rem",
      lg : "1.125rem",
      xl : "1.25rem",
     "2xl" : "1.5rem",
      "3xl" : "1.875rem",
      "4xl" : "2.25rem",
      "5xl" : "3rem",
      "6xl" : "3.75rem"

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
        28: "repeat(28, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
      gridColumnStart: {
        22: "22",
        25: "25",
      },

      gridColumn: {
        "span-20": "span 19 / span 19",
        "span-27": "span 27 / span 27",
      },

      colors: {
        LEADERBOARD: "#FFCC00",
        blue: "#1A2257",
      },
    },
  },
  plugins: [],
};
