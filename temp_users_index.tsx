import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

type UsersPageData = {
  Users: { Username?: string; EnterpriseName?: string }[];
  Query: string;
  Invited?: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  UsersPageData
> = {
  GET: async (req, ctx) => {
    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').trim();
    const users = await ctx.State.OIClient.Admin.ListUsers(q || undefined);
    const invited = url.searchParams.get('invited') || undefined;
    return ctx.Render({ Users: users, Query: q, Invited: invited || undefined });
  },
  async POST(req, ctx) {
    const url = new URL(req.url);

    try {
      const ct = req.headers.get('content-type') || '';
      let payload: Record<string, string> = {};
      if (ct.includes('application/json')) {
        payload = (await req.json()) as Record<string, string>;
      } else {
        const fd = await req.formData();
        fd.forEach((v, k) => (payload[k] = String(v)));
      }

      const email = (payload['Email'] || payload['Username'] || '').trim();

      if (!email) {
        return new Response('Email is required', { status: 400 });
      }

      await ctx.State.OIClient.Admin.InviteUser(email);

      const redirect = new URL(ctx.Runtime.URLMatch.FromOrigin('/admin/users'));
      redirect.searchParams.set('invited', email);
      return Response.redirect(redirect, 303);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return new Response(msg, { status: 500 });
    }
  },
};

export default function AdminUsersPage({
  Data: { Users, Query, Invited },
}: PageProps<UsersPageData>) {
  return (
    <div class="-:-:p-4 -:-:space-y-4">
      <h1 class="-:-:text-xl -:-:font-semibold text-white">Users</h1>
      {Invited && (
        <div class="-:-:rounded-md -:-:border -:-:border-green-700 -:-:bg-green-950/70 -:-:text-green-200 -:-:px-3 -:-:py-2">
          Invited {Invited} to admin.
        </div>
      )}
      <form
        method="POST"
        action="/admin/users"
        data-eac-bypass-base
        class="-:-:rounded-xl -:-:border -:-:border-neutral-800 -:-:bg-neutral-900/50 -:-:p-3 -:-:space-y-3"
      >
        <div class="-:-:grid -:-:grid-cols-1 -:-:gap-3">
          <div>
            <label class="-:-:block -:-:text-sm -:-:text-neutral-300">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="user@example.com"
              required
              class="-:-:mt-1 -:-:w-full -:-:rounded-md -:-:border -:-:border-neutral-700 -:-:bg-neutral-900 -:-:p-2 -:-:text-neutral-100"
            />
          </div>
        </div>
        <div class="-:-:flex -:-:justify-end">
          <button
            type="submit"
            class="-:-:rounded-md -:-:bg-neon-blue-600 -:-:text-white -:-:px-3 -:-:py-2"
          >
            Invite Admin
          </button>
        </div>
      </form>
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
                  {u.Username || 'â€”'}
                </td>
                <td class="-:-:p-3 -:-:text-neutral-300">
                  {u.EnterpriseName || 'â€”'}
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

