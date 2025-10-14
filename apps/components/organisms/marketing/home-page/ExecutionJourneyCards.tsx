import { IntentTypes } from '@o-industrial/common/types';
import { ExecutionJourneyCard, ExecutionJourneysSection } from '@o-industrial/atomic/organisms';

const journeys: ExecutionJourneyCard[] = [
  {
    icon: '🧬',
    iconLabel: 'Pharma factory',
    title: 'Pharma Factory',
    subtitle: 'Regulated logic with reflex-bound auditability.',
    href: '/journeys/pharma-factory',
  },
  {
    icon: '🥘',
    iconLabel: 'Food processing',
    title: 'Food Processing',
    subtitle: 'Batch traceability and recipe-based runtime control.',
    href: '/journeys/food-processing',
  },
  {
    icon: '🏢',
    iconLabel: 'Smart building',
    title: 'Smart Building',
    subtitle: 'Drift detection across floors, zones, and time.',
    href: '/journeys/smart-building',
  },
];

export default function ExecutionJourneyCards() {
  return (
    <ExecutionJourneysSection
      header={{
        title: 'Start From a Real System',
        description:
          'Each Execution Journey is a live, forkable runtime. Choose your domain. Deploy the memory. Evolve the logic.',
        align: 'center',
      }}
      journeys={journeys}
      calloutIntent={IntentTypes.Secondary}
    />
  );
}
