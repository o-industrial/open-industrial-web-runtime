export type AziMessage = {
  role: 'user' | 'azi' | 'tool';
  content: string;
};

export class AziManager {
  private messages: AziMessage[] = [
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
  ];

  private listeners = new Set<() => void>();

  Send(text: string) {
    const user: AziMessage = { role: 'user', content: text };

    const response: AziMessage = {
      role: 'azi',
      content: `I'm processing your request about "${text}".`,
    };

    this.messages.push(user, response);
    this.Emit();
  }

  GetMessages(): AziMessage[] {
    return [...this.messages];
  }

  OnMessagesChanged(cb: () => void) {
    this.listeners.add(cb);
  }

  OffMessagesChanged(cb: () => void) {
    this.listeners.delete(cb);
  }

  private Emit() {
    for (const cb of this.listeners) cb();
  }
}
