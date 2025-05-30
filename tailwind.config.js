/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        pink: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};