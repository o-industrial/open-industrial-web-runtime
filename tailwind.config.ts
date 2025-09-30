import type { Config } from 'tailwindcss';
import openIndustrialTailwindPreset from '@o-industrial/common/tailwind/preset';

export default {
  content: ['./**/*.tsx'],
  presets: [openIndustrialTailwindPreset],
} satisfies Config;
