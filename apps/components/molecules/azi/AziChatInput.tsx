import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { Input } from '../../atoms/Input.tsx';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { SearchIcon } from '../../../../build/iconset/icons/SearchIcon.tsx';

export type AziChatInputProps = {
  placeholder?: string;
  onSend: (message: string) => void;
  disabled?: boolean;
  inputIntentType?: IntentTypes;
  actionIntentType?: IntentTypes;
  sendIcon?: JSX.Element;
};

export function AziChatInput({
  placeholder = 'Ask Azi something...',
  onSend,
  disabled = false,
  inputIntentType = IntentTypes.None,
  actionIntentType = IntentTypes.Primary,
  sendIcon = <SearchIcon class="w-5 h-5" />,
}: AziChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} class="flex gap-2">
      <Input
        onInput={setInput}
        placeholder={placeholder}
        disabled={disabled}
        intentType={inputIntentType}
        class="flex-grow"
      />

      <Action
        type="submit"
        styleType={ActionStyleTypes.Solid | ActionStyleTypes.Thin}
        intentType={actionIntentType}
        disabled={disabled}
        class="text-xs"
      >
        {sendIcon}
      </Action>
    </form>
  );
}
