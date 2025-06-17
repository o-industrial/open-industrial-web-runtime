import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import { AgreementManager } from '../../src/agreements/AgreementManager.ts';
import { AgreementData, AgreementList } from '@o-industrial/common/atomic/organisms';

export const IsIsland = true;

type AgreementsPageData = {
  agreements: AgreementData[];
  returnUrl?: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  AgreementsPageData
> = {
  GET: async (req, ctx) => {
    const manager = new AgreementManager(ctx.Runtime.IoC);

    const agreements = await manager.LoadAgreements();
    const userAccepted = await manager.LoadUserAccepted(ctx.State.Username!);

    const agreementsToAccept = agreements.filter((agreement) => {
      const acceptedVersion = userAccepted[agreement.key];
      return !acceptedVersion || acceptedVersion < agreement.version;
    });

    const url = new URL(req.url);
    const returnUrl = url.searchParams.get('returnUrl') || '/workspace';

    return ctx.Render({ agreements: agreementsToAccept, returnUrl });
  },

  POST: async (req, ctx) => {
    const manager = new AgreementManager(ctx.Runtime.IoC);

    const body = await req.json();
    const agreedKeys: string[] = body.agreedKeys;

    if (!Array.isArray(agreedKeys) || agreedKeys.length === 0) {
      return Response.json({
        success: false,
        error: 'Invalid or missing agreement keys.',
      });
    }

    await manager.SaveUserAccepted(ctx.State.Username!, agreedKeys);

    return Response.json({ success: true });
  },
};

export default function AgreementsPage({
  Data,
}: PageProps<AgreementsPageData>) {
  async function handleAllAccepted() {
    try {
      const res = await fetch('/workspace/agreements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agreedKeys: Data.agreements.map((a) => a.key),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Unknown error accepting agreements.');
      }

      location.href = Data.returnUrl || '/workspace';
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <>
      <div class='py-16 px-4 bg-neutral-500/75'>
        <div class='mx-auto block w-[350px] text-center'>
          <h1 class='text-4xl font-bold mb-4'>Review and Accept</h1>

          <p class='text-sm text-neutral-200'>
            Please review and accept our agreements before continuing.
          </p>
        </div>
      </div>

      <div class='p-8'>
        <AgreementList
          agreements={Data.agreements}
          onAllAccepted={handleAllAccepted}
        />
      </div>
    </>
  );
}
