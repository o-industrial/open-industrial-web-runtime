import { Icon } from '@fathym/atomic-icons/browser';

export default function NodePresetItem({
  label,
  iconKey,
  type,
}: {
  label: string;
  iconKey: string;
  type: string;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer?.setData('application/node-type', type);
      }}
      class='relative group flex items-center justify-center w-10 h-10 rounded hover:bg-neutral-800 cursor-move border border-transparent hover:border-neutral-700 transition'
    >
      <Icon icon={iconKey} src='/icons/iconset' class='w-6 h-6 text-neutral-300 opacity-80' />

      {/* Tooltip */}
      <div class='absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded px-2 py-1 bg-black text-xs text-white opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10'>
        {label}
      </div>
    </div>
  );
}
