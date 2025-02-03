/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'rgb(255, 255, 255)', 
        foreground: 'rgb(0, 0, 0)', 
        border: 'rgb(229, 231, 235)', 
      },
    },
  },
  plugins: [],
};
