import { Fragment } from 'preact';
import type { JSX } from 'preact';

type SequenceTone = 'light' | 'dark';

interface SequenceArrowProps {
  tone: SequenceTone;
  class?: string;
}

function SequenceArrow({ tone, class: className }: SequenceArrowProps): JSX.Element {
  const baseClass =
    'inline-flex items-center justify-center rounded-full shadow-[0_0_28px_rgba(10,216,232,0.45)]';
  const toneClass = tone === 'light'
    ? 'bg-gradient-to-br from-teal-400 via-cyan-300 to-sky-400 text-slate-900 dark:text-white'
    : 'bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-300 text-slate-900';

  const defaultSize = 'h-9 w-9';
  const wrapperClass = className
    ? `${baseClass} ${toneClass} ${className}`
    : `${baseClass} ${toneClass} ${defaultSize}`;

  const iconClass = tone === 'light'
    ? 'h-4 w-4 text-slate-900 dark:text-white'
    : 'h-4 w-4 text-slate-900';

  return (
    <span class={wrapperClass}>
      <svg
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        class={iconClass}
      >
        <path
          d='M5 12h14m0 0-5-5m5 5-5 5'
          stroke='currentColor'
          stroke-width='1.8'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
      <span class='sr-only'>to</span>
    </span>
  );
}

interface SequenceHeadlineProps {
  value: string | string[];
  tone?: SequenceTone;
  delimiter?: string;
  class?: string;
  segmentClass?: string;
  arrowClass?: string;
}

export default function SequenceHeadline({
  value,
  tone = 'dark',
  delimiter = '->',
  class: className,
  segmentClass,
  arrowClass,
}: SequenceHeadlineProps): JSX.Element {
  const parts = Array.isArray(value)
    ? value.map((part) => part.trim()).filter(Boolean)
    : value.split(delimiter).map((part) => part.trim()).filter(Boolean);

  if (parts.length <= 1) {
    return <span class={className}>{value}</span>;
  }

  const baseClass = 'inline-flex flex-wrap items-center justify-center gap-3';
  const wrapperClass = className ? `${baseClass} ${className}` : baseClass;

  return (
    <span class={wrapperClass}>
      {parts.map((part, index) => {
        const isLast = index === parts.length - 1;

        return (
          <Fragment key={`${part}-${index}`}>
            <span class={segmentClass}>{part}</span>
            {isLast ? null : <SequenceArrow tone={tone} class={arrowClass} />}
          </Fragment>
        );
      })}
    </span>
  );
}
