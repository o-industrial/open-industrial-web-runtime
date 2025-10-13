import { IntentTypes } from '@o-industrial/common/types';
import { FinalCtaSection as AtomicFinalCtaSection } from '@o-industrial/atomic/organisms';

export default function FinalCTASection() {
  return (
    <AtomicFinalCtaSection
      header={{
        title: 'Ready to Run Without the UI?',
        description:
          'Everything you have seen can run in CLI, GitOps, or at the edge. Your runtime is yours and it does not wait for a login.',
        align: 'center',
      }}
      primaryAction={{
        label: 'Fork the Demo Runtime',
        href: '/demo',
        intentType: IntentTypes.Primary,
      }}
      secondaryAction={{
        label: 'Deploy Without the UI',
        href: '/docs/deploy-cli',
        intentType: IntentTypes.None,
      }}
      calloutIntent={IntentTypes.Tertiary}
    />
  );
}
