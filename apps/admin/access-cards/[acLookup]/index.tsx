// deno-lint-ignore-file no-explicit-any
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type {
  EaCAccessConfigurationAsCode,
  EverythingAsCodeIdentity,
} from '@fathym/eac-identity';
import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import {
  Action,
  ActionStyleTypes,
  CheckboxRow,
  Input,
} from '@o-industrial/common/atomic/atoms';
import { merge } from '@fathym/common';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

type AccessConfigurationPageData = {
  AccessConfiguration?: EaCAccessConfigurationAsCode;
  AcLookup: string;
  Username: string;
  ProviderOptions: Record<string, unknown>;
  AccessRightOptions: Record<string, unknown>;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  AccessConfigurationPageData
> = {
  GET: (_req, ctx) => {
    const { acLookup } = ctx.Params as { acLookup: string };
    const eac = ctx.Runtime.EaC as EverythingAsCodeIdentity;
    const ac = eac?.AccessConfigurations?.[acLookup] as
      | EaCAccessConfigurationAsCode
      | undefined;
    const providerOptions = (eac?.Providers || {}) as Record<string, unknown>;
    const accessRightOptions = (eac?.AccessRights || {}) as Record<string, unknown>;

    return ctx.Render({
      AccessConfiguration: ac,
      AcLookup: acLookup,
      Username: ctx.State.Username,
      ProviderOptions: providerOptions,
      AccessRightOptions: accessRightOptions,
    });
  },
  async POST(req, ctx) {
    const { acLookup } = ctx.Params as { acLookup: string };

    try {
      let payload: Record<string, string> = {};

      const ct = req.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        payload = (await req.json()) as Record<string, string>;
      } else {
        const fd = await req.formData();
        fd.forEach((v, k) => (payload[k] = String(v)));
      }

      const eac = ctx.Runtime.EaC as EverythingAsCodeIdentity;
      const current = (eac?.AccessConfigurations?.[acLookup] || {}) as
        EaCAccessConfigurationAsCode;

      const providerLookups = (payload['Providers'] || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const accessRightLookups = (payload['AccessRights'] || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const updateBody: Partial<EaCAccessConfigurationAsCode> & any = {
        Details: {
          Name: payload['Name']?.trim() || undefined,
          Description: payload['Description']?.trim() || undefined,
        } as any,
        Providers: providerLookups,
        AccessRights: accessRightLookups,
      };

      const commit: EverythingAsCodeIdentity = {
        AccessConfigurations: {
          [acLookup]: merge(current ?? {}, updateBody ?? {}),
        },
      };

      await ctx.State.OIClient.Admin.CommitEaC(commit);

      return Response.redirect(
        ctx.Runtime.URLMatch.FromOrigin(`/admin/access-cards/${acLookup}`),
        303,
      );
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
};

export default function AccessConfigurationPage({
  Data: {
    AccessConfiguration,
    AcLookup,
    Username,
    ProviderOptions,
    AccessRightOptions,
  },
}: PageProps<AccessConfigurationPageData>) {
  const [name, setName] = useState(AccessConfiguration?.Details?.Name ?? '');
  const [description, setDescription] = useState(
    AccessConfiguration?.Details?.Description ?? '',
  );
  const [providerSelections, setProviderSelections] = useState<Set<string>>(
    new Set<string>((AccessConfiguration as any)?.Providers ?? []),
  );
  const [accessRightSelections, setAccessRightSelections] = useState<Set<string>>(
    new Set<string>((AccessConfiguration as any)?.AccessRights ?? []),
  );

  return (
    <div class="-:-:p-6 -:-:space-y-6">
      <div class="-:-:flex -:-:items-center -:-:justify-between">
        <h1 class="-:-:text-2xl -:-:font-semibold -:-:text-neutral-100">
          Access Configuration
        </h1>
        {Username && (
          <span class="-:-:text-sm -:-:text-neutral-400">{Username}</span>
        )}
      </div>

      <div class="-:-:rounded-xl -:-:border -:-:border-neutral-700 -:-:bg-neutral-900/60 -:-:p-4 -:-:space-y-4 -:-:shadow-neon">
        <div class="-:-:flex -:-:items-start -:-:justify-between">
          <div>
            <h3 class="-:-:text-base -:-:font-semibold -:-:text-neutral-100">
              {AccessConfiguration?.Details?.Name || AcLookup}
            </h3>
            <p class="-:-:text-xs -:-:text-neutral-400">Lookup: {AcLookup}</p>
          </div>
          <Action
            href="/admin/access-cards"
            data-eac-bypass-base
            styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
          >
            Back
          </Action>
        </div>

        <form
          method="POST"
          action={`/admin/access-cards/${AcLookup}`}
          data-eac-bypass-base
          class="-:-:grid -:-:grid-cols-1 md:-:-:grid-cols-2 -:-:gap-4"
        >
          <input
            type="hidden"
            name="Providers"
            value={[...providerSelections].join(',')}
          />
          <input
            type="hidden"
            name="AccessRights"
            value={[...accessRightSelections].join(',')}
          />
          <div>
            <Input
              label="Display Name"
              name="Name"
              placeholder="Access Configuration Name"
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

          <div class="md:-:-:col-span-2 -:-:space-y-2">
            <h4 class="-:-:text-sm -:-:font-semibold -:-:text-neutral-200">
              Providers
            </h4>
            <div class="-:-:grid -:-:grid-cols-1 sm:-:-:grid-cols-2 -:-:gap-2">
              {Object.keys(ProviderOptions || {}).map((pl) => {
                const checked = providerSelections.has(pl);
                return (
                  <CheckboxRow
                    key={pl}
                    label={pl}
                    checked={checked}
                    onToggle={(next: boolean) => {
                      const ns = new Set(providerSelections);
                      if (next) ns.add(pl);
                      else ns.delete(pl);
                      setProviderSelections(ns);
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div class="md:-:-:col-span-2 -:-:space-y-2">
            <h4 class="-:-:text-sm -:-:font-semibold -:-:text-neutral-200">
              Access Rights
            </h4>
            <div class="-:-:grid -:-:grid-cols-1 sm:-:-:grid-cols-2 -:-:gap-2">
              {Object.keys(AccessRightOptions || {}).map((arl) => {
                const checked = accessRightSelections.has(arl);
                return (
                  <CheckboxRow
                    key={arl}
                    label={arl}
                    checked={checked}
                    onToggle={(next: boolean) => {
                      const ns = new Set(accessRightSelections);
                      if (next) ns.add(arl);
                      else ns.delete(arl);
                      setAccessRightSelections(ns);
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div class="md:-:-:col-span-2 -:-:flex -:-:justify-end -:-:gap-2">
            <Action type="submit">Save</Action>
            <Action
              href="/admin/access-cards"
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
