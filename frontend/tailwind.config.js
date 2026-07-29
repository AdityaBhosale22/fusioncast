/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        card: '#18181B',
        cardHover: '#27272A',
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#818CF8',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          hover: '#7C3AED',
        },
        darkText: '#FAFAFA',
        muted: '#A1A1AA',
        success: '#22C55E',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        glow: '0 0 20px rgba(99, 102, 241, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
