import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import { loadJwtConfig, redirectRequest } from '@fathym/common';
import { AgreementManager } from '../../src/agreements/AgreementManager.ts';
import { agreementsBlockerMiddleware } from '../../src/agreements/agreementsBlockerMiddleware.ts';

export default [
  agreementsBlockerMiddleware,
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
] as EaCRuntimeHandler<OpenIndustrialWebState>[];
