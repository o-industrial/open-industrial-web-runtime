export type AziMessage = {
  role: 'user' | 'azi' | 'tool';
  content: string;
};

export class AziManager {
  protected messages: AziMessage[] = [
    {
      role: 'azi',
      content: 'Welcome. You can ask me about schemas, surfaces, or logic.',
    },
  ];

  protected listeners = new Set<() => void>();

  // === Message Handling ===

  public Send(text: string): void {
    const userMsg: AziMessage = { role: 'user', content: text };

    const response: AziMessage = {
      role: 'azi',
      content: `I'm processing your request about "${text}".`,
    };

    this.messages.push(userMsg, response);
    this.emit();
  }

  public Reset(): void {
    this.messages = [
      {
        role: 'azi',
        content: 'Welcome. You can ask me about schemas, surfaces, or logic.',
      },
    ];
    this.emit();
  }

  // === State Access ===

  public GetMessages(): AziMessage[] {
    return [...this.messages];
  }

  // === Listener Management ===

  public OnMessagesChanged(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  protected emit(): void {
    for (const cb of this.listeners) cb();
  }
}
