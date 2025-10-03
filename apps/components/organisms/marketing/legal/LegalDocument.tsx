import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';
import { SectionHeader } from '@o-industrial/atomic/molecules';

import type {
  LegalDocumentContent,
  LegalListItemContent,
  LegalSectionContent,
} from '../../../../src/marketing/content.ts';

type LegalDocumentProps = {
  document: LegalDocumentContent;
};

function renderList(items: LegalListItemContent[], ordered?: boolean): JSX.Element {
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Tag class={`ml-6 ${ordered ? 'list-decimal' : 'list-disc'} space-y-2`}>
      {items.map((item, index) => (
        <li key={item.title ?? item.description ?? index}>
          {item.title ? <span class='font-semibold'>{item.title}</span> : null}
          {item.title && item.description ? <span>:</span> : null}
          {item.description ? <span class='font-normal'>{item.description}</span> : null}
        </li>
      ))}
    </Tag>
  );
}

function LegalSection({ section }: { section: LegalSectionContent }): JSX.Element {
  return (
    <div class='space-y-4 rounded-3xl border border-neutral-200/70 bg-white/90 p-8 shadow-[0_35px_120px_-90px_rgba(41,44,82,0.45)] backdrop-blur dark:border-white/10 dark:bg-neutral-900/80'>
      {section.title
        ? <h2 class='text-2xl font-semibold text-neutral-900 dark:text-white'>{section.title}</h2>
        : null}
      {section.subtitle
        ? (
          <p class='text-sm font-medium uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400'>
            {section.subtitle}
          </p>
        )
        : null}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} class='text-base leading-relaxed text-neutral-700 dark:text-neutral-300'>
          {paragraph}
        </p>
      ))}
      {section.list?.items?.length
        ? (
          <div class='pt-2 text-base leading-relaxed text-neutral-700 dark:text-neutral-300'>
            {renderList(section.list.items, section.list.ordered)}
          </div>
        )
        : null}
      {section.footnote
        ? (
          <p class='text-sm text-neutral-500 dark:text-neutral-400'>
            {section.footnote}
          </p>
        )
        : null}
    </div>
  );
}

export function LegalDocument({ document }: LegalDocumentProps): JSX.Element {
  return (
    <div class='space-y-12'>
      <SectionSurface
        tone='default'
        class='bg-gradient-to-br from-[#f7f9ff] via-white to-[#f4efff] dark:from-[#080c1f] dark:via-[#0e1431] dark:to-[#060916]'
      >
        <div class='space-y-3 text-center'>
          <SectionHeader
            title={document.title}
            description={document.subtitle}
            align='center'
          />
          {(document.effectiveDate || document.lastUpdated)
            ? (
              <p class='text-sm text-neutral-600 dark:text-neutral-400'>
                {document.effectiveDate ? `Effective Date: ${document.effectiveDate}` : null}
                {document.effectiveDate && document.lastUpdated ? ' | ' : null}
                {document.lastUpdated ? `Last Updated: ${document.lastUpdated}` : null}
              </p>
            )
            : null}
        </div>
      </SectionSurface>

      {document.intro?.length
        ? (
          <SectionSurface
            tone='default'
            class='bg-gradient-to-br from-white via-[#f7f9ff] to-white dark:from-[#070b1f] dark:via-[#0c1230] dark:to-[#080b1d]'
          >
            <div class='space-y-4'>
              {document.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  class='text-base leading-relaxed text-neutral-700 dark:text-neutral-300'
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </SectionSurface>
        )
        : null}

      {document.sections.map((section, index) => (
        <LegalSection
          key={section.title ?? section.paragraphs?.[0] ?? `section-${index}`}
          section={section}
        />
      ))}
    </div>
  );
}


