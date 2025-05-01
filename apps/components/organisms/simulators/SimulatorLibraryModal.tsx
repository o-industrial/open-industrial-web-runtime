import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { Modal } from '../../molecules/Modal.tsx';
import { Input } from '../../atoms/Input.tsx';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { SearchIcon } from '../../../../build/iconset/icons/SearchIcon.tsx';

type SimulatorLibraryModalProps = {
  onClose: () => void;
  onInstall: (simId: string) => void;
};

const CATEGORIES = [
  { key: 'all', label: 'All Simulators' },
  { key: 'environmental', label: 'Environmental' },
  { key: 'factory', label: 'Factory' },
  { key: 'medical', label: 'Medical' },
  { key: 'custom', label: 'Custom / External' },
];

export function SimulatorLibraryModal({
  onClose,
  onInstall,
}: SimulatorLibraryModalProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  return (
    <Modal title="Simulator Marketplace" onClose={onClose}>
      <div class="flex h-full">
        {/* Left Panel */}
        <div class="w-64 flex-shrink-0 pr-4 border-r border-neutral-700">
          <div class="flex items-center gap-2 mb-4">
            <Input
              placeholder="Search simulators..."
              value={search}
              onInput={setSearch}
              class="w-full"
            />
            <Action
              title="Search"
              onClick={() => console.log('Search:', search)}
              styleType={ActionStyleTypes.Icon}
            >
              <SearchIcon class="w-4 h-4" />
            </Action>
          </div>

          <div class="space-y-1 text-sm">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                class={`w-full text-left px-3 py-1 rounded transition ${
                  category === cat.key
                    ? 'bg-neon-violet-500 text-white font-semibold'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div class="flex-1 pl-4 overflow-y-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                class="bg-neutral-800 border border-neutral-700 rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <h3 class="text-white font-semibold text-sm mb-1">Sim {i}</h3>
                  <p class="text-neutral-400 text-xs mb-2">
                    A sample simulator description goes here.
                  </p>
                  <div class="text-xs text-neon-blue-400">#{category}</div>
                </div>
                <Action
                  onClick={() => onInstall(`sim-${i}`)}
                  class="mt-3 text-xs"
                  styleType={ActionStyleTypes.Solid | ActionStyleTypes.Thin}
                >
                  Add to Workspace
                </Action>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
