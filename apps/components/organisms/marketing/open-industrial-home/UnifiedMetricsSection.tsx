import { JSX } from 'preact';
import { useCallback } from 'preact/hooks';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { MetricCard, SectionHeader } from '@o-industrial/common/atomic/molecules';
import { IntentTypes } from '@o-industrial/common/types';

import { UnifiedMetricsBackdrop } from '../shared/backgrounds.tsx';
import { marketingSectionContent } from '../shared/layout.ts';
import { trackMetricsView } from '../../../../../src/marketing/analytics.ts';
import type { MetricIntent } from '../../../../../src/marketing/content.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

const loggedMetrics = new Set<string>();

function resolveMetricIntent(intent: MetricIntent | undefined): IntentTypes {
  switch (intent) {
    case 'secondary':
      return IntentTypes.Secondary;
    case 'tertiary':
      return IntentTypes.Tertiary;
    case 'info':
      return IntentTypes.Info;
    case 'warning':
      return IntentTypes.Warning;
    case 'error':
      return IntentTypes.Error;
    case 'none':
      return IntentTypes.None;
    case 'primary':
    default:
      return IntentTypes.Primary;
  }
}

export default function UnifiedMetricsSection(): JSX.Element {
  const header = homeContent.sections.unifiedMetrics;
  const metrics = homeContent.metrics;

  const handleMetricView = useCallback((label: string, value: string) => {
    const key = `${label}-${value}`;
    if (loggedMetrics.has(key)) {
      return;
    }

    loggedMetrics.add(key);
    trackMetricsView(label, value);
  }, []);

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass={marketingSectionContent({
        width: 'wide',
        padding: 'md',
        center: true,
        extra: 'flex flex-col items-center gap-12',
      })}
      class='relative overflow-hidden border-y border-white/10 py-24 text-center text-white'
    >
      <UnifiedMetricsBackdrop />
      <SectionHeader
        eyebrow={header.eyebrow}
        align={header.align ?? 'center'}
        class='relative mx-auto max-w-3xl text-center'
        title={
          <span class='block text-balance leading-tight'>
            {header.strapline
              ? (
                <span class='block text-sm font-semibold uppercase tracking-[0.34em] text-white/55'>
                  {header.strapline}
                </span>
              )
              : null}
            {header.titleLines.map((line, index) => (
              <span
                key={'unified-metrics-title-' + index + '-' + line.text}
                class={(index === 0
                  ? 'mt-4 block text-3xl font-semibold sm:text-[2.6rem] '
                  : 'mt-2 inline-block ') +
                  (line.highlight
                    ? 'bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-neon-green-400 bg-clip-text text-base font-medium text-transparent'
                    : 'text-white')}
              >
                {line.text}
              </span>
            ))}
          </span>
        }
        description={header.description
          ? (
            <span class='mt-6 block text-base text-white/70'>
              {header.description}
            </span>
          )
          : undefined}
      />
      <div class='grid w-full gap-6 md:grid-cols-3'>
        {metrics.map((metric) => {
          const intent = resolveMetricIntent(metric.intent);

          return (
            <div
              key={metric.label}
              class='group relative flex h-full flex-col items-center gap-3'
              onMouseEnter={() => handleMetricView(metric.label, metric.value)}
              onFocus={() => handleMetricView(metric.label, metric.value)}
            >
              <MetricCard
                label={metric.label}
                value={metric.value}
                intent={intent}
                values={metric.trend}
                class='w-full text-left sm:text-center'
              />
              {metric.description
                ? (
                  <p class='text-sm text-white/70 sm:text-center'>
                    {metric.description}
                  </p>
                )
                : null}
            </div>
          );
        })}
      </div>
    </SectionSurface>
  );
}
