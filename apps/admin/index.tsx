// import { useEffect, useMemo, useState } from 'preact/hooks';
// import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
// import { PageProps } from '@fathym/eac-applications/preact';
// import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
// import { AdminManager } from '@o-industrial/common/flow';
// import { AdminNav } from '@o-industrial/common/atomic/molecules';
// import { AdminDashboardTemplate } from '@o-industrial/common/atomic/templates';
// import type { EverythingAsCode } from '@fathym/eac';
// import type { EverythingAsCodeLicensing, EaCUserLicense } from '@fathym/eac-licensing';
// import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

// export const IsIsland = true;

// type AdminPageData = {
//   ParentEaC: EverythingAsCode & EverythingAsCodeLicensing;
//   OIAPIRoot: string;
//   OIAPIToken: string;
//   OILicense?: EaCUserLicense;
//   Username: string;
// };

// export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, AdminPageData> = {
//   GET: (_req, ctx) => {
//     return ctx.Render({
//       ParentEaC: ctx.Runtime.EaC,
//       OIAPIRoot: '/api/',
//       OIAPIToken: ctx.State.OIJWT,
//       OILicense: ctx.State.UserLicenses?.['o-industrial'],
//       Username: ctx.State.Username,
//     });
//   },
// };

// export default function AdminPage({
//   Data: { OIAPIRoot, OIAPIToken, OILicense, Username },
// }: PageProps<AdminPageData>) {
//   const origin =
//     typeof location !== 'undefined' && location?.origin ? location.origin : 'https://server.com';
//   const root = `${origin}${OIAPIRoot}`;

//   // ⚠️ Fix: include deps to avoid stale token/root on hot nav or user switch
//   const oiSvc = useMemo(
//     () => new OpenIndustrialAPIClient(new URL(root), OIAPIToken),
//     [root, OIAPIToken],
//   );

//   const [adminMgr, setAdminMgr] = useState<AdminManager | null>(null);
//   const [summary, setSummary] = useState({ enterprises: 0, users: 0, egi: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setAdminMgr(new AdminManager(oiSvc, OILicense));
//   }, [oiSvc, OILicense]);

//   useEffect(() => {
//     (async () => {
//       if (!adminMgr) return;
//       try {
//         const dashboard = await adminMgr.getDashboardSummary();
//         setSummary(dashboard);
//       } catch (err) {
//         console.error('Failed to load admin dashboard', err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [adminMgr]);

//   const navItems = [
//     { href: '/admin', label: 'Dashboard' },
//     { href: '/admin/enterprises', label: 'Enterprises' },
//     { href: '/admin/users', label: 'Users' },
//     { href: '/admin/licenses', label: 'Licenses' },
//     { href: '/admin/access-rights', label: 'Access Rights' },
//     { href: '/admin/access-cards', label: 'Access Cards' },
//   ];

//   return (
//     <AdminDashboardTemplate
//       appBar={
//         <div class="-:-:sticky -:-:top-0 -:-:z-40 -:-:p-4 -:-:border-b -:-:border-slate-700 -:-:bg-slate-900/95 -:-:backdrop-blur -:-:text-lg -:-:font-semibold">
//           Admin Dashboard
//           <span class="-:-:ml-2 -:-:text-xs -:-:text-slate-400 -:-:font-normal">
//             {Username ? `· ${Username}` : ''}
//           </span>
//         </div>
//       }
//       nav={<AdminNav items={navItems} />}
//     >
//       <section class="-:-:grid -:-:grid-cols-1 sm:-:-:grid-cols-3 -:-:gap-4">
//         {[
//           { label: 'Active Enterprises', value: summary.enterprises },
//           { label: 'Active Users', value: summary.users },
//           { label: 'Enterprise Growth Index', value: summary.egi },
//         ].map((c) => (
//           <div
//             key={c.label}
//             class="-:-:p-4 -:-:bg-slate-800 -:-:rounded-lg -:-:border -:-:border-slate-700 -:-:shadow-sm"
//             role="status"
//             aria-live="polite"
//           >
//             <h3 class="-:-:text-slate-400 -:-:mb-2 -:-:text-sm">{c.label}</h3>
//             <p class="-:-:text-3xl -:-:tabular-nums">
//               {loading ? <span class="-:-:animate-pulse -:-:text-slate-500">…</span> : c.value}
//             </p>
//           </div>
//         ))}
//       </section>
//     </AdminDashboardTemplate>
//   );
// }
