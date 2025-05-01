import { useEffect, useState } from 'preact/hooks';

export function useLiveStats<TStats extends Record<string, unknown> = Record<string, unknown>>(
  initialStats: TStats = {} as TStats,
  getStats?: () => Promise<TStats>,
  intervalMs = 1000
): TStats {
  const [stats, setStats] = useState<TStats>(initialStats);

  useEffect(() => {
    if (!getStats) return;

    const interval = setInterval(async () => {
      const next = await getStats();
      setStats((prev) => ({ ...prev, ...next }));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [getStats]);

  return stats;
}
