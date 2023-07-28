/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#457b9d",
          "secondary": "#f5a201",
          "accent": "#6a4c93",
          "neutral": "#323031",
          "base-100": "#e9e7e7",
          "info": "#00b4d8",
          "success": "#06d6a0",
          "warning": "#ffd166",
          "error": "#ef476f",
        },
      },
    ],
  },
}
