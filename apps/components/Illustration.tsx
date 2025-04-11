type IllustrationProps = {
  src: string;
  alt: string;
  caption: string;
  fullWidth?: boolean;
  palette?: 'violet' | 'blue' | 'green' | 'gray';
  ringColor?: string;
  textColor?: string;
};

export default function Illustration({
  src,
  alt,
  caption,
  fullWidth = false,
  palette,
  ringColor,
  textColor,
}: IllustrationProps) {
  const resolvedRing = ringColor ?? getRingFromPalette(palette);
  const resolvedText = textColor ?? getTextFromPalette(palette);
  const widthClass = fullWidth ? 'w-full max-w-2xl' : 'max-w-full';

  return (
    <figure className="my-8 flex flex-col items-center text-center">
      <img
        src={src}
        alt={alt}
        data-eac-bypass-base
        className={`rounded-2xl shadow-xl ring-1 ${resolvedRing} ${widthClass}`}
      />
      <figcaption
        className={`mt-4 text-sm tracking-wide uppercase ${resolvedText}`}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function getRingFromPalette(palette?: string) {
  switch (palette) {
    case 'violet':
      return 'ring-[color:theme(colors.neon-violet)/30]';
    case 'blue':
      return 'ring-[color:theme(colors.neon-blue)/30]';
    case 'green':
      return 'ring-[color:theme(colors.neon-green)/30]';
    case 'gray':
    default:
      return 'ring-gray-300/30';
  }
}

function getTextFromPalette(palette?: string) {
  switch (palette) {
    case 'violet':
      return 'text-[color:theme(colors.neon-violet)]';
    case 'blue':
      return 'text-[color:theme(colors.neon-blue)]';
    case 'green':
      return 'text-[color:theme(colors.neon-green)]';
    case 'gray':
    default:
      return 'text-gray-400';
  }
}
