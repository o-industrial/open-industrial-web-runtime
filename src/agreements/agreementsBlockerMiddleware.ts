import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../state/OpenIndustrialWebState.ts';
import { redirectRequest } from '@fathym/common';
import { AgreementManager } from './AgreementManager.ts';

export const agreementsBlockerMiddleware: EaCRuntimeHandler<
  OpenIndustrialWebState
> = async (req, ctx) => {
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
};
