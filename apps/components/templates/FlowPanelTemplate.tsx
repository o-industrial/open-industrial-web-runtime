/**
 * FlowPanelTemplate
 *
 * Full-canvas layout with overlayed bank.
 * Ensures React Flow canvas receives input,
 * and overlay (bank) does not block interactivity.
 */
export default function FlowPanelTemplate({
  bank,
  canvas,
}: {
  bank?: preact.ComponentChildren;
  canvas?: preact.ComponentChildren;
}) {
  return (
    <div class='relative w-full h-full flex-grow bg-neutral-950 overflow-hidden'>
      {/* Full React Flow Canvas */}
      <div class='absolute inset-0 z-0'>{canvas}</div>

      {/* Floating Bank Overlay (non-blocking) */}
      <div
        class='absolute top-4 left-4 z-10 pointer-events-none'
        aria-hidden='true'
      >
        <div class='pointer-events-auto bg-neutral-900/90 backdrop-blur border border-neutral-700 rounded-md p-2'>
          {bank}
        </div>
      </div>
    </div>
  );
}
