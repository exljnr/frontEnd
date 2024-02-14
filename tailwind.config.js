/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    color: {
      brandPrimary: "#FF4310",
      brandSecondary: "#d82e0",
    },
    extend: {
      colors: {
        brandPrimary: "#FF4310",
        brandSecondary: "#d82e0",
      },
    },
  },
  plugins: [],
};
