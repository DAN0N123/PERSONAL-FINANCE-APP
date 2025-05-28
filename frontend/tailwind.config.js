/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      content: {
        "password-msg": "'Password must be at least 8 characters'",
      },
      colors: {
        white: "hsl(0, 0%, 100%)",
        beige: {
          100: "hsl(30, 36%, 96%)",
          500: "hsl(23, 6%, 57%)",
        },
        grey: {
          900: "hsl(0, 0%, 13%)",
          500: "hsl(0, 0%, 41%)",
          300: "hsl(0, 0%, 70%)",
          100: "hsl(0, 0%, 95%)",
        },

        // Secondary Colors
        green: "hsl(177, 55%, 32%)",
        yellow: "hsl(24, 70%, 87%)",
        cyan: "hsl(192, 59%, 85%)",

        navy: "hsl(240, 8%, 41%)",
        red: "hsl(7, 53%, 50%)",
        purple: "hsl(260, 30%, 59%)",

        // Other Colors
        purpleAlt: "hsl(288, 29%, 62%)",
        turquoise: "hsl(180, 16%, 42%)",
        brown: "hsl(27, 30%, 44%)",

        magenta: "hsl(332, 30%, 48%)",
        blue: "hsl(225, 46%, 41%)",
        navyGrey: "hsl(214, 11%, 58%)",

        armyGreen: "hsl(87, 21%, 47%)",
        gold: "hsl(37, 30%, 59%)",
        orange: "hsl(31, 44%, 76%)",
      },
    },
  },
  plugins: [],
};
