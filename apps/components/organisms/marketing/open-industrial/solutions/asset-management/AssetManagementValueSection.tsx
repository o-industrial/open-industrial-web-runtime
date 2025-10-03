import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/atomic/organisms';

import { assetManagementHowHelpItems } from '../../../../../../../../src/marketing/solutions/asset-management.ts';

export default function AssetManagementValueSection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'How We Help',
        title: 'Stay Ahead of Failure and Prove the Impact',
        description:
          'Contextualize every alert with maintenance history, calibration status, and the product risk it creates.',
        align: 'center',
      }}
      items={assetManagementHowHelpItems}
      columns={2}
      variant='dark'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#041912] via-[#072c1f] to-[#02100f] py-24 shadow-[0_120px_280px_-170px_rgba(16,185,129,0.55)]'
    />
  );
}
