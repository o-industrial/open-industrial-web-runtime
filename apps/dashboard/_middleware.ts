import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
// import { buildCurrentEaCMiddleware } from '@fathym/eac-applications/steward/api';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import { loadJwtConfig, redirectRequest } from '@fathym/common';
import { AgreementManager } from '../../src/agreements/AgreementManager.ts';
import { agreementsBlockerMiddleware } from '../../src/agreements/agreementsBlockerMiddleware.ts';
import {
  EaCStatusProcessingTypes,
  waitForStatusWithFreshJwt,
} from '@fathym/eac/steward/status';
import { OpenIndustrialEaC } from '../../src/types/OpenIndustrialEaC.ts';
import { loadEaCActuators } from '../../configs/eac-actuators.config.ts';
import { loadEaCStewardSvc } from '@fathym/eac/steward/clients';
import { EverythingAsCode } from '@fathym/eac';

export default [
  agreementsBlockerMiddleware,
  buildCurrentEaCMiddleware('oi'),
  async (req, ctx) => {
    ctx.State.OIJWT = await loadJwtConfig().Create({
      EnterpriseLookup: ctx.State.EnterpriseLookup,
      Username: ctx.State.Username,
    });

    const manager = new AgreementManager(ctx.Runtime.IoC);

    const agreements = await manager.LoadAgreements();
    const userAccepted = await manager.LoadUserAccepted(ctx.State.Username!);

    if (manager.AgreementsOutOfDate(agreements, userAccepted)) {
      const url = new URL(req.url);

      if (!url.pathname.startsWith('/dashboard/agreements')) {
        const returnUrl = encodeURIComponent(url.pathname + url.search);

        return redirectRequest(
          `/dashboard/agreements?returnUrl=${returnUrl}`,
          false,
          false,
          req
        );
      }
    }

    return ctx.Next();
  },
  async (req, ctx) => {
    if (!ctx.State.EaC) {
      const saveEaC: OpenIndustrialEaC = {
        Details: {
          Name: 'hello-azi',
          Description: 'Getting started with Open Industrial and Azi.',
        },
        Actuators: loadEaCActuators(),
      };

      const saveResp =
        await ctx.State.ParentSteward!.EaC.Create<OpenIndustrialEaC>(
          saveEaC,
          ctx.State.Username,
          60
        );

      const status = await waitForStatusWithFreshJwt(
        ctx.State.ParentSteward!,
        saveResp.EnterpriseLookup,
        saveResp.CommitID,
        ctx.State.Username
      );

      if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
        await ctx.State.EaCKV!.set(
          ['User', ctx.State.Username, 'Current', 'EnterpriseLookup'],
          saveResp.EnterpriseLookup
        );

        return Response.redirect(ctx.Runtime.URLMatch.Path);
      } else {
        // TODO(mcgear): What to do here?
        throw new Error('There was an issue create the workspace.');
      }
    }
  },
] as EaCRuntimeHandler<OpenIndustrialWebState>[];

export function buildCurrentEaCMiddleware(
  eacDBLookup: string = 'eac'
): EaCRuntimeHandler<OpenIndustrialWebState> {
  return async (_req, ctx) => {
    let eac: EverythingAsCode | undefined = undefined;

    ctx.State.ParentSteward = await loadEaCStewardSvc();

    const username = ctx.State.Username!;

    ctx.State.UserEaCs = await ctx.State.ParentSteward.EaC.ListForUser();

    ctx.State.EaCKV = await ctx.Runtime.IoC.Resolve(Deno.Kv, eacDBLookup);

    const currentEntLookup = await ctx.State.EaCKV.get<string>([
      'User',
      username,
      'Current',
      'EnterpriseLookup',
    ]);

    if (currentEntLookup.value) {
      const jwt = await ctx.State.ParentSteward.EaC.JWT(
        currentEntLookup.value,
        username
      );

      ctx.State.EaCJWT = jwt.Token;

      ctx.State.Steward = await loadEaCStewardSvc(ctx.State.EaCJWT);

      eac = await ctx.State.Steward.EaC.Get();
    }

    if (!eac) {
      if (ctx.State.UserEaCs[0]) {
        await ctx.State.EaCKV.set(
          ['User', username, 'Current', 'EnterpriseLookup'],
          ctx.State.UserEaCs[0].EnterpriseLookup
        );

        const jwt = await ctx.State.ParentSteward.EaC.JWT(
          ctx.State.UserEaCs[0].EnterpriseLookup,
          username
        );

        ctx.State.EaCJWT = jwt.Token;

        ctx.State.Steward = await loadEaCStewardSvc(ctx.State.EaCJWT);

        eac = await ctx.State.Steward.EaC.Get();
      }
    }

    ctx.State.EaC = eac;

    if (ctx.State.EaC && (!ctx.State.EaCJWT || !ctx.State.Steward)) {
      const jwt = await ctx.State.ParentSteward.EaC.JWT(
        ctx.State.EaC.EnterpriseLookup!,
        username
      );

      ctx.State.EaCJWT = jwt.Token;

      ctx.State.Steward = await loadEaCStewardSvc(ctx.State.EaCJWT);
    }

    return ctx.Next();
  };
}
