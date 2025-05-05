import { type Config } from 'tailwindcss';
import scrollbar from 'tailwind-scrollbar';
import typography from '@tailwindcss/typography';
import unimportant from 'tailwindcss/unimportant';

export const neonColors = {
  'neon-violet': {
    50: '#FAE8FF',
    100: '#F5D0FE',
    200: '#F0ABFC',
    300: '#E879F9',
    400: '#D946EF',
    500: '#C026D3',
    600: '#A21CAF',
    700: '#86198F',
    800: '#701A75',
    900: '#581C87',
  },
  'neon-blue': {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  'neon-green': {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  'neon-cyan': {
    50: '#ECFEFF',
    100: '#CFFAFE',
    200: '#A5F3FC',
    300: '#67E8F9',
    400: '#22D3EE',
    500: '#06B6D4',
    600: '#0891B2',
    700: '#0E7490',
    800: '#155E75',
    900: '#164E63',
  },
  'neon-pink': {
    50: '#FDF2F8',
    100: '#FCE7F3',
    200: '#FBCFE8',
    300: '#F9A8D4',
    400: '#F472B6',
    500: '#EC4899',
    600: '#DB2777',
    700: '#BE185D',
    800: '#9D174D',
    900: '#831843',
  },
  'neon-orange': {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },
  'neon-yellow': {
    50: '#FEFCE8',
    100: '#FEF9C3',
    200: '#FEF08A',
    300: '#FDE047',
    400: '#FACC15',
    500: '#EAB308',
    600: '#CA8A04',
    700: '#A16207',
    800: '#854D0E',
    900: '#713F12',
  },
  'neon-purple': {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  'neon-lime': {
    50: '#F7FEE7',
    100: '#ECFCCB',
    200: '#D9F99D',
    300: '#BEF264',
    400: '#A3E635',
    500: '#84CC16',
    600: '#65A30D',
    700: '#4D7C0F',
    800: '#3F6212',
    900: '#365314',
  },
  'neon-teal': {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
    800: '#115E59',
    900: '#134E4A',
  },
  'neon-red': {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#F43F5E',
    600: '#E11D48',
    700: '#BE123C',
    800: '#9F1239',
    900: '#881337',
  },
  'neon-indigo': {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
};

const keyframes = {
  driftShake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-2px)' },
    '50%': { transform: 'translateX(2px)' },
    '75%': { transform: 'translateX(-2px)' },
  },
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  glitch: {
    '0%': { transform: 'translate(0)' },
    '20%': { transform: 'translate(-2px, 2px)' },
    '40%': { transform: 'translate(-2px, -2px)' },
    '60%': { transform: 'translate(2px, 2px)' },
    '80%': { transform: 'translate(2px, -2px)' },
    '100%': { transform: 'translate(0)' },
  },
  pan: {
    '0%': { 'background-position': '20% 20%', transform: 'rotate(0deg)' },
    '20%': { 'background-position': '22% 18%', transform: 'rotate(0.3deg)' },
    '40%': { 'background-position': '18% 22%', transform: 'rotate(-0.2deg)' },
    '60%': { 'background-position': '23% 17%', transform: 'rotate(0.4deg)' },
    '80%': { 'background-position': '27% 23%', transform: 'rotate(-0.3deg)' },
    '100%': { 'background-position': '20% 20%', transform: 'rotate(0deg)' },
  },
  pulseSlow: {
    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
    '50%': { opacity: '0.8', transform: 'scale(1.02)' },
  },
  signalFlash: {
    '0%, 100%': { opacity: '0.6' },
    '50%': { opacity: '1' },
  },
  slideUp: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  surfacePulse: {
    '0%, 100%': { transform: 'scale(1)', opacity: '1' },
    '50%': { transform: 'scale(1.05)', opacity: '0.9' },
  },
};

const animations = {
  'bg-pan': 'pan 30s ease-in-out infinite',
  fadeIn: 'fadeIn 1s ease-in-out',
  slideUp: 'slideUp 0.6s ease-out',
  glitch: 'glitch 300ms infinite',
  pulseSlow: 'pulseSlow 4s ease-in-out infinite',
  signalFlash: 'signalFlash 2s ease-in-out infinite',
  surfacePulse: 'surfacePulse 6s ease-in-out infinite',
  driftShake: 'driftShake 300ms ease-in-out',
};

const typoConfig = (theme: (path: string) => any) => ({
  DEFAULT: {
    css: {
      fontFamily: theme('fontFamily.sans').join(', '),
      color: theme('colors.slate.700'),
      a: {
        color: theme('colors.neon-blue.600'),
        '&:hover': { color: theme('colors.neon-blue.700') },
      },
      h1: {
        color: theme('colors.slate.900'),
        fontWeight: '700',
      },
      h2: {
        color: theme('colors.slate.900'),
        fontWeight: '600',
      },
      h3: {
        color: theme('colors.slate.800'),
        fontWeight: '600',
      },
      h4: {
        color: theme('colors.slate-800'),
      },
      h5: {
        color: theme('colors.slate-700'),
      },
      h6: {
        color: theme('colors.slate-700'),
      },
      blockquote: {
        fontStyle: 'italic',
        borderLeftColor: theme('colors.neon-violet.400'),
        color: theme('colors.slate.800'),
      },
    },
  },
  dark: {
    css: {
      fontFamily: theme('fontFamily.sans').join(', '),
      color: theme('colors.slate.300'),
      a: {
        color: theme('colors.neon-blue.400'),
        '&:hover': { color: theme('colors.neon-blue.300') },
      },
      h1: {
        color: theme('colors.white'),
      },
      h2: {
        color: theme('colors.slate.100'),
      },
      h3: {
        color: theme('colors.slate.200'),
      },
      h4: {
        color: theme('colors.slate.300'),
      },
      h5: {
        color: theme('colors.slate.400'),
      },
      h6: {
        color: theme('colors.slate.400'),
      },
      blockquote: {
        fontStyle: 'italic',
        borderLeftColor: theme('colors.neon-violet.300'),
        color: theme('colors.slate.100'),
      },
    },
  },
});

const config: Config = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 8px #60A5FA', // neon-blue-400
      },
      colors: {
        ...neonColors,
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        ['tech-sans']: ['IBM Plex Sans', 'sans-serif'],
      },
      gridTemplateColumns: {
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
        15: 'repeat(15, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
        17: 'repeat(17, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        19: 'repeat(19, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        5: 'repeat(5, minmax(0, 1fr))',
        6: 'repeat(6, minmax(0, 1fr))',
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
      },
      gridColumnStart: {
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
      },
      gridColumnEnd: {
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
      },
      outlineColor: {
        neon: '#93C5FD', // neon-blue-300
      },
      zIndex: {
        '-1': '-1',
      },

      keyframes: { ...keyframes },
      animation: { ...animations },
      transitionProperty: {
        default: 'all',
      },
      transitionTimingFunction: {
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },

      typography: typoConfig,
    },
  },
  plugins: [scrollbar, typography, unimportant],
};

export default config;
