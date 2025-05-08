import { JSX } from 'preact';
import { classSet } from '@fathym/atomic';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { getIntentStyles } from '../../../../src/utils/getIntentClasses.ts';

export type FigureImageProps = {
  intentType?: IntentTypes;
  caption?: string;
  alt: string;
  src: string;
  center?: boolean;
  large?: boolean;
  shadow?: 'xl' | '2xl';
  glow?: boolean;
} & JSX.HTMLAttributes<HTMLImageElement>;

export function FigureImage({
  src,
  alt,
  caption,
  intentType = IntentTypes.None,
  center = true,
  large = false,
  shadow = 'xl',
  glow = false,
  ...imgProps
}: FigureImageProps) {
  const { text, ring, glow: glowClass } = getIntentStyles(intentType);

  const figureClasses = classSet(
    [
      'my-8 flex flex-col w-full',
      center ? 'items-center text-center' : 'items-start text-left',
      large ? 'max-w-xl' : 'max-w-md',
    ],
    imgProps
  );

  const imageClasses = classSet([
    'rounded-2xl w-full',
    ring,
    glow ? glowClass : '',
    shadow === '2xl' ? 'shadow-2xl' : 'shadow-xl',
  ]);

  return (
    <figure class={figureClasses}>
      <img
        {...imgProps}
        data-eac-bypass-base
        src={src}
        alt={alt}
        class={imageClasses}
      />
      {caption && (
        <figcaption class={`mt-4 text-sm tracking-wide uppercase ${text}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
