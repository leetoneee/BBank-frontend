/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'opacity-cde1df': '#CDE1DF', 
        'opacity-00b5ac': '#00B5AC',
      },
      backgroundOpacity: {
        '80': '0.8',
      },
    },
  },
  plugins: [],
}