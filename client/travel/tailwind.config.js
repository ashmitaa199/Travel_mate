/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgb(38, 57, 77) 0px 18px 53px 0px',
      },
    },
  },
  plugins: [],
}

