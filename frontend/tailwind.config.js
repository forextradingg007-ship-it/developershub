/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
          light: '#7dd3fc',
        },
        slate: {
          900: '#071321',
          950: '#020a13',
        },
        surface: {
          DEFAULT: '#071321',
          container: '#0b1b2f',
          low: '#0d2238',
          high: '#12304c',
          highest: '#17415f',
          bright: '#1d4e73',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      }
    }
  },
  plugins: []
}
