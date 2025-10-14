import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';
import { workspaceLibertyContent } from '../../../../../../src/marketing/liberty/index.ts';

export default function WorkspaceLibertyWorkspacesSection(): JSX.Element {
  const { heading, intro, benefits, inlineTip, checklist, media } =
    workspaceLibertyContent.workspaces;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#050713] via-[#090e24] to-[#04060f]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,#ec48993a,transparent_70%)] opacity-70 blur-[200px]'
      />

      <div class='relative z-10 flex flex-col gap-12'>
        <div class='flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-16'>
          <div class='space-y-6'>
            <div class='space-y-4'>
              <span class='inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neon-pink-100/80'>
                <span class='h-2 w-2 rounded-full bg-neon-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.8)]' />
                Workspaces
              </span>
              <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
                {heading}
              </h2>
              <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
                {intro}
              </p>
            </div>

            <div class='grid gap-4 sm:grid-cols-2'>
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  class='rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/80 shadow-[0_30px_100px_-90px_rgba(236,72,153,0.55)]'
                >
                  <h3 class='text-base font-semibold text-white'>
                    {benefit.title}
                  </h3>
                  <p class='mt-2 leading-relaxed text-white/70'>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <div class='rounded-3xl border border-dashed border-white/15 bg-white/5 px-5 py-4 text-sm text-white/70 shadow-[0_25px_90px_-80px_rgba(59,130,246,0.6)]'>
              {inlineTip}
            </div>
          </div>

          <div class='flex justify-center lg:justify-end'>
            <figure class='w-full max-w-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-[0_60px_160px_-120px_rgba(236,72,153,0.6)] backdrop-blur-lg'>
              <div class='aspect-[4/3] w-full'>
                <img
                  src={media.src}
                  alt={media.alt}
                  loading='lazy'
                  width={media.width}
                  height={media.height}
                  class='h-full w-full object-cover'
                />
              </div>
              {media.caption && (
                <figcaption class='px-6 py-4 text-sm text-white/60'>
                  {media.caption}
                </figcaption>
              )}
            </figure>
          </div>
        </div>

        <div class='space-y-4'>
          <h3 class='text-sm font-semibold uppercase tracking-[0.32em] text-white/60'>
            Can we...?
          </h3>
          <ul class='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {checklist.map((item) => (
              <li
                key={item.title}
                class='rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/75 shadow-[0_25px_85px_-80px_rgba(129,140,248,0.55)] transition-transform duration-150 hover:-translate-y-1 hover:bg-white/8'
              >
                <p class='font-semibold text-white'>{item.title}</p>
                {item.description && <p class='mt-2 text-white/70'>{item.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionSurface>
  );
}
