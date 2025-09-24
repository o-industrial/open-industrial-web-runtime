const contentWidths = {
  narrow: 'max-w-3xl',
  default: 'max-w-5xl',
  wide: 'max-w-6xl',
  xwide: 'max-w-7xl',
  full: '',
} as const;

const horizontalPadding = {
  none: '',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
} as const;

const verticalPadding = {
  none: '',
  sm: 'py-16',
  lg: 'py-24',
  xl: 'py-28',
} as const;

export type MarketingContentWidth = keyof typeof contentWidths;
export type MarketingHorizontalPadding = keyof typeof horizontalPadding;
export type MarketingVerticalPadding = keyof typeof verticalPadding;

export interface MarketingContentOptions {
  width?: MarketingContentWidth;
  padding?: MarketingHorizontalPadding;
  center?: boolean;
  extra?: string;
}

export function marketingSectionContent(
  {
    width = 'wide',
    padding = 'md',
    center = false,
    extra,
  }: MarketingContentOptions = {},
): string {
  const classes = ['relative mx-auto w-full'];
  const widthClass = contentWidths[width];
  if (widthClass) {
    classes.push(widthClass);
  }

  const paddingClass = horizontalPadding[padding];
  if (paddingClass) {
    classes.push(paddingClass);
  }

  if (center) {
    classes.push('text-center');
  }

  if (extra) {
    classes.push(extra);
  }

  return classes.join(' ').trim().replace(/\s+/g, ' ');
}

export function marketingSectionPadding(
  padding: MarketingVerticalPadding = 'lg',
): string {
  return verticalPadding[padding] ?? '';
}
