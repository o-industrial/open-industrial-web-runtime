import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { classSet } from '@fathym/atomic';
import { Action, ActionStyleTypes } from '../atoms/Action.tsx';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';

export type TabDefinition = {
  key: string;
  label: string;
  content: JSX.Element;
};

export type TabbedPanelProps = {
  tabs: TabDefinition[];
  initialTab?: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function TabbedPanel({
  tabs,
  initialTab,
  ...props
}: TabbedPanelProps) {
  const [selected, setSelected] = useState<string>(
    initialTab ?? tabs[0]?.key ?? ''
  );

  const activeTab = tabs.find((t) => t.key === selected);

  return (
    <div class={classSet(['w-full'], props)} {...props}>
      <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        <div class="inline-flex space-x-2 border-b border-neutral-700 mb-3 whitespace-nowrap min-w-full">
          {tabs.map((tab) => (
            <Action
              key={tab.key}
              onClick={() => setSelected(tab.key)}
              styleType={ActionStyleTypes.Link | ActionStyleTypes.Thin}
              intentType={
                selected === tab.key ? IntentTypes.Primary : IntentTypes.None
              }
              class={`rounded-t-md border-b-2 ${
                selected === tab.key
                  ? 'border-neon-violet-400'
                  : 'border-transparent hover:border-neutral-500'
              }`}
            >
              {tab.label}
            </Action>
          ))}
        </div>
      </div>

      <div>{activeTab?.content}</div>
    </div>
  );
}
