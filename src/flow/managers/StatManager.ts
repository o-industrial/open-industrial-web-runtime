import { FlowNodeData } from '../types/react/FlowNodeData.ts';

export class StatManager {
  public Enrich(type: string, base: FlowNodeData): FlowNodeData {
    switch (type) {
      case 'agent': return this.BuildAgent(base);
      case 'connection': return this.BuildConnection(base);
      case 'device': return this.BuildDevice(base);
      case 'schema': return this.BuildSchema(base);
      case 'surface': return this.BuildSurface(base);
      case 'simulator': return this.BuildSimulator(base);
      case 'empty':
      default: return this.BuildEmpty(base);
    }
  }

  private BuildBuffer(seed: number, range: number, length = 20): number[] {
    return Array.from({ length }, () =>
      Number((seed + Math.random() * range).toFixed(2))
    );
  }

  private BuildAgent(base: FlowNodeData): FlowNodeData {
    const buffer = this.BuildBuffer(10, 5);
    return {
      ...base,
      stats: {
        impulseRates: [...buffer],
        matchesHandled: Math.floor(Math.random() * 200),
        avgLatencyMs: Number((Math.random() * 40 + 10).toFixed(1)),
        lastRunAgo: `${Math.floor(Math.random() * 90)}s ago`,
      },
      getStats: async () => {
        const next = Number((10 + Math.random() * 5).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return {
          impulseRates: [...buffer],
          matchesHandled: Math.floor(Math.random() * 200),
          avgLatencyMs: Number((Math.random() * 40 + 10).toFixed(1)),
          lastRunAgo: `${Math.floor(Math.random() * 90)}s ago`,
        };
      },
    };
  }

  private BuildConnection(base: FlowNodeData): FlowNodeData {
    const buffer = this.BuildBuffer(20, 10);
    return {
      ...base,
      stats: { impulseRates: [...buffer] },
      getStats: async () => {
        const next = Number((20 + Math.random() * 10).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return { impulseRates: [...buffer] };
      },
    };
  }

  private BuildSimulator(base: FlowNodeData): FlowNodeData {
    const buffer = this.BuildBuffer(15, 8);
    return {
      ...base,
      stats: {
        impulseRates: [...buffer],
        devicesSimulated: Math.floor(Math.random() * 10) + 1,
        messageRatePerDevice: Number((Math.random() * 2 + 1).toFixed(2)),
      },
      getStats: async () => {
        const next = Number((15 + Math.random() * 8).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return {
          impulseRates: [...buffer],
          devicesSimulated: Math.floor(Math.random() * 10) + 1,
          messageRatePerDevice: Number((Math.random() * 2 + 1).toFixed(2)),
        };
      },
    };
  }

  private BuildDevice(base: FlowNodeData): FlowNodeData {
    const buffer = this.BuildBuffer(5, 5);
    return {
      ...base,
      stats: { impulseRates: [...buffer] },
      getStats: async () => {
        const next = Number((5 + Math.random() * 5).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return { impulseRates: [...buffer] };
      },
    };
  }

  private BuildSchema(base: FlowNodeData): FlowNodeData {
    const buffer = this.BuildBuffer(10, 10);
    return {
      ...base,
      stats: { impulseRates: [...buffer] },
      getStats: async () => {
        const next = Number((10 + Math.random() * 10).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return { impulseRates: [...buffer] };
      },
    };
  }

  private BuildSurface(base: FlowNodeData): FlowNodeData {
    const buffer = this.BuildBuffer(10, 5);
    return {
      ...base,
      stats: {
        impulseRates: [...buffer],
        inputCount: Math.floor(Math.random() * 4) + 1,
        agentCount: Math.floor(Math.random() * 3) + 1,
        lastSignalAt: `${Math.floor(Math.random() * 60)}s ago`,
      },
      getStats: async () => {
        const next = Number((10 + Math.random() * 5).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return {
          impulseRates: [...buffer],
          inputCount: Math.floor(Math.random() * 4) + 1,
          agentCount: Math.floor(Math.random() * 3) + 1,
          lastSignalAt: `${Math.floor(Math.random() * 60)}s ago`,
        };
      },
    };
  }

  private BuildEmpty(base: FlowNodeData): FlowNodeData {
    const buffer = this.BuildBuffer(5, 3);
    return {
      ...base,
      stats: { impulseRates: [...buffer] },
      getStats: async () => {
        const next = Number((5 + Math.random() * 3).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return { impulseRates: [...buffer] };
      },
    };
  }
}
