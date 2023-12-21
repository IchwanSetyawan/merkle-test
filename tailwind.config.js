/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#168EEA",
        secondary: "#9FBED3",
        third: "#F4F4F4",
        dark: "#3A4039",
      },
      boxShadow: {
        smooth: "0px 0px 4px rgba(37, 37, 37, 0.25);",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
