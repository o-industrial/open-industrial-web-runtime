import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/atomic/organisms';

import { deviceIntegrationHowHelpItems } from '../../../../../../../src/marketing/solutions/device-integration.ts';

export default function DeviceIntegrationValueSection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'How We Help',
        title: 'Connect, Govern, and Scale Device Data',
        description:
          'Onboard faster with schema validation, context graph enrichment, and token-scoped access baked into every stream.',
        align: 'center',
      }}
      items={deviceIntegrationHowHelpItems}
      columns={2}
      variant='dark'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#071528] via-[#0b2038] to-[#040a18] py-24 shadow-[0_120px_280px_-170px_rgba(37,99,235,0.55)]'
    />
  );
}

