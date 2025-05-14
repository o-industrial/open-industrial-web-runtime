export function WarmQueryPanel({
  warmQueries,
}: {
  warmQueries?: Record<string, string>;
}) {
  if (!warmQueries || Object.keys(warmQueries).length === 0) {
    return (
      <p class='text-sm text-neutral-400 italic'>
        No warm queries available.
      </p>
    );
  }

  return (
    <div class='space-y-3'>
      <div class='bg-neutral-800 border border-neutral-700 rounded p-4'>
        <h4 class='text-sm font-semibold text-white mb-2'>Warm Queries</h4>
        <ul class='text-xs text-neutral-300 space-y-1'>
          {Object.entries(warmQueries).map(([key, val]) => (
            <li key={key} class='flex justify-between'>
              <span class='text-neutral-400'>{key}</span>
              <span class='font-mono'>{val}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
