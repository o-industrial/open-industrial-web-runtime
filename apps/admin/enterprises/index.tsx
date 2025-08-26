// deno-lint-ignore-file no-explicit-any
import { JSX } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { AdminNav } from '@o-industrial/common/atomic/molecules';
import { AdminDashboardTemplate } from '@o-industrial/common/atomic/templates';
import { SearchInput } from '@o-industrial/common/atomic/atoms';
import { EnterpriseList } from '@o-industrial/common/atomic/molecules';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

type EnterprisesPageData = {
  OIAPIRoot: string;
  OIAPIToken: string;
  Username: string;
};

export const IsIsland = true;

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  GET: (_req, ctx) => {
    return ctx.Render({
      OIAPIRoot: '/api/',
      OIAPIToken: ctx.State.OIJWT,
      Username: ctx.State.Username,
    });
  },
};

/**
 * Admin Enterprises page.  Displays a searchable list of enterprises.
 */
export default function EnterprisesPage({
  Data: { OIAPIRoot, OIAPIToken, Username },
}: PageProps<EnterprisesPageData>) {
  const origin = typeof location !== 'undefined' && location?.origin
    ? location.origin
    : 'https://server.com';
  const root = `${origin}${OIAPIRoot}`;

  // Instantiate the API client and admin manager
  const oiSvc = useMemo(
    () => new OpenIndustrialAPIClient(new URL(root), OIAPIToken),
    [root, OIAPIToken],
  );

  const [search, setSearch] = useState('');
  const [enterprises, setEnterprises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Reload enterprises whenever adminMgr or search changes
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const ents = await oiSvc.Admin.ListEnterprises(search);
        setEnterprises(ents);
      } catch (err) {
        console.error('Failed to load enterprises', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);

  // Define the admin nav items
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
          <h1 class='-:-:text-xl -:-:font-semibold text-white'>Enterprises</h1>
          {Username && <span class='-:-:text-sm -:-:text-slate-400'>· {Username}</span>}
        </div>
      }
      nav={<AdminNav items={navItems} />}
    >
      <div class='-:-:p-4 -:-:space-y-4'>
        <SearchInput
          value={search}
          onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
            setSearch((e.target as HTMLInputElement).value)}
          placeholder='Search enterprises…'
        />
        {loading
          ? <div class='-:-:text-slate-400'>Loading…</div>
          : <EnterpriseList enterprises={enterprises} />}
      </div>
    </AdminDashboardTemplate>
  );
}
