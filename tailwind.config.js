/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0A2463',
        'secondary': '#3E92CC',
        'ghost-white': '#FFFAFF',
        'cerise': '#D8315B',
        'erise-black': '#1E1B18'
      }
    },
    fontFamily: {
      roboto: 'Roboto',
      poppins: 'Poppins',
    }
  },
  plugins: [],
}

