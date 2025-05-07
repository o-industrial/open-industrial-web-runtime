import { useEffect, useState } from 'preact/hooks';

export class StatManager {
  protected buffers: Record<string, number[]> = {};

  public GetStats(
    type: string,
    id: string,
  ): Promise<Record<string, unknown>> {
    const buffer = this.getOrCreateBuffer(type, id);

    const next = this.randomValueForType(type);

    buffer.push(next);

    if (buffer.length > 20) buffer.shift();

    let stats: Record<string, unknown>;

    switch (type) {
      case 'agent': {
        stats = {
          impulseRates: [...buffer],
          matchesHandled: Math.floor(Math.random() * 200),
          avgLatencyMs: Number((Math.random() * 40 + 10).toFixed(1)),
          lastRunAgo: `${Math.floor(Math.random() * 90)}s ago`,
        };

        break;
      }

      case 'connection': {
        stats = {
          impulseRates: [...buffer],
          connectionInfo: {
            BaseURL: 'https://api.mock.local',
            Method: 'POST',
            AuthType: 'SAS Token',
            Status: 'Healthy',
          },
        };

        break;
      }

      case 'simulator': {
        stats = {
          impulseRates: [...buffer],
          devicesSimulated: Math.floor(Math.random() * 10) + 1,
          messageRatePerDevice: Number((Math.random() * 2 + 1).toFixed(2)),
        };

        break;
      }

      case 'surface': {
        stats = {
          impulseRates: [...buffer],
          inputCount: Math.floor(Math.random() * 4) + 1,
          agentCount: Math.floor(Math.random() * 3) + 1,
          lastSignalAt: `${Math.floor(Math.random() * 60)}s ago`,
        };

        break;
      }

      default: {
        stats = { impulseRates: [...buffer] };

        break;
      }
    }

    return Promise.resolve(stats);
  }

  public UseStats<TStats extends Record<string, unknown>>(
    type: string,
    id: string,
    intervalMs = 1000,
  ): TStats | undefined {
    const [stats, setStats] = useState<TStats>({} as TStats);

    useEffect(() => {
      let mounted = true;

      const fetch = async () => {
        try {
          const res = await this.GetStats(type, id);
          if (mounted) setStats(res as TStats);
        } catch (err) {
          console.warn(`[StatManager.UseStats] Failed for ${id}`, err);
        }
      };

      fetch(); // Prime
      const interval = setInterval(fetch, intervalMs);

      return () => {
        mounted = false;
        clearInterval(interval);
      };
    }, [id]);

    return stats;
  }

  protected getOrCreateBuffer(type: string, id: string): number[] {
    if (!this.buffers[id]) {
      this.buffers[id] = this.buildBufferForType(type);
    }

    return this.buffers[id];
  }

  protected buildBufferForType(type: string, length = 20): number[] {
    const [seed, range] = {
      agent: [10, 5],
      connection: [20, 10],
      simulator: [15, 8],
      device: [5, 5],
      schema: [10, 10],
      surface: [10, 5],
      empty: [5, 3],
    }[type] ?? [5, 3];

    return Array.from({ length }, () => this.randomValue(seed, range));
  }

  protected randomValue(seed: number, range: number): number {
    return Number((seed + Math.random() * range).toFixed(2));
  }

  protected randomValueForType(type: string): number {
    const [seed, range] = {
      agent: [10, 5],
      connection: [20, 10],
      simulator: [15, 8],
      device: [5, 5],
      schema: [10, 10],
      surface: [10, 5],
      empty: [5, 3],
    }[type] ?? [5, 3];

    return this.randomValue(seed, range);
  }
}
