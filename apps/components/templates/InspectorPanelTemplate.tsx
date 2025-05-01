import { ComponentChildren } from 'preact';

export default function InspectorPanelTemplate({
  children,
  onClose,
}: {
  children?: ComponentChildren;
  onClose?: () => void;
}) {
  return (
    <aside class="w-full flex flex-col bg-neutral-900 overflow-y-auto">
      {/* Toolbar Header */}
      <header class="w-full px-4 py-2 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between">
        <h2 class="text-sm font-semibold tracking-wide text-white uppercase">
          Inspector
        </h2>

        {onClose && (
          <button
            onClick={onClose}
            title="Close Inspector"
            class="text-neutral-400 hover:text-white text-lg leading-none px-2 py-1 transition-colors duration-150"
          >
            ✕
          </button>
        )}
      </header>

      {/* Main Scrollable Content */}
      <div class="flex-1 px-4 py-3 flex flex-col gap-4">
        {children}
      </div>
    </aside>
  );
}
