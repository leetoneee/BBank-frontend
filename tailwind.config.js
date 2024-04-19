/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['museo-slab-500'],
        'museo-slab-100': ['museo-slab-100'],
        'inter-400': ['inter-400'],
        'inter-700': ['inter-700'],
        'aubrey': ['aubrey'],
      },

      keyframes: {
        slidein:{
          from:{
            opacity: "0",
            transform: "translateY(10px)",
          },
          to:{
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        
      },
      animation: {
        slidein: "slidein 1s ease-in-out",
      },
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