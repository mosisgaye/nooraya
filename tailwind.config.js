/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
        'poppins': ['var(--font-poppins)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'progress': 'progress 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        progress: {
          '0%': { width: '0%', transform: 'translateX(0)' },
          '50%': { width: '60%' },
          '100%': { width: '100%', transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}