import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { Modal } from '../molecules/Modal.tsx';
import { Input } from '../atoms/forms/Input.tsx';
import { Action, ActionStyleTypes } from '../atoms/Action.tsx';
import { SearchIcon } from '../../../build/iconset/icons/SearchIcon.tsx';
import { SimulatorCard } from './simulators/SimulatorCard.tsx';
import { SimulatorPackCard } from './simulators/SimulatorPackCard.tsx';
import {
  SimulatorDefinition,
  SimulatorLibraryManager,
  SimulatorPackDefinition,
} from '../../../src/flow/managers/SimulatorLibraryManager.ts';

type SimulatorLibraryModalProps = {
  SimMgr: SimulatorLibraryManager;
  onClose: () => void;
  onInstall: (sims: SimulatorDefinition[]) => void;
};

const CATEGORIES = [
  { key: 'all', label: 'All Simulators' },
  { key: 'environmental', label: 'Environmental' },
  { key: 'factory', label: 'Factory' },
  { key: 'medical', label: 'Medical' },
  { key: 'custom', label: 'Custom / External' },
];

export function SimulatorLibraryModal({
  SimMgr,
  onClose,
  onInstall,
}: SimulatorLibraryModalProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const simulators = SimMgr.GetByCategory(category).filter((sim) =>
    sim.Label.toLowerCase().includes(search.toLowerCase())
  );

  const packs: SimulatorPackDefinition[] = SimMgr.GetPacksByCategory(category);

  return (
    <Modal title="Simulator Marketplace" onClose={onClose}>
      <div class="flex h-full">
        {/* Sidebar */}
        <div class="w-64 flex-shrink-0 pr-4 border-r border-neutral-700">
          <div class="flex items-center gap-2 mb-4">
            <Input
              placeholder="Search simulators..."
              value={search}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                setSearch((e.target as HTMLInputElement).value)
              }
              class="w-full"
            />
            <Action
              title="Search"
              onClick={() => {}}
              styleType={ActionStyleTypes.Icon}
            >
              <SearchIcon class="w-4 h-4" />
            </Action>
          </div>

          <div class="space-y-1 text-sm">
            {CATEGORIES.map((cat) => (
              <Action
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                class={`w-full text-left px-3 py-1 rounded transition ${
                  category === cat.key
                    ? 'bg-neon-violet-500 text-white font-semibold'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </Action>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div class="flex-1 pl-4 overflow-y-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {simulators.map((sim) => (
              <SimulatorCard
                key={sim.ID}
                id={sim.ID}
                name={sim.Label}
                description={sim.Description}
                category={sim.Category}
                onInstall={() => onInstall([sim])}
              />
            ))}

            {packs.map((pack) => (
              <SimulatorPackCard
                key={pack.ID}
                id={pack.ID}
                name={pack.Label}
                description={pack.Description}
                simulatorCount={pack.SimulatorIDs.length}
                usedSimulators={0} // optional future prop
                onInstallPack={(id) => {
                  const sims = SimMgr.ResolvePack(id);
                  if (sims.length) onInstall(sims);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
