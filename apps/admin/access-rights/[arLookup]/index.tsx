// deno-lint-ignore-file no-explicit-any
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EaCAccessRightAsCode } from '@fathym/eac-identity';
import { JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import {
  Action,
  ActionStyleTypes,
  CheckboxRow,
  Input,
} from '@o-industrial/common/atomic/atoms';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

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

  const updateJson = useMemo(() => {
    const update: Partial<EaCAccessRightAsCode> = {
      Details: {
        Name: name?.trim() || undefined,
        Description: description?.trim() || undefined,
        Tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => !!t),
        Enabled: enabled,
      },
    };

    return JSON.stringify(update);
  }, [name, description, tags, enabled]);

  return (
    <div class="-:-:p-6 -:-:space-y-6">
      <div class="-:-:flex -:-:items-center -:-:justify-between">
        <h1 class="-:-:text-2xl -:-:font-semibold -:-:text-neutral-100">
          Access Right
        </h1>
        {Username && (
          <span class="-:-:text-sm -:-:text-neutral-400">
            {Username}
          </span>
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
            styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
          >
            Back
          </Action>
        </div>

        <form
          method="POST"
          action={`/admin/access-rights/${ArLookup}/api/update`}
          class="-:-:grid -:-:grid-cols-1 md:-:-:grid-cols-2 -:-:gap-4"
        >
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

          <input type="hidden" name="update" value={updateJson} />

          <div class="md:-:-:col-span-2 -:-:flex -:-:justify-end -:-:gap-2">
            <Action type="submit">Save</Action>
            <Action
              href="/admin/access-rights"
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
