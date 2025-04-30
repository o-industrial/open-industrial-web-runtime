/**
 * RuntimeWorkspaceDashboardTemplate
 *
 * Layout template for the main runtime workspace dashboard.
 *
 * Structure:
 * - Left: Impulse Stream Viewer
 * - Center: Workspace Panel (internal bank + canvas)
 * - Right: Proposal/Inspector Panel (full-height)
 * - Footer: Execution Loop Timeline (beneath Stream + Workspace only)
 */
export default function RuntimeWorkspaceDashboardTemplate({
  stream,
  proposal,
  timeline,
  children,
}: {
  stream?: preact.ComponentChildren;
  proposal?: preact.ComponentChildren;
  timeline?: preact.ComponentChildren;
  children?: preact.ComponentChildren;
}) {
  return (
    <div class="flex h-full bg-neutral-950 text-neutral-100">
      {/* Left + Center grouped in a vertical stack with footer */}
      <div class="flex flex-col flex-grow max-w-[calc(100%-320px)] h-full">
        {/* Top grid: Left (stream) + Center (workspace) */}
        <div class="flex flex-grow overflow-hidden">
          {/* Impulse Stream Column */}
          <aside class="w-[320px] bg-neutral-900 border-r border-neutral-800 p-4 overflow-y-auto flex flex-col">
            {stream}
          </aside>

          {/* Workspace Panel */}
          <main class="flex-grow h-full min-h-0 overflow-hidden flex flex-col">
            {children}
          </main>
        </div>

        {/* Timeline Footer (only spans stream + workspace) */}
        <footer class="h-12 bg-neutral-800 border-t border-neutral-700 flex items-center justify-center overflow-x-auto overflow-y-hidden px-4">
          {timeline}
        </footer>
      </div>

      {/* Proposal / Inspector Panel (full height, right side) */}
      <aside class="w-[320px] bg-neutral-900 border-l border-neutral-800 p-4 overflow-y-auto flex flex-col">
        {proposal}
      </aside>
    </div>
  );
}
