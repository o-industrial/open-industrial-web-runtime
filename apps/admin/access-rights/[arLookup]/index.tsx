// deno-lint-ignore-file no-explicit-any
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EaCAccessRightAsCode } from '@fathym/eac-identity';
import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import {
  Action,
  ActionStyleTypes,
  CheckboxRow,
  Input,
} from '@o-industrial/common/atomic/atoms';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';
import { merge } from '@fathym/common';

// Types now provided by @fathym/eac-identity

type AccessRightPageData = {
  AccessRight?: EaCAccessRightAsCode;
  ArLookup: string;
  Username: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  AccessRightPageData
> = {
  GET: (_req, ctx) => {
    const { arLookup } = ctx.Params as { arLookup: string };
    const eac = ctx.Runtime.EaC as any;
    const ar = eac?.AccessRights?.[arLookup] as
      | EaCAccessRightAsCode
      | undefined;

    return ctx.Render({
      AccessRight: ar,
      ArLookup: arLookup,
      Username: ctx.State.Username,
    });
  },
  async POST(req, ctx) {
    const { arLookup } = ctx.Params as { arLookup: string };

    try {
      let payload: Record<string, string> = {};

      const ct = req.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        payload = (await req.json()) as Record<string, string>;
      } else {
        const fd = await req.formData();
        fd.forEach((v, k) => (payload[k] = String(v)));
      }

      const eac = ctx.Runtime.EaC as any;
      const current = (eac?.AccessRights?.[arLookup] ||
        {}) as EaCAccessRightAsCode;

      const updateBody: Partial<EaCAccessRightAsCode> = {
        Details: {
          Name: payload['Name']?.trim() || undefined,
          Description: payload['Description']?.trim() || undefined,
          Tags: (payload['Tags'] || '')
            .split(',')
            .map((t) => t.trim())
            .filter((t) => !!t),
          Enabled:
            (payload['Enabled'] ??
              String((current?.Details as any)?.Enabled ?? false)) === 'true',
        } as any,
      };

      const commit = {
        AccessRights: {
          [arLookup]: merge(current ?? {}, updateBody ?? {}),
        },
      } as any;

      await ctx.State.OIClient.Admin.CommitEaC(commit);

      return Response.redirect(
        ctx.Runtime.URLMatch.FromOrigin(`/admin/access-rights/${arLookup}`),
        303
      );
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
};

export default function AccessRightPage({
  Data: { AccessRight, ArLookup, Username },
}: PageProps<AccessRightPageData>) {
  const [name, setName] = useState(AccessRight?.Details?.Name ?? '');
  const [description, setDescription] = useState(
    AccessRight?.Details?.Description ?? ''
  );
  const [tags, setTags] = useState(
    (AccessRight?.Details?.Tags ?? []).join(', ')
  );
  const [enabled, setEnabled] = useState(!!AccessRight?.Details?.Enabled);

  // local state only; POST handler parses form fields on submit

  return (
    <div class="-:-:p-6 -:-:space-y-6">
      <div class="-:-:flex -:-:items-center -:-:justify-between">
        <h1 class="-:-:text-2xl -:-:font-semibold -:-:text-neutral-100">
          Access Right
        </h1>
        {Username && (
          <span class="-:-:text-sm -:-:text-neutral-400">{Username}</span>
        )}
      </div>

      <div class="-:-:rounded-xl -:-:border -:-:border-neutral-700 -:-:bg-neutral-900/60 -:-:p-4 -:-:space-y-4 -:-:shadow-neon">
        <div class="-:-:flex -:-:items-start -:-:justify-between">
          <div>
            <h3 class="-:-:text-base -:-:font-semibold -:-:text-neutral-100">
              {AccessRight?.Details?.Name || ArLookup}
            </h3>
            <p class="-:-:text-xs -:-:text-neutral-400">Lookup: {ArLookup}</p>
          </div>
          <Action
            href="/admin/access-rights"
            data-eac-bypass-base
            styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
          >
            Back
          </Action>
        </div>

        <form
          method="POST"
          action={`/admin/access-rights/${ArLookup}`}
          data-eac-bypass-base
          class="-:-:grid -:-:grid-cols-1 md:-:-:grid-cols-2 -:-:gap-4"
        >
          <input type="hidden" name="Enabled" value={String(enabled)} />
          <div class="md:-:-:col-span-2">
            <CheckboxRow
              label="Enabled"
              checked={enabled}
              onToggle={((next: boolean) => setEnabled(next)) as any}
            />
          </div>

          <div>
            <Input
              label="Display Name"
              name="Name"
              placeholder="Access Right Name"
              value={name}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                setName(e.currentTarget.value)
              }
            />
          </div>

          <div class="md:-:-:col-span-2">
            <Input
              label="Description"
              name="Description"
              placeholder="Short description"
              multiline
              rows={3}
              value={description}
              onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
                setDescription(e.currentTarget.value)
              }
            />
          </div>

          <div class="md:-:-:col-span-2">
            <Input
              label="Tags (comma-separated)"
              name="Tags"
              placeholder="e.g. admin, billing, read-only"
              value={tags}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                setTags(e.currentTarget.value)
              }
            />
          </div>

          <div class="md:-:-:col-span-2 -:-:flex -:-:justify-end -:-:gap-2">
            <Action type="submit">Save</Action>
            <Action
              href="/admin/access-rights"
              data-eac-bypass-base
              intentType={2}
              styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
            >
              Cancel
            </Action>
          </div>
        </form>
      </div>
    </div>
  );
}
