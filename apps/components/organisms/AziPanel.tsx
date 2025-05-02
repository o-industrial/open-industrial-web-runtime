import { useState } from 'preact/hooks';
import AziPanelTemplate from '../templates/AziPanelTemplate.tsx';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';
import { AziChatMessage } from '../molecules/azi/AziChatMessage.tsx';
import { AziChatInput } from '../molecules/azi/AziChatInput.tsx';

type Role = 'user' | 'azi' | 'tool';

type AziMessage = {
  role: Role;
  content: string;
};

type AziPanelProps = {
  onClose?: () => void;
  intentTypes?: Partial<Record<Role, IntentTypes>>;
};

export default function AziPanel({
  onClose,
  intentTypes = {
    user: IntentTypes.Secondary,
    azi: IntentTypes.Info,
    tool: IntentTypes.Tertiary,
  },
}: AziPanelProps) {
  const [messages, setMessages] = useState<AziMessage[]>([
    {
      role: 'azi',
      content: 'Welcome. You can ask me about schemas, surfaces, or logic.',
    },
    { role: 'user', content: 'Can you show me the RoomState schema?' },
    {
      role: 'azi',
      content:
        'Yes. RoomState v2 includes temperature, humidity, and air quality from multiple sensors.',
    },
    {
      role: 'tool',
      content: 'Loaded RoomState v2 schema from memory. Linked to surface: lab-sim-1.',
    },
    {
      role: 'user',
      content: 'Can you simulate a change in humidity for lab-sim-1?',
    },
    {
      role: 'azi',
      content: 'Sure. Injecting simulated impulse: humidity rise to 64%.',
    },
    {
      role: 'tool',
      content: 'Impulse injected: { humidity: 64, timestamp: 1684829382 }.',
    },
    {
      role: 'azi',
      content: 'RoomState agent reported above-threshold humidity. Action signal dispatched.',
    },
    { role: 'user', content: 'What action was triggered?' },
    {
      role: 'azi',
      content: 'FanControlAgent v2 responded by increasing airflow in the lab zone.',
    },
    { role: 'tool', content: 'Signal trace: fan.speed = 72%' },
    { role: 'user', content: 'Nice. Show me drift from baseline?' },
    {
      role: 'azi',
      content: 'Baseline deviation: humidity +8%, temp +1.2°C, AQI unchanged.',
    },
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: AziMessage = { role: 'user', content: input.trim() };
    const aziResponse: AziMessage = {
      role: 'azi',
      content: `I'm processing your request about "${input.trim()}".`,
    };

    setMessages((prev) => [...prev, userMessage, aziResponse]);
    setInput('');
  };

  return (
    <AziPanelTemplate
      onClose={onClose}
      input={<AziChatInput onSend={handleSend} />}
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
