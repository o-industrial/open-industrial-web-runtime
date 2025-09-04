import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import { loadJwtConfig } from '@fathym/common';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { OpenIndustrialJWTPayload } from '@o-industrial/common/types';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

export default [
  buildOpenIndustrialAdminMiddleware(),
] as EaCRuntimeHandler<OpenIndustrialWebState>[];

export function buildOpenIndustrialAdminMiddleware(): EaCRuntimeHandler<OpenIndustrialWebState> {
  return async (_req, ctx) => {
    try {
      const username = ctx.State.Username!;

      const oiApiRoot = Deno.env.get('OPEN_INDUSTRIAL_API_ROOT');
      if (!oiApiRoot) return ctx.Next();

      const apiBaseUrl = new URL(oiApiRoot);

      const workspaceLookup = ctx.Runtime.EaC?.EnterpriseLookup || '';

      const token = await loadJwtConfig().Create({
        Username: username,
        WorkspaceLookup: workspaceLookup as string,
      } as OpenIndustrialJWTPayload);

      ctx.State.OIJWT = token;
      ctx.State.OIClient = new OpenIndustrialAPIClient(apiBaseUrl, token);
    } catch (err) {
      console.error('Failed to initialize OpenIndustrial admin client:', err);
    }

    return ctx.Next();
  };
}
