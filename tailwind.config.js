/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss: {
          900: '#030705', // Ultra dark background (pixels off)
          800: '#09120E', // Darker surface
          700: '#11221A', // Dark surface
          600: '#1C3529', // Borders
        },
        biogreen: {
          400: '#39FF14', // Neon Bioluminescent Green
          500: '#00E676', // Base Glowing Green
          600: '#00C853', // Deep Green
          900: '#003314', // Tinted dark green
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'], // For tech/edgy headlines
      },
      backgroundImage: {
        'glow-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}