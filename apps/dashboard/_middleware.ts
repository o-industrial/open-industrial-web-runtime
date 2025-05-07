import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import { loadJwtConfig, redirectRequest } from '@fathym/common';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import { AgreementManager } from '../../src/agreements/AgreementManager.ts';
import { agreementsBlockerMiddleware } from '../../src/agreements/agreementsBlockerMiddleware.ts';
import { OpenIndustrialEaC } from '../../src/types/OpenIndustrialEaC.ts';
import { loadEaCActuators } from '../../configs/eac-actuators.config.ts';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { OpenIndustrialJWTPayload } from '@o-industrial/common/types';

export default [
  agreementsBlockerMiddleware,
  buildOpenIndustrialRuntimeMiddleware('oi'),
  buildAgreementsRedirectMiddleware(),
] as EaCRuntimeHandler<OpenIndustrialWebState>[];

/**
 * Sets up OI API client, loads or creates workspace,
 * and commits runtime state into `OpenIndustrialWebState`.
 */
export function buildOpenIndustrialRuntimeMiddleware(
  kvLookup: string = 'eac',
): EaCRuntimeHandler<OpenIndustrialWebState> {
  return async (_req, ctx) => {
    const username = ctx.State.Username!;
    const kv = await ctx.Runtime.IoC.Resolve(Deno.Kv, kvLookup);
    ctx.State.OIKV = kv;

    const oiApiRoot = Deno.env.get('OPEN_INDUSTRIAL_API_ROOT')!;
    const apiBaseUrl = new URL(oiApiRoot);

    let lookup: string | undefined;

    const current = await kv.get<string>([
      'User',
      username,
      'Current',
      'EnterpriseLookup',
    ]);

    lookup = current.value ?? undefined;

    ctx.State.OIJWT = await loadJwtConfig().Create({
      Username: username,
      WorkspaceLookup: lookup,
    } as OpenIndustrialJWTPayload);

    ctx.State.OIClient = new OpenIndustrialAPIClient(
      apiBaseUrl,
      ctx.State.OIJWT,
    );

    const userWorkspaces = await ctx.State.OIClient.Workspaces.ListForUser();

    ctx.State.UserWorkspaces = userWorkspaces;

    // 🔁 If no current workspace saved, ask the API
    if (!lookup) {
      lookup = ctx.State.UserWorkspaces[0]?.EnterpriseLookup;

      if (lookup) {
        await kv.set(['User', username, 'Current', 'EnterpriseLookup'], lookup);

        ctx.State.OIJWT = await loadJwtConfig().Create({
          Username: username,
          WorkspaceLookup: lookup,
        } as OpenIndustrialJWTPayload);

        ctx.State.OIClient = new OpenIndustrialAPIClient(
          apiBaseUrl,
          ctx.State.OIJWT,
        );
      }
    }

    // 🚫 Still no workspace? Create one
    if (!lookup) {
      const newWorkspace: OpenIndustrialEaC = {
        Details: {
          Name: 'hello-azi',
          Description: 'Getting started with Open Industrial and Azi.',
        },
        Actuators: loadEaCActuators(),
      };

      const createResp = await ctx.State.OIClient.Workspaces.Create(
        newWorkspace,
      );

      lookup = createResp.EnterpriseLookup;

      await kv.set(['User', username, 'Current', 'EnterpriseLookup'], lookup);

      ctx.State.OIJWT = await loadJwtConfig().Create({
        Username: username,
        WorkspaceLookup: lookup,
      } as OpenIndustrialJWTPayload);

      ctx.State.OIClient = new OpenIndustrialAPIClient(
        apiBaseUrl,
        ctx.State.OIJWT,
      );
    }

    // ✅ Load full workspace state via API
    ctx.State.Workspace = await ctx.State.OIClient.Workspaces.Get();

    ctx.State.WorkspaceLookup = lookup!;

    return ctx.Next();
  };
}

export function buildAgreementsRedirectMiddleware(): EaCRuntimeHandler<OpenIndustrialWebState> {
  return async (req, ctx) => {
    const token = await loadJwtConfig().Create({
      WorkspaceLookup: ctx.State.WorkspaceLookup,
      Username: ctx.State.Username,
    });

    ctx.State.OIJWT = token;

    const manager = new AgreementManager(ctx.Runtime.IoC);
    const agreements = await manager.LoadAgreements();
    const accepted = await manager.LoadUserAccepted(ctx.State.Username!);

    if (manager.AgreementsOutOfDate(agreements, accepted)) {
      const url = new URL(req.url);
      if (!url.pathname.startsWith('/dashboard/agreements')) {
        const returnUrl = encodeURIComponent(url.pathname + url.search);
        return redirectRequest(
          `/dashboard/agreements?returnUrl=${returnUrl}`,
          false,
          false,
          req,
        );
      }
    }

    return ctx.Next();
  };
}
