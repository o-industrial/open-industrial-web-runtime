import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EaCLicenseAsCode, EverythingAsCodeLicensing } from '@fathym/eac-licensing';
import { AdminNav } from '@o-industrial/common/atomic/molecules';
import { AdminDashboardTemplate } from '@o-industrial/common/atomic/templates';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type LicensesPageData = {
  Licenses: Record<string, EaCLicenseAsCode>;
  Username: string;
};

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, LicensesPageData> = {
  GET: (_req, ctx) => {
    const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;

    return ctx.Render({
      Licenses: eac.Licenses || {},
      Username: ctx.State.Username,
    });
  },
};

export default function LicensesPage(
  { Data: { Licenses, Username } }: PageProps<LicensesPageData>,
) {
  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/enterprises', label: 'Enterprises' },
    { href: '/admin/access-rights', label: 'Access Rights' },
    { href: '/admin/access-cards', label: 'Access Cards' },
    { href: '/admin/licenses', label: 'Licenses' },
    { href: '/admin/users', label: 'Users' },
  ];

  return (
    <AdminDashboardTemplate
      appBar={
        <div class='-:-:flex -:-:items-center -:-:justify-between -:-:px-4 -:-:py-2 -:-:border-b -:-:border-slate-700'>
          <h1 class='-:-:text-xl -:-:font-semibold text-white'>Licenses</h1>
          {Username && <span class='-:-:text-sm -:-:text-slate-400'>· {Username}</span>}
        </div>
      }
      nav={<AdminNav items={navItems} />}
    >
      <div class='-:-:p-4 -:-:space-y-4'>
        <a class='-:-:text-blue-400 -:-:underline' href='/admin/licenses/new'>Create License</a>
        <ul class='-:-:space-y-2'>
          {Object.entries(Licenses).map(([lookup, lic]) => (
            <li key={lookup}>
              <a class='-:-:text-blue-500 hover:-:-:underline' href={`/admin/licenses/${lookup}`}>
                {lic.Details?.Name || lookup}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </AdminDashboardTemplate>
  );
}
