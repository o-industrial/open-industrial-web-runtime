import { IntentTypes } from '@o-industrial/common/types';
import { NotADashboardSection as AtomicNotADashboardSection } from '@o-industrial/atomic/organisms';

const failureItems = [
  'ETL pipelines collapse on schema drift',
  'Alert fatigue from shallow thresholds',
  'LLMs guess but cannot trace structure',
];

const stabilityItems = [
  'Versioned schemas govern behavior',
  'Agents act only on structure match',
  'Execution persists even without insight tools',
];

export default function NotADashboardSection() {
  return (
    <AtomicNotADashboardSection
      header={{
        title: 'This Is Not a Dashboard. This Executes.',
        description: 'Dashboards show what already happened. This system acts when it should.',
        align: 'center',
      }}
      failureItems={failureItems}
      stabilityItems={stabilityItems}
      calloutIntent={IntentTypes.Tertiary}
    />
  );
}
