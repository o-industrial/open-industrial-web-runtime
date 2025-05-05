export default function FlowPanelTemplate({
  bank,
  canvas,
  systemControls,
}: {
  bank?: preact.ComponentChildren;
  canvas?: preact.ComponentChildren;
  systemControls?: preact.ComponentChildren;
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

      {/* Bottom-left System Controls */}
      {systemControls && (
        <div class='absolute bottom-4 left-4 z-10 pointer-events-none'>
          <div class='pointer-events-auto'>{systemControls}</div>
        </div>
      )}
    </div>
  );
}
