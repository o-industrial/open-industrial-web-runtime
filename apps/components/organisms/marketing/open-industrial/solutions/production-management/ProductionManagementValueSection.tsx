import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/atomic/organisms';

import { productionManagementHowHelpItems } from '../../../../../../../src/marketing/solutions/production-management.ts';

export default function ProductionManagementValueSection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'How We Help',
        title: 'Governed KPIs for Every Line and Shift',
        description:
          'Deliver shared OEE, downtime reason trees, and genealogy snapshots so operations and quality act on the same truth.',
        align: 'center',
      }}
      items={productionManagementHowHelpItems}
      columns={2}
      variant='dark'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#140820] via-[#1c0f33] to-[#090516] py-24 shadow-[0_120px_280px_-170px_rgba(168,85,247,0.55)]'
    />
  );
}

