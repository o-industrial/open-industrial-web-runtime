import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EaCLicenseAsCode, EverythingAsCodeLicensing } from '@fathym/eac-licensing';
import { useMemo, useState } from 'preact/hooks';
import { JSX } from 'preact';
import { Action, ActionStyleTypes, Input } from '@o-industrial/common/atomic/atoms';
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
  const [showCreate, setShowCreate] = useState(false);
  const [licLookup, setLicLookup] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const licenseJson = useMemo(() => {
    const lic: EaCLicenseAsCode = {
      Details: {
        Name: name,
        Description: description,
        Enabled: false,
        PublishableKey: '',
        SecretKey: '',
        WebhookSecret: '',
      } as any,
      Plans: {},
    };

    return JSON.stringify(lic);
  }, [name, description]);

  return (
    <div class='-:-:p-6 -:-:space-y-6'>
      <div class='-:-:flex -:-:items-center -:-:justify-between'>
        <h1 class='-:-:text-2xl -:-:font-semibold -:-:text-neutral-100'>Licenses</h1>
        {Username && <span class='-:-:text-sm -:-:text-neutral-400'>👤 {Username}</span>}
      </div>

      <div class='-:-:flex -:-:items-center -:-:justify-between'>
        <p class='-:-:text-sm -:-:text-neutral-300'>Manage product licenses, plans, and pricing.</p>
        <Action
          onClick={() => setShowCreate((s) => !s)}
          intentType={1}
          styleType={ActionStyleTypes.Solid | ActionStyleTypes.Rounded}
        >
          {showCreate ? 'Close' : 'New License'}
        </Action>
      </div>

      {showCreate && (
        <div class='-:-:rounded-xl -:-:border -:-:border-neutral-700 -:-:bg-neutral-900/60 -:-:p-4 -:-:space-y-4 -:-:shadow-neon'>
          <h2 class='-:-:text-lg -:-:font-semibold -:-:text-neutral-100'>Create License</h2>
          <form
            method='POST'
            action='/admin/licenses/api/commit'
            class='-:-:grid -:-:grid-cols-1 md:-:-:grid-cols-2 -:-:gap-4'
          >
            <div>
              <Input
                label='License Lookup'
                name='licLookup'
                placeholder='unique-license-key'
                value={licLookup}
                onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                  setLicLookup(e.currentTarget.value)}
              />
            </div>
            <div>
              <Input
                label='Display Name'
                name='Name'
                placeholder='Product License Name'
                value={name}
                onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                  setName(e.currentTarget.value)}
              />
            </div>
            <div class='md:-:-:col-span-2'>
              <Input
                label='Description'
                name='Description'
                placeholder='Short description for this license'
                multiline
                rows={3}
                value={description}
                onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
                  setDescription(e.currentTarget.value)}
              />
            </div>

            {/* Keep JSON license field in sync for API */}
            <input type='hidden' name='license' value={licenseJson} />

            <div class='md:-:-:col-span-2 -:-:flex -:-:justify-end -:-:gap-2'>
              <Action type='submit'>Create</Action>
              <Action
                type='button'
                intentType={2}
                styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </Action>
            </div>
          </form>
        </div>
      )}

      <div class='-:-:grid -:-:grid-cols-1 sm:-:-:grid-cols-2 lg:-:-:grid-cols-3 -:-:gap-4'>
        {Object.entries(Licenses).map(([lookup, lic]) => (
          <div
            key={lookup}
            class='-:-:rounded-xl -:-:border -:-:border-neutral-800 -:-:bg-neutral-900/50 -:-:p-4 -:-:space-y-3 -:-:hover:-:-:border-neon-blue-500 -:-:transition-default'
          >
            <div class='-:-:flex -:-:items-start -:-:justify-between'>
              <div>
                <h3 class='-:-:text-base -:-:font-semibold -:-:text-neutral-100'>
                  {lic.Details?.Name || lookup}
                </h3>
                <p class='-:-:text-xs -:-:text-neutral-400'>Lookup: {lookup}</p>
              </div>
              <Action
                href={`/admin/licenses/${lookup}`}
                styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
              >
                Manage
              </Action>
            </div>
            {lic.Details?.Description && (
              <p class='-:-:text-sm -:-:text-neutral-300'>{lic.Details.Description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
