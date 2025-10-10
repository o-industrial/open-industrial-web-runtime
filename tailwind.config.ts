import type { Config } from 'tailwindcss';
import openIndustrialTailwindPreset from '@o-industrial/atomic/tailwind/preset';

export default {
  content: ['./**/*.tsx'],
  presets: [openIndustrialTailwindPreset],
} satisfies Config;


