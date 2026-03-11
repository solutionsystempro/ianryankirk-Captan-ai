/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#08080B',
        'background-alt': '#0F0F14',
        surface: '#16161E',
        border: '#1F1F28',
        accent: '#AAFF00',
        starlink: '#0052FF',
        'off-white': '#EFEFEF',
        'warm-gray': '#7A7A8C',
        muted: '#7A7A8C',
        danger: '#FF3B30',
        success: '#00D26A',
        warning: '#FF8C00',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Inter"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        ticker: 'ticker 50s linear infinite',
        float: 'float 6s ease-in-out infinite',
        livePulse: 'livePulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        livePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'dot-pattern':
          'radial-gradient(rgba(170,255,0,0.15) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '64px 64px',
        dot: '28px 28px',
      },
    },
  },
  plugins: [],
}
