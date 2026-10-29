/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'assets/**/*.js'),
    path.join(__dirname, 'demos/**/*.html')
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#090D16',
          900: '#111827',
          850: '#151D2E',
          800: '#1B2436',
          700: '#26324A'
        },
        brand: {
          DEFAULT: '#84CC16',
          bright: '#A3E635',
          dark: '#65A30D',
          soft: 'rgba(132, 204, 22, 0.12)',
          line: 'rgba(132, 204, 22, 0.32)',
          glow: 'rgba(132, 204, 22, 0.28)'
        },
        ember: {
          DEFAULT: '#F97316',
          soft: 'rgba(249, 115, 22, 0.12)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }]
      },
      letterSpacing: {
        tightest: '-0.04em'
      },
      maxWidth: {
        '8xl': '88rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(132,204,22,.18), 0 18px 60px -18px rgba(132,204,22,.35)',
        card: '0 24px 70px -30px rgba(0,0,0,.75)',
        lift: '0 32px 80px -32px rgba(0,0,0,.9)'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.45', transform: 'scale(.82)' }
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'sweep': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' }
        }
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        'fade-up': 'fade-up .7s cubic-bezier(.16,1,.3,1) both',
        'fade-in': 'fade-in .6s ease both',
        'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
        'float-y': 'float-y 5s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        sweep: 'sweep 2.6s ease-in-out infinite'
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(.16,1,.3,1)'
      }
    }
  },
  plugins: []
};
