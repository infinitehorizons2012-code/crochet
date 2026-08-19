/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yarn: {
          pink: '#FF9EAA',
          softPink: '#FFD0D6',
          mint: '#A2E9C1',
          softMint: '#D4F5E4',
          yellow: '#FFDE59',
          softYellow: '#FFF1B0',
          purple: '#C3ACD0',
          softPurple: '#E7DDFF',
          blue: '#7FD8BE',
          softBlue: '#D6F8ED',
          coral: '#FF70A6',
          peach: '#FF9F1C',
        }
      },
      fontFamily: {
        sans: ['"Nunito"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
