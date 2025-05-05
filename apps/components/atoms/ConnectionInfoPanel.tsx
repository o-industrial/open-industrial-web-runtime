import { CONNECTION_DETAILS } from '../organisms/inspectors/ConnectionInspector.tsx';

export function ConnectionInfoPanel({ types }: { types: string[]; }) {
  const enabled = types.map((key) => CONNECTION_DETAILS[key]).filter(Boolean);

  if (!enabled.length) {
    return (
      <p class="text-sm text-neutral-400 italic">
        No connection types enabled.
      </p>
    );
  }

  return (
    <div class="space-y-6">
      {enabled.map((info) => (
        <div key={info.name} class="bg-neutral-800 border border-neutral-700 rounded p-4">
          <h4 class="text-sm font-semibold text-white mb-1">{info.name}</h4>
          <p class="text-xs text-neutral-400 mb-2">{info.description}</p>
          <ul class="text-xs text-neutral-300 space-y-1">
            {Object.entries(info.details).map(([key, val]) => (
              <li key={key} class="flex justify-between">
                <span class="text-neutral-400">{key}</span>
                <span class="font-mono">{val}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
