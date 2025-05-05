import { useEffect, useState } from 'preact/hooks';

export function useLiveStats<TStats extends Record<string, unknown>>(
  getStats?: () => Promise<TStats>,
  intervalMs = 1000
): TStats | undefined {
  const [stats, setStats] = useState<TStats>();

  useEffect(() => {
    if (!getStats) return;

    const fetchStats = async () => {
      try {
        const next = await getStats();
        setStats(next);
      } catch (err) {
        console.warn('[useLiveStats] Failed to fetch stats:', err);
      }
    };

    fetchStats(); // prime immediately

    const interval = setInterval(fetchStats, intervalMs);

    return () => clearInterval(interval);
  }, [getStats]);

  return stats;
}
