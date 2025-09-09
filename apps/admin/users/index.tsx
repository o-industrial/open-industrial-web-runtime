import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

type UsersPageData = {
  Users: { Username?: string; EnterpriseName?: string }[];
  Query: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  UsersPageData
> = {
  GET: async (req, ctx) => {
    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').trim();
    const users = await ctx.State.OIClient.Admin.ListUsers(q || undefined);
    return ctx.Render({ Users: users, Query: q });
  },
};

export default function AdminUsersPage({
  Data: { Users, Query },
}: PageProps<UsersPageData>) {
  return (
    <div class="-:-:p-4 -:-:space-y-4">
      <h1 class="-:-:text-xl -:-:font-semibold text-white">Users</h1>
      <form method="GET" class="-:-:flex -:-:gap-2 -:-:items-end">
        <div class="-:-:flex-1">
          <label class="-:-:block -:-:text-sm -:-:text-neutral-300">
            Search
          </label>
          <input
            type="text"
            name="q"
            value={Query}
            placeholder="Search users"
            class="-:-:mt-1 -:-:w-full -:-:rounded-md -:-:border -:-:border-neutral-700 -:-:bg-neutral-900 -:-:p-2 -:-:text-neutral-100"
          />
        </div>
        <button
          type="submit"
          class="-:-:rounded-md -:-:bg-neon-blue-600 -:-:text-white -:-:px-3 -:-:py-2"
        >
          Search
        </button>
      </form>

      <div class="-:-:rounded-xl -:-:border -:-:border-neutral-800 -:-:bg-neutral-900/50 -:-:overflow-hidden">
        <table class="-:-:w-full -:-:text-sm">
          <thead class="-:-:bg-neutral-900/70">
            <tr>
              <th class="-:-:text-left -:-:p-3 -:-:text-neutral-300">
                Username
              </th>
              <th class="-:-:text-left -:-:p-3 -:-:text-neutral-300">
                Workspace
              </th>
              <th class="-:-:p-3"></th>
            </tr>
          </thead>
          <tbody>
            {Users.map((u) => (
              <tr
                class="-:-:border-t -:-:border-neutral-800"
                key={`${u.Username}-${u.EnterpriseName}`}
              >
                <td class="-:-:p-3 -:-:text-neutral-100">
                  {u.Username || '—'}
                </td>
                <td class="-:-:p-3 -:-:text-neutral-300">
                  {u.EnterpriseName || '—'}
                </td>
                <td class="-:-:p-3 -:-:text-right">
                  {u.Username && (
                    <a
                      href={`/admin/users/${encodeURIComponent(u.Username)}`}
                      data-eac-bypass-base
                      class="-:-:text-neon-blue-400 hover:-:-:underline"
                    >
                      Manage
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
