import { FlowManager } from '../../../src/flow/managers/FlowManager.ts';
import AziPanelTemplate from '../templates/AziPanelTemplate.tsx';
import { AziChatInput } from '../molecules/azi/AziChatInput.tsx';
import { AziChatMessage } from '../molecules/azi/AziChatMessage.tsx';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';

type Role = 'user' | 'azi' | 'tool';

type AziPanelProps = {
  flowMgr: FlowManager;
  onClose?: () => void;
  intentTypes?: Partial<Record<Role, IntentTypes>>;
};

export default function AziPanel({
  flowMgr,
  onClose,
  intentTypes = {
    user: IntentTypes.Secondary,
    azi: IntentTypes.Info,
    tool: IntentTypes.Tertiary,
  },
}: AziPanelProps) {
  const { messages, send } = flowMgr.UseAzi();

  return (
    <AziPanelTemplate
      onClose={onClose}
      input={<AziChatInput onSend={(text) => send(text)} />}
    >
      {messages.map((msg, idx) => (
        <AziChatMessage
          key={idx}
          align={msg.role === 'user' ? 'right' : 'left'}
          badge={msg.role === 'azi' ? 'Azi' : msg.role === 'tool' ? 'Tool' : 'You'}
          content={msg.content}
          intentType={intentTypes[msg.role] ?? IntentTypes.None}
          inline
        />
      ))}
    </AziPanelTemplate>
  );
}
