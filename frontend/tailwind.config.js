/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    fontFamily: {
      "font-family": "Roboto,sans-serif",
    },

    extend: {
      colors: {
        mainbg: "var(--main-background)",
      },

      textColor: {
        skin: {
          primary: "var( --text-primary)",
        },
      },

      backgroundColor: {
        skin: {
          main: "var(--main-background)",
        },
      },
    },
  },
  plugins: [],
};
