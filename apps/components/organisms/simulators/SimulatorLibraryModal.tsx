import { useState } from 'preact/hooks';
import { Modal } from '../../molecules/Modal.tsx';
import { Input } from '../../atoms/forms/Input.tsx';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { SearchIcon } from '../../../../build/iconset/icons/SearchIcon.tsx';
import { SimulatorCard } from './SimulatorCard.tsx';
import { SimulatorPackCard } from './SimulatorPackCard.tsx';

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
    <Modal title='Simulator Marketplace' onClose={onClose}>
      <div class='flex h-full'>
        {/* Left Panel */}
        <div class='w-64 flex-shrink-0 pr-4 border-r border-neutral-700'>
          <div class='flex items-center gap-2 mb-4'>
            <Input
              placeholder='Search simulators...'
              value={search}
              onInput={setSearch}
              class='w-full'
            />
            <Action
              title='Search'
              onClick={() => console.log('Search:', search)}
              styleType={ActionStyleTypes.Icon}
            >
              <SearchIcon class='w-4 h-4' />
            </Action>
          </div>

          <div class='space-y-1 text-sm'>
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

        {/* Right Panel */}
        <div class='flex-1 pl-4 overflow-y-auto'>
          <div class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SimulatorCard
                key={i}
                id={`sim-${i}`}
                name={`Sim ${i}`}
                description='A sample simulator description goes here.'
                category={category}
                onInstall={onInstall}
              />
            ))}

            {/* Example Pack */}
            <SimulatorPackCard
              id='building-pack'
              name='Smart Building Pack'
              description='Includes RoomState, HVACSim, OccupancyFlow'
              simulatorCount={3}
              usedSimulators={1}
              onInstallPack={(id) => {
                console.log('Install pack', id);
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
