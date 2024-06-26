/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'green': '0 25px 25px rgb(173,255,47)',
        '2xl-green': '0 25px 25px rgba(166, 163, 82, 0.25)',
      },
      backgroundImage: {
        'uit-pattern': "url('src/assets/icons/uitPattern.svg')",
      },

      fontFamily: {
        'museo-slab-500': ['museo-slab-500'],
        'museo-slab-100': ['museo-slab-100'],
        'inter-400': ['inter-400'],
        'inter-700': ['inter-700'],
        'aubrey': ['aubrey'],
      },

      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        spin: {
          '0%': {
            transform: 'rotate(0deg)'
          },

          '100%': {
            transform: 'rotate(360deg)'
          },
        },
      },

      animation: {
        slidein: "slidein 1s ease-in-out",
        spin: "spin 1s infinite ease-in",
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
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
}