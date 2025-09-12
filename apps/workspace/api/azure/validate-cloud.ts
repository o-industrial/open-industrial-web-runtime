import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';
import { loadAzureCloudCredentials } from '@fathym/eac-azure/utils';

// Validates the saved cloud credentials by requesting an Azure auth token
// via the EaC Azure API for the given cloud lookup (defaults to "Workspace").
export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  GET: async (req, ctx) => {
    const url = new URL(req.url);
    const cloudLookup = url.searchParams.get('cloud') || 'Workspace';

    try {
      // Build credentials locally from the workspace EaC
      const eac = ctx.State.Workspace;
      const cloud = (eac?.Clouds || {})[cloudLookup];
      if (!cloud?.Details) throw new Error('Workspace cloud not configured');
      // Intentionally use details to avoid any transient user OAuth token
      const creds = await loadAzureCloudCredentials(cloud);
      const token = await creds.getToken(['https://management.azure.com/.default']);
      const valid = !!token?.token && token.token.length > 0;

      return Response.json({ valid });
    } catch (err) {
      return Response.json(
        { valid: false, message: (err as Error)?.message ?? 'Validation failed' },
        { status: 200 },
      );
    }
  },
};

export default handler;
