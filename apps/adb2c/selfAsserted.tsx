import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

// deno-lint-ignore ban-types
type ADB2CSelfAssertedPageData = {};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  ADB2CSelfAssertedPageData
> = {
  GET(_req, ctx) {
    return ctx.Render({});
  },
};

export default function ADB2CSelfAsserted({}: PageProps<ADB2CSelfAssertedPageData>) {
  return <div id='api' role='main'></div>;
}
