import { type Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import unimportant from 'tailwindcss/unimportant';

const config: Config = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'neon-violet': '#D946EF',
        'neon-blue': '#3B82F6',
        'neon-green': '#10B981',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
      keyframes: {
        pan: {
          '0%': {
            'background-position': '20% 20%',
            transform: 'rotate(0deg)',
          },
          '20%': {
            'background-position': '22% 18%',
            transform: 'rotate(0.3deg)',
          },
          '40%': {
            'background-position': '18% 22%',
            transform: 'rotate(-0.2deg)',
          },
          '60%': {
            'background-position': '23% 17%',
            transform: 'rotate(0.4deg)',
          },
          '80%': {
            'background-position': '27% 23%',
            transform: 'rotate(-0.3deg)',
          },
          '100%': {
            'background-position': '20% 20%',
            transform: 'rotate(0deg)',
          },
        },        
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
      animation: {
        'bg-pan': 'pan 30s ease-in-out infinite',
        fadeIn: 'fadeIn 1s ease-in-out',
        slideUp: 'slideUp 0.6s ease-out',
        glitch: 'glitch 300ms infinite',
        pulseSlow: 'pulse 4s ease-in-out infinite',
      },
      transitionProperty: {
        default: 'all',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.300'),
            a: { color: theme('colors.neon-blue') },
            h1: { color: theme('colors.white') },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: theme('colors.neon-violet'),
              color: theme('colors.slate.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography, unimportant],
};

export default config;
